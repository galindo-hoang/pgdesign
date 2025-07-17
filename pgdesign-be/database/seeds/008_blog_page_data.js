/**
 * Blog Page Data Seed
 * Seeds all mock data from blogPageService.ts into MySQL database
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries (in reverse order due to foreign keys)
  await knex('blog_process_steps').del();
  await knex('blog_important_factors').del();
  await knex('blog_design_styles').del();
  await knex('blog_consultation_cta').del();
  await knex('blog_content_sections').del();
  await knex('blog_project_items').del();
  await knex('blog_hero_data').del();

  // ========== BLOG HERO DATA ==========
  
  await knex('blog_hero_data').insert([
    {
      id: 1,
      title: 'PG DESIGN - THIẾT KẾ NỘI THẤT PHÒNG KHÁCH ĐẸP, HIỆN ĐẠI TẠI TP.HCM',
      subtitle: 'Khám phá bộ sưu tập những không gian phòng khách được thiết kế tinh tế, kết hợp hoàn hảo giữa thẩm mỹ và công năng sử dụng.',
      is_active: true,
      display_order: 1
    }
  ]);

  // ========== BLOG PROJECT ITEMS ==========
  
  await knex('blog_project_items').insert([
    {
      id: 1,
      project_id: '1',
      title: 'Thiết kế nội thất Phòng khách Nhà Phố Hiện Đại – Quận 2',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg',
      area: '20 m²',
      style: 'Phong cách hiện đại',
      client_name: 'Anh Tú',
      location: 'Quận 2',
      is_active: true,
      display_order: 1
    },
    {
      id: 2,
      project_id: '2',
      title: 'Thiết kế nội thất Phòng khách Biệt Thự Cổ Điển – Quận 7',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg',
      area: '35 m²',
      style: 'Phong cách cổ điển',
      client_name: 'Chị Lan',
      location: 'Quận 7',
      is_active: true,
      display_order: 2
    },
    {
      id: 3,
      project_id: '3',
      title: 'Thiết kế nội thất Phòng khách Căn Hộ Minimalist – Quận 1',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg',
      area: '18 m²',
      style: 'Phong cách tối giản',
      client_name: 'Anh Nam',
      location: 'Quận 1',
      is_active: true,
      display_order: 3
    },
    {
      id: 4,
      project_id: '4',
      title: 'Thiết kế nội thất Phòng khách Nhà Vườn Indochine – Quận 3',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg',
      area: '28 m²',
      style: 'Phong cách Indochine',
      client_name: 'Chị Hoa',
      location: 'Quận 3',
      is_active: true,
      display_order: 4
    },
    {
      id: 5,
      project_id: '5',
      title: 'Thiết kế nội thất Phòng khách Penthouse Luxury – Quận 2',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg',
      area: '45 m²',
      style: 'Phong cách sang trọng',
      client_name: 'Anh Minh',
      location: 'Quận 2',
      is_active: true,
      display_order: 5
    },
    {
      id: 6,
      project_id: '6',
      title: 'Thiết kế nội thất Phòng khách Studio Scandinavian – Quận 5',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg',
      area: '15 m²',
      style: 'Phong cách Bắc Âu',
      client_name: 'Chị Mai',
      location: 'Quận 5',
      is_active: true,
      display_order: 6
    },
    {
      id: 7,
      project_id: '7',
      title: 'Thiết kế nội thất Phòng khách Duplex Modern – Quận 4',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg',
      area: '32 m²',
      style: 'Phong cách hiện đại',
      client_name: 'Anh Hoàng',
      location: 'Quận 4',
      is_active: true,
      display_order: 7
    },
    {
      id: 8,
      project_id: '8',
      title: 'Thiết kế nội thất Phòng khách Townhouse Vintage – Quận 6',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg',
      area: '24 m²',
      style: 'Phong cách vintage',
      client_name: 'Chị Thúy',
      location: 'Quận 6',
      is_active: true,
      display_order: 8
    }
  ]);

  // ========== BLOG CONTENT SECTIONS ==========
  
  await knex('blog_content_sections').insert([
    {
      id: 1,
      main_title: 'PG DESIGN - THIẾT KẾ NỘI THẤT PHÒNG KHÁCH ĐẸP, HIỆN ĐẠI TẠI TP.HCM',
      intro_text: 'Phòng khách là không gian trung tâm của ngôi nhà, nơi gia đình quây quần và đón tiếp khách. Một phòng khách được thiết kế đẹp không chỉ tạo ấn tượng mạnh mẽ với khách ghé thăm mà còn mang lại cảm giác thoải mái, ấm cúng cho chính gia chủ.',
      design_styles_title: 'Các phong cách thiết kế phòng khách đẹp',
      factors_title: 'Những yếu tố quan trọng khi thiết kế nội thất phòng khách',
      process_title: 'Quy trình thiết kế nội thất phòng khách chuyên nghiệp',
      is_active: true,
      display_order: 1
    }
  ]);

  // ========== BLOG DESIGN STYLES ==========
  
  await knex('blog_design_styles').insert([
    {
      id: 1,
      content_section_id: 1,
      name: 'Phong cách hiện đại (Modern)',
      description: 'Đặc trưng bởi những đường nét sạch sẽ, màu sắc trung tính và sử dụng vật liệu công nghiệp như thép, kính, beton.',
      display_order: 1,
      is_active: true
    },
    {
      id: 2,
      content_section_id: 1,
      name: 'Phong cách cổ điển (Classical)',
      description: 'Mang đậm nét truyền thống với những chi tiết trang trí tinh xảo, màu sắc ấm áp và vật liệu tự nhiên.',
      display_order: 2,
      is_active: true
    },
    {
      id: 3,
      content_section_id: 1,
      name: 'Phong cách tối giản (Minimalist)',
      description: '"Less is more" - ít đồ đạc nhưng mỗi món đều có ý nghĩa và công năng rõ ràng.',
      display_order: 3,
      is_active: true
    },
    {
      id: 4,
      content_section_id: 1,
      name: 'Phong cách Indochine',
      description: 'Kết hợp tinh tế giữa văn hóa Á Đông và kiến trúc Pháp, tạo nên vẻ đẹp hoài cổ độc đáo.',
      display_order: 4,
      is_active: true
    }
  ]);

  // ========== BLOG IMPORTANT FACTORS ==========
  
  await knex('blog_important_factors').insert([
    {
      id: 1,
      content_section_id: 1,
      title: 'Tối ưu không gian',
      description: 'Bố trí nội thất hợp lý để tạo động tuyến thuận tiện, không gian thoáng đãng và dễ dàng di chuyển.',
      display_order: 1,
      is_active: true
    },
    {
      id: 2,
      content_section_id: 1,
      title: 'Ánh sáng và thông gió',
      description: 'Tận dụng ánh sáng tự nhiên, kết hợp chiếu sáng nhân tạo và đảm bảo thông gió tốt cho không gian.',
      display_order: 2,
      is_active: true
    },
    {
      id: 3,
      content_section_id: 1,
      title: 'Màu sắc và vật liệu',
      description: 'Lựa chọn bảng màu hài hòa, vật liệu chất lượng phù hợp với phong cách và sở thích của gia chủ.',
      display_order: 3,
      is_active: true
    },
    {
      id: 4,
      content_section_id: 1,
      title: 'Công năng và thẩm mỹ',
      description: 'Cân bằng giữa tính thực tiễn và vẻ đẹp, đảm bảo không gian vừa đẹp vừa tiện dụng trong sinh hoạt hằng ngày.',
      display_order: 4,
      is_active: true
    }
  ]);

  // ========== BLOG PROCESS STEPS ==========
  
  await knex('blog_process_steps').insert([
    {
      id: 1,
      content_section_id: 1,
      step_number: '01',
      title: 'Khảo sát và tư vấn',
      description: 'Đo đạc không gian, tìm hiểu nhu cầu và sở thích của khách hàng.',
      display_order: 1,
      is_active: true
    },
    {
      id: 2,
      content_section_id: 1,
      step_number: '02',
      title: 'Thiết kế concept',
      description: 'Lên ý tưởng thiết kế tổng thể, chọn phong cách và bảng màu.',
      display_order: 2,
      is_active: true
    },
    {
      id: 3,
      content_section_id: 1,
      step_number: '03',
      title: 'Thiết kế chi tiết',
      description: 'Hoàn thiện bản vẽ 2D, 3D và danh sách vật tư cụ thể.',
      display_order: 3,
      is_active: true
    },
    {
      id: 4,
      content_section_id: 1,
      step_number: '04',
      title: 'Thi công và giám sát',
      description: 'Triển khai thi công theo đúng thiết kế và giám sát chất lượng.',
      display_order: 4,
      is_active: true
    }
  ]);

  // ========== BLOG CONSULTATION CTA ==========
  
  await knex('blog_consultation_cta').insert([
    {
      id: 1,
      title: 'NHẬN TƯ VẤN THIẾT KẾ NỘI THẤT',
      description: 'Bạn đang muốn thiết kế không gian phòng khách đẹp và hiện đại? Hãy liên hệ với PG Design để được tư vấn miễn phí và nhận báo giá chi tiết.',
      features: JSON.stringify(['Tư vấn miễn phí', 'Thiết kế 3D chân thực', 'Thi công chuyên nghiệp']),
      button_text: 'ĐĂNG KÝ TƯ VẤN NGAY',
      image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg',
      is_active: true,
      display_order: 1
    }
  ]);

  console.log('✅ Blog page seed data inserted successfully!');
}; 