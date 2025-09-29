const fs = require('fs');
const path = require('path');

function debugHouseBusiness() {
  try {
    const tsFilePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
    const tsContent = fs.readFileSync(tsFilePath, 'utf8');
    
    console.log('🔍 Debugging house-business section...\n');
    
    // Test different patterns
    const patterns = [
      `"house-business":\\s*\\[([\\s\\S]*?)\\](?=\\s*}\\s*;)`,
      `["']?house-business["']?:\\s*\\[([\\s\\S]*?)\\](?=\\s*}\\s*;)`,
      `"house-business":\\s*\\[([\\s\\S]*?)\\]`,
      `house-business.*?:\\s*\\[([\\s\\S]*?)\\](?=\\s*})`
    ];
    
    patterns.forEach((pattern, index) => {
      console.log(`📋 Testing pattern ${index + 1}: ${pattern}`);
      const regex = new RegExp(pattern, 'g');
      const match = regex.exec(tsContent);
      
      if (match) {
        console.log(`   ✅ Found match! Content length: ${match[1].length} chars`);
        console.log(`   📄 First 200 chars: ${match[1].substring(0, 200)}...`);
      } else {
        console.log(`   ❌ No match found`);
      }
      console.log('');
    });
    
    // Check if house-business exists at all
    const houseBizIndex = tsContent.indexOf('"house-business":');
    console.log(`📍 "house-business": found at index: ${houseBizIndex}`);
    
    if (houseBizIndex !== -1) {
      const contextStart = Math.max(0, houseBizIndex - 100);
      const contextEnd = Math.min(tsContent.length, houseBizIndex + 500);
      const context = tsContent.substring(contextStart, contextEnd);
      console.log(`📄 Context around house-business:`);
      console.log(context);
    }
    
    // Check what comes after house-business section
    const afterHouseBiz = tsContent.indexOf(']', houseBizIndex);
    if (afterHouseBiz !== -1) {
      const afterContext = tsContent.substring(afterHouseBiz, afterHouseBiz + 200);
      console.log(`\\n📄 After house-business array:`);
      console.log(afterContext);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugHouseBusiness();
