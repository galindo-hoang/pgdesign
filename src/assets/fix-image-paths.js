const fs = require('fs');
const path = require('path');

// Project mapping with correct folder names
const projectMapping = {
  appartment: {
    'PICITY Q12': {
      title: 'Thiết Kế Nội Thất Căn Hộ PICITY Q12',
      clientName: 'Khách hàng PICITY Q12',
      folderName: 'PICITY Q12',
      prefix: 'picity-q12',
      imageCount: 14
    },
    'CHỊ PHƯƠNG - OPAL GARDEN': {
      title: 'Thiết Kế Nội Thất Opal Garden',
      clientName: 'Chị Phương',
      folderName: 'CHỊ PHƯƠNG - OPAL GARDEN',
      prefix: 'opal-garden',
      imageCount: 12
    },
    'Mr.Lượng - Opal Skyline': {
      title: 'Thiết Kế Nội Thất Opal Skyline',
      clientName: 'Mr. Lượng',
      folderName: 'Mr.Lượng - Opal Skyline',
      prefix: 'opal-skyline',
      imageCount: 12
    },
    'ANH ĐĂNG - PHÚ GIA HƯNG - GÒ VẤP': {
      title: 'Thiết Kế Nội Thất Phú Gia Hưng',
      clientName: 'Anh Đăng',
      folderName: 'ANH ĐĂNG - PHÚ GIA HƯNG - GÒ VẤP',
      prefix: 'phu-gia-hung',
      imageCount: 12
    },
    'HOÀNG NHI - DIAMOND CENTERY': {
      title: 'Thiết Kế Nội Thất Diamond Center',
      clientName: 'Hoàng Nhi',
      folderName: 'HOÀNG NHI - DIAMOND CENTERY',
      prefix: 'diamond-center',
      imageCount: 21
    },
    'ANH TUẤN - CITYLAND PARK HILL': {
      title: 'Thiết Kế Nội Thất Cityland Park Hill',
      clientName: 'Anh Tuấn',
      folderName: 'ANH TUẤN - CITYLAND PARK HILL',
      prefix: 'cityland-park-hill',
      imageCount: 19
    },
    'ANH HOÀNG - BÌNH DƯƠNG': {
      title: 'Thiết Kế Nội Thất Bình Dương',
      clientName: 'Anh Hoàng',
      folderName: 'ANH HOÀNG - BÌNH DƯƠNG',
      prefix: 'binh-duong',
      imageCount: 19
    },
    'ANH TÙNG - CHỊ THU': {
      title: 'Thiết Kế Nội Thất Căn Hộ Gia Đình',
      clientName: 'Anh Tùng & Chị Thu',
      folderName: 'ANH TÙNG - CHỊ THU',
      prefix: 'can-ho-gia-dinh',
      imageCount: 19
    },
    'CHỊ HÀ - PEGASUITE - QUẬN 8': {
      title: 'Thiết Kế Nội Thất Pegasuite',
      clientName: 'Chị Hà',
      folderName: 'CHỊ HÀ - PEGASUITE - QUẬN 8',
      prefix: 'pegasuite',
      imageCount: 9
    }
  },
  'house-normal': {
    'CHỊ TÚ - LONG AN': {
      title: 'Thiết Kế Nhà Phố Long An',
      clientName: 'Chị Tú',
      folderName: 'CHỊ TÚ - LONG AN',
      prefix: 'nha-pho-long-an',
      imageCount: 9
    },
    'NHÀ BÈ': {
      title: 'Thiết Kế Nhà Phố Nhà Bè',
      clientName: 'Khách hàng Nhà Bè',
      folderName: 'NHÀ BÈ',
      prefix: 'nha-pho-nha-be',
      imageCount: 15
    },
    'LONG AN - INDOCHINE': {
      title: 'Thiết Kế Nhà Phố Indochine',
      clientName: 'Khách hàng Indochine',
      folderName: 'LONG AN - INDOCHINE',
      prefix: 'nha-pho-indochine',
      imageCount: 6
    },
    'MS.HƯƠNG': {
      title: 'Thiết Kế Nhà Phố Ms. Hương',
      clientName: 'Ms. Hương',
      folderName: 'MS.HƯƠNG',
      prefix: 'nha-pho-ms-huong',
      imageCount: 12
    },
    'LONG THÀNH': {
      title: 'Thiết Kế Nhà Phố Long Thành',
      clientName: 'Khách hàng Long Thành',
      folderName: 'LONG THÀNH',
      prefix: 'nha-pho-long-thanh',
      imageCount: 13
    }
  },
  village: {
    'MOLAR VILLA - QUẬN 9': {
      title: 'Thiết Kế Molar Villa',
      clientName: 'Khách hàng Molar Villa',
      folderName: 'MOLAR VILLA - QUẬN 9',
      prefix: 'molar-villa',
      imageCount: 7
    },
    'SKY LINKED VILLA': {
      title: 'Thiết Kế Sky Linked Villa',
      clientName: 'Khách hàng Sky Linked Villa',
      folderName: 'SKY LINKED VILLA',
      prefix: 'sky-linked-villa',
      imageCount: 23
    },
    'VILLA SUMMER': {
      title: 'Thiết Kế Villa Summer',
      clientName: 'Khách hàng Villa Summer',
      folderName: 'VILLA SUMMER',
      prefix: 'villa-summer',
      imageCount: 9
    }
  }
};

// Function to generate correct image paths
function generateCorrectImagePaths(category, projectInfo) {
  const imagePaths = [];
  
  for (let i = 1; i <= projectInfo.imageCount; i++) {
    const imageNumber = String(i).padStart(2, '0');
    
    // Check if the file exists with different extensions
    const publicPath = path.join(__dirname, '..', '..', 'public', 'assets', category, projectInfo.folderName);
    const jpgPath = path.join(publicPath, `${projectInfo.prefix}-${imageNumber}.png`);
    const pngPath = path.join(publicPath, `${projectInfo.prefix}-${imageNumber}.png`);
    
    let imagePath;
    if (fs.existsSync(jpgPath)) {
      imagePath = `/assets/${category}/${projectInfo.folderName}/${projectInfo.prefix}-${imageNumber}.png`;
    } else if (fs.existsSync(pngPath)) {
      imagePath = `/assets/${category}/${projectInfo.folderName}/${projectInfo.prefix}-${imageNumber}.png`;
    } else {
      // Fallback to jpg if file doesn't exist
      imagePath = `/assets/${category}/${projectInfo.folderName}/${projectInfo.prefix}-${imageNumber}.png`;
    }
    
    imagePaths.push(imagePath);
  }
  
  return imagePaths;
}

// Function to update project data with correct image paths
function updateProjectDataWithCorrectPaths() {
  console.log('🔄 Updating project data with correct image paths...');
  
  // Read the current project data
  const projectDataPath = path.join(__dirname, 'project-mock-data.json');
  const projectData = JSON.parse(fs.readFileSync(projectDataPath, 'utf8'));
  
  let updatedCount = 0;
  
  // Update each category
  Object.entries(projectMapping).forEach(([category, projects]) => {
    console.log(`\n📁 Updating ${category} projects...`);
    
    Object.entries(projects).forEach(([folderName, projectInfo]) => {
      // Find the project in the data
      const project = projectData[category]?.find(p => 
        p.clientName === projectInfo.clientName || 
        p.title === projectInfo.title
      );
      
      if (project) {
        // Generate correct image paths
        const correctImagePaths = generateCorrectImagePaths(category, projectInfo);
        
        // Update thumbnail image (use first image)
        project.thumbnailImage = correctImagePaths[0];
        
        // Update project images array
        project.projectImages = correctImagePaths;
        
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
  fs.writeFileSync(projectDataPath, JSON.stringify(projectData, null, 2));
  
  console.log(`\n🎉 Updated ${updatedCount} projects with correct image paths`);
  console.log('📄 Updated project-mock-data.json');
  
  return projectData;
}

// Function to generate updated TypeScript import file
function generateUpdatedTypeScriptFile(projectData) {
  console.log('\n📝 Generating updated TypeScript import file...');
  
  const tsContent = `// Auto-generated project data from images (Updated with correct image paths)
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
  console.log('🖼️  Project Image Path Fix Script');
  console.log('==================================');
  
  try {
    // Update project data with correct paths
    const updatedProjectData = updateProjectDataWithCorrectPaths();
    
    // Generate updated TypeScript file
    generateUpdatedTypeScriptFile(updatedProjectData);
    
    console.log('\n🎉 Fix Complete!');
    console.log('================');
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

module.exports = { updateProjectDataWithCorrectPaths, generateUpdatedTypeScriptFile }; 