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

async function updateVisionMissionData() {
  console.log('🔄 Updating Vision Mission Data from mock data...\n');

  try {
    // Mock Vision Mission Data from introPageService.ts
    const mockVisionMissionData = {
      id: 4, // Use existing ID
      image: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/intropage/pg-employee/mission.png',
      vision: {
        title: "TẦM NHÌN",
        paragraphs: [
          "PG Design tự hào trở thành đơn vị thiết kế - thi công uy tín hàng đầu: nơi mở không gian không chỉ được đầu tư về công năng và thẩm mỹ, mà còn là nơi kiến tạo câu chuyện bằng không gian sống của người sở hữu.",
          "Chúng tôi tin rằng, một không gian đẹp là không gian đặt dấu cảm xúc và đồng điệu với nhu cầu sống, từ đó nâng tầm trải nghiệm và chất lượng cuộc sống mỗi ngày."
        ]
      },
      mission: {
        title: "SỨ MỆNH",
        items: [
          "Cung cấp các giải pháp thiết kế - thi công đồng bộ, chuyên nghiệp, đúng tiến độ tối ưu chi phí mà vẫn đảm bảo chất lượng và phong cách riêng.",
          "Đạt chuẩn mực thiết kế dựa trên nhu cầu, gu thẩm mỹ và mục tiêu sử dụng của từng khách hàng.",
          "Không ngừng sáng tạo, cập nhật xu hướng vật liệu, công nghệ và phong cách mới trong ngành thiết kế - nội thất.",
          "Xây dựng mối quan hệ lâu dài với khách hàng: Uy tín - Minh bạch - Tận tâm."
        ]
      },
      coreValues: {
        title: "GIÁ TRỊ CỐT LÕI",
        values: [
          {
            id: 13,
            title: "1. Tận tâm & Chuyên nghiệp",
            description: "Đồng hành cùng khách hàng từ bản vẽ đầu tiên dần hoàn thiện công trình, với tinh thần trách nhiệm và thái độ tận tâm.",
            displayOrder: 0
          },
          {
            id: 14,
            title: "2. Sáng tạo & Cá tính",
            description: "Không gian được thiết kế không chỉ đẹp, mà còn mang dấu ấn riêng, thể hiện rõ \"chất\" của người sở hữu.",
            displayOrder: 1
          },
          {
            id: 15,
            title: "3. Chất lượng & Hoàn hảo",
            description: "Luôn chọn giải pháp tốt nhất, vật liệu chất lượng và thi công chỉnh chu để đạt đến sự hoàn hảo trong từng chi tiết.",
            displayOrder: 2
          },
          {
            id: 16,
            title: "4. Hiệu quả & Kinh tế hợp lý",
            description: "Tối ưu hóa chi phí mà vẫn đảm bảo tính thẩm mỹ, công năng và độ bền của công trình.",
            displayOrder: 3
          }
        ]
      },
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Update vision_mission_data table with correct column names
    console.log('📋 Updating vision_mission_data...');
    const visionMissionUpdate = await db('vision_mission_data')
      .where('id', 4)
      .update({
        image_url: mockVisionMissionData.image,
        vision_title: mockVisionMissionData.vision.title,
        vision_paragraph_1: mockVisionMissionData.vision.paragraphs[0],
        vision_paragraph_2: mockVisionMissionData.vision.paragraphs[1],
        mission_title: mockVisionMissionData.mission.title,
        core_values_title: mockVisionMissionData.coreValues.title,
        is_active: mockVisionMissionData.isActive ? 1 : 0,
        updated_at: new Date()
      });
    
    console.log(`   ✅ Updated vision_mission_data: ${visionMissionUpdate} records`);

    // Update core_values table
    console.log('📋 Updating core_values...');
    
    // Clear existing core values
    await db('core_values').del();
    
    // Insert new core values
    for (const value of mockVisionMissionData.coreValues.values) {
      await db('core_values').insert({
        id: value.id,
        title: value.title,
        description: value.description,
        display_order: value.displayOrder,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    
    console.log(`   ✅ Updated core_values: ${mockVisionMissionData.coreValues.values.length} records`);

    // Update mission_items table with correct column names
    console.log('📋 Updating mission_items...');
    
    // Clear existing mission items
    await db('mission_items').del();
    
    // Insert new mission items
    for (let i = 0; i < mockVisionMissionData.mission.items.length; i++) {
      await db('mission_items').insert({
        id: i + 1,
        vision_mission_id: 4, // Use existing vision_mission_data ID
        item_text: mockVisionMissionData.mission.items[i],
        display_order: i,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    
    console.log(`   ✅ Updated mission_items: ${mockVisionMissionData.mission.items.length} records`);

    console.log('\n📊 Summary:');
    console.log(`   Vision Mission Data updated: ${visionMissionUpdate} records`);
    console.log(`   Core Values updated: ${mockVisionMissionData.coreValues.values.length} records`);
    console.log(`   Mission Items updated: ${mockVisionMissionData.mission.items.length} records`);

    console.log('\n✅ Vision Mission Data updated successfully!');
    console.log('\n🎉 All mock data has been synchronized with database!');

  } catch (error) {
    console.error('❌ Error updating Vision Mission Data:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

updateVisionMissionData().catch(console.error);
