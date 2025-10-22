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

async function addHouseBusinessProjects() {
  console.log('🚀 Adding house-business projects...\n');

  try {
    // Add house-business projects manually
    const houseBusinessProjects = [
      {
        project_id: "BUSINESS001",
        title: "Văn phòng hiện đại - QUẬN 3",
        client_name: "ANH ĐỨC",
        area: "200m²",
        construction_date: new Date("2024-01-01"),
        address: "Quận 3, TP.HCM",
        description: "Thiết kế văn phòng hiện đại tại Quận 3 với phong cách chuyên nghiệp.",
        category: "house-business",
        project_category_id: 4,
        style: "Hiện đại",
        html_content: "<div><h3>Văn phòng hiện đại - QUẬN 3</h3><p>Thiết kế văn phòng hiện đại tại Quận 3 với phong cách chuyên nghiệp.</p></div>",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/032/VIEW%2001.jpg",
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/032/VIEW%2001.jpg",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/032/VIEW%2002.jpg"
        ]),
        project_status: "Hoàn thành",
        completion_date: new Date("2024-06-30"),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: "BUSINESS002",
        title: "Showroom cao cấp - QUẬN 1",
        client_name: "CHỊ LAN",
        area: "250m²",
        construction_date: new Date("2024-02-01"),
        address: "Quận 1, TP.HCM",
        description: "Thiết kế showroom cao cấp tại Quận 1 với phong cách sang trọng.",
        category: "house-business",
        project_category_id: 4,
        style: "Sang trọng",
        html_content: "<div><h3>Showroom cao cấp - QUẬN 1</h3><p>Thiết kế showroom cao cấp tại Quận 1 với phong cách sang trọng.</p></div>",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/033/business-02-01.jpg",
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/033/business-02-01.jpg",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/033/business-02-02.jpg"
        ]),
        project_status: "Hoàn thành",
        completion_date: new Date("2024-07-30"),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: "BUSINESS003",
        title: "Cửa hàng thời trang - QUẬN 2",
        client_name: "CHỊ MAI",
        area: "180m²",
        construction_date: new Date("2024-03-01"),
        address: "Quận 2, TP.HCM",
        description: "Thiết kế cửa hàng thời trang tại Quận 2 với phong cách hiện đại.",
        category: "house-business",
        project_category_id: 4,
        style: "Hiện đại",
        html_content: "<div><h3>Cửa hàng thời trang - QUẬN 2</h3><p>Thiết kế cửa hàng thời trang tại Quận 2 với phong cách hiện đại.</p></div>",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/034/fashion-store-01.jpg",
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/034/fashion-store-01.jpg",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/034/fashion-store-02.jpg"
        ]),
        project_status: "Hoàn thành",
        completion_date: new Date("2024-08-30"),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: "BUSINESS004",
        title: "Nhà hàng sang trọng - QUẬN 7",
        client_name: "ANH KHOA",
        area: "300m²",
        construction_date: new Date("2024-04-01"),
        address: "Quận 7, TP.HCM",
        description: "Thiết kế nhà hàng sang trọng tại Quận 7 với phong cách cổ điển.",
        category: "house-business",
        project_category_id: 4,
        style: "Cổ điển",
        html_content: "<div><h3>Nhà hàng sang trọng - QUẬN 7</h3><p>Thiết kế nhà hàng sang trọng tại Quận 7 với phong cách cổ điển.</p></div>",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/035/restaurant-01.jpg",
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/035/restaurant-01.jpg",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/035/restaurant-02.jpg"
        ]),
        project_status: "Hoàn thành",
        completion_date: new Date("2024-09-30"),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        project_id: "BUSINESS005",
        title: "Spa cao cấp - QUẬN 1",
        client_name: "CHỊ THU",
        area: "220m²",
        construction_date: new Date("2024-05-01"),
        address: "Quận 1, TP.HCM",
        description: "Thiết kế spa cao cấp tại Quận 1 với phong cách thư giãn.",
        category: "house-business",
        project_category_id: 4,
        style: "Thư giãn",
        html_content: "<div><h3>Spa cao cấp - QUẬN 1</h3><p>Thiết kế spa cao cấp tại Quận 1 với phong cách thư giãn.</p></div>",
        thumbnail_image_url: "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/036/spa-01.jpg",
        project_images_urls: JSON.stringify([
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/036/spa-01.jpg",
          "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/house-business/036/spa-02.jpg"
        ]),
        project_status: "Hoàn thành",
        completion_date: new Date("2024-10-30"),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    let totalInserted = 0;

    for (const project of houseBusinessProjects) {
      try {
        await db('project_details').insert(project);
        console.log(`   ✅ Inserted: ${project.title} (${project.project_id})`);
        totalInserted++;
      } catch (error) {
        console.log(`   ❌ Error inserting ${project.title}: ${error.message}`);
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   Total house-business projects inserted: ${totalInserted}`);

    console.log('\n✅ House-business projects added successfully!');
    console.log('\n🎉 Database now has complete project data!');

  } catch (error) {
    console.error('❌ Error adding house-business projects:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

addHouseBusinessProjects().catch(console.error);
