// Script to update project diary and solution images with mock data URLs
const mysql = require('mysql2/promise');
require('dotenv').config();

const connectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'pgdesign_dev'
};

// Mock data URLs for project diary images
const projectDiaryMockDataUrls = [
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/projectdiary1.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/projectdiary2.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/projectdiary3.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/projectdiary4.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/projectdiary5.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/projectdiary6.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/projectdiary7.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/projectdiary8.png'
];

// Mock data URLs for solution images
const solutionMockDataUrls = [
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/solution1.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/solution2.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/solution3.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/solution4.png'
];

async function updateProjectDiaryImages() {
  let connection;
  
  try {
    console.log('🔗 Connecting to database...');
    connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Connected to database');

    // Update project diary images
    console.log('\n📋 Updating project diary images...');
    
    // Get current project diary images
    const [currentImages] = await connection.execute(
      'SELECT * FROM project_diary_images WHERE is_active = 1 ORDER BY display_order ASC'
    );
    
    console.log(`Found ${currentImages.length} project diary images to update`);

    // Update each image with mock data URL
    for (let i = 0; i < Math.min(currentImages.length, projectDiaryMockDataUrls.length); i++) {
      const image = currentImages[i];
      const newUrl = projectDiaryMockDataUrls[i];
      
      await connection.execute(
        'UPDATE project_diary_images SET image_url = ? WHERE id = ?',
        [newUrl, image.id]
      );
      
      console.log(`  ✅ Updated image ${i + 1}: ${newUrl}`);
    }

    console.log(`✅ Updated ${Math.min(currentImages.length, projectDiaryMockDataUrls.length)} project diary images`);

  } catch (error) {
    console.error('❌ Error updating project diary images:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

async function updateSolutionImages() {
  let connection;
  
  try {
    console.log('🔗 Connecting to database...');
    connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Connected to database');

    // Update solution images
    console.log('\n📋 Updating solution images...');
    
    // Get current solution images
    const [currentImages] = await connection.execute(
      'SELECT * FROM solution_items WHERE is_active = 1 ORDER BY display_order ASC'
    );
    
    console.log(`Found ${currentImages.length} solution images to update`);

    // Update each image with mock data URL
    for (let i = 0; i < Math.min(currentImages.length, solutionMockDataUrls.length); i++) {
      const image = currentImages[i];
      const newUrl = solutionMockDataUrls[i];
      
      await connection.execute(
        'UPDATE solution_items SET image_url = ? WHERE id = ?',
        [newUrl, image.id]
      );
      
      console.log(`  ✅ Updated solution ${i + 1}: ${newUrl}`);
    }

    console.log(`✅ Updated ${Math.min(currentImages.length, solutionMockDataUrls.length)} solution images`);

  } catch (error) {
    console.error('❌ Error updating solution images:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

async function updateAllImages() {
  console.log('🚀 Starting image URL updates...\n');
  
  await updateProjectDiaryImages();
  console.log('\n' + '='.repeat(50) + '\n');
  await updateSolutionImages();
  
  console.log('\n🎉 All image URL updates completed successfully!');
}

// Run the updates
updateAllImages();
