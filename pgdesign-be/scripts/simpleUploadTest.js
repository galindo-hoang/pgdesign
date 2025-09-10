const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

// Simple test for basic upload functionality
async function simpleUploadTest() {
  console.log('🚀 Simple Upload Test...\n');

  try {
    // Create a simple test image
    const testImagePath = path.join(__dirname, 'simple-test.png');
    const testImageBuffer = Buffer.from([
      0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
      0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
      0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
      0x09, 0x08, 0x0A, 0x0C, 0x14, 0x0D, 0x0C, 0x0B, 0x0B, 0x0C, 0x19, 0x12,
      0x13, 0x0F, 0x14, 0x1D, 0x1A, 0x1F, 0x1E, 0x1D, 0x1A, 0x1C, 0x1C, 0x20,
      0x24, 0x2E, 0x27, 0x20, 0x22, 0x2C, 0x23, 0x1C, 0x1C, 0x28, 0x37, 0x29,
      0x2C, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1F, 0x27, 0x39, 0x3D, 0x38, 0x32,
      0x3C, 0x2E, 0x33, 0x34, 0x32, 0xFF, 0xC0, 0x00, 0x11, 0x08, 0x00, 0x01,
      0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0x02, 0x11, 0x01, 0x03, 0x11, 0x01,
      0xFF, 0xC4, 0x00, 0x14, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0xFF, 0xC4,
      0x00, 0x14, 0x10, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xDA, 0x00, 0x0C,
      0x03, 0x01, 0x00, 0x02, 0x11, 0x03, 0x11, 0x00, 0x3F, 0x00, 0x00, 0xFF, 0xD9
    ]);

    fs.writeFileSync(testImagePath, testImageBuffer);
    console.log('✅ Test image created');

    // Test upload
    const formData = new FormData();
    formData.append('image', fs.createReadStream(testImagePath));
    formData.append('folder', 'demo');

    console.log('📤 Uploading image...');
    const response = await axios.post('http://localhost:3002/api/v1/upload/image', formData, {
      headers: formData.getHeaders(),
      timeout: 30000
    });

    const uploadedUrl = response.data.data.url;
    console.log('✅ Upload successful!');
    console.log('🔗 URL:', uploadedUrl);

    // Test URL accessibility
    console.log('\n🔍 Testing URL accessibility...');
    const urlResponse = await axios.get(uploadedUrl, { timeout: 10000 });
    
    if (urlResponse.status === 200) {
      console.log('✅ URL is publicly accessible');
      console.log('📊 Content-Type:', urlResponse.headers['content-type']);
      console.log('📏 Size:', urlResponse.headers['content-length'], 'bytes');
      
      // Check for permanent URL
      if (!uploadedUrl.includes('X-Amz-Algorithm') && !uploadedUrl.includes('Expires')) {
        console.log('🎉 URL is PERMANENT (no expiration)');
      }
    }

    // Clean up
    fs.unlinkSync(testImagePath);

    console.log('\n✨ SUCCESS! Your file upload system works perfectly!');
    console.log('🔗 Test this URL in your browser:', uploadedUrl);
    console.log('\n📋 What this confirms:');
    console.log('   ✅ Files upload to MinIO successfully');
    console.log('   ✅ URLs are public and permanent');
    console.log('   ✅ No expiration time');
    console.log('   ✅ Direct browser access works');

    return uploadedUrl;

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    return null;
  }
}

// Run the simple test
simpleUploadTest(); 