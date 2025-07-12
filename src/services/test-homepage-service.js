/**
 * Test script for Homepage Service
 * This script can be run in the browser console to test both modes
 */

// Test Mock Data Mode
console.log('🧪 Testing Homepage Service...');

// Test individual functions
async function testMockMode() {
  console.log('📋 Testing Mock Data Mode...');
  
  try {
    // Test health check
    const health = await checkApiHealth();
    console.log('✅ Health Check:', health);
    
    // Test individual sections
    const hero = await fetchHeroData();
    console.log('✅ Hero Data:', hero);
    
    const about = await fetchAboutData();
    console.log('✅ About Data:', about);
    
    const imageSlider = await fetchImageSliderData();
    console.log('✅ Image Slider Data:', imageSlider);
    
    // Test main function
    const allData = await fetchHomePageData();
    console.log('✅ All Homepage Data:', allData);
    
    console.log('🎉 Mock Mode Test Completed Successfully!');
    
  } catch (error) {
    console.error('❌ Mock Mode Test Failed:', error);
  }
}

// Test Real API Mode (requires backend to be running)
async function testApiMode() {
  console.log('🌐 Testing Real API Mode...');
  console.log('⚠️  Note: This requires backend server to be running on port 3002');
  
  try {
    // Change the flag temporarily
    const originalFlag = USE_MOCK_DATA;
    USE_MOCK_DATA = false;
    
    // Test health check
    const health = await checkApiHealth();
    console.log('✅ API Health Check:', health);
    
    if (health) {
      // Test main function
      const allData = await fetchHomePageData();
      console.log('✅ API Homepage Data:', allData);
      console.log('🎉 API Mode Test Completed Successfully!');
    } else {
      console.log('⚠️  Backend server not available, skipping API tests');
    }
    
    // Restore original flag
    USE_MOCK_DATA = originalFlag;
    
  } catch (error) {
    console.error('❌ API Mode Test Failed:', error);
  }
}

// Run tests
if (typeof window !== 'undefined') {
  // Browser environment
  window.testHomepageService = {
    testMockMode,
    testApiMode,
    runAllTests: async () => {
      await testMockMode();
      await testApiMode();
    }
  };
  
  console.log('🚀 Homepage Service Test Functions Available:');
  console.log('- testHomepageService.testMockMode()');
  console.log('- testHomepageService.testApiMode()');
  console.log('- testHomepageService.runAllTests()');
} else {
  // Node.js environment
  console.log('Node.js environment detected, skipping browser tests');
} 