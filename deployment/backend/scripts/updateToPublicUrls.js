const mysql = require('mysql2/promise');
const { Client } = require('minio');
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

async function updateDatabaseWithPublicUrls() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL');

    // Update all URLs to public format
    const tables = [
      { table: 'hero_images', column: 'image_url' },
      { table: 'image_slider_data', column: 'image_url' },
      { table: 'stats_items', column: 'icon_url' },
      { table: 'stats_items', column: 'background_image_url' },
      { table: 'solution_items', column: 'image_url' }
    ];

    for (const { table, column } of tables) {
      try {
        const [rows] = await connection.execute(
          `SELECT id, ${column} FROM ${table} WHERE ${column} IS NOT NULL`
        );

        for (const row of rows) {
          const url = row[column];
          if (url && url.includes('localhost:9000') && url.includes('?X-Amz-Algorithm=')) {
            // Extract the object path from the presigned URL
            const urlParts = url.split('?')[0]; // Remove query parameters
            const publicUrl = urlParts; // This is already the public URL format
            
            await connection.execute(
              `UPDATE ${table} SET ${column} = ? WHERE id = ?`,
              [publicUrl, row.id]
            );
            
            console.log(`✅ Updated ${table}.${column} (ID: ${row.id})`);
          }
        }
      } catch (error) {
        console.log(`⚠️  Skipping ${table}.${column} - column doesn't exist`);
      }
    }

    console.log('✅ Database updated with public URLs');
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
    console.log('🔧 Setting bucket to public access...');
    await setBucketPublic();
    
    console.log('🗄️ Updating database with public URLs...');
    await updateDatabaseWithPublicUrls();
    
    console.log('🎉 Successfully updated to public URLs!');
    console.log('📖 All images are now publicly accessible without expiration');
    
  } catch (error) {
    console.error('💥 Process failed:', error);
    process.exit(1);
  }
}

main(); 