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

async function addMoreProjectsToDatabase() {
  console.log('🚀 Adding more projects to database...\n');

  try {
    // Add projects one by one with all required fields
    const projects = [
      {
        project_id: "APPARTMENT001",
        title: "Căn hộ PHÚ GIA HƯNG",
        client_name: "ANH ĐĂNG",
        area: "110m²",
        construction_date: new Date("2024-01-01"),
        address: "GÒ VẤP",
        description: "Thiết kế căn hộ tại GÒ VẤP với phong cách hiện đại và tiện nghi.",
        category: "appartment",
        project_category_id: 2,
        style: "Hiện đại",
        html_content: "<div><h3>Căn hộ PHÚ GIA HƯNG</h3><p>Thiết kế căn hộ tại GÒ VẤP với phong cách hiện đại và tiện nghi.</p></div>",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png",
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-02.png"
        ]),
        project_status: "Hoàn thành",
        completion_date: new Date("2024-06-30"),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: "APPARTMENT002",
        title: "Căn hộ OPAL GARDEN",
        client_name: "ANH LONG",
        area: "95m²",
        construction_date: new Date("2024-02-01"),
        address: "QUẬN 7",
        description: "Thiết kế căn hộ tại QUẬN 7 với phong cách hiện đại và tiện nghi.",
        category: "appartment",
        project_category_id: 2,
        style: "Hiện đại",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - QUAN 7/opal-garden-01.png",
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - QUAN 7/opal-garden-01.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - QUAN 7/opal-garden-02.png"
        ]),
        project_status: "Hoàn thành",
        completion_date: new Date("2024-07-30"),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: "HOUSE001",
        title: "NHÀ PHỐ SANG TRỌNG - QUẬN 7",
        client_name: "CHỊ THU",
        area: "150m²",
        construction_date: new Date("2024-03-01"),
        address: "Quận 7, TP.HCM",
        description: "Thiết kế nhà phố sang trọng tại Quận 7 với phong cách hiện đại.",
        category: "house-normal",
        project_category_id: 1,
        style: "Hiện đại",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-normal/021/house-02-01.jpg",
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-normal/021/house-02-01.jpg",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-normal/021/house-02-02.jpg"
        ]),
        project_status: "Hoàn thành",
        completion_date: new Date("2024-08-30"),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: "VILLAGE001",
        title: "BIỆT THỰ CỔ ĐIỂN - QUẬN 2",
        client_name: "CHỊ MAI",
        area: "400m²",
        construction_date: new Date("2024-04-01"),
        address: "Quận 2, TP.HCM",
        description: "Thiết kế biệt thự cổ điển tại Quận 2 với phong cách sang trọng.",
        category: "village",
        project_category_id: 3,
        style: "Cổ điển",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/village/023/village-02-01.jpg",
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/village/023/village-02-01.jpg",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/village/023/village-02-02.jpg"
        ]),
        project_status: "Hoàn thành",
        completion_date: new Date("2024-09-30"),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: "BUSINESS001",
        title: "SHOWROOM CAO CẤP - QUẬN 1",
        client_name: "CHỊ LAN",
        area: "250m²",
        construction_date: new Date("2024-05-01"),
        address: "Quận 1, TP.HCM",
        description: "Thiết kế showroom cao cấp tại Quận 1 với phong cách hiện đại.",
        category: "house-business",
        project_category_id: 4,
        style: "Hiện đại",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/033/business-02-01.jpg",
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/033/business-02-01.jpg",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/033/business-02-02.jpg"
        ]),
        project_status: "Hoàn thành",
        completion_date: new Date("2024-10-30"),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    let totalInserted = 0;

    for (const project of projects) {
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

    console.log('\n✅ Additional projects added successfully!');
    console.log('\n🎉 Database now has more comprehensive project data!');

  } catch (error) {
    console.error('❌ Error adding projects:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

addMoreProjectsToDatabase().catch(console.error);
