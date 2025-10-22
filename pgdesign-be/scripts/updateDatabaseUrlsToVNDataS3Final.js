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

    // Update hero_data
    console.log('📋 Updating hero_data...');
    const heroUpdates = await db('hero_data')
      .where('background_image_url', 'like', '%localhost:9000%')
      .update({
        background_image_url: db.raw("REPLACE(background_image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${heroUpdates} records in hero_data`);

    // Update project_diary_data
    console.log('📋 Updating project_diary_data...');
    const diaryUpdates = await db('project_diary_data')
      .where('image_url', 'like', '%localhost:9000%')
      .update({
        image_url: db.raw("REPLACE(image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${diaryUpdates} records in project_diary_data`);

    // Update solution_items
    console.log('📋 Updating solution_items...');
    const solutionUpdates = await db('solution_items')
      .where('image_url', 'like', '%localhost:9000%')
      .update({
        image_url: db.raw("REPLACE(image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${solutionUpdates} records in solution_items`);

    // Update workflow_data
    console.log('📋 Updating workflow_data...');
    const workflowUpdates = await db('workflow_data')
      .where('diagram_url', 'like', '%localhost:9000%')
      .update({
        diagram_url: db.raw("REPLACE(diagram_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${workflowUpdates} records in workflow_data`);

    // Update about_data
    console.log('📋 Updating about_data...');
    const aboutUpdates = await db('about_data')
      .where('image_url', 'like', '%localhost:9000%')
      .update({
        image_url: db.raw("REPLACE(image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${aboutUpdates} records in about_data`);

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

    // Update service_page_services
    console.log('📋 Updating service_page_services...');
    const serviceUpdates = await db('service_page_services')
      .where('icon_url', 'like', '%localhost:9000%')
      .update({
        icon_url: db.raw("REPLACE(icon_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${serviceUpdates} records in service_page_services`);

    // Update team_members
    console.log('📋 Updating team_members...');
    const teamUpdates = await db('team_members')
      .where('image_url', 'like', '%localhost:9000%')
      .update({
        image_url: db.raw("REPLACE(image_url, 'http://localhost:9000/pgdesign-assets/', 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/')"),
        updated_at: new Date()
      });
    console.log(`   ✅ Updated ${teamUpdates} records in team_members`);

    totalUpdated = introUpdates + heroUpdates + diaryUpdates + solutionUpdates + 
                  workflowUpdates + aboutUpdates + categoryUpdates + projectUpdates + 
                  projectImagesUpdates + serviceHeroUpdates + serviceUpdates + teamUpdates;

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
