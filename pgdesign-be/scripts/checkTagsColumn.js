const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

async function checkTagsColumn() {
  try {
    console.log('🔍 Checking tags column info...\n');
    
    // Check column info
    const columnInfo = await db.raw("DESCRIBE project_details");
    const tagsColumn = columnInfo[0].find(col => col.Field === 'tags');
    
    console.log('📋 Tags column info:');
    console.log(tagsColumn);
    
    // Check actual data
    console.log('\n📋 Sample raw data:');
    const samples = await db.raw("SELECT id, project_id, tags, HEX(tags) as tags_hex FROM project_details WHERE tags IS NOT NULL LIMIT 3");
    
    for (const row of samples[0]) {
      console.log(`ID: ${row.id}, Project: ${row.project_id}`);
      console.log(`  Tags: "${row.tags}"`);
      console.log(`  Tags HEX: ${row.tags_hex}`);
      console.log(`  Tags type: ${typeof row.tags}`);
      console.log('');
    }
    
  } catch (error) {
    console.error('💥 Check failed:', error);
  } finally {
    await db.destroy();
  }
}

checkTagsColumn();
