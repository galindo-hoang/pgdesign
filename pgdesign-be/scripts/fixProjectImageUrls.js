#!/usr/bin/env node

// Script to fix project image URLs to use correct mock-assets path
require('dotenv').config();
const knex = require('knex');

// Database configuration (use development with correct settings)
const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootpassword',
    database: 'pgdesign_dev',
    charset: 'utf8mb4'
  },
  pool: {
    min: 2,
    max: 10
  },
  useNullAsDefault: true
});

async function fixProjectImageUrls() {
  console.log('🔧 Fixing project image URLs to use mock-assets path...\n');

  try {
    // Get all projects with image URLs
    const projects = await db('project_details')
      .select('id', 'project_images_urls', 'thumbnail_image_url')
      .whereNotNull('project_images_urls');

    console.log(`📊 Found ${projects.length} projects with image URLs`);

    let updatedCount = 0;

    for (const project of projects) {
      let needsUpdate = false;
      let updatedThumbnail = project.thumbnail_image_url;
      let updatedImages = project.project_images_urls;

      // Fix thumbnail URL
      if (project.thumbnail_image_url && 
          project.thumbnail_image_url.includes('pgdesign-new/project-details/')) {
        updatedThumbnail = project.thumbnail_image_url.replace(
          'pgdesign-new/project-details/',
          'pgdesign-new/mock-assets/'
        );
        needsUpdate = true;
      }

      // Fix project images URLs
      if (project.project_images_urls && Array.isArray(project.project_images_urls)) {
        updatedImages = project.project_images_urls.map(url => {
          if (url && url.includes('pgdesign-new/project-details/')) {
            return url.replace('pgdesign-new/project-details/', 'pgdesign-new/mock-assets/');
          }
          return url;
        });
        
        // Check if any URLs were changed
        if (JSON.stringify(updatedImages) !== JSON.stringify(project.project_images_urls)) {
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        await db('project_details')
          .where('id', project.id)
          .update({
            thumbnail_image_url: updatedThumbnail,
            project_images_urls: JSON.stringify(updatedImages)
          });

        console.log(`✅ Updated project ID ${project.id}`);
        console.log(`   Thumbnail: ${updatedThumbnail}`);
        console.log(`   Images: ${updatedImages.length} URLs`);
        updatedCount++;
      }
    }

    console.log(`\n🎯 Summary:`);
    console.log(`   Total projects checked: ${projects.length}`);
    console.log(`   Projects updated: ${updatedCount}`);
    console.log(`   Projects unchanged: ${projects.length - updatedCount}`);

  } catch (error) {
    console.error('❌ Error fixing project image URLs:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

fixProjectImageUrls();
