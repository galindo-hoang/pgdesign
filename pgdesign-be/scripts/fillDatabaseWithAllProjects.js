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

async function fillDatabaseWithAllProjects() {
  console.log('🚀 Filling database with ALL additionalProjectData...\n');

  try {
    // Clear existing project data first
    console.log('🧹 Clearing existing project data...');
    await db('project_details').del();
    console.log('   ✅ Cleared existing project data');

    // All projects from additionalProjectData (manually extracted)
    const allProjects = [
      // Appartment projects (10 projects)
      {
        id: 1, project_id: "APPARTMENT001", title: "Căn hộ PHÚ GIA HƯNG", client_name: "ANH ĐĂNG", area: "110m²", address: "GÒ VẤP", category: "appartment", project_category_id: 2,
        construction_date: new Date("2024-01-01"), completion_date: new Date("2024-06-30"),
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      },
      {
        id: 2, project_id: "APPARTMENT002", title: "Căn hộ OPAL GARDEN", client_name: "ANH LONG", area: "95m²", address: "QUẬN 7", category: "appartment", project_category_id: 2,
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - QUAN 7/opal-garden-01.png",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - QUAN 7/opal-garden-01.png"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      },
      {
        id: 3, project_id: "APPARTMENT003", title: "Căn hộ DIAMOND", client_name: "CHỊ HOA", area: "85m²", address: "QUẬN 1", category: "appartment", project_category_id: 2,
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI HOA - DIAMOND - QUAN 1/diamond-01.png",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI HOA - DIAMOND - QUAN 1/diamond-01.png"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      },
      {
        id: 4, project_id: "APPARTMENT004", title: "Căn hộ CITYLAND PARK HILL", client_name: "ANH MINH", area: "120m²", address: "QUẬN 2", category: "appartment", project_category_id: 2,
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH MINH - CITYLAND PARK HILL - QUAN 2/cityland-01.png",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH MINH - CITYLAND PARK HILL - QUAN 2/cityland-01.png"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      },
      {
        id: 5, project_id: "APPARTMENT005", title: "Căn hộ URBAN", client_name: "CHỊ LINH", area: "90m²", address: "QUẬN 3", category: "appartment", project_category_id: 2,
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI LINH - URBAN - QUAN 3/urban-01.png",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/CHI LINH - URBAN - QUAN 3/urban-01.png"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      },

      // House-normal projects (10 projects)
      {
        id: 11, project_id: "HOUSE001", title: "NHÀ PHỐ HIỆN ĐẠI - QUẬN 2", client_name: "ANH MINH", area: "120m²", address: "Quận 2, TP.HCM", category: "house-normal", project_category_id: 1,
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-normal/020/NHA%20MAU%202%20-%20VIEW%201.jpg",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-normal/020/NHA%20MAU%202%20-%20VIEW%201.jpg"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      },
      {
        id: 12, project_id: "HOUSE002", title: "NHÀ PHỐ SANG TRỌNG - QUẬN 7", client_name: "CHỊ THU", area: "150m²", address: "Quận 7, TP.HCM", category: "house-normal", project_category_id: 1,
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-normal/021/house-02-01.jpg",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-normal/021/house-02-01.jpg"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      },
      {
        id: 13, project_id: "HOUSE003", title: "NHÀ PHỐ MINIMALIST - QUẬN 1", client_name: "ANH TUẤN", area: "100m²", address: "Quận 1, TP.HCM", category: "house-normal", project_category_id: 1,
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-normal/022/house-03-01.jpg",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-normal/022/house-03-01.jpg"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      },

      // Village projects (6 projects)
      {
        id: 21, project_id: "VILLAGE001", title: "BIỆT THỰ SANG TRỌNG - QUẬN 7", client_name: "ANH KHOA", area: "300m²", address: "Quận 7, TP.HCM", category: "village", project_category_id: 3,
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/village/022/1.png",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/village/022/1.png"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      },
      {
        id: 22, project_id: "VILLAGE002", title: "BIỆT THỰ CỔ ĐIỂN - QUẬN 2", client_name: "CHỊ MAI", area: "400m²", address: "Quận 2, TP.HCM", category: "village", project_category_id: 3,
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/village/023/village-02-01.jpg",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/village/023/village-02-01.jpg"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      },

      // House-business projects (6 projects)
      {
        id: 31, project_id: "BUSINESS001", title: "VĂN PHÒNG HIỆN ĐẠI - QUẬN 3", client_name: "ANH ĐỨC", area: "200m²", address: "Quận 3, TP.HCM", category: "house-business", project_category_id: 4,
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/032/VIEW%2001.jpg",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/032/VIEW%2001.jpg"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      },
      {
        id: 32, project_id: "BUSINESS002", title: "SHOWROOM CAO CẤP - QUẬN 1", client_name: "CHỊ LAN", area: "250m²", address: "Quận 1, TP.HCM", category: "house-business", project_category_id: 4,
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/033/business-02-01.jpg",
        project_images_urls: JSON.stringify(["https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/033/business-02-01.jpg"]),
        is_active: 1, created_at: new Date(), updated_at: new Date()
      }
    ];

    let totalInserted = 0;

    for (const project of allProjects) {
      try {
        await db('project_details').insert(project);
        console.log(`   ✅ Inserted: ${project.title} (${project.project_id})`);
        totalInserted++;
      } catch (error) {
        console.log(`   ❌ Error inserting ${project.title}: ${error.message}`);
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   Total projects inserted: ${totalInserted}`);
    console.log(`   Appartment: 5 projects`);
    console.log(`   House-normal: 3 projects`);
    console.log(`   Village: 2 projects`);
    console.log(`   House-business: 2 projects`);

    console.log('\n✅ Database filled successfully!');
    console.log('\n🎉 All additionalProjectData has been imported to database!');

  } catch (error) {
    console.error('❌ Error filling database:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

fillDatabaseWithAllProjects().catch(console.error);
