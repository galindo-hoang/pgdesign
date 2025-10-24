// Test script to verify the new optimized query
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
    max: 10,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false
  }
});

async function testOptimizedQuery() {
  console.log('🧪 Testing optimized query with LEFT JOIN...\n');
  
  try {
    // Test the new optimized query
    const categories = await db("project_categories")
      .leftJoin("project_details", function() {
        this.on("project_categories.id", "=", "project_details.project_category_id")
          .andOn("project_details.is_active", "=", db.raw("?", [true]));
      })
      .where({
        "project_categories.categories_data_id": 1,
        "project_categories.is_active": true,
      })
      .groupBy(
        "project_categories.id",
        "project_categories.category_id", 
        "project_categories.title",
        "project_categories.background_image_url",
        "project_categories.background_image_blob",
        "project_categories.navigation_path",
        "project_categories.display_order"
      )
      .orderBy("project_categories.display_order", "asc")
      .select(
        "project_categories.id",
        "project_categories.category_id",
        "project_categories.title",
        "project_categories.background_image_url",
        "project_categories.background_image_blob",
        "project_categories.navigation_path",
        "project_categories.display_order",
        db.raw("COUNT(project_details.id) as project_count")
      );

    console.log('✅ Optimized query executed successfully!');
    console.log(`Found ${categories.length} categories:`);
    
    categories.forEach(category => {
      console.log(`  ${category.category_id} (${category.title}): ${category.project_count} projects`);
    });

    // Test connection pool status
    console.log('\n🔍 Testing connection pool...');
    const poolInfo = await db.client.pool;
    console.log(`Pool size: ${poolInfo.numUsed()}/${poolInfo.numFree() + poolInfo.numUsed()}`);
    console.log(`Used connections: ${poolInfo.numUsed()}`);
    console.log(`Free connections: ${poolInfo.numFree()}`);

  } catch (error) {
    console.error('❌ Error testing optimized query:', error.message);
  } finally {
    await db.destroy();
    console.log('\n✅ Database connection closed');
  }
}

testOptimizedQuery();

