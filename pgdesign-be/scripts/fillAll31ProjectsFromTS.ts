#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
import * as knex from 'knex';
import { additionalProjectData } from '../../src/services/additionalProjectData';

dotenv.config();

// Use explicit database configuration
const db = knex.default({
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

// Helper function to convert additionalProjectData format to database format
function convertProjectToDbFormat(project: any) {
  return {
    project_id: project.projectId,
    title: project.title,
    client_name: project.clientName,
    area: project.area,
    construction_date: new Date(project.constructionDate),
    address: project.address,
    description: project.description,
    category: project.category,
    project_category_id: project.projectCategoryId,
    style: project.style,
    thumbnail_image: project.thumbnailImage,
    html_content: project.htmlContent,
    project_images: JSON.stringify(project.projectImages),
    project_status: project.projectStatus,
    completion_date: new Date(project.completionDate),
    architect_name: project.architectName,
    contractor_name: project.contractorName,
    meta_title: project.metaTitle,
    meta_description: project.metaDescription,
    tags: JSON.stringify(project.tags),
    is_active: project.isActive ? 1 : 0,
    is_on_homepage: project.isOnHomePage ? 1 : 0,
    created_at: new Date(project.createdAt),
    updated_at: new Date(project.updatedAt)
  };
}

async function fillAll31Projects() {
  console.log('🚀 Filling database with ALL 31 projects from additionalProjectData...\n');

  try {
    // Clear existing project data first
    console.log('🧹 Clearing existing project data...');
    await db('project_details').del();
    console.log('   ✅ Cleared existing project data');

    // Collect all projects from all categories
    const allProjects: any[] = [];
    
    // Add appartment projects
    if (additionalProjectData.appartment) {
      additionalProjectData.appartment.forEach(project => {
        allProjects.push(convertProjectToDbFormat(project));
      });
      console.log(`   📦 Found ${additionalProjectData.appartment.length} appartment projects`);
    }
    
    // Add house-normal projects
    if (additionalProjectData['house-normal']) {
      additionalProjectData['house-normal'].forEach(project => {
        allProjects.push(convertProjectToDbFormat(project));
      });
      console.log(`   📦 Found ${additionalProjectData['house-normal'].length} house-normal projects`);
    }
    
    // Add village projects
    if (additionalProjectData.village) {
      additionalProjectData.village.forEach(project => {
        allProjects.push(convertProjectToDbFormat(project));
      });
      console.log(`   📦 Found ${additionalProjectData.village.length} village projects`);
    }
    
    // Add house-business projects
    if (additionalProjectData['house-business']) {
      additionalProjectData['house-business'].forEach(project => {
        allProjects.push(convertProjectToDbFormat(project));
      });
      console.log(`   📦 Found ${additionalProjectData['house-business'].length} house-business projects`);
    }

    console.log(`\n   📊 Total projects to insert: ${allProjects.length}`);

    // Insert all projects
    console.log('\n📝 Inserting projects...');
    let successCount = 0;
    let errorCount = 0;
    const categoryCounts: Record<string, number> = {};

    for (const project of allProjects) {
      try {
        await db('project_details').insert(project);
        console.log(`   ✅ Inserted ${project.title}`);
        successCount++;
        
        // Count by category
        const category = project.category || 'unknown';
        if (!categoryCounts[category]) {
          categoryCounts[category] = 0;
        }
        categoryCounts[category]++;
      } catch (error: any) {
        console.log(`   ❌ Error inserting ${project.title}: ${error.message}`);
        errorCount++;
      }
    }

    // Summary
    console.log('\n📊 Summary:');
    console.log(`   Total projects inserted: ${successCount}`);
    console.log(`   Errors: ${errorCount}`);
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} projects`);
    });

    console.log('\n✅ Database filled successfully!');
    console.log(`\n🎉 All ${successCount} projects from additionalProjectData have been imported!`);

  } catch (error) {
    console.error('❌ Error filling database:', error);
    throw error;
  } finally {
    await db.destroy();
  }
}

// Run the function
fillAll31Projects()
  .then(() => {
    console.log('\n🎯 Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });

