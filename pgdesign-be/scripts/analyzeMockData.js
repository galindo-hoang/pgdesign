#!/usr/bin/env node

// Script to analyze mock data in src/services and identify migration targets
const fs = require('fs');
const path = require('path');

const SERVICES_DIR = '/Users/huy.hoang/Desktop/pgdesign/src/services';

async function analyzeMockData() {
  console.log('🔍 Analyzing Mock Data in src/services...\n');
  
  const migrationTargets = [];
  
  try {
    // Read all service files
    const serviceFiles = fs.readdirSync(SERVICES_DIR)
      .filter(file => file.endsWith('.ts') && !file.includes('.md'))
      .map(file => path.join(SERVICES_DIR, file));
    
    console.log(`📁 Found ${serviceFiles.length} service files:`);
    serviceFiles.forEach(file => console.log(`   - ${path.basename(file)}`));
    console.log('');
    
    for (const filePath of serviceFiles) {
      const fileName = path.basename(filePath);
      console.log(`📋 Analyzing: ${fileName}`);
      
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Find import statements with local assets
      const importMatches = content.match(/import\s+[\w\s,{}]+\s+from\s+["']\.\.\/assets\/([^"']+)["']/g);
      
      if (importMatches) {
        console.log(`   📦 Found ${importMatches.length} asset imports:`);
        
        const assets = importMatches.map(match => {
          const assetPath = match.match(/["']\.\.\/assets\/([^"']+)["']/)?.[1];
          return assetPath;
        }).filter(Boolean);
        
        assets.forEach(asset => {
          console.log(`      - ${asset}`);
          migrationTargets.push({
            file: fileName,
            type: 'import',
            path: asset,
            fullPath: `/Users/huy.hoang/Desktop/pgdesign/src/assets/${asset}`
          });
        });
      }
      
      // Find local asset paths in strings
      const pathMatches = content.match(/["']\/assets\/([^"']+)["']/g);
      
      if (pathMatches) {
        console.log(`   🔗 Found ${pathMatches.length} asset paths:`);
        
        const paths = pathMatches.map(match => {
          const assetPath = match.match(/["']\/assets\/([^"']+)["']/)?.[1];
          return assetPath;
        }).filter(Boolean);
        
        paths.forEach(asset => {
          console.log(`      - ${asset}`);
          migrationTargets.push({
            file: fileName,
            type: 'path',
            path: asset,
            fullPath: `/Users/huy.hoang/Desktop/pgdesign/public/assets/${asset}`
          });
        });
      }
      
      // Find base64 data
      const base64Matches = content.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/g);
      
      if (base64Matches) {
        console.log(`   📊 Found ${base64Matches.length} base64 images:`);
        
        base64Matches.forEach((match, index) => {
          const size = match.length;
          console.log(`      - Base64 image ${index + 1} (${size} chars)`);
          migrationTargets.push({
            file: fileName,
            type: 'base64',
            path: `base64-image-${index + 1}`,
            fullPath: null,
            data: match,
            size: size
          });
        });
      }
      
      if (!importMatches && !pathMatches && !base64Matches) {
        console.log(`   ⏭️  No assets found`);
      }
      
      console.log('');
    }
    
    // Summary
    console.log('📊 Migration Analysis Summary:');
    console.log(`   Total migration targets: ${migrationTargets.length}`);
    
    const byType = migrationTargets.reduce((acc, target) => {
      acc[target.type] = (acc[target.type] || 0) + 1;
      return acc;
    }, {});
    
    console.log('   By type:');
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`      ${type}: ${count}`);
    });
    
    // Check file existence
    console.log('\n🔍 Checking file existence:');
    let existingFiles = 0;
    let missingFiles = 0;
    
    for (const target of migrationTargets) {
      if (target.type === 'base64') continue;
      
      if (fs.existsSync(target.fullPath)) {
        existingFiles++;
        const stats = fs.statSync(target.fullPath);
        console.log(`   ✅ ${target.path} (${(stats.size / 1024).toFixed(1)}KB)`);
      } else {
        missingFiles++;
        console.log(`   ❌ ${target.path} (missing)`);
      }
    }
    
    console.log(`\n📈 File Status:`);
    console.log(`   Existing files: ${existingFiles}`);
    console.log(`   Missing files: ${missingFiles}`);
    
    // Generate migration plan
    console.log('\n🎯 Migration Plan:');
    console.log('   1. Upload existing asset files to VNData S3');
    console.log('   2. Convert base64 data to files and upload');
    console.log('   3. Update service files with S3 URLs');
    console.log('   4. Update database if needed');
    
    // Save analysis results
    const analysisFile = '/Users/huy.hoang/Desktop/pgdesign/pgdesign-be/scripts/mock-data-analysis.json';
    fs.writeFileSync(analysisFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalTargets: migrationTargets.length,
      byType: byType,
      targets: migrationTargets,
      fileStatus: {
        existing: existingFiles,
        missing: missingFiles
      }
    }, null, 2));
    
    console.log(`\n💾 Analysis saved to: ${analysisFile}`);
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
  }
}

// Run analysis
if (require.main === module) {
  analyzeMockData()
    .then(() => {
      console.log('\n✅ Analysis completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Analysis failed:', error);
      process.exit(1);
    });
}

module.exports = { analyzeMockData };
