const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

async function debugProjectImagesData() {
  try {
    console.log('🔍 Debugging project_images_blob data...');
    
    // Get raw data from database
    const project = await db('project_details')
      .select('id', 'project_id', 'title', 'project_images', 'project_images_blob', 'tags')
      .where({ project_id: 'APPARTMENT005' })
      .first();
    
    if (!project) {
      console.log('❌ APPARTMENT005 not found');
      return;
    }
    
    console.log(`\n📦 Raw data for ${project.project_id}:`);
    console.log(`   • ID: ${project.id}`);
    console.log(`   • Title: ${project.title}`);
    
    // Debug project_images
    console.log(`\n🔍 project_images field:`);
    console.log(`   • Type: ${typeof project.project_images}`);
    console.log(`   • Value: ${project.project_images}`);
    console.log(`   • Length: ${project.project_images ? project.project_images.length : 'NULL'}`);
    console.log(`   • First 100 chars: "${project.project_images ? project.project_images.substring(0, 100) : 'NULL'}"`);
    
    // Debug project_images_blob
    console.log(`\n🔍 project_images_blob field:`);
    console.log(`   • Type: ${typeof project.project_images_blob}`);
    console.log(`   • Is null: ${project.project_images_blob === null}`);
    console.log(`   • Is undefined: ${project.project_images_blob === undefined}`);
    console.log(`   • Length: ${project.project_images_blob ? project.project_images_blob.length : 'NULL'}`);
    console.log(`   • First 100 chars: "${project.project_images_blob ? project.project_images_blob.substring(0, 100) : 'NULL'}"`);
    
    // Debug tags
    console.log(`\n🔍 tags field:`);
    console.log(`   • Type: ${typeof project.tags}`);
    console.log(`   • Value: ${project.tags}`);
    console.log(`   • Length: ${project.tags ? project.tags.length : 'NULL'}`);
    
    // Try manual JSON parsing
    console.log(`\n🧪 Manual JSON parsing tests:`);
    
    if (project.project_images) {
      try {
        const parsed = JSON.parse(project.project_images);
        console.log(`   ✅ project_images parsed successfully: ${Array.isArray(parsed) ? `Array[${parsed.length}]` : typeof parsed}`);
      } catch (e) {
        console.log(`   ❌ project_images parse error: ${e.message}`);
        console.log(`   🔧 Attempting to fix: Wrap in array`);
        try {
          const fixed = JSON.parse(`["${project.project_images}"]`);
          console.log(`   ✅ Fixed version works: Array[${fixed.length}]`);
        } catch (e2) {
          console.log(`   ❌ Fix attempt failed: ${e2.message}`);
        }
      }
    }
    
    if (project.project_images_blob) {
      try {
        const parsed = JSON.parse(project.project_images_blob);
        console.log(`   ✅ project_images_blob parsed successfully: ${Array.isArray(parsed) ? `Array[${parsed.length}]` : typeof parsed}`);
        
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log(`   📊 First image info:`);
          console.log(`     • Type: ${typeof parsed[0]}`);
          console.log(`     • Is base64: ${parsed[0].startsWith('data:image/')}`);
          console.log(`     • Size: ${(parsed[0].length / 1024).toFixed(1)}KB`);
        }
      } catch (e) {
        console.log(`   ❌ project_images_blob parse error: ${e.message}`);
        console.log(`   🔧 Attempting to fix: Wrap in array`);
        try {
          const fixed = JSON.parse(`["${project.project_images_blob.replace(/"/g, '\\"')}"]`);
          console.log(`   ✅ Fixed version works: Array[${fixed.length}]`);
        } catch (e2) {
          console.log(`   ❌ Fix attempt failed: ${e2.message}`);
        }
      }
    }
    
    if (project.tags) {
      try {
        const parsed = JSON.parse(project.tags);
        console.log(`   ✅ tags parsed successfully: ${Array.isArray(parsed) ? `Array[${parsed.length}]` : typeof parsed}`);
      } catch (e) {
        console.log(`   ❌ tags parse error: ${e.message}`);
        console.log(`   🔧 Attempting to fix: Split by comma`);
        const tagsArray = project.tags.split(',').map(tag => tag.trim());
        console.log(`   ✅ Fixed version: Array[${tagsArray.length}] = ${JSON.stringify(tagsArray)}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error debugging data:', error);
  } finally {
    await db.destroy();
  }
}

debugProjectImagesData();

