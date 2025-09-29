const fs = require('fs');
const path = require('path');
const knex = require('knex');

// Load knex configuration
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

/**
 * Convert a file path to base64 data URL
 */
function fileToBase64(filePath) {
  try {
    // Clean the path - remove leading slash if present
    let cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    
    // Construct full path to the file in public directory
    const fullPath = path.join(__dirname, '../../public/', cleanPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${cleanPath}`);
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
 * Parse additionalProjectData from TypeScript file
 */
function parseAdditionalProjectData() {
  try {
    const tsFilePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
    const tsContent = fs.readFileSync(tsFilePath, 'utf8');
    
    console.log('📖 Parsing additionalProjectData.ts...');
    
    // Extract all project objects using regex pattern matching
    const projectSections = tsContent.split(/{\s*id:\s*\d+,/).slice(1);
    console.log(`📊 Found ${projectSections.length} project sections`);
    
    const projects = [];
    
    projectSections.forEach((section, index) => {
      try {
        const fullSection = '{ id: ' + section;
        
        // Extract fields using regex
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
        const isActiveMatch = fullSection.match(/isActive:\s*(true|false)/);
        const isOnHomePageMatch = fullSection.match(/isOnHomePage:\s*(true|false)/);
        
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
            isActive: isActiveMatch ? isActiveMatch[1] === 'true' : true,
            isOnHomePage: isOnHomePageMatch ? isOnHomePageMatch[1] === 'true' : false
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
 * Transform project data to database format
 */
function transformProjectToDbFormat(projectData) {
  console.log(`🔄 Processing: ${projectData.projectId} - ${projectData.title}`);
  
  // Convert thumbnail image to base64
  const thumbnailImageBlob = projectData.thumbnailImage ? 
    fileToBase64(projectData.thumbnailImage) : null;
  
  // Map category to valid project_category_id
  const categoryMapping = {
    'house-normal': 6,
    'appartment': 7,
    'village': 8,
    'house-business': 9
  };
  
  const projectCategoryId = categoryMapping[projectData.category] || projectData.projectCategoryId || 6;
  
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
    thumbnail_image: projectData.thumbnailImage || null,
    thumbnail_image_blob: thumbnailImageBlob,
    html_content: projectData.htmlContent || '<p>Project content</p>',
    project_images: null, // Will be handled by separate table
    project_images_blob: null, // Will be handled by separate table
    project_status: projectData.projectStatus || null,
    completion_date: projectData.completionDate || null,
    architect_name: projectData.architectName || null,
    contractor_name: projectData.contractorName || null,
    meta_title: projectData.metaTitle || null,
    meta_description: projectData.metaDescription || null,
    tags: projectData.tags && projectData.tags.length > 0 ? 
      JSON.stringify(projectData.tags) : null,
    is_active: projectData.isActive !== false,
    is_on_homepage: projectData.isOnHomePage || false
  };
}

/**
 * Create image records for project_image_blob_detail table
 */
function createImageRecords(projectDetailId, projectImages, projectTitle) {
  const imageRecords = [];
  
  if (projectImages && projectImages.length > 0) {
    projectImages.forEach((imagePath, index) => {
      const imageBlob = fileToBase64(imagePath);
      
      imageRecords.push({
        project_detail_id: projectDetailId,
        image_blob: imageBlob,
        alt_text: `${projectTitle} - Image ${index + 1}`,
        caption: `${projectTitle} - Project Image ${index + 1}`,
        image_type: 'project',
        display_order: index,
        is_active: true
      });
    });
  } else {
    // Add default sample images if no images provided
    const sampleImages = [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mP8/5+BgYGBgYGBgYGBgQEAAP//AAPAAQbVHqgAAAAASUVORK5CYII='
    ];
    
    sampleImages.forEach((imageBlob, index) => {
      imageRecords.push({
        project_detail_id: projectDetailId,
        image_blob: imageBlob,
        alt_text: `${projectTitle} - Sample Image ${index + 1}`,
        caption: `${projectTitle} - Default Project Image ${index + 1}`,
        image_type: 'project',
        display_order: index,
        is_active: true
      });
    });
  }
  
  return imageRecords;
}

/**
 * Main function to reset and repopulate project data
 */
async function completeProjectDataReset() {
  try {
    console.log('🚀 Starting complete project data reset from additionalProjectData...');
    
    // Step 1: Clear all related data (CASCADE will handle project_image_blob_detail)
    console.log('\n🗑️  Step 1: Clearing all project-related data...');
    
    await db('project_image_blob_detail').del();
    console.log('   ✅ Cleared project_image_blob_detail');
    
    await db('project_details').del();
    console.log('   ✅ Cleared project_details');
    
    // Step 2: Parse additionalProjectData
    console.log('\n📖 Step 2: Parsing additionalProjectData...');
    const projects = parseAdditionalProjectData();
    
    if (projects.length === 0) {
      throw new Error('No projects found in additionalProjectData');
    }
    
    console.log(`📊 Found ${projects.length} projects to migrate`);
    
    // Step 3: Insert projects and images
    console.log('\n📦 Step 3: Inserting projects with base64 images...');
    
    let successCount = 0;
    let errorCount = 0;
    let totalImagesCreated = 0;
    
    for (const project of projects) {
      try {
        console.log(`\n📦 [${successCount + 1}/${projects.length}] ${project.projectId}`);
        
        // Transform to database format
        const dbProject = transformProjectToDbFormat(project);
        
        // Insert project into project_details
        const [projectDetailId] = await db('project_details').insert(dbProject);
        console.log(`  ✅ Inserted project: ${project.projectId} (ID: ${projectDetailId})`);
        
        // Create image records for project_image_blob_detail
        const imageRecords = createImageRecords(
          projectDetailId, 
          project.projectImages, 
          project.title
        );
        
        if (imageRecords.length > 0) {
          await db('project_image_blob_detail').insert(imageRecords);
          console.log(`  🖼️  Inserted ${imageRecords.length} images`);
          totalImagesCreated += imageRecords.length;
        }
        
        successCount++;
        
      } catch (error) {
        console.error(`  ❌ Error migrating project ${project.projectId}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Complete reset and migration finished!');
    console.log(`📊 Summary:`);
    console.log(`   • Total projects found: ${projects.length}`);
    console.log(`   • Successfully migrated: ${successCount}`);
    console.log(`   • Errors: ${errorCount}`);
    console.log(`   • Total images created: ${totalImagesCreated}`);
    console.log(`   • Average images per project: ${(totalImagesCreated / successCount).toFixed(1)}`);
    
    // Verification
    console.log('\n🔍 Verification:');
    const finalProjectCount = await db('project_details').count('* as count').first();
    const finalImageCount = await db('project_image_blob_detail').count('* as count').first();
    
    console.log(`   • Projects in database: ${finalProjectCount.count}`);
    console.log(`   • Images in database: ${finalImageCount.count}`);
    
    // Show sample projects with image counts
    console.log('\n📋 Sample projects with image counts:');
    const samples = await db('project_details as pd')
      .leftJoin('project_image_blob_detail as pibd', 'pd.id', 'pibd.project_detail_id')
      .select('pd.project_id', 'pd.title', 'pd.category')
      .count('pibd.id as image_count')
      .groupBy('pd.id', 'pd.project_id', 'pd.title', 'pd.category')
      .limit(5);
    
    samples.forEach(sample => {
      console.log(`   • ${sample.project_id}: ${sample.title} (${sample.category}) - ${sample.image_count} images`);
    });
    
    // Test API response format
    console.log('\n🧪 Testing API response format:');
    console.log('   Run: curl http://localhost:3002/api/v1/projectdetail/project/APPARTMENT001');
    console.log('   Expected: projectImagesBlob array with base64 images');
    
  } catch (error) {
    console.error('💥 Complete reset failed:', error);
  } finally {
    await db.destroy();
  }
}

// Run the complete reset
completeProjectDataReset();

