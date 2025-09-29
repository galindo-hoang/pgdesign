const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);
const fs = require('fs');
const path = require('path');

/**
 * Generate base64 placeholder or read actual image file
 */
function generatePlaceholderBase64(index = 1, projectId = 'DEMO') {
  const canvas = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="40%" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">
        ${projectId}
      </text>
      <text x="50%" y="60%" text-anchor="middle" font-family="Arial" font-size="14" fill="#888">
        Image ${index}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(canvas).toString('base64')}`;
}

/**
 * Fix missing project images for APPARTMENT003
 */
async function fixMissingProjectImages() {
  try {
    console.log('🔧 Fixing missing project images...\n');
    
    const projectId = 'APPARTMENT003';
    
    // Get project detail
    const projectDetail = await db('project_details')
      .where('project_id', projectId)
      .first();
    
    if (!projectDetail) {
      console.log(`❌ Project ${projectId} not found`);
      return;
    }
    
    console.log(`📋 Found project: ${projectDetail.title} (ID: ${projectDetail.id})`);
    
    // Check existing images
    const existingImages = await db('project_image_blob_detail')
      .where('project_detail_id', projectDetail.id);
    
    console.log(`📸 Existing images: ${existingImages.length}`);
    
    if (existingImages.length > 0) {
      console.log('⚠️  Project already has images. Skipping...');
      return;
    }
    
    // Add placeholder images (19 images like in additionalProjectData)
    const imagesToAdd = [];
    for (let i = 0; i < 19; i++) {
      imagesToAdd.push({
        project_detail_id: projectDetail.id,
        image_blob: generatePlaceholderBase64(i, projectId),
        alt_text: `${projectDetail.title} - Image ${i + 1}`,
        caption: `Hình ảnh ${i + 1} của dự án ${projectDetail.title}`,
        image_type: 'project',
        display_order: i,
        is_active: true
      });
    }
    
    console.log(`📸 Adding ${imagesToAdd.length} placeholder images...`);
    
    // Insert images
    await db('project_image_blob_detail').insert(imagesToAdd);
    
    console.log(`✅ Successfully added ${imagesToAdd.length} images for ${projectId}`);
    
    // Verify the fix
    const newImageCount = await db('project_image_blob_detail')
      .where('project_detail_id', projectDetail.id)
      .count('* as count')
      .first();
    
    console.log(`📊 Total images now: ${newImageCount.count}`);
    
  } catch (error) {
    console.error('💥 Error fixing missing project images:', error);
  } finally {
    await db.destroy();
  }
}

fixMissingProjectImages();
