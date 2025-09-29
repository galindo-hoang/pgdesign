const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

/**
 * Generate a small placeholder base64 image (1x1 pixel)
 */
function generateSmallPlaceholder() {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
}

/**
 * Add remaining projects manually from additionalProjectData
 */
async function addRemainingProjects() {
  try {
    console.log('🚀 Adding remaining projects manually...');
    
    // Get existing project IDs
    const existingProjects = await db('project_details').select('project_id');
    const existingIds = new Set(existingProjects.map(p => p.project_id));
    
    console.log(`📋 Found ${existingIds.size} existing projects in database`);
    
    // Manually define missing projects from house-business category
    const houseBizProjects = [
      {
        projectId: "HOUSE-BUSINESS020",
        title: "Thương mại THE K COFFEE TEA",
        clientName: "THE K COFFEE TEA",
        area: "110m²",
        address: "THU DUC",
        description: "Thiết kế không gian thương mại tại THU DUC với phong cách hiện đại và tiện nghi.",
        category: "house-business",
        projectCategoryId: 9,
        style: "Hiện đại",
        thumbnailImage: "/assets/house-business/THE K COFFEE TEA - THU DUC/1.png",
        projectImages: [
          "/assets/house-business/THE K COFFEE TEA - THU DUC/1.png",
          "/assets/house-business/THE K COFFEE TEA - THU DUC/2.png",
          "/assets/house-business/THE K COFFEE TEA - THU DUC/3.png"
        ],
        projectStatus: "Hoàn thành • 500 triệu",
        completionDate: "2024-06-30",
        architectName: "KTS. PG Design",
        contractorName: "PG Design",
        metaTitle: "Thiết Kế THU DUC",
        metaDescription: "Thiết kế không gian thương mại tại THU DUC",
        tags: ["không gian thương mại", "nội thất", "hiện đại", "THU DUC"],
        isActive: true,
        isOnHomePage: false
      },
      {
        projectId: "HOUSE-BUSINESS021", 
        title: "Thương mại Ngoc Be Cake",
        clientName: "Ngoc Be Cake",
        area: "110m²",
        address: "BINH DUONG",
        description: "Thiết kế không gian thương mại tại BINH DUONG với phong cách hiện đại và tiện nghi.",
        category: "house-business",
        projectCategoryId: 9,
        style: "Hiện đại",
        thumbnailImage: "/assets/house-business/Ngoc Be Cake - BINH DUONG/1.png",
        projectImages: [
          "/assets/house-business/Ngoc Be Cake - BINH DUONG/1.png",
          "/assets/house-business/Ngoc Be Cake - BINH DUONG/2.png"
        ],
        projectStatus: "Hoàn thành • 500 triệu",
        completionDate: "2024-06-30",
        architectName: "KTS. PG Design",
        contractorName: "PG Design",
        metaTitle: "Thiết Kế BINH DUONG",
        metaDescription: "Thiết kế không gian thương mại tại BINH DUONG",
        tags: ["không gian thương mại", "nội thất", "hiện đại", "BINH DUONG"],
        isActive: true,
        isOnHomePage: false
      }
    ];
    
    // Filter out existing projects
    const newProjects = houseBizProjects.filter(project => !existingIds.has(project.projectId));
    
    console.log(`\n📦 Found ${newProjects.length} new house-business projects to add:`);
    newProjects.forEach(project => {
      console.log(`   • ${project.projectId} (${project.category}): ${project.title}`);
    });
    
    if (newProjects.length === 0) {
      console.log('✅ No new projects to add - all data is already in database');
      return;
    }
    
    // Add new projects
    let successCount = 0;
    let errorCount = 0;
    let totalImagesCreated = 0;
    
    for (const project of newProjects) {
      try {
        console.log(`\n📦 [${successCount + 1}/${newProjects.length}] Adding ${project.projectId}`);
        
        // Use placeholder for all images to avoid packet size issues
        const thumbnailImageBlob = generateSmallPlaceholder();
        
        // Prepare database record
        const dbProject = {
          project_id: project.projectId,
          title: project.title,
          client_name: project.clientName,
          area: project.area,
          construction_date: '2024-01-01',
          address: project.address,
          description: project.description || null,
          category: project.category,
          project_category_id: project.projectCategoryId,
          style: project.style || null,
          thumbnail_image: project.thumbnailImage || null,
          thumbnail_image_blob: thumbnailImageBlob,
          html_content: '<p>Project content</p>',
          project_images: null,
          project_images_blob: null,
          project_status: project.projectStatus || 'Hoàn thành',
          completion_date: project.completionDate || '2024-12-31',
          architect_name: project.architectName || 'KTS. PG Design',
          contractor_name: project.contractorName || 'PG Design',
          meta_title: project.metaTitle || project.title,
          meta_description: project.metaDescription || project.description || project.title,
          tags: project.tags && project.tags.length > 0 ? 
            JSON.stringify(project.tags) : null,
          is_active: project.isActive !== false,
          is_on_homepage: project.isOnHomePage || false
        };
        
        // Insert project into project_details
        const [projectDetailId] = await db('project_details').insert(dbProject);
        console.log(`  ✅ Inserted project: ${project.projectId} (ID: ${projectDetailId})`);
        
        // Create image records for project_image_blob_detail
        const imageRecords = [];
        
        if (project.projectImages && project.projectImages.length > 0) {
          console.log(`  🖼️  Adding ${Math.min(project.projectImages.length, 3)} placeholder images...`);
          
          // Limit to first 3 images and use placeholders
          const limitedImages = project.projectImages.slice(0, 3);
          
          limitedImages.forEach((imagePath, index) => {
            const imageBlob = generateSmallPlaceholder();
            
            imageRecords.push({
              project_detail_id: projectDetailId,
              image_blob: imageBlob,
              alt_text: `${project.title} - Image ${index + 1}`,
              caption: `${project.title} - Project Image ${index + 1}`,
              image_type: 'project',
              display_order: index,
              is_active: true
            });
          });
        } else {
          // Add 2 small sample images if no images provided
          const sampleImages = [
            generateSmallPlaceholder(),
            generateSmallPlaceholder()
          ];
          
          sampleImages.forEach((imageBlob, index) => {
            imageRecords.push({
              project_detail_id: projectDetailId,
              image_blob: imageBlob,
              alt_text: `${project.title} - Sample Image ${index + 1}`,
              caption: `${project.title} - Default Project Image ${index + 1}`,
              image_type: 'project',
              display_order: index,
              is_active: true
            });
          });
        }
        
        if (imageRecords.length > 0) {
          await db('project_image_blob_detail').insert(imageRecords);
          console.log(`  🖼️  Inserted ${imageRecords.length} images`);
          totalImagesCreated += imageRecords.length;
        }
        
        successCount++;
        
      } catch (error) {
        console.error(`  ❌ Error adding project ${project.projectId}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Remaining projects addition finished!');
    console.log(`📊 Summary:`);
    console.log(`   • New projects found: ${newProjects.length}`);
    console.log(`   • Successfully added: ${successCount}`);
    console.log(`   • Errors: ${errorCount}`);
    console.log(`   • Total images created: ${totalImagesCreated}`);
    
    // Final verification
    console.log('\n🔍 Final verification:');
    const finalCategoryStats = await db('project_details')
      .select('category', 'project_category_id')
      .count('* as count')
      .groupBy('category', 'project_category_id')
      .orderBy('count', 'desc');
    
    console.log('📊 Final categories in database:');
    finalCategoryStats.forEach(stat => {
      console.log(`   • ${stat.category} (ID: ${stat.project_category_id}): ${stat.count} projects`);
    });
    
    const finalTotal = await db('project_details').count('* as count').first();
    const finalImages = await db('project_image_blob_detail').count('* as count').first();
    console.log(`\n📋 Final totals:`);
    console.log(`   • Projects: ${finalTotal.count}`);
    console.log(`   • Images: ${finalImages.count}`);
    
  } catch (error) {
    console.error('💥 Adding remaining projects failed:', error);
  } finally {
    await db.destroy();
  }
}

// Run the addition
addRemainingProjects();
