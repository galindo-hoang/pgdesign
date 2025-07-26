// Test script for file reading functions
// Copy and paste this into your browser console when the app is running

console.log('🚀 Starting File Reading Test...');

// Import the functions (you'll need to adjust the path based on your setup)
const testFolder = '4-tips-tao-diem-nhan-bep-sang-trong';

// Test 1: Get file info
console.log('\n📁 Test 1: Getting file info...');
fetch(`/assets/blog/${encodeURIComponent(testFolder)}/raw.html`, { method: 'HEAD' })
  .then(response => {
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    console.log('Content-Length:', response.headers.get('content-length'));
    console.log('Last-Modified:', response.headers.get('last-modified'));
  })
  .catch(error => console.error('Error:', error));

// Test 2: Read file content
console.log('\n📖 Test 2: Reading file content...');
fetch(`/assets/blog/${encodeURIComponent(testFolder)}/raw.html`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(content => {
    console.log('✅ File read successfully!');
    console.log('Content length:', content.length, 'characters');
    console.log('Content preview:', content.substring(0, 300) + '...');
  })
  .catch(error => console.error('❌ Error reading file:', error));

// Test 3: Check if Picture1.png exists
console.log('\n🖼️ Test 3: Checking Picture1.png...');
fetch(`/assets/blog/${encodeURIComponent(testFolder)}/Picture1.png`, { method: 'HEAD' })
  .then(response => {
    console.log('Picture1.png exists:', response.ok);
    if (response.ok) {
      console.log('Picture1.png size:', response.headers.get('content-length'), 'bytes');
    }
  })
  .catch(error => console.error('Error checking Picture1.png:', error));

// Test 4: List all available folders
console.log('\n📂 Test 4: Available blog folders...');
const availableFolders = [
  '4-tips-tao-diem-nhan-bep-sang-trong',
  '12 xu hướng',
  '21+ mẫu',
  '6+ tip',
  'khám phá',
  'nhà đẹp',
  'phối màu',
  'top 7'
];

console.log('Available folders:', availableFolders);

// Test 5: Test multiple folders
console.log('\n🔍 Test 5: Testing multiple folders...');
availableFolders.forEach(folder => {
  fetch(`/assets/blog/${encodeURIComponent(folder)}/raw.html`, { method: 'HEAD' })
    .then(response => {
      console.log(`${folder}: ${response.ok ? '✅' : '❌'} (${response.status})`);
    })
    .catch(error => {
      console.log(`${folder}: ❌ Error`);
    });
});

console.log('\n✨ File reading test completed! Check the results above.'); 