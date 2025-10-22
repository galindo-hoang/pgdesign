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

async function fillDatabaseWithAdditionalProjects() {
  console.log('🚀 Filling database with additionalProjectData...\n');

  try {
    // Clear existing project data first
    console.log('🧹 Clearing existing project data...');
    await db('project_details').del();
    console.log('   ✅ Cleared existing project data');

    // Sample projects from additionalProjectData (manually extracted)
    const projects = [
      // Appartment projects
      {
        id: 1,
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
        thumbnail_image: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png",
        html_content: "<div><h3>Thiết Kế PHÚ GIA HƯNG</h3><p>Dự án thiết kế căn hộ tại GÒ VẤP với phong cách hiện đại, tiện nghi và phù hợp với nhu cầu sử dụng.</p></div>",
        project_images: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-02.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-03.png"
        ]),
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-02.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-03.png"
        ]),
        project_status: "Hoàn thành • 500 triệu",
        completion_date: new Date("2024-06-30"),
        architect_name: "KTS. PG Design",
        contractor_name: "PG Design",
        meta_title: "Thiết Kế PHÚ GIA HƯNG",
        meta_description: "Thiết kế căn hộ tại GÒ VẤP",
        tags: JSON.stringify(["căn hộ", "nội thất", "hiện đại", "GÒ VẤP"]),
        is_on_homepage: 0,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
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
        thumbnail_image: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - QUAN 7/opal-garden-01.png",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - QUAN 7/opal-garden-01.png",
        html_content: "<div><h3>Thiết Kế OPAL GARDEN</h3><p>Dự án thiết kế căn hộ tại QUẬN 7 với phong cách hiện đại, tiện nghi và phù hợp với nhu cầu sử dụng.</p></div>",
        project_images: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - QUAN 7/opal-garden-01.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - QUAN 7/opal-garden-02.png"
        ]),
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - QUAN 7/opal-garden-01.png",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/appartment/ANH LONG - OPAL GARDEN - QUAN 7/opal-garden-02.png"
        ]),
        project_status: "Hoàn thành • 400 triệu",
        completion_date: new Date("2024-07-30"),
        architect_name: "KTS. PG Design",
        contractor_name: "PG Design",
        meta_title: "Thiết Kế OPAL GARDEN",
        meta_description: "Thiết kế căn hộ tại QUẬN 7",
        tags: JSON.stringify(["căn hộ", "nội thất", "hiện đại", "QUẬN 7"]),
        is_on_homepage: 0,
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

    console.log('\n✅ Database filled successfully!');
    console.log('\n🎉 Sample additionalProjectData has been imported to database!');

  } catch (error) {
    console.error('❌ Error filling database:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

fillDatabaseWithAdditionalProjects().catch(console.error);
