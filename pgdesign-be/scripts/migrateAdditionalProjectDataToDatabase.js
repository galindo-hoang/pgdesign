const fs = require('fs');
const path = require('path');
const knex = require('knex');

// Load knex configuration
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

// Import the additional project data (we'll need to convert from TS to JS format)
// Since we can't directly import TS, we'll recreate the data structure

/**
 * Convert a file path to base64 data URL
 * @param {string} filePath - Path to the image file (relative to public/)
 * @returns {string|null} - Base64 data URL or null if file doesn't exist
 */
function fileToBase64(filePath) {
  try {
    // Clean the path - remove leading slash if present
    let cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    
    // Construct full path to the file in public directory
    const fullPath = path.join(__dirname, '../../public/', cleanPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${fullPath}`);
      // Return a default placeholder base64 image (1x1 pixel transparent PNG)
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    }
    
    const fileBuffer = fs.readFileSync(fullPath);
    const fileExtension = path.extname(fullPath).toLowerCase();
    
    let mimeType = 'image/jpeg'; // default
    if (fileExtension === '.png') mimeType = 'image/png';
    else if (fileExtension === '.gif') mimeType = 'image/gif';
    else if (fileExtension === '.webp') mimeType = 'image/webp';
    
    const base64String = fileBuffer.toString('base64');
    const sizeKB = (fileBuffer.length / 1024).toFixed(1);
    console.log(`✅ Converted: ${cleanPath} (${sizeKB}KB)`);
    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.error(`❌ Error converting file ${filePath}:`, error.message);
    // Return placeholder
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
  }
}

/**
 * Convert image URLs in HTML content to base64
 * @param {string} htmlContent - HTML content with image URLs
 * @returns {string} - HTML content with base64 images
 */
function convertHtmlImageUrls(htmlContent) {
  if (!htmlContent) return htmlContent;
  
  // Replace img src attributes that contain local URLs
  return htmlContent.replace(/src="([^"]*\/assets\/[^"]*)"/g, (match, url) => {
    const base64 = fileToBase64(url);
    console.log(`🖼️  Converted HTML image: ${url}`);
    return `src="${base64}"`;
  });
}

/**
 * Load additional project data from the TypeScript file
 * We'll read it as text and extract the data
 */
async function loadAdditionalProjectData() {
  try {
    const tsFilePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
    const tsContent = fs.readFileSync(tsFilePath, 'utf8');
    
    // Extract the data object (this is a simplified approach)
    // In a real scenario, you might want to use a TypeScript compiler
    console.log('📖 Loading additional project data from TypeScript file...');
    
    // For now, we'll create a sample structure based on what we saw
    // You can expand this with the actual data from the file
    
    const sampleData = {
      appartment: [
        {
          id: 1,
          projectId: "APPARTMENT001",
          title: "Căn hộ PHÚ GIA HƯNG",
          clientName: "ANH ĐĂNG",
          area: "110m²",
          constructionDate: "2024-01-01",
          address: "GÒ VẤP",
          description: "Thiết kế căn hộ tại GÒ VẤP với phong cách hiện đại và tiện nghi.",
          category: "appartment",
          projectCategoryId: 7, // Use valid category ID from our database
          style: "Hiện đại",
          thumbnailImage: "/assets/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png",
          htmlContent: "<div><h3>Thiết Kế PHÚ GIA HƯNG</h3><p>Dự án thiết kế căn hộ tại GÒ VẤP với phong cách hiện đại, tiện nghi và phù hợp với nhu cầu sử dụng.</p></div>",
          projectImages: [
            "/assets/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-01.png",
            "/assets/appartment/ANH DANG - PHU GIA HUNG - GO VAP/phu-gia-hung-02.png"
          ],
          projectStatus: "Hoàn thành • 500 triệu",
          completionDate: "2024-06-30",
          architectName: "KTS. PG Design",
          contractorName: "PG Design",
          metaTitle: "Thiết Kế PHÚ GIA HƯNG",
          metaDescription: "Thiết kế căn hộ tại GÒ VẤP",
          tags: ["căn hộ", "nội thất", "hiện đại", "GÒ VẤP"],
          isActive: true,
          isOnHomePage: true
        }
      ],
      "house-normal": [
        {
          id: 2,
          projectId: "HOUSE001",
          title: "Nhà Phố Hiện Đại",
          clientName: "ANH MINH",
          area: "120m²",
          constructionDate: "2024-02-01",
          address: "Quận 7, TP.HCM",
          description: "Thiết kế nhà phố hiện đại với không gian tối ưu.",
          category: "house-normal",
          projectCategoryId: 6, // Use valid category ID
          style: "Hiện đại",
          thumbnailImage: "/assets/house-normal/sample-house-01.png",
          htmlContent: "<div><h3>Nhà Phố Hiện Đại</h3><p>Thiết kế nhà phố với phong cách hiện đại, tận dụng tối đa không gian sống.</p></div>",
          projectImages: [
            "/assets/house-normal/sample-house-01.png",
            "/assets/house-normal/sample-house-02.png"
          ],
          projectStatus: "Hoàn thành • 800 triệu",
          completionDate: "2024-07-15",
          architectName: "KTS. PG Design",
          contractorName: "PG Design",
          metaTitle: "Nhà Phố Hiện Đại",
          metaDescription: "Thiết kế nhà phố hiện đại tại Quận 7",
          tags: ["nhà phố", "hiện đại", "Quận 7"],
          isActive: true,
          isOnHomePage: true
        }
      ],
      village: [
        {
          id: 3,
          projectId: "VILLAGE001",
          title: "Biệt Thự Vườn",
          clientName: "CHỊ LINH",
          area: "300m²",
          constructionDate: "2024-03-01",
          address: "Đồng Nai",
          description: "Thiết kế biệt thự vườn với không gian xanh mát.",
          category: "village",
          projectCategoryId: 8, // Use valid category ID
          style: "Tropical",
          thumbnailImage: "/assets/village/sample-village-01.png",
          htmlContent: "<div><h3>Biệt Thự Vườn</h3><p>Thiết kế biệt thự vườn với không gian xanh mát, hòa mình với thiên nhiên.</p></div>",
          projectImages: [
            "/assets/village/sample-village-01.png",
            "/assets/village/sample-village-02.png"
          ],
          projectStatus: "Hoàn thành • 1.5 tỷ",
          completionDate: "2024-08-30",
          architectName: "KTS. PG Design",
          contractorName: "PG Design",
          metaTitle: "Biệt Thự Vườn",
          metaDescription: "Thiết kế biệt thự vườn tại Đồng Nai",
          tags: ["biệt thự", "vườn", "Đồng Nai"],
          isActive: true,
          isOnHomePage: false
        }
      ],
      "house-business": [
        {
          id: 4,
          projectId: "BUSINESS001",
          title: "Nhà Kinh Doanh",
          clientName: "ANH PHONG",
          area: "150m²",
          constructionDate: "2024-04-01",
          address: "Quận 1, TP.HCM",
          description: "Thiết kế nhà kinh doanh kết hợp ở và làm việc.",
          category: "house-business",
          projectCategoryId: 9, // Use valid category ID
          style: "Hiện đại",
          thumbnailImage: "/assets/house-business/sample-business-01.png",
          htmlContent: "<div><h3>Nhà Kinh Doanh</h3><p>Thiết kế nhà kinh doanh kết hợp không gian ở và làm việc hiệu quả.</p></div>",
          projectImages: [
            "/assets/house-business/sample-business-01.png",
            "/assets/house-business/sample-business-02.png"
          ],
          projectStatus: "Hoàn thành • 1.2 tỷ",
          completionDate: "2024-09-15",
          architectName: "KTS. PG Design",
          contractorName: "PG Design",
          metaTitle: "Nhà Kinh Doanh",
          metaDescription: "Thiết kế nhà kinh doanh tại Quận 1",
          tags: ["nhà kinh doanh", "hiện đại", "Quận 1"],
          isActive: true,
          isOnHomePage: false
        }
      ]
    };
    
    return sampleData;
  } catch (error) {
    console.error('❌ Error loading additional project data:', error);
    return null;
  }
}

/**
 * Transform mock project data to database format
 * @param {Object} projectData - Project data from mock
 * @returns {Object} - Database-compatible project data
 */
function transformProjectToDbFormat(projectData) {
  // Convert thumbnail image to base64
  const thumbnailImageBlob = projectData.thumbnailImage ? 
    fileToBase64(projectData.thumbnailImage) : null;
  
  // Convert project images array to base64
  const projectImagesBlob = projectData.projectImages && projectData.projectImages.length > 0 ?
    projectData.projectImages.map(imagePath => fileToBase64(imagePath)) : [];
  
  // Convert HTML content images to base64
  const htmlContentWithBase64 = convertHtmlImageUrls(projectData.htmlContent || '');
  
  return {
    project_id: projectData.projectId,
    title: projectData.title,
    client_name: projectData.clientName,
    area: projectData.area,
    construction_date: projectData.constructionDate,
    address: projectData.address,
    description: projectData.description || null,
    category: projectData.category,
    project_category_id: projectData.projectCategoryId,
    style: projectData.style || null,
    thumbnail_image: projectData.thumbnailImage || null, // Keep original URL
    thumbnail_image_blob: thumbnailImageBlob, // New base64 field
    html_content: htmlContentWithBase64,
    project_images: projectData.projectImages ? JSON.stringify(projectData.projectImages) : null, // Keep original URLs
    project_images_blob: projectImagesBlob.length > 0 ? JSON.stringify(projectImagesBlob) : null, // New base64 field
    project_status: projectData.projectStatus || null,
    completion_date: projectData.completionDate || null,
    architect_name: projectData.architectName || null,
    contractor_name: projectData.contractorName || null,
    meta_title: projectData.metaTitle || null,
    meta_description: projectData.metaDescription || null,
    tags: projectData.tags ? JSON.stringify(projectData.tags) : null,
    is_active: projectData.isActive !== false, // Default to true
    is_on_homepage: projectData.isOnHomePage || false
  };
}

/**
 * Main migration function
 */
async function migrateAdditionalProjectData() {
  try {
    console.log('🚀 Starting migration from additionalProjectData to database...');
    
    // Load the additional project data
    const additionalData = await loadAdditionalProjectData();
    if (!additionalData) {
      throw new Error('Failed to load additional project data');
    }
    
    // Clear existing project_details
    console.log('🗑️  Clearing existing project_details...');
    await db('project_details').del();
    console.log('✅ Cleared existing project details');
    
    // Collect all projects from all categories
    const allProjects = [
      ...additionalData.appartment,
      ...additionalData["house-normal"],
      ...additionalData.village,
      ...additionalData["house-business"]
    ];
    
    console.log(`📊 Found ${allProjects.length} projects to migrate`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Process each project
    for (const project of allProjects) {
      try {
        console.log(`\n🔄 Processing: ${project.projectId} - ${project.title}`);
        
        // Transform to database format
        const dbProject = transformProjectToDbFormat(project);
        
        // Insert into database
        await db('project_details').insert(dbProject);
        
        successCount++;
        console.log(`✅ Successfully migrated: ${project.projectId}`);
        
      } catch (error) {
        console.error(`❌ Error migrating project ${project.projectId}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Migration completed!');
    console.log(`📊 Summary:`);
    console.log(`   • Total projects: ${allProjects.length}`);
    console.log(`   • Successfully migrated: ${successCount}`);
    console.log(`   • Errors: ${errorCount}`);
    
    // Show final count
    const finalCount = await db('project_details').count('* as count').first();
    console.log(`   • Final database count: ${finalCount.count}`);
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
  } finally {
    await db.destroy();
  }
}

// Run the migration
migrateAdditionalProjectData();

