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
      },
      {
        project_id: "APPARTMENT002",
        title: "Căn hộ OPAL GARDEN",
        client_name: "ANH LONG",
        area: "110m²",
        construction_date: new Date("2024-01-01"),
        address: "HIỆP BÌNH HCM",
        description: "Thiết kế căn hộ tại HIỆP BÌNH HCM với phong cách hiện đại và tiện nghi.",
        category: "appartment",
        project_category_id: 1,
        style: "Hiện đại",
        thumbnail_image: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/0.png",
        html_content: "<div><h3>Thiết Kế OPAL GARDEN</h3><p>Dự án thiết kế căn hộ tại HIỆP BÌNH HCM với phong cách hiện đại, tiện nghi và phù hợp với nhu cầu sử dụng.</p></div>",
        project_images: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/0.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/1.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/2.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/3.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/4.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/5.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/6.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/7.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/8.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/9.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/10.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/11.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/12.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - HIEP BINH HCM/13.png"
        ]),
        project_status: "Hoàn thành • 500 triệu",
        completion_date: new Date("2024-06-30"),
        architect_name: "KTS. PG Design",
        contractor_name: "PG Design",
        meta_title: "Thiết Kế OPAL GARDEN",
        meta_description: "Thiết kế căn hộ tại HIỆP BÌNH HCM",
        tags: JSON.stringify(["căn hộ", "nội thất", "hiện đại", "HIỆP BÌNH HCM"]),
        is_active: 1,
        is_on_homepage: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: "APPARTMENT003",
        title: "Căn hộ DIAMOND",
        client_name: "CHỊ NHI",
        area: "110m²",
        construction_date: new Date("2024-01-01"),
        address: "TÂN PHÚ",
        description: "Thiết kế căn hộ tại TÂN PHÚ với phong cách hiện đại và tiện nghi.",
        category: "appartment",
        project_category_id: 1,
        style: "Hiện đại",
        thumbnail_image: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/0.png",
        html_content: "<div><h3>Thiết Kế DIAMOND</h3><p>Dự án thiết kế căn hộ tại TÂN PHÚ với phong cách hiện đại, tiện nghi và phù hợp với nhu cầu sử dụng.</p></div>",
        project_images: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/0.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/1.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/2.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/3.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/4.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/5.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/6.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/7.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/8.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/9.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/10.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/11.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/12.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/13.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/14.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/15.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/16.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/17.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/18.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/19.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/20.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI NHI - DIAMOND - TAN PHU/21.png"
        ]),
        project_status: "Hoàn thành • 500 triệu",
        completion_date: new Date("2024-06-30"),
        architect_name: "KTS. PG Design",
        contractor_name: "PG Design",
        meta_title: "Thiết Kế DIAMOND",
        meta_description: "Thiết kế căn hộ tại TÂN PHÚ",
        tags: JSON.stringify(["căn hộ", "nội thất", "hiện đại", "TÂN PHÚ"]),
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
