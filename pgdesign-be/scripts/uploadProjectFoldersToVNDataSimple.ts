#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
import * as knex from 'knex';
import * as fs from 'fs';
import * as path from 'path';
import { Client } from 'minio';
import sharp from 'sharp';

dotenv.config();

// Use explicit database configuration
const db = knex.default({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootpassword',
    database: 'pgdesign_dev',
    charset: 'utf8mb4'
  },
  pool: {
    min: 2,
    max: 10
  },
  useNullAsDefault: true
});

// VNData S3 configuration
const VNDATA_CONFIG = {
  endPoint: 's3-hcm-r2.s3cloud.vn',
  port: 443,
  useSSL: true,
  accessKey: process.env.VNDATA_ACCESS_KEY || 'PQBDT1RXDJU9ORTHURV0',
  secretKey: process.env.VNDATA_SECRET_KEY || 'CvE81UtcutCwTwxgvxTRN6OtaVoOwPfD1wEsvbBe',
  region: process.env.VNDATA_REGION || 'hcm-r2'
};

const BUCKET_NAME = process.env.VNDATA_BUCKET_NAME || 'pgdesign-new';
const VNDATA_BASE_URL = `https://s3-hcm-r2.s3cloud.vn/${BUCKET_NAME}`;

// Initialize MinIO client for VNData S3
const s3Client = new Client(VNDATA_CONFIG);

// Categories to upload
const CATEGORIES = ['appartment', 'house-business', 'house-normal', 'village'];

// Helper function to get content type
function getContentType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}

// Helper function to process image
async function processImage(buffer: Buffer, mimeType: string): Promise<{buffer: Buffer, contentType: string}> {
  try {
    const sharpInstance = sharp(buffer);
    const metadata = await sharpInstance.metadata();

    // Resize if image is too large
    if (metadata.width && metadata.width > 1920) {
      console.log(`🔄 Resizing image from ${metadata.width}px to 1920px`);
      
      let resized = sharpInstance.resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });

      switch (mimeType) {
        case 'image/jpeg':
        case 'image/jpg':
          return {
            buffer: await resized.jpeg({ quality: 100 }).toBuffer(),
            contentType: 'image/jpeg'
          };
        case 'image/png':
          return {
            buffer: await resized.png({ compressionLevel: 0 }).toBuffer(),
            contentType: 'image/png'
          };
        case 'image/webp':
          return {
            buffer: await resized.webp({ quality: 100 }).toBuffer(),
            contentType: 'image/webp'
          };
        default:
          return {
            buffer: await resized.toBuffer(),
            contentType: mimeType
          };
      }
    }

    return {
      buffer: buffer,
      contentType: mimeType
    };
  } catch (error) {
    console.error('Error processing image:', error);
    return {
      buffer: buffer,
      contentType: mimeType
    };
  }
}

// Helper function to upload file to VNData S3
async function uploadFileToVNData(localPath: string, s3Key: string): Promise<string> {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const contentType = getContentType(localPath);
    
    // Process image if it's not SVG
    let processedBuffer = fileBuffer;
    let actualContentType = contentType;
    
    if (contentType !== 'image/svg+xml') {
      const processed = await processImage(fileBuffer, contentType);
      processedBuffer = processed.buffer;
      actualContentType = processed.contentType;
    }

    // Upload to VNData S3
    await s3Client.putObject(BUCKET_NAME, s3Key, processedBuffer, {
      'Content-Type': actualContentType,
      'Cache-Control': 'max-age=31536000',
    });

    return `${VNDATA_BASE_URL}/${s3Key}`;
  } catch (error) {
    console.error(`❌ Error uploading ${localPath}:`, error);
    throw error;
  }
}

// Helper function to update database URLs
async function updateDatabaseUrls(oldUrl: string, newUrl: string): Promise<void> {
  try {
    // Update thumbnail_image
    await db('project_details')
      .where('thumbnail_image', oldUrl)
      .update({ thumbnail_image: newUrl });

    // Update project_images (JSON array)
    const projects = await db('project_details').select('id', 'project_images');
    
    for (const project of projects) {
      if (project.project_images) {
        try {
          const images = JSON.parse(project.project_images);
          let updated = false;
          
          for (let i = 0; i < images.length; i++) {
            if (images[i] === oldUrl) {
              images[i] = newUrl;
              updated = true;
            }
          }
          
          if (updated) {
            await db('project_details')
              .where('id', project.id)
              .update({ project_images: JSON.stringify(images) });
          }
        } catch (error) {
          console.error(`❌ Error parsing project_images for project ${project.id}:`, error);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error updating database URLs:`, error);
    throw error;
  }
}

// Main function to upload folders and update database
async function uploadFoldersAndUpdateDatabase() {
  console.log('🚀 Starting upload of project folders to VNData S3...\n');

  try {
    // Check if bucket exists, skip creation if not
    const bucketExists = await s3Client.bucketExists(BUCKET_NAME);
    if (!bucketExists) {
      console.log(`⚠️  Bucket does not exist: ${BUCKET_NAME}`);
      console.log(`   Please create the bucket manually in VNData S3 console`);
      console.log(`   Or use existing bucket: pgdesign-assets`);
      return;
    } else {
      console.log(`✅ Bucket exists: ${BUCKET_NAME}`);
    }

    const assetsPath = '/Users/huy.hoang/Desktop/pgdesign/public/assets';
    let totalFiles = 0;
    let uploadedFiles = 0;
    let updatedUrls = 0;

    for (const category of CATEGORIES) {
      console.log(`\n📁 Processing category: ${category}`);
      
      const categoryPath = path.join(assetsPath, category);
      
      if (!fs.existsSync(categoryPath)) {
        console.log(`   ⚠️  Category folder not found: ${categoryPath}`);
        continue;
      }

      const projectFolders = fs.readdirSync(categoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      console.log(`   📦 Found ${projectFolders.length} project folders`);

      for (const projectFolder of projectFolders) {
        const projectPath = path.join(categoryPath, projectFolder);
        const files = fs.readdirSync(projectPath)
          .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file));

        console.log(`   📂 Processing project: ${projectFolder} (${files.length} files)`);

        for (const file of files) {
          totalFiles++;
          
          const localFilePath = path.join(projectPath, file);
          const s3Key = `projectpage/${category}/${projectFolder}/${file}`;
          
          try {
            // Upload file to VNData S3
            const newUrl = await uploadFileToVNData(localFilePath, s3Key);
            uploadedFiles++;
            
            // Create old URL pattern (assuming current URLs follow this pattern)
            const oldUrlPattern = `https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/${category}/${projectFolder}/${file}`;
            
            // Update database URLs
            await updateDatabaseUrls(oldUrlPattern, newUrl);
            updatedUrls++;
            
            console.log(`   ✅ Uploaded: ${file} -> ${newUrl}`);
            
          } catch (error) {
            console.error(`   ❌ Failed to upload ${file}:`, error);
          }
        }
      }
    }

    console.log('\n📊 Upload Summary:');
    console.log(`   Total files processed: ${totalFiles}`);
    console.log(`   Successfully uploaded: ${uploadedFiles}`);
    console.log(`   Database URLs updated: ${updatedUrls}`);
    console.log(`   Errors: ${totalFiles - uploadedFiles}`);

    console.log('\n✅ Upload and database update completed!');

  } catch (error) {
    console.error('❌ Error during upload process:', error);
    throw error;
  } finally {
    await db.destroy();
  }
}

// Run the function
uploadFoldersAndUpdateDatabase()
  .then(() => {
    console.log('\n🎯 Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });
