const fs = require('fs');
const path = require('path');
const knex = require('knex');

// Load knex configuration
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

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
    console.log(`  ✅ Converted: ${path.basename(cleanPath)} (${sizeKB}KB)`);
    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.error(`  ❌ Error converting file ${filePath}:`, error.message);
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
    console.log(`  🖼️  Converted HTML image: ${path.basename(url)}`);
    return `src="${base64}"`;
  });
}

/**
 * Parse the TypeScript file to extract project data
 * This uses a simple regex-based approach to extract individual projects
 */
function parseAdditionalProjectData() {
  try {
    const tsFilePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
    const tsContent = fs.readFileSync(tsFilePath, 'utf8');
    
    console.log('📖 Parsing additionalProjectData.ts...');
    
    // Extract all project objects using regex
    // Look for objects that start with { and have an id field
    const projectRegex = /{\s*id:\s*(\d+),[\s\S]*?projectId:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?clientName:\s*"([^"]+)",[\s\S]*?area:\s*"([^"]+)",[\s\S]*?constructionDate:\s*"([^"]+)",[\s\S]*?address:\s*"([^"]+)",[\s\S]*?description:\s*"([^"]*)",[\s\S]*?category:\s*"([^"]+)",[\s\S]*?projectCategoryId:\s*(\d+),[\s\S]*?style:\s*"([^"]*)",[\s\S]*?thumbnailImage:\s*"([^"]*)",[\s\S]*?htmlContent:\s*"([^"]*)",[\s\S]*?projectImages:\s*\[([\s\S]*?)\],[\s\S]*?projectStatus:\s*"([^"]*)",[\s\S]*?completionDate:\s*"([^"]*)",[\s\S]*?architectName:\s*"([^"]*)",[\s\S]*?contractorName:\s*"([^"]*)",[\s\S]*?metaTitle:\s*"([^"]*)",[\s\S]*?metaDescription:\s*"([^"]*)",[\s\S]*?tags:\s*\[([\s\S]*?)\],[\s\S]*?isActive:\s*(true|false),[\s\S]*?isOnHomePage:\s*(true|false)[\s\S]*?}/g;
    
    const projects = [];
    let match;
    
    // This regex approach is complex, so let's use a simpler method
    // Split by project boundaries and parse each section
    
    const projectSections = tsContent.split(/{\s*id:\s*\d+,/).slice(1); // Remove first empty element
    
    console.log(`📊 Found ${projectSections.length} project sections`);
    
    projectSections.forEach((section, index) => {
      try {
        // Add back the opening brace and id
        const fullSection = '{ id: ' + section;
        
        // Extract basic info using simple regex
        const idMatch = fullSection.match(/id:\s*(\d+)/);
        const projectIdMatch = fullSection.match(/projectId:\s*"([^"]+)"/);
        const titleMatch = fullSection.match(/title:\s*"([^"]+)"/);
        const clientNameMatch = fullSection.match(/clientName:\s*"([^"]+)"/);
        const areaMatch = fullSection.match(/area:\s*"([^"]+)"/);
        const constructionDateMatch = fullSection.match(/constructionDate:\s*"([^"]+)"/);
        const addressMatch = fullSection.match(/address:\s*"([^"]+)"/);
        const descriptionMatch = fullSection.match(/description:\s*"([^"]*)"/);
        const categoryMatch = fullSection.match(/category:\s*"([^"]+)"/);
        const projectCategoryIdMatch = fullSection.match(/projectCategoryId:\s*(\d+)/);
        const styleMatch = fullSection.match(/style:\s*"([^"]*)"/);
        const thumbnailImageMatch = fullSection.match(/thumbnailImage:\s*"([^"]*)"/);
        const htmlContentMatch = fullSection.match(/htmlContent:\s*"([^"]*)"/);
        const projectStatusMatch = fullSection.match(/projectStatus:\s*"([^"]*)"/);
        const completionDateMatch = fullSection.match(/completionDate:\s*"([^"]*)"/);
        const architectNameMatch = fullSection.match(/architectName:\s*"([^"]*)"/);
        const contractorNameMatch = fullSection.match(/contractorName:\s*"([^"]*)"/);
        const metaTitleMatch = fullSection.match(/metaTitle:\s*"([^"]*)"/);
        const metaDescriptionMatch = fullSection.match(/metaDescription:\s*"([^"]*)"/);
        
        // Extract project images array
        const projectImagesMatch = fullSection.match(/projectImages:\s*\[([\s\S]*?)\]/);
        let projectImages = [];
        if (projectImagesMatch) {
          const imagesString = projectImagesMatch[1];
          const imageMatches = imagesString.match(/"([^"]+)"/g);
          if (imageMatches) {
            projectImages = imageMatches.map(img => img.replace(/"/g, ''));
          }
        }
        
        // Extract tags array
        const tagsMatch = fullSection.match(/tags:\s*\[([\s\S]*?)\]/);
        let tags = [];
        if (tagsMatch) {
          const tagsString = tagsMatch[1];
          const tagMatches = tagsString.match(/"([^"]+)"/g);
          if (tagMatches) {
            tags = tagMatches.map(tag => tag.replace(/"/g, ''));
          }
        }
        
        if (projectIdMatch && titleMatch) {
          const project = {
            id: idMatch ? parseInt(idMatch[1]) : index + 1,
            projectId: projectIdMatch[1],
            title: titleMatch[1],
            clientName: clientNameMatch ? clientNameMatch[1] : '',
            area: areaMatch ? areaMatch[1] : '',
            constructionDate: constructionDateMatch ? constructionDateMatch[1] : '2024-01-01',
            address: addressMatch ? addressMatch[1] : '',
            description: descriptionMatch ? descriptionMatch[1] : '',
            category: categoryMatch ? categoryMatch[1] : 'house-normal',
            projectCategoryId: projectCategoryIdMatch ? parseInt(projectCategoryIdMatch[1]) : 6,
            style: styleMatch ? styleMatch[1] : 'Hiện đại',
            thumbnailImage: thumbnailImageMatch ? thumbnailImageMatch[1] : '',
            htmlContent: htmlContentMatch ? htmlContentMatch[1] : '',
            projectImages: projectImages,
            projectStatus: projectStatusMatch ? projectStatusMatch[1] : 'Hoàn thành',
            completionDate: completionDateMatch ? completionDateMatch[1] : '2024-12-31',
            architectName: architectNameMatch ? architectNameMatch[1] : 'KTS. PG Design',
            contractorName: contractorNameMatch ? contractorNameMatch[1] : 'PG Design',
            metaTitle: metaTitleMatch ? metaTitleMatch[1] : titleMatch[1],
            metaDescription: metaDescriptionMatch ? metaDescriptionMatch[1] : '',
            tags: tags,
            isActive: true,
            isOnHomePage: index < 5 // First 5 projects on homepage
          };
          
          projects.push(project);
        }
      } catch (error) {
        console.error(`❌ Error parsing project section ${index}:`, error.message);
      }
    });
    
    console.log(`✅ Successfully parsed ${projects.length} projects`);
    return projects;
    
  } catch (error) {
    console.error('❌ Error parsing additionalProjectData:', error);
    return [];
  }
}

/**
 * Transform mock project data to database format
 * @param {Object} projectData - Project data from mock
 * @returns {Object} - Database-compatible project data
 */
function transformProjectToDbFormat(projectData) {
  console.log(`🔄 Processing: ${projectData.projectId} - ${projectData.title}`);
  
  // Convert thumbnail image to base64
  const thumbnailImageBlob = projectData.thumbnailImage ? 
    fileToBase64(projectData.thumbnailImage) : null;
  
  // Convert project images array to base64
  const projectImagesBlob = projectData.projectImages && projectData.projectImages.length > 0 ?
    projectData.projectImages.map(imagePath => fileToBase64(imagePath)) : [];
  
  // Convert HTML content images to base64
  const htmlContentWithBase64 = convertHtmlImageUrls(projectData.htmlContent || '');
  
  // Map category to valid project_category_id
  let projectCategoryId = projectData.projectCategoryId;
  
  // Ensure we have valid category IDs (based on our database)
  const categoryMapping = {
    'house-normal': 6,
    'appartment': 7,
    'village': 8,
    'house-business': 9
  };
  
  if (categoryMapping[projectData.category]) {
    projectCategoryId = categoryMapping[projectData.category];
  }
  
  return {
    project_id: projectData.projectId,
    title: projectData.title,
    client_name: projectData.clientName,
    area: projectData.area,
    construction_date: projectData.constructionDate,
    address: projectData.address,
    description: projectData.description || null,
    category: projectData.category,
    project_category_id: projectCategoryId,
    style: projectData.style || null,
    thumbnail_image: projectData.thumbnailImage || null, // Keep original URL
    thumbnail_image_blob: thumbnailImageBlob, // New base64 field
    html_content: htmlContentWithBase64,
    project_images: projectData.projectImages && projectData.projectImages.length > 0 ? 
      JSON.stringify(projectData.projectImages) : null, // Keep original URLs
    project_images_blob: projectImagesBlob.length > 0 ? 
      JSON.stringify(projectImagesBlob) : null, // New base64 field
    project_status: projectData.projectStatus || null,
    completion_date: projectData.completionDate || null,
    architect_name: projectData.architectName || null,
    contractor_name: projectData.contractorName || null,
    meta_title: projectData.metaTitle || null,
    meta_description: projectData.metaDescription || null,
    tags: projectData.tags && projectData.tags.length > 0 ? 
      JSON.stringify(projectData.tags) : null,
    is_active: projectData.isActive !== false, // Default to true
    is_on_homepage: projectData.isOnHomePage || false
  };
}

/**
 * Main migration function
 */
async function migrateFromAdditionalProjectData() {
  try {
    console.log('🚀 Starting migration from additionalProjectData to database...');
    
    // Parse the additional project data
    const projects = parseAdditionalProjectData();
    if (projects.length === 0) {
      throw new Error('No projects found in additionalProjectData');
    }
    
    console.log(`📊 Found ${projects.length} projects to migrate`);
    
    // Clear existing project_details
    console.log('\n🗑️  Clearing existing project_details...');
    await db('project_details').del();
    console.log('✅ Cleared existing project details');
    
    let successCount = 0;
    let errorCount = 0;
    
    // Process each project
    for (const project of projects) {
      try {
        console.log(`\n📦 [${successCount + 1}/${projects.length}] ${project.projectId}`);
        
        // Transform to database format
        const dbProject = transformProjectToDbFormat(project);
        
        // Insert into database
        await db('project_details').insert(dbProject);
        
        successCount++;
        console.log(`  ✅ Successfully migrated: ${project.projectId}`);
        
      } catch (error) {
        console.error(`  ❌ Error migrating project ${project.projectId}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Migration completed!');
    console.log(`📊 Summary:`);
    console.log(`   • Total projects: ${projects.length}`);
    console.log(`   • Successfully migrated: ${successCount}`);
    console.log(`   • Errors: ${errorCount}`);
    
    // Show final count
    const finalCount = await db('project_details').count('* as count').first();
    console.log(`   • Final database count: ${finalCount.count}`);
    
    // Show sample of migrated data
    console.log('\n📋 Sample migrated projects:');
    const samples = await db('project_details')
      .select('project_id', 'title', 'category', 'client_name')
      .limit(5);
    
    samples.forEach(sample => {
      console.log(`   • ${sample.project_id}: ${sample.title} (${sample.category}) - ${sample.client_name}`);
    });
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
  } finally {
    await db.destroy();
  }
}

// Run the migration
migrateFromAdditionalProjectData();

