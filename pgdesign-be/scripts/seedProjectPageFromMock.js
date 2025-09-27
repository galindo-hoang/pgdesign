const fs = require('fs');
const path = require('path');
const { Client } = require('minio');
const mysql = require('mysql2/promise');
require('dotenv').config();

// MinIO configuration
const minioClient = new Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin',
});

const bucketName = 'pgdesign-assets';

// MySQL configuration  
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'pgdesign',
  password: 'pgdesignpassword',
  database: 'pgdesign_dev'
};

// Mock data based on projectPageService.ts
const mockData = {
  aboutProject: {
    title: 'Dự án',
    subtitle: 'PG DESIGN',
    isActive: true
  },
  statsSection: {
    mainHeadline: 'THÀNH TỰU CỦA CHÚNG TÔI',
    subHeadline: 'Những con số ấn tượng',
    description: 'Với nhiều năm kinh nghiệm trong lĩnh vực thiết kế kiến trúc và nội thất, chúng tôi tự hào mang đến những giải pháp tối ưu cho mọi không gian sống.',
    statsItems: [
      {
        iconName: 'experience-icon',
        iconUrl: 'experience-icon.svg',
        targetValue: 5,
        label: 'Kinh nghiệm',
        suffix: '+ năm',
        description: 'Kinh nghiệm',
        category: 'experience',
        displayOrder: 0
      },
      {
        iconName: 'customer-icon',
        iconUrl: 'customer-icon.svg',
        targetValue: 500,
        label: 'Khách hàng',
        suffix: '+',
        description: 'Tin tưởng & hài lòng',
        category: 'customers',
        displayOrder: 1
      },
      {
        iconName: 'design-icon',
        iconUrl: 'design-icon.svg',
        targetValue: 450,
        label: 'Dự án',
        suffix: '+',
        description: 'Thiết kế hoàn thành',
        category: 'projects',
        displayOrder: 2
      },
      {
        iconName: 'building-icon',
        iconUrl: 'building-icon.svg',
        targetValue: 98,
        label: 'Chất lượng',
        suffix: '%',
        description: 'Cam kết hoàn hảo',
        category: 'quality',
        displayOrder: 3
      }
    ]
  },
  projectCategories: {
    mainTitle: 'DANH MỤC DỰ ÁN',
    subtitle: 'KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ',
    description: 'Từ những căn nhà phố hiện đại đến những biệt thự sang trọng, từ không gian nội thất tinh tế đến những ngôi nhà vườn xanh mát - chúng tôi mang đến giải pháp thiết kế toàn diện cho mọi nhu cầu.',
    categories: [
      {
        categoryId: 'house-normal',
        title: 'NHÀ PHỐ',
        projectCount: 45,
        navigationPath: '/projects/house-normal',
        displayOrder: 0
      },
      {
        categoryId: 'house-full',
        title: 'Xây nhà trọn gói',
        projectCount: 32,
        navigationPath: '/projects/house-full',
        displayOrder: 1
      },
      {
        categoryId: 'house-rough',
        title: 'Xây dựng phần thô',
        projectCount: 28,
        navigationPath: '/projects/house-rough',
        displayOrder: 2
      },
      {
        categoryId: 'house-interior',
        title: 'Thiết kế và thi công nội thất',
        projectCount: 50,
        navigationPath: '/projects/house-interior',
        displayOrder: 3
      }
    ]
  }
};

// File paths
const assetsBasePath = '../../src/assets';
const imagesPath = path.join(__dirname, assetsBasePath, 'images');
const iconsPath = path.join(__dirname, assetsBasePath, 'icons');

async function initializeBucket() {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`✅ Bucket '${bucketName}' created`);
    } else {
      console.log(`✅ Bucket '${bucketName}' already exists`);
    }
  } catch (error) {
    console.error('❌ Error initializing bucket:', error);
    throw error;
  }
}

async function uploadFile(filePath, objectName) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filePath}`);
      return `http://localhost:9000/${bucketName}/${objectName}`;
    }

    await minioClient.fPutObject(bucketName, objectName, filePath);
    const publicUrl = `http://localhost:9000/${bucketName}/${objectName}`;
    console.log(`✅ Uploaded: ${path.basename(filePath)} -> ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error(`❌ Error uploading ${objectName}:`, error);
    throw error;
  }
}

async function uploadRequiredAssets() {
  const uploadedAssets = {
    images: {},
    icons: {}
  };

  console.log('📸 Uploading required images...');
  
  // Collect all required files from mock data
  const requiredImages = new Set();
  const requiredIcons = new Set();

  // About project image
  requiredImages.add(mockData.aboutProject.backgroundImageUrl);
  
  // Stats items images and icons
  mockData.statsSection.statsItems.forEach(item => {
    requiredImages.add(item.backgroundImageUrl);
    requiredIcons.add(item.iconUrl);
  });
  
  // Project categories images
  mockData.projectCategories.categories.forEach(category => {
    requiredImages.add(category.backgroundImageUrl);
  });

  // Upload images
  for (const imageFile of requiredImages) {
    const filePath = path.join(imagesPath, imageFile);
    const objectName = `images/${imageFile}`;
    uploadedAssets.images[imageFile] = await uploadFile(filePath, objectName);
  }

  // Upload icons
  for (const iconFile of requiredIcons) {
    const filePath = path.join(iconsPath, iconFile);
    const objectName = `icons/${iconFile}`;
    uploadedAssets.icons[iconFile] = await uploadFile(filePath, objectName);
  }

  return uploadedAssets;
}

async function seedDatabase(uploadedAssets) {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL');

    // Clean up existing data
    console.log('🧹 Cleaning up existing project page data...');
    await connection.execute('DELETE FROM project_categories');
    await connection.execute('DELETE FROM project_categories_data');
    await connection.execute('DELETE FROM stats_items WHERE stats_header_id IN (SELECT id FROM stats_header WHERE main_headline LIKE "%THÀNH TỰU%")');
    await connection.execute('DELETE FROM stats_header WHERE main_headline LIKE "%THÀNH TỰU%"');
    await connection.execute('DELETE FROM about_project_data');

    // Insert About Project Data
    console.log('📄 Inserting About Project data...');
    const aboutImageUrl = uploadedAssets.images[mockData.aboutProject.backgroundImageUrl];
    await connection.execute(
      `INSERT INTO about_project_data (title, subtitle, background_image_url, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [
        mockData.aboutProject.title,
        mockData.aboutProject.subtitle,
        aboutImageUrl,
        mockData.aboutProject.isActive
      ]
    );

    // Insert Stats Header Data (for project page stats)
    console.log('📊 Inserting Stats Header data...');
    const [statsHeaderResult] = await connection.execute(
      `INSERT INTO stats_header (main_headline, sub_headline, description, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [
        mockData.statsSection.mainHeadline,
        mockData.statsSection.subHeadline,
        mockData.statsSection.description,
        true
      ]
    );

    const statsHeaderId = statsHeaderResult.insertId;

    // Insert Stats Items
    console.log('📈 Inserting Stats Items...');
    for (const item of mockData.statsSection.statsItems) {
      const backgroundImageUrl = uploadedAssets.images[item.backgroundImageUrl];
      const iconUrl = uploadedAssets.icons[item.iconUrl];
      
      await connection.execute(
        `INSERT INTO stats_items (
          stats_header_id, icon_name, icon_url, target_value, label, suffix, 
          description, background_image_url, category, display_order, is_active, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          statsHeaderId,
          item.iconName,
          iconUrl,
          item.targetValue,
          item.label,
          item.suffix,
          item.description,
          backgroundImageUrl,
          item.category,
          item.displayOrder,
          true
        ]
      );
    }

    // Insert Project Categories Data
    console.log('🏗️ Inserting Project Categories data...');
    const [categoriesDataResult] = await connection.execute(
      `INSERT INTO project_categories_data (main_title, subtitle, description, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [
        mockData.projectCategories.mainTitle,
        mockData.projectCategories.subtitle,
        mockData.projectCategories.description,
        true
      ]
    );

    const categoriesDataId = categoriesDataResult.insertId;

    // Insert Project Categories
    console.log('🏠 Inserting Project Categories...');
    for (const category of mockData.projectCategories.categories) {
      const backgroundImageUrl = uploadedAssets.images[category.backgroundImageUrl];
      
      await connection.execute(
        `INSERT INTO project_categories (
          categories_data_id, category_id, title, project_count, background_image_url, 
          navigation_path, display_order, is_active, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          categoriesDataId,
          category.categoryId,
          category.title,
          category.projectCount,
          backgroundImageUrl,
          category.navigationPath,
          category.displayOrder,
          true
        ]
      );
    }

    console.log('✅ Database seeded successfully!');
    
    // Print summary
    console.log('\n📋 Seed Summary:');
    console.log(`   📄 About Project: 1 record`);
    console.log(`   📊 Stats Section: 1 record`);
    console.log(`   📈 Stats Items: ${mockData.statsSection.statsItems.length} records`);
    console.log(`   🏗️ Project Categories Data: 1 record`);
    console.log(`   🏠 Project Categories: ${mockData.projectCategories.categories.length} records`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function main() {
  try {
    console.log('🚀 Starting Project Page seeding from mock data...');
    console.log('📂 Assets path:', assetsBasePath);
    
    // Check if assets folders exist
    if (!fs.existsSync(imagesPath)) {
      console.error(`❌ Images folder not found: ${imagesPath}`);
      process.exit(1);
    }
    
    if (!fs.existsSync(iconsPath)) {
      console.error(`❌ Icons folder not found: ${iconsPath}`);
      process.exit(1);
    }
    
    // Initialize MinIO bucket
    await initializeBucket();
    
    // Upload required assets
    const uploadedAssets = await uploadRequiredAssets();
    
    // Seed database
    await seedDatabase(uploadedAssets);
    
    console.log('🎉 Project Page seeding completed successfully!');
    console.log('🔗 You can now access the seeded data via the API endpoints');
    console.log('   📄 GET /api/v1/projectpage/about-project');
    console.log('   📊 GET /api/v1/projectpage/stats-section');
    console.log('   🏗️ GET /api/v1/projectpage/project-categories');
    console.log('   🌐 GET /api/v1/projectpage (all data)');
    
  } catch (error) {
    console.error('💥 Seeding process failed:', error);
    process.exit(1);
  }
}

// Add this script to package.json scripts
console.log('💡 To add this to your package.json scripts:');
console.log('   "seed:project-page": "node scripts/seedProjectPageFromMock.js"');

main(); 