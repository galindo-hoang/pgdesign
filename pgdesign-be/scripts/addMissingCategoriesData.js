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
    let cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    const fullPath = path.join(__dirname, '../../public/', cleanPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${cleanPath} - using placeholder`);
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    }
    
    const fileBuffer = fs.readFileSync(fullPath);
    const fileExtension = path.extname(fullPath).toLowerCase();
    
    let mimeType = 'image/jpeg';
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
 * Parse additionalProjectData from TypeScript file - Complete version
 */
function parseAdditionalProjectDataComplete() {
  try {
    const tsFilePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
    const tsContent = fs.readFileSync(tsFilePath, 'utf8');
    
    console.log('📖 Parsing ALL categories from additionalProjectData.ts...');
    
    const categories = ['appartment', 'house-normal', 'village', 'house-business'];
    const allProjects = [];
    
    categories.forEach(category => {
      console.log(`\n🔍 Processing category: ${category}`);
      
      // Find the category section with more robust regex
      const categoryPattern = new RegExp(`${category.replace('-', '\\-')}:\\s*\\[([\\s\\S]*?)\\](?=\\s*,\\s*["']?[\\w\\-]+["']?:\\s*\\[|\\s*}\\s*;)`, 'g');
      const categoryMatch = categoryPattern.exec(tsContent);
      
      if (!categoryMatch) {
        console.log(`   ⚠️  Category ${category} not found`);
        return;
      }
      
      const categoryContent = categoryMatch[1];
      console.log(`   📄 Found ${category} section (${categoryContent.length} chars)`);
      
      // Split projects within this category - more robust approach
      const projectSections = [];
      let currentSection = '';
      let braceCount = 0;
      let inString = false;
      let stringChar = '';
      
      for (let i = 0; i < categoryContent.length; i++) {
        const char = categoryContent[i];
        const prevChar = i > 0 ? categoryContent[i - 1] : '';
        
        if (!inString && (char === '"' || char === "'")) {
          inString = true;
          stringChar = char;
        } else if (inString && char === stringChar && prevChar !== '\\') {
          inString = false;
          stringChar = '';
        }
        
        if (!inString) {
          if (char === '{') braceCount++;
          if (char === '}') braceCount--;
        }
        
        currentSection += char;
        
        // When we complete a project object (braceCount back to 0 after a })
        if (!inString && braceCount === 0 && char === '}') {
          const trimmed = currentSection.trim();
          if (trimmed.length > 50 && trimmed.includes('id:')) {
            projectSections.push(trimmed);
            currentSection = '';
          }
        }
      }
      
      console.log(`   📊 Found ${projectSections.length} project sections`);
      
      projectSections.forEach((section, index) => {
        try {
          // Extract fields using robust patterns
          const idMatch = section.match(/id:\s*(\d+)/);
          const projectIdMatch = section.match(/projectId:\s*["']([^"']+)["']/);
          const titleMatch = section.match(/title:\s*["']([^"']+)["']/);
          const clientNameMatch = section.match(/clientName:\s*["']([^"']*)["']/);
          const areaMatch = section.match(/area:\s*["']([^"']*)["']/);
          const constructionDateMatch = section.match(/constructionDate:\s*["']([^"']*)["']/);
          const addressMatch = section.match(/address:\s*["']([^"']*)["']/);
          const descriptionMatch = section.match(/description:\s*["']([^"']*)["']/);
          const styleMatch = section.match(/style:\s*["']([^"']*)["']/);
          const thumbnailImageMatch = section.match(/thumbnailImage:\s*["']([^"']*)["']/);
          const projectStatusMatch = section.match(/projectStatus:\s*["']([^"']*)["']/);
          const completionDateMatch = section.match(/completionDate:\s*["']([^"']*)["']/);
          const architectNameMatch = section.match(/architectName:\s*["']([^"']*)["']/);
          const contractorNameMatch = section.match(/contractorName:\s*["']([^"']*)["']/);
          const metaTitleMatch = section.match(/metaTitle:\s*["']([^"']*)["']/);
          const metaDescriptionMatch = section.match(/metaDescription:\s*["']([^"']*)["']/);
          const isActiveMatch = section.match(/isActive:\s*(true|false)/);
          const isOnHomePageMatch = section.match(/isOnHomePage:\s*(true|false)/);
          
          // Extract project images array
          const projectImagesMatch = section.match(/projectImages:\s*\[([\s\S]*?)\]/);
          let projectImages = [];
          if (projectImagesMatch) {
            const imagesString = projectImagesMatch[1];
            const imageMatches = imagesString.match(/["']([^"']+)["']/g);
            if (imageMatches) {
              projectImages = imageMatches.map(img => img.replace(/["']/g, ''));
            }
          }
          
          // Extract tags array
          const tagsMatch = section.match(/tags:\s*\[([\s\S]*?)\]/);
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
    
    // Group by category for summary
    const byCategory = {};
    allProjects.forEach(project => {
      if (!byCategory[project.category]) byCategory[project.category] = [];
      byCategory[project.category].push(project);
    });
    
    console.log('\n📊 Projects by category:');
    Object.keys(byCategory).forEach(cat => {
      console.log(`   • ${cat}: ${byCategory[cat].length} projects`);
    });
    
    return allProjects;
    
  } catch (error) {
    console.error('❌ Error parsing additionalProjectData:', error);
    return [];
  }
}

/**
 * Add missing projects to database
 */
async function addMissingCategoriesData() {
  try {
    console.log('🚀 Adding missing categories data from additionalProjectData...');
    
    // Get existing project IDs
    const existingProjects = await db('project_details').select('project_id');
    const existingIds = new Set(existingProjects.map(p => p.project_id));
    
    console.log(`📋 Found ${existingIds.size} existing projects in database`);
    
    // Parse all projects from additionalProjectData
    const allProjects = parseAdditionalProjectDataComplete();
    
    if (allProjects.length === 0) {
      throw new Error('No projects found in additionalProjectData');
    }
    
    // Filter out existing projects
    const newProjects = allProjects.filter(project => !existingIds.has(project.projectId));
    
    console.log(`\n📦 Found ${newProjects.length} new projects to add:`);
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
        console.error(`  ❌ Error adding project ${project.projectId}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Missing categories data addition finished!');
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
    console.error('💥 Adding missing categories failed:', error);
  } finally {
    await db.destroy();
  }
}

// Run the addition
addMissingCategoriesData();
