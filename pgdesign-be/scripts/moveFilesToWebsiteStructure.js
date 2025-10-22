#!/usr/bin/env node

// Script to create new folder structure in VNData S3 and move files
// This script uses MinIO client (which is already installed)
require('dotenv').config();
const Minio = require('minio');

// VNData S3 configuration using MinIO client
const minioClient = new Minio.Client({
  endPoint: process.env.VNDATA_S3_ENDPOINT?.replace('https://', '').replace('http://', ''),
  port: 443,
  useSSL: true,
  accessKey: process.env.VNDATA_ACCESS_KEY,
  secretKey: process.env.VNDATA_SECRET_KEY,
});

const BUCKET_NAME = process.env.VNDATA_BUCKET_NAME;

// File mapping based on current URLs in database
const FILE_MAPPINGS = {
  // Project categories
  'projectpage/house-normal-bg.png': 'projectpage/house-normal-bg.png',
  'projectpage/appartment-bg.png': 'projectpage/appartment-bg.png', 
  'projectpage/village-bg.png': 'projectpage/village-bg.png',
  'projectpage/house-business-bg.png': 'projectpage/house-business-bg.png',
  
  // Project images - house-normal
  'project-details/house-normal-020/NHA MAU 2 - VIEW 1.jpg': 'projectpage/house-normal/NHA MAU 2 - VIEW 1.jpg',
  'project-details/house-normal-020/NHA MAU 2 - VIEW 2.jpg': 'projectpage/house-normal/NHA MAU 2 - VIEW 2.jpg',
  'project-details/house-normal-020/NHA MAU 2 - VIEW 3.jpg': 'projectpage/house-normal/NHA MAU 2 - VIEW 3.jpg',
  
  // Project images - appartment
  'project-details/appartment-001/phu-gia-hung-01.png': 'projectpage/appartment/phu-gia-hung-01.png',
  'project-details/appartment-001/phu-gia-hung-02.png': 'projectpage/appartment/phu-gia-hung-02.png',
  'project-details/appartment-001/phu-gia-hung-03.png': 'projectpage/appartment/phu-gia-hung-03.png',
  'project-details/appartment-001/phu-gia-hung-04.png': 'projectpage/appartment/phu-gia-hung-04.png',
  
  // Project images - village
  'project-details/village-022/1.png': 'projectpage/village/1.png',
  'project-details/village-022/2.png': 'projectpage/village/2.png',
  'project-details/village-022/3.png': 'projectpage/village/3.png',
  'project-details/village-022/4.png': 'projectpage/village/4.png',
  'project-details/village-022/5.png': 'projectpage/village/5.png',
  
  // Project images - house-business
  'project-details/house-business-032/VIEW 01.jpg': 'projectpage/house-business/VIEW 01.jpg',
  'project-details/house-business-032/VIEW 02.jpg': 'projectpage/house-business/VIEW 02.jpg',
  'project-details/house-business-032/VIEW 03.jpg': 'projectpage/house-business/VIEW 03.jpg',
};

async function moveFilesToNewStructure() {
  console.log('🔄 Moving files to new website structure in VNData S3...\n');

  console.log('📋 New Structure:');
  console.log('   📁 projectpage/');
  console.log('      📁 house-normal/');
  console.log('      📁 appartment/');
  console.log('      📁 village/');
  console.log('      📁 house-business/');
  console.log('');

  try {
    let totalMoved = 0;
    let totalSkipped = 0;
    let totalErrors = 0;

    for (const [sourcePath, targetPath] of Object.entries(FILE_MAPPINGS)) {
      try {
        console.log(`📁 Moving: ${sourcePath} → ${targetPath}`);
        
        // Check if source file exists
        try {
          await minioClient.statObject(BUCKET_NAME, sourcePath);
          
          // Copy file to new location
          await minioClient.copyObject(
            BUCKET_NAME,
            targetPath,
            `/${BUCKET_NAME}/${sourcePath}`
          );
          
          // Delete original file
          await minioClient.removeObject(BUCKET_NAME, sourcePath);
          
          console.log(`   ✅ Moved successfully`);
          totalMoved++;
        } catch (statError) {
          console.log(`   ⚠️  Source file not found, skipping`);
          totalSkipped++;
        }
        
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
        totalErrors++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Files moved: ${totalMoved}`);
    console.log(`   Files skipped: ${totalSkipped}`);
    console.log(`   Errors: ${totalErrors}`);

    if (totalErrors === 0) {
      console.log('\n✅ All files moved successfully!');
    } else {
      console.log(`\n⚠️  ${totalErrors} files had errors during move`);
    }

  } catch (error) {
    console.error('❌ Error moving files:', error);
    process.exit(1);
  }
}

async function createFolderStructure() {
  console.log('📁 Creating folder structure...\n');
  
  const folders = [
    'projectpage/',
    'projectpage/house-normal/',
    'projectpage/appartment/',
    'projectpage/village/',
    'projectpage/house-business/',
    'blogpage/',
    'homepage/',
    'intropage/pg-employee/',
    'profilepage/',
    'servicepage/',
    'icons/',
    'images/'
  ];

  try {
    for (const folder of folders) {
      // Create empty folder marker by uploading a small text file
      const folderMarker = `${folder}.gitkeep`;
      const content = Buffer.from('# Folder marker\n');
      
      try {
        await minioClient.putObject(BUCKET_NAME, folderMarker, content, {
          'Content-Type': 'text/plain'
        });
        console.log(`   ✅ Created folder: ${folder}`);
      } catch (error) {
        // Folder might already exist, that's OK
        console.log(`   ⚠️  Folder ${folder} already exists or could not create marker`);
      }
    }
    
    console.log('\n✅ Folder structure created!');
  } catch (error) {
    console.log('⚠️  Could not create all folders, but continuing...');
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting file reorganization in VNData S3...\n');
  
  try {
    await createFolderStructure();
    await moveFilesToNewStructure();
    
    console.log('\n🎉 File reorganization completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Verify files are accessible at new URLs');
    console.log('   2. Test website functionality');
    console.log('   3. Clean up old empty folders if needed');
    
  } catch (error) {
    console.error('❌ Reorganization failed:', error);
    process.exit(1);
  }
}

main();
