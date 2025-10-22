#!/usr/bin/env node

// Script to update service files with new VNData URLs
const fs = require('fs');
const path = require('path');

// Load URL mappings
const urlMappings = JSON.parse(fs.readFileSync('url-mappings.json', 'utf8'));

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

async function updateServiceFiles() {
  console.log('🔄 Updating service files with new VNData URLs...\n');
  
  let totalFilesUpdated = 0;
  let totalReplacements = 0;
  
  for (const filePath of SERVICE_FILES) {
    try {
      const fullPath = path.resolve(__dirname, filePath);
      if (fs.existsSync(fullPath)) {
        console.log(`📄 Updating: ${filePath}`);
        
        let content = fs.readFileSync(fullPath, 'utf8');
        let fileReplacements = 0;
        
        // Apply URL mappings
        for (const [oldUrl, newUrl] of Object.entries(urlMappings)) {
          const regex = new RegExp(escapeRegExp(oldUrl), 'g');
          const matches = content.match(regex);
          
          if (matches) {
            content = content.replace(regex, newUrl);
            fileReplacements += matches.length;
            console.log(`   🔄 ${oldUrl} → ${newUrl} (${matches.length} times)`);
          }
        }
        
        if (fileReplacements > 0) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`   ✅ Updated ${fileReplacements} URLs`);
          totalFilesUpdated++;
          totalReplacements += fileReplacements;
        } else {
          console.log(`   ⏭️  No URLs to update`);
        }
        
      } else {
        console.log(`⚠️  File not found: ${filePath}`);
      }
    } catch (error) {
      console.log(`❌ Error updating ${filePath}:`, error.message);
    }
  }
  
  console.log(`\n📊 Service Files Update Summary:`);
  console.log(`   Files updated: ${totalFilesUpdated}`);
  console.log(`   Total URL replacements: ${totalReplacements}`);
  
  console.log('\n✅ Service files updated successfully!');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Main execution
async function main() {
  console.log('🚀 Starting service files update...\n');
  
  try {
    await updateServiceFiles();
    
    console.log('\n🎉 Service files update completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Test website functionality');
    console.log('   2. Verify all images are accessible');
    console.log('   3. Check for any broken image links');
    
  } catch (error) {
    console.error('❌ Update failed:', error);
    process.exit(1);
  }
}

main();
