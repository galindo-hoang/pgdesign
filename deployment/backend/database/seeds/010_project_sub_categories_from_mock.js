/**
 * Project Sub-Categories Seed Data - Based on Frontend Mock Data
 * This seed file uses the same data structure as the projectCategoryPageService.ts mock data
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// Mock subcategories data extracted from projectCategoryPageService.ts
const mockSubCategoriesData = {
  "house-normal": [
    {
      id: "nha-ong",
      title: "Nhà Ống",
      description: "Thiết kế cho mặt tiền hẹp, chiều sâu dài, tận dụng tối đa diện tích.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-1.png",
      displayOrder: 0
    },
    {
      id: "nha-lien-ke",
      title: "Nhà Liền Kề",
      description: "Nhà phố trong khu quy hoạch, kiến trúc đồng bộ và hiện đại.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-1.png",
      displayOrder: 1
    },
    {
      id: "house-normal-san-vuon",
      title: "Nhà Phố Có Sân Vườn",
      description: "Kết hợp không gian xanh, tạo sự thông thoáng và gần gũi thiên nhiên.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-1.png",
      displayOrder: 2
    },
    {
      id: "shophouse",
      title: "Shophouse",
      description: "Tầng trệt kinh doanh, tầng trên ở, tối ưu hóa mặt tiền thu hút khách hàng.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-1.png",
      displayOrder: 3
    }
  ],
  "house-full": [
    {
      id: "resort-villa",
      title: "Resort Garden Houses",
      description: "Diện tích lớn, nhiều tiện ích cao cấp như hồ bơi, sân tennis.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-2.png",
      displayOrder: 0
    },
    {
      id: "mini-garden",
      title: "Nhà Vườn Mini",
      description: "Diện tích vừa phải, vẫn có không gian xanh và cảnh quan nhỏ.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-2.png",
      displayOrder: 1
    }
  ],
  "house-rough": [
    {
      id: "house-rough-don-lap",
      title: "Biệt Thự Đơn Lập",
      description: "Hoàn toàn độc lập, 4 mặt thoáng, tối đa hóa sự riêng tư.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-3.png",
      displayOrder: 0
    },
    {
      id: "house-rough-song-lap",
      title: "Biệt Thự Song Lập",
      description: "Hai biệt thự kiến trúc đối xứng, chung một bức tường.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-3.png",
      displayOrder: 1
    }
  ],
  "house-interior": [
    {
      id: "mai-thai",
      title: "Nhà Cấp 4 Mái Thái",
      description: "Mái dốc lớn hình chóp hoặc chữ A, đẹp mắt, thoát nước tốt.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-4.png",
      displayOrder: 0
    },
    {
      id: "mai-nhat",
      title: "Nhà Cấp 4 Mái Nhật",
      description: "Độ dốc ít hơn mái Thái, tạo vẻ trang nghiêm, phù hợp phong cách hiện đại.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-4.png",
      displayOrder: 1
    },
    {
      id: "mai-bang",
      title: "Nhà Cấp 4 Mái Bằng",
      description: "Mái phẳng, có thể tận dụng không gian mái, kiến trúc vững chắc, hiện đại.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-4.png",
      displayOrder: 2
    },
    {
      id: "gac-lung",
      title: "Nhà Cấp 4 Gác Lửng",
      description: "Có thêm không gian gác lửng để tối ưu diện tích sử dụng.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-4.png",
      displayOrder: 3
    }
  ]
};

exports.seed = async function(knex) {
  console.log('🌱 Seeding Project Sub-Categories data from frontend mock...');

  // Get existing project categories mapping
  const existingCategories = await knex('project_categories')
    .select('id', 'category_id')
    .where('is_active', true);
  
  const categoryMapping = {};
  existingCategories.forEach(cat => {
    categoryMapping[cat.category_id] = cat.id;
  });

  console.log('📋 Found project categories:', categoryMapping);

  // Clean up existing subcategories
  console.log('🧹 Cleaning up existing subcategories...');
  await knex('project_sub_categories').del();

  let totalSubCategories = 0;

  // Seed subcategories for each category
  for (const [categoryId, subCategories] of Object.entries(mockSubCategoriesData)) {
    const projectCategoryId = categoryMapping[categoryId];
    
    if (!projectCategoryId) {
      console.warn(`⚠️  Category '${categoryId}' not found in project_categories table`);
      continue;
    }

    console.log(`🏗️ Inserting subcategories for ${categoryId}...`);

    const subCategoriesData = subCategories.map(subCategory => ({
      project_category_id: projectCategoryId,
      sub_category_id: subCategory.id,
      title: subCategory.title,
      description: subCategory.description,
      hero_image_url: subCategory.heroImageUrl,
      display_order: subCategory.displayOrder,
      project_count: 4, // Default project count (from mock data each has 4 projects)
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await knex('project_sub_categories').insert(subCategoriesData);
    
    totalSubCategories += subCategoriesData.length;
    subCategories.forEach(subCategory => {
      console.log(`  ✅ ${subCategory.title}`);
    });
  }

  console.log(`✅ Project sub-categories seed data from frontend mock inserted successfully!`);
  console.log('📋 Seed Summary:');
  Object.entries(mockSubCategoriesData).forEach(([categoryId, subCategories]) => {
    console.log(`   🏗️ ${categoryId}: ${subCategories.length} subcategories`);
  });
  console.log(`   📊 Total: ${totalSubCategories} subcategories`);
  console.log('');
  console.log('🔗 Relationships established:');
  console.log('   📊 project_categories → project_sub_categories (one-to-many)');
  console.log('   📋 project_sub_categories → project_details (one-to-many, ready for use)');
}; 