// Utility script to import project data from images into mock services
// This script helps you integrate the generated project-mock-data.json into your existing services

const fs = require('fs');
const path = require('path');

// Read the generated project data
const projectDataPath = path.join(__dirname, 'project-mock-data.json');
const projectData = JSON.parse(fs.readFileSync(projectDataPath, 'utf8'));

console.log('📁 Project Data Summary:');
console.log(`🏢 Appartment projects: ${projectData.appartment.length}`);
console.log(`🏠 House-normal projects: ${projectData["house-normal"].length}`);
console.log(`🏰 Village projects: ${projectData.village.length}`);
console.log(`📊 Total projects: ${projectData.appartment.length + projectData["house-normal"].length + projectData.village.length}`);

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

// Function to generate TypeScript code for importing into services
function generateImportCode() {
  // Convert null values to undefined
  const convertedData = {
    appartment: convertNullToUndefined(projectData.appartment),
    "house-normal": convertNullToUndefined(projectData["house-normal"]),
    village: convertNullToUndefined(projectData.village)
  };

  let code = `// Auto-generated project data from images
// Generated on: ${new Date().toISOString()}

import { ProjectDetail } from '../types/projectCategoryPageTypes';

export const additionalProjectData: {
  appartment: ProjectDetail[];
  "house-normal": ProjectDetail[];
  village: ProjectDetail[];
} = {
  appartment: ${JSON.stringify(convertedData.appartment, null, 2)},
  "house-normal": ${JSON.stringify(convertedData["house-normal"], null, 2)},
  village: ${JSON.stringify(convertedData.village, null, 2)}
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

// Helper function to get project by projectId
export const getProjectByProjectId = (projectId: string): ProjectDetail | undefined => {
  const allProjects = getAllProjects();
  return allProjects.find(project => project.projectId === projectId);
};
`;

  return code;
}

// Function to generate integration instructions
function generateIntegrationInstructions() {
  return `
🔧 INTEGRATION INSTRUCTIONS:

1. 📁 Copy the generated TypeScript code above into a new file:
   src/services/additionalProjectData.ts

2. 🔄 Update your existing services to use this data:

   In src/services/projectCategoryService.ts:
   - Import the additional data: import { additionalProjectData } from './additionalProjectData';
   - Merge with existing mock data in the mockProjectsData object

   In src/services/projectDetailService.ts:
   - Import the additional data: import { getProjectByProjectId } from './additionalProjectData';
   - Use getProjectByProjectId() to fetch project details

3. 🖼️ Image Paths:
   - All image paths are relative to the public folder
   - Make sure images are accessible at: /assets/[category]/[project-folder]/[image-name]
   - Update image paths if your public folder structure is different

4. 🎯 Category Mapping:
   - appartment → projectCategoryId: 2
   - house-normal → projectCategoryId: 1  
   - village → projectCategoryId: 3

5. 📊 Data Structure:
   - Each project has realistic client names, addresses, budgets
   - Project status includes budget information (e.g., "Hoàn thành • 2.8 tỷ")
   - All projects have proper HTML content and meta information
   - Image arrays include all available images from each project folder

6. 🚀 Ready to Use:
   - All projects are marked as active (isActive: true)
   - Some projects are marked for homepage display (isOnHomePage: true)
   - Completion dates and construction dates are realistic
   - Architect and contractor names are consistent

7. 🔍 Testing:
   - Test the project category pages to see the new projects
   - Test individual project detail pages
   - Verify image loading and display
   - Check that budget information appears in project status

📝 NOTES:
- The data follows the same structure as your existing mock data
- All required fields are populated with realistic values
- Image paths match the actual folder structure in src/assets/
- Budget information is combined into projectStatus field as requested
- No projectSpecs fields are included (as per previous requirements)
`;
}

// Generate the TypeScript code
const tsCode = generateImportCode();
const instructions = generateIntegrationInstructions();

// Write the TypeScript file
const tsFilePath = path.join(__dirname, 'additionalProjectData.ts');
fs.writeFileSync(tsFilePath, tsCode);

console.log('\n✅ Generated files:');
console.log(`📄 ${projectDataPath} - Raw JSON data`);
console.log(`📄 ${tsFilePath} - TypeScript import file`);

console.log('\n' + instructions);

console.log('\n🎉 Ready to integrate! Follow the instructions above to add this data to your services.'); 