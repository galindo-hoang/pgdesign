const fs = require('fs');
const path = require('path');
const knex = require('knex');

// Load knex configuration
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

/**
 * Convert a file path to base64 data URL - Optimized version
 */
function fileToBase64(filePath) {
  try {
    // Clean the path - remove leading slash if present
    let cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    
    // Construct full path to the file in public directory
    const fullPath = path.join(__dirname, '../../public/', cleanPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${cleanPath} - using placeholder`);
      // Return a small placeholder image
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    }
    
    const fileBuffer = fs.readFileSync(fullPath);
    const fileExtension = path.extname(fullPath).toLowerCase();
    
    let mimeType = 'image/jpeg'; // default
    if (fileExtension === '.png') mimeType = 'image/png';
    else if (fileExtension === '.gif') mimeType = 'image/gif';
    else if (fileExtension === '.webp') mimeType = 'image/webp';
    
    const base64String = fileBuffer.toString('base64');
    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.error(`❌ Error converting file ${filePath}:`, error.message);
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
  }
}

/**
 * Parse additionalProjectData from TypeScript file - Simplified version
 */
function parseAdditionalProjectData() {
  try {
    const tsFilePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
    const tsContent = fs.readFileSync(tsFilePath, 'utf8');
    
    console.log('📖 Parsing additionalProjectData.ts...');
    
    // More robust regex to extract project objects
    const projectPattern = /{\s*id:\s*(\d+),[\s\S]*?projectId:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?(?=},\s*{|\]\s*;)/g;
    
    const projects = [];
    let match;
    let projectIndex = 0;
    
    while ((match = projectPattern.exec(tsContent)) !== null && projectIndex < 50) { // Limit to prevent infinite loop
      try {
        const fullProjectText = match[0];
        projectIndex++;
        
        // Extract basic fields
        const id = parseInt(match[1]);
        const projectId = match[2];
        const title = match[3];
        
        // Extract other fields with fallbacks
        const clientNameMatch = fullProjectText.match(/clientName:\s*"([^"]*)"/);
        const areaMatch = fullProjectText.match(/area:\s*"([^"]*)"/);
        const constructionDateMatch = fullProjectText.match(/constructionDate:\s*"([^"]*)"/);
        const addressMatch = fullProjectText.match(/address:\s*"([^"]*)"/);
        const descriptionMatch = fullProjectText.match(/description:\s*"([^"]*)"/);
        const categoryMatch = fullProjectText.match(/category:\s*"([^"]*)"/);
        const projectCategoryIdMatch = fullProjectText.match(/projectCategoryId:\s*(\d+)/);
        const styleMatch = fullProjectText.match(/style:\s*"([^"]*)"/);
        const thumbnailImageMatch = fullProjectText.match(/thumbnailImage:\s*"([^"]*)"/);
        const isActiveMatch = fullProjectText.match(/isActive:\s*(true|false)/);
        const isOnHomePageMatch = fullProjectText.match(/isOnHomePage:\s*(true|false)/);
        
        // Extract project images array
        const projectImagesMatch = fullProjectText.match(/projectImages:\s*\[([\s\S]*?)\]/);
        let projectImages = [];
        if (projectImagesMatch) {
          const imagesString = projectImagesMatch[1];
          const imageMatches = imagesString.match(/"([^"]+)"/g);
          if (imageMatches) {
            projectImages = imageMatches.map(img => img.replace(/"/g, ''));
          }
        }
        
        // Extract tags array
        const tagsMatch = fullProjectText.match(/tags:\s*\[([\s\S]*?)\]/);
        let tags = [];
        if (tagsMatch) {
          const tagsString = tagsMatch[1];
          const tagMatches = tagsString.match(/"([^"]+)"/g);
          if (tagMatches) {
            tags = tagMatches.map(tag => tag.replace(/"/g, ''));
          }
        }
        
        // Map category to valid project_category_id
        const categoryMapping = {
          'house-normal': 6,
          'appartment': 7,
          'village': 8,
          'house-business': 9
        };
        
        const category = categoryMatch ? categoryMatch[1] : 'house-normal';
        const projectCategoryId = categoryMapping[category] || 6;
        
        const project = {
          id: id,
          projectId: projectId,
          title: title,
          clientName: clientNameMatch ? clientNameMatch[1] : '',
          area: areaMatch ? areaMatch[1] : '',
          constructionDate: constructionDateMatch ? constructionDateMatch[1] : '2024-01-01',
          address: addressMatch ? addressMatch[1] : '',
          description: descriptionMatch ? descriptionMatch[1] : '',
          category: category,
          projectCategoryId: projectCategoryId,
          style: styleMatch ? styleMatch[1] : 'Hiện đại',
          thumbnailImage: thumbnailImageMatch ? thumbnailImageMatch[1] : '',
          projectImages: projectImages,
          tags: tags,
          isActive: isActiveMatch ? isActiveMatch[1] === 'true' : true,
          isOnHomePage: isOnHomePageMatch ? isOnHomePageMatch[1] === 'true' : false
        };
        
        projects.push(project);
        console.log(`✅ Parsed: ${projectId} - ${title}`);
        
      } catch (error) {
        console.error(`❌ Error parsing project ${projectIndex}:`, error.message);
      }
    }
    
    console.log(`✅ Successfully parsed ${projects.length} projects`);
    return projects;
    
  } catch (error) {
    console.error('❌ Error parsing additionalProjectData:', error);
    return [];
  }
}

/**
 * Main function to reset and repopulate project data
 */
async function completeProjectDataReset() {
  try {
    console.log('🚀 Starting complete project data reset from additionalProjectData...');
    
    // Step 1: Clear all related data
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
    
    // Step 3: Insert projects with batch processing
    console.log('\n📦 Step 3: Inserting projects with base64 images...');
    
    let successCount = 0;
    let errorCount = 0;
    let totalImagesCreated = 0;
    
    for (const project of projects) {
      try {
        console.log(`\n📦 [${successCount + 1}/${projects.length}] ${project.projectId}`);
        
        // Convert thumbnail image to base64
        const thumbnailImageBlob = project.thumbnailImage ? 
          fileToBase64(project.thumbnailImage) : null;
        
        // Prepare database record
        const dbProject = {
          project_id: project.projectId,
          title: project.title,
          client_name: project.clientName,
          area: project.area,
          construction_date: project.constructionDate,
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
          project_status: 'Hoàn thành',
          completion_date: '2024-12-31',
          architect_name: 'KTS. PG Design',
          contractor_name: 'PG Design',
          meta_title: project.title,
          meta_description: project.description || project.title,
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
          console.log(`  🖼️  Converting ${project.projectImages.length} images...`);
          
          project.projectImages.forEach((imagePath, index) => {
            const imageBlob = fileToBase64(imagePath);
            
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
          // Add 2 sample images if no images provided
          const sampleImages = [
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mP8/5+BgYGBgYGBgYGBgQEAAP//AAPAAQbVHqgAAAAASUVORK5CYII='
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
    
  } catch (error) {
    console.error('💥 Complete reset failed:', error);
  } finally {
    await db.destroy();
  }
}

// Run the complete reset
completeProjectDataReset();
