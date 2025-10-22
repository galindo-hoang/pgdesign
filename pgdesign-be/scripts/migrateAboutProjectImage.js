#!/usr/bin/env node

// Simple migration script to move big objects to VNData S3
require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../knexfile');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Database configuration
const db = knex(knexConfig.development);

// VNData S3 configuration
const s3Client = new S3Client({
  endpoint: process.env.VNDATA_S3_ENDPOINT,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.VNDATA_S3_ACCESS_KEY,
    secretAccessKey: process.env.VNDATA_S3_SECRET_KEY,
  },
  forcePathStyle: true,
});

const BUCKET_NAME = process.env.VNDATA_S3_BUCKET_NAME;

async function migrateAboutProjectImage() {
  console.log('🚀 Migrating About Project Background Image...\n');
  
  try {
    // Get about project data
    const aboutProject = await db('about_project_data')
      .select('id', 'background_image_blob', 'background_image_url')
      .first();
    
    if (!aboutProject) {
      console.log('❌ No about project data found');
      return;
    }
    
    console.log(`📋 About Project ID: ${aboutProject.id}`);
    console.log(`   Background Image Blob: ${aboutProject.background_image_blob ? 'Has data' : 'NULL'}`);
    console.log(`   Background Image URL: ${aboutProject.background_image_url || 'NULL'}`);
    
    if (!aboutProject.background_image_blob) {
      console.log('⏭️  No blob data to migrate');
      return;
    }
    
    if (aboutProject.background_image_url) {
      console.log('⏭️  Already has URL, skipping migration');
      return;
    }
    
    // Check if it's base64 data
    if (!aboutProject.background_image_blob.startsWith('data:image/')) {
      console.log('❌ Not base64 image data');
      return;
    }
    
    // Extract base64 data
    const base64Data = aboutProject.background_image_blob.split(',')[1];
    if (!base64Data) {
      console.log('❌ Invalid base64 format');
      return;
    }
    
    // Convert to buffer
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Determine file extension from MIME type
    const mimeType = aboutProject.background_image_blob.match(/data:image\/([^;]+)/)?.[1];
    const extension = mimeType === 'jpeg' ? 'jpg' : mimeType || 'png';
    
    // Generate filename
    const fileName = `about-project-background-${aboutProject.id}.${extension}`;
    const objectKey = `about-project/${fileName}`;
    
    console.log(`📤 Uploading ${extension.toUpperCase()} image (${buffer.length} bytes)...`);
    console.log(`   File: ${fileName}`);
    console.log(`   Key: ${objectKey}`);
    
    // Upload to VNData S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: objectKey,
      Body: buffer,
      ContentType: `image/${mimeType || 'png'}`,
      CacheControl: 'max-age=31536000',
    });
    
    await s3Client.send(command);
    
    // Generate public URL
    const publicUrl = `${process.env.VNDATA_S3_PUBLIC_ENDPOINT}/${objectKey}`;
    
    console.log(`✅ Upload successful!`);
    console.log(`🔗 Public URL: ${publicUrl}`);
    
    // Update database with new URL
    await db('about_project_data')
      .where('id', aboutProject.id)
      .update({
        background_image_url: publicUrl,
        background_image_blob: null, // Clear blob data
        updated_at: new Date()
      });
    
    console.log(`💾 Database updated successfully!`);
    console.log(`   Cleared blob data`);
    console.log(`   Set background_image_url: ${publicUrl}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  }
}

async function verifyMigration() {
  console.log('\n🔍 Verifying migration...');
  
  try {
    const aboutProject = await db('about_project_data')
      .select('id', 'background_image_blob', 'background_image_url')
      .first();
    
    if (aboutProject) {
      console.log(`📋 About Project ID: ${aboutProject.id}`);
      console.log(`   Background Image Blob: ${aboutProject.background_image_blob ? 'Has data' : 'NULL ✅'}`);
      console.log(`   Background Image URL: ${aboutProject.background_image_url || 'NULL'}`);
      
      if (aboutProject.background_image_url) {
        console.log(`✅ Migration successful!`);
        console.log(`🔗 New URL: ${aboutProject.background_image_url}`);
      } else {
        console.log(`❌ Migration failed - no URL set`);
      }
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

// Run migration
async function runMigration() {
  try {
    await migrateAboutProjectImage();
    await verifyMigration();
    
    console.log('\n🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

if (require.main === module) {
  runMigration();
}

module.exports = { migrateAboutProjectImage, verifyMigration };
