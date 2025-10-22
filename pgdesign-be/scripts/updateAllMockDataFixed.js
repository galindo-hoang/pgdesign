#!/usr/bin/env node

require('dotenv').config();
const knex = require('knex');

// Use explicit database configuration
const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootpassword',
    database: 'pgdesign_dev',
    charset: 'utf8mb4'
  },
  pool: {
    min: 2,
    max: 10
  },
  useNullAsDefault: true
});

async function updateAllMockData() {
  console.log('🔄 Updating all mock data to database...\n');

  try {
    // Mock About Intro Data
    const mockAboutIntroData = {
      id: 1,
      brandTitle: "PG DESIGN",
      brandSubtitle: "KIẾN TẠO KHÔNG GIAN",
      identity: "KHẲNG ĐỊNH BẢN SẮC",
      descriptions: [
        "Là đơn vị chuyên nghiệp trong lĩnh vực thiết kế kiến trúc, nội thất và thi công trọn gói. Với đội ngũ thiết kế và thi công giàu kinh nghiệm, chúng tôi cam kết mang đến những công trình chất lượng cao, đúng tiến độ và phản ánh rõ rệt tính cách của từng khách hàng.",
      ],
      backgroundImage: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/intropage/pg-employee/hero.png',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock Commitments Data
    const mockCommitmentsData = {
      id: 1,
      title: "CAM KẾT CỦA PG DESIGN",
      commitments: [
        {
          id: 1,
          iconName: "direct-execution-icon",
          title: "KHÔNG KHOÁN THẦU",
          description: "PG Design cam kết trực tiếp đảm nhận từ khâu thiết kế đến thi công.",
          displayOrder: 0,
        },
        {
          id: 2,
          iconName: "quality-materials-icon",
          title: "VẬT TƯ ĐẠT CHUẨN",
          description: "Chúng tôi sử dụng vật liệu chính hãng, đảm bảo độ bền và tính thẩm mỹ cho công trình.",
          displayOrder: 1,
        },
        {
          id: 3,
          iconName: "clear-pricing-icon",
          title: "CHI PHÍ MINH BẠCH",
          description: "Mọi hạng mục đều được minh bạch trong báo giá. Cam kết không phát sinh bất ngờ.",
          displayOrder: 2,
        },
        {
          id: 4,
          iconName: "timely-delivery-icon",
          title: "THI CÔNG ĐÚNG TIẾN ĐỘ",
          description: "Chúng tôi thực hiện công trình đúng tiến độ đã thống nhất với khách hàng.",
          displayOrder: 3,
        },
        {
          id: 5,
          iconName: "reasonable-price-icon",
          title: "GIÁ HỢP LÝ",
          description: "Chi phí thiết kế và thi công được tính toán hợp lý cho khách hàng.",
          displayOrder: 4,
        },
        {
          id: 6,
          iconName: "post-handover-warranty-icon",
          title: "CAM KẾT BẢO HÀNH",
          description: "Sau khi bàn giao vẫn luôn đồng hành cùng khách hàng bảo hành chuyên nghiệp và chu đáo.",
          displayOrder: 5,
        },
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock Team Data
    const mockTeamData = {
      id: 1,
      content: {
        heading: "Đội ngũ PG Design",
        description: "Những người trẻ đầy nhiệt huyết và đam mê sáng tạo. Đội ngũ được xây dựng để đồng hành cùng bạn từ bước định hình ý tưởng, phát triển bản sắc thương hiệu cho đến quản lý toàn bộ quy trình - từ trước đến sau khi sản phẩm hoàn thiện.",
      },
      boardDirectors: [
        {
          id: 1,
          name: "Phan Tô Thư",
          title: "Giám Đốc",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/PHAN%20TÔ%20THƯ%20-%20GIÁM%20ĐỐC.png',
          displayOrder: 0,
        },
        {
          id: 2,
          name: "Võ Nguyên Pháp",
          title: "Giám đốc dự án",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/VÕ%20NGUYÊN%20PHÁP%20-%20GIÁM%20ĐỐC%20THI%20CÔNG.png',
          displayOrder: 1,
        },
      ],
      teamMembers: [
        {
          id: 3,
          name: "Đỗ Tuyết Quy",
          title: "Trưởng Phòng Marketing",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/ĐỖ%20TUYẾT%20QUY%20-%20TRƯỞNG%20PHÒNG%20MARKETING.png',
          displayOrder: 1,
        },
        {
          id: 4,
          name: "Y Nhật Minh",
          title: "Trưởng phòng Kinh Doanh",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/Y%20NHẬT%20MINH%20-%20TRƯỞNG%20PHÒNG%20KINH%20DOANH.png',
          displayOrder: 2,
        },
        {
          id: 12,
          name: "Nguyễn Thị Thu Thảo",
          title: "Kế Toán Hành Chính",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/NGUYỄN%20THỊ%20THU%20THẢO%20-%20KẾ%20TOÁN%20HÀNH%20CHÍNH.png',
          displayOrder: 11,
        },
        {
          id: 14,
          name: "NGUYỄN THỊ THU HUYỀN",
          title: "Marketing",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/NGUYỄN%20THỊ%20THU%20HUYỀN%20-%20MARKETING.png',
          displayOrder: 13,
        },
        {
          id: 15,
          name: "Cáp Nguyễn Hồng Phúc",
          title: "Kinh Doanh",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/CÁP%20NGUYỄN%20HỒNG%20PHÚC%20-%20KINH%20DOANH.png',
          displayOrder: 14,
        },
        {
          id: 16,
          name: "Diệp Gia Hy",
          title: "Kinh Doanh",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/DIỆP%20GIA%20HY%20-%20KINH%20DOANH.png',
          displayOrder: 15,
        },
        {
          id: 5,
          name: "Đặng Hồng Sơn",
          title: "Kỹ Sư Xây Dựng",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/ĐẶNG%20HỒNG%20SƠN%20-%20KỸ%20SƯ%20XÂY%20DỰNG.png',
          displayOrder: 4,
        },
        {
          id: 7,
          name: "Lê Đình Thiên",
          title: "Kiến Trúc Sư",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/LÊ%20ĐÌNH%20THIÊN%20-%20KIẾN%20TRÚC%20SƯ.png',
          displayOrder: 6,
        },
        {
          id: 8,
          name: "Lê Duy Huy",
          title: "Kĩ Sư Xây Dựng",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/LÊ%20DUY%20HUY%20-%20KĨ%20SƯ%20XÂY%20DỰNG.png',
          displayOrder: 7,
        },
        {
          id: 9,
          name: "Lê Thị Ngọc Diễm",
          title: "Thiết Kế Nội Thất",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/LÊ%20THỊ%20NGỌC%20DIỄM%20-%20THIẾT%20KẾ%20NỘI%20THẤT.png',
          displayOrder: 8,
        },
        {
          id: 10,
          name: "Nguyễn Hoàng Bảo",
          title: "Kĩ Sư Xây",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/NGUYỄN%20HOÀNG%20BẢO%20-%20KĨ%20SƯ%20XÂY.png',
          displayOrder: 9,
        },
        {
          id: 11,
          name: "Nguyễn Thành Thạo",
          title: "Kỹ Sư MEP",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/NGUYỄN%20THÀNH%20THẠO%20-%20KỸ%20SƯ%20MEP.png',
          displayOrder: 10,
        },
        {
          id: 13,
          name: "Phan Nhật Hà",
          title: "Thiết Kế Nội Thất",
          image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PG%20NHÂN%20SỰ/PHAN%20NHẬT%20HÀ%20-%20THIẾT%20KẾ%20NỘI%20THẤT.png',
          displayOrder: 12,
        },
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let totalUpdated = 0;

    // Update about_intro_data with correct column names
    console.log('📋 Updating about_intro_data...');
    const aboutIntroUpdate = await db('about_intro_data')
      .where('id', 1)
      .update({
        brand_title: mockAboutIntroData.brandTitle,
        brand_subtitle: mockAboutIntroData.brandSubtitle,
        identity: mockAboutIntroData.identity,
        description_1: mockAboutIntroData.descriptions[0],
        description_2: mockAboutIntroData.descriptions[1] || '',
        background_image_url: mockAboutIntroData.backgroundImage,
        is_active: mockAboutIntroData.isActive ? 1 : 0,
        updated_at: new Date()
      });
    
    console.log(`   ✅ Updated about_intro_data: ${aboutIntroUpdate} records`);
    totalUpdated += aboutIntroUpdate;

    // Update commitments_data
    console.log('📋 Updating commitments_data...');
    const commitmentsUpdate = await db('commitments_data')
      .where('id', 1)
      .update({
        title: mockCommitmentsData.title,
        is_active: mockCommitmentsData.isActive ? 1 : 0,
        updated_at: new Date()
      });
    
    console.log(`   ✅ Updated commitments_data: ${commitmentsUpdate} records`);
    totalUpdated += commitmentsUpdate;

    // Update commitment_items
    console.log('📋 Updating commitment_items...');
    
    // Clear existing commitment items
    await db('commitment_items').del();
    
    // Insert new commitment items
    for (const commitment of mockCommitmentsData.commitments) {
      await db('commitment_items').insert({
        id: commitment.id,
        icon_name: commitment.iconName,
        title: commitment.title,
        description: commitment.description,
        display_order: commitment.displayOrder,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    
    console.log(`   ✅ Updated commitment_items: ${mockCommitmentsData.commitments.length} records`);
    totalUpdated += mockCommitmentsData.commitments.length;

    // Update team_data with correct column names
    console.log('📋 Updating team_data...');
    const teamUpdate = await db('team_data')
      .where('id', 1)
      .update({
        heading: mockTeamData.content.heading,
        description: mockTeamData.content.description,
        is_active: mockTeamData.isActive ? 1 : 0,
        updated_at: new Date()
      });
    
    console.log(`   ✅ Updated team_data: ${teamUpdate} records`);
    totalUpdated += teamUpdate;

    // Update board_directors
    console.log('📋 Updating board_directors...');
    
    // Clear existing board directors
    await db('board_directors').del();
    
    // Insert new board directors
    for (const director of mockTeamData.boardDirectors) {
      await db('board_directors').insert({
        id: director.id,
        name: director.name,
        title: director.title,
        image_url: director.image,
        display_order: director.displayOrder,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    
    console.log(`   ✅ Updated board_directors: ${mockTeamData.boardDirectors.length} records`);
    totalUpdated += mockTeamData.boardDirectors.length;

    // Update team_members
    console.log('📋 Updating team_members...');
    
    // Clear existing team members
    await db('team_members').del();
    
    // Insert new team members
    for (const member of mockTeamData.teamMembers) {
      await db('team_members').insert({
        id: member.id,
        name: member.name,
        title: member.title,
        image_url: member.image,
        display_order: member.displayOrder,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    
    console.log(`   ✅ Updated team_members: ${mockTeamData.teamMembers.length} records`);
    totalUpdated += mockTeamData.teamMembers.length;

    console.log('\n📊 Summary:');
    console.log(`   Total records updated: ${totalUpdated}`);
    console.log(`   About Intro Data: ${aboutIntroUpdate} records`);
    console.log(`   Commitments Data: ${commitmentsUpdate} records`);
    console.log(`   Commitment Items: ${mockCommitmentsData.commitments.length} records`);
    console.log(`   Team Data: ${teamUpdate} records`);
    console.log(`   Board Directors: ${mockTeamData.boardDirectors.length} records`);
    console.log(`   Team Members: ${mockTeamData.teamMembers.length} records`);

    console.log('\n✅ All mock data updated successfully!');
    console.log('\n🎉 All intro page mock data has been synchronized with database!');

  } catch (error) {
    console.error('❌ Error updating mock data:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

updateAllMockData().catch(console.error);
