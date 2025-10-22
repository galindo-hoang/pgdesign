#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
import * as knex from 'knex';

dotenv.config();

// Use explicit database configuration
const db = knex.default({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootpassword',
    database: 'pgdesign_dev',
    charset: 'utf8mb4'
  },
  pool: {
    min: 2,
    max: 10
  },
  useNullAsDefault: true
});

async function checkProjects() {
  console.log('📊 Checking projects in database...\n');

  try {
    // Get total count
    const totalResult = await db('project_details').count('* as count');
    const total = totalResult[0]?.count || 0;
    console.log(`   Total projects: ${total}`);

    // Get count by category
    const categoryResults = await db('project_details')
      .select('category')
      .count('* as count')
      .groupBy('category');

    console.log('\n   Projects by category:');
    categoryResults.forEach((row: any) => {
      console.log(`   - ${row.category}: ${row.count} projects`);
    });

    // Get all project titles
    const projects = await db('project_details').select('title', 'category').orderBy('category');
    console.log('\n   All projects:');
    projects.forEach((project: any) => {
      console.log(`   - [${project.category}] ${project.title}`);
    });

  } catch (error) {
    console.error('❌ Error checking database:', error);
    throw error;
  } finally {
    await db.destroy();
  }
}

// Run the function
checkProjects()
  .then(() => {
    console.log('\n✅ Check completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Check failed:', error);
    process.exit(1);
  });

