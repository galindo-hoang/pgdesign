#!/usr/bin/env node

require('dotenv').config();
const knex = require('knex');

// Use explicit database configuration
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

async function updateUrlsToVNDataS3() {
  console.log('🔄 Updating URLs from MinIO to VNData S3...\n');

  try {
    let totalUpdated = 0;

    // Update about_intro_data
    console.log('📋 Updating about_intro_data...');
    const introUpdates = await db('about_intro_data')
      .where('background_image_url', 'like', '%localhost:9000%')
      .update({
        background_image_url: db.raw("REPLACE(background_image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${introUpdates} records in about_intro_data`);

    // Update homepage_hero_data
    console.log('📋 Updating homepage_hero_data...');
    const heroUpdates = await db('homepage_hero_data')
      .where('background_image_url', 'like', '%localhost:9000%')
      .update({
        background_image_url: db.raw("REPLACE(background_image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${heroUpdates} records in homepage_hero_data`);

    // Update homepage_project_diary_data
    console.log('📋 Updating homepage_project_diary_data...');
    const diaryUpdates = await db('homepage_project_diary_data')
      .where('image_url', 'like', '%localhost:9000%')
      .update({
        image_url: db.raw("REPLACE(image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${diaryUpdates} records in homepage_project_diary_data`);

    // Update homepage_solution_data
    console.log('📋 Updating homepage_solution_data...');
    const solutionUpdates = await db('homepage_solution_data')
      .where('image_url', 'like', '%localhost:9000%')
      .update({
        image_url: db.raw("REPLACE(image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${solutionUpdates} records in homepage_solution_data`);

    // Update homepage_work_process_data
    console.log('📋 Updating homepage_work_process_data...');
    const processUpdates = await db('homepage_work_process_data')
      .where('diagram_url', 'like', '%localhost:9000%')
      .update({
        diagram_url: db.raw("REPLACE(diagram_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${processUpdates} records in homepage_work_process_data`);

    // Update homepage_about_data
    console.log('📋 Updating homepage_about_data...');
    const aboutUpdates = await db('homepage_about_data')
      .where('image_url', 'like', '%localhost:9000%')
      .update({
        image_url: db.raw("REPLACE(image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${aboutUpdates} records in homepage_about_data`);

    // Update project_categories
    console.log('📋 Updating project_categories...');
    const categoryUpdates = await db('project_categories')
      .where('background_image_url', 'like', '%localhost:9000%')
      .update({
        background_image_url: db.raw("REPLACE(background_image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${categoryUpdates} records in project_categories`);

    // Update project_details
    console.log('📋 Updating project_details...');
    const projectUpdates = await db('project_details')
      .where('thumbnail_image_url', 'like', '%localhost:9000%')
      .update({
        thumbnail_image_url: db.raw("REPLACE(thumbnail_image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${projectUpdates} records in project_details`);

    // Update project_details project_images_urls
    console.log('📋 Updating project_details project_images_urls...');
    const projectImagesUpdates = await db('project_details')
      .where('project_images_urls', 'like', '%localhost:9000%')
      .update({
        project_images_urls: db.raw("REPLACE(project_images_urls, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${projectImagesUpdates} records in project_details project_images_urls`);

    // Update service_page_hero
    console.log('📋 Updating service_page_hero...');
    const serviceHeroUpdates = await db('service_page_hero')
      .where('hero_image_url', 'like', '%localhost:9000%')
      .update({
        hero_image_url: db.raw("REPLACE(hero_image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${serviceHeroUpdates} records in service_page_hero`);

    totalUpdated = introUpdates + heroUpdates + diaryUpdates + solutionUpdates + 
                  processUpdates + aboutUpdates + categoryUpdates + projectUpdates + 
                  projectImagesUpdates + serviceHeroUpdates;

    console.log('\n📊 Summary:');
    console.log(`   Total records updated: ${totalUpdated}`);
    console.log(`   All MinIO URLs replaced with VNData S3 URLs`);

    console.log('\n✅ Database URLs updated successfully!');
    console.log('\n🎉 All APIs will now return VNData S3 URLs instead of MinIO URLs!');

  } catch (error) {
    console.error('❌ Error updating URLs:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

updateUrlsToVNDataS3().catch(console.error);
