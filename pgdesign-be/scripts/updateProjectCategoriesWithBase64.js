const fs = require('fs');
const path = require('path');
const knex = require('knex');
const config = require('../knexfile');

// Initialize database connection
const db = knex(config.development);

// Mock data from frontend
const mockProjectCategories = [
  {
    categoryId: "house-normal",
    title: "NHÀ PHỐ",
    projectCount: 45,
    imagePath: "/Users/huy.hoang/Desktop/pgdesign/src/assets/images/projectpage/house-normal.png",
    navigationPath: "/projects/house-normal",
    displayOrder: 0,
  },
  {
    categoryId: "appartment",
    title: "CĂN HỘ",
    projectCount: 32,
    imagePath: "/Users/huy.hoang/Desktop/pgdesign/src/assets/images/projectpage/appartment.png",
    navigationPath: "/projects/appartment",
    displayOrder: 1,
  },
  {
    categoryId: "village",
    title: "BIỆT THỰ",
    projectCount: 28,
    imagePath: "/Users/huy.hoang/Desktop/pgdesign/src/assets/images/projectpage/village.png",
    navigationPath: "/projects/village",
    displayOrder: 2,
  },
  {
    categoryId: "house-business",
    title: "THƯƠNG MẠI",
    projectCount: 50,
    imagePath: "/Users/huy.hoang/Desktop/pgdesign/src/assets/images/projectpage/house-business.png",
    navigationPath: "/projects/house-business",
    displayOrder: 3,
  },
];

const mockProjectCategoriesData = {
  mainTitle: "DANH MỤC DỰ ÁN",
  subtitle: "KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ", 
  description: "Từ những căn nhà phố hiện đại đến những biệt thự sang trọng, từ không gian nội thất tinh tế đến những ngôi nhà vườn xanh mát - chúng tôi mang đến giải pháp thiết kế toàn diện cho mọi nhu cầu.",
  isActive: true
};

// Convert image to base64
function imageToBase64(imagePath) {
  try {
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      const base64String = imageBuffer.toString('base64');
      const mimeType = getMimeType(imagePath);
      return `data:${mimeType};base64,${base64String}`;
    } else {
      console.warn(`Image not found: ${imagePath}`);
      return null;
    }
  } catch (error) {
    console.error(`Error converting image ${imagePath}:`, error);
    return null;
  }
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.webp': return 'image/webp';
    default: return 'image/png';
  }
}

async function updateProjectCategories() {
  const trx = await db.transaction();
  
  try {
    console.log('🗑️  Clearing existing project categories data...');
    
    // Clear existing data in correct order (child first, then parent)
    await trx('project_details').del(); // Clear project details first
    await trx('project_categories').del();
    await trx('project_categories_data').del();
    
    console.log('✅ Cleared existing data');
    
    // Insert main project categories data
    console.log('📝 Inserting main project categories data...');
    const [mainDataId] = await trx('project_categories_data').insert({
      main_title: mockProjectCategoriesData.mainTitle,
      subtitle: mockProjectCategoriesData.subtitle,
      description: mockProjectCategoriesData.description,
      is_active: mockProjectCategoriesData.isActive,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    console.log(`✅ Inserted main data with ID: ${mainDataId}`);
    
    // Insert categories with base64 images
    console.log('🖼️  Converting images to base64 and inserting categories...');
    
    for (const category of mockProjectCategories) {
      console.log(`Processing category: ${category.title}`);
      
      // Convert image to base64
      const base64Image = imageToBase64(category.imagePath);
      if (!base64Image) {
        console.warn(`Skipping ${category.title} - no image`);
        continue;
      }
      
      await trx('project_categories').insert({
        categories_data_id: mainDataId,
        category_id: category.categoryId,
        title: category.title,
        project_count: category.projectCount,
        background_image_blob: base64Image,
        navigation_path: category.navigationPath,
        display_order: category.displayOrder,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      });
      
      console.log(`✅ Inserted ${category.title} with base64 image`);
    }
    
    await trx.commit();
    console.log('🎉 Successfully updated project categories with base64 images!');
    
    // Verify data
    const result = await db('project_categories')
      .select('title', 'category_id')
      .select(db.raw('CHAR_LENGTH(background_image_blob) as image_size'))
      .where('is_active', true);
    
    console.log('\n📊 Verification:');
    result.forEach(row => {
      console.log(`- ${row.title} (${row.category_id}): ${row.image_size} characters`);
    });
    
  } catch (error) {
    await trx.rollback();
    console.error('❌ Error updating project categories:', error);
    throw error;
  } finally {
    await db.destroy();
  }
}

// Run the update
updateProjectCategories()
  .then(() => {
    console.log('\n✨ Project categories update completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Failed to update project categories:', error);
    process.exit(1);
  });
