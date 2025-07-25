/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Clean up existing data (optional - remove if you want to keep existing data)
  await knex('workflow_tabs').del();
  await knex('workflow_data').del();
  await knex('testimonials').del();
  await knex('testimonial_header').del();
  await knex('project_types').del();
  await knex('consultation_form_data').del();
  await knex('project_diary_images').del();
  await knex('project_diary_data').del();

  // Workflow Data
  const [workflowId] = await knex('workflow_data').insert({
    title: 'QUY TRÌNH LÀM VIỆC',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  await knex('workflow_tabs').insert([
    {
      workflow_id: workflowId,
      workflow_key: 'design',
      icon_name: 'design-icon',
      icon_url: 'http://localhost:9000/pgdesign-assets/icons/design-icon.svg',
      title: 'QUY TRÌNH THIẾT KẾ', 
      diagram_url: 'http://localhost:9000/pgdesign-assets/icons/work-process-flow-diagram-1.svg',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      workflow_id: workflowId,
      workflow_key: 'construction',
      icon_name: 'building-icon',
      icon_url: 'http://localhost:9000/pgdesign-assets/icons/building-icon.svg',
      title: 'QUY TRÌNH THI CÔNG',
      diagram_url: 'http://localhost:9000/pgdesign-assets/icons/work-process-flow-diagram-2.svg',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Testimonial Data
  const [testimonialHeaderId] = await knex('testimonial_header').insert({
    main_headline: 'CẢM NHẬN KHÁCH HÀNG',
    sub_headline: 'VỀ PG DESIGN',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  await knex('testimonials').insert([
    {
      testimonial_header_id: testimonialHeaderId,
      name: 'CHỊ NHI',
      project: 'CHUNG CƯ CITY GATES - Q1',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      testimonial_header_id: testimonialHeaderId,
      name: 'ANH BÌNH',
      project: 'CHUNG CƯ CITY GATES - Q1',
      text: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor.',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      testimonial_header_id: testimonialHeaderId,
      name: 'CHỊ LAN',
      project: 'DỰ ÁN BIỆT THỰ ĐÀ LẠT - Q1',
      text: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.',
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      testimonial_header_id: testimonialHeaderId,
      name: 'ANH THỊNH',
      project: 'NHÀ PHỐ QUẬN 7 - Q1',
      text: 'Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.',
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      testimonial_header_id: testimonialHeaderId,
      name: 'CHỊ MAI',
      project: 'CĂN HỘ CAO CẤP - Q8',
      text: 'Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.',
      display_order: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Consultation Form Data
  const [consultationFormId] = await knex('consultation_form_data').insert({
    title: 'ĐĂNG KÝ TƯ VẤN',
    min_investment: 100,
    max_investment: 10000,
    step_investment: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  await knex('project_types').insert([
    {
      consultation_form_id: consultationFormId,
      name: '-- Chọn loại công trình --',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      consultation_form_id: consultationFormId,
      name: 'Nhà Phố - Căn hộ',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      consultation_form_id: consultationFormId,
      name: 'Nhà hàng - Khách sạn',
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      consultation_form_id: consultationFormId,
      name: 'Quán Cafe',
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      consultation_form_id: consultationFormId,
      name: 'Văn phòng',
      display_order: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      consultation_form_id: consultationFormId,
      name: 'Biệt thự',
      display_order: 5,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      consultation_form_id: consultationFormId,
      name: 'Shophouse',
      display_order: 6,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  // Project Diary Data
  const [projectDiaryId] = await knex('project_diary_data').insert({
    title: 'NHẬT KÝ HÀNH TRÌNH',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  });

  await knex('project_diary_images').insert([
    {
      project_diary_id: projectDiaryId,
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-1.png',
      image_alt: 'People presenting something at a table',
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      project_diary_id: projectDiaryId,
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-2.png',
      image_alt: 'People inspecting a room in construction',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      project_diary_id: projectDiaryId,
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-3.png',
      image_alt: 'Construction workers reviewing plans',
      display_order: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      project_diary_id: projectDiaryId,
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-5.png',
      image_alt: 'Stylish kitchen interior',
      display_order: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      project_diary_id: projectDiaryId,
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-6.png',
      image_alt: 'Person using a tablet at a desk',
      display_order: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      project_diary_id: projectDiaryId,
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-7.png',
      image_alt: 'Modern living room interior',
      display_order: 5,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      project_diary_id: projectDiaryId,
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-8.png',
      image_alt: 'Team standing in front of a house design',
      display_order: 6,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      project_diary_id: projectDiaryId,
      image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png',
      image_alt: 'Worker installing a window',
      display_order: 7,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  console.log('✅ Complete homepage data seeded successfully!');
}; 