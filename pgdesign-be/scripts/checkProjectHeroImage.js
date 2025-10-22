#!/usr/bin/env node

require('dotenv').config();
const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: process.env.VNDATA_S3_ENDPOINT?.replace('https://', '').replace('http://', ''),
  port: 443,
  useSSL: true,
  accessKey: process.env.VNDATA_ACCESS_KEY,
  secretKey: process.env.VNDATA_SECRET_KEY,
});

const BUCKET_NAME = process.env.VNDATA_BUCKET_NAME;

async function checkProjectHeroImage() {
  console.log('🔍 Checking for project-hero.png in VNData S3...\n');
  
  try {
    let found = false;
    let totalFiles = 0;
    
    // Check projectpage folder
    console.log('📁 Checking projectpage folder...');
    const projectpageStream = minioClient.listObjects(BUCKET_NAME, 'projectpage/', true);
    
    projectpageStream.on('data', function(obj) {
      totalFiles++;
      if (obj.name.includes('project-hero.png')) {
        console.log(`   ✅ Found: ${obj.name}`);
        found = true;
      }
    });
    
    projectpageStream.on('error', function(err) {
      console.error('Error listing projectpage objects:', err);
    });
    
    projectpageStream.on('end', function() {
      console.log(`📊 Total files in projectpage folder: ${totalFiles}`);
      
      if (!found) {
        console.log('   ❌ project-hero.png not found in projectpage folder.');
        console.log('   🔍 Checking images folder...');
        
        // Check images folder
        const imagesStream = minioClient.listObjects(BUCKET_NAME, 'images/', true);
        let imagesFound = false;
        
        imagesStream.on('data', function(obj) {
          if (obj.name.includes('project-hero.png')) {
            console.log(`   ✅ Found in images folder: ${obj.name}`);
            imagesFound = true;
          }
        });
        
        imagesStream.on('error', function(err) {
          console.error('Error listing images objects:', err);
        });
        
        imagesStream.on('end', function() {
          if (!imagesFound) {
            console.log('   ❌ project-hero.png not found anywhere in VNData S3.');
            console.log('\n💡 Suggestion: Upload the file to VNData S3');
          }
        });
      }
    });
    
  } catch (error) {
    console.error('❌ Error checking VNData S3:', error);
  }
}

checkProjectHeroImage();
