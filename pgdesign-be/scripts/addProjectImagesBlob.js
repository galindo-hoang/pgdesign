const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

// Sample base64 images (small placeholders)
const sampleImages = [
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', // 1x1 transparent
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mP8/5+BgYGBgYGBgYGBgQEAAP//AAPAAQbVHqgAAAAASUVORK5CYII=', // 10x10 transparent
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABElEQVR42mP8/5+BgYGBgYGBgYGBgQEAAP//AAPAAQbVHqgAAAAASUVORK5CYII=' // 20x20 transparent
];

async function addProjectImagesBlob() {
  try {
    console.log('🔧 Adding project_images_blob data to projects...');
    
    // Get all projects
    const projects = await db('project_details')
      .select('id', 'project_id', 'title', 'project_images_blob', 'tags');
    
    console.log(`📊 Found ${projects.length} projects to update`);
    
    let updatedCount = 0;
    
    for (const project of projects) {
      console.log(`\n🔄 Processing: ${project.project_id} - ${project.title}`);
      
      const updates = {};
      let needsUpdate = false;
      
      // Add project_images_blob if null
      if (!project.project_images_blob) {
        // Create 2-3 sample images for each project
        const imageCount = Math.floor(Math.random() * 2) + 2; // 2-3 images
        const projectImages = [];
        
        for (let i = 0; i < imageCount; i++) {
          projectImages.push(sampleImages[i % sampleImages.length]);
        }
        
        updates.project_images_blob = JSON.stringify(projectImages);
        console.log(`   🖼️  Added ${imageCount} sample images to project_images_blob`);
        needsUpdate = true;
      } else {
        console.log('   ✅ project_images_blob already has data');
      }
      
      // Add tags if null
      if (!project.tags) {
        const sampleTags = [
          project.title.includes('Căn hộ') ? 'căn hộ' : 'nhà phố',
          'thiết kế',
          'nội thất',
          'hiện đại'
        ];
        
        updates.tags = JSON.stringify(sampleTags);
        console.log(`   🏷️  Added sample tags: ${JSON.stringify(sampleTags)}`);
        needsUpdate = true;
      } else {
        console.log('   ✅ tags already has data');
      }
      
      // Apply updates
      if (needsUpdate) {
        await db('project_details')
          .where({ id: project.id })
          .update(updates);
        
        console.log(`   ✅ Updated project ${project.project_id}`);
        updatedCount++;
      } else {
        console.log('   ✅ No updates needed');
      }
    }
    
    console.log(`\n🎉 Update completed!`);
    console.log(`📊 Summary:`);
    console.log(`   • Total projects: ${projects.length}`);
    console.log(`   • Projects updated: ${updatedCount}`);
    
    // Test the fix with APPARTMENT005
    console.log('\n🧪 Testing APPARTMENT005 after fix:');
    const testProject = await db('project_details')
      .select('project_id', 'project_images_blob', 'tags')
      .where({ project_id: 'APPARTMENT005' })
      .first();
    
    if (testProject) {
      console.log(`   • project_images_blob: ${testProject.project_images_blob ? 'HAS DATA' : 'NULL'}`);
      console.log(`   • tags: ${testProject.tags ? 'HAS DATA' : 'NULL'}`);
      
      if (testProject.project_images_blob) {
        try {
          const parsed = JSON.parse(testProject.project_images_blob);
          console.log(`   • project_images_blob parsed: Array[${parsed.length}]`);
          console.log(`   • First image is base64: ${parsed[0] && parsed[0].startsWith('data:image/')}`);
        } catch (e) {
          console.log(`   • project_images_blob parse error: ${e.message}`);
        }
      }
      
      if (testProject.tags) {
        try {
          const parsed = JSON.parse(testProject.tags);
          console.log(`   • tags parsed: ${JSON.stringify(parsed)}`);
        } catch (e) {
          console.log(`   • tags parse error: ${e.message}`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error adding project images:', error);
  } finally {
    await db.destroy();
  }
}

addProjectImagesBlob();

