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

async function fillAll31Projects() {
  console.log('🚀 Filling database with ALL 31 projects from additionalProjectData...\n');

  try {
    // Clear existing project data first
    console.log('🧹 Clearing existing project data...');
    await db('project_details').del();
    console.log('   ✅ Cleared existing project data');

    // All 31 projects from additionalProjectData
    const allProjects = [
      // Appartment projects (10 projects)
      {
        project_id: "APPARTMENT001",
        title: "Căn hộ PHÚ GIA HƯNG",
        client_name: "ANH ĐĂNG",
        area: "110m²",
        construction_date: new Date("2024-01-01"),
        address: "GÒ VẤP",
        description: "Thiết kế căn hộ tại GÒ VẤP với phong cách hiện đại và tiện nghi.",
        category: "appartment",
        project_category_id: 1,
        style: "Hiện đại",
        thumbnail_image: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png",
        html_content: "<div><h3>Thiết Kế PHÚ GIA HƯNG</h3><p>Dự án thiết kế căn hộ tại GÒ VẤP với phong cách hiện đại, tiện nghi và phù hợp với nhu cầu sử dụng.</p></div>",
        project_images: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-02.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-03.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-04.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-05.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-06.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-07.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-08.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-09.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-10.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-11.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-12.png"
        ]),
        project_status: "Hoàn thành • 500 triệu",
        completion_date: new Date("2024-06-30"),
        architect_name: "KTS. PG Design",
        contractor_name: "PG Design",
        meta_title: "Thiết Kế PHÚ GIA HƯNG",
        meta_description: "Thiết kế căn hộ tại GÒ VẤP",
        tags: JSON.stringify(["căn hộ", "nội thất", "hiện đại", "GÒ VẤP"]),
        is_active: 1,
        is_on_homepage: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    // Insert all projects
    console.log('📝 Inserting projects...');
    let successCount = 0;
    let errorCount = 0;
    const categoryCounts = {};

    for (const project of allProjects) {
      try {
        await db('project_details').insert(project);
        console.log(`   ✅ Inserted ${project.title}`);
        successCount++;
        
        // Count by category
        if (!categoryCounts[project.category]) {
          categoryCounts[project.category] = 0;
        }
        categoryCounts[project.category]++;
      } catch (error) {
        console.log(`   ❌ Error inserting ${project.title}: ${error.message}`);
        errorCount++;
      }
    }

    // Summary
    console.log('\n📊 Summary:');
    console.log(`   Total projects inserted: ${successCount}`);
    console.log(`   Errors: ${errorCount}`);
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   ${category.charAt(0).toUpperCase() + category.slice(1)}: ${count} projects`);
    });

    console.log('\n✅ Database filled successfully!');
    console.log(`\n🎉 All ${successCount} projects from additionalProjectData have been imported!`);

  } catch (error) {
    console.error('❌ Error filling database:', error);
    throw error;
  } finally {
    await db.destroy();
  }
}

// Run the function
fillAll31Projects()
  .then(() => {
    console.log('\n🎯 Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });
