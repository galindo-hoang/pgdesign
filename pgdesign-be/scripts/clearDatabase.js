#!/usr/bin/env node

// Script to clear all data from database
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

async function clearDatabase() {
  console.log('🧹 Clearing all data from database...\n');

  try {
    // List of tables to clear (in dependency order)
    const tables = [
      'project_details',
      'project_categories',
      'about_project_data',
      'homepage_hero',
      'homepage_about',
      'homepage_image_slider',
      'homepage_stats_header',
      'homepage_stats_items',
      'homepage_solution_header',
      'homepage_solutions',
      'homepage_workflow_main',
      'homepage_workflow_tabs',
      'homepage_project_diary_main',
      'homepage_project_diary_images',
      'homepage_testimonials_header',
      'homepage_testimonials',
      'homepage_consultation_form_main',
      'homepage_consultation_form_project_types',
      'blog_page_hero',
      'blog_page_project_items',
      'blog_page_content_section',
      'blog_page_design_styles',
      'blog_page_important_factors',
      'blog_page_process_steps',
      'blog_page_consultation_cta',
      'intro_page_hero',
      'intro_page_about',
      'intro_page_vision_mission',
      'intro_page_commitments',
      'intro_page_team',
      'intro_page_capabilities',
      'intro_page_construction_process',
      'intro_page_technical_advantages',
      'service_page_hero',
      'service_page_services',
      'service_page_construction_sections',
      'service_page_process_sections',
      'profile_page_hero',
      'profile_page_capabilities',
      'profile_page_construction_process',
      'profile_page_technical_advantages'
    ];

    console.log(`📋 Found ${tables.length} tables to clear`);

    let clearedCount = 0;

    for (const table of tables) {
      try {
        const hasTable = await db.schema.hasTable(table);
        if (hasTable) {
          const result = await db(table).del();
          console.log(`✅ Cleared table ${table}: ${result} rows deleted`);
          clearedCount++;
        } else {
          console.log(`⏭️  Table ${table} does not exist, skipping`);
        }
      } catch (error) {
        console.log(`❌ Error clearing table ${table}:`, error.message);
      }
    }

    console.log(`\n🎯 Summary:`);
    console.log(`   Tables processed: ${tables.length}`);
    console.log(`   Tables cleared: ${clearedCount}`);
    console.log(`   Tables skipped: ${tables.length - clearedCount}`);

    console.log('\n✅ Database cleared successfully!');

  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

clearDatabase();
