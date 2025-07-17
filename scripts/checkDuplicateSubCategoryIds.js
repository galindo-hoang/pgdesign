const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

async function checkDuplicateSubCategoryIds() {
  try {
    console.log('🔍 Checking for duplicate sub_category_id values...\n');
    
    // Check for duplicates
    const duplicates = await db('project_sub_categories')
      .select('sub_category_id')
      .count('* as count')
      .groupBy('sub_category_id')
      .having('count', '>', 1);
    
    if (duplicates.length === 0) {
      console.log('✅ No duplicate sub_category_id values found!');
      console.log('✅ Safe to add unique constraint on sub_category_id column.\n');
    } else {
      console.log('❌ Found duplicate sub_category_id values:');
      duplicates.forEach(dup => {
        console.log(`  - "${dup.sub_category_id}" appears ${dup.count} times`);
      });
      console.log('\n❌ Cannot add unique constraint until duplicates are resolved.\n');
    }
    
    // Show all current sub_category_id values
    const allSubCategories = await db('project_sub_categories')
      .select('sub_category_id', 'title', 'project_category_id')
      .join('project_categories', 'project_sub_categories.project_category_id', 'project_categories.id')
      .select('project_sub_categories.sub_category_id', 'project_sub_categories.title', 'project_categories.category_id as parent_category')
      .orderBy('project_categories.category_id', 'project_sub_categories.display_order');
    
    console.log('📋 Current subcategories by parent category:');
    let currentCategory = '';
    allSubCategories.forEach(sub => {
      if (sub.parent_category !== currentCategory) {
        currentCategory = sub.parent_category;
        console.log(`\n${currentCategory}:`);
      }
      console.log(`  - ${sub.sub_category_id} (${sub.title})`);
    });
    
    console.log('\n✅ Check complete!');
    
  } catch (error) {
    console.error('❌ Error during check:', error.message);
  } finally {
    await db.destroy();
  }
}

// Run the check
checkDuplicateSubCategoryIds(); 