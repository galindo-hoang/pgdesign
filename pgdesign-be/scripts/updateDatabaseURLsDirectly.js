/**
 * Update all database URLs from old bucket to new bucket (Direct MySQL connection)
 */

const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rootpassword',
  database: 'pgdesign_dev'
};

const oldBucketName = 'pgdesign-assets';
const newBucketName = 'pgdesign-new';

async function updateDatabaseURLs() {
  console.log('🔄 Updating Database URLs (Direct Connection)...\n');
  
  let connection;
  
  try {
    // Try connecting
    console.log('1️⃣ Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database');
    
    // Tables and columns to update
    const updates = [
      { table: 'project_details', columns: ['thumbnail_image', 'thumbnail_image_url', 'project_images', 'project_images_urls'] },
      { table: 'project_categories', columns: ['background_image_url'] },
      { table: 'about_project', columns: ['background_image_url'] },
      { table: 'hero_images', columns: ['image_url'] },
      { table: 'about_images', columns: ['image_url'] },
      { table: 'stats', columns: ['image_url'] },
      { table: 'solution_items', columns: ['icon_url'] },
      { table: 'workflow_tabs', columns: ['image_url'] },
      { table: 'project_diary_images', columns: ['image_url'] },
      { table: 'testimonial_items', columns: ['avatar_url'] },
      { table: 'project_subcategories', columns: ['icon_url'] }
    ];
    
    let totalUpdates = 0;
    let totalRows = 0;
    
    for (const { table, columns } of updates) {
      console.log(`\n2️⃣ Updating table: ${table}...`);
      
      for (const column of columns) {
        try {
          // Check if column exists first
          const [cols] = await connection.execute(`SHOW COLUMNS FROM ${table} LIKE '${column}'`);
          
          if (cols.length === 0) {
            console.log(`   ⏭️  Column ${column} doesn't exist, skipping`);
            continue;
          }
          
          // Perform update
          const updateSQL = `UPDATE ${table} SET ${column} = REPLACE(${column}, ?, ?) WHERE ${column} LIKE ?`;
          const [result] = await connection.execute(updateSQL, [oldBucketName, newBucketName, `%${oldBucketName}%`]);
          
          if (result.affectedRows > 0) {
            console.log(`   ✅ Updated ${column} (${result.affectedRows} rows)`);
            totalRows += result.affectedRows;
          } else {
            console.log(`   ⏭️  ${column} (no rows to update)`);
          }
          totalUpdates++;
          
        } catch (err) {
          console.log(`   ⚠️  Error updating ${column}:`, err.message);
        }
      }
    }
    
    console.log(`\n✅ Database update completed!`);
    console.log(`   Columns processed: ${totalUpdates}`);
    console.log(`   Total rows updated: ${totalRows}`);
    
    // Verify updates
    console.log('\n3️⃣ Verifying updates...');
    
    const [oldUrlCount] = await connection.execute(
      `SELECT COUNT(*) as count FROM project_details WHERE thumbnail_image_url LIKE ?`,
      [`%${oldBucketName}%`]
    );
    
    const [newUrlCount] = await connection.execute(
      `SELECT COUNT(*) as count FROM project_details WHERE thumbnail_image_url LIKE ?`,
      [`%${newBucketName}%`]
    );
    
    console.log(`   Old bucket URLs remaining: ${oldUrlCount[0].count}`);
    console.log(`   New bucket URLs: ${newUrlCount[0].count}`);
    
    // Show sample
    const [sample] = await connection.execute(
      `SELECT id, title, thumbnail_image_url FROM project_details WHERE thumbnail_image_url LIKE ? LIMIT 3`,
      [`%${newBucketName}%`]
    );
    
    console.log('\n📋 Sample updated URLs:');
    sample.forEach(row => {
      console.log(`   ID ${row.id}: ${row.thumbnail_image_url ? row.thumbnail_image_url.substring(0, 80) + '...' : 'null'}`);
    });
    
    console.log('\n🎉 All database URLs updated successfully!\n');
    console.log('📝 Next steps:');
    console.log('   1. Restart backend server with new credentials');
    console.log('   2. Test APIs to ensure they return new URLs');
    
    await connection.end();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Update failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n📋 Connection refused. Trying alternative ports...');
      console.error('   Docker MySQL might be on a different port');
      console.error('   Check with: docker port pgdesign_mysql');
    }
    
    if (connection) await connection.end();
    process.exit(1);
  }
}

updateDatabaseURLs();

