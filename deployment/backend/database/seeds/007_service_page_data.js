/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('service_page_construction_sections').del();
  await knex('service_page_process_sections').del();
  await knex('service_page_services').del();
  await knex('service_page_hero').del();

  // Insert hero content
  await knex('service_page_hero').insert([
    {
      id: 1,
      main_title: 'DỊCH VỤ',
      brand_name: 'PG DESIGN',
      description: 'Chúng tôi đồng hành cùng khách hàng từ bản vẽ ý tưởng đến không gian sống hoàn thiện, tối ưu công năng - nâng tầm thẩm mỹ - đảm bảo chất lượng thi công.',
      hero_image_url: 'http://localhost:9000/pgdesign-assets/images/vision-mission-section.jpg',
      is_active: true,
      display_order: 1
    }
  ]);

  // Insert services
  await knex('service_page_services').insert([
    {
      id: 1,
      title: 'Dịch vụ thi công',
      subtitle: 'Phần thô hoặc',
      description: 'Trọn gói hoàn thiện',
      is_active: true,
      display_order: 1
    },
    {
      id: 2,
      title: 'Dịch vụ thi công',
      subtitle: '',
      description: 'Nội thất',
      is_active: true,
      display_order: 2
    },
    {
      id: 3,
      title: 'Dịch vụ thiết kế',
      subtitle: '',
      description: 'Kiến trúc - Nội thất',
      is_active: true,
      display_order: 3
    },
    {
      id: 4,
      title: 'Dịch vụ thi công',
      subtitle: 'Cải tạo sửa chữa hoặc',
      description: 'Dự án đã có bản vẽ',
      is_active: true,
      display_order: 4
    }
  ]);

  // Insert process sections with image URLs
  await knex('service_page_process_sections').insert([
    {
      id: 1,
      process_number: 1,
      title: 'THI CÔNG PHẦN THÔ HOẶC TRỌN GÓI HOÀN THIỆN',
      description: 'PG Design đảm nhận toàn bộ quy trình xây dựng từ phần thô đến hoàn thiện công trình — bao gồm thi công móng, kết cấu, xây tô, ốp lát, sơn nước, lắp đặt thiết bị vệ sinh, hệ thống điện - nước và trần đến hoàn chỉnh.',
      note: 'Không bao gồm thi công đồ nội thất rời - xem mục Thi công nội thất',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg',
      is_active: true
    },
    {
      id: 2,
      process_number: 2,
      title: 'THI CÔNG NỘI THẤT',
      description: 'PG Design đồng hành cùng bạn từ khâu hoàn thiện công trình, thi công nội thất đến cải tạo lại toàn bộ không gian sống - mang đến sự chỉn chu, tiện nghi và cảm xúc sống trọn vẹn.',
      note: '',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg',
      is_active: true
    },
    {
      id: 3,
      process_number: 3,
      title: 'THIẾT KẾ KIẾN TRÚC & NỘI THẤT',
      description: 'Từ khái niệm không gian đến bản vẽ chi tiết, PG Design kiến tạo nên những thiết kế vừa chuẩn công năng, vừa đậm chất thẩm mỹ - thể hiện rõ cá tính và phong cách sống của gia chủ trong từng đường nét.',
      note: '',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-5.jpg',
      is_active: true
    },
    {
      id: 4,
      process_number: 4,
      title: 'CẢI TẠO SỬA CHỮA HOẶC DỰ ÁN ĐÃ CÓ BẢN VẼ',
      description: 'PG Design nhận thi công các công trình đã có bản vẽ kiến trúc hoặc nội thất, đảm bảo đúng kỹ thuật - đúng thiết kế - đúng tiến độ, mang đến sản phẩm cuối cùng hoàn thiện với chất lượng chuẩn mực.',
      note: '',
      image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-7.jpg',
      is_active: true
    }
  ]);

  // Insert construction sections
  await knex('service_page_construction_sections').insert([
    {
      id: 1,
      section_number: 1,
      title_left: 'THI CÔNG PHẦN THÔ',
      contents_left: JSON.stringify([
        'Đào móng, thi công móng - thi công bể tự hoại',
        'Thi công hệ khung bê tông cột thép: cột, dầm, sàn, cầu thang',
        'Thi công tường bao che, tường ngăn nhà',
        'Lắp đặt hệ thống điện, nước âm tường, sàn',
        'Thi công chống thấm, cán nền sàn, tô tường'
      ]),
      title_right: 'TRỌN GÓI HOÀN THIỆN',
      contents_right: JSON.stringify([
        'Lát gạch nền, tường, khu vực vệ sinh',
        'Sơn nước trong - ngoài nhà',
        'Lắp trần thạch cao, trang trí phào chỉ (nếu có)',
        'Lắp thiết bị vệ sinh',
        'Lắp hệ thống điện nổi, đèn chiếu sáng',
        'Lắp đặt cửa chính, cửa sổ, lan can'
      ]),
      is_active: true
    },
    {
      id: 2,
      section_number: 2,
      title_left: 'THI CÔNG HOÀN THIỆN',
      contents_left: JSON.stringify([
        'Ốp lát gạch nền, tường WC, bếp, ban công',
        'Sơn nước hoàn thiện trong - ngoài',
        'Thi công trần thạch cao, phào chỉ (nếu có)',
        'Lắp thiết bị điện, đèn chiếu sáng',
        'Lắp đặt thiết bị vệ sinh',
        'Vệ sinh tổng thể trước khi bàn giao'
      ]),
      title_right: 'THI CÔNG NỘI THẤT',
      contents_right: JSON.stringify([
        'Gia công, sản xuất và lắp đặt nội thất theo bản vẽ thiết kế',
        'Trình mẫu vật tư và nghiệm thu vật liệu đầu vào trước khi sản xuất',
        'Vật liệu nội thất từ gỗ công nghiệp (An Cường,...) gỗ tự nhiên (gỗ óc chó...) hoặc gỗ nhựa (Picomat, WPB...)',
        'Cung cấp lắp đặt phụ kiện tủ từ cơ bản tới cao cấp',
        'Cung cấp và lắp đặt thiết bị bếp (máy rửa chén, bếp từ, lò vi sóng...)',
        'Cung cấp và lắp đặt thiết bị thông minh (nếu có)',
        'Nhận thi công nội thất từ thiết kế của khách hàng'
      ]),
      is_active: true
    },
    {
      id: 3,
      section_number: 3,
      title_left: 'THIẾT KẾ KIẾN TRÚC',
      contents_left: JSON.stringify([
        'Bản vẽ cơ sở kiến trúc',
        'Phối cảnh thiết kế hoàn chỉnh',
        'Bộ hồ sơ kiến trúc chi tiết',
        'Bộ hồ sơ kết cấu',
        'Hồ sơ kỹ thuật điện - nước'
      ]),
      title_right: 'THIẾT KẾ NỘI THẤT',
      contents_right: JSON.stringify([
        'Định hướng không gian tổng thể',
        'Phối cảnh nội thất hoàn chỉnh',
        'Mặt bằng & chi tiết kỹ thuật',
        'Thiết kế chi tiết tiện ích phụ',
        'Hồ sơ kỹ thuật điện - công nghệ'
      ]),
      is_active: true
    },
    {
      id: 4,
      section_number: 4,
      title_left: 'CẢI TẠO SỬA CHỮA',
      contents_left: JSON.stringify([
        'Khảo sát thực tế hiện trạng công trình',
        'Đánh giá kết cấu, hệ thống điện nước, vật liệu, công năng',
        'Đề xuất phương án cải tạo phù hợp nhu cầu - thẩm mỹ - ngân sách',
        'Lập hồ sơ thiết kế cải tạo và dự toán công trình',
        'Thi công từ phần thô đến hoàn thiện',
        'Đảm bảo tiến độ, giám sát kỹ thuật và an toàn công trình trong suốt quá trình thi công'
      ]),
      title_right: 'DỰ ÁN ĐÃ CÓ BẢN VẼ',
      contents_right: JSON.stringify([
        'Tiếp nhận, rà soát và phân tích bản vẽ thiết kế',
        'Tư vấn vật tư, phương án thi công phù hợp thực tế',
        'Bóc tách khối lượng - lập báo giá chi tiết',
        'Trình mẫu vật tư trước khi thi công',
        'Triển khai thi công theo đúng hồ sơ thiết kế',
        'Nghiệm thu từng phần & tổng thể công trình với CĐT trước khi bản giao',
        'Giám sát chặt chẽ - bảo hành công trình sau hoàn thiện'
      ]),
      is_active: true
    }
  ]);
}; 