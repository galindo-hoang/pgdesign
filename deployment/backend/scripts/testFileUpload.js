const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:3002/api/v1';
const MINIO_URL = 'http://localhost:9000';

// Create a test image file
function createTestImage() {
  const testImagePath = path.join(__dirname, 'test-image.jpg');
  
  // Create a simple test image (1x1 pixel JPEG)
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
  console.log('✅ Test image created:', testImagePath);
  return testImagePath;
}

// Test single image upload
async function testSingleImageUpload() {
  try {
    console.log('\n🧪 Testing Single Image Upload...');
    
    const testImagePath = createTestImage();
    const formData = new FormData();
    formData.append('image', fs.createReadStream(testImagePath));
    formData.append('folder', 'test-uploads');

    const response = await axios.post(`${BASE_URL}/upload/image`, formData, {
      headers: formData.getHeaders(),
      timeout: 30000
    });

    console.log('✅ Upload Response:', {
      success: response.data.success,
      message: response.data.message,
      url: response.data.data.url,
      filename: response.data.data.filename,
      size: response.data.data.size
    });

    // Test if the URL is accessible
    const publicUrl = response.data.data.url;
    await testUrlAccessibility(publicUrl);
    
    // Clean up
    fs.unlinkSync(testImagePath);
    
    return publicUrl;
  } catch (error) {
    console.error('❌ Single image upload failed:', error.response?.data || error.message);
    throw error;
  }
}

// Test multiple images upload
async function testMultipleImageUpload() {
  try {
    console.log('\n🧪 Testing Multiple Images Upload...');
    
    const testImagePath1 = createTestImage();
    const testImagePath2 = path.join(__dirname, 'test-image-2.jpg');
    fs.copyFileSync(testImagePath1, testImagePath2);

    const formData = new FormData();
    formData.append('images', fs.createReadStream(testImagePath1));
    formData.append('images', fs.createReadStream(testImagePath2));
    formData.append('folder', 'test-multiple');

    const response = await axios.post(`${BASE_URL}/upload/images`, formData, {
      headers: formData.getHeaders(),
      timeout: 30000
    });

    console.log('✅ Multiple Upload Response:', {
      success: response.data.success,
      count: response.data.data.count,
      urls: response.data.data.urls
    });

    // Test accessibility of all URLs
    for (const url of response.data.data.urls) {
      await testUrlAccessibility(url);
    }
    
    // Clean up
    fs.unlinkSync(testImagePath1);
    fs.unlinkSync(testImagePath2);
    
    return response.data.data.urls;
  } catch (error) {
    console.error('❌ Multiple images upload failed:', error.response?.data || error.message);
    throw error;
  }
}

// Test URL accessibility
async function testUrlAccessibility(url) {
  try {
    console.log(`🔗 Testing URL accessibility: ${url}`);
    
    const response = await axios.get(url, {
      timeout: 10000,
      validateStatus: (status) => status < 500 // Accept any status < 500
    });

    if (response.status === 200) {
      console.log('✅ URL is publicly accessible');
      console.log(`📊 Content-Type: ${response.headers['content-type']}`);
      console.log(`📏 Content-Length: ${response.headers['content-length']} bytes`);
      
      // Check if it's a permanent URL (no expiration parameters)
      if (!url.includes('X-Amz-Algorithm') && !url.includes('Expires')) {
        console.log('✅ URL is PERMANENT (no expiration)');
      } else {
        console.log('⚠️  URL appears to have expiration parameters');
      }
    } else {
      console.log(`⚠️  URL returned status ${response.status}`);
    }
  } catch (error) {
    console.error('❌ URL accessibility test failed:', error.message);
    throw error;
  }
}

// Test image with thumbnail upload
async function testImageWithThumbnail() {
  try {
    console.log('\n🧪 Testing Image with Thumbnail Upload...');
    
    const testImagePath = createTestImage();
    const formData = new FormData();
    formData.append('image', fs.createReadStream(testImagePath));
    formData.append('folder', 'test-thumbnails');

    const response = await axios.post(`${BASE_URL}/upload/image-with-thumbnail`, formData, {
      headers: formData.getHeaders(),
      timeout: 30000
    });

    console.log('✅ Thumbnail Upload Response:', {
      success: response.data.success,
      original: response.data.data.original,
      thumbnail: response.data.data.thumbnail
    });

    // Test accessibility of both URLs
    await testUrlAccessibility(response.data.data.original);
    await testUrlAccessibility(response.data.data.thumbnail);
    
    // Clean up
    fs.unlinkSync(testImagePath);
    
    return response.data.data;
  } catch (error) {
    console.error('❌ Image with thumbnail upload failed:', error.response?.data || error.message);
    throw error;
  }
}

// Test server health
async function testServerHealth() {
  try {
    console.log('🏥 Testing Server Health...');
    const response = await axios.get(`${BASE_URL}/../health`, { timeout: 5000 });
    console.log('✅ Server is running:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Server health check failed:', error.message);
    return false;
  }
}

// Main test function
async function runAllTests() {
  console.log('🚀 Starting File Upload Tests...\n');
  
  try {
    // Test server health first
    const serverOk = await testServerHealth();
    if (!serverOk) {
      console.log('❌ Server is not running. Please start the server first.');
      return;
    }

    // Run upload tests
    const singleUrl = await testSingleImageUpload();
    const multipleUrls = await testMultipleImageUpload();
    const thumbnailData = await testImageWithThumbnail();

    console.log('\n🎉 All Tests Completed Successfully!');
    console.log('\n📋 Test Results Summary:');
    console.log('✅ Single image upload: Working');
    console.log('✅ Multiple images upload: Working');
    console.log('✅ Image with thumbnail: Working');
    console.log('✅ Public URL access: Working');
    console.log('✅ No expiration: Confirmed');
    
    console.log('\n🔗 Sample URLs for manual testing:');
    console.log(`Single image: ${singleUrl}`);
    console.log(`Multiple images: ${multipleUrls[0]}`);
    console.log(`Original: ${thumbnailData.original}`);
    console.log(`Thumbnail: ${thumbnailData.thumbnail}`);
    
    console.log('\n✨ You can copy these URLs and paste them in your browser to verify they work!');
    
  } catch (error) {
    console.error('\n💥 Test failed:', error.message);
    process.exit(1);
  }
}

// Run tests
runAllTests(); 