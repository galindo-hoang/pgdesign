#!/usr/bin/env node

// Script to verify migration results
require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../knexfile');
const https = require('https');
const http = require('http');

// Database configuration
const db = knex(knexConfig.development);

async function verifyMigration() {
  console.log('🔍 Verifying Big Objects Migration Results...\n');
  
  try {
    // Check about_project_data
    console.log('📋 Checking about_project_data...');
    const aboutProject = await db('about_project_data')
      .select('id', 'background_image_blob', 'background_image_url')
      .first();
    
    if (aboutProject) {
      console.log(`   ID: ${aboutProject.id}`);
      console.log(`   Background Image Blob: ${aboutProject.background_image_blob ? 'Has data' : 'NULL ✅'}`);
      console.log(`   Background Image URL: ${aboutProject.background_image_url || 'NULL'}`);
      
      if (aboutProject.background_image_url) {
        await verifyUrl(aboutProject.background_image_url, 'About Project Background');
      }
    }
    
    // Check project_details
    console.log('\n📋 Checking project_details...');
    const projectDetails = await db('project_details')
      .select('id', 'project_images', 'project_images_urls', 'thumbnail_image_blob', 'thumbnail_image_url')
      .limit(5);
    
    console.log(`   Found ${projectDetails.length} project details (showing first 5)`);
    
    for (const project of projectDetails) {
      console.log(`\n   Project ID: ${project.id}`);
      console.log(`     Project Images: ${project.project_images ? 'Has JSON data' : 'NULL'}`);
      console.log(`     Project Images URLs: ${project.project_images_urls ? 'Has URLs ✅' : 'NULL'}`);
      console.log(`     Thumbnail Blob: ${project.thumbnail_image_blob ? 'Has data' : 'NULL ✅'}`);
      console.log(`     Thumbnail URL: ${project.thumbnail_image_url || 'NULL'}`);
      
      // Verify URLs
      if (project.project_images_urls) {
        try {
          const urls = typeof project.project_images_urls === 'string' 
            ? JSON.parse(project.project_images_urls) 
            : project.project_images_urls;
          
          if (Array.isArray(urls)) {
            console.log(`     📊 Project Images URLs: ${urls.length} URLs`);
            for (let i = 0; i < Math.min(urls.length, 3); i++) {
              await verifyUrl(urls[i], `Project ${project.id} Image ${i}`);
            }
          }
        } catch (error) {
          console.log(`     ❌ Error parsing project images URLs: ${error.message}`);
        }
      }
      
      if (project.thumbnail_image_url) {
        await verifyUrl(project.thumbnail_image_url, `Project ${project.id} Thumbnail`);
      }
    }
    
    // Check project_image_blob_detail
    console.log('\n📋 Checking project_image_blob_detail...');
    const blobDetails = await db('project_image_blob_detail')
      .select('id', 'image_blob', 'image_type')
      .limit(5);
    
    console.log(`   Found ${blobDetails.length} blob details`);
    
    for (const blob of blobDetails) {
      console.log(`   Blob ID: ${blob.id}`);
      console.log(`     Image Blob: ${blob.image_blob ? 'Has data' : 'NULL ✅'}`);
      console.log(`     Image Type: ${blob.image_type || 'NULL'}`);
    }
    
    // Summary
    console.log('\n📊 Migration Verification Summary:');
    
    const aboutProjectCount = await db('about_project_data')
      .whereNotNull('background_image_url')
      .count('* as count')
      .first();
    console.log(`   About Project with URLs: ${aboutProjectCount.count}`);
    
    const projectDetailsWithUrls = await db('project_details')
      .whereNotNull('project_images_urls')
      .count('* as count')
      .first();
    console.log(`   Project Details with URLs: ${projectDetailsWithUrls.count}`);
    
    const projectDetailsWithThumbnails = await db('project_details')
      .whereNotNull('thumbnail_image_url')
      .count('* as count')
      .first();
    console.log(`   Project Details with Thumbnails: ${projectDetailsWithThumbnails.count}`);
    
    const blobDetailsCount = await db('project_image_blob_detail')
      .whereNotNull('image_blob')
      .count('* as count')
      .first();
    console.log(`   Blob Details with data: ${blobDetailsCount.count}`);
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  } finally {
    await db.destroy();
  }
}

async function verifyUrl(url, description) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      console.log(`     ✅ ${description}: HTTP ${res.statusCode} (${res.headers['content-type']})`);
      resolve();
    });
    
    req.on('error', (error) => {
      console.log(`     ❌ ${description}: ${error.message}`);
      resolve();
    });
    
    req.setTimeout(5000, () => {
      console.log(`     ⏰ ${description}: Timeout`);
      req.destroy();
      resolve();
    });
  });
}

// Run verification
if (require.main === module) {
  verifyMigration()
    .then(() => {
      console.log('\n✅ Verification completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Verification failed:', error);
      process.exit(1);
    });
}

module.exports = { verifyMigration };
