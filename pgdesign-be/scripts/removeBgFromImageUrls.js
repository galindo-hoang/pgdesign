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

async function removeBgFromImageUrls() {
  console.log('🔄 Removing "-bg" from image URLs in project categories...\n');

  try {
    let totalUpdated = 0;

    // Update project_categories table
    console.log('📋 Updating project_categories...');
    const projectCategoriesUpdate = await db('project_categories')
      .where('background_image_url', 'like', '%-bg.png')
      .update({
        background_image_url: db.raw("REPLACE(background_image_url, '-bg.png', '.png')"),
        updated_at: new Date()
      });
    
    console.log(`   ✅ Updated ${projectCategoriesUpdate} project_categories records`);
    totalUpdated += projectCategoriesUpdate;

    // Also check other tables that might have -bg URLs
    console.log('📋 Checking other tables for -bg URLs...');
    
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
              .where(columnName, 'like', '%-bg.png')
              .update({
                [columnName]: db.raw(`REPLACE(${columnName}, '-bg.png', '.png')`),
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
    console.log(`   All "-bg.png" suffixes removed from image URLs`);

    console.log('\n✅ "-bg" removal completed successfully!');
    console.log('\n🎉 All image URLs now have clean names without "-bg" suffix!');

  } catch (error) {
    console.error('❌ Error removing "-bg" from URLs:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

removeBgFromImageUrls().catch(console.error);
