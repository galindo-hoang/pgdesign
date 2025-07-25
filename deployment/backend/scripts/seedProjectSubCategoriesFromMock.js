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

// Mock data extracted from projectCategoryPageService.ts
const mockSubCategoriesData = {
  "house-normal": [
    {
      id: "nha-ong",
      title: "Nhà Ống",
      description: "Thiết kế cho mặt tiền hẹp, chiều sâu dài, tận dụng tối đa diện tích.",
      heroImageUrl: "diary-image-1.png",
      displayOrder: 0
    },
    {
      id: "nha-lien-ke",
      title: "Nhà Liền Kề",
      description: "Nhà phố trong khu quy hoạch, kiến trúc đồng bộ và hiện đại.",
      heroImageUrl: "diary-image-1.png",
      displayOrder: 1
    },
    {
      id: "house-normal-san-vuon",
      title: "Nhà Phố Có Sân Vườn",
      description: "Kết hợp không gian xanh, tạo sự thông thoáng và gần gũi thiên nhiên.",
      heroImageUrl: "diary-image-1.png",
      displayOrder: 2
    },
    {
      id: "shophouse",
      title: "Shophouse",
      description: "Tầng trệt kinh doanh, tầng trên ở, tối ưu hóa mặt tiền thu hút khách hàng.",
      heroImageUrl: "diary-image-1.png",
      displayOrder: 3
    }
  ],
  "house-full": [
    {
      id: "resort-villa",
      title: "Resort Garden Houses",
      description: "Diện tích lớn, nhiều tiện ích cao cấp như hồ bơi, sân tennis.",
      heroImageUrl: "diary-image-2.png",
      displayOrder: 0
    },
    {
      id: "mini-garden",
      title: "Nhà Vườn Mini",
      description: "Diện tích vừa phải, vẫn có không gian xanh và cảnh quan nhỏ.",
      heroImageUrl: "diary-image-2.png",
      displayOrder: 1
    }
  ],
  "house-rough": [
    {
      id: "house-rough-don-lap",
      title: "Biệt Thự Đơn Lập",
      description: "Hoàn toàn độc lập, 4 mặt thoáng, tối đa hóa sự riêng tư.",
      heroImageUrl: "diary-image-3.png",
      displayOrder: 0
    },
    {
      id: "house-rough-song-lap",
      title: "Biệt Thự Song Lập",
      description: "Hai biệt thự kiến trúc đối xứng, chung một bức tường.",
      heroImageUrl: "diary-image-3.png",
      displayOrder: 1
    }
  ],
  "house-interior": [
    {
      id: "mai-thai",
      title: "Nhà Cấp 4 Mái Thái",
      description: "Mái dốc lớn hình chóp hoặc chữ A, đẹp mắt, thoát nước tốt.",
      heroImageUrl: "diary-image-4.png",
      displayOrder: 0
    },
    {
      id: "mai-nhat",
      title: "Nhà Cấp 4 Mái Nhật",
      description: "Độ dốc ít hơn mái Thái, tạo vẻ trang nghiêm, phù hợp phong cách hiện đại.",
      heroImageUrl: "diary-image-4.png",
      displayOrder: 1
    },
    {
      id: "mai-bang",
      title: "Nhà Cấp 4 Mái Bằng",
      description: "Mái phẳng, có thể tận dụng không gian mái, kiến trúc vững chắc, hiện đại.",
      heroImageUrl: "diary-image-4.png",
      displayOrder: 2
    },
    {
      id: "gac-lung",
      title: "Nhà Cấp 4 Gác Lửng",
      description: "Có thêm không gian gác lửng để tối ưu diện tích sử dụng.",
      heroImageUrl: "diary-image-4.png",
      displayOrder: 3
    }
  ]
};

// File paths
const assetsBasePath = '../../src/assets';
const imagesPath = path.join(__dirname, assetsBasePath, 'images');

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

async function uploadRequiredImages() {
  const uploadedImages = {};

  console.log('📸 Uploading required hero images...');
  
  // Collect all required hero images
  const requiredImages = new Set();
  Object.values(mockSubCategoriesData).forEach(subCategories => {
    subCategories.forEach(subCategory => {
      requiredImages.add(subCategory.heroImageUrl);
    });
  });

  // Upload images
  for (const imageFile of requiredImages) {
    const filePath = path.join(imagesPath, imageFile);
    const objectName = `images/${imageFile}`;
    uploadedImages[imageFile] = await uploadFile(filePath, objectName);
  }

  return uploadedImages;
}

async function seedDatabase(uploadedImages) {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL');

    // Get existing project categories mapping
    const [existingCategories] = await connection.execute(`
      SELECT id, category_id FROM project_categories WHERE is_active = true
    `);
    
    const categoryMapping = {};
    existingCategories.forEach(cat => {
      categoryMapping[cat.category_id] = cat.id;
    });

    console.log('📋 Found project categories:', categoryMapping);

    // Clean up existing subcategories
    console.log('🧹 Cleaning up existing subcategories...');
    await connection.execute('DELETE FROM project_sub_categories');

    let totalSubCategories = 0;

    // Seed subcategories for each category
    for (const [categoryId, subCategories] of Object.entries(mockSubCategoriesData)) {
      const projectCategoryId = categoryMapping[categoryId];
      
      if (!projectCategoryId) {
        console.warn(`⚠️  Category '${categoryId}' not found in project_categories table`);
        continue;
      }

      console.log(`🏗️ Inserting subcategories for ${categoryId}...`);

      for (const subCategory of subCategories) {
        const heroImageUrl = uploadedImages[subCategory.heroImageUrl];
        
        await connection.execute(
          `INSERT INTO project_sub_categories (
            project_category_id, sub_category_id, title, description, 
            hero_image_url, display_order, project_count, is_active, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            projectCategoryId,
            subCategory.id,
            subCategory.title,
            subCategory.description,
            heroImageUrl,
            subCategory.displayOrder,
            4, // Default project count (from mock data each has 4 projects)
            true
          ]
        );

        totalSubCategories++;
        console.log(`  ✅ ${subCategory.title}`);
      }
    }

    console.log(`✅ Database seeded successfully! Total subcategories: ${totalSubCategories}`);
    
    // Print summary
    console.log('\n📋 Seed Summary:');
    Object.entries(mockSubCategoriesData).forEach(([categoryId, subCategories]) => {
      console.log(`   🏗️ ${categoryId}: ${subCategories.length} subcategories`);
    });
    
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
    console.log('🚀 Starting Project Sub-Categories seeding from mock data...');
    console.log('📂 Assets path:', assetsBasePath);
    
    // Check if assets folder exists
    if (!fs.existsSync(imagesPath)) {
      console.error(`❌ Images folder not found: ${imagesPath}`);
      process.exit(1);
    }
    
    // Initialize MinIO bucket
    await initializeBucket();
    
    // Upload required images
    const uploadedImages = await uploadRequiredImages();
    
    // Seed database
    await seedDatabase(uploadedImages);
    
    console.log('🎉 Project Sub-Categories seeding completed successfully!');
    console.log('🔗 Relationships created:');
    console.log('   📊 project_categories → project_sub_categories (one-to-many)');
    console.log('   📋 project_sub_categories → project_details (one-to-many, ready for use)');
    console.log('');
    console.log('📝 Next steps:');
    console.log('   - Update project_details records to reference project_sub_categories');
    console.log('   - Test API endpoints for subcategories');
    console.log('   - Create backend models and controllers for subcategories');
    
  } catch (error) {
    console.error('💥 Seeding process failed:', error);
    process.exit(1);
  }
}

main(); 