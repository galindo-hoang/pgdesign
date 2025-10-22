#!/usr/bin/env node

require('dotenv').config();
const Minio = require('minio');
const fs = require('fs');
const path = require('path');

const minioClient = new Minio.Client({
  endPoint: process.env.VNDATA_S3_ENDPOINT?.replace('https://', '').replace('http://', ''),
  port: 443,
  useSSL: true,
  accessKey: process.env.VNDATA_ACCESS_KEY,
  secretKey: process.env.VNDATA_SECRET_KEY,
});

const BUCKET_NAME = process.env.VNDATA_BUCKET_NAME;

async function uploadProjectHeroImage() {
  console.log('📤 Uploading project-hero.png to VNData S3...\n');
  
  try {
    // Path to the local file
    const localFilePath = path.resolve(__dirname, '../../src/assets/images/projectpage/project-hero.png');
    
    // Check if file exists locally
    if (!fs.existsSync(localFilePath)) {
      console.log('❌ Local file not found:', localFilePath);
      return;
    }
    
    console.log('📁 Local file found:', localFilePath);
    
    // Read file
    const fileBuffer = fs.readFileSync(localFilePath);
    console.log(`📊 File size: ${fileBuffer.length} bytes`);
    
    // Upload to projectpage folder
    const objectName = 'projectpage/project-hero.png';
    
    console.log(`📤 Uploading to: ${objectName}`);
    
    await minioClient.putObject(BUCKET_NAME, objectName, fileBuffer, {
      'Content-Type': 'image/png',
      'Cache-Control': 'max-age=31536000',
    });
    
    console.log('✅ Upload successful!');
    
    // Generate public URL
    const publicUrl = `https://s3-hcm-r2.s3cloud.vn/${BUCKET_NAME}/${objectName}`;
    console.log(`🔗 Public URL: ${publicUrl}`);
    
    // Test if file is accessible
    console.log('\n🧪 Testing file accessibility...');
    const https = require('https');
    
    const testUrl = new URL(publicUrl);
    const options = {
      hostname: testUrl.hostname,
      port: 443,
      path: testUrl.pathname,
      method: 'HEAD'
    };
    
    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ File is accessible via HTTP');
      } else {
        console.log(`⚠️  HTTP status: ${res.statusCode}`);
      }
    });
    
    req.on('error', (err) => {
      console.log('❌ Error testing accessibility:', err.message);
    });
    
    req.end();
    
  } catch (error) {
    console.error('❌ Error uploading file:', error);
  }
}

uploadProjectHeroImage();
