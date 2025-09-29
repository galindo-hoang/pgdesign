const fs = require('fs');
const path = require('path');
const knex = require('knex');

// Load knex configuration
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

/**
 * Generate a small placeholder base64 image (1x1 pixel)
 */
function generateSmallPlaceholder() {
  // 1x1 transparent PNG - very small
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
}

/**
 * Convert a file path to base64 data URL - with size limit
 */
function fileToBase64Optimized(filePath) {
  try {
    let cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    const fullPath = path.join(__dirname, '../../public/', cleanPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${cleanPath} - using small placeholder`);
      return generateSmallPlaceholder();
    }
    
    const stats = fs.statSync(fullPath);
    
    // Skip files larger than 500KB to avoid MySQL packet issues
    if (stats.size > 500 * 1024) {
      console.log(`⚠️  File too large (${Math.round(stats.size/1024)}KB): ${cleanPath} - using placeholder`);
      return generateSmallPlaceholder();
    }
    
    const fileBuffer = fs.readFileSync(fullPath);
    const fileExtension = path.extname(fullPath).toLowerCase();
    
    let mimeType = 'image/jpeg';
    if (fileExtension === '.png') mimeType = 'image/png';
    else if (fileExtension === '.gif') mimeType = 'image/gif';
    else if (fileExtension === '.webp') mimeType = 'image/webp';
    
    const base64String = fileBuffer.toString('base64');
    const result = `data:${mimeType};base64,${base64String}`;
    
    // Check final base64 size
    if (result.length > 1000000) { // 1MB limit for base64
      console.log(`⚠️  Base64 too large (${Math.round(result.length/1024)}KB): ${cleanPath} - using placeholder`);
      return generateSmallPlaceholder();
    }
    
    return result;
  } catch (error) {
    console.error(`❌ Error converting file ${filePath}:`, error.message);
    return generateSmallPlaceholder();
  }
}

/**
 * Parse additionalProjectData from TypeScript file - Optimized version
 */
function parseAdditionalProjectDataOptimized() {
  try {
    const tsFilePath = path.join(__dirname, '../../src/services/additionalProjectData.ts');
    const tsContent = fs.readFileSync(tsFilePath, 'utf8');
    
    console.log('📖 Parsing ALL categories from additionalProjectData.ts...');
    
    const categories = ['appartment', 'house-normal', 'village', 'house-business'];
    const allProjects = [];
    
    categories.forEach(category => {
      console.log(`\n🔍 Processing category: ${category}`);
      
      // Find the category section with more robust regex
      const categoryPattern = new RegExp(`["']?${category.replace('-', '\\-')}["']?:\\s*\\[([\\s\\S]*?)\\]`, 'g');
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
 * Add missing projects to database - Optimized version
 */
async function addMissingCategoriesOptimized() {
  try {
    console.log('🚀 Adding missing categories data (optimized for MySQL packet size)...');
    
    // Get existing project IDs
    const existingProjects = await db('project_details').select('project_id');
    const existingIds = new Set(existingProjects.map(p => p.project_id));
    
    console.log(`📋 Found ${existingIds.size} existing projects in database`);
    
    // Parse all projects from additionalProjectData
    const allProjects = parseAdditionalProjectDataOptimized();
    
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
        
        // Convert thumbnail image to base64 (optimized)
        const thumbnailImageBlob = project.thumbnailImage ? 
          fileToBase64Optimized(project.thumbnailImage) : generateSmallPlaceholder();
        
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
        
        // Create optimized image records for project_image_blob_detail
        const imageRecords = [];
        
        if (project.projectImages && project.projectImages.length > 0) {
          console.log(`  🖼️  Converting ${Math.min(project.projectImages.length, 3)} images (limit 3 for performance)...`);
          
          // Limit to first 3 images to avoid packet size issues
          const limitedImages = project.projectImages.slice(0, 3);
          
          limitedImages.forEach((imagePath, index) => {
            const imageBlob = fileToBase64Optimized(imagePath);
            
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
addMissingCategoriesOptimized();
