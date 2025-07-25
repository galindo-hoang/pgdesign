/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Clean up existing data
  await knex('project_categories').del();
  await knex('project_categories_data').del();
  await knex('stats_items').del();
  await knex('stats_section_data').del();
  await knex('about_project_data').del();

  // About Project Data
  await knex('about_project_data').insert({
    title: 'Dự án',
    subtitle: 'PG DESIGN',
    background_image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Stats Section Data
  const [statsSectionId] = await knex('stats_section_data').insert({
    main_headline: 'THÀNH TỰU CỦA CHÚNG TÔI',
    sub_headline: 'Những con số ấn tượng',
    description: 'Với nhiều năm kinh nghiệm trong lĩnh vực thiết kế kiến trúc và nội thất, chúng tôi tự hào mang đến những giải pháp tối ưu cho mọi không gian sống.',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Stats Items
  await knex('stats_items').insert([
    {
      stats_section_id: statsSectionId,
      icon_name: 'experience-icon',
      icon_url: 'http://localhost:9000/pgdesign-assets/icons/experience-icon.svg',
      target_value: 5,
      label: 'Kinh nghiệm',
      suffix: '+ năm',
      description: 'Kinh nghiệm',
      background_image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-1.png',
      category: 'experience',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      stats_section_id: statsSectionId,
      icon_name: 'customer-icon',
      icon_url: 'http://localhost:9000/pgdesign-assets/icons/customer-icon.svg',
      target_value: 500,
      label: 'Khách hàng',
      suffix: '+',
      description: 'Tin tưởng & hài lòng',
      background_image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-2.png',
      category: 'customers',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      stats_section_id: statsSectionId,
      icon_name: 'design-icon',
      icon_url: 'http://localhost:9000/pgdesign-assets/icons/design-icon.svg',
      target_value: 450,
      label: 'Dự án',
      suffix: '+',
      description: 'Thiết kế hoàn thành',
      background_image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-3.png',
      category: 'projects',
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      stats_section_id: statsSectionId,
      icon_name: 'building-icon',
      icon_url: 'http://localhost:9000/pgdesign-assets/icons/building-icon.svg',
      target_value: 98,
      label: 'Chất lượng',
      suffix: '%',
      description: 'Cam kết hoàn hảo',
      background_image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-4.png',
      category: 'quality',
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Project Categories Data
  const [categoriesDataId] = await knex('project_categories_data').insert({
    main_title: 'DANH MỤC DỰ ÁN',
    subtitle: 'KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ',
    description: 'Từ những căn nhà phố hiện đại đến những biệt thự sang trọng, từ không gian nội thất tinh tế đến những ngôi nhà vườn xanh mát - chúng tôi mang đến giải pháp thiết kế toàn diện cho mọi nhu cầu.',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Project Categories
  await knex('project_categories').insert([
    {
      categories_data_id: categoriesDataId,
      category_id: 'house-normal',
      title: 'NHÀ PHỐ',
      project_count: 45,
      background_image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-1.png',
      navigation_path: '/projects/house-normal',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      categories_data_id: categoriesDataId,
      category_id: 'house-full',
      title: 'Xây nhà trọn gói',
      project_count: 32,
      background_image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-2.png',
      navigation_path: '/projects/house-full',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      categories_data_id: categoriesDataId,
      category_id: 'house-rough',
      title: 'Xây dựng phần thô',
      project_count: 28,
      background_image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-3.png',
      navigation_path: '/projects/house-rough',
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      categories_data_id: categoriesDataId,
      category_id: 'house-interior',
      title: 'Thiết kế và thi công nội thất',
      project_count: 50,
      background_image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-4.png',
      navigation_path: '/projects/house-interior',
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  console.log('✅ Project page seed data inserted successfully!');
}; 