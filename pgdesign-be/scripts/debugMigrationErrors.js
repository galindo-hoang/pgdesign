const fs = require('fs');
const path = require('path');

/**
 * Debug migration errors by analyzing additionalProjectData parsing
 */
function debugMigrationErrors() {
  try {
    const tsFilePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
    const tsContent = fs.readFileSync(tsFilePath, 'utf8');
    
    console.log('🔍 Debugging migration errors...\n');
    
    // Count total projects in file
    const projectMatches = tsContent.match(/{\s*id:\s*\d+,/g);
    const totalProjectsInFile = projectMatches ? projectMatches.length : 0;
    
    console.log(`📊 Total projects found in additionalProjectData.ts: ${totalProjectsInFile}`);
    
    // Try to parse each project and identify issues
    const projectSections = tsContent.split(/{\s*id:\s*\d+,/).slice(1);
    console.log(`📋 Project sections to parse: ${projectSections.length}\n`);
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    projectSections.forEach((section, index) => {
      try {
        const fullSection = '{ id: ' + section;
        
        // Extract basic required fields
        const idMatch = fullSection.match(/id:\s*(\d+)/);
        const projectIdMatch = fullSection.match(/projectId:\s*"([^"]+)"/);
        const titleMatch = fullSection.match(/title:\s*"([^"]+)"/);
        
        if (!idMatch) {
          errors.push(`Project ${index + 1}: Missing or invalid ID`);
          errorCount++;
          return;
        }
        
        if (!projectIdMatch) {
          errors.push(`Project ${index + 1} (ID: ${idMatch[1]}): Missing projectId`);
          errorCount++;
          return;
        }
        
        if (!titleMatch) {
          errors.push(`Project ${index + 1} (ID: ${idMatch[1]}, ProjectID: ${projectIdMatch[1]}): Missing title`);
          errorCount++;
          return;
        }
        
        // Check for malformed structure
        const categoryMatch = fullSection.match(/category:\s*"([^"]*)"/);
        const projectImagesMatch = fullSection.match(/projectImages:\s*\[([\s\S]*?)\]/);
        
        if (!categoryMatch) {
          errors.push(`Project ${index + 1} (${projectIdMatch[1]}): Missing category`);
          errorCount++;
          return;
        }
        
        // Check if section ends properly
        if (!fullSection.includes('},') && !fullSection.includes('}]')) {
          errors.push(`Project ${index + 1} (${projectIdMatch[1]}): Malformed structure - missing closing brace`);
          errorCount++;
          return;
        }
        
        successCount++;
        console.log(`✅ Project ${index + 1}: ${projectIdMatch[1]} - ${titleMatch[1]}`);
        
      } catch (error) {
        errors.push(`Project ${index + 1}: Parse error - ${error.message}`);
        errorCount++;
      }
    });
    
    console.log(`\n📊 Parsing Summary:`);
    console.log(`   • Successfully parsed: ${successCount}`);
    console.log(`   • Errors: ${errorCount}`);
    console.log(`   • Total sections: ${projectSections.length}`);
    
    if (errors.length > 0) {
      console.log(`\n❌ Detailed Errors:`);
      errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }
    
    // Check for specific patterns that might cause issues
    console.log(`\n🔍 Pattern Analysis:`);
    
    // Check for incomplete projects
    const incompleteProjects = tsContent.match(/{\s*id:\s*\d+,[^}]*$/gm);
    if (incompleteProjects) {
      console.log(`   • Found ${incompleteProjects.length} potentially incomplete project definitions`);
    }
    
    // Check for missing commas
    const missingCommas = tsContent.match(/"\s*\n\s*[a-zA-Z]/g);
    if (missingCommas) {
      console.log(`   • Found ${missingCommas.length} potential missing commas`);
    }
    
    // Check for malformed arrays
    const malformedArrays = tsContent.match(/\[[^\]]*$/gm);
    if (malformedArrays) {
      console.log(`   • Found ${malformedArrays.length} potentially malformed arrays`);
    }
    
    console.log(`\n💡 Possible reasons for 17 errors:`);
    console.log(`   1. Some projects may have malformed JSON structure`);
    console.log(`   2. Missing required fields (id, projectId, title)`);
    console.log(`   3. Incomplete project definitions`);
    console.log(`   4. File parsing issues with regex patterns`);
    console.log(`   5. Projects may be cut off or incomplete in the file`);
    
  } catch (error) {
    console.error('❌ Error debugging migration:', error);
  }
}

debugMigrationErrors();
