const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

async function debugTagsData() {
  try {
    console.log('🔍 Debugging tags data...\n');
    
    // Get first 3 projects with tags
    const projects = await db('project_details')
      .select('id', 'project_id', 'title', 'tags')
      .whereNotNull('tags')
      .limit(3);
    
    for (const project of projects) {
      console.log(`📋 Project: ${project.project_id}`);
      console.log(`   Tags raw value: "${project.tags}"`);
      console.log(`   Tags type: ${typeof project.tags}`);
      console.log(`   Tags length: ${project.tags ? project.tags.length : 'null'}`);
      console.log(`   Contains comma: ${project.tags ? project.tags.includes(',') : 'N/A'}`);
      console.log(`   Starts with [: ${project.tags ? project.tags.startsWith('[') : 'N/A'}`);
      
      // Try manual conversion
      if (project.tags && typeof project.tags === 'string' && project.tags.includes(',')) {
        const tagsArray = project.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        const jsonString = JSON.stringify(tagsArray);
        console.log(`   Manual conversion: ${jsonString}`);
        
        // Test update
        try {
          await db('project_details')
            .where('id', project.id)
            .update({ tags: jsonString });
          console.log(`   ✅ Successfully updated ${project.project_id}`);
        } catch (error) {
          console.log(`   ❌ Update failed: ${error.message}`);
        }
      }
      console.log('');
    }
    
  } catch (error) {
    console.error('💥 Debug failed:', error);
  } finally {
    await db.destroy();
  }
}

debugTagsData();
