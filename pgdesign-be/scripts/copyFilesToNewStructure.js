#!/usr/bin/env node

// Script to copy existing files in VNData S3 to new structure
require('dotenv').config();
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

// File mappings from old structure to new structure
const FILE_MAPPINGS = [
  // Homepage images
  { from: 'mock-assets/images/homepage/hero1.png', to: 'homepage/hero1.png' },
  { from: 'mock-assets/images/homepage/hero2.png', to: 'homepage/hero2.png' },
  { from: 'mock-assets/images/homepage/hero3.png', to: 'homepage/hero3.png' },
  { from: 'mock-assets/images/homepage/hero4.png', to: 'homepage/hero4.png' },
  { from: 'mock-assets/images/homepage/projectdiary1.png', to: 'homepage/projectdiary1.png' },
  { from: 'mock-assets/images/homepage/projectdiary2.png', to: 'homepage/projectdiary2.png' },
  { from: 'mock-assets/images/homepage/projectdiary3.png', to: 'homepage/projectdiary3.png' },
  { from: 'mock-assets/images/homepage/projectdiary4.png', to: 'homepage/projectdiary4.png' },
  { from: 'mock-assets/images/homepage/projectdiary5.png', to: 'homepage/projectdiary5.png' },
  { from: 'mock-assets/images/homepage/projectdiary6.png', to: 'homepage/projectdiary6.png' },
  { from: 'mock-assets/images/homepage/projectdiary7.png', to: 'homepage/projectdiary7.png' },
  { from: 'mock-assets/images/homepage/projectdiary8.png', to: 'homepage/projectdiary8.png' },
  { from: 'mock-assets/images/homepage/solution1.png', to: 'homepage/solution1.png' },
  { from: 'mock-assets/images/homepage/solution2.png', to: 'homepage/solution2.png' },
  { from: 'mock-assets/images/homepage/solution3.png', to: 'homepage/solution3.png' },
  { from: 'mock-assets/images/homepage/solution4.png', to: 'homepage/solution4.png' },
  
  // Project page images
  { from: 'mock-assets/images/projectpage/house-normal.png', to: 'projectpage/house-normal.png' },
  { from: 'mock-assets/images/projectpage/appartment.png', to: 'projectpage/appartment.png' },
  { from: 'mock-assets/images/projectpage/house-business.png', to: 'projectpage/house-business.png' },
  { from: 'mock-assets/images/projectpage/village.png', to: 'projectpage/village.png' },
  
  // Profile page images
  { from: 'mock-assets/images/profilepage/1.png', to: 'profilepage/1.png' },
  { from: 'mock-assets/images/profilepage/2.png', to: 'profilepage/2.png' },
  { from: 'mock-assets/images/profilepage/3.png', to: 'profilepage/3.png' },
  { from: 'mock-assets/images/profilepage/4.1.png', to: 'profilepage/4.1.png' },
  { from: 'mock-assets/images/profilepage/4.png', to: 'profilepage/4.png' },
  { from: 'mock-assets/images/profilepage/5.png', to: 'profilepage/5.png' },
  { from: 'mock-assets/images/profilepage/6.png', to: 'profilepage/6.png' },
  { from: 'mock-assets/images/profilepage/7.png', to: 'profilepage/7.png' },
  { from: 'mock-assets/images/profilepage/8.png', to: 'profilepage/8.png' },
  { from: 'mock-assets/images/profilepage/9.png', to: 'profilepage/9.png' },
  { from: 'mock-assets/images/profilepage/10.png', to: 'profilepage/10.png' },
  { from: 'mock-assets/images/profilepage/11.png', to: 'profilepage/11.png' },
  { from: 'mock-assets/images/profilepage/12.png', to: 'profilepage/12.png' },
  { from: 'mock-assets/images/profilepage/13.png', to: 'profilepage/13.png' },
  { from: 'mock-assets/images/profilepage/14.png', to: 'profilepage/14.png' },
  { from: 'mock-assets/images/profilepage/15.png', to: 'profilepage/15.png' },
  { from: 'mock-assets/images/profilepage/16.png', to: 'profilepage/16.png' },
  { from: 'mock-assets/images/profilepage/17.png', to: 'profilepage/17.png' },
  { from: 'mock-assets/images/profilepage/18.png', to: 'profilepage/18.png' },
  { from: 'mock-assets/images/profilepage/19.png', to: 'profilepage/19.png' },
  
  // Intro page images
  { from: 'mock-assets/images/intropage/hero.png', to: 'intropage/pg-employee/hero.png' },
  { from: 'mock-assets/images/intropage/mission.png', to: 'intropage/pg-employee/mission.png' },
  
  // Service page images
  { from: 'mock-assets/images/servicepage/service-hero.png', to: 'servicepage/service-hero.png' },
  { from: 'mock-assets/images/servicepage/service1.png', to: 'servicepage/service1.png' },
  { from: 'mock-assets/images/servicepage/service2.png', to: 'servicepage/service2.png' },
  { from: 'mock-assets/images/servicepage/service3.png', to: 'servicepage/service3.png' },
  { from: 'mock-assets/images/servicepage/service4.png', to: 'servicepage/service4.png' },
  
  // Icons
  { from: 'mock-assets/icons/experience-icon.svg', to: 'icons/experience-icon.svg' },
  { from: 'mock-assets/icons/customer-icon.svg', to: 'icons/customer-icon.svg' },
  { from: 'mock-assets/icons/design-icon.svg', to: 'icons/design-icon.svg' },
  { from: 'mock-assets/icons/building-icon.svg', to: 'icons/building-icon.svg' },
  { from: 'mock-assets/icons/work-process-flow-diagram-1.svg', to: 'icons/work-process-flow-diagram-1.svg' },
  { from: 'mock-assets/icons/work-process-flow-diagram-2.svg', to: 'icons/work-process-flow-diagram-2.svg' },
  
  // Other images
  { from: 'mock-assets/images/diary-image-1.png', to: 'images/diary-image-1.png' },
  { from: 'mock-assets/images/diary-image-2.png', to: 'images/diary-image-2.png' },
  { from: 'mock-assets/images/diary-image-3.png', to: 'images/diary-image-3.png' },
  { from: 'mock-assets/images/diary-image-4.png', to: 'images/diary-image-4.png' },
  { from: 'mock-assets/images/thumb-intro.png', to: 'images/thumb-intro.png' },
  
  // Blog images
  { from: 'mock-assets/blog/4-tips-tao-diem-nhan-bep-sang-trong/Picture1.png', to: 'blogpage/4-tips-tao-diem-nhan-bep-sang-trong/Picture1.png' }
];

async function copyFilesToNewStructure() {
  console.log('🔄 Copying files to new structure in VNData S3...\n');
  
  try {
    let totalCopied = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    
    for (const mapping of FILE_MAPPINGS) {
      try {
        console.log(`📁 Copying: ${mapping.from} → ${mapping.to}`);
        
        // Check if source file exists
        try {
          await minioClient.statObject(BUCKET_NAME, mapping.from);
          
          // Copy file to new location
          await minioClient.copyObject(
            BUCKET_NAME,
            mapping.to,
            `/${BUCKET_NAME}/${mapping.from}`
          );
          
          console.log(`   ✅ Copied successfully`);
          totalCopied++;
          
        } catch (statError) {
          console.log(`   ⚠️  Source file not found, skipping`);
          totalSkipped++;
        }
        
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
        totalErrors++;
      }
    }
    
    console.log(`\n📊 Copy Summary:`);
    console.log(`   Files copied: ${totalCopied}`);
    console.log(`   Files skipped: ${totalSkipped}`);
    console.log(`   Errors: ${totalErrors}`);
    
    if (totalErrors === 0) {
      console.log('\n✅ All files copied successfully!');
    } else {
      console.log(`\n⚠️  ${totalErrors} files had errors during copy`);
    }
    
  } catch (error) {
    console.error('❌ Error copying files:', error);
    process.exit(1);
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting file copy to new structure...\n');
  
  try {
    await copyFilesToNewStructure();
    
    console.log('\n🎉 File copy completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Test image accessibility');
    console.log('   2. Verify website functionality');
    console.log('   3. Clean up old files if needed');
    
  } catch (error) {
    console.error('❌ Copy failed:', error);
    process.exit(1);
  }
}

main();
