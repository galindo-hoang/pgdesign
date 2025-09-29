const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

// Import the model
const ProjectDetailModel = require('../dist/models/ProjectDetailModel.js').default;

async function testFindByProjectId() {
  try {
    console.log('🔍 Testing findByProjectId function...');
    
    // First, check what projects exist in database
    console.log('\n📊 Checking existing projects:');
    const allProjects = await db('project_details')
      .select('id', 'project_id', 'title', 'project_images', 'project_images_blob')
      .limit(5);
    
    console.log(`Found ${allProjects.length} projects:`);
    allProjects.forEach(project => {
      console.log(`   • ${project.project_id}: ${project.title}`);
      console.log(`     project_images: ${project.project_images ? 'HAS DATA' : 'NULL'}`);
      console.log(`     project_images_blob: ${project.project_images_blob ? 'HAS DATA' : 'NULL'}`);
      
      if (project.project_images_blob) {
        try {
          const parsed = JSON.parse(project.project_images_blob);
          console.log(`     project_images_blob count: ${Array.isArray(parsed) ? parsed.length : 'NOT ARRAY'}`);
        } catch (e) {
          console.log(`     project_images_blob: INVALID JSON`);
        }
      }
    });
    
    // Test with first available project
    if (allProjects.length > 0) {
      const testProjectId = allProjects[0].project_id;
      console.log(`\n🧪 Testing findByProjectId with: ${testProjectId}`);
      
      // Call the model method
      const result = await ProjectDetailModel.findByProjectId(testProjectId);
      
      if (result) {
        console.log('✅ findByProjectId returned data:');
        console.log(`   • id: ${result.id}`);
        console.log(`   • projectId: ${result.projectId}`);
        console.log(`   • title: ${result.title}`);
        console.log(`   • projectImages: ${result.projectImages ? (Array.isArray(result.projectImages) ? `Array[${result.projectImages.length}]` : 'NOT ARRAY') : 'NULL/UNDEFINED'}`);
        console.log(`   • projectImagesBlob: ${result.projectImagesBlob ? (Array.isArray(result.projectImagesBlob) ? `Array[${result.projectImagesBlob.length}]` : 'NOT ARRAY') : 'NULL/UNDEFINED'}`);
        
        // Check if projectImagesBlob exists in the returned object
        const hasProjectImagesBlob = 'projectImagesBlob' in result;
        console.log(`   • Has projectImagesBlob property: ${hasProjectImagesBlob}`);
        
        if (hasProjectImagesBlob && result.projectImagesBlob) {
          console.log(`   • projectImagesBlob type: ${typeof result.projectImagesBlob}`);
          console.log(`   • projectImagesBlob is array: ${Array.isArray(result.projectImagesBlob)}`);
          
          if (Array.isArray(result.projectImagesBlob) && result.projectImagesBlob.length > 0) {
            console.log(`   • First image preview: ${result.projectImagesBlob[0].substring(0, 50)}...`);
            console.log(`   • First image is base64: ${result.projectImagesBlob[0].startsWith('data:image/')}`);
          }
        }
        
        // Test JSON serialization (like API does)
        console.log('\n🔄 Testing JSON serialization:');
        const serialized = JSON.stringify(result);
        const deserialized = JSON.parse(serialized);
        
        console.log(`   • Serialized size: ${(serialized.length / 1024).toFixed(1)}KB`);
        console.log(`   • Deserialized has projectImagesBlob: ${'projectImagesBlob' in deserialized}`);
        console.log(`   • Deserialized projectImagesBlob: ${deserialized.projectImagesBlob ? (Array.isArray(deserialized.projectImagesBlob) ? `Array[${deserialized.projectImagesBlob.length}]` : 'NOT ARRAY') : 'NULL/UNDEFINED'}`);
        
      } else {
        console.log('❌ findByProjectId returned null');
      }
    }
    
    // Test specifically with APPARTMENT005 if it exists
    console.log('\n🎯 Testing specifically with APPARTMENT005:');
    const appartment005 = await ProjectDetailModel.findByProjectId('APPARTMENT005');
    
    if (appartment005) {
      console.log('✅ APPARTMENT005 found!');
      console.log(`   • projectImagesBlob: ${appartment005.projectImagesBlob ? (Array.isArray(appartment005.projectImagesBlob) ? `Array[${appartment005.projectImagesBlob.length}]` : 'NOT ARRAY') : 'NULL/UNDEFINED'}`);
    } else {
      console.log('❌ APPARTMENT005 not found in database');
      
      // Check if it exists in raw database
      const rawCheck = await db('project_details')
        .select('project_id', 'title')
        .where({ project_id: 'APPARTMENT005' })
        .first();
      
      console.log(`   • Raw database check: ${rawCheck ? 'EXISTS' : 'NOT EXISTS'}`);
    }
    
  } catch (error) {
    console.error('❌ Error testing findByProjectId:', error);
  } finally {
    await db.destroy();
  }
}

testFindByProjectId();

