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

async function updateVoNguyenPhapImage() {
  console.log('🔄 Updating Võ Nguyên Pháp image URL...\n');

  try {
    // Update team_members table for Võ Nguyên Pháp
    console.log('📋 Updating team_members for Võ Nguyên Pháp...');
    const updates = await db('team_members')
      .where('name', 'like', '%Võ Nguyên Pháp%')
      .update({
        image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/VÕ%20NGUYÊN%20PHÁP%20-%20GIÁM%20ĐỐC%20THI%20CÔNG.png',
        updated_at: new Date()
      });
    
    console.log(`   ✅ Updated ${updates} records for Võ Nguyên Pháp`);

    // Also check if there are any other tables with this person's data
    console.log('📋 Checking other tables for Võ Nguyên Pháp...');
    
    // Check board_directors
    const boardUpdates = await db('board_directors')
      .where('name', 'like', '%Võ Nguyên Pháp%')
      .update({
        image_url: 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/VÕ%20NGUYÊN%20PHÁP%20-%20GIÁM%20ĐỐC%20THI%20CÔNG.png',
        updated_at: new Date()
      });
    
    if (boardUpdates > 0) {
      console.log(`   ✅ Updated ${boardUpdates} records in board_directors`);
    }

    console.log('\n📊 Summary:');
    console.log(`   Team members updated: ${updates}`);
    console.log(`   Board directors updated: ${boardUpdates}`);
    console.log(`   New image URL: https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/VÕ%20NGUYÊN%20PHÁP%20-%20GIÁM%20ĐỐC%20THI%20CÔNG.png`);

    console.log('\n✅ Võ Nguyên Pháp image URL updated successfully!');

  } catch (error) {
    console.error('❌ Error updating Võ Nguyên Pháp image:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

updateVoNguyenPhapImage().catch(console.error);
