const fs = require('fs');
const path = require('path');

/**
 * Extract project data from the TypeScript file
 * This is a simple parser to extract the data object
 */
function extractProjectDataFromTS() {
  try {
    const tsFilePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
    const tsContent = fs.readFileSync(tsFilePath, 'utf8');
    
    console.log('📖 Parsing additionalProjectData.ts...');
    
    // Find the data object start
    const dataStart = tsContent.indexOf('export const additionalProjectData: {');
    if (dataStart === -1) {
      throw new Error('Could not find additionalProjectData export');
    }
    
    // Find the opening brace of the data object
    const openBraceIndex = tsContent.indexOf('} = {', dataStart);
    if (openBraceIndex === -1) {
      throw new Error('Could not find data object start');
    }
    
    const dataObjectStart = openBraceIndex + 4; // After '} = {'
    
    // Find the matching closing brace
    let braceCount = 1;
    let currentIndex = dataObjectStart + 1;
    let dataObjectEnd = -1;
    
    while (currentIndex < tsContent.length && braceCount > 0) {
      const char = tsContent[currentIndex];
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          dataObjectEnd = currentIndex;
          break;
        }
      }
      currentIndex++;
    }
    
    if (dataObjectEnd === -1) {
      throw new Error('Could not find data object end');
    }
    
    // Extract the data object string
    const dataObjectString = tsContent.substring(dataObjectStart, dataObjectEnd + 1);
    
    // Clean up the string to make it valid JSON-like
    let cleanedString = dataObjectString
      // Remove TypeScript type annotations and comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*$/gm, '') // Remove line comments
      // Fix property names (add quotes)
      .replace(/(\w+):/g, '"$1":')
      // Fix string values that might have unescaped quotes
      .replace(/"/g, '\\"')
      .replace(/\\"/g, '"')
      // Fix the property names again after quote escaping
      .replace(/"(\w+)":/g, '"$1":');
    
    // This is complex to parse perfectly, so let's create a simpler approach
    // We'll count the projects in each category by counting the opening braces
    
    const categories = ['appartment', 'house-normal', 'village', 'house-business'];
    const projectCounts = {};
    
    categories.forEach(category => {
      const categoryStart = tsContent.indexOf(`${category}: [`);
      if (categoryStart !== -1) {
        const categorySection = tsContent.substring(categoryStart);
        const categoryEnd = categorySection.indexOf('],');
        const categoryContent = categorySection.substring(0, categoryEnd);
        
        // Count projects by counting opening braces for objects
        const projectMatches = categoryContent.match(/{\s*id:/g);
        projectCounts[category] = projectMatches ? projectMatches.length : 0;
      } else {
        projectCounts[category] = 0;
      }
    });
    
    console.log('📊 Project counts by category:');
    Object.entries(projectCounts).forEach(([category, count]) => {
      console.log(`   • ${category}: ${count} projects`);
    });
    
    const totalProjects = Object.values(projectCounts).reduce((sum, count) => sum + count, 0);
    console.log(`   • Total: ${totalProjects} projects`);
    
    return {
      success: true,
      projectCounts,
      totalProjects,
      filePath: tsFilePath
    };
    
  } catch (error) {
    console.error('❌ Error extracting project data:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the extraction
const result = extractProjectDataFromTS();
if (result.success) {
  console.log('✅ Successfully analyzed additionalProjectData.ts');
  console.log(`📁 File: ${result.filePath}`);
  console.log(`📊 Total projects found: ${result.totalProjects}`);
} else {
  console.log('❌ Failed to analyze file:', result.error);
}

