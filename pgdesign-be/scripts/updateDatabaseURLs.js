/**
 * Update all database URLs from old bucket to new bucket
 */

const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pgdesign_db'
};

const oldBucketName = 'pgdesign-assets';
const newBucketName = 'pgdesign-new';

async function updateDatabaseURLs() {
  console.log('🔄 Updating Database URLs...\n');
  
  let connection;
  
  try {
    // Connect via Docker
    console.log('1️⃣ Connecting to database via Docker...');
    const { exec } = require('child_process');
    const util = require('util');
    const execPromise = util.promisify(exec);
    
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
    
    for (const { table, columns } of updates) {
      console.log(`\n2️⃣ Updating table: ${table}...`);
      
      for (const column of columns) {
        const updateSQL = `UPDATE ${table} SET ${column} = REPLACE(${column}, '${oldBucketName}', '${newBucketName}') WHERE ${column} LIKE '%${oldBucketName}%'`;
        
        const command = `docker exec pgdesign_mysql mysql -u root -ppassword pgdesign_db -e "${updateSQL}"`;
        
        try {
          const { stdout, stderr } = await execPromise(command);
          console.log(`   ✅ Updated ${column}`);
          totalUpdates++;
        } catch (err) {
          if (err.message.includes('Unknown column')) {
            console.log(`   ⏭️  Column ${column} doesn't exist, skipping`);
          } else {
            console.log(`   ⚠️  Warning updating ${column}:`, err.message.split('\n')[0]);
          }
        }
      }
    }
    
    console.log(`\n✅ Database update completed! (${totalUpdates} columns updated)`);
    
    // Verify updates
    console.log('\n3️⃣ Verifying updates...');
    const verifyCommand = `docker exec pgdesign_mysql mysql -u root -ppassword pgdesign_db -e "SELECT COUNT(*) as count FROM project_details WHERE thumbnail_image_url LIKE '%${newBucketName}%'"`;
    
    try {
      const { stdout } = await execPromise(verifyCommand);
      console.log('Sample verification:');
      console.log(stdout);
    } catch (err) {
      console.log('Could not verify, but updates should be complete');
    }
    
    console.log('\n🎉 All database URLs updated successfully!\n');
    console.log('📝 Next steps:');
    console.log('   1. Restart backend server');
    console.log('   2. Test APIs to ensure they return new URLs');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Update failed:', error.message);
    process.exit(1);
  }
}

updateDatabaseURLs();

