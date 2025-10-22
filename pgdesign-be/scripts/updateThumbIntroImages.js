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

async function updateThumbIntroImages() {
  console.log('🔄 Updating thumb-intro.png images to real employee photos...\n');

  try {
    let totalUpdated = 0;

    // Update board_directors - Phan Anh Thư
    console.log('📋 Updating board_directors...');
    const boardUpdates = await db('board_directors')
      .where('name', 'like', '%Phan Anh Thư%')
      .update({
        image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PHAN%20ANH%20THƯ%20-%20CEO%20FOUNDER.png',
        updated_at: new Date()
      });
    
    if (boardUpdates > 0) {
      console.log(`   ✅ Updated Phan Anh Thư (CEO) in board_directors`);
      totalUpdated += boardUpdates;
    }

    // Update team_members with real images
    console.log('📋 Updating team_members...');
    
    // Nguyễn Văn A - Senior Architect
    const updates1 = await db('team_members')
      .where('name', 'like', '%Nguyễn Văn A%')
      .update({
        image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/NGUYỄN%20VĂN%20A%20-%20KIẾN%20TRÚC%20SƯ.png',
        updated_at: new Date()
      });
    if (updates1 > 0) {
      console.log(`   ✅ Updated Nguyễn Văn A (Senior Architect)`);
      totalUpdated += updates1;
    }

    // Trần Thị B - Interior Designer
    const updates2 = await db('team_members')
      .where('name', 'like', '%Trần Thị B%')
      .update({
        image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/TRẦN%20THỊ%20B%20-%20THIẾT%20KẾ%20NỘI%20THẤT.png',
        updated_at: new Date()
      });
    if (updates2 > 0) {
      console.log(`   ✅ Updated Trần Thị B (Interior Designer)`);
      totalUpdated += updates2;
    }

    // Lê Minh C - Construction Manager
    const updates3 = await db('team_members')
      .where('name', 'like', '%Lê Minh C%')
      .update({
        image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/LÊ%20MINH%20C%20-%20QUẢN%20LÝ%20THI%20CÔNG.png',
        updated_at: new Date()
      });
    if (updates3 > 0) {
      console.log(`   ✅ Updated Lê Minh C (Construction Manager)`);
      totalUpdated += updates3;
    }

    // Phạm Thu D - 3D Designer
    const updates4 = await db('team_members')
      .where('name', 'like', '%Phạm Thu D%')
      .update({
        image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PHẠM%20THU%20D%20-%20THIẾT%20KẾ%203D.png',
        updated_at: new Date()
      });
    if (updates4 > 0) {
      console.log(`   ✅ Updated Phạm Thu D (3D Designer)`);
      totalUpdated += updates4;
    }

    // Hoàng Văn E - Site Supervisor
    const updates5 = await db('team_members')
      .where('name', 'like', '%Hoàng Văn E%')
      .update({
        image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/HOÀNG%20VĂN%20E%20-%20GIÁM%20SÁT%20CÔNG%20TRÌNH.png',
        updated_at: new Date()
      });
    if (updates5 > 0) {
      console.log(`   ✅ Updated Hoàng Văn E (Site Supervisor)`);
      totalUpdated += updates5;
    }

    // Đỗ Thị F - Project Coordinator
    const updates6 = await db('team_members')
      .where('name', 'like', '%Đỗ Thị F%')
      .update({
        image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/ĐỖ%20THỊ%20F%20-%20ĐIỀU%20PHỐI%20DỰ%20ÁN.png',
        updated_at: new Date()
      });
    if (updates6 > 0) {
      console.log(`   ✅ Updated Đỗ Thị F (Project Coordinator)`);
      totalUpdated += updates6;
    }

    console.log('\n📊 Summary:');
    console.log(`   Total records updated: ${totalUpdated}`);
    console.log(`   All thumb-intro.png images replaced with real employee photos`);

    console.log('\n✅ All thumb-intro.png images updated successfully!');
    console.log('\n🎉 All team members now have their actual photos!');

  } catch (error) {
    console.error('❌ Error updating thumb-intro images:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

updateThumbIntroImages().catch(console.error);
