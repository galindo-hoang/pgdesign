const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

async function checkData() {
  try {
    console.log('🔍 Checking project_details table...');
    
    // Check if table exists
    const hasTable = await db.schema.hasTable('project_details');
    console.log(`📋 Table exists: ${hasTable}`);
    
    if (hasTable) {
      // Count records
      const count = await db('project_details').count('* as count').first();
      console.log(`📊 Total records: ${count.count}`);
      
      // Show columns
      const columns = await db.raw('DESCRIBE project_details');
      console.log('📝 Table columns:');
      columns[0].forEach(col => {
        console.log(`   • ${col.Field} (${col.Type}) - ${col.Null === 'YES' ? 'Nullable' : 'Not Null'}`);
      });
      
      // Show first few records
      if (count.count > 0) {
        const samples = await db('project_details')
          .select('id', 'project_id', 'title', 'thumbnail_image', 'thumbnail_image_blob')
          .limit(3);
        
        console.log('\n🔍 Sample records:');
        samples.forEach(record => {
          console.log(`   • ID: ${record.id}, Project: ${record.project_id}`);
          console.log(`     Title: ${record.title}`);
          console.log(`     Thumbnail URL: ${record.thumbnail_image ? 'EXISTS' : 'NULL'}`);
          console.log(`     Thumbnail Blob: ${record.thumbnail_image_blob ? 'EXISTS' : 'NULL'}`);
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await db.destroy();
  }
}

checkData();
