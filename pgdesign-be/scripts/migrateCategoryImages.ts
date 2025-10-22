import db from '../src/config/database';

async function migrateCategoryImages() {
  try {
    console.log('🔍 Finding representative images for each category...\n');
    
    const categories = ['house-normal', 'appartment', 'village', 'house-business'];
    
    for (const categoryId of categories) {
      // Get a project with image from this category
      const project = await db('project_details')
        .select('id', 'project_id', 'title', 'thumbnail_image_url', 'category')
        .where('category', categoryId)
        .whereNotNull('thumbnail_image_url')
        .where('is_active', 1)
        .first();
      
      if (project) {
        console.log(`\n📁 Category: ${categoryId}`);
        console.log(`   Found project: ${project.title}`);
        console.log(`   Thumbnail: ${project.thumbnail_image_url}`);
        
        // Update category with this image
        await db('project_categories')
          .where('category_id', categoryId)
          .update({
            background_image_url: project.thumbnail_image_url,
            updated_at: db.fn.now()
          });
        
        console.log(`   ✅ Updated category background image`);
      } else {
        console.log(`\n❌ No projects found with images for category: ${categoryId}`);
      }
    }
    
    console.log('\n\n✅ Migration completed! Verifying...\n');
    
    // Verify
    const updated = await db('project_categories')
      .select('category_id', 'title', 'background_image_url')
      .orderBy('display_order', 'asc');
    
    console.log('📊 Updated categories:');
    updated.forEach((cat: any) => {
      console.log(`\n  ${cat.category_id}:`);
      console.log(`    Image: ${cat.background_image_url || 'NULL'}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

migrateCategoryImages();

