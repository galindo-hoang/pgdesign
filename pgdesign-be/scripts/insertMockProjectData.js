const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Mock data from frontend service
const mockProjectCategoriesData = {
  id: 1,
  mainTitle: "DANH MỤC DỰ ÁN",
  subtitle: "KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ",
  description: "Từ những căn nhà phố hiện đại đến những biệt thự sang trọng, từ không gian nội thất tinh tế đến những ngôi nhà vườn xanh mát - chúng tôi mang đến giải pháp thiết kế toàn diện cho mọi nhu cầu.",
  categories: [
    {
      id: 1,
      categoryId: "house-normal",
      title: "NHÀ PHỐ",
      projectCount: 45,
      backgroundImageUrl: "/src/assets/images/projectpage/house-normal.png",
      navigationPath: "/projects/house-normal",
      displayOrder: 0,
    },
    {
      id: 2,
      categoryId: "appartment",
      title: "CĂN HỘ",
      projectCount: 32,
      backgroundImageUrl: "/src/assets/images/projectpage/appartment.png",
      navigationPath: "/projects/appartment",
      displayOrder: 1,
    },
    {
      id: 3,
      categoryId: "village",
      title: "Biệt thự",
      projectCount: 28,
      backgroundImageUrl: "/src/assets/images/projectpage/village.png",
      navigationPath: "/projects/village",
      displayOrder: 2,
    },
    {
      id: 4,
      categoryId: "house-business",
      title: "Thương mại",
      projectCount: 50,
      backgroundImageUrl: "/src/assets/images/projectpage/house-business.png",
      navigationPath: "/projects/house-business",
      displayOrder: 3,
    },
  ],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Function to convert image to base64
async function convertImageToBase64(imagePath) {
  try {
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.warn(`Image not found: ${imagePath}`);
      return null;
    }

    // Process image with sharp for optimization
    const processedBuffer = await sharp(imagePath)
      .resize(800, 600, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Convert to base64
    const base64String = processedBuffer.toString('base64');
    return `data:image/jpeg;base64,${base64String}`;
  } catch (error) {
    console.error(`Error processing image ${imagePath}:`, error.message);
    return null;
  }
}

// Function to generate SQL insert statements
async function generateSQLInserts() {
  const sqlStatements = [];
  
  // Base path for frontend images
  const frontendPath = path.join(__dirname, '../../src/assets/images/projectpage');
  
  console.log('Converting images to base64...');
  
  // Process project categories data
  const categoriesData = {
    id: mockProjectCategoriesData.id,
    main_title: mockProjectCategoriesData.mainTitle,
    subtitle: mockProjectCategoriesData.subtitle,
    description: mockProjectCategoriesData.description,
    is_active: mockProjectCategoriesData.isActive,
    created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
  };

  // Insert project_categories_data
  sqlStatements.push(`
INSERT INTO project_categories_data (
  id, main_title, subtitle, description, is_active, created_at, updated_at
) VALUES (
  ${categoriesData.id},
  '${categoriesData.main_title.replace(/'/g, "''")}',
  '${categoriesData.subtitle.replace(/'/g, "''")}',
  '${categoriesData.description.replace(/'/g, "''")}',
  ${categoriesData.is_active},
  '${categoriesData.created_at}',
  '${categoriesData.updated_at}'
) ON DUPLICATE KEY UPDATE
  main_title = VALUES(main_title),
  subtitle = VALUES(subtitle),
  description = VALUES(description),
  is_active = VALUES(is_active),
  updated_at = VALUES(updated_at);
`);

  // Process each category
  for (const category of mockProjectCategoriesData.categories) {
    const imagePath = path.join(frontendPath, path.basename(category.backgroundImageUrl));
    const base64Image = await convertImageToBase64(imagePath);
    
    const categoryData = {
      id: category.id,
      categories_data_id: mockProjectCategoriesData.id,
      category_id: category.categoryId,
      title: category.title,
      project_count: category.projectCount,
      background_image_url: category.backgroundImageUrl,
      background_image_blob: base64Image,
      navigation_path: category.navigationPath,
      display_order: category.displayOrder,
      is_active: true,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    // Insert project category
    sqlStatements.push(`
INSERT INTO project_categories (
  id, categories_data_id, category_id, title, project_count, 
  background_image_url, background_image_blob, navigation_path, 
  display_order, is_active, created_at, updated_at
) VALUES (
  ${categoryData.id},
  ${categoryData.categories_data_id},
  '${categoryData.category_id}',
  '${categoryData.title.replace(/'/g, "''")}',
  ${categoryData.project_count},
  '${categoryData.background_image_url}',
  ${categoryData.background_image_blob ? `'${categoryData.background_image_blob}'` : 'NULL'},
  '${categoryData.navigation_path}',
  ${categoryData.display_order},
  ${categoryData.is_active},
  '${categoryData.created_at}',
  '${categoryData.updated_at}'
) ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  project_count = VALUES(project_count),
  background_image_url = VALUES(background_image_url),
  background_image_blob = VALUES(background_image_blob),
  navigation_path = VALUES(navigation_path),
  display_order = VALUES(display_order),
  is_active = VALUES(is_active),
  updated_at = VALUES(updated_at);
`);
  }

  return sqlStatements;
}

// Function to write SQL to file
async function writeSQLToFile() {
  try {
    const sqlStatements = await generateSQLInserts();
    const outputPath = path.join(__dirname, 'insert_mock_project_data.sql');
    
    const fullSQL = `-- Mock Project Categories Data Insert Script
-- Generated on: ${new Date().toISOString()}

-- Clear existing data (optional)
-- DELETE FROM project_categories;
-- DELETE FROM project_categories_data;

${sqlStatements.join('\n')}

-- Verify inserted data
SELECT 'Project Categories Data:' as info;
SELECT * FROM project_categories_data;

SELECT 'Project Categories:' as info;
SELECT id, category_id, title, project_count, navigation_path, display_order, is_active 
FROM project_categories 
ORDER BY display_order;
`;

    fs.writeFileSync(outputPath, fullSQL, 'utf8');
    console.log(`SQL file generated: ${outputPath}`);
    
    return outputPath;
  } catch (error) {
    console.error('Error generating SQL file:', error);
    throw error;
  }
}

// Function to execute SQL directly (if database connection is available)
async function executeSQL() {
  const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'pgdesign_dev',
    }
  });

  try {
    console.log('Connecting to database...');
    
    // Generate SQL statements
    const sqlStatements = await generateSQLInserts();
    
    // Execute each statement
    for (const sql of sqlStatements) {
      if (sql.trim()) {
        await knex.raw(sql);
        console.log('Executed SQL statement');
      }
    }
    
    console.log('✅ Mock project data inserted successfully!');
    
    // Verify data
    const categoriesData = await knex('project_categories_data').select('*');
    const categories = await knex('project_categories').select('*').orderBy('display_order');
    
    console.log('\n📊 Inserted Data Summary:');
    console.log('Project Categories Data:', categoriesData.length, 'records');
    console.log('Project Categories:', categories.length, 'records');
    
    categories.forEach(cat => {
      console.log(`- ${cat.title} (${cat.category_id}): ${cat.project_count} projects`);
    });
    
  } catch (error) {
    console.error('❌ Error executing SQL:', error);
    throw error;
  } finally {
    await knex.destroy();
  }
}

// Main execution
async function main() {
  const action = process.argv[2] || 'file';
  
  try {
    if (action === 'file') {
      await writeSQLToFile();
      console.log('✅ SQL file generated successfully!');
      console.log('Run: node insertMockProjectData.js execute (to insert into database)');
    } else if (action === 'execute') {
      await executeSQL();
    } else {
      console.log('Usage: node insertMockProjectData.js [file|execute]');
      console.log('  file    - Generate SQL file (default)');
      console.log('  execute - Insert data directly into database');
    }
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  generateSQLInserts,
  writeSQLToFile,
  executeSQL,
  mockProjectCategoriesData
};
