const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

/**
 * Fix tags format in database - handle Buffer/object conversion
 */
async function fixTagsFormatFinal() {
  try {
    console.log('🔧 Fixing tags format in database (final version)...\n');
    
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
        let currentTags = project.tags;
        
        // Convert Buffer/object to string if needed
        if (currentTags && typeof currentTags === 'object' && currentTags.constructor === Buffer) {
          currentTags = currentTags.toString('utf8');
        } else if (currentTags && typeof currentTags === 'object' && currentTags.length !== undefined) {
          // Array-like object
          currentTags = Array.from(currentTags).map(byte => String.fromCharCode(byte)).join('');
        } else if (currentTags && typeof currentTags === 'object') {
          currentTags = String(currentTags);
        }
        
        console.log(`🔍 ${project.project_id}: Processing tags "${currentTags}" (type: ${typeof currentTags})`);
        
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
        
        // Convert to proper JSON array
        if (typeof currentTags === 'string' && currentTags.trim().length > 0) {
          let tagsArray;
          
          if (currentTags.includes(',')) {
            // Multiple tags separated by comma
            tagsArray = currentTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
            console.log(`🔧 ${project.project_id}: Converting comma-separated "${currentTags}"`);
          } else {
            // Single tag
            tagsArray = [currentTags.trim()];
            console.log(`🔧 ${project.project_id}: Converting single tag "${currentTags}"`);
          }
          
          newTags = JSON.stringify(tagsArray);
          console.log(`   → Result: ${newTags}`);
          
          // Update in database
          await db('project_details')
            .where('id', project.id)
            .update({ tags: newTags });
          
          fixedCount++;
        } else {
          console.log(`⚠️  ${project.project_id}: Empty or invalid tags format`);
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
    console.log(`   • Fixed to JSON format: ${fixedCount}`);
    console.log(`   • Errors: ${errorCount}`);
    
    // Verify the results
    console.log('\n🔍 Verification:');
    const verifyProjects = await db('project_details')
      .select('project_id', 'title', 'tags')
      .whereNotNull('tags')
      .limit(5);
    
    for (const project of verifyProjects) {
      try {
        let tags = project.tags;
        // Handle Buffer/object conversion for verification
        if (tags && typeof tags === 'object' && tags.constructor === Buffer) {
          tags = tags.toString('utf8');
        }
        
        const parsed = JSON.parse(tags);
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
fixTagsFormatFinal();
