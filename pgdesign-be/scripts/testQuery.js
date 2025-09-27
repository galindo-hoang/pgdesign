const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

async function testQuery() {
  try {
    console.log('🔍 Testing queries...');
    
    // Test query with is_active = true
    const result1 = await knex('about_project_data').select('*').where({ is_active: true }).first();
    console.log('📝 Query with is_active = true:', !!result1);
    
    // Test query with is_active = 1
    const result2 = await knex('about_project_data').select('*').where({ is_active: 1 }).first();
    console.log('📝 Query with is_active = 1:', !!result2);
    
    if (result2) {
      console.log('✅ Found record with is_active = 1:');
      console.log('   - ID:', result2.id);
      console.log('   - Title:', result2.title);
      console.log('   - Has background_image_blob:', !!result2.background_image_blob);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await knex.destroy();
  }
}

testQuery();
