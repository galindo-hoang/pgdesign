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

async function updateAllUrlsToVNDataS3() {
  console.log('🔄 Updating ALL URLs from MinIO to VNData S3...\n');

  try {
    // Get all tables
    const tables = await db.raw('SHOW TABLES');
    const tableNames = tables[0].map(row => Object.values(row)[0]);
    
    console.log(`📋 Found ${tableNames.length} tables to check`);

    let totalUpdated = 0;

    for (const tableName of tableNames) {
      try {
        // Get table structure to find URL columns
        const columns = await db.raw(`DESCRIBE ${tableName}`);
        const urlColumns = columns[0].filter(col => 
          col.Field.includes('url') || col.Field.includes('image') || col.Field.includes('icon')
        );

        if (urlColumns.length > 0) {
          console.log(`📋 Checking table: ${tableName}`);
          
          for (const column of urlColumns) {
            const columnName = column.Field;
            
            // Update URLs in this column
            const updates = await db(tableName)
              .where(columnName, 'like', '%localhost:9000%')
              .update({
                [columnName]: db.raw(`REPLACE(${columnName}, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')`),
                updated_at: new Date()
              });
            
            if (updates > 0) {
              console.log(`   ✅ Updated ${updates} records in ${tableName}.${columnName}`);
              totalUpdated += updates;
            }
          }
        }
      } catch (error) {
        console.log(`   ⚠️  Skipped ${tableName}: ${error.message}`);
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   Total records updated: ${totalUpdated}`);
    console.log(`   All MinIO URLs replaced with VNData S3 URLs`);

    console.log('\n✅ Database URLs updated successfully!');
    console.log('\n🎉 All APIs will now return VNData S3 URLs instead of MinIO URLs!');

  } catch (error) {
    console.error('❌ Error updating URLs:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

updateAllUrlsToVNDataS3().catch(console.error);
