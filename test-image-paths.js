const fs = require('fs');
const path = require('path');

// Test image paths
const testPaths = [
  '/assets/appartment/PICITY Q12/picity-q12-01.jpg',
  '/assets/house-normal/CHỊ TÚ - LONG AN/nha-pho-long-an-01.png',
  '/assets/village/MOLAR VILLA - QUẬN 9/molar-villa-01.jpg'
];

console.log('🖼️  Testing Image Paths');
console.log('========================');

testPaths.forEach(testPath => {
  const fullPath = path.join(__dirname, 'public', testPath);
  const exists = fs.existsSync(fullPath);
  
  console.log(`${exists ? '✅' : '❌'} ${testPath}`);
  if (exists) {
    const stats = fs.statSync(fullPath);
    console.log(`   Size: ${(stats.size / 1024).toFixed(1)} KB`);
  } else {
    console.log(`   File not found: ${fullPath}`);
  }
});

console.log('\n📁 Checking folder structure:');
console.log('=============================');

const categories = ['appartment', 'house-normal', 'village'];
categories.forEach(category => {
  const categoryPath = path.join(__dirname, 'public', 'assets', category);
  if (fs.existsSync(categoryPath)) {
    const projects = fs.readdirSync(categoryPath);
    console.log(`✅ ${category}: ${projects.length} project folders`);
    projects.forEach(project => {
      const projectPath = path.join(categoryPath, project);
      const images = fs.readdirSync(projectPath).filter(file => 
        /\.(jpg|jpeg|png|gif)$/i.test(file)
      );
      console.log(`   📁 ${project}: ${images.length} images`);
    });
  } else {
    console.log(`❌ ${category}: folder not found`);
  }
});

console.log('\n🎯 Image Path Format:');
console.log('=====================');
console.log('✅ /assets/[category]/[project-folder]/[image-name]');
console.log('✅ Example: /assets/appartment/PICITY Q12/picity-q12-01.jpg');
console.log('✅ These paths should work in your React app'); 