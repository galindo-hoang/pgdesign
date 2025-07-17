/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('project_specifications').del();
  await knex('project_details').del();

  // Insert project details
  const projectDetailId = await knex('project_details').insert({
    project_id: 'project-001',
    title: 'Nhà Phố Hiện Đại 3 Tầng',
    client_name: 'Anh Nguyễn Văn A',
    area: '120m²',
    construction_date: '2023-06-15',
    address: '123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM',
    description: 'Thiết kế nhà phố hiện đại với không gian mở và ánh sáng tự nhiên',
    category: 'house-normal',
    sub_category: 'Nhà Ống',
    style: 'Hiện đại',
    thumbnail_image: '/assets/images/diary-image-1.jpg',
    html_content: `
    <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;">Đây là dự án nhà phố hiện đại được thiết kế với phong cách tối giản nhưng không kém phần sang trọng. Công trình được hoàn thành với chất lượng cao và sự hài lòng của khách hàng.</p>
    
    <h3 style="color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;">Đặc điểm nổi bật</h3>
    <ul style="line-height: 1.6; color: #555;">
      <li style="margin-bottom: 0.5rem;">Thiết kế mặt tiền hiện đại với các đường nét sạch sẽ</li>
      <li style="margin-bottom: 0.5rem;">Tối ưu hóa ánh sáng tự nhiên cho toàn bộ không gian</li>
      <li style="margin-bottom: 0.5rem;">Sử dụng vật liệu cao cấp và thân thiện với môi trường</li>
      <li style="margin-bottom: 0.5rem;">Bố trí không gian thông minh, tận dụng tối đa diện tích</li>
    </ul>
    
    <h3 style="color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;">Không gian chức năng</h3>
    <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;"><strong style="color: #1b3025;">Tầng 1:</strong> Phòng khách, phòng bếp, phòng ăn và khu vực tiếp khách</p>
    <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;"><strong style="color: #1b3025;">Tầng 2:</strong> Phòng ngủ chính, phòng ngủ khách và phòng tắm</p>
    <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;"><strong style="color: #1b3025;">Tầng 3:</strong> Phòng làm việc, khu vực thư giãn và sân thượng</p>
    
    <div style="margin: 2rem 0;">
      <h3 style="color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;">Hình ảnh dự án</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <img src="/assets/images/diary-image-1.jpg" alt="Mặt tiền nhà" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <img src="/assets/images/diary-image-2.jpg" alt="Phòng khách" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <img src="/assets/images/diary-image-3.jpg" alt="Phòng bếp" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <img src="/assets/images/diary-image-4.jpg" alt="Phòng ngủ" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      </div>
    </div>
    
    <h3 style="color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;">Vật liệu sử dụng</h3>
    <ul style="line-height: 1.6; color: #555;">
      <li style="margin-bottom: 0.5rem;">Gạch ốp lát: Granite cao cấp</li>
      <li style="margin-bottom: 0.5rem;">Cửa sổ: Nhôm kính cường lực</li>
      <li style="margin-bottom: 0.5rem;">Sơn: Sơn nước cao cấp chống thấm</li>
      <li style="margin-bottom: 0.5rem;">Hệ thống điện: Schneider Electric</li>
      <li style="margin-bottom: 0.5rem;">Cửa gỗ: Gỗ công nghiệp MDF chống ẩm</li>
      <li style="margin-bottom: 0.5rem;">Sàn gỗ: Sàn gỗ công nghiệp cao cấp</li>
    </ul>
    
    <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;">
      <em style="color: #666; font-style: italic;">
        Dự án được hoàn thành vào tháng 12/2023 với sự hài lòng cao của khách hàng. 
        Đây là minh chứng cho chất lượng và uy tín của PG Design trong lĩnh vực thiết kế và thi công.
      </em>
    </p>
    
    <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 2rem; border-radius: 8px; margin: 2rem 0; border-left: 4px solid #4CAF50;">
      <h3 style="color: #1b3025; margin-bottom: 1rem;">Cam kết chất lượng</h3>
      <p style="color: #333; line-height: 1.6; margin-bottom: 1rem;">
        PG Design cam kết mang đến cho khách hàng những công trình chất lượng cao với:
      </p>
      <ul style="color: #555; line-height: 1.6; margin: 0;">
        <li style="margin-bottom: 0.5rem;">✓ Thiết kế độc đáo, phù hợp với nhu cầu khách hàng</li>
        <li style="margin-bottom: 0.5rem;">✓ Vật liệu xây dựng chất lượng cao, có nguồn gốc rõ ràng</li>
        <li style="margin-bottom: 0.5rem;">✓ Thi công đúng tiến độ với đội ngũ thợ lành nghề</li>
        <li style="margin-bottom: 0.5rem;">✓ Bảo hành công trình lên đến 2 năm</li>
        <li style="margin-bottom: 0;">✓ Hỗ trợ khách hàng 24/7 trong quá trình thi công</li>
      </ul>
    </div>
    `,
    project_images: JSON.stringify([
      '/assets/images/diary-image-1.jpg',
      '/assets/images/diary-image-2.jpg',
      '/assets/images/diary-image-3.jpg',
      '/assets/images/diary-image-4.jpg'
    ]),
    project_status: 'Hoàn thành',
    project_budget: '2.5 tỷ đồng',
    completion_date: '2023-12-20',
    architect_name: 'KTS. Lê Văn B',
    contractor_name: 'Công ty TNHH Xây dựng PG Design',
    meta_title: 'Nhà Phố Hiện Đại 3 Tầng - Dự án PG Design',
    meta_description: 'Khám phá dự án nhà phố hiện đại 3 tầng với thiết kế tinh tế và không gian sống tối ưu.',
    tags: JSON.stringify(['nhà phố', 'hiện đại', '3 tầng', 'thiết kế', 'xây dựng']),
    is_active: true
  });

  // Insert project specifications
  await knex('project_specifications').insert([
    {
      project_detail_id: projectDetailId[0],
      label: 'Diện tích đất',
      value: '120',
      unit: 'm²',
      display_order: 1,
      is_active: true
    },
    {
      project_detail_id: projectDetailId[0],
      label: 'Diện tích xây dựng',
      value: '300',
      unit: 'm²',
      display_order: 2,
      is_active: true
    },
    {
      project_detail_id: projectDetailId[0],
      label: 'Số tầng',
      value: '3',
      unit: '',
      display_order: 3,
      is_active: true
    },
    {
      project_detail_id: projectDetailId[0],
      label: 'Số phòng ngủ',
      value: '4',
      unit: '',
      display_order: 4,
      is_active: true
    },
    {
      project_detail_id: projectDetailId[0],
      label: 'Số phòng tắm',
      value: '3',
      unit: '',
      display_order: 5,
      is_active: true
    }
  ]);

  // Insert additional sample projects
  const projectDetail2Id = await knex('project_details').insert({
    project_id: 'project-002',
    title: 'Biệt Thự 2 Tầng Sang Trọng',
    client_name: 'Chị Trần Thị B',
    area: '200m²',
    construction_date: '2023-08-01',
    address: '456 Đường Lê Văn Sỹ, Quận 3, TP.HCM',
    description: 'Thiết kế biệt thự sang trọng với kiến trúc cổ điển',
    category: 'house-full',
    sub_category: 'Biệt Thự',
    style: 'Cổ điển',
    thumbnail_image: '/assets/images/diary-image-2.jpg',
    html_content: `
    <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;">Biệt thự 2 tầng với thiết kế sang trọng, kết hợp giữa kiến trúc cổ điển và hiện đại.</p>
    
    <h3 style="color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;">Đặc điểm thiết kế</h3>
    <ul style="line-height: 1.6; color: #555;">
      <li style="margin-bottom: 0.5rem;">Kiến trúc cổ điển Châu Âu</li>
      <li style="margin-bottom: 0.5rem;">Sân vườn rộng rãi</li>
      <li style="margin-bottom: 0.5rem;">Nội thất cao cấp</li>
      <li style="margin-bottom: 0.5rem;">Hệ thống smart home</li>
    </ul>
    `,
    project_images: JSON.stringify([
      '/assets/images/diary-image-2.jpg',
      '/assets/images/diary-image-3.jpg',
      '/assets/images/diary-image-4.jpg'
    ]),
    project_status: 'Hoàn thành',
    project_budget: '5.2 tỷ đồng',
    completion_date: '2024-01-15',
    architect_name: 'KTS. Nguyễn Văn C',
    contractor_name: 'Công ty TNHH Xây dựng PG Design',
    meta_title: 'Biệt Thự 2 Tầng Sang Trọng - Dự án PG Design',
    meta_description: 'Khám phá biệt thự 2 tầng với thiết kế sang trọng và kiến trúc cổ điển.',
    tags: JSON.stringify(['biệt thự', 'cổ điển', '2 tầng', 'sang trọng']),
    is_active: true
  });

  // Insert specifications for project 2
  await knex('project_specifications').insert([
    {
      project_detail_id: projectDetail2Id[0],
      label: 'Diện tích đất',
      value: '200',
      unit: 'm²',
      display_order: 1,
      is_active: true
    },
    {
      project_detail_id: projectDetail2Id[0],
      label: 'Diện tích xây dựng',
      value: '350',
      unit: 'm²',
      display_order: 2,
      is_active: true
    },
    {
      project_detail_id: projectDetail2Id[0],
      label: 'Số tầng',
      value: '2',
      unit: '',
      display_order: 3,
      is_active: true
    },
    {
      project_detail_id: projectDetail2Id[0],
      label: 'Số phòng ngủ',
      value: '5',
      unit: '',
      display_order: 4,
      is_active: true
    },
    {
      project_detail_id: projectDetail2Id[0],
      label: 'Số phòng tắm',
      value: '4',
      unit: '',
      display_order: 5,
      is_active: true
    }
  ]);
}; 