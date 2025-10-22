#!/usr/bin/env node

// Migration script for mock data assets to VNData S3
require('dotenv').config({ path: '.env.production' }); // Load VNData config
const knex = require('knex');
const knexConfig = require('../knexfile');
const Minio = require('minio');
const fs = require('fs');
const path = require('path');

// Database configuration (use development)
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

// VNData S3 configuration using MinIO client (use production)
const minioClient = new Minio.Client({
  endPoint: process.env.VNDATA_S3_ENDPOINT?.replace('https://', '').replace('http://', ''),
  port: 443, // VNData S3 uses port 443 for HTTPS
  useSSL: true,
  accessKey: process.env.VNDATA_ACCESS_KEY,
  secretKey: process.env.VNDATA_SECRET_KEY,
});

const BUCKET_NAME = process.env.VNDATA_BUCKET_NAME;

// Load analysis results
const ANALYSIS_FILE = '/Users/huy.hoang/Desktop/pgdesign/pgdesign-be/scripts/mock-data-analysis.json';
const analysisData = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf8'));

console.log('🚀 Starting Mock Data Migration to VNData S3...\n');
console.log(`📊 Migration targets: ${analysisData.totalTargets}`);
console.log(`📁 Existing files: ${analysisData.fileStatus.existing}`);
console.log(`❌ Missing files: ${analysisData.fileStatus.missing}`);
console.log('');

let totalProcessed = 0;
let totalUploaded = 0;
let totalErrors = 0;
const urlMappings = new Map(); // Store old path -> new S3 URL mappings

async function migrateMockData() {
  try {
    // Group targets by type for better organization
    const importTargets = analysisData.targets.filter(t => t.type === 'import');
    const pathTargets = analysisData.targets.filter(t => t.type === 'path');
    const base64Targets = analysisData.targets.filter(t => t.type === 'base64');
    
    console.log('📋 Migration Plan:');
    console.log(`   Import targets: ${importTargets.length}`);
    console.log(`   Path targets: ${pathTargets.length}`);
    console.log(`   Base64 targets: ${base64Targets.length}`);
    console.log('');
    
    // 1. Migrate import targets (src/assets)
    console.log('🔄 Phase 1: Migrating import assets (src/assets)...');
    await migrateImportTargets(importTargets);
    
    // 2. Migrate path targets (public/assets)
    console.log('\n🔄 Phase 2: Migrating path assets (public/assets)...');
    await migratePathTargets(pathTargets);
    
    // 3. Migrate base64 data
    console.log('\n🔄 Phase 3: Migrating base64 data...');
    await migrateBase64Targets(base64Targets);
    
    // 4. Update service files with S3 URLs
    console.log('\n🔄 Phase 4: Updating service files...');
    await updateServiceFiles();
    
    // 5. Summary
    console.log('\n📊 Migration Summary:');
    console.log(`   Total processed: ${totalProcessed}`);
    console.log(`   Successfully uploaded: ${totalUploaded}`);
    console.log(`   Errors: ${totalErrors}`);
    console.log(`   URL mappings created: ${urlMappings.size}`);
    
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

async function migrateImportTargets(targets) {
  console.log(`   Processing ${targets.length} import targets...`);
  
  for (const target of targets) {
    totalProcessed++;
    
    try {
      if (!fs.existsSync(target.fullPath)) {
        console.log(`   ⏭️  Skipping missing file: ${target.path}`);
        continue;
      }
      
      const stats = fs.statSync(target.fullPath);
      const fileSize = (stats.size / 1024).toFixed(1);
      
      console.log(`   📤 Uploading: ${target.path} (${fileSize}KB)`);
      
      // Read file
      const fileBuffer = fs.readFileSync(target.fullPath);
      
      // Determine content type
      const extension = path.extname(target.path).toLowerCase();
      const contentType = getContentType(extension);
      
      // Generate S3 key
      const s3Key = `mock-assets/${target.path}`;
      
      // Upload to VNData S3
      await minioClient.putObject(
        BUCKET_NAME,
        s3Key,
        fileBuffer,
        fileBuffer.length,
        {
          'Content-Type': contentType,
          'Cache-Control': 'max-age=31536000',
        }
      );
      
      // Generate public URL
      const publicUrl = `https://s3-hcm-r2.s3cloud.vn/${BUCKET_NAME}/${s3Key}`;
      
      // Store mapping
      urlMappings.set(target.path, publicUrl);
      
      totalUploaded++;
      console.log(`   ✅ Uploaded: ${publicUrl}`);
      
    } catch (error) {
      totalErrors++;
      console.error(`   ❌ Error uploading ${target.path}:`, error.message);
    }
  }
}

async function migratePathTargets(targets) {
  console.log(`   Processing ${targets.length} path targets...`);
  
  for (const target of targets) {
    totalProcessed++;
    
    try {
      if (!fs.existsSync(target.fullPath)) {
        console.log(`   ⏭️  Skipping missing file: ${target.path}`);
        continue;
      }
      
      const stats = fs.statSync(target.fullPath);
      const fileSize = (stats.size / 1024).toFixed(1);
      
      console.log(`   📤 Uploading: ${target.path} (${fileSize}KB)`);
      
      // Read file
      const fileBuffer = fs.readFileSync(target.fullPath);
      
      // Determine content type
      const extension = path.extname(target.path).toLowerCase();
      const contentType = getContentType(extension);
      
      // Generate S3 key
      const s3Key = `mock-assets/${target.path}`;
      
      // Upload to VNData S3
      await minioClient.putObject(
        BUCKET_NAME,
        s3Key,
        fileBuffer,
        fileBuffer.length,
        {
          'Content-Type': contentType,
          'Cache-Control': 'max-age=31536000',
        }
      );
      
      // Generate public URL
      const publicUrl = `https://s3-hcm-r2.s3cloud.vn/${BUCKET_NAME}/${s3Key}`;
      
      // Store mapping
      urlMappings.set(target.path, publicUrl);
      
      totalUploaded++;
      console.log(`   ✅ Uploaded: ${publicUrl}`);
      
    } catch (error) {
      totalErrors++;
      console.error(`   ❌ Error uploading ${target.path}:`, error.message);
    }
  }
}

async function migrateBase64Targets(targets) {
  console.log(`   Processing ${targets.length} base64 targets...`);
  
  for (const target of targets) {
    totalProcessed++;
    
    try {
      console.log(`   📤 Processing base64 data (${target.size} chars)`);
      
      // Extract base64 data
      const base64Data = target.data.split(',')[1];
      if (!base64Data) {
        console.log(`   ⏭️  Invalid base64 format, skipping`);
        continue;
      }
      
      // Convert to buffer
      const buffer = Buffer.from(base64Data, 'base64');
      
      // Determine file extension from MIME type
      const mimeType = target.data.match(/data:image\/([^;]+)/)?.[1];
      const extension = mimeType === 'jpeg' ? 'jpg' : mimeType || 'png';
      
      // Generate filename
      const fileName = `base64-image-${Date.now()}.${extension}`;
      const s3Key = `mock-assets/base64/${fileName}`;
      
      // Upload to VNData S3
      await minioClient.putObject(
        BUCKET_NAME,
        s3Key,
        buffer,
        buffer.length,
        {
          'Content-Type': `image/${mimeType || 'png'}`,
          'Cache-Control': 'max-age=31536000',
        }
      );
      
      // Generate public URL
      const publicUrl = `https://s3-hcm-r2.s3cloud.vn/${BUCKET_NAME}/${s3Key}`;
      
      // Store mapping
      urlMappings.set(target.path, publicUrl);
      
      totalUploaded++;
      console.log(`   ✅ Uploaded base64: ${publicUrl}`);
      
    } catch (error) {
      totalErrors++;
      console.error(`   ❌ Error uploading base64:`, error.message);
    }
  }
}

async function updateServiceFiles() {
  console.log(`   Updating service files with S3 URLs...`);
  
  const SERVICES_DIR = '/Users/huy.hoang/Desktop/pgdesign/src/services';
  const serviceFiles = fs.readdirSync(SERVICES_DIR)
    .filter(file => file.endsWith('.ts') && !file.includes('.md'))
    .map(file => path.join(SERVICES_DIR, file));
  
  for (const filePath of serviceFiles) {
    try {
      const fileName = path.basename(filePath);
      console.log(`   📝 Updating: ${fileName}`);
      
      let content = fs.readFileSync(filePath, 'utf8');
      let updated = false;
      
      // Update import statements
      for (const [oldPath, newUrl] of urlMappings) {
        const importPattern = new RegExp(`from\\s+["']\\.\\.\/assets\/(${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})["']`, 'g');
        if (content.match(importPattern)) {
          content = content.replace(importPattern, `from "${newUrl}"`);
          updated = true;
        }
        
        // Update path references
        const pathPattern = new RegExp(`["']\/assets\/(${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})["']`, 'g');
        if (content.match(pathPattern)) {
          content = content.replace(pathPattern, `"${newUrl}"`);
          updated = true;
        }
      }
      
      if (updated) {
        fs.writeFileSync(filePath, content);
        console.log(`   ✅ Updated: ${fileName}`);
      } else {
        console.log(`   ⏭️  No updates needed: ${fileName}`);
      }
      
    } catch (error) {
      console.error(`   ❌ Error updating ${path.basename(filePath)}:`, error.message);
    }
  }
}

function getContentType(extension) {
  const contentTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.bmp': 'image/bmp',
    '.tiff': 'image/tiff',
    '.tif': 'image/tiff'
  };
  
  return contentTypes[extension] || 'application/octet-stream';
}

// Save URL mappings for reference
function saveUrlMappings() {
  const mappingsFile = '/Users/huy.hoang/Desktop/pgdesign/pgdesign-be/scripts/url-mappings.json';
  const mappings = Object.fromEntries(urlMappings);
  
  fs.writeFileSync(mappingsFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalMappings: urlMappings.size,
    mappings: mappings
  }, null, 2));
  
  console.log(`\n💾 URL mappings saved to: ${mappingsFile}`);
}

// Run migration
if (require.main === module) {
  migrateMockData()
    .then(() => {
      saveUrlMappings();
      console.log('\n✅ Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMockData };
