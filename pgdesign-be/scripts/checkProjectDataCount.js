#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the additionalProjectData file
const filePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Count projects by category using regex
const categories = ['appartment', 'house-normal', 'village', 'house-business'];
let totalProjects = 0;

console.log('🔍 Counting projects in additionalProjectData...\n');

categories.forEach(category => {
  // Count occurrences of "id:" in each category section
  const categoryRegex = new RegExp(`${category}:\\s*\\[([\\s\\S]*?)\\]`, 'g');
  const match = categoryRegex.exec(content);
  
  if (match) {
    const categoryContent = match[1];
    // Count "id:" occurrences (each project has an id)
    const projectCount = (categoryContent.match(/id:\s*\d+/g) || []).length;
    console.log(`📋 ${category}: ${projectCount} projects`);
    totalProjects += projectCount;
  } else {
    console.log(`📋 ${category}: 0 projects`);
  }
});

console.log(`\n📊 Total projects in additionalProjectData: ${totalProjects}`);

// Check current database count
console.log('\n🔍 Checking current database...');
const { exec } = require('child_process');

exec('curl -s "http://localhost:3002/api/v1/projectdetail" | jq ".data | length"', (error, stdout, stderr) => {
  if (error) {
    console.log('❌ Error checking database:', error.message);
    return;
  }
  
  const dbCount = parseInt(stdout.trim());
  console.log(`📊 Current projects in database: ${dbCount}`);
  
  if (dbCount < totalProjects) {
    console.log(`\n⚠️  Database is missing ${totalProjects - dbCount} projects!`);
    console.log('💡 Need to fill database with additionalProjectData');
  } else {
    console.log('\n✅ Database has sufficient project data');
  }
});
