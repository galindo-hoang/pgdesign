const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

async function checkMissingCategories() {
  try {
    console.log('🔍 Checking current data distribution...\n');
    
    // Check current categories in database
    const categoryStats = await db('project_details')
      .select('category', 'project_category_id')
      .count('* as count')
      .groupBy('category', 'project_category_id')
      .orderBy('count', 'desc');
    
    console.log('📊 Current categories in database:');
    categoryStats.forEach(stat => {
      console.log(`   • ${stat.category} (ID: ${stat.project_category_id}): ${stat.count} projects`);
    });
    
    // Check total projects
    const totalProjects = await db('project_details').count('* as count').first();
    console.log(`\n📋 Total projects in database: ${totalProjects.count}`);
    
    // List all project IDs by category
    console.log('\n📝 Projects by category:');
    
    const allProjects = await db('project_details')
      .select('project_id', 'title', 'category')
      .orderBy('category', 'project_id');
    
    const groupedByCategory = {};
    allProjects.forEach(project => {
      if (!groupedByCategory[project.category]) {
        groupedByCategory[project.category] = [];
      }
      groupedByCategory[project.category].push(project);
    });
    
    Object.keys(groupedByCategory).forEach(category => {
      console.log(`\n   ${category.toUpperCase()}:`);
      groupedByCategory[category].forEach(project => {
        console.log(`     - ${project.project_id}: ${project.title}`);
      });
    });
    
    console.log('\n🎯 Expected categories that should exist:');
    console.log('   • appartment (should have multiple projects)');
    console.log('   • house-normal (should have multiple projects)');
    console.log('   • village (missing?)');
    console.log('   • house-business (missing?)');
    
  } catch (error) {
    console.error('❌ Error checking categories:', error);
  } finally {
    await db.destroy();
  }
}

checkMissingCategories();
