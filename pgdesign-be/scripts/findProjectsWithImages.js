const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

async function findProjectsWithImages() {
  try {
    console.log('🔍 Finding projects with image data...');
    
    // Find projects with project_images_blob data
    const projectsWithBlob = await db('project_details')
      .select('id', 'project_id', 'title', 'project_images_blob')
      .whereNotNull('project_images_blob')
      .limit(10);
    
    console.log(`\n📊 Projects with project_images_blob: ${projectsWithBlob.length}`);
    projectsWithBlob.forEach(project => {
      console.log(`   • ${project.project_id}: ${project.title}`);
      console.log(`     Blob length: ${project.project_images_blob ? project.project_images_blob.length : 'NULL'}`);
    });
    
    // Find projects with project_images data
    const projectsWithImages = await db('project_details')
      .select('id', 'project_id', 'title', 'project_images')
      .whereNotNull('project_images')
      .limit(10);
    
    console.log(`\n📊 Projects with project_images: ${projectsWithImages.length}`);
    projectsWithImages.forEach(project => {
      console.log(`   • ${project.project_id}: ${project.title}`);
      console.log(`     Images length: ${project.project_images ? project.project_images.length : 'NULL'}`);
    });
    
    // Find projects with thumbnail_image_blob data
    const projectsWithThumbnailBlob = await db('project_details')
      .select('id', 'project_id', 'title', 'thumbnail_image_blob')
      .whereNotNull('thumbnail_image_blob')
      .limit(10);
    
    console.log(`\n📊 Projects with thumbnail_image_blob: ${projectsWithThumbnailBlob.length}`);
    projectsWithThumbnailBlob.forEach(project => {
      console.log(`   • ${project.project_id}: ${project.title}`);
      const blobLength = project.thumbnail_image_blob ? project.thumbnail_image_blob.length : 0;
      console.log(`     Thumbnail blob: ${blobLength > 0 ? `${(blobLength / 1024).toFixed(1)}KB` : 'NULL'}`);
    });
    
    // Check specific project data in detail
    if (projectsWithThumbnailBlob.length > 0) {
      const testProject = projectsWithThumbnailBlob[0];
      console.log(`\n🧪 Detailed check for: ${testProject.project_id}`);
      
      const fullData = await db('project_details')
        .select('*')
        .where({ project_id: testProject.project_id })
        .first();
      
      console.log(`   • project_images type: ${typeof fullData.project_images}`);
      console.log(`   • project_images_blob type: ${typeof fullData.project_images_blob}`);
      console.log(`   • tags type: ${typeof fullData.tags}`);
      
      console.log(`   • project_images is null: ${fullData.project_images === null}`);
      console.log(`   • project_images_blob is null: ${fullData.project_images_blob === null}`);
      console.log(`   • tags is null: ${fullData.tags === null}`);
      
      if (fullData.project_images_blob) {
        console.log(`   • project_images_blob preview: "${fullData.project_images_blob.substring(0, 100)}..."`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error finding projects:', error);
  } finally {
    await db.destroy();
  }
}

findProjectsWithImages();

