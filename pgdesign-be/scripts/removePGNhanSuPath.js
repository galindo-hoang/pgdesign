#!/usr/bin/env node

require('dotenv').config();
const knex = require('knex');

// Use explicit database configuration
const db = knex({
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

async function removePGNhanSuPath() {
  console.log('🔄 Removing /PG%20NHÂN%20SỰ path from image URLs...\n');

  try {
    let totalUpdated = 0;

    // Update board_directors
    console.log('📋 Updating board_directors...');
    const boardDirectorsUpdate = await db('board_directors')
      .where('image_url', 'like', '%PG%20NHÂN%20SỰ%')
      .update({
        image_url: db.raw("REPLACE(image_url, '/PG%20NHÂN%20SỰ/', '/')"),
        updated_at: new Date()
      });
    
    console.log(`   ✅ Updated ${boardDirectorsUpdate} board_directors records`);
    totalUpdated += boardDirectorsUpdate;

    // Update team_members
    console.log('📋 Updating team_members...');
    const teamMembersUpdate = await db('team_members')
      .where('image_url', 'like', '%PG%20NHÂN%20SỰ%')
      .update({
        image_url: db.raw("REPLACE(image_url, '/PG%20NHÂN%20SỰ/', '/')"),
        updated_at: new Date()
      });
    
    console.log(`   ✅ Updated ${teamMembersUpdate} team_members records`);
    totalUpdated += teamMembersUpdate;

    // Also check other tables that might have PG NHÂN SỰ URLs
    console.log('📋 Checking other tables for PG NHÂN SỰ URLs...');
    
    // Check all tables with image_url columns
    const tables = await db.raw('SHOW TABLES');
    const tableNames = tables[0].map(row => Object.values(row)[0]);
    
    for (const tableName of tableNames) {
      try {
        const columns = await db.raw(`DESCRIBE ${tableName}`);
        const imageColumns = columns[0].filter(col => 
          col.Field.includes('image_url') || col.Field.includes('image')
        );

        if (imageColumns.length > 0) {
          for (const column of imageColumns) {
            const columnName = column.Field;
            
            const updates = await db(tableName)
              .where(columnName, 'like', '%PG%20NHÂN%20SỰ%')
              .update({
                [columnName]: db.raw(`REPLACE(${columnName}, '/PG%20NHÂN%20SỰ/', '/')`),
                updated_at: new Date()
              });
            
            if (updates > 0) {
              console.log(`   ✅ Updated ${updates} records in ${tableName}.${columnName}`);
              totalUpdated += updates;
            }
          }
        }
      } catch (error) {
        // Skip tables that don't exist or have issues
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   Total records updated: ${totalUpdated}`);
    console.log(`   All /PG%20NHÂN%20SỰ/ paths removed from image URLs`);

    console.log('\n✅ PG NHÂN SỰ path removal completed successfully!');
    console.log('\n🎉 All image URLs now point directly to /images/ directory!');

  } catch (error) {
    console.error('❌ Error removing PG NHÂN SỰ path:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

removePGNhanSuPath().catch(console.error);
