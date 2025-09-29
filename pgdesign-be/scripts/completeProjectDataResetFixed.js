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
 * Parse additionalProjectData from TypeScript file - Fixed version
 */
function parseAdditionalProjectData() {
  try {
    const tsFilePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
    const tsContent = fs.readFileSync(tsFilePath, 'utf8');
    
    console.log('📖 Parsing additionalProjectData.ts with correct structure...');
    
    // Extract each category section
    const categories = ['appartment', 'house-normal', 'village', 'house-business'];
    const allProjects = [];
    
    categories.forEach(category => {
      console.log(`\n🔍 Processing category: ${category}`);
      
      // Find the category section
      const categoryPattern = new RegExp(`${category}:\\s*\\[([\\s\\S]*?)\\](?=\\s*,\\s*["']?\\w+["']?:\\s*\\[|\\s*}\\s*;)`, 'g');
      const categoryMatch = categoryPattern.exec(tsContent);
      
      if (!categoryMatch) {
        console.log(`   ⚠️  Category ${category} not found`);
        return;
      }
      
      const categoryContent = categoryMatch[1];
      
      // Split projects within this category
      const projectSections = categoryContent.split(/,\s*{\s*id:/);
      
      projectSections.forEach((section, index) => {
        try {
          // Add back the opening brace and id for all but the first section
          const fullSection = index === 0 ? section : '{ id:' + section;
          
          if (fullSection.trim().length < 50) {
            return; // Skip very short sections
          }
          
          // Extract fields using more robust patterns
          const idMatch = fullSection.match(/id:\s*(\d+)/);
          const projectIdMatch = fullSection.match(/projectId:\s*["']([^"']+)["']/);
          const titleMatch = fullSection.match(/title:\s*["']([^"']+)["']/);
          const clientNameMatch = fullSection.match(/clientName:\s*["']([^"']*)["']/);
          const areaMatch = fullSection.match(/area:\s*["']([^"']*)["']/);
          const constructionDateMatch = fullSection.match(/constructionDate:\s*["']([^"']*)["']/);
          const addressMatch = fullSection.match(/address:\s*["']([^"']*)["']/);
          const descriptionMatch = fullSection.match(/description:\s*["']([^"']*)["']/);
          const styleMatch = fullSection.match(/style:\s*["']([^"']*)["']/);
          const thumbnailImageMatch = fullSection.match(/thumbnailImage:\s*["']([^"']*)["']/);
          const projectStatusMatch = fullSection.match(/projectStatus:\s*["']([^"']*)["']/);
          const completionDateMatch = fullSection.match(/completionDate:\s*["']([^"']*)["']/);
          const architectNameMatch = fullSection.match(/architectName:\s*["']([^"']*)["']/);
          const contractorNameMatch = fullSection.match(/contractorName:\s*["']([^"']*)["']/);
          const metaTitleMatch = fullSection.match(/metaTitle:\s*["']([^"']*)["']/);
          const metaDescriptionMatch = fullSection.match(/metaDescription:\s*["']([^"']*)["']/);
          const isActiveMatch = fullSection.match(/isActive:\s*(true|false)/);
          const isOnHomePageMatch = fullSection.match(/isOnHomePage:\s*(true|false)/);
          
          // Extract project images array
          const projectImagesMatch = fullSection.match(/projectImages:\s*\[([\s\S]*?)\]/);
          let projectImages = [];
          if (projectImagesMatch) {
            const imagesString = projectImagesMatch[1];
            const imageMatches = imagesString.match(/["']([^"']+)["']/g);
            if (imageMatches) {
              projectImages = imageMatches.map(img => img.replace(/["']/g, ''));
            }
          }
          
          // Extract tags array
          const tagsMatch = fullSection.match(/tags:\s*\[([\s\S]*?)\]/);
          let tags = [];
          if (tagsMatch) {
            const tagsString = tagsMatch[1];
            const tagMatches = tagsString.match(/["']([^"']+)["']/g);
            if (tagMatches) {
              tags = tagMatches.map(tag => tag.replace(/["']/g, ''));
            }
          }
          
          if (idMatch && projectIdMatch && titleMatch) {
            // Map category to valid project_category_id
            const categoryMapping = {
              'house-normal': 6,
              'appartment': 7,
              'village': 8,
              'house-business': 9
            };
            
            const project = {
              id: parseInt(idMatch[1]),
              projectId: projectIdMatch[1],
              title: titleMatch[1],
              clientName: clientNameMatch ? clientNameMatch[1] : '',
              area: areaMatch ? areaMatch[1] : '',
              constructionDate: constructionDateMatch ? constructionDateMatch[1] : '2024-01-01',
              address: addressMatch ? addressMatch[1] : '',
              description: descriptionMatch ? descriptionMatch[1] : '',
              category: category,
              projectCategoryId: categoryMapping[category] || 6,
              style: styleMatch ? styleMatch[1] : 'Hiện đại',
              thumbnailImage: thumbnailImageMatch ? thumbnailImageMatch[1] : '',
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
            
            allProjects.push(project);
            console.log(`   ✅ Parsed: ${project.projectId} - ${project.title}`);
          } else {
            console.log(`   ⚠️  Skipped section ${index + 1}: Missing required fields`);
            if (!idMatch) console.log(`       - Missing ID`);
            if (!projectIdMatch) console.log(`       - Missing projectId`);
            if (!titleMatch) console.log(`       - Missing title`);
          }
          
        } catch (error) {
          console.error(`   ❌ Error parsing section ${index + 1}:`, error.message);
        }
      });
    });
    
    console.log(`\n✅ Successfully parsed ${allProjects.length} projects total`);
    return allProjects;
    
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
