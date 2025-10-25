// Script to update hero images with mock data URLs
const mysql = require('mysql2/promise');
require('dotenv').config();

const connectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'pgdesign_dev'
};

// Mock data URLs for hero images
const heroMockDataUrls = [
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/hero1.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/hero2.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/hero3.png',
  'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/homepage/hero4.png'
];

async function updateHeroImages() {
  let connection;
  
  try {
    console.log('🔗 Connecting to database...');
    connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Connected to database');

    // First, let's check current hero images
    console.log('\n📋 Current hero images:');
    const [currentImages] = await connection.execute(
      'SELECT * FROM hero_images WHERE is_active = 1 ORDER BY display_order ASC'
    );
    
    console.log('Current images:', currentImages.map(img => img.image_url));

    // Delete existing hero images
    console.log('\n🗑️ Deleting existing hero images...');
    await connection.execute('DELETE FROM hero_images WHERE is_active = 1');
    console.log('✅ Deleted existing hero images');

    // Insert new hero images with mock data URLs
    console.log('\n📝 Inserting new hero images with mock data URLs...');
    
    for (let i = 0; i < heroMockDataUrls.length; i++) {
      const url = heroMockDataUrls[i];
      const insertQuery = `
        INSERT INTO hero_images 
        (hero_id, image_url, image_alt, display_order, is_active, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      await connection.execute(insertQuery, [
        8,    // hero_id (assuming hero_data id is 8)
        url,  // image_url
        `Hero image ${i + 1}`, // image_alt
        i,    // display_order
        1,    // is_active
        new Date(), // created_at
        new Date()  // updated_at
      ]);
    }
    console.log(`✅ Inserted ${heroMockDataUrls.length} hero images with mock data URLs`);

    // Verify the update
    console.log('\n🔍 Verifying updated hero images:');
    const [updatedImages] = await connection.execute(
      'SELECT * FROM hero_images WHERE is_active = 1 ORDER BY display_order ASC'
    );
    
    console.log('Updated images:');
    updatedImages.forEach((img, index) => {
      console.log(`  ${index + 1}. ${img.image_url}`);
    });

    console.log('\n🎉 Hero images update completed successfully!');

  } catch (error) {
    console.error('❌ Error updating hero images:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the update
updateHeroImages();
