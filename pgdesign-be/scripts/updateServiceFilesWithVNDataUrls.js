#!/usr/bin/env node

// Script to update service files with VNData S3 URLs
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const S3_BASE_URL = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/';

// Load uploaded files list
const uploadedFiles = JSON.parse(fs.readFileSync('uploaded-files.json', 'utf8'));

// Service files to update
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

// Function to escape regex special characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Function to map old path to new S3 URL
function mapPathToS3Url(oldPath) {
  // Remove leading ../ or /
  let cleanPath = oldPath.replace(/^\.\.\//, '').replace(/^\//, '');
  
  // Map to new S3 structure
  let newPath = cleanPath;
  
  if (cleanPath.includes('assets/images/homepage/')) {
    newPath = cleanPath.replace('assets/images/homepage/', 'homepage/');
  } else if (cleanPath.includes('assets/images/projectpage/')) {
    newPath = cleanPath.replace('assets/images/projectpage/', 'projectpage/');
  } else if (cleanPath.includes('assets/images/profilepage/')) {
    newPath = cleanPath.replace('assets/images/profilepage/', 'profilepage/');
  } else if (cleanPath.includes('assets/images/intropage/')) {
    newPath = cleanPath.replace('assets/images/intropage/', 'intropage/pg-employee/');
  } else if (cleanPath.includes('assets/images/servicepage/')) {
    newPath = cleanPath.replace('assets/images/servicepage/', 'servicepage/');
  } else if (cleanPath.includes('assets/icons/')) {
    newPath = cleanPath.replace('assets/icons/', 'icons/');
  } else if (cleanPath.includes('assets/images/')) {
    newPath = cleanPath.replace('assets/images/', 'images/');
  } else if (cleanPath.includes('assets/blog/')) {
    newPath = cleanPath.replace('assets/blog/', 'blogpage/');
  } else if (cleanPath.includes('assets/appartment/')) {
    newPath = cleanPath.replace('assets/appartment/', 'projectpage/appartment/');
  } else if (cleanPath.includes('assets/house-normal/')) {
    newPath = cleanPath.replace('assets/house-normal/', 'projectpage/house-normal/');
  } else if (cleanPath.includes('assets/village/')) {
    newPath = cleanPath.replace('assets/village/', 'projectpage/village/');
  } else if (cleanPath.includes('assets/house-business/')) {
    newPath = cleanPath.replace('assets/house-business/', 'projectpage/house-business/');
  } else if (cleanPath.includes('PG NHÂN SỰ/')) {
    newPath = cleanPath.replace('assets/images/PG NHÂN SỰ/', 'intropage/pg-employee/');
  }
  
  return `${S3_BASE_URL}${newPath}`;
}

async function updateServiceFiles() {
  console.log('🚀 Starting service files update with VNData URLs...\n');
  
  try {
    let filesUpdatedCount = 0;
    let totalReplacements = 0;
    
    console.log('🔄 Updating service files with VNData URLs...');
    
    for (const filePathRelative of SERVICE_FILES) {
      const fullPath = path.join(__dirname, filePathRelative);
      console.log(`\n📄 Updating: ${filePathRelative}`);
      
      if (!fs.existsSync(fullPath)) {
        console.log(`   ⚠️  File not found: ${fullPath}, skipping.`);
        continue;
      }
      
      let content = fs.readFileSync(fullPath, 'utf8');
      let fileReplacements = 0;
      
      // Update ../assets/ paths
      const assetImportRegex = /import\s+(\w+)\s+from\s+['"](\.\.\/assets\/[^'"]+)['"]/g;
      let match;
      while ((match = assetImportRegex.exec(content)) !== null) {
        const oldPath = match[2];
        const newUrl = mapPathToS3Url(oldPath);
        
        // Replace the import with the S3 URL
        const newImport = `const ${match[1]} = '${newUrl}';`;
        content = content.replace(match[0], newImport);
        
        console.log(`   🔄 ${oldPath} → ${newUrl}`);
        fileReplacements++;
      }
      
      // Update /assets/ paths in strings
      const assetPathRegex = /['"](\/assets\/[^'"]+)['"]/g;
      while ((match = assetPathRegex.exec(content)) !== null) {
        const oldPath = match[1];
        const newUrl = mapPathToS3Url(oldPath);
        
        content = content.replace(match[0], `'${newUrl}'`);
        
        console.log(`   🔄 ${oldPath} → ${newUrl}`);
        fileReplacements++;
      }
      
      if (fileReplacements > 0) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`   ✅ Updated ${fileReplacements} URLs`);
        filesUpdatedCount++;
        totalReplacements += fileReplacements;
      } else {
        console.log(`   ⏭️  No URLs to update`);
      }
    }
    
    console.log('\n📊 Service Files Update Summary:');
    console.log(`   Files updated: ${filesUpdatedCount}`);
    console.log(`   Total URL replacements: ${totalReplacements}`);
    
    console.log('\n✅ Service files updated successfully!');
    console.log('\n🎉 Service files update completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Test website functionality');
    console.log('   2. Verify all images are accessible');
    console.log('   3. Check for any broken image links');
    
  } catch (error) {
    console.error('❌ Error updating service files:', error);
    process.exit(1);
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting service files update with VNData URLs...\n');
  
  try {
    await updateServiceFiles();
    
  } catch (error) {
    console.error('❌ Update failed:', error);
    process.exit(1);
  }
}

main();
