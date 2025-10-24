#!/usr/bin/env node

/**
 * Connection Pool Test Script
 * 
 * This script tests the database connection pool fixes by:
 * 1. Making multiple concurrent requests to the project categories endpoint
 * 2. Monitoring connection pool status
 * 3. Checking for timeout errors
 */

const http = require('http');

const API_BASE_URL = 'http://localhost:3002';
const CONCURRENT_REQUESTS = 50; // Number of concurrent requests to simulate load
const REQUEST_DELAY = 100; // Delay between batches of requests

// Function to make HTTP request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData,
            responseTime: Date.now() - startTime
          });
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    const startTime = Date.now();
  });
}

// Function to check pool status
async function checkPoolStatus() {
  try {
    const result = await makeRequest(`${API_BASE_URL}/pool-status`);
    return result.data;
  } catch (error) {
    console.error('❌ Failed to check pool status:', error.message);
    return null;
  }
}

// Function to test project categories endpoint
async function testProjectCategories() {
  try {
    const result = await makeRequest(`${API_BASE_URL}/api/v1/projectpage/project-categories`);
    return result;
  } catch (error) {
    return {
      error: error.message,
      status: 'ERROR'
    };
  }
}

// Main test function
async function runConnectionPoolTest() {
  console.log('🚀 Starting Connection Pool Test');
  console.log('=====================================');

  // Check initial pool status
  console.log('\n📊 Initial Pool Status:');
  const initialStatus = await checkPoolStatus();
  if (initialStatus) {
    console.log(`   Used: ${initialStatus.used}`);
    console.log(`   Free: ${initialStatus.free}`);
    console.log(`   Total: ${initialStatus.total}`);
    console.log(`   Pending Acquires: ${initialStatus.pendingAcquires}`);
  }

  // Make concurrent requests
  console.log(`\n🔄 Making ${CONCURRENT_REQUESTS} concurrent requests...`);
  const startTime = Date.now();
  
  const promises = [];
  for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
    promises.push(testProjectCategories());
  }

  const results = await Promise.allSettled(promises);
  const endTime = Date.now();
  const totalTime = endTime - startTime;

  // Analyze results
  let successCount = 0;
  let errorCount = 0;
  let timeoutCount = 0;
  const errors = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      if (result.value.error) {
        errorCount++;
        errors.push(`Request ${index + 1}: ${result.value.error}`);
        if (result.value.error.includes('timeout') || result.value.error.includes('Timeout')) {
          timeoutCount++;
        }
      } else {
        successCount++;
      }
    } else {
      errorCount++;
      errors.push(`Request ${index + 1}: ${result.reason.message}`);
      if (result.reason.message.includes('timeout') || result.reason.message.includes('Timeout')) {
        timeoutCount++;
      }
    }
  });

  // Check final pool status
  console.log('\n📊 Final Pool Status:');
  const finalStatus = await checkPoolStatus();
  if (finalStatus) {
    console.log(`   Used: ${finalStatus.used}`);
    console.log(`   Free: ${finalStatus.free}`);
    console.log(`   Total: ${finalStatus.total}`);
    console.log(`   Pending Acquires: ${finalStatus.pendingAcquires}`);
  }

  // Print results
  console.log('\n📈 Test Results:');
  console.log('=====================================');
  console.log(`✅ Successful requests: ${successCount}`);
  console.log(`❌ Failed requests: ${errorCount}`);
  console.log(`⏱️  Timeout errors: ${timeoutCount}`);
  console.log(`⏰ Total time: ${totalTime}ms`);
  console.log(`📊 Average time per request: ${(totalTime / CONCURRENT_REQUESTS).toFixed(2)}ms`);

  if (errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    errors.slice(0, 10).forEach(error => console.log(`   ${error}`));
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more errors`);
    }
  }

  // Check health endpoint
  console.log('\n🏥 Health Check:');
  try {
    const healthResult = await makeRequest(`${API_BASE_URL}/health`);
    console.log(`   Status: ${healthResult.data.status}`);
    console.log(`   Database Healthy: ${healthResult.data.database?.healthy ? '✅' : '❌'}`);
    if (healthResult.data.database?.status) {
      console.log(`   DB Response Time: ${healthResult.data.database.status.responseTime}`);
    }
  } catch (error) {
    console.log(`   Health check failed: ${error.message}`);
  }

  // Summary
  console.log('\n🎯 Summary:');
  if (timeoutCount === 0 && errorCount < CONCURRENT_REQUESTS * 0.1) {
    console.log('✅ Connection pool appears to be working correctly!');
    console.log('   No timeout errors detected.');
  } else if (timeoutCount > 0) {
    console.log('⚠️  Connection pool issues detected:');
    console.log(`   ${timeoutCount} timeout errors occurred.`);
    console.log('   Consider checking database connection limits and pool configuration.');
  } else {
    console.log('⚠️  Some errors occurred but no timeout issues detected.');
    console.log('   This might be due to other factors (network, server load, etc.).');
  }

  console.log('\n🔍 To monitor connection pool in real-time:');
  console.log(`   curl ${API_BASE_URL}/pool-status`);
  console.log(`   curl ${API_BASE_URL}/health`);
}

// Run the test
runConnectionPoolTest().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
