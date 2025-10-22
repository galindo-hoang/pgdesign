#!/usr/bin/env node

// Script to seed database from mock data in src/services
require('dotenv').config();
const knex = require('knex');

// Database configuration
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

async function seedFromMockData() {
  console.log('🌱 Seeding database from mock data...\n');

  try {
    // 1. Seed About Project Data
    console.log('📋 Seeding About Project Data...');
    const existingAbout = await db('about_project_data').where('id', 1).first();
    if (!existingAbout) {
      await db('about_project_data').insert({
        id: 1,
        title: 'Dự án',
        subtitle: 'PG DESIGN',
        background_image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projectpage/project-hero.png',
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      });
      console.log('   ✅ About Project Data seeded');
    } else {
      console.log('   ⏭️  About Project Data already exists, skipping');
    }

    // 2. Seed Project Categories
    console.log('📋 Seeding Project Categories...');
    const categories = [
      {
        id: 1,
        categories_data_id: 1, // Use existing categories_data
        category_id: 'house-normal',
        title: 'NHÀ PHỐ',
        project_count: 15,
        background_image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projectpage/house-normal-bg.png',
        navigation_path: '/projects/house-normal',
        display_order: 0,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        categories_data_id: 1,
        category_id: 'appartment',
        title: 'CĂN HỘ',
        project_count: 12,
        background_image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projectpage/appartment-bg.png',
        navigation_path: '/projects/appartment',
        display_order: 1,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        categories_data_id: 1,
        category_id: 'village',
        title: 'BIỆT THỰ',
        project_count: 8,
        background_image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projectpage/village-bg.png',
        navigation_path: '/projects/village',
        display_order: 2,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        categories_data_id: 1,
        category_id: 'house-business',
        title: 'THƯƠNG MẠI',
        project_count: 20,
        background_image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projectpage/house-business-bg.png',
        navigation_path: '/projects/house-business',
        display_order: 3,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    // Check existing categories and insert only new ones
    for (const category of categories) {
      const existing = await db('project_categories').where('id', category.id).first();
      if (!existing) {
        await db('project_categories').insert(category);
        console.log(`   ✅ Inserted category: ${category.title}`);
      } else {
        console.log(`   ⏭️  Category ${category.title} already exists, skipping`);
      }
    }
    console.log('   ✅ Project Categories processed');

    // 3. Seed Project Details (sample projects)
    console.log('📋 Seeding Project Details...');
    const projects = [
      {
        id: 1,
        project_id: 'house-normal-001',
        title: 'NHÀ PHỐ HIỆN ĐẠI - QUẬN 2',
        client_name: 'Anh Minh',
        area: '120m2',
        construction_date: new Date('2023-01-15'),
        address: 'Quận 2, TP.HCM',
        description: 'Thiết kế nhà phố hiện đại với không gian mở',
        category: 'house-normal',
        project_category_id: 1,
        style: 'Modern',
        thumbnail_image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-normal-001/1.jpg',
        thumbnail_image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-normal-001/1.jpg',
        html_content: '<div><h3>NHÀ PHỐ HIỆN ĐẠI - QUẬN 2</h3><p>Thiết kế nhà phố hiện đại với không gian mở</p></div>',
        project_images: JSON.stringify([
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-normal-001/1.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-normal-001/2.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-normal-001/3.jpg'
        ]),
        project_images_urls: JSON.stringify([
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-normal-001/1.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-normal-001/2.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-normal-001/3.jpg'
        ]),
        project_status: 'Completed',
        completion_date: new Date('2023-06-30'),
        is_on_homepage: true,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        project_id: 'appartment-001',
        title: 'CĂN HỘ CAO CẤP - QUẬN 1',
        client_name: 'Chị Lan',
        area: '85m2',
        construction_date: new Date('2023-02-20'),
        address: 'Quận 1, TP.HCM',
        description: 'Thiết kế căn hộ cao cấp với view đẹp',
        category: 'appartment',
        project_category_id: 2,
        style: 'Luxury',
        thumbnail_image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/appartment-001/1.jpg',
        thumbnail_image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/appartment-001/1.jpg',
        html_content: '<div><h3>CĂN HỘ CAO CẤP - QUẬN 1</h3><p>Thiết kế căn hộ cao cấp với view đẹp</p></div>',
        project_images: JSON.stringify([
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/appartment-001/1.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/appartment-001/2.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/appartment-001/3.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/appartment-001/4.jpg'
        ]),
        project_images_urls: JSON.stringify([
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/appartment-001/1.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/appartment-001/2.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/appartment-001/3.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/appartment-001/4.jpg'
        ]),
        project_status: 'Completed',
        completion_date: new Date('2023-08-15'),
        is_on_homepage: true,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        project_id: 'village-001',
        title: 'BIỆT THỰ SANG TRỌNG - QUẬN 7',
        client_name: 'Anh Tuấn',
        area: '300m2',
        construction_date: new Date('2023-03-10'),
        address: 'Quận 7, TP.HCM',
        description: 'Thiết kế biệt thự sang trọng với sân vườn',
        category: 'village',
        project_category_id: 3,
        style: 'Luxury',
        thumbnail_image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/1.jpg',
        thumbnail_image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/1.jpg',
        html_content: '<div><h3>BIỆT THỰ SANG TRỌNG - QUẬN 7</h3><p>Thiết kế biệt thự sang trọng với sân vườn</p></div>',
        project_images: JSON.stringify([
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/1.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/2.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/3.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/4.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/5.jpg'
        ]),
        project_images_urls: JSON.stringify([
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/1.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/2.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/3.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/4.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/village-001/5.jpg'
        ]),
        project_status: 'Completed',
        completion_date: new Date('2023-09-30'),
        is_on_homepage: true,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        project_id: 'house-business-001',
        title: 'VĂN PHÒNG HIỆN ĐẠI - QUẬN 3',
        client_name: 'Công ty ABC',
        area: '200m2',
        construction_date: new Date('2023-04-05'),
        address: 'Quận 3, TP.HCM',
        description: 'Thiết kế văn phòng hiện đại cho công ty',
        category: 'house-business',
        project_category_id: 4,
        style: 'Modern',
        thumbnail_image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-business-001/1.jpg',
        thumbnail_image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-business-001/1.jpg',
        html_content: '<div><h3>VĂN PHÒNG HIỆN ĐẠI - QUẬN 3</h3><p>Thiết kế văn phòng hiện đại cho công ty</p></div>',
        project_images: JSON.stringify([
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-business-001/1.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-business-001/2.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-business-001/3.jpg'
        ]),
        project_images_urls: JSON.stringify([
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-business-001/1.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-business-001/2.jpg',
          'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/projects/house-business-001/3.jpg'
        ]),
        project_status: 'Completed',
        completion_date: new Date('2023-10-20'),
        is_on_homepage: true,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    // Check existing projects and insert only new ones
    for (const project of projects) {
      const existing = await db('project_details').where('id', project.id).first();
      if (!existing) {
        await db('project_details').insert(project);
        console.log(`   ✅ Inserted project: ${project.title}`);
      } else {
        console.log(`   ⏭️  Project ${project.title} already exists, skipping`);
      }
    }
    console.log('   ✅ Project Details processed');

    // 4. Seed Service Page Data
    console.log('📋 Seeding Service Page Data...');
    const existingHero = await db('service_page_hero').where('id', 1).first();
    if (!existingHero) {
      await db('service_page_hero').insert({
        id: 1,
        main_title: 'DỊCH VỤ CỦA CHÚNG TÔI',
        brand_name: 'GIẢI PHÁP TOÀN DIỆN',
        description: 'Chúng tôi cung cấp các dịch vụ thiết kế và thi công chuyên nghiệp',
        hero_image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/mock-assets/images/servicepage/service-hero.jpg',
        is_active: 1,
        display_order: 1,
        created_at: new Date(),
        updated_at: new Date()
      });
      console.log('   ✅ Service Page Hero seeded');
    } else {
      console.log('   ⏭️  Service Page Hero already exists, skipping');
    }

    const services = [
      {
        id: 1,
        title: 'Thiết kế kiến trúc',
        subtitle: 'Kiến trúc chuyên nghiệp',
        description: JSON.stringify(['Thiết kế kiến trúc chuyên nghiệp', 'Tư vấn quy hoạch', 'Bản vẽ chi tiết']),
        display_order: 0,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        title: 'Thiết kế nội thất',
        subtitle: 'Nội thất hiện đại',
        description: JSON.stringify(['Thiết kế nội thất hiện đại', 'Tư vấn màu sắc', 'Bố trí không gian']),
        display_order: 1,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        title: 'Thi công hoàn thiện',
        subtitle: 'Chất lượng cao',
        description: JSON.stringify(['Thi công chất lượng cao', 'Giám sát công trình', 'Bảo hành dài hạn']),
        display_order: 2,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        title: 'Tư vấn dự án',
        subtitle: 'Chuyên nghiệp',
        description: JSON.stringify(['Tư vấn chuyên nghiệp', 'Phân tích nhu cầu', 'Đề xuất giải pháp']),
        display_order: 3,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    // Check existing services and insert only new ones
    for (const service of services) {
      const existing = await db('service_page_services').where('id', service.id).first();
      if (!existing) {
        await db('service_page_services').insert(service);
        console.log(`   ✅ Inserted service: ${service.title}`);
      } else {
        console.log(`   ⏭️  Service ${service.title} already exists, skipping`);
      }
    }
    console.log('   ✅ Service Page Data processed');

    console.log('\n🎯 Summary:');
    console.log('   ✅ About Project Data: 1 record');
    console.log('   ✅ Project Categories: 4 records');
    console.log('   ✅ Project Details: 4 records');
    console.log('   ✅ Service Page Data: 5 records');
    console.log('\n🎉 Database seeded successfully from mock data!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

seedFromMockData();
