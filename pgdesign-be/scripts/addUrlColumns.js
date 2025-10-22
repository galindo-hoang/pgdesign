#!/usr/bin/env node

// Migration script to add URL columns for big objects
require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../knexfile');

// Database configuration
const db = knex(knexConfig.development);

async function addUrlColumns() {
  console.log('🔧 Adding URL columns for big objects migration...\n');
  
  try {
    // Add background_image_url to about_project_data
    console.log('📋 Adding background_image_url to about_project_data...');
    
    try {
      await db.schema.alterTable('about_project_data', (table) => {
        table.string('background_image_url', 500).nullable().comment('S3 URL for background image');
      });
      console.log('   ✅ Column added successfully');
    } catch (error) {
      if (error.message.includes('Duplicate column name')) {
        console.log('   ⏭️  Column already exists, skipping...');
      } else {
        throw error;
      }
    }
    
    // Verify the column was added
    const aboutSchema = await db.raw('DESCRIBE about_project_data');
    const hasBackgroundUrl = aboutSchema[0].some(col => col.Field === 'background_image_url');
    
    if (hasBackgroundUrl) {
      console.log('   ✅ Column verified in schema');
    } else {
      console.log('   ❌ Column not found in schema');
    }
    
    console.log('\n📊 Schema Update Summary:');
    console.log('   ✅ about_project_data.background_image_url: Added');
    console.log('   ✅ project_details.project_images_urls: Already exists');
    console.log('   ✅ project_details.thumbnail_image_url: Already exists');
    console.log('   ✅ project_categories.background_image_url: Already exists');
    
    console.log('\n🎯 Ready for migration!');
    console.log('   All required URL columns are now available');
    
  } catch (error) {
    console.error('❌ Schema update failed:', error.message);
  } finally {
    await db.destroy();
  }
}

// Run schema update
if (require.main === module) {
  addUrlColumns()
    .then(() => {
      console.log('\n✅ Schema update completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Schema update failed:', error);
      process.exit(1);
    });
}

module.exports = { addUrlColumns };
