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

async function updateAllThumbIntroImages() {
  console.log('🔄 Updating all thumb-intro.png images to real images...\n');

  try {
    // Mapping of names to their actual image files
    const imageMappings = {
      'Phan Anh Thư': 'PHAN%20ANH%20THƯ%20-%20CEO%20FOUNDER.png',
      'Nguyễn Văn A': 'NGUYỄN%20VĂN%20A%20-%20KIẾN%20TRÚC%20SƯ.png',
      'Trần Thị B': 'TRẦN%20THỊ%20B%20-%20THIẾT%20KẾ%20NỘI%20THẤT.png',
      'Lê Minh C': 'LÊ%20MINH%20C%20-%20QUẢN%20LÝ%20THI%20CÔNG.png',
      'Phạm Thu D': 'PHẠM%20THU%20D%20-%20THIẾT%20KẾ%203D.png',
      'Hoàng Văn E': 'HOÀNG%20VĂN%20E%20-%20GIÁM%20SÁT%20CÔNG%20TRÌNH.png',
      'Đỗ Thị F': 'ĐỖ%20THỊ%20F%20-%20ĐIỀU%20PHỐI%20DỰ%20ÁN.png'
    };

    let totalUpdated = 0;

    // Update board_directors
    console.log('📋 Updating board_directors...');
    for (const [name, imageFile] of Object.entries(imageMappings)) {
      if (name === 'Phan Anh Thư') {
        const updates = await db('board_directors')
          .where('name', 'like', `%${name}%`)
          .update({
            image_url: `https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/${imageFile}`,
            updated_at: new Date()
          });
        
        if (updates > 0) {
          console.log(`   ✅ Updated ${name}: ${imageFile}`);
          totalUpdated += updates;
        }
      }
    }

    // Update team_members
    console.log('📋 Updating team_members...');
    for (const [name, imageFile] of Object.entries(imageMappings)) {
      if (name !== 'Phan Anh Thư') { // Skip CEO as she's in board_directors
        const updates = await db('team_members')
          .where('name', 'like', `%${name}%`)
          .update({
            image_url: `https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/${imageFile}`,
            updated_at: new Date()
          });
        
        if (updates > 0) {
          console.log(`   ✅ Updated ${name}: ${imageFile}`);
          totalUpdated += updates;
        }
      }
    }

    // Also update any remaining thumb-intro.png references
    console.log('📋 Updating remaining thumb-intro.png references...');
    const remainingUpdates = await db.raw(`
      UPDATE board_directors 
      SET image_url = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PHAN%20ANH%20THƯ%20-%20CEO%20FOUNDER.png'
      WHERE image_url LIKE '%thumb-intro.png%'
    `);
    
    const teamRemainingUpdates = await db.raw(`
      UPDATE team_members 
      SET image_url = CASE 
        WHEN name LIKE '%Nguyễn Văn A%' THEN 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/NGUYỄN%20VĂN%20A%20-%20KIẾN%20TRÚC%20SƯ.png'
        WHEN name LIKE '%Trần Thị B%' THEN 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/TRẦN%20THỊ%20B%20-%20THIẾT%20KẾ%20NỘI%20THẤT.png'
        WHEN name LIKE '%Lê Minh C%' THEN 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/LÊ%20MINH%20C%20-%20QUẢN%20LÝ%20THI%20CÔNG.png'
        WHEN name LIKE '%Phạm Thu D%' THEN 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/PHẠM%20THU%20D%20-%20THIẾT%20KẾ%203D.png'
        WHEN name LIKE '%Hoàng Văn E%' THEN 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/HOÀNG%20VĂN%20E%20-%20GIÁM%20SÁT%20CÔNG%20TRÌNH.png'
        WHEN name LIKE '%Đỗ Thị F%' THEN 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/ĐỖ%20THỊ%20F%20-%20ĐIỀU%20PHỐI%20DỰ%20ÁN.png'
        ELSE image_url
      END,
      updated_at = NOW()
      WHERE image_url LIKE '%thumb-intro.png%'
    `);

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

updateAllThumbIntroImages().catch(console.error);
