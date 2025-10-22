#!/usr/bin/env node

require('dotenv').config();
const knex = require('knex');
const fs = require('fs');
const path = require('path');

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

async function importAllProjectsFromAdditionalData() {
  console.log('🚀 Importing ALL projects from additionalProjectData...\n');

  try {
    // Clear existing project data first
    console.log('🧹 Clearing existing project data...');
    await db('project_details').del();
    console.log('   ✅ Cleared existing project data');

    // Read the additionalProjectData file
    const filePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract projects using regex patterns
    const projects = [];
    
    // Extract appartment projects
    const appartmentMatches = content.match(/appartment:\s*\[([\s\S]*?)\],\s*"house-normal":/);
    if (appartmentMatches) {
      const appartmentContent = appartmentMatches[1];
      const appartmentProjects = extractProjectsFromContent(appartmentContent, 'appartment', 2);
      projects.push(...appartmentProjects);
    }

    // Extract house-normal projects
    const houseNormalMatches = content.match(/"house-normal":\s*\[([\s\S]*?)\],\s*village:/);
    if (houseNormalMatches) {
      const houseNormalContent = houseNormalMatches[1];
      const houseNormalProjects = extractProjectsFromContent(houseNormalContent, 'house-normal', 1);
      projects.push(...houseNormalProjects);
    }

    // Extract village projects
    const villageMatches = content.match(/village:\s*\[([\s\S]*?)\],\s*"house-business":/);
    if (villageMatches) {
      const villageContent = villageMatches[1];
      const villageProjects = extractProjectsFromContent(villageContent, 'village', 3);
      projects.push(...villageProjects);
    }

    // Extract house-business projects
    const houseBusinessMatches = content.match(/"house-business":\s*\[([\s\S]*?)\]\s*};/);
    if (houseBusinessMatches) {
      const houseBusinessContent = houseBusinessMatches[1];
      const houseBusinessProjects = extractProjectsFromContent(houseBusinessContent, 'house-business', 4);
      projects.push(...houseBusinessProjects);
    }

    // Try alternative pattern for house-business
    if (projects.filter(p => p.category === 'house-business').length === 0) {
      const houseBusinessAltMatches = content.match(/house-business.*?\[([\s\S]*?)\]\s*};/);
      if (houseBusinessAltMatches) {
        const houseBusinessContent = houseBusinessAltMatches[1];
        const houseBusinessProjects = extractProjectsFromContent(houseBusinessContent, 'house-business', 4);
        projects.push(...houseBusinessProjects);
      }
    }

    console.log(`📊 Found ${projects.length} projects to import`);

    let totalInserted = 0;
    let errors = 0;

    for (const project of projects) {
      try {
        await db('project_details').insert(project);
        console.log(`   ✅ Inserted: ${project.title} (${project.project_id})`);
        totalInserted++;
      } catch (error) {
        console.log(`   ❌ Error inserting ${project.title}: ${error.message}`);
        errors++;
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   Total projects found: ${projects.length}`);
    console.log(`   Successfully inserted: ${totalInserted}`);
    console.log(`   Errors: ${errors}`);

    console.log('\n✅ Import completed!');
    console.log('\n🎉 All additionalProjectData has been imported to database!');

  } catch (error) {
    console.error('❌ Error importing projects:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

function extractProjectsFromContent(content, category, categoryId) {
  const projects = [];
  
  // Split by project objects
  const projectMatches = content.match(/\{[^}]*projectId[^}]*\}/g);
  
  if (projectMatches) {
    projectMatches.forEach((projectStr, index) => {
      try {
        // Extract basic fields using regex
        const projectIdMatch = projectStr.match(/projectId:\s*"([^"]+)"/);
        const titleMatch = projectStr.match(/title:\s*"([^"]+)"/);
        const clientNameMatch = projectStr.match(/clientName:\s*"([^"]+)"/);
        const areaMatch = projectStr.match(/area:\s*"([^"]+)"/);
        const addressMatch = projectStr.match(/address:\s*"([^"]+)"/);
        const descriptionMatch = projectStr.match(/description:\s*"([^"]+)"/);
        const thumbnailMatch = projectStr.match(/thumbnailImage:\s*'([^']+)'/);
        const statusMatch = projectStr.match(/projectStatus:\s*"([^"]+)"/);
        const completionMatch = projectStr.match(/completionDate:\s*"([^"]+)"/);
        const constructionMatch = projectStr.match(/constructionDate:\s*"([^"]+)"/);

        if (projectIdMatch && titleMatch) {
          const project = {
            project_id: projectIdMatch[1],
            title: titleMatch[1],
            client_name: clientNameMatch ? clientNameMatch[1] : 'Unknown',
            area: areaMatch ? areaMatch[1] : 'Unknown',
            construction_date: constructionMatch ? new Date(constructionMatch[1]) : new Date(),
            address: addressMatch ? addressMatch[1] : 'Unknown',
            description: descriptionMatch ? descriptionMatch[1] : 'No description',
            category: category,
            project_category_id: categoryId,
            style: 'Hiện đại',
            html_content: `<div><h3>${titleMatch[1]}</h3><p>${descriptionMatch ? descriptionMatch[1] : 'No description'}</p></div>`,
            thumbnail_image_url: thumbnailMatch ? thumbnailMatch[1] : '',
            project_images_urls: JSON.stringify(thumbnailMatch ? [thumbnailMatch[1]] : []),
            project_status: statusMatch ? statusMatch[1] : 'Hoàn thành',
            completion_date: completionMatch ? new Date(completionMatch[1]) : new Date(),
            is_active: 1,
            created_at: new Date(),
            updated_at: new Date()
          };
          
          projects.push(project);
        }
      } catch (error) {
        console.log(`   ⚠️  Error parsing project ${index + 1}: ${error.message}`);
      }
    });
  }

  return projects;
}

importAllProjectsFromAdditionalData().catch(console.error);
