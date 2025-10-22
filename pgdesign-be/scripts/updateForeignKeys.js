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

async function updateTeamIds() {
  console.log('🔄 Updating team_id for board_directors and team_members...\n');

  try {
    // Get the active team_data ID
    const teamData = await db('team_data')
      .where('is_active', 1)
      .first();
    
    if (!teamData) {
      console.log('❌ No active team_data found');
      return;
    }
    
    console.log(`📋 Found active team_data with ID: ${teamData.id}`);

    // Update board_directors with team_id
    console.log('📋 Updating board_directors...');
    const boardDirectorsUpdate = await db('board_directors')
      .whereNull('team_id')
      .update({
        team_id: teamData.id,
        updated_at: new Date()
      });
    
    console.log(`   ✅ Updated ${boardDirectorsUpdate} board_directors records`);

    // Update team_members with team_id
    console.log('📋 Updating team_members...');
    const teamMembersUpdate = await db('team_members')
      .whereNull('team_id')
      .update({
        team_id: teamData.id,
        updated_at: new Date()
      });
    
    console.log(`   ✅ Updated ${teamMembersUpdate} team_members records`);

    // Also update commitment_items with commitments_id
    console.log('📋 Updating commitment_items...');
    const commitmentsData = await db('commitments_data')
      .where('is_active', 1)
      .first();
    
    if (commitmentsData) {
      const commitmentItemsUpdate = await db('commitment_items')
        .whereNull('commitments_id')
        .update({
          commitments_id: commitmentsData.id,
          updated_at: new Date()
        });
      
      console.log(`   ✅ Updated ${commitmentItemsUpdate} commitment_items records`);
    }

    // Also update mission_items with vision_mission_id
    console.log('📋 Updating mission_items...');
    const visionMissionData = await db('vision_mission_data')
      .where('is_active', 1)
      .first();
    
    if (visionMissionData) {
      const missionItemsUpdate = await db('mission_items')
        .whereNull('vision_mission_id')
        .update({
          vision_mission_id: visionMissionData.id,
          updated_at: new Date()
        });
      
      console.log(`   ✅ Updated ${missionItemsUpdate} mission_items records`);
    }

    // Also update core_values with vision_mission_id
    console.log('📋 Updating core_values...');
    if (visionMissionData) {
      const coreValuesUpdate = await db('core_values')
        .whereNull('vision_mission_id')
        .update({
          vision_mission_id: visionMissionData.id,
          updated_at: new Date()
        });
      
      console.log(`   ✅ Updated ${coreValuesUpdate} core_values records`);
    }

    console.log('\n📊 Summary:');
    console.log(`   Board Directors updated: ${boardDirectorsUpdate}`);
    console.log(`   Team Members updated: ${teamMembersUpdate}`);
    console.log(`   Commitment Items updated: ${commitmentItemsUpdate || 0}`);
    console.log(`   Mission Items updated: ${missionItemsUpdate || 0}`);
    console.log(`   Core Values updated: ${coreValuesUpdate || 0}`);

    console.log('\n✅ All foreign key relationships updated successfully!');
    console.log('\n🎉 API should now return correct data!');

  } catch (error) {
    console.error('❌ Error updating foreign keys:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

updateTeamIds().catch(console.error);
