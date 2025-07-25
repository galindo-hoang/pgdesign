/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Clean up existing data
  await knex('team_members').del();
  await knex('board_directors').del();
  await knex('team_data').del();
  await knex('commitment_items').del();
  await knex('commitments_data').del();
  await knex('core_values').del();
  await knex('mission_items').del();
  await knex('vision_mission_data').del();
  await knex('about_intro_data').del();

  // About Intro Data
  await knex('about_intro_data').insert({
    brand_title: 'PG DESIGN',
    brand_subtitle: 'KIẾN TẠO KHÔNG GIAN',
    identity: 'KHẲNG ĐỊNH BẢN SẮC',
    description_1: 'Là đơn vị chuyên nghiệp trong lĩnh vực thiết kế kiến trúc, nội thất và thi công trọn gói. Với đội ngũ thiết kế và thi công giàu kinh nghiệm, chúng tôi cam kết mang đến những công trình chất lượng cao, đúng tiến độ và phản ánh rõ rệt tính cách của từng khách hàng.',
    description_2: 'PG Design không chỉ tạo ra những không gian sống và làm việc thẩm mỹ, mà còn góp phần xây dựng bản sắc riêng cho mỗi công trình thông qua thiết kế cá nhân hóa và có chiều sâu, gắn liền với phong cách sống và định hướng thương hiệu của khách hàng. Đây chính là cách chúng tôi mang đến giá trị vượt lên trên vẻ đẹp bề mặt - một không gian có hồn và có ý nghĩa.',
    background_image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Vision Mission Data
  const [visionMissionId] = await knex('vision_mission_data').insert({
    image_url: 'http://localhost:9000/pgdesign-assets/images/vision-mission-section.png',
    vision_title: 'TẦM NHÌN',
    vision_paragraph_1: 'PG Design tự hào trở thành đơn vị thiết kế - thi công uy tín hàng đầu: nơi mở không gian không chỉ được đầu tư về công năng và thẩm mỹ, mà còn là nơi kiến tạo câu chuyện bằng không gian sống của người sở hữu.',
    vision_paragraph_2: 'Chúng tôi tin rằng, một không gian đẹp là không gian đặt dấu cảm xúc và đồng điệu với nhu cầu sống, từ đó nâng tầm trải nghiệm và chất lượng cuộc sống mỗi ngày.',
    mission_title: 'SỨ MỆNH',
    core_values_title: 'GIÁ TRỊ CỐT LÕI',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Mission Items
  await knex('mission_items').insert([
    {
      vision_mission_id: visionMissionId,
      item_text: 'Cung cấp các giải pháp thiết kế - thi công đồng bộ, chuyên nghiệp, đúng tiến độ tối ưu chi phí mà vẫn đảm bảo chất lượng và phong cách riêng.',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      vision_mission_id: visionMissionId,
      item_text: 'Đạt chuẩn mực thiết kế dựa trên nhu cầu, gu thẩm mỹ và mục tiêu sử dụng của từng khách hàng.',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      vision_mission_id: visionMissionId,
      item_text: 'Không ngừng sáng tạo, cập nhật xu hướng vật liệu, công nghệ và phong cách mới trong ngành thiết kế - nội thất.',
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      vision_mission_id: visionMissionId,
      item_text: 'Xây dựng mối quan hệ lâu dài với khách hàng trên nền tảng uy tín - minh bạch - tận tâm.',
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Core Values
  await knex('core_values').insert([
    {
      vision_mission_id: visionMissionId,
      title: '1. Tận tâm & Chuyên nghiệp',
      description: 'Đồng hành cùng khách hàng từ bản vẽ đầu tiên dần hoàn thiện công trình, với tinh thần trách nhiệm và thái độ tận tâm.',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      vision_mission_id: visionMissionId,
      title: '2. Sáng tạo & Cá tính',
      description: 'Không gian được thiết kế không chỉ đẹp, mà còn mang dấu ấn riêng, thể hiện rõ "chất" của người sở hữu.',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      vision_mission_id: visionMissionId,
      title: '3. Chất lượng & Hoàn hảo',
      description: 'Luôn chọn giải pháp tốt nhất, vật liệu chất lượng và thi công chỉnh chu để đạt đến sự hoàn hảo trong từng chi tiết.',
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      vision_mission_id: visionMissionId,
      title: '4. Hiệu quả & Kinh tế hợp lý',
      description: 'Tối ưu hóa chi phí mà vẫn đảm bảo tính thẩm mỹ, công năng và độ bền của công trình.',
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Commitments Data
  const [commitmentsId] = await knex('commitments_data').insert({
    title: 'CAM KẾT CỦA PG DESIGN',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Commitment Items
  await knex('commitment_items').insert([
    {
      commitments_id: commitmentsId,
      icon_name: 'direct-execution-icon',
      title: 'KHÔNG KHOÁN THẦU',
      description: 'PG Design cam kết trực tiếp đảm nhận từ khâu thiết kế đến thi công, không giao khoán cho bên thứ ba.',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      commitments_id: commitmentsId,
      icon_name: 'quality-materials-icon',
      title: 'VẬT TƯ ĐẠT CHUẨN',
      description: 'Chúng tôi sử dụng vật liệu chính hãng, rõ nguồn gốc, đảm bảo độ bền và tính thẩm mỹ cho công trình.',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      commitments_id: commitmentsId,
      icon_name: 'clear-pricing-icon',
      title: 'CHI PHÍ MINH BẠCH',
      description: 'Mọi hạng mục đều được minh bạch trong báo giá. Cam kết không để khách hàng lo lắng về chi phí phát sinh bất ngờ.',
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      commitments_id: commitmentsId,
      icon_name: 'timely-delivery-icon',
      title: 'THI CÔNG ĐÚNG TIẾN ĐỘ',
      description: 'Chúng tôi đặt uy tín lên hàng đầu, bằng việc thực hiện công trình đúng tiến độ đã thống nhất với khách hàng.',
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      commitments_id: commitmentsId,
      icon_name: 'reasonable-price-icon',
      title: 'GIÁ HỢP LÝ - TỐI ƯU NGÂN SÁCH',
      description: 'Chi phí thiết kế và thi công được tính toán hợp lý, mang lại giá trị cao nhất cho mỗi đồng đầu tư của khách hàng.',
      display_order: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      commitments_id: commitmentsId,
      icon_name: 'post-handover-warranty-icon',
      title: 'CAM KẾT BẢO HÀNH',
      description: 'Sau khi bàn giao, PG Design vẫn luôn đồng hành cùng khách hàng thông qua chính sách bảo hành chuyên nghiệp và chu đáo.',
      display_order: 5,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Team Data
  const [teamId] = await knex('team_data').insert({
    heading: 'Đội ngũ PG Design',
    description: 'Những người trẻ đầy nhiệt huyết và đam mê sáng tạo. Đội ngũ được xây dựng để đồng hành cùng bạn từ bước định hình ý tưởng, phát triển bản sắc thương hiệu cho đến quản lý toàn bộ quy trình - từ trước đến sau khi sản phẩm hoàn thiện.',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Board Directors
  await knex('board_directors').insert([
    {
      team_id: teamId,
      name: 'Phan Anh Thư',
      title: 'CEO & Founder',
      image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png', // Placeholder
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      team_id: teamId,
      name: 'Võ Nguyên Pháp',
      title: 'Project Director',
      image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png', // Placeholder
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Team Members
  await knex('team_members').insert([
    {
      team_id: teamId,
      name: 'Nguyễn Văn A',
      title: 'Senior Architect',
      image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png', // Placeholder
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      team_id: teamId,
      name: 'Trần Thị B',
      title: 'Interior Designer',
      image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png', // Placeholder
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      team_id: teamId,
      name: 'Lê Minh C',
      title: 'Construction Manager',
      image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png', // Placeholder
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      team_id: teamId,
      name: 'Phạm Thu D',
      title: '3D Designer',
      image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png', // Placeholder
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      team_id: teamId,
      name: 'Hoàng Văn E',
      title: 'Site Supervisor',
      image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png', // Placeholder
      display_order: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      team_id: teamId,
      name: 'Đỗ Thị F',
      title: 'Project Coordinator',
      image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png', // Placeholder
      display_order: 5,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  console.log('✅ Intro page seed data inserted successfully!');
}; 