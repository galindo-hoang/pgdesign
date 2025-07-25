const fs = require('fs');
const path = require('path');

// Project mapping with new image prefixes
const projectMapping = {
  appartment: {
    'PICITY Q12': {
      title: 'Thiết Kế Nội Thất Căn Hộ PICITY Q12',
      clientName: 'Khách hàng PICITY Q12',
      prefix: 'picity-q12',
      imageCount: 14
    },
    'CHỊ PHƯƠNG - OPAL GARDEN': {
      title: 'Thiết Kế Nội Thất Opal Garden',
      clientName: 'Chị Phương',
      prefix: 'opal-garden',
      imageCount: 12
    },
    'Mr.Lượng - Opal Skyline': {
      title: 'Thiết Kế Nội Thất Opal Skyline',
      clientName: 'Mr. Lượng',
      prefix: 'opal-skyline',
      imageCount: 12
    },
    'ANH ĐĂNG - PHÚ GIA HƯNG - GÒ VẤP': {
      title: 'Thiết Kế Nội Thất Phú Gia Hưng',
      clientName: 'Anh Đăng',
      prefix: 'phu-gia-hung',
      imageCount: 12
    },
    'HOÀNG NHI - DIAMOND CENTERY': {
      title: 'Thiết Kế Nội Thất Diamond Center',
      clientName: 'Hoàng Nhi',
      prefix: 'diamond-center',
      imageCount: 21
    },
    'ANH TUẤN - CITYLAND PARK HILL': {
      title: 'Thiết Kế Nội Thất Cityland Park Hill',
      clientName: 'Anh Tuấn',
      prefix: 'cityland-park-hill',
      imageCount: 19
    },
    'ANH HOÀNG - BÌNH DƯƠNG': {
      title: 'Thiết Kế Nội Thất Bình Dương',
      clientName: 'Anh Hoàng',
      prefix: 'binh-duong',
      imageCount: 19
    },
    'ANH TÙNG - CHỊ THU': {
      title: 'Thiết Kế Nội Thất Căn Hộ Gia Đình',
      clientName: 'Anh Tùng & Chị Thu',
      prefix: 'can-ho-gia-dinh',
      imageCount: 19
    },
    'CHỊ HÀ - PEGASUITE - QUẬN 8': {
      title: 'Thiết Kế Nội Thất Pegasuite',
      clientName: 'Chị Hà',
      prefix: 'pegasuite',
      imageCount: 9
    }
  },
  'house-normal': {
    'CHỊ TÚ - LONG AN': {
      title: 'Thiết Kế Nhà Phố Long An',
      clientName: 'Chị Tú',
      prefix: 'nha-pho-long-an',
      imageCount: 9
    },
    'NHÀ BÈ': {
      title: 'Thiết Kế Nhà Phố Nhà Bè',
      clientName: 'Khách hàng Nhà Bè',
      prefix: 'nha-pho-nha-be',
      imageCount: 15
    },
    'LONG AN - INDOCHINE': {
      title: 'Thiết Kế Nhà Phố Indochine',
      clientName: 'Khách hàng Indochine',
      prefix: 'nha-pho-indochine',
      imageCount: 6
    },
    'MS.HƯƠNG': {
      title: 'Thiết Kế Nhà Phố Ms. Hương',
      clientName: 'Ms. Hương',
      prefix: 'nha-pho-ms-huong',
      imageCount: 12
    },
    'LONG THÀNH': {
      title: 'Thiết Kế Nhà Phố Long Thành',
      clientName: 'Khách hàng Long Thành',
      prefix: 'nha-pho-long-thanh',
      imageCount: 13
    }
  },
  village: {
    'MOLAR VILLA - QUẬN 9': {
      title: 'Thiết Kế Molar Villa',
      clientName: 'Khách hàng Molar Villa',
      prefix: 'molar-villa',
      imageCount: 7
    },
    'SKY LINKED VILLA': {
      title: 'Thiết Kế Sky Linked Villa',
      clientName: 'Khách hàng Sky Linked Villa',
      prefix: 'sky-linked-villa',
      imageCount: 23
    },
    'VILLA SUMMER': {
      title: 'Thiết Kế Villa Summer',
      clientName: 'Khách hàng Villa Summer',
      prefix: 'villa-summer',
      imageCount: 9
    }
  }
};

// Function to generate new image paths
function generateNewImagePaths(category, projectInfo) {
  const imagePaths = [];
  
  for (let i = 1; i <= projectInfo.imageCount; i++) {
    const imageNumber = String(i).padStart(2, '0');
    const imagePath = `/assets/${category}/${projectInfo.prefix}-${imageNumber}.png`;
    imagePaths.push(imagePath);
  }
  
  return imagePaths;
}

// Function to convert null values to undefined for TypeScript compatibility
function convertNullToUndefined(obj) {
  if (obj === null) return undefined;
  if (Array.isArray(obj)) {
    return obj.map(convertNullToUndefined);
  }
  if (typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = convertNullToUndefined(value);
    }
    return result;
  }
  return obj;
}

// Function to update project data with new image paths
function updateProjectData() {
  console.log('🔄 Updating project data with new image paths...');
  
  // Read the current project data
  const projectDataPath = path.join(__dirname, 'project-mock-data.json');
  const projectData = JSON.parse(fs.readFileSync(projectDataPath, 'utf8'));
  
  // Convert null values to undefined
  const convertedData = convertNullToUndefined(projectData);
  
  let updatedCount = 0;
  
  // Update each category
  Object.entries(projectMapping).forEach(([category, projects]) => {
    console.log(`\n📁 Updating ${category} projects...`);
    
    Object.entries(projects).forEach(([folderName, projectInfo]) => {
      // Find the project in the data
      const project = convertedData[category]?.find(p => 
        p.clientName === projectInfo.clientName || 
        p.title === projectInfo.title
      );
      
      if (project) {
        // Generate new image paths
        const newImagePaths = generateNewImagePaths(category, projectInfo);
        
        // Update thumbnail image (use first image)
        project.thumbnailImage = newImagePaths[0];
        
        // Update project images array
        project.projectImages = newImagePaths;
        
        console.log(`   ✅ Updated ${projectInfo.title}`);
        console.log(`      Thumbnail: ${project.thumbnailImage}`);
        console.log(`      Images: ${project.projectImages.length} images`);
        
        updatedCount++;
      } else {
        console.log(`   ⚠️  Project not found: ${projectInfo.title}`);
      }
    });
  });
  
  // Write updated data back to file
  fs.writeFileSync(projectDataPath, JSON.stringify(convertedData, null, 2));
  
  console.log(`\n🎉 Updated ${updatedCount} projects with new image paths`);
  console.log('📄 Updated project-mock-data.json');
  
  return convertedData;
}

// Function to generate updated TypeScript import file
function generateUpdatedTypeScriptFile(projectData) {
  console.log('\n📝 Generating updated TypeScript import file...');
  
  const tsContent = `// Auto-generated project data from images (Updated with new image paths)
// Generated on: ${new Date().toISOString()}

import { ProjectDetail } from '../types/projectCategoryPageTypes';

export const additionalProjectData: {
  appartment: ProjectDetail[];
  "house-normal": ProjectDetail[];
  village: ProjectDetail[];
} = {
  appartment: ${JSON.stringify(projectData.appartment, null, 2)},
  "house-normal": ${JSON.stringify(projectData["house-normal"], null, 2)},
  village: ${JSON.stringify(projectData.village, null, 2)}
};

// Helper function to get all projects by category
export const getProjectsByCategory = (category: string): ProjectDetail[] => {
  switch (category) {
    case 'appartment':
      return additionalProjectData.appartment;
    case 'house-normal':
      return additionalProjectData["house-normal"];
    case 'village':
      return additionalProjectData.village;
    default:
      return [];
  }
};

// Helper function to get all projects
export const getAllProjects = (): ProjectDetail[] => {
  return [
    ...additionalProjectData.appartment,
    ...additionalProjectData["house-normal"],
    ...additionalProjectData.village
  ];
};

// Helper function to get project by ID
export const getProjectById = (id: number): ProjectDetail | undefined => {
  const allProjects = getAllProjects();
  return allProjects.find(project => project.id === id);
};

// Helper function to get project by project ID
export const getProjectByProjectId = (projectId: string): ProjectDetail | undefined => {
  const allProjects = getAllProjects();
  return allProjects.find(project => project.projectId === projectId);
};
`;

  // Write to TypeScript file
  const tsFilePath = path.join(__dirname, 'additionalProjectData.ts');
  fs.writeFileSync(tsFilePath, tsContent);
  
  console.log('✅ Generated updated additionalProjectData.ts');
}

// Main function
function main() {
  console.log('🖼️  Project Image Path Update Script');
  console.log('=====================================');
  
  try {
    // Update project data
    const updatedProjectData = updateProjectData();
    
    // Generate updated TypeScript file
    generateUpdatedTypeScriptFile(updatedProjectData);
    
    console.log('\n🎉 Update Complete!');
    console.log('===================');
    console.log('📝 Next Steps:');
    console.log('1. Copy the updated additionalProjectData.ts to src/services/');
    console.log('2. Test the website to ensure images load correctly');
    console.log('3. Verify that all project images display properly');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { updateProjectData, generateUpdatedTypeScriptFile }; 