const fs = require('fs');
const path = require('path');
const knex = require('knex');

// Load knex configuration
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

/**
 * Convert a file path to base64 data URL
 * @param {string} filePath - Path to the image file
 * @returns {string|null} - Base64 data URL or null if file doesn't exist
 */
function fileToBase64(filePath) {
  try {
    // Remove localhost URL prefix if present
    let cleanPath = filePath;
    if (filePath.startsWith('http://localhost:9000/pgdesign-assets/')) {
      cleanPath = filePath.replace('http://localhost:9000/pgdesign-assets/', '');
    }
    
    // Construct full path to the file
    const fullPath = path.join(__dirname, '../../../public/', cleanPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ File not found: ${fullPath}`);
      return null;
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
    return null;
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
    if (base64) {
      console.log(`✅ Converted HTML image: ${url}`);
      return `src="${base64}"`;
    }
    console.log(`⚠️  Keeping original HTML image URL: ${url}`);
    return match;
  });
}

/**
 * Main conversion function
 */
async function convertProjectDetailsUrls() {
  try {
    console.log('🚀 Starting Project Details URL to Base64 conversion...');
    
    // Fetch all project details
    const projectDetails = await db('project_details').select('*');
    console.log(`📊 Found ${projectDetails.length} project detail records`);
    
    let convertedCount = 0;
    let errorCount = 0;
    
    for (const project of projectDetails) {
      console.log(`\n🔄 Processing project: ${project.project_id} - ${project.title}`);
      
      const updates = {};
      let hasUpdates = false;
      
      // Convert thumbnail_image
      if (project.thumbnail_image && !project.thumbnail_image_blob) {
        console.log(`🖼️  Converting thumbnail: ${project.thumbnail_image}`);
        const base64Thumbnail = fileToBase64(project.thumbnail_image);
        if (base64Thumbnail) {
          updates.thumbnail_image_blob = base64Thumbnail;
          hasUpdates = true;
          console.log(`✅ Thumbnail converted successfully`);
        } else {
          console.log(`❌ Failed to convert thumbnail`);
          errorCount++;
        }
      }
      
      // Convert project_images array
      if (project.project_images && !project.project_images_blob) {
        console.log(`🖼️  Converting project images array...`);
        let projectImages;
        
        try {
          projectImages = typeof project.project_images === 'string' 
            ? JSON.parse(project.project_images)
            : project.project_images;
        } catch (error) {
          console.log(`❌ Failed to parse project_images JSON:`, error.message);
          errorCount++;
          continue;
        }
        
        if (Array.isArray(projectImages) && projectImages.length > 0) {
          const base64Images = [];
          
          for (const imageUrl of projectImages) {
            console.log(`  🔄 Converting: ${imageUrl}`);
            const base64Image = fileToBase64(imageUrl);
            if (base64Image) {
              base64Images.push(base64Image);
              console.log(`  ✅ Converted successfully`);
            } else {
              console.log(`  ❌ Failed to convert`);
              errorCount++;
            }
          }
          
          if (base64Images.length > 0) {
            updates.project_images_blob = JSON.stringify(base64Images);
            hasUpdates = true;
            console.log(`✅ Project images array converted: ${base64Images.length} images`);
          }
        }
      }
      
      // Convert HTML content images
      if (project.html_content) {
        console.log(`📝 Converting HTML content images...`);
        const updatedHtmlContent = convertHtmlImageUrls(project.html_content);
        if (updatedHtmlContent !== project.html_content) {
          updates.html_content = updatedHtmlContent;
          hasUpdates = true;
          console.log(`✅ HTML content images converted`);
        }
      }
      
      // Update the record if there are changes
      if (hasUpdates) {
        await db('project_details')
          .where('id', project.id)
          .update(updates);
        
        convertedCount++;
        console.log(`✅ Project ${project.project_id} updated successfully`);
      } else {
        console.log(`ℹ️  No updates needed for project ${project.project_id}`);
      }
    }
    
    console.log('\n🎉 Conversion completed!');
    console.log(`📊 Summary:`);
    console.log(`   • Total projects: ${projectDetails.length}`);
    console.log(`   • Successfully converted: ${convertedCount}`);
    console.log(`   • Errors encountered: ${errorCount}`);
    
  } catch (error) {
    console.error('💥 Error during conversion:', error);
  } finally {
    await db.destroy();
  }
}

// Run the conversion
convertProjectDetailsUrls();

