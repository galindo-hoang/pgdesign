#!/usr/bin/env node

// Script to update database URLs to new website structure
// without moving actual files (just update URLs in database)
require('dotenv').config();
const knex = require('knex');

// Database configuration
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

// Website structure mapping for URL updates
const URL_MAPPINGS = {
  // Main pages
  'mock-assets/images/blogpage/': 'blogpage/',
  'mock-assets/images/homepage/': 'homepage/',
  'mock-assets/images/intropage/': 'intropage/pg-employee/',
  'mock-assets/images/profilepage/': 'profilepage/',
  'mock-assets/images/projectpage/': 'projectpage/',
  'mock-assets/images/servicepage/': 'servicepage/',
  
  // Project subcategories
  'project-details/appartment-': 'projectpage/appartment/',
  'project-details/house-business-': 'projectpage/house-business/',
  'project-details/house-normal-': 'projectpage/house-normal/',
  'project-details/village-': 'projectpage/village/',
  
  // Other assets
  'mock-assets/icons/': 'icons/',
  'mock-assets/images/': 'images/'
};

async function updateDatabaseUrls() {
  console.log('🔄 Updating database URLs to new website structure...\n');

  console.log('📋 New Website Structure:');
  console.log('   📁 blogpage/');
  console.log('   📁 homepage/');
  console.log('   📁 intropage/pg-employee/');
  console.log('   📁 profilepage/');
  console.log('   📁 projectpage/');
  console.log('      📁 appartment/');
  console.log('      📁 house-business/');
  console.log('      📁 house-normal/');
  console.log('      📁 village/');
  console.log('   📁 servicepage/');
  console.log('   📁 icons/');
  console.log('   📁 images/');
  console.log('');

  try {
    let totalUpdated = 0;

    // 1. Update project details URLs
    console.log('📋 Updating project details URLs...');
    const projects = await db('project_details').select('*');
    
    for (const project of projects) {
      let updated = false;
      let newThumbnail = project.thumbnail_image_url;
      let newImages = project.project_images_urls;

      // Update thumbnail URL
      if (project.thumbnail_image_url) {
        newThumbnail = updateUrlToNewStructure(project.thumbnail_image_url);
        if (newThumbnail !== project.thumbnail_image_url) {
          updated = true;
        }
      }

      // Update project images URLs
      if (project.project_images_urls) {
        try {
          // Handle both string and already parsed array
          let images;
          if (typeof project.project_images_urls === 'string') {
            images = JSON.parse(project.project_images_urls);
          } else if (Array.isArray(project.project_images_urls)) {
            images = project.project_images_urls;
          } else {
            console.log(`   ⚠️  Unexpected type for project_images_urls in project ${project.id}`);
            images = [];
          }
          
          const newImagesArray = images.map(url => updateUrlToNewStructure(url));
          newImages = JSON.stringify(newImagesArray);
          
          if (newImages !== JSON.stringify(project.project_images_urls)) {
            updated = true;
          }
        } catch (e) {
          console.log(`   ⚠️  Could not parse images for project ${project.id}: ${e.message}`);
          // Keep original value if parsing fails
          newImages = JSON.stringify(project.project_images_urls);
        }
      }

      if (updated) {
        await db('project_details')
          .where('id', project.id)
          .update({
            thumbnail_image_url: newThumbnail,
            project_images_urls: newImages,
            updated_at: new Date()
          });
        
        console.log(`   ✅ Updated project ${project.id}: ${project.title}`);
        totalUpdated++;
      }
    }

    // 2. Update project categories URLs
    console.log('\n📋 Updating project categories URLs...');
    const categories = await db('project_categories').select('*');
    
    for (const category of categories) {
      let updated = false;
      let newBackgroundUrl = category.background_image_url;

      if (category.background_image_url) {
        newBackgroundUrl = updateUrlToNewStructure(category.background_image_url);
        if (newBackgroundUrl !== category.background_image_url) {
          updated = true;
        }
      }

      if (updated) {
        await db('project_categories')
          .where('id', category.id)
          .update({
            background_image_url: newBackgroundUrl,
            updated_at: new Date()
          });
        
        console.log(`   ✅ Updated category ${category.id}: ${category.title}`);
        totalUpdated++;
      }
    }

    // 3. Update about project data URLs
    console.log('\n📋 Updating about project data URLs...');
    const aboutProjects = await db('about_project_data').select('*');
    
    for (const about of aboutProjects) {
      let updated = false;
      let newBackgroundUrl = about.background_image_url;

      if (about.background_image_url) {
        newBackgroundUrl = updateUrlToNewStructure(about.background_image_url);
        if (newBackgroundUrl !== about.background_image_url) {
          updated = true;
        }
      }

      if (updated) {
        await db('about_project_data')
          .where('id', about.id)
          .update({
            background_image_url: newBackgroundUrl,
            updated_at: new Date()
          });
        
        console.log(`   ✅ Updated about project ${about.id}: ${about.title}`);
        totalUpdated++;
      }
    }

    // 4. Update service page URLs
    console.log('\n📋 Updating service page URLs...');
    const serviceHeroes = await db('service_page_hero').select('*');
    
    for (const hero of serviceHeroes) {
      let updated = false;
      let newHeroUrl = hero.hero_image_url;

      if (hero.hero_image_url) {
        newHeroUrl = updateUrlToNewStructure(hero.hero_image_url);
        if (newHeroUrl !== hero.hero_image_url) {
          updated = true;
        }
      }

      if (updated) {
        await db('service_page_hero')
          .where('id', hero.id)
          .update({
            hero_image_url: newHeroUrl,
            updated_at: new Date()
          });
        
        console.log(`   ✅ Updated service hero ${hero.id}: ${hero.main_title}`);
        totalUpdated++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Total records updated: ${totalUpdated}`);
    console.log(`   Project details: ${projects.length} checked`);
    console.log(`   Project categories: ${categories.length} checked`);
    console.log(`   About project data: ${aboutProjects.length} checked`);
    console.log(`   Service page heroes: ${serviceHeroes.length} checked`);

    console.log('\n✅ Database URLs updated successfully!');
    console.log('\n📝 Note: This script only updates database URLs.');
    console.log('   You may need to manually move files in VNData S3 to match the new structure.');

  } catch (error) {
    console.error('❌ Error updating database URLs:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

function updateUrlToNewStructure(url) {
  if (!url) return url;
  
  let newUrl = url;
  
  // Apply URL mappings
  for (const [oldPath, newPath] of Object.entries(URL_MAPPINGS)) {
    if (url.includes(oldPath)) {
      newUrl = url.replace(oldPath, newPath);
      break;
    }
  }
  
  return newUrl;
}

// Main execution
async function main() {
  console.log('🚀 Starting database URL update process...\n');
  
  try {
    await updateDatabaseUrls();
    
    console.log('\n🎉 Database URL update process completed successfully!');
  } catch (error) {
    console.error('❌ URL update failed:', error);
    process.exit(1);
  }
}

main();
