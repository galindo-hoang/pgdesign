const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

/**
 * Check project images data
 */
async function checkProjectImages() {
  try {
    console.log('🔍 Checking project images data...\n');
    
    // Check specific project
    const projectId = 'APPARTMENT003';
    
    // Check project_details table
    const projectDetail = await db('project_details')
      .where('project_id', projectId)
      .first();
    
    if (!projectDetail) {
      console.log(`❌ Project ${projectId} not found`);
      return;
    }
    
    console.log('📋 Project Detail:', {
      id: projectDetail.id,
      project_id: projectDetail.project_id,
      project_images: projectDetail.project_images ? 'Has data' : 'Empty/null',
      project_images_blob: projectDetail.project_images_blob ? 'Has data' : 'Empty/null'
    });
    
    // Check project_image_blob_detail table
    const images = await db('project_image_blob_detail')
      .where('project_detail_id', projectDetail.id);
    
    console.log(`\n📸 Images in project_image_blob_detail: ${images.length}`);
    
    if (images.length > 0) {
      images.forEach((image, index) => {
        console.log(`Image ${index + 1}:`, {
          id: image.id,
          image_type: image.image_type,
          has_blob: !!image.image_blob,
          blob_length: image.image_blob ? image.image_blob.length : 0,
          display_order: image.display_order
        });
      });
    } else {
      console.log('⚠️  No images found in project_image_blob_detail table');
    }
    
    // Check total projects with images
    const totalProjectsWithImages = await db('project_image_blob_detail')
      .countDistinct('project_detail_id as count')
      .first();
    
    console.log(`\n📊 Total projects with images: ${totalProjectsWithImages.count}`);
    
    // Show sample projects with images
    const sampleProjects = await db('project_details as pd')
      .join('project_image_blob_detail as pibd', 'pd.id', 'pibd.project_detail_id')
      .select('pd.project_id', 'pd.title')
      .groupBy('pd.id', 'pd.project_id', 'pd.title')
      .limit(5);
    
    console.log('\n📋 Sample projects with images:');
    sampleProjects.forEach(project => {
      console.log(`  - ${project.project_id}: ${project.title}`);
    });
    
  } catch (error) {
    console.error('💥 Error checking project images:', error);
  } finally {
    await db.destroy();
  }
}

checkProjectImages();
