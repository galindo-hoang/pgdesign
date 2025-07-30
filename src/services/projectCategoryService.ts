import {
  ProjectCategory,
  ProjectDetail,
  CategoryInfo,
  ApiResponse
} from '../types/projectCategoryPageTypes';

import { additionalProjectData } from './additionalProjectData';

import houseNormal from "../assets/images/projectpage/house-normal.png";
import appartment from "../assets/images/projectpage/appartment.png";
import houseBusiness from "../assets/images/projectpage/house-business.png";
import village from "../assets/images/projectpage/village.png";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1';
const API_TIMEOUT = 10000; // 10 seconds

// Configuration for data source
const USE_MOCK_DATA = true;

// ========== MOCK DATA ==========

// Mock categories mapping (matching our seeded data)
const mockCategoriesData: Record<string, Omit<ProjectCategory, 'projects'>> = {
  "house-normal": {
    id: 1,
    categoryId: "house-normal",
    title: "NHÀ PHỐ",
    description: "Thiết kế nhà phố hiện đại, tối ưu hóa không gian và ánh sáng tự nhiên cho cuộc sống đô thị.",
    heroImageUrl: houseNormal,
    displayOrder: 0,
    isActive: true,
    projectCount: 25
  },
  "appartment": {
    id: 2,
    categoryId: "appartment",
    title: "CĂN HỘ",
    description: "Hòa quyện kiến trúc với thiên nhiên, tạo nên không gian sống xanh và thư thái.",
    heroImageUrl: appartment,
    displayOrder: 1,
    isActive: true,
    projectCount: 18
  },
  "village": {
    id: 3,
    categoryId: "village",
    title: "BIỆT THỰ",
    description: "Thi công phần thô với chất lượng cao, đảm bảo kết cấu vững chắc cho công trình.",
    heroImageUrl: village,
    displayOrder: 2,
    isActive: true,
    projectCount: 12
  },
  "house-business": {
    id: 4,
    categoryId: "house-business",
    title: "THƯƠNG MẠI",
    description: "Thiết kế và thi công nội thất sang trọng, hiện đại phù hợp với phong cách sống.",
    heroImageUrl: houseBusiness,
    displayOrder: 3,
    isActive: true,
    projectCount: 30
  }
};



// Utility function for mock delay
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// ========== MOCK FUNCTIONS ==========

const fetchCategoryWithProjectsMock = async (categoryId: string): Promise<ProjectCategory> => {
  console.log(`🎭 Mock Data: Fetching category ${categoryId} with projects`);
  // await delay(800);

  const categoryInfo = mockCategoriesData[categoryId];
  if (!categoryInfo) {
    throw new Error(`Category ${categoryId} not found`);
  }
  const projects = additionalProjectData[categoryId as keyof typeof additionalProjectData];

  return {
    ...categoryInfo,
    projects: projects,
    projectCount: projects.length
  };
};

const fetchCategoryProjectForHomePageMock = async (): Promise<ProjectDetail[]> => {
  console.log(`🎭 Mock Data: Fetching projects for HomePage (isOnHomePage: true)`);
  // await delay(800);

  // Get all projects from additional data and filter by isOnHomePage flag
  const allProjects: ProjectDetail[] = [];
  
  // Collect projects from all categories
  Object.values(additionalProjectData).forEach(categoryProjects => {
    allProjects.push(...categoryProjects);
  });

  // Filter projects that are marked for homepage display
  const homePageProjects = allProjects.filter(project => project.isOnHomePage === true);
  
  console.log(`Found ${homePageProjects.length} projects for homepage out of ${allProjects.length} total projects`);
  
  return homePageProjects;
};

// ========== API FUNCTIONS ==========

const fetchCategoryWithProjectsApi = async (categoryId: string): Promise<ProjectCategory> => {
  try {
    console.log(`🌐 Real API: Fetching category ${categoryId} with projects`);
    
    const response = await fetch(`${API_BASE_URL}/projectdetail/category/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(API_TIMEOUT)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const projectsData: ApiResponse<ProjectDetail[]> = await response.json();
    
    if (!projectsData.success) {
      throw new Error(projectsData.message || 'Failed to fetch projects data');
    }

    // Get category info (you might need a separate API call for this)
    const categoryInfo: CategoryInfo = mockCategoriesData[categoryId] || {
      id: 1,
      categoryId: categoryId,
      title: categoryId.toUpperCase().replace(/-/g, ' '),
      description: `Category ${categoryId}`,
      heroImageUrl: '/assets/images/default-hero.png',
      displayOrder: 0,
      isActive: true
    };

    return {
      ...categoryInfo,
      projects: projectsData.data,
      projectCount: projectsData.data.length
    };
  } catch (error: any) {
    console.error(`Error fetching category ${categoryId}:`, error);
    throw new Error(`Failed to fetch category data: ${error.message}`);
  }
};

const fetchCategoryProjectForHomePageApi = async (): Promise<ProjectDetail[]> => {
  try {
    console.log(`🌐 Real API: Fetching projects for HomePage (isOnHomePage: true)`);
    
    const response = await fetch(`${API_BASE_URL}/projectdetail/homepage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(API_TIMEOUT)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const projectsData: ApiResponse<ProjectDetail[]> = await response.json();
    
    if (!projectsData.success) {
      throw new Error(projectsData.message || 'Failed to fetch homepage projects data');
    }

    console.log(`Found ${projectsData.data.length} projects for homepage from API`);
    
    return projectsData.data;
  } catch (error: any) {
    console.error(`Error fetching homepage projects:`, error);
    throw new Error(`Failed to fetch homepage projects data: ${error.message}`);
  }
};

// ========== EXPORTED FUNCTIONS ==========

/**
 * Fetch category with all its projects (Direct relationship: category -> projects)
 */
export const fetchCategoryWithProjects = async (categoryId: string): Promise<ProjectCategory> => {
  const dataSource = USE_MOCK_DATA ? '🎭 Mock Data' : '🌐 Real API';
  console.log(`${dataSource}: Fetching category ${categoryId} with projects`);
  
  return USE_MOCK_DATA 
    ? fetchCategoryWithProjectsMock(categoryId)
    : fetchCategoryWithProjectsApi(categoryId);
};

/**
 * Get current data source
 */
export const getCurrentDataSource = (): 'mock' | 'api' => {
  return USE_MOCK_DATA ? 'mock' : 'api';
};

/**
 * Get all available categories
 */
export const getAvailableCategories = (): string[] => {
  return Object.keys(mockCategoriesData);
};


export const fetchCategoryProjectForHomePage = async (): Promise<ProjectDetail[]> => {
  const dataSource = USE_MOCK_DATA ? '🎭 Mock Data' : '🌐 Real API';
  console.log(`${dataSource}: Fetching projects for HomePage (isOnHomePage: true)`);
  
  return USE_MOCK_DATA 
    ? fetchCategoryProjectForHomePageMock()
    : fetchCategoryProjectForHomePageApi();
};

// For backward compatibility (deprecated - use fetchCategoryWithProjects instead)
export const fetchCategoryWithSubCategories = fetchCategoryWithProjects; 