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

// Import additionalProjectData
const { additionalProjectData } = require('../../src/services/additionalProjectData.ts');

async function fillDatabaseWithAdditionalProjects() {
  console.log('🚀 Filling database with additionalProjectData...\n');

  try {
    // Clear existing project data first
    console.log('🧹 Clearing existing project data...');
    await db('project_details').del();
    console.log('   ✅ Cleared existing project data');

    let totalInserted = 0;
    const categories = ['appartment', 'house-normal', 'village', 'house-business'];

    for (const category of categories) {
      const projects = additionalProjectData[category];
      if (!projects || projects.length === 0) {
        console.log(`📋 ${category}: No projects to insert`);
        continue;
      }

      console.log(`📋 Processing ${category}: ${projects.length} projects`);

      for (const project of projects) {
        try {
          // Transform project data to match database schema
          const projectData = {
            id: project.id,
            project_id: project.projectId,
            title: project.title,
            client_name: project.clientName,
            area: project.area,
            construction_date: project.constructionDate ? new Date(project.constructionDate) : null,
            address: project.address,
            description: project.description,
            category: project.category,
            project_category_id: project.projectCategoryId,
            style: project.style,
            thumbnail_image: project.thumbnailImage,
            thumbnail_image_url: project.thumbnailImage,
            html_content: project.htmlContent,
            project_images: JSON.stringify(project.projectImages || []),
            project_images_urls: JSON.stringify(project.projectImages || []),
            project_status: project.projectStatus,
            completion_date: project.completionDate ? new Date(project.completionDate) : null,
            architect_name: project.architectName,
            contractor_name: project.contractorName,
            meta_title: project.metaTitle,
            meta_description: project.metaDescription,
            tags: JSON.stringify(project.tags || []),
            is_on_homepage: project.isOnHomePage || 0,
            is_active: project.isActive !== undefined ? project.isActive : 1,
            created_at: project.createdAt ? new Date(project.createdAt) : new Date(),
            updated_at: project.updatedAt ? new Date(project.updatedAt) : new Date()
          };

          await db('project_details').insert(projectData);
          console.log(`   ✅ Inserted: ${project.title} (${project.projectId})`);
          totalInserted++;

        } catch (error) {
          console.log(`   ❌ Error inserting ${project.title}: ${error.message}`);
        }
      }
    }

    console.log('\n📊 Summary:');
    console.log(`   Total projects inserted: ${totalInserted}`);
    console.log(`   Categories processed: ${categories.length}`);

    console.log('\n✅ Database filled successfully!');
    console.log('\n🎉 All additionalProjectData has been imported to database!');

  } catch (error) {
    console.error('❌ Error filling database:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

fillDatabaseWithAdditionalProjects().catch(console.error);
