#!/usr/bin/env node

// Script to upload all images from service files to VNData S3
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Minio = require('minio');

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

// Function to get new path for asset
function getNewPathForAsset(assetPath) {
  // Remove leading ../ or /
  let cleanPath = assetPath.replace(/^\.\.\//, '').replace(/^\//, '');
  
  // Map to new structure
  if (cleanPath.includes('assets/images/homepage/')) {
    return 'homepage/';
  }
  if (cleanPath.includes('assets/images/projectpage/')) {
    return 'projectpage/';
  }
  if (cleanPath.includes('assets/images/profilepage/')) {
    return 'profilepage/';
  }
  if (cleanPath.includes('assets/images/intropage/')) {
    return 'intropage/pg-employee/';
  }
  if (cleanPath.includes('assets/images/servicepage/')) {
    return 'servicepage/';
  }
  if (cleanPath.includes('assets/icons/')) {
    return 'icons/';
  }
  if (cleanPath.includes('assets/images/')) {
    return 'images/';
  }
  if (cleanPath.includes('assets/blog/')) {
    return 'blogpage/';
  }
  if (cleanPath.includes('assets/appartment/')) {
    return 'projectpage/appartment/';
  }
  if (cleanPath.includes('assets/house-normal/')) {
    return 'projectpage/house-normal/';
  }
  if (cleanPath.includes('assets/village/')) {
    return 'projectpage/village/';
  }
  if (cleanPath.includes('assets/house-business/')) {
    return 'projectpage/house-business/';
  }
  if (cleanPath.includes('PG NHÂN SỰ/')) {
    return 'intropage/pg-employee/';
  }
  
  return 'images/';
}

// Function to get content type
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

async function uploadServiceImages() {
  console.log('🚀 Starting upload of service images to VNData S3...\n');
  
  try {
    let totalUploaded = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    const uploadedFiles = new Set(); // Track uploaded files to avoid duplicates
    
    // Process image imports
    console.log('📁 Processing image imports...');
    for (const ref of analysisResults.imports) {
      if (ref.path.startsWith('../assets/') || ref.path.startsWith('/assets/')) {
        try {
          const fileName = path.basename(ref.path);
          const newPath = getNewPathForAsset(ref.path);
          const s3Key = `${newPath}${fileName}`;
          
          // Skip if already uploaded
          if (uploadedFiles.has(s3Key)) {
            console.log(`   ⏭️  Skipping duplicate: ${ref.path}`);
            totalSkipped++;
            continue;
          }
          
          // Check if file exists locally (try multiple locations)
          let localPath;
          if (ref.path.startsWith('/assets/')) {
            // Handle /assets/... paths (from src/public/assets)
            localPath = path.resolve(__dirname, '../../src/public', ref.path.substring(1));
          } else if (ref.path.startsWith('../assets/')) {
            // Handle ../assets/... paths (from src/assets)
            localPath = path.resolve(__dirname, '../../src', ref.path.replace(/^\.\.\//, ''));
            if (!fs.existsSync(localPath)) {
              // Try src/public/assets instead
              localPath = path.resolve(__dirname, '../../src/public', ref.path.replace(/^\.\.\//, ''));
            }
          } else {
            // Default behavior
            localPath = path.resolve(__dirname, '../../src', ref.path.replace(/^\.\.\//, ''));
          }
          if (fs.existsSync(localPath)) {
            console.log(`   📤 Uploading: ${ref.path} → ${s3Key}`);
            
            const fileBuffer = fs.readFileSync(localPath);
            const contentType = getContentType(fileName);
            
            await minioClient.putObject(BUCKET_NAME, s3Key, fileBuffer, {
              'Content-Type': contentType,
              'Cache-Control': 'max-age=31536000'
            });
            
            uploadedFiles.add(s3Key);
            console.log(`   ✅ Uploaded successfully`);
            totalUploaded++;
          } else {
            console.log(`   ⚠️  Local file not found: ${ref.path}`);
            totalSkipped++;
          }
        } catch (error) {
          console.log(`   ❌ Error uploading ${ref.path}: ${error.message}`);
          totalErrors++;
        }
      }
    }
    
    // Process image paths
    console.log('\n📂 Processing image paths...');
    for (const ref of analysisResults.paths) {
      if (ref.path.startsWith('/assets/') || ref.path.startsWith('../assets/')) {
        try {
          const fileName = path.basename(ref.path);
          const newPath = getNewPathForAsset(ref.path);
          const s3Key = `${newPath}${fileName}`;
          
          // Skip if already uploaded
          if (uploadedFiles.has(s3Key)) {
            console.log(`   ⏭️  Skipping duplicate: ${ref.path}`);
            totalSkipped++;
            continue;
          }
          
          // Check if file exists locally (try multiple locations)
          let localPath;
          if (ref.path.startsWith('/assets/')) {
            // Handle /assets/... paths (from src/public/assets)
            localPath = path.resolve(__dirname, '../../src/public', ref.path.substring(1));
          } else if (ref.path.startsWith('../assets/')) {
            // Handle ../assets/... paths (from src/assets)
            localPath = path.resolve(__dirname, '../../src', ref.path.replace(/^\.\.\//, ''));
            if (!fs.existsSync(localPath)) {
              // Try src/public/assets instead
              localPath = path.resolve(__dirname, '../../src/public', ref.path.replace(/^\.\.\//, ''));
            }
          } else {
            // Default behavior
            localPath = path.resolve(__dirname, '../../src', ref.path.replace(/^\.\.\//, ''));
          }
          if (fs.existsSync(localPath)) {
            console.log(`   📤 Uploading: ${ref.path} → ${s3Key}`);
            
            const fileBuffer = fs.readFileSync(localPath);
            const contentType = getContentType(fileName);
            
            await minioClient.putObject(BUCKET_NAME, s3Key, fileBuffer, {
              'Content-Type': contentType,
              'Cache-Control': 'max-age=31536000'
            });
            
            uploadedFiles.add(s3Key);
            console.log(`   ✅ Uploaded successfully`);
            totalUploaded++;
          } else {
            console.log(`   ⚠️  Local file not found: ${ref.path}`);
            totalSkipped++;
          }
        } catch (error) {
          console.log(`   ❌ Error uploading ${ref.path}: ${error.message}`);
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
        const s3Key = `images/${fileName}`;
        
        console.log(`   📤 Uploading base64 image → ${s3Key}`);
        
        const buffer = Buffer.from(base64Data, 'base64');
        await minioClient.putObject(BUCKET_NAME, s3Key, buffer, {
          'Content-Type': mimeType,
          'Cache-Control': 'max-age=31536000'
        });
        
        console.log(`   ✅ Uploaded successfully`);
        totalUploaded++;
      } catch (error) {
        console.log(`   ❌ Error uploading base64 image: ${error.message}`);
        totalErrors++;
      }
    }
    
    console.log(`\n📊 Upload Summary:`);
    console.log(`   Files uploaded: ${totalUploaded}`);
    console.log(`   Files skipped: ${totalSkipped}`);
    console.log(`   Errors: ${totalErrors}`);
    console.log(`   Unique files uploaded: ${uploadedFiles.size}`);
    
    if (totalErrors === 0) {
      console.log('\n✅ All files uploaded successfully!');
    } else {
      console.log(`\n⚠️  ${totalErrors} files had errors during upload`);
    }
    
    // Save uploaded files list
    const uploadedList = Array.from(uploadedFiles);
    fs.writeFileSync('uploaded-files.json', JSON.stringify(uploadedList, null, 2));
    console.log('\n💾 Uploaded files list saved to: uploaded-files.json');
    
  } catch (error) {
    console.error('❌ Error during upload:', error);
    process.exit(1);
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting service images upload to VNData S3...\n');
  
  try {
    await uploadServiceImages();
    
    console.log('\n🎉 Service images upload completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Update service files with VNData URLs');
    console.log('   2. Test website functionality');
    console.log('   3. Verify all images are accessible');
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

main();
