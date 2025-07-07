const fs = require('fs');
const path = require('path');
const { Client } = require('minio');
const mysql = require('mysql2/promise');
require('dotenv').config();

// MinIO configuration
const minioClient = new Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin',
});

const bucketName = 'pgdesign-assets';

// MySQL configuration
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'pgdesign',
  password: 'pgdesignpassword',
  database: 'pgdesign_dev'
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
    } else {
      console.log(`✅ Bucket '${bucketName}' already exists`);
    }
  } catch (error) {
    console.error('❌ Error initializing bucket:', error);
    throw error;
  }
}

async function uploadFile(filePath, objectName) {
  try {
    await minioClient.fPutObject(bucketName, objectName, filePath);
    const url = await minioClient.presignedGetObject(bucketName, objectName, 7 * 24 * 60 * 60); // 7 days
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
    if (imageUrls['thumb-intro.jpg']) {
      await connection.execute(
        'UPDATE hero_images SET image_url = ? WHERE image_url LIKE "%thumb-intro%"',
        [imageUrls['thumb-intro.jpg']]
      );
    }
    
    if (imageUrls['diary-image-1.jpg']) {
      await connection.execute(
        'UPDATE hero_images SET image_url = ? WHERE image_url LIKE "%diary-image-1%"',
        [imageUrls['diary-image-1.jpg']]
      );
    }
    
    if (imageUrls['diary-image-2.jpg']) {
      await connection.execute(
        'UPDATE hero_images SET image_url = ? WHERE image_url LIKE "%diary-image-2%"',
        [imageUrls['diary-image-2.jpg']]
      );
    }

    // Update image slider data
    const sliderUpdates = [
      { file: 'diary-image-1.jpg', pattern: '%diary-image-1%' },
      { file: 'diary-image-2.jpg', pattern: '%diary-image-2%' },
      { file: 'diary-image-3.jpg', pattern: '%diary-image-3%' },
      { file: 'thumb-intro.jpg', pattern: '%thumb-intro%' }
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
      { file: 'diary-image-1.jpg', pattern: '%diary-image-1%' },
      { file: 'diary-image-2.jpg', pattern: '%diary-image-2%' },
      { file: 'diary-image-3.jpg', pattern: '%diary-image-3%' },
      { file: 'diary-image-4.jpg', pattern: '%diary-image-4%' }
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
      { file: 'diary-image-5.jpg', pattern: '%diary-image-5%' },
      { file: 'diary-image-6.jpg', pattern: '%diary-image-6%' },
      { file: 'diary-image-7.jpg', pattern: '%diary-image-7%' },
      { file: 'diary-image-8.jpg', pattern: '%diary-image-8%' }
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