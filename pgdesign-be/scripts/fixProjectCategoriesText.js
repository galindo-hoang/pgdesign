#!/usr/bin/env node

require('dotenv').config();
const knex = require('knex');

// Use explicit database configuration
const db = knex({
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

async function fixProjectCategoriesText() {
  console.log('🔄 Fixing project categories text encoding...\n');

  try {
    // Fix project_categories_data table
    console.log('📋 Fixing project_categories_data...');
    const projectCategoriesDataUpdate = await db('project_categories_data')
      .where('id', 1)
      .update({
        main_title: 'DỰ ÁN CỦA CHÚNG TÔI',
        subtitle: 'NHỮNG CÔNG TRÌNH TIÊU BIỂU',
        description: 'Khám phá các dự án thiết kế nội thất đã hoàn thành',
        updated_at: new Date()
      });
    
    console.log(`   ✅ Updated ${projectCategoriesDataUpdate} project_categories_data records`);

    console.log('\n📊 Summary:');
    console.log(`   Fixed text encoding for project categories`);
    console.log(`   - mainTitle: "DỰ ÁN CỦA CHÚNG TÔI"`);
    console.log(`   - subtitle: "NHỮNG CÔNG TRÌNH TIÊU BIỂU"`);
    console.log(`   - description: "Khám phá các dự án thiết kế nội thất đã hoàn thành"`);

    console.log('\n✅ Text encoding fix completed successfully!');
    console.log('\n🎉 Project categories text now displays correctly!');

  } catch (error) {
    console.error('❌ Error fixing text encoding:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

fixProjectCategoriesText().catch(console.error);
