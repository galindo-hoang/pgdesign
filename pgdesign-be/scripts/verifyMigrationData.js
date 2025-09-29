const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

async function verifyMigrationData() {
  try {
    console.log('🔍 Verifying migration data...\n');
    
    // 1. Check total counts
    console.log('📊 Total counts:');
    const projectCount = await db('project_details').count('* as count').first();
    const imageCount = await db('project_image_blob_detail').count('* as count').first();
    
    console.log(`   • Projects: ${projectCount.count}`);
    console.log(`   • Images: ${imageCount.count}\n`);
    
    // 2. Check sample projects
    console.log('📋 Sample projects:');
    const projects = await db('project_details')
      .select('project_id', 'title', 'category', 'project_category_id', 'is_active', 'is_on_homepage')
      .orderBy('id')
      .limit(10);
    
    projects.forEach(project => {
      console.log(`   • ${project.project_id}: ${project.title}`);
      console.log(`     - Category: ${project.category} (ID: ${project.project_category_id})`);
      console.log(`     - Active: ${project.is_active}, HomePage: ${project.is_on_homepage}`);
    });
    
    console.log('\n🖼️  Projects with image counts:');
    const projectsWithImages = await db('project_details as pd')
      .leftJoin('project_image_blob_detail as pibd', 'pd.id', 'pibd.project_detail_id')
      .select('pd.project_id', 'pd.title', 'pd.category')
      .count('pibd.id as image_count')
      .groupBy('pd.id', 'pd.project_id', 'pd.title', 'pd.category')
      .orderBy('pd.id')
      .limit(10);
    
    projectsWithImages.forEach(project => {
      console.log(`   • ${project.project_id}: ${project.title} - ${project.image_count} images`);
    });
    
    // 3. Check categories distribution
    console.log('\n📂 Category distribution:');
    const categoryStats = await db('project_details')
      .select('category', 'project_category_id')
      .count('* as count')
      .groupBy('category', 'project_category_id')
      .orderBy('count', 'desc');
    
    categoryStats.forEach(stat => {
      console.log(`   • ${stat.category} (ID: ${stat.project_category_id}): ${stat.count} projects`);
    });
    
    // 4. Check homepage projects
    console.log('\n🏠 Homepage projects:');
    const homepageProjects = await db('project_details')
      .select('project_id', 'title', 'is_on_homepage')
      .where('is_on_homepage', true)
      .limit(5);
    
    console.log(`   Total homepage projects: ${homepageProjects.length}`);
    homepageProjects.forEach(project => {
      console.log(`   • ${project.project_id}: ${project.title}`);
    });
    
    // 5. Check image types
    console.log('\n🎨 Image types:');
    const imageTypes = await db('project_image_blob_detail')
      .select('image_type')
      .count('* as count')
      .groupBy('image_type');
    
    imageTypes.forEach(type => {
      console.log(`   • ${type.image_type}: ${type.count} images`);
    });
    
    // 6. Check for null/empty data
    console.log('\n⚠️  Data quality checks:');
    const nullThumbnails = await db('project_details')
      .count('* as count')
      .whereNull('thumbnail_image_blob')
      .first();
    
    const nullTitles = await db('project_details')
      .count('* as count')
      .where('title', '')
      .orWhereNull('title')
      .first();
    
    console.log(`   • Projects without thumbnail: ${nullThumbnails.count}`);
    console.log(`   • Projects without title: ${nullTitles.count}`);
    
    console.log('\n✅ Migration verification completed!');
    
  } catch (error) {
    console.error('❌ Error verifying data:', error);
  } finally {
    await db.destroy();
  }
}

verifyMigrationData();
