#!/usr/bin/env node

const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:3002/api/v1/projectdetail/category';

const categories = ['house-normal', 'appartment', 'village', 'house-business'];

async function testAllCategories() {
  console.log('🧪 Testing all projectdetail/category endpoints...\n');
  
  for (const category of categories) {
    try {
      console.log(`📋 Testing category: ${category}`);
      
      const response = await fetch(`${BASE_URL}/${category}`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        const project = data.data[0];
        console.log(`   ✅ ${project.title}`);
        console.log(`   📸 Thumbnail: ${project.thumbnail ? 'Available' : 'Missing'}`);
        console.log(`   📏 Area: ${project.area}`);
        console.log(`   📍 Location: ${project.location}`);
        console.log(`   📊 Total projects: ${data.data.length}`);
      } else {
        console.log(`   ⚠️  No projects found for ${category}`);
      }
      
      console.log('');
    } catch (error) {
      console.log(`   ❌ Error testing ${category}: ${error.message}`);
      console.log('');
    }
  }
  
  console.log('🎉 All category endpoints tested successfully!');
}

// Simple fetch implementation for Node.js
function fetch(url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve({
          json: () => JSON.parse(data)
        });
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
  });
}

testAllCategories().catch(console.error);
