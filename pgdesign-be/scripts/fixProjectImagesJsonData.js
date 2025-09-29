const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

async function fixProjectImagesJsonData() {
  try {
    console.log('🔧 Fixing project_images JSON data...');
    
    // Get all projects with data issues
    const projects = await db('project_details')
      .select('id', 'project_id', 'title', 'project_images', 'project_images_blob', 'tags');
    
    console.log(`📊 Found ${projects.length} projects to check`);
    
    let fixedCount = 0;
    
    for (const project of projects) {
      console.log(`\n🔄 Checking: ${project.project_id} - ${project.title}`);
      
      const updates = {};
      let needsUpdate = false;
      
      // Fix project_images
      if (project.project_images) {
        try {
          JSON.parse(project.project_images);
          console.log('   ✅ project_images: Valid JSON');
        } catch (error) {
          console.log('   ❌ project_images: Invalid JSON, attempting to fix...');
          
          // If it's a single URL, convert to array
          if (typeof project.project_images === 'string' && project.project_images.startsWith('/')) {
            updates.project_images = JSON.stringify([project.project_images]);
            console.log('   🔧 Fixed project_images: Single URL → JSON array');
            needsUpdate = true;
          } else {
            // Set to null if can't fix
            updates.project_images = null;
            console.log('   🗑️  Set project_images to NULL (unfixable)');
            needsUpdate = true;
          }
        }
      }
      
      // Fix project_images_blob
      if (project.project_images_blob) {
        try {
          const parsed = JSON.parse(project.project_images_blob);
          console.log(`   ✅ project_images_blob: Valid JSON with ${Array.isArray(parsed) ? parsed.length : 'non-array'} items`);
        } catch (error) {
          console.log('   ❌ project_images_blob: Invalid JSON, attempting to fix...');
          
          // If it's a single base64 string, convert to array
          if (typeof project.project_images_blob === 'string' && project.project_images_blob.startsWith('data:image/')) {
            updates.project_images_blob = JSON.stringify([project.project_images_blob]);
            console.log('   🔧 Fixed project_images_blob: Single base64 → JSON array');
            needsUpdate = true;
          } else {
            // Set to null if can't fix
            updates.project_images_blob = null;
            console.log('   🗑️  Set project_images_blob to NULL (unfixable)');
            needsUpdate = true;
          }
        }
      }
      
      // Fix tags
      if (project.tags) {
        try {
          JSON.parse(project.tags);
          console.log('   ✅ tags: Valid JSON');
        } catch (error) {
          console.log('   ❌ tags: Invalid JSON, attempting to fix...');
          
          // If it's a comma-separated string, convert to array
          if (typeof project.tags === 'string') {
            const tagsArray = project.tags.split(',').map(tag => tag.trim());
            updates.tags = JSON.stringify(tagsArray);
            console.log(`   🔧 Fixed tags: "${project.tags}" → JSON array`);
            needsUpdate = true;
          } else {
            // Set to null if can't fix
            updates.tags = null;
            console.log('   🗑️  Set tags to NULL (unfixable)');
            needsUpdate = true;
          }
        }
      }
      
      // Apply updates if needed
      if (needsUpdate) {
        await db('project_details')
          .where({ id: project.id })
          .update(updates);
        
        console.log(`   ✅ Updated project ${project.project_id}`);
        fixedCount++;
      } else {
        console.log('   ✅ No fixes needed');
      }
    }
    
    console.log(`\n🎉 Fix completed!`);
    console.log(`📊 Summary:`);
    console.log(`   • Total projects checked: ${projects.length}`);
    console.log(`   • Projects fixed: ${fixedCount}`);
    
    // Test one project after fix
    if (projects.length > 0) {
      console.log('\n🧪 Testing after fix:');
      const testProject = await db('project_details')
        .select('project_id', 'project_images', 'project_images_blob', 'tags')
        .where({ project_id: projects[0].project_id })
        .first();
      
      console.log(`   • Testing: ${testProject.project_id}`);
      
      // Test JSON parsing
      try {
        const projectImages = testProject.project_images ? JSON.parse(testProject.project_images) : null;
        console.log(`   • project_images: ${projectImages ? `Array[${projectImages.length}]` : 'NULL'}`);
      } catch (e) {
        console.log(`   • project_images: Still invalid JSON`);
      }
      
      try {
        const projectImagesBlob = testProject.project_images_blob ? JSON.parse(testProject.project_images_blob) : null;
        console.log(`   • project_images_blob: ${projectImagesBlob ? `Array[${projectImagesBlob.length}]` : 'NULL'}`);
      } catch (e) {
        console.log(`   • project_images_blob: Still invalid JSON`);
      }
      
      try {
        const tags = testProject.tags ? JSON.parse(testProject.tags) : null;
        console.log(`   • tags: ${tags ? `Array[${tags.length}]` : 'NULL'}`);
      } catch (e) {
        console.log(`   • tags: Still invalid JSON`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error fixing data:', error);
  } finally {
    await db.destroy();
  }
}

fixProjectImagesJsonData();

