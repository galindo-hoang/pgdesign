const fs = require('fs');
const path = require('path');
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

// Function to convert image to base64
function imageToBase64(imagePath) {
  try {
    const fullPath = path.resolve(__dirname, '../../src/assets/images/projectpage/project-hero.png');
    console.log('Looking for image at:', fullPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log('Image not found at:', fullPath);
      return null;
    }
    
    const imageBuffer = fs.readFileSync(fullPath);
    const base64String = imageBuffer.toString('base64');
    const mimeType = 'image/png'; // Assuming PNG format
    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
}

// Mock About Project Data (converted from frontend service)
const mockAboutProjectData = {
  title: "Dự án",
  subtitle: "PG DESIGN",
  backgroundImageBlob: null, // Will be set from image file
  isActive: true,
};

async function resetAboutProjectData() {
  try {
    console.log('🚀 Starting About Project data reset...');

    // Convert image to base64
    console.log('📷 Converting background image to base64...');
    const backgroundImageBlob = imageToBase64();
    
    if (backgroundImageBlob) {
      mockAboutProjectData.backgroundImageBlob = backgroundImageBlob;
      console.log('✅ Background image converted successfully');
    } else {
      console.log('⚠️  Warning: Could not convert background image, proceeding without image');
    }

    // Delete all existing about project data
    console.log('🗑️  Deleting existing about project data...');
    const deletedCount = await knex('about_project_data').del();
    console.log(`✅ Deleted ${deletedCount} existing records`);

    // Insert new mock data
    console.log('📝 Inserting new about project data...');
    const insertData = {
      title: mockAboutProjectData.title,
      subtitle: mockAboutProjectData.subtitle,
      background_image_blob: mockAboutProjectData.backgroundImageBlob,
      is_active: mockAboutProjectData.isActive,
      created_at: new Date(),
      updated_at: new Date()
    };

    const [insertedId] = await knex('about_project_data').insert(insertData);
    console.log(`✅ Inserted new about project data with ID: ${insertedId}`);

    // Verify the insertion
    const insertedData = await knex('about_project_data')
      .where('id', insertedId)
      .first();

    if (insertedData) {
      console.log('✅ Verification successful:');
      console.log(`   - ID: ${insertedData.id}`);
      console.log(`   - Title: ${insertedData.title}`);
      console.log(`   - Subtitle: ${insertedData.subtitle}`);
      console.log(`   - Has Background Image: ${insertedData.background_image_blob ? 'Yes' : 'No'}`);
      console.log(`   - Is Active: ${insertedData.is_active}`);
      console.log(`   - Created At: ${insertedData.created_at}`);
    }

    console.log('🎉 About Project data reset completed successfully!');

  } catch (error) {
    console.error('❌ Error resetting about project data:', error);
    throw error;
  }
}

// Run the script
if (require.main === module) {
  resetAboutProjectData()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { resetAboutProjectData };
