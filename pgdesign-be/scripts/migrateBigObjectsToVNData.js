#!/usr/bin/env node

// Migration script to move big objects (images, SVGs) to VNData S3
require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../knexfile');
const fs = require('fs');
const path = require('path');

// Import VNData S3 service
const { VNDataS3FileUploadService } = require('../src/services/vnDataS3FileUploadService.ts');

// Database configuration
const db = knex(knexConfig.development);

// VNData S3 configuration
const vnDataConfig = {
  endpoint: process.env.VNDATA_S3_ENDPOINT,
  port: process.env.VNDATA_S3_PORT,
  useSSL: process.env.VNDATA_S3_USE_SSL === 'true',
  accessKey: process.env.VNDATA_S3_ACCESS_KEY,
  secretKey: process.env.VNDATA_S3_SECRET_KEY,
  bucketName: process.env.VNDATA_S3_BUCKET_NAME,
  publicEndpoint: process.env.VNDATA_S3_PUBLIC_ENDPOINT,
};

const uploadService = new VNDataS3FileUploadService(vnDataConfig);

// Migration targets
const MIGRATION_TARGETS = [
  {
    table: 'about_project_data',
    blobField: 'background_image_blob',
    urlField: 'background_image_url',
    folder: 'about-project',
    description: 'About Project background image'
  },
  {
    table: 'project_details',
    blobField: 'project_images',
    urlField: 'project_images_urls',
    folder: 'project-details',
    description: 'Project detail images',
    isJsonArray: true
  },
  {
    table: 'project_details',
    blobField: 'thumbnail_image_blob',
    urlField: 'thumbnail_image_url',
    folder: 'project-thumbnails',
    description: 'Project thumbnail images'
  },
  {
    table: 'project_image_blob_detail',
    blobField: 'image_blob',
    urlField: 'image_url',
    folder: 'project-image-blobs',
    description: 'Project image blob details'
  }
];

async function migrateBigObjects() {
  console.log('🚀 Starting Big Objects Migration to VNData S3...\n');
  
  let totalProcessed = 0;
  let totalUploaded = 0;
  let totalErrors = 0;
  
  try {
    for (const target of MIGRATION_TARGETS) {
      console.log(`\n📋 Processing table: ${target.table}`);
      console.log(`   Field: ${target.blobField} → ${target.urlField}`);
      console.log(`   Folder: ${target.folder}`);
      console.log(`   Description: ${target.description}`);
      
      // Get records with blob data
      const records = await db(target.table)
        .select('*')
        .whereNotNull(target.blobField)
        .where(target.blobField, '!=', '');
      
      console.log(`   Found ${records.length} records with blob data`);
      
      if (records.length === 0) {
        console.log('   ⏭️  No data to migrate, skipping...');
        continue;
      }
      
      for (const record of records) {
        totalProcessed++;
        const recordId = record.id;
        
        try {
          console.log(`\n   🔄 Processing record ID: ${recordId}`);
          
          if (target.isJsonArray) {
            // Handle JSON array of images
            await migrateJsonArrayImages(record, target);
          } else {
            // Handle single blob image
            await migrateSingleBlobImage(record, target);
          }
          
          totalUploaded++;
          console.log(`   ✅ Successfully migrated record ID: ${recordId}`);
          
        } catch (error) {
          totalErrors++;
          console.error(`   ❌ Error migrating record ID ${recordId}:`, error.message);
        }
      }
    }
    
    console.log('\n📊 Migration Summary:');
    console.log(`   Total processed: ${totalProcessed}`);
    console.log(`   Successfully uploaded: ${totalUploaded}`);
    console.log(`   Errors: ${totalErrors}`);
    
    if (totalErrors === 0) {
      console.log('\n🎉 Migration completed successfully!');
    } else {
      console.log('\n⚠️  Migration completed with some errors. Check logs above.');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    await db.destroy();
  }
}

async function migrateSingleBlobImage(record, target) {
  const blobData = record[target.blobField];
  
  if (!blobData || blobData.trim() === '') {
    console.log('     ⏭️  Empty blob data, skipping...');
    return;
  }
  
  // Check if it's base64 data
  if (!blobData.startsWith('data:image/')) {
    console.log('     ⏭️  Not base64 image data, skipping...');
    return;
  }
  
  // Extract base64 data
  const base64Data = blobData.split(',')[1];
  if (!base64Data) {
    console.log('     ⏭️  Invalid base64 format, skipping...');
    return;
  }
  
  // Convert to buffer
  const buffer = Buffer.from(base64Data, 'base64');
  
  // Determine file extension from MIME type
  const mimeType = blobData.match(/data:image\/([^;]+)/)?.[1];
  const extension = mimeType === 'jpeg' ? 'jpg' : mimeType || 'png';
  
  // Create mock file object for upload service
  const mockFile = {
    buffer: buffer,
    originalname: `migrated-${record.id}.${extension}`,
    mimetype: `image/${mimeType || 'png'}`,
    size: buffer.length
  };
  
  console.log(`     📤 Uploading ${extension.toUpperCase()} image (${buffer.length} bytes)...`);
  
  // Upload to VNData S3
  const uploadedUrl = await uploadService.uploadImage(mockFile, target.folder);
  
  console.log(`     🔗 Uploaded URL: ${uploadedUrl}`);
  
  // Update database with new URL
  await db(target.table)
    .where('id', record.id)
    .update({
      [target.urlField]: uploadedUrl,
      [target.blobField]: null, // Clear blob data
      updated_at: new Date()
    });
  
  console.log(`     💾 Updated database record ID: ${record.id}`);
}

async function migrateJsonArrayImages(record, target) {
  const jsonData = record[target.blobField];
  
  if (!jsonData) {
    console.log('     ⏭️  No JSON data, skipping...');
    return;
  }
  
  let imageArray;
  try {
    // Parse JSON if it's a string
    imageArray = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
  } catch (error) {
    console.log('     ⏭️  Invalid JSON format, skipping...');
    return;
  }
  
  if (!Array.isArray(imageArray)) {
    console.log('     ⏭️  Not an array, skipping...');
    return;
  }
  
  const uploadedUrls = [];
  
  for (let i = 0; i < imageArray.length; i++) {
    const imageData = imageArray[i];
    
    if (!imageData || typeof imageData !== 'string') {
      console.log(`     ⏭️  Skipping non-string image at index ${i}`);
      continue;
    }
    
    // Check if it's already a URL
    if (imageData.startsWith('http')) {
      console.log(`     🔗 Image ${i} is already a URL, keeping...`);
      uploadedUrls.push(imageData);
      continue;
    }
    
    // Check if it's base64 data
    if (!imageData.startsWith('data:image/')) {
      console.log(`     ⏭️  Image ${i} is not base64, skipping...`);
      continue;
    }
    
    try {
      // Extract base64 data
      const base64Data = imageData.split(',')[1];
      if (!base64Data) {
        console.log(`     ⏭️  Invalid base64 format at index ${i}, skipping...`);
        continue;
      }
      
      // Convert to buffer
      const buffer = Buffer.from(base64Data, 'base64');
      
      // Determine file extension from MIME type
      const mimeType = imageData.match(/data:image\/([^;]+)/)?.[1];
      const extension = mimeType === 'jpeg' ? 'jpg' : mimeType || 'png';
      
      // Create mock file object for upload service
      const mockFile = {
        buffer: buffer,
        originalname: `migrated-${record.id}-${i}.${extension}`,
        mimetype: `image/${mimeType || 'png'}`,
        size: buffer.length
      };
      
      console.log(`     📤 Uploading image ${i} (${extension.toUpperCase()}, ${buffer.length} bytes)...`);
      
      // Upload to VNData S3
      const uploadedUrl = await uploadService.uploadImage(mockFile, target.folder);
      
      console.log(`     🔗 Uploaded URL ${i}: ${uploadedUrl}`);
      uploadedUrls.push(uploadedUrl);
      
    } catch (error) {
      console.error(`     ❌ Error uploading image ${i}:`, error.message);
      // Keep original data if upload fails
      uploadedUrls.push(imageData);
    }
  }
  
  // Update database with new URLs
  await db(target.table)
    .where('id', record.id)
    .update({
      [target.urlField]: JSON.stringify(uploadedUrls),
      [target.blobField]: null, // Clear blob data
      updated_at: new Date()
    });
  
  console.log(`     💾 Updated database record ID: ${record.id} with ${uploadedUrls.length} URLs`);
}

// Run migration
if (require.main === module) {
  migrateBigObjects()
    .then(() => {
      console.log('\n✅ Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateBigObjects };
