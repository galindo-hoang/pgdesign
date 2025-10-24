// Test script to verify new project count logic
const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'pgdesign',
    password: 'pgdesignpassword',
    database: 'pgdesign_dev'
  }
});

async function testProjectCountLogic() {
  console.log('🧪 Testing new project count logic...\n');
  
  try {
    // Get project categories
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
        "display_order"
      );

    console.log('Categories found:', categories.length);
    
    // Calculate actual project counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        // Count actual projects for this category
        const projectCountResult = await db("project_details")
          .count("* as count")
          .where("project_category_id", category.id)
          .where("is_active", true)
          .first();

        const actualProjectCount = projectCountResult ? parseInt(projectCountResult.count) : 0;

        console.log(`${category.category_id} (${category.title}): ${actualProjectCount} projects`);

        return {
          categoryId: category.category_id,
          title: category.title,
          projectCount: actualProjectCount
        };
      })
    );

    console.log('\n✅ Project count calculation completed successfully!');
    console.log('Summary:');
    categoriesWithCounts.forEach(cat => {
      console.log(`  ${cat.categoryId}: ${cat.projectCount} projects`);
    });

  } catch (error) {
    console.error('❌ Error testing project count logic:', error.message);
  } finally {
    await db.destroy();
  }
}

testProjectCountLogic();

