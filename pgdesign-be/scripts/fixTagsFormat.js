const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

/**
 * Fix tags format in database - convert comma-separated strings to JSON arrays
 */
async function fixTagsFormat() {
  try {
    console.log('🔧 Fixing tags format in database...\n');
    
    // Get all projects with tags
    const projects = await db('project_details')
      .select('id', 'project_id', 'title', 'tags')
      .whereNotNull('tags');
    
    console.log(`📋 Found ${projects.length} projects with tags`);
    
    let fixedCount = 0;
    let alreadyValidCount = 0;
    let errorCount = 0;
    
    for (const project of projects) {
      try {
        const currentTags = project.tags;
        let newTags = null;
        
        // Check if it's already valid JSON
        try {
          const parsed = JSON.parse(currentTags);
          if (Array.isArray(parsed)) {
            console.log(`✅ ${project.project_id}: Already valid JSON array`);
            alreadyValidCount++;
            continue;
          }
        } catch (e) {
          // Not valid JSON, continue to fix
        }
        
        // Convert comma-separated string to JSON array
        if (typeof currentTags === 'string') {
          if (currentTags.includes(',')) {
            // Multiple tags separated by comma
            const tagsArray = currentTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
            newTags = JSON.stringify(tagsArray);
            
            console.log(`🔧 ${project.project_id}: Converting comma-separated "${currentTags}" → ${newTags}`);
          } else if (currentTags.trim().length > 0) {
            // Single tag, convert to array
            const tagsArray = [currentTags.trim()];
            newTags = JSON.stringify(tagsArray);
            
            console.log(`🔧 ${project.project_id}: Converting single tag "${currentTags}" → ${newTags}`);
          }
          
          if (newTags) {
            // Update in database
            await db('project_details')
              .where('id', project.id)
              .update({ tags: newTags });
            
            fixedCount++;
          }
        } else {
          console.log(`⚠️  ${project.project_id}: Unknown tags format: "${currentTags}"`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${project.project_id}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Tags format fix completed!');
    console.log(`📊 Summary:`);
    console.log(`   • Projects processed: ${projects.length}`);
    console.log(`   • Already valid JSON: ${alreadyValidCount}`);
    console.log(`   • Fixed comma-separated: ${fixedCount}`);
    console.log(`   • Errors: ${errorCount}`);
    
    // Verify the results
    console.log('\n🔍 Verification:');
    const verifyProjects = await db('project_details')
      .select('project_id', 'title', 'tags')
      .whereNotNull('tags')
      .limit(5);
    
    for (const project of verifyProjects) {
      try {
        const parsed = JSON.parse(project.tags);
        console.log(`✅ ${project.project_id}: ${JSON.stringify(parsed)}`);
      } catch (error) {
        console.log(`❌ ${project.project_id}: Still invalid JSON - "${project.tags}"`);
      }
    }
    
  } catch (error) {
    console.error('💥 Tags format fix failed:', error);
  } finally {
    await db.destroy();
  }
}

// Run the fix
fixTagsFormat();
