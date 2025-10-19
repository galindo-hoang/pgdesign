/**
 * Migration Script: Upload images từ public folder lên MinIO và lưu URLs vào database
 * 
 * Script này sẽ:
 * 1. Scan public/assets folders
 * 2. Upload images lên MinIO
 * 3. Insert project details và categories vào database với URLs
 */

const fs = require('fs');
const path = require('path');
const db = require('../dist/config/database').default;
const { Client } = require('minio');

// MinIO configuration
const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

const bucketName = 'pgdesign-assets';
const publicFolder = path.join(__dirname, '../../public/assets');

// Helper: Upload file to MinIO
async function uploadFileToMinIO(filePath, objectName) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = getMimeType(filePath);
    
    await minioClient.putObject(bucketName, objectName, fileBuffer, {
      'Content-Type': mimeType,
      'Cache-Control': 'max-age=31536000'
    });
    
    const url = `http://localhost:9000/${bucketName}/${objectName}`;
    console.log(`  ✅ Uploaded: ${objectName}`);
    return url;
  } catch (error) {
    console.error(`  ❌ Failed to upload ${objectName}:`, error.message);
    return null;
  }
}

// Helper: Get MIME type
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// Category mapping
const categoryMapping = {
  'appartment': { id: 7, name: 'APARTMENT', projectCategoryId: 7 },
  'house-normal': { id: 6, name: 'HOUSE NORMAL', projectCategoryId: 6 },
  'village': { id: 8, name: 'VILLA', projectCategoryId: 8 },
  'house-business': { id: 9, name: 'COMMERCIAL', projectCategoryId: 9 }
};

// Main migration function
async function migrateImages() {
  try {
    console.log('🚀 Starting migration from public/assets to MinIO...\n');

    // Step 1: Ensure bucket exists
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`✅ Created bucket: ${bucketName}`);
    }

    // Step 2: Set bucket to public
    const policy = {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Principal: { AWS: ['*'] },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucketName}/*`]
      }]
    };
    await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log(`✅ Set bucket policy to public\n`);

    // Step 3: Scan categories and upload
    const categories = ['appartment', 'house-normal', 'village', 'house-business'];
    let projectCounter = 1;

    for (const category of categories) {
      const categoryPath = path.join(publicFolder, category);
      
      if (!fs.existsSync(categoryPath)) {
        console.log(`⚠️  Category folder not found: ${category}`);
        continue;
      }

      console.log(`\n📁 Processing category: ${category.toUpperCase()}`);
      
      // Get project folders
      const projectFolders = fs.readdirSync(categoryPath)
        .filter(item => {
          const fullPath = path.join(categoryPath, item);
          return fs.statSync(fullPath).isDirectory();
        });

      console.log(`   Found ${projectFolders.length} projects`);

      for (const projectFolder of projectFolders) {
        const projectPath = path.join(categoryPath, projectFolder);
        const images = fs.readdirSync(projectPath)
          .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

        if (images.length === 0) {
          console.log(`   ⚠️  No images in ${projectFolder}`);
          continue;
        }

        // Generate project ID
        const projectId = `${category}-${String(projectCounter).padStart(3, '0')}`;
        console.log(`\n   📦 Project: ${projectFolder} (ID: ${projectId})`);

        // Upload images
        const imageUrls = [];
        let thumbnailUrl = null;

        for (let i = 0; i < images.length; i++) {
          const imagePath = path.join(projectPath, images[i]);
          const objectName = `project-details/${projectId}/${images[i]}`;
          
          const url = await uploadFileToMinIO(imagePath, objectName);
          if (url) {
            if (i === 0) {
              thumbnailUrl = url; // First image as thumbnail
            }
            imageUrls.push(url);
          }
        }

        // Insert into database
        if (thumbnailUrl && imageUrls.length > 0) {
          try {
            await db('project_details').insert({
              project_id: projectId,
              title: projectFolder,
              client_name: projectFolder.split(' - ')[0] || 'Client',
              area: '100m2',
              construction_date: '2024-01-01',
              address: projectFolder.split(' - ')[2] || 'Vietnam',
              description: `Project from ${category}`,
              category: category,
              project_category_id: categoryMapping[category].projectCategoryId,
              style: 'Modern',
              thumbnail_image: thumbnailUrl,
              thumbnail_image_url: thumbnailUrl,
              html_content: `<div><h3>${projectFolder}</h3></div>`,
              project_images: JSON.stringify(imageUrls),
              project_images_urls: JSON.stringify(imageUrls),
              project_status: 'Completed',
              completion_date: '2024-06-01',
              is_on_homepage: false,
              is_active: true,
              created_at: new Date(),
              updated_at: new Date()
            });

            console.log(`   ✅ Inserted project: ${projectId} with ${imageUrls.length} images`);
            projectCounter++;
          } catch (error) {
            console.error(`   ❌ Failed to insert project ${projectId}:`, error.message);
          }
        }
      }
    }

    console.log(`\n🎉 Migration completed! Total projects: ${projectCounter - 1}`);
    process.exit(0);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateImages();

