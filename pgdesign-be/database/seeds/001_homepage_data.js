exports.seed = async function(knex) {
  // Clear existing data
  await knex('hero_images').del();
  await knex('hero_data').del();
  await knex('about_data').del();
  await knex('image_slider_data').del();
  await knex('stats_items').del();
  await knex('stats_header').del();
  await knex('solution_items').del();
  await knex('solution_header').del();

  // Insert Hero data
  const [heroId] = await knex('hero_data').insert({
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Insert Hero images
  await knex('hero_images').insert([
    {
      hero_id: heroId,
      image_url: '/images/thumb-intro.png',
      image_alt: 'PG Design Hero Image 1',
      display_order: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      hero_id: heroId,
      image_url: '/images/diary-image-1.png',
      image_alt: 'PG Design Hero Image 2',
      display_order: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      hero_id: heroId,
      image_url: '/images/diary-image-2.png',
      image_alt: 'PG Design Hero Image 3',
      display_order: 2,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Insert About data
  await knex('about_data').insert({
    headline: 'MỖI THIẾT KẾ LÀ MỘT CÂU CHUYỆN',
    sub_headline: 'MỖI CÔNG TRÌNH LÀ MỘT DẤU ẤN',
    description: 'Thành lập từ năm 2022, PG là đội ngũ kiến trúc sư trẻ đầy đam mê và nhiệt huyết, hoạt động chuyên sâu trong lĩnh vực Kiến trúc - Xây dựng - Nội thất. Chúng tôi mang đến giải pháp toàn diện từ thiết kế ý tưởng đến thi công hoàn thiện, giúp khách hàng tối ưu không gian sống, tiết kiệm thời gian và chi phí, nhưng vẫn đảm bảo thẩm mỹ và công năng.',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Insert Image Slider data
  await knex('image_slider_data').insert([
    {
      image_url: '/images/diary-image-1.png',
      image_alt: 'NHÀ ANH TRẠCH',
      title: 'NHÀ ANH TRẠCH',
      subtitle: 'Thi công nội thất nhà phố',
      size: '180m2',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      image_url: '/images/diary-image-2.png',
      image_alt: 'ANH MỸ - OPAL GARDEN',
      title: 'ANH MỸ - OPAL GARDEN',
      subtitle: 'Thi công nội thất căn hộ',
      size: '180m2',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      image_url: '/images/diary-image-3.png',
      image_alt: 'SKY LINKED VILLA',
      title: 'SKY LINKED VILLA',
      subtitle: 'Thi công nội thất biệt thự',
      size: '180m2',
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Insert Stats header
  const [statsHeaderId] = await knex('stats_header').insert({
    main_headline: 'THÀNH TỰU CỦA CHÚNG TÔI',
    sub_headline: 'Những con số ấn tượng',
    description: 'Với nhiều năm kinh nghiệm trong lĩnh vực thiết kế kiến trúc và nội thất, chúng tôi tự hào mang đến những giải pháp tối ưu cho mọi không gian sống.',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Insert Stats items
  await knex('stats_items').insert([
    {
      stats_header_id: statsHeaderId,
      icon_name: 'experience-icon',
      target_value: 5,
      label: 'Kinh nghiệm',
      suffix: '+ năm',
      description: 'Kinh nghiệm',
      background_image_url: '/images/diary-image-1.png',
      category: 'experience',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      stats_header_id: statsHeaderId,
      icon_name: 'customer-icon',
      target_value: 500,
      label: 'Khách hàng',
      suffix: '+',
      description: 'Tin tưởng & hài lòng',
      background_image_url: '/images/diary-image-2.png',
      category: 'customers',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      stats_header_id: statsHeaderId,
      icon_name: 'design-icon',
      target_value: 450,
      label: 'Dự án',
      suffix: '+',
      description: 'Thiết kế hoàn thành',
      background_image_url: '/images/diary-image-3.png',
      category: 'projects',
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      stats_header_id: statsHeaderId,
      icon_name: 'building-icon',
      target_value: 98,
      label: 'Chất lượng',
      suffix: '%',
      description: 'Cam kết hoàn hảo',
      background_image_url: '/images/diary-image-4.png',
      category: 'quality',
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Insert Solution header
  const [solutionHeaderId] = await knex('solution_header').insert({
    main_headline: 'GIẢI PHÁP KHÔNG GIAN',
    sub_headline: 'DÀNH RIÊNG CHO BẠN',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Insert Solution items
  await knex('solution_items').insert([
    {
      solution_header_id: solutionHeaderId,
      image_url: '/images/diary-image-5.png',
      image_alt: 'Thiết kế kiến trúc',
      category: 'Dịch vụ',
      title: JSON.stringify(['Thiết kế kiến trúc']),
      link: '/services/architecture-design',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      solution_header_id: solutionHeaderId,
      image_url: '/images/diary-image-6.png',
      image_alt: 'Thiết kế nội thất',
      category: 'Dịch vụ',
      title: JSON.stringify(['Thiết kế nội thất']),
      link: '/services/interior-design',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      solution_header_id: solutionHeaderId,
      image_url: '/images/diary-image-7.png',
      image_alt: 'Thi công hoàn thiện',
      category: 'Dịch vụ',
      title: JSON.stringify(['Thi công hoàn thiện']),
      link: '/services/construction',
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      solution_header_id: solutionHeaderId,
      image_url: '/images/diary-image-8.png',
      image_alt: 'Thi công trọn gói',
      category: 'Dịch vụ',
      title: JSON.stringify(['Thi công trọn gói']),
      link: '/services/full-package',
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  console.log('✅ Homepage seed data inserted successfully');
}; 