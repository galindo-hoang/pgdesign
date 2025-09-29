const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

/**
 * Reset tags based on category types
 */
async function resetTagsFromCategories() {
  try {
    console.log('🔧 Resetting tags based on categories...\n');
    
    // Define category-based tag mappings
    const categoryTagMappings = {
      'appartment': ['căn hộ', 'nội thất', 'hiện đại', 'chung cư'],
      'house-normal': ['nhà phố', 'nội thất', 'hiện đại', 'thiết kế'],
      'village': ['biệt thự', 'villa', 'nội thất', 'hiện đại'],
      'house-business': ['thương mại', 'kinh doanh', 'nội thất', 'hiện đại']
    };
    
    // Get all projects
    const projects = await db('project_details')
      .select('id', 'project_id', 'title', 'category', 'address');
    
    console.log(`📋 Found ${projects.length} projects to update`);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const project of projects) {
      try {
        const category = project.category;
        const baseTags = categoryTagMappings[category] || ['nội thất', 'hiện đại'];
        
        // Add location tag from address if available
        const locationTags = [];
        if (project.address) {
          const addressParts = project.address.split(/[,\s]+/).filter(part => part.length > 1);
          if (addressParts.length > 0) {
            locationTags.push(addressParts[addressParts.length - 1].toUpperCase());
          }
        }
        
        // Combine tags
        const finalTags = [...baseTags, ...locationTags];
        const tagsJson = JSON.stringify(finalTags);
        
        console.log(`🔧 ${project.project_id} (${category}): ${tagsJson}`);
        
        // Update in database
        await db('project_details')
          .where('id', project.id)
          .update({ tags: tagsJson });
        
        updatedCount++;
        
      } catch (error) {
        console.error(`❌ Error updating ${project.project_id}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Tags reset completed!');
    console.log(`📊 Summary:`);
    console.log(`   • Projects updated: ${updatedCount}`);
    console.log(`   • Errors: ${errorCount}`);
    
    // Verify the results
    console.log('\n🔍 Verification - Sample tags:');
    const verifyProjects = await db('project_details')
      .select('project_id', 'category', 'tags')
      .orderBy('category')
      .limit(8);
    
    for (const project of verifyProjects) {
      try {
        let tags = project.tags;
        
        // Handle potential Buffer conversion
        if (tags && typeof tags === 'object' && tags.constructor === Buffer) {
          tags = tags.toString('utf8');
        }
        
        const parsed = JSON.parse(tags);
        console.log(`✅ ${project.project_id} (${project.category}): ${JSON.stringify(parsed)}`);
      } catch (error) {
        console.log(`❌ ${project.project_id}: Parse error - ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('💥 Tags reset failed:', error);
  } finally {
    await db.destroy();
  }
}

// Run the reset
resetTagsFromCategories();
