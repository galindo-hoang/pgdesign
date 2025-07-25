const fs = require('fs');
const path = require('path');
const { Client } = require('minio');
const mysql = require('mysql2/promise');
require('dotenv').config();

// MinIO configuration
const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

const bucketName = process.env.MINIO_BUCKET_NAME || 'pgdesign-assets';

// MySQL configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'pgdesign',
  password: process.env.DB_PASSWORD || 'pgdesignpassword',
  database: process.env.DB_NAME || 'pgdesign_dev'
};

// Image folder path
const imagesPath = '../src/assets/images';
const iconsPath = '../src/assets/icons';
const logoPath = '../src/assets/logo';

async function initializeBucket() {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`✅ Bucket '${bucketName}' created`);
      
      // Set bucket policy to public-read
      await setBucketPublic();
    } else {
      console.log(`✅ Bucket '${bucketName}' already exists`);
    }
  } catch (error) {
    console.error('❌ Error initializing bucket:', error);
    throw error;
  }
}

async function setBucketPublic() {
  try {
    // Set bucket policy to public-read
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucketName}/*`]
        }
      ]
    };

    await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log('✅ Bucket policy set to public-read');
  } catch (error) {
    console.error('❌ Error setting bucket policy:', error);
  }
}

async function uploadFile(filePath, objectName) {
  try {
    await minioClient.fPutObject(bucketName, objectName, filePath);
    
    // Generate public URL instead of presigned URL
    const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
    const port = process.env.MINIO_PORT || '9000';
    const useSSL = process.env.MINIO_USE_SSL === 'true';
    const protocol = useSSL ? 'https' : 'http';
    
    // For production, use the public endpoint
    const publicEndpoint = process.env.MINIO_PUBLIC_ENDPOINT || `${endpoint}:${port}`;
    const url = `${protocol}://${publicEndpoint}/${bucketName}/${objectName}`;
    
    console.log(`✅ Uploaded: ${objectName} -> ${url}`);
    return url;
  } catch (error) {
    console.error(`❌ Error uploading ${objectName}:`, error);
    throw error;
  }
}

async function uploadImagesFromFolder(folderPath, prefix = '') {
  const uploadedFiles = {};
  
  try {
    const files = fs.readdirSync(folderPath);
    
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isFile() && /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)) {
        const objectName = prefix ? `${prefix}/${file}` : file;
        const url = await uploadFile(filePath, objectName);
        uploadedFiles[file] = url;
      }
    }
  } catch (error) {
    console.error(`❌ Error reading folder ${folderPath}:`, error);
  }
  
  return uploadedFiles;
}

async function updateDatabase(imageUrls, iconUrls, logoUrls) {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL');

    // Update hero images
    if (imageUrls['thumb-intro.png']) {
      await connection.execute(
        'UPDATE hero_images SET image_url = ? WHERE image_url LIKE "%thumb-intro%"',
        [imageUrls['thumb-intro.png']]
      );
    }
    
    if (imageUrls['diary-image-1.png']) {
      await connection.execute(
        'UPDATE hero_images SET image_url = ? WHERE image_url LIKE "%diary-image-1%"',
        [imageUrls['diary-image-1.png']]
      );
    }
    
    if (imageUrls['diary-image-2.png']) {
      await connection.execute(
        'UPDATE hero_images SET image_url = ? WHERE image_url LIKE "%diary-image-2%"',
        [imageUrls['diary-image-2.png']]
      );
    }

    // Update image slider data
    const sliderUpdates = [
      { file: 'diary-image-1.png', pattern: '%diary-image-1%' },
      { file: 'diary-image-2.png', pattern: '%diary-image-2%' },
      { file: 'diary-image-3.png', pattern: '%diary-image-3%' },
      { file: 'thumb-intro.png', pattern: '%thumb-intro%' }
    ];

    for (const update of sliderUpdates) {
      if (imageUrls[update.file]) {
        await connection.execute(
          'UPDATE image_slider_data SET image_url = ? WHERE image_url LIKE ?',
          [imageUrls[update.file], update.pattern]
        );
      }
    }

    // Update stats items background images
    const statsUpdates = [
      { file: 'diary-image-1.png', pattern: '%diary-image-1%' },
      { file: 'diary-image-2.png', pattern: '%diary-image-2%' },
      { file: 'diary-image-3.png', pattern: '%diary-image-3%' },
      { file: 'diary-image-4.png', pattern: '%diary-image-4%' }
    ];

    for (const update of statsUpdates) {
      if (imageUrls[update.file]) {
        await connection.execute(
          'UPDATE stats_items SET background_image_url = ? WHERE background_image_url LIKE ?',
          [imageUrls[update.file], update.pattern]
        );
      }
    }

    // Update solution items
    const solutionUpdates = [
      { file: 'diary-image-5.png', pattern: '%diary-image-5%' },
      { file: 'diary-image-6.png', pattern: '%diary-image-6%' },
      { file: 'diary-image-7.png', pattern: '%diary-image-7%' },
      { file: 'diary-image-8.png', pattern: '%diary-image-8%' }
    ];

    for (const update of solutionUpdates) {
      if (imageUrls[update.file]) {
        await connection.execute(
          'UPDATE solution_items SET image_url = ? WHERE image_url LIKE ?',
          [imageUrls[update.file], update.pattern]
        );
      }
    }

    // Update stats items icon URLs if we have icons
    if (iconUrls) {
      const iconUpdates = [
        { file: 'experience-icon.svg', pattern: '%experience-icon%' },
        { file: 'customer-icon.svg', pattern: '%customer-icon%' },
        { file: 'design-icon.svg', pattern: '%design-icon%' },
        { file: 'building-icon.svg', pattern: '%building-icon%' }
      ];

      for (const update of iconUpdates) {
        if (iconUrls[update.file]) {
          await connection.execute(
            'UPDATE stats_items SET icon_url = ? WHERE icon_url LIKE ?',
            [iconUrls[update.file], update.pattern]
          );
        }
      }
    }

    // Update logo URLs if we have logos
    if (logoUrls) {
      const logoUpdates = [
        { file: 'pg-design-logo.svg', pattern: '%pg-design-logo%' },
        { file: 'pg-design-logo-footer.svg', pattern: '%pg-design-logo-footer%' }
      ];

      for (const update of logoUpdates) {
        if (logoUrls[update.file]) {
          // Update any table that might contain logo references
          const logoTables = [
            'hero_data', 'about_data', 'image_slider_data', 
            'stats_header', 'solution_header', 'workflow_data',
            'project_diary_data', 'testimonial_header'
          ];

          for (const table of logoTables) {
            try {
              await connection.execute(
                `UPDATE ${table} SET logo_url = ? WHERE logo_url LIKE ?`,
                [logoUrls[update.file], update.pattern]
              );
            } catch (error) {
              // Column might not exist in some tables, continue
            }
          }
        }
      }
    }

    console.log('✅ Database updated successfully');
  } catch (error) {
    console.error('❌ Error updating database:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function main() {
  try {
    console.log('🚀 Starting image upload process...');
    
    // Initialize MinIO bucket
    await initializeBucket();
    
    // Upload images
    console.log('📸 Uploading images...');
    const imageUrls = await uploadImagesFromFolder(imagesPath, 'images');
    
    // Upload icons if they exist
    console.log('🎨 Uploading icons...');
    let iconUrls = {};
    if (fs.existsSync(iconsPath)) {
      iconUrls = await uploadImagesFromFolder(iconsPath, 'icons');
    }
    
    // Upload logos if they exist
    console.log('🏷️ Uploading logos...');
    let logoUrls = {};
    if (fs.existsSync(logoPath)) {
      logoUrls = await uploadImagesFromFolder(logoPath, 'logo');
    }
    
    // Update database
    console.log('🗄️ Updating database...');
    await updateDatabase(imageUrls, iconUrls, logoUrls);
    
    console.log('🎉 Upload process completed successfully!');
    console.log('📊 Uploaded files:', Object.keys(imageUrls).length + Object.keys(iconUrls).length + Object.keys(logoUrls).length);
    
  } catch (error) {
    console.error('💥 Upload process failed:', error);
    process.exit(1);
  }
}

main(); 