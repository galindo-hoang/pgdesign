/**
 * Comprehensive VNData S3 API Tests
 * Tests all endpoints với VNData S3 storage
 */

const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3002/api/v1';

// Helper to check if URL contains VNData domain
function isVNDataURL(url) {
  return url && url.includes('s3cloud.vn');
}

async function runTests() {
  console.log('🧪 Testing APIs với VNData S3 Storage\n');
  console.log('='.repeat(60));
  
  let passedTests = 0;
  let failedTests = 0;

  try {
    // Test 1: Get Projects
    console.log('\n📋 Test 1: GET /projectdetail');
    const projectsRes = await fetch(`${API_URL}/projectdetail`);
    const projectsData = await projectsRes.json();
    
    if (projectsData.success && projectsData.data.length > 0) {
      const firstProject = projectsData.data[0];
      const hasVNDataURL = isVNDataURL(firstProject.thumbnailImage);
      
      console.log(`  ✅ Success: ${projectsData.data.length} projects found`);
      console.log(`  📦 First project: ${firstProject.title}`);
      console.log(`  🔗 Thumbnail: ${firstProject.thumbnailImage?.substring(0, 70)}...`);
      console.log(`  🇻🇳 Uses VNData: ${hasVNDataURL ? '✅ YES' : '❌ NO'}`);
      
      if (hasVNDataURL) passedTests++;
      else failedTests++;
    } else {
      console.log('  ❌ Failed: No projects found');
      failedTests++;
    }

    // Test 2: Get Single Project
    console.log('\n📋 Test 2: GET /projectdetail/project/appartment-001');
    const projectRes = await fetch(`${API_URL}/projectdetail/project/appartment-001`);
    const projectData = await projectRes.json();
    
    if (projectData.success) {
      const hasVNDataThumb = isVNDataURL(projectData.data.thumbnailImage);
      const hasVNDataImages = projectData.data.projectImages?.some(isVNDataURL);
      
      console.log(`  ✅ Success: Project found`);
      console.log(`  📦 Title: ${projectData.data.title}`);
      console.log(`  🖼️  Thumbnail: ${projectData.data.thumbnailImage?.substring(0, 70)}...`);
      console.log(`  🎨 Images count: ${projectData.data.projectImages?.length || 0}`);
      console.log(`  🇻🇳 Thumbnail uses VNData: ${hasVNDataThumb ? '✅' : '❌'}`);
      console.log(`  🇻🇳 Images use VNData: ${hasVNDataImages ? '✅' : '❌'}`);
      
      if (hasVNDataThumb && hasVNDataImages) passedTests++;
      else failedTests++;
    } else {
      console.log('  ❌ Failed');
      failedTests++;
    }

    // Test 3: Upload Single Image
    console.log('\n📋 Test 3: POST /upload/image (Upload to VNData)');
    const formData = new FormData();
    const testImagePath = '/tmp/test-image.png';
    
    if (fs.existsSync(testImagePath)) {
      formData.append('image', fs.createReadStream(testImagePath));
      formData.append('folder', 'api-test');
      
      const uploadRes = await fetch(`${API_URL}/upload/image`, {
        method: 'POST',
        body: formData
      });
      
      const uploadData = await uploadRes.json();
      
      if (uploadData.success) {
        const hasVNDataURL = isVNDataURL(uploadData.data.url);
        
        console.log(`  ✅ Upload success`);
        console.log(`  🔗 URL: ${uploadData.data.url}`);
        console.log(`  📏 Size: ${uploadData.data.size} bytes`);
        console.log(`  🇻🇳 Uses VNData: ${hasVNDataURL ? '✅ YES' : '❌ NO'}`);
        
        if (hasVNDataURL) passedTests++;
        else failedTests++;
      } else {
        console.log(`  ❌ Upload failed: ${uploadData.message || 'Unknown error'}`);
        failedTests++;
      }
    } else {
      console.log('  ⚠️  Skipped: Test image not found');
    }

    // Test 4: Get Project Categories
    console.log('\n📋 Test 4: GET /projectpage/project-categories');
    const categoriesRes = await fetch(`${API_URL}/projectpage/project-categories`);
    const categoriesData = await categoriesRes.json();
    
    if (categoriesData.success) {
      const categories = categoriesData.data.projectCategories.categories;
      const hasVNDataBg = categories.some(c => isVNDataURL(c.backgroundImageUrl));
      
      console.log(`  ✅ Success: ${categories.length} categories found`);
      console.log(`  📦 Categories: ${categories.map(c => c.title).join(', ')}`);
      console.log(`  🇻🇳 Background uses VNData: ${hasVNDataBg ? '✅ (when uploaded)' : 'N/A (null)'}`);
      passedTests++;
    } else {
      console.log('  ❌ Failed');
      failedTests++;
    }

    // Test 5: Image Accessibility
    console.log('\n📋 Test 5: VNData Image Accessibility');
    const testImageUrl = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-assets/project-details/appartment-001/phu-gia-hung-01.png';
    
    try {
      const imageRes = await fetch(testImageUrl, { method: 'HEAD' });
      if (imageRes.ok) {
        console.log(`  ✅ Image accessible`);
        console.log(`  🔗 URL: ${testImageUrl.substring(0, 80)}...`);
        console.log(`  📏 Size: ${imageRes.headers.get('content-length')} bytes`);
        console.log(`  🔒 Protocol: HTTPS ✅`);
        passedTests++;
      } else {
        console.log(`  ❌ Image not accessible: ${imageRes.status}`);
        failedTests++;
      }
    } catch (error) {
      console.log(`  ❌ Error accessing image: ${error.message}`);
      failedTests++;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Test Summary:');
    console.log(`  ✅ Passed: ${passedTests}`);
    console.log(`  ❌ Failed: ${failedTests}`);
    console.log(`  📦 Total: ${passedTests + failedTests}`);
    
    if (failedTests === 0) {
      console.log('\n🎉 All tests passed! VNData S3 hoạt động perfect!\n');
      process.exit(0);
    } else {
      console.log('\n⚠️  Some tests failed. Check configuration.\n');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Test suite failed:', error.message);
    process.exit(1);
  }
}

// Wait for server to be ready
console.log('⏳ Waiting for backend server...');
setTimeout(runTests, 2000);

