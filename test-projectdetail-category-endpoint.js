#!/usr/bin/env node

/**
 * ProjectDetail Category Endpoint Test Script
 * 
 * This script specifically tests the endpoint that was causing the connection pool timeout:
 * GET /api/v1/projectdetail/category/appartment
 */

const http = require('http');

const API_BASE_URL = 'http://localhost:3002';
const ENDPOINT = '/api/v1/projectdetail/category/appartment';
const CONCURRENT_REQUESTS = 30; // Number of concurrent requests to simulate load

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

// Function to test the specific endpoint
async function testCategoryEndpoint() {
  try {
    const result = await makeRequest(`${API_BASE_URL}${ENDPOINT}`);
    return result;
  } catch (error) {
    return {
      error: error.message,
      status: 'ERROR'
    };
  }
}

// Main test function
async function runCategoryEndpointTest() {
  console.log('🚀 Testing ProjectDetail Category Endpoint');
  console.log('==========================================');
  console.log(`📍 Endpoint: ${API_BASE_URL}${ENDPOINT}`);
  console.log(`🔄 Concurrent requests: ${CONCURRENT_REQUESTS}`);

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
  console.log(`\n🔄 Making ${CONCURRENT_REQUESTS} concurrent requests to category endpoint...`);
  const startTime = Date.now();
  
  const promises = [];
  for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
    promises.push(testCategoryEndpoint());
  }

  const results = await Promise.allSettled(promises);
  const endTime = Date.now();
  const totalTime = endTime - startTime;

  // Analyze results
  let successCount = 0;
  let errorCount = 0;
  let timeoutCount = 0;
  let connectionPoolErrors = 0;
  const errors = [];
  const responseTimes = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      if (result.value.error) {
        errorCount++;
        errors.push(`Request ${index + 1}: ${result.value.error}`);
        
        if (result.value.error.includes('timeout') || result.value.error.includes('Timeout')) {
          timeoutCount++;
        }
        
        if (result.value.error.includes('pool') || result.value.error.includes('connection')) {
          connectionPoolErrors++;
        }
      } else {
        successCount++;
        if (result.value.responseTime) {
          responseTimes.push(result.value.responseTime);
        }
      }
    } else {
      errorCount++;
      errors.push(`Request ${index + 1}: ${result.reason.message}`);
      
      if (result.reason.message.includes('timeout') || result.reason.message.includes('Timeout')) {
        timeoutCount++;
      }
      
      if (result.reason.message.includes('pool') || result.reason.message.includes('connection')) {
        connectionPoolErrors++;
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

  // Calculate response time statistics
  const avgResponseTime = responseTimes.length > 0 
    ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
    : 0;
  const minResponseTime = responseTimes.length > 0 ? Math.min(...responseTimes) : 0;
  const maxResponseTime = responseTimes.length > 0 ? Math.max(...responseTimes) : 0;

  // Print results
  console.log('\n📈 Test Results:');
  console.log('=====================================');
  console.log(`✅ Successful requests: ${successCount}`);
  console.log(`❌ Failed requests: ${errorCount}`);
  console.log(`⏱️  Timeout errors: ${timeoutCount}`);
  console.log(`🔗 Connection pool errors: ${connectionPoolErrors}`);
  console.log(`⏰ Total time: ${totalTime}ms`);
  console.log(`📊 Average response time: ${avgResponseTime.toFixed(2)}ms`);
  console.log(`📊 Min response time: ${minResponseTime}ms`);
  console.log(`📊 Max response time: ${maxResponseTime}ms`);

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
  if (connectionPoolErrors === 0 && timeoutCount === 0 && errorCount < CONCURRENT_REQUESTS * 0.1) {
    console.log('✅ Connection pool issues appear to be RESOLVED!');
    console.log('   No connection pool timeout errors detected.');
    console.log('   The ProjectDetailModel transaction fixes are working.');
  } else if (connectionPoolErrors > 0) {
    console.log('⚠️  Connection pool issues still detected:');
    console.log(`   ${connectionPoolErrors} connection pool errors occurred.`);
    console.log('   Additional investigation may be needed.');
  } else if (timeoutCount > 0) {
    console.log('⚠️  Timeout errors detected:');
    console.log(`   ${timeoutCount} timeout errors occurred.`);
    console.log('   This might be due to database performance or network issues.');
  } else {
    console.log('⚠️  Some errors occurred but no connection pool issues detected.');
    console.log('   This might be due to other factors (network, server load, etc.).');
  }

  console.log('\n🔍 To monitor connection pool in real-time:');
  console.log(`   curl ${API_BASE_URL}/pool-status`);
  console.log(`   curl ${API_BASE_URL}/health`);
  console.log(`   curl ${API_BASE_URL}${ENDPOINT}`);
}

// Run the test
runCategoryEndpointTest().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
