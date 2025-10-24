// Test script to check connection pool status
const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'pgdesign',
    password: 'pgdesignpassword',
    database: 'pgdesign_dev'
  },
  pool: {
    min: 2,
    max: 20,
    acquireTimeoutMillis: 60000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false
  }
});

async function testConnectionPool() {
  console.log('🔍 Testing connection pool...\n');
  
  try {
    // Test basic connection
    console.log('1. Testing basic connection...');
    const result = await db.raw('SELECT 1 as test');
    console.log(`   ✅ Basic connection successful: ${result[0][0].test}`);
    
    // Test pool status
    console.log('\n2. Checking pool status...');
    const pool = db.client.pool;
    console.log(`   Pool size: ${pool.numUsed() + pool.numFree()}`);
    console.log(`   Used connections: ${pool.numUsed()}`);
    console.log(`   Free connections: ${pool.numFree()}`);
    
    // Test multiple concurrent connections
    console.log('\n3. Testing multiple concurrent connections...');
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(
        db.raw('SELECT ? as id, NOW() as timestamp', [i])
      );
    }
    
    const results = await Promise.all(promises);
    console.log(`   ✅ ${results.length} concurrent queries completed`);
    
    // Check pool status after concurrent queries
    console.log('\n4. Pool status after concurrent queries...');
    console.log(`   Used connections: ${pool.numUsed()}`);
    console.log(`   Free connections: ${pool.numFree()}`);
    
    // Test the problematic query
    console.log('\n5. Testing project categories query...');
    const categories = await db("project_categories")
      .where({
        categories_data_id: 1,
        is_active: true,
      })
      .orderBy("display_order", "asc")
      .select(
        "id",
        "category_id",
        "title",
        "project_count",
        "background_image_url",
        "background_image_blob",
        "navigation_path",
        "display_order"
      );
    
    console.log(`   ✅ Found ${categories.length} categories`);
    
    // Final pool status
    console.log('\n6. Final pool status...');
    console.log(`   Used connections: ${pool.numUsed()}`);
    console.log(`   Free connections: ${pool.numFree()}`);
    
  } catch (error) {
    console.error('❌ Error testing connection pool:', error.message);
  } finally {
    await db.destroy();
    console.log('\n✅ Database connection closed');
  }
}

testConnectionPool();

