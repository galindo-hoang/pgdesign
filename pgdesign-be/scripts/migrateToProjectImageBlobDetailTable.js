const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

// Sample base64 images for projects that don't have images
const sampleImages = [
  {
    blob: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    alt: 'Project Image 1',
    caption: 'Main project view'
  },
  {
    blob: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mP8/5+BgYGBgYGBgYGBgQEAAP//AAPAAQbVHqgAAAAASUVORK5CYII=',
    alt: 'Project Image 2', 
    caption: 'Interior view'
  },
  {
    blob: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABElEQVR42mP8/5+BgYGBgYGBgYGBgQEAAP//AAPAAQbVHqgAAAAASUVORK5CYII=',
    alt: 'Project Image 3',
    caption: 'Exterior view'
  }
];

async function migrateToProjectImageBlobDetailTable() {
  try {
    console.log('🔄 Migrating data to project_image_blob_detail table...');
    
    // Clear existing data in new table
    await db('project_image_blob_detail').del();
    console.log('🗑️  Cleared existing project_image_blob_detail data');
    
    // Get all projects
    const projects = await db('project_details')
      .select('id', 'project_id', 'title', 'project_images_blob');
    
    console.log(`📊 Found ${projects.length} projects to migrate`);
    
    let totalImagesCreated = 0;
    
    for (const project of projects) {
      console.log(`\n📦 Processing: ${project.project_id} - ${project.title}`);
      
      let imagesToInsert = [];
      
      // Try to parse existing project_images_blob
      if (project.project_images_blob) {
        try {
          const existingImages = JSON.parse(project.project_images_blob);
          if (Array.isArray(existingImages) && existingImages.length > 0) {
            console.log(`   📷 Found ${existingImages.length} existing images in project_images_blob`);
            
            existingImages.forEach((imageBlob, index) => {
              if (imageBlob && typeof imageBlob === 'string' && imageBlob.startsWith('data:image/')) {
                imagesToInsert.push({
                  project_detail_id: project.id,
                  image_blob: imageBlob,
                  alt_text: `Project Image ${index + 1}`,
                  caption: `${project.title} - Image ${index + 1}`,
                  image_type: 'project',
                  display_order: index,
                  is_active: true
                });
              }
            });
          }
        } catch (parseError) {
          console.log(`   ❌ Failed to parse project_images_blob: ${parseError.message}`);
        }
      }
      
      // If no valid existing images, add sample images
      if (imagesToInsert.length === 0) {
        console.log(`   🎨 No existing images, adding ${sampleImages.length} sample images`);
        
        sampleImages.forEach((sample, index) => {
          imagesToInsert.push({
            project_detail_id: project.id,
            image_blob: sample.blob,
            alt_text: `${project.title} - ${sample.alt}`,
            caption: `${project.title} - ${sample.caption}`,
            image_type: 'project',
            display_order: index,
            is_active: true
          });
        });
      }
      
      // Insert images
      if (imagesToInsert.length > 0) {
        await db('project_image_blob_detail').insert(imagesToInsert);
        console.log(`   ✅ Inserted ${imagesToInsert.length} images`);
        totalImagesCreated += imagesToInsert.length;
      } else {
        console.log(`   ⚠️  No images to insert`);
      }
    }
    
    console.log(`\n🎉 Migration completed!`);
    console.log(`📊 Summary:`);
    console.log(`   • Projects processed: ${projects.length}`);
    console.log(`   • Total images created: ${totalImagesCreated}`);
    console.log(`   • Average images per project: ${(totalImagesCreated / projects.length).toFixed(1)}`);
    
    // Verify migration
    console.log('\n🔍 Verification:');
    const imageCount = await db('project_image_blob_detail').count('* as count').first();
    console.log(`   • Total images in new table: ${imageCount.count}`);
    
    // Test with APPARTMENT005
    const appartment005Images = await db('project_image_blob_detail')
      .select('id', 'image_type', 'display_order', 'alt_text')
      .where({ 
        project_detail_id: (await db('project_details')
          .select('id')
          .where({ project_id: 'APPARTMENT005' })
          .first()).id
      })
      .orderBy('display_order');
    
    console.log(`\n🧪 APPARTMENT005 images: ${appartment005Images.length}`);
    appartment005Images.forEach(img => {
      console.log(`   • Image ${img.id}: ${img.alt_text} (order: ${img.display_order})`);
    });
    
  } catch (error) {
    console.error('❌ Error migrating data:', error);
  } finally {
    await db.destroy();
  }
}

migrateToProjectImageBlobDetailTable();

