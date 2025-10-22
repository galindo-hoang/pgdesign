#!/usr/bin/env node

// Script to migrate all images from service files to VNData S3
// and update database with new URLs
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Minio = require('minio');
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

// VNData S3 configuration
const minioClient = new Minio.Client({
  endPoint: process.env.VNDATA_S3_ENDPOINT?.replace('https://', '').replace('http://', ''),
  port: 443,
  useSSL: true,
  accessKey: process.env.VNDATA_ACCESS_KEY,
  secretKey: process.env.VNDATA_SECRET_KEY,
});

const BUCKET_NAME = process.env.VNDATA_BUCKET_NAME;

// Load analysis results
const analysisResults = JSON.parse(fs.readFileSync('image-analysis-results.json', 'utf8'));

// URL mapping for new structure
const URL_MAPPINGS = {
  'mock-assets/images/blogpage/': 'blogpage/',
  'mock-assets/images/homepage/': 'homepage/',
  'mock-assets/images/intropage/': 'intropage/pg-employee/',
  'mock-assets/images/profilepage/': 'profilepage/',
  'mock-assets/images/projectpage/': 'projectpage/',
  'mock-assets/images/servicepage/': 'servicepage/',
  'mock-assets/icons/': 'icons/',
  'mock-assets/images/': 'images/',
  'mock-assets/blog/': 'blogpage/',
  'PG NHÂN SỰ/': 'intropage/pg-employee/',
  'assets/images/profilepage/': 'profilepage/',
  'assets/house-normal/': 'projectpage/house-normal/',
  'assets/blog/': 'blogpage/',
  'assets/images/': 'images/'
};

async function migrateServiceImages() {
  console.log('🚀 Starting service images migration to VNData S3...\n');
  
  try {
    let totalProcessed = 0;
    let totalUploaded = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    
    const urlMappings = new Map(); // Store old URL -> new URL mappings
    
    // Process HTTP URLs (already in VNData)
    console.log('📁 Processing HTTP URLs (already in VNData)...');
    for (const ref of analysisResults.urls) {
      if (ref.url.includes('s3-hcm-r2.s3cloud.vn/pgdesign-new/')) {
        const newUrl = updateUrlToNewStructure(ref.url);
        if (newUrl !== ref.url) {
          urlMappings.set(ref.url, newUrl);
          console.log(`   🔄 ${ref.url} → ${newUrl}`);
          totalProcessed++;
        }
      }
    }
    
    // Process image imports (local assets)
    console.log('\n📂 Processing local asset imports...');
    for (const ref of analysisResults.imports) {
      if (ref.path.startsWith('../assets/') || ref.path.startsWith('/assets/')) {
        try {
          // Convert local path to new VNData path
          const fileName = path.basename(ref.path);
          const newPath = getNewPathForAsset(ref.path);
          const newUrl = `https://s3-hcm-r2.s3cloud.vn/pgdesign-new/${newPath}${fileName}`;
          
          // Check if file exists locally
          const localPath = path.resolve(__dirname, '../../src', ref.path);
          if (fs.existsSync(localPath)) {
            // Upload local file to VNData
            const fileBuffer = fs.readFileSync(localPath);
            const contentType = getContentType(fileName);
            
            await minioClient.putObject(BUCKET_NAME, `${newPath}${fileName}`, fileBuffer, {
              'Content-Type': contentType
            });
            
            urlMappings.set(ref.path, newUrl);
            console.log(`   ✅ Uploaded: ${ref.path} → ${newUrl}`);
            totalUploaded++;
          } else {
            console.log(`   ⚠️  Local file not found: ${ref.path}`);
            totalSkipped++;
          }
        } catch (error) {
          console.log(`   ❌ Error processing ${ref.path}: ${error.message}`);
          totalErrors++;
        }
      }
    }
    
    // Process image paths (local assets)
    console.log('\n📂 Processing image paths...');
    for (const ref of analysisResults.paths) {
      if (ref.path.startsWith('/assets/') || ref.path.startsWith('../assets/')) {
        try {
          const fileName = path.basename(ref.path);
          const newPath = getNewPathForAsset(ref.path);
          const newUrl = `https://s3-hcm-r2.s3cloud.vn/pgdesign-new/${newPath}${fileName}`;
          
          const localPath = path.resolve(__dirname, '../../src', ref.path);
          if (fs.existsSync(localPath)) {
            const fileBuffer = fs.readFileSync(localPath);
            const contentType = getContentType(fileName);
            
            await minioClient.putObject(BUCKET_NAME, `${newPath}${fileName}`, fileBuffer, {
              'Content-Type': contentType
            });
            
            urlMappings.set(ref.path, newUrl);
            console.log(`   ✅ Uploaded: ${ref.path} → ${newUrl}`);
            totalUploaded++;
          } else {
            console.log(`   ⚠️  Local file not found: ${ref.path}`);
            totalSkipped++;
          }
        } catch (error) {
          console.log(`   ❌ Error processing ${ref.path}: ${error.message}`);
          totalErrors++;
        }
      }
    }
    
    // Process base64 images
    console.log('\n🖼️ Processing base64 images...');
    for (const ref of analysisResults.base64) {
      try {
        const base64Data = ref.base64.split(',')[1];
        const header = ref.base64.split(',')[0];
        const mimeType = header.match(/data:([^;]+)/)[1];
        const extension = mimeType.split('/')[1];
        
        const fileName = `base64-image-${Date.now()}.${extension}`;
        const newPath = 'images/';
        const newUrl = `https://s3-hcm-r2.s3cloud.vn/pgdesign-new/${newPath}${fileName}`;
        
        const buffer = Buffer.from(base64Data, 'base64');
        await minioClient.putObject(BUCKET_NAME, `${newPath}${fileName}`, buffer, {
          'Content-Type': mimeType
        });
        
        urlMappings.set(ref.base64, newUrl);
        console.log(`   ✅ Uploaded base64 image → ${newUrl}`);
        totalUploaded++;
      } catch (error) {
        console.log(`   ❌ Error processing base64 image: ${error.message}`);
        totalErrors++;
      }
    }
    
    console.log(`\n📊 Migration Summary:`);
    console.log(`   URLs processed: ${totalProcessed}`);
    console.log(`   Files uploaded: ${totalUploaded}`);
    console.log(`   Files skipped: ${totalSkipped}`);
    console.log(`   Errors: ${totalErrors}`);
    
    // Save URL mappings for database update
    const mappingsObject = Object.fromEntries(urlMappings);
    fs.writeFileSync('url-mappings.json', JSON.stringify(mappingsObject, null, 2));
    console.log('\n💾 URL mappings saved to: url-mappings.json');
    
    return mappingsObject;
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
    throw error;
  }
}

function updateUrlToNewStructure(url) {
  let newUrl = url;
  
  for (const [oldPath, newPath] of Object.entries(URL_MAPPINGS)) {
    if (url.includes(oldPath)) {
      newUrl = url.replace(oldPath, newPath);
      break;
    }
  }
  
  return newUrl;
}

function getNewPathForAsset(assetPath) {
  if (assetPath.includes('profilepage/')) return 'profilepage/';
  if (assetPath.includes('blog/')) return 'blogpage/';
  if (assetPath.includes('house-normal/')) return 'projectpage/house-normal/';
  return 'images/';
}

function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const types = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };
  return types[ext] || 'application/octet-stream';
}

async function updateDatabaseWithNewUrls(urlMappings) {
  console.log('\n🔄 Updating database with new URLs...');
  
  try {
    let totalUpdated = 0;
    
    // Update project details
    console.log('📋 Updating project details...');
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
          let images;
          if (typeof project.project_images_urls === 'string') {
            images = JSON.parse(project.project_images_urls);
          } else if (Array.isArray(project.project_images_urls)) {
            images = project.project_images_urls;
          } else {
            images = [];
          }
          
          const newImagesArray = images.map(url => updateUrlToNewStructure(url));
          newImages = JSON.stringify(newImagesArray);
          
          if (newImages !== JSON.stringify(project.project_images_urls)) {
            updated = true;
          }
        } catch (e) {
          console.log(`   ⚠️  Could not parse images for project ${project.id}`);
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
    
    // Update project categories
    console.log('\n📋 Updating project categories...');
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
    
    // Update about project data
    console.log('\n📋 Updating about project data...');
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
    
    // Update service page
    console.log('\n📋 Updating service page...');
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
    
    console.log(`\n📊 Database Update Summary:`);
    console.log(`   Total records updated: ${totalUpdated}`);
    
    console.log('\n✅ Database updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating database:', error);
    throw error;
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting complete service images migration...\n');
  
  try {
    const urlMappings = await migrateServiceImages();
    await updateDatabaseWithNewUrls(urlMappings);
    
    console.log('\n🎉 Service images migration completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Update service files with new URLs');
    console.log('   2. Test website functionality');
    console.log('   3. Verify all images are accessible');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

main();
