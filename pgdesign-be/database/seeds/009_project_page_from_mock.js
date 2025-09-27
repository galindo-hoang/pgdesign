/**
 * Project Page Seed Data - Based on Frontend Mock Data
 * This seed file uses the same data structure as the projectPageService.ts mock data
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

// Mock data structure from frontend projectPageService.ts
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
        iconUrl: 'http://localhost:9000/pgdesign-assets/icons/experience-icon.svg',
        targetValue: 5,
        label: 'Kinh nghiệm',
        suffix: '+ năm',
        description: 'Kinh nghiệm',
        category: 'experience',
        displayOrder: 0
      },
      {
        iconName: 'customer-icon',
        iconUrl: 'http://localhost:9000/pgdesign-assets/icons/customer-icon.svg',
        targetValue: 500,
        label: 'Khách hàng',
        suffix: '+',
        description: 'Tin tưởng & hài lòng',
        category: 'customers',
        displayOrder: 1
      },
      {
        iconName: 'design-icon',
        iconUrl: 'http://localhost:9000/pgdesign-assets/icons/design-icon.svg',
        targetValue: 450,
        label: 'Dự án',
        suffix: '+',
        description: 'Thiết kế hoàn thành',
        category: 'projects',
        displayOrder: 2
      },
      {
        iconName: 'building-icon',
        iconUrl: 'http://localhost:9000/pgdesign-assets/icons/building-icon.svg',
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

exports.seed = async function(knex) {
  console.log('🌱 Seeding Project Page data from frontend mock...');

  // Clean up existing data
  console.log('🧹 Cleaning up existing project page data...');
  await knex('project_categories').del();
  await knex('project_categories_data').del();
  // Clean up project page specific stats (not all stats)
  await knex('stats_items').whereIn('stats_header_id', 
    knex('stats_header').select('id').where('main_headline', 'like', '%THÀNH TỰU%')
  ).del();
  await knex('stats_header').where('main_headline', 'like', '%THÀNH TỰU%').del();
  await knex('about_project_data').del();

  // Insert About Project Data
  console.log('📄 Inserting About Project data...');
  await knex('about_project_data').insert({
    title: mockData.aboutProject.title,
    subtitle: mockData.aboutProject.subtitle,
    background_image_url: mockData.aboutProject.backgroundImageUrl,
    is_active: mockData.aboutProject.isActive,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Insert Stats Header Data (for project page stats)
  console.log('📊 Inserting Stats Header data...');
  const [statsHeaderId] = await knex('stats_header').insert({
    main_headline: mockData.statsSection.mainHeadline,
    sub_headline: mockData.statsSection.subHeadline,
    description: mockData.statsSection.description,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Insert Stats Items
  console.log('📈 Inserting Stats Items...');
  const statsItemsData = mockData.statsSection.statsItems.map(item => ({
    stats_header_id: statsHeaderId,
    icon_name: item.iconName,
    icon_url: item.iconUrl,
    target_value: item.targetValue,
    label: item.label,
    suffix: item.suffix,
    description: item.description,
    background_image_url: item.backgroundImageUrl,
    category: item.category,
    display_order: item.displayOrder,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }));
  
  await knex('stats_items').insert(statsItemsData);

  // Insert Project Categories Data
  console.log('🏗️ Inserting Project Categories data...');
  const [categoriesDataId] = await knex('project_categories_data').insert({
    main_title: mockData.projectCategories.mainTitle,
    subtitle: mockData.projectCategories.subtitle,
    description: mockData.projectCategories.description,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Insert Project Categories
  console.log('🏠 Inserting Project Categories...');
  const categoriesData = mockData.projectCategories.categories.map(category => ({
    categories_data_id: categoriesDataId,
    category_id: category.categoryId,
    title: category.title,
    project_count: category.projectCount,
    background_image_url: category.backgroundImageUrl,
    navigation_path: category.navigationPath,
    display_order: category.displayOrder,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }));
  
  await knex('project_categories').insert(categoriesData);

  console.log('✅ Project page seed data from frontend mock inserted successfully!');
  console.log('📋 Seed Summary:');
  console.log(`   📄 About Project: 1 record`);
  console.log(`   📊 Stats Header: 1 record`);
  console.log(`   📈 Stats Items: ${mockData.statsSection.statsItems.length} records`);
  console.log(`   🏗️ Project Categories Data: 1 record`);
  console.log(`   🏠 Project Categories: ${mockData.projectCategories.categories.length} records`);
  console.log('');
  console.log('🔗 Test the seeded data:');
  console.log('   📄 GET /api/v1/projectpage/about-project');
  console.log('   📊 GET /api/v1/projectpage/stats-section');
  console.log('   🏗️ GET /api/v1/projectpage/project-categories');
  console.log('   🌐 GET /api/v1/projectpage (all data)');
}; 