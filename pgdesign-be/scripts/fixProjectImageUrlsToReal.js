#!/usr/bin/env node

// Script to fix project image URLs to use real existing images
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

async function fixProjectImageUrls() {
  console.log('🔧 Fixing project image URLs to use real existing images...\n');

  try {
    // Real existing project images from previous migration
    const realProjectImages = {
      1: {
        title: 'NHÀ PHỐ HIỆN ĐẠI - QUẬN 2',
        thumbnail: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/house-normal-020/NHA%20MAU%202%20-%20VIEW%201.jpg',
        images: [
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/house-normal-020/NHA%20MAU%202%20-%20VIEW%201.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/house-normal-020/NHA%20MAU%202%20-%20VIEW%202.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/house-normal-020/NHA%20MAU%202%20-%20VIEW%203.jpg'
        ]
      },
      2: {
        title: 'CĂN HỘ CAO CẤP - QUẬN 1',
        thumbnail: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/appartment-001/phu-gia-hung-01.png',
        images: [
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/appartment-001/phu-gia-hung-01.png',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/appartment-001/phu-gia-hung-02.png',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/appartment-001/phu-gia-hung-03.png',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/appartment-001/phu-gia-hung-04.png'
        ]
      },
      3: {
        title: 'BIỆT THỰ SANG TRỌNG - QUẬN 7',
        thumbnail: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/village-022/1.png',
        images: [
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/village-022/1.png',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/village-022/2.png',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/village-022/3.png',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/village-022/4.png',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/village-022/5.png'
        ]
      },
      4: {
        title: 'VĂN PHÒNG HIỆN ĐẠI - QUẬN 3',
        thumbnail: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/house-business-032/VIEW%2001.jpg',
        images: [
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/house-business-032/VIEW%2001.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/house-business-032/VIEW%2002.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/house-business-032/VIEW%2003.jpg'
        ]
      }
    };

    console.log(`📊 Found ${Object.keys(realProjectImages).length} projects to update`);

    let updatedCount = 0;

    for (const [projectId, projectData] of Object.entries(realProjectImages)) {
      try {
        await db('project_details')
          .where('id', projectId)
          .update({
            thumbnail_image_url: projectData.thumbnail,
            project_images_urls: JSON.stringify(projectData.images),
            updated_at: new Date()
          });

        console.log(`✅ Updated project ID ${projectId}: ${projectData.title}`);
        console.log(`   Thumbnail: ${projectData.thumbnail}`);
        console.log(`   Images: ${projectData.images.length} URLs`);
        updatedCount++;
      } catch (error) {
        console.log(`❌ Error updating project ID ${projectId}:`, error.message);
      }
    }

    console.log(`\n🎯 Summary:`);
    console.log(`   Projects updated: ${updatedCount}`);
    console.log(`   Projects failed: ${Object.keys(realProjectImages).length - updatedCount}`);

    console.log('\n✅ Project image URLs fixed successfully!');

  } catch (error) {
    console.error('❌ Error fixing project image URLs:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

fixProjectImageUrls();
