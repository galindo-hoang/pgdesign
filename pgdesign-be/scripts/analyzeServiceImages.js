#!/usr/bin/env node

// Script to analyze all service files and find image references
const fs = require('fs');
const path = require('path');

// Service files to analyze
const SERVICE_FILES = [
  '../../src/services/additionalProjectData.ts',
  '../../src/services/blogDetailService.ts', 
  '../../src/services/blogPageService.ts',
  '../../src/services/capabilitiesService.ts',
  '../../src/services/constructionProcessService.ts',
  '../../src/services/homePageService.ts',
  '../../src/services/introPageService.ts',
  '../../src/services/profilePageService.ts',
  '../../src/services/projectCategoryService.ts',
  '../../src/services/projectDetailService.ts',
  '../../src/services/servicePageService.ts',
  '../../src/services/technicalAdvantagesService.ts'
];

async function analyzeServiceFiles() {
  console.log('🔍 Analyzing service files for image references...\n');
  
  const imageReferences = {
    imports: [],
    paths: [],
    base64: [],
    urls: []
  };
  
  for (const filePath of SERVICE_FILES) {
    try {
      const fullPath = path.resolve(__dirname, filePath);
      if (fs.existsSync(fullPath)) {
        console.log(`📄 Analyzing: ${filePath}`);
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Find image imports
        const importMatches = content.match(/import\s+.*?from\s+['"](.*?\.(png|jpg|jpeg|gif|webp|svg))['"]/g);
        if (importMatches) {
          importMatches.forEach(match => {
            const urlMatch = match.match(/['"](.*?)['"]/);
            if (urlMatch) {
              imageReferences.imports.push({
                file: filePath,
                import: match,
                path: urlMatch[1]
              });
            }
          });
        }
        
        // Find image paths in strings
        const pathMatches = content.match(/['"](.*?\.(png|jpg|jpeg|gif|webp|svg))['"]/g);
        if (pathMatches) {
          pathMatches.forEach(match => {
            const urlMatch = match.match(/['"](.*?)['"]/);
            if (urlMatch && !urlMatch[1].startsWith('http')) {
              imageReferences.paths.push({
                file: filePath,
                path: urlMatch[1]
              });
            }
          });
        }
        
        // Find base64 images
        const base64Matches = content.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/g);
        if (base64Matches) {
          base64Matches.forEach(match => {
            imageReferences.base64.push({
              file: filePath,
              base64: match.substring(0, 50) + '...' // Truncate for display
            });
          });
        }
        
        // Find HTTP URLs
        const urlMatches = content.match(/https?:\/\/[^\s'"]+\.(png|jpg|jpeg|gif|webp|svg)/g);
        if (urlMatches) {
          urlMatches.forEach(match => {
            imageReferences.urls.push({
              file: filePath,
              url: match
            });
          });
        }
        
      } else {
        console.log(`⚠️  File not found: ${filePath}`);
      }
    } catch (error) {
      console.log(`❌ Error analyzing ${filePath}:`, error.message);
    }
  }
  
  console.log('\n📊 Analysis Results:');
  console.log(`   Image imports: ${imageReferences.imports.length}`);
  console.log(`   Image paths: ${imageReferences.paths.length}`);
  console.log(`   Base64 images: ${imageReferences.base64.length}`);
  console.log(`   HTTP URLs: ${imageReferences.urls.length}`);
  
  // Show details
  if (imageReferences.imports.length > 0) {
    console.log('\n📁 Image Imports:');
    imageReferences.imports.forEach(ref => {
      console.log(`   ${ref.file}: ${ref.path}`);
    });
  }
  
  if (imageReferences.paths.length > 0) {
    console.log('\n📂 Image Paths:');
    imageReferences.paths.forEach(ref => {
      console.log(`   ${ref.file}: ${ref.path}`);
    });
  }
  
  if (imageReferences.base64.length > 0) {
    console.log('\n🖼️ Base64 Images:');
    imageReferences.base64.forEach(ref => {
      console.log(`   ${ref.file}: ${ref.base64}`);
    });
  }
  
  if (imageReferences.urls.length > 0) {
    console.log('\n🌐 HTTP URLs:');
    imageReferences.urls.forEach(ref => {
      console.log(`   ${ref.file}: ${ref.url}`);
    });
  }
  
  // Save results to file
  fs.writeFileSync('image-analysis-results.json', JSON.stringify(imageReferences, null, 2));
  console.log('\n💾 Results saved to: image-analysis-results.json');
  
  return imageReferences;
}

analyzeServiceFiles().catch(console.error);
