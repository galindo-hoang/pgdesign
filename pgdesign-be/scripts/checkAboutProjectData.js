const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

async function checkAboutProjectData() {
  try {
    console.log('🔍 Checking about_project_data table...');
    
    // Check table structure
    const columns = await knex('about_project_data').columnInfo();
    console.log('📋 Table columns:', Object.keys(columns));
    
    // Check data
    const data = await knex('about_project_data').select('*');
    console.log('📊 Number of records:', data.length);
    
    if (data.length > 0) {
      const record = data[0];
      console.log('📝 First record:');
      console.log('   - ID:', record.id);
      console.log('   - Title:', record.title);
      console.log('   - Subtitle:', record.subtitle);
      console.log('   - Has background_image_blob:', !!record.background_image_blob);
      console.log('   - Background image blob length:', record.background_image_blob ? record.background_image_blob.length : 0);
      console.log('   - Is Active:', record.is_active);
      console.log('   - Created At:', record.created_at);
      console.log('   - Updated At:', record.updated_at);
    }
    
  } catch (error) {
    console.error('❌ Error checking data:', error);
  } finally {
    await knex.destroy();
  }
}

checkAboutProjectData();
