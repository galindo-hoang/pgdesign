import {
  ProjectPageData,
  AboutProjectData,
  StatsSectionData,
  ProjectCategoriesData,
  StatsItem,
  ProjectCategory,
  ApiResponse
} from '../types/projectPageTypes';

// Import asset images
import hero from "../assets/images/projectpage/project-hero.jpg";
import diaryImage1 from "../assets/images/diary-image-1.jpg";
import houseNormal from "../assets/images/projectpage/house-normal.jpg";
import appartment from "../assets/images/projectpage/appartment.png";
import houseBusiness from "../assets/images/projectpage/house-business.jpg";
import village from "../assets/images/projectpage/village.png";
import diaryImage2 from "../assets/images/diary-image-2.jpg";
import diaryImage3 from "../assets/images/diary-image-3.jpg";
import diaryImage4 from "../assets/images/diary-image-4.jpg";

// Import icon assets
import experienceIcon from "../assets/icons/experience-icon.svg";
import customerIcon from "../assets/icons/customer-icon.svg";
import designIcon from "../assets/icons/design-icon.svg";
import buildingIcon from "../assets/icons/building-icon.svg";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1';
const API_TIMEOUT = 10000; // 10 seconds

// Configuration for data source (can be controlled via environment variable)
const USE_MOCK_DATA = true;

// ========== MOCK DATA ==========

// Mock About Project Data
const mockAboutProjectData: AboutProjectData = {
  id: 1,
  title: 'Dự án',
  subtitle: 'PG DESIGN',
  backgroundImageUrl: hero,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock Stats Items
const mockStatsItems: StatsItem[] = [
  {
    id: 1,
    iconName: 'experience-icon',
    iconUrl: experienceIcon,
    targetValue: 5,
    label: 'Kinh nghiệm',
    suffix: '+ năm',
    description: 'Kinh nghiệm',
    backgroundImageUrl: diaryImage1,
    category: 'experience',
    displayOrder: 0
  },
  {
    id: 2,
    iconName: 'customer-icon',
    iconUrl: customerIcon,
    targetValue: 500,
    label: 'Khách hàng',
    suffix: '+',
    description: 'Tin tưởng & hài lòng',
    backgroundImageUrl: diaryImage2,
    category: 'customers',
    displayOrder: 1
  },
  {
    id: 3,
    iconName: 'design-icon',
    iconUrl: designIcon,
    targetValue: 450,
    label: 'Dự án',
    suffix: '+',
    description: 'Thiết kế hoàn thành',
    backgroundImageUrl: diaryImage3,
    category: 'projects',
    displayOrder: 2
  },
  {
    id: 4,
    iconName: 'building-icon',
    iconUrl: buildingIcon,
    targetValue: 98,
    label: 'Chất lượng',
    suffix: '%',
    description: 'Cam kết hoàn hảo',
    backgroundImageUrl: diaryImage4,
    category: 'quality',
    displayOrder: 3
  }
];

// Mock Stats Section Data
const mockStatsSectionData: StatsSectionData = {
  id: 1,
  mainHeadline: 'THÀNH TỰU CỦA CHÚNG TÔI',
  subHeadline: 'Những con số ấn tượng',
  description: 'Với nhiều năm kinh nghiệm trong lĩnh vực thiết kế kiến trúc và nội thất, chúng tôi tự hào mang đến những giải pháp tối ưu cho mọi không gian sống.',
  statsItems: mockStatsItems,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock Project Categories
const mockProjectCategories: ProjectCategory[] = [
  {
    id: 1,
    categoryId: 'house-normal',
    title: 'NHÀ PHỐ',
    projectCount: 45,
    backgroundImageUrl: houseNormal,
    navigationPath: '/projects/house-normal',
    displayOrder: 0
  },
  {
    id: 2,
    categoryId: 'appartment',
    title: 'CĂN HỘ',
    projectCount: 32,
    backgroundImageUrl: appartment,
    navigationPath: '/projects/appartment',
    displayOrder: 1
  },
  {
    id: 3,
    categoryId: 'village',
    title: 'Biệt thự',
    projectCount: 28,
    backgroundImageUrl: village,
    navigationPath: '/projects/village',
    displayOrder: 2
  },
  {
    id: 4,
    categoryId: 'house-business',
    title: 'Thương mại',
    projectCount: 50,
    backgroundImageUrl: houseBusiness,
    navigationPath: '/projects/house-business',
    displayOrder: 3
  }
];

// Mock Project Categories Data
const mockProjectCategoriesData: ProjectCategoriesData = {
  id: 1,
  mainTitle: 'DANH MỤC DỰ ÁN',
  subtitle: 'KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ',
  description: 'Từ những căn nhà phố hiện đại đến những biệt thự sang trọng, từ không gian nội thất tinh tế đến những ngôi nhà vườn xanh mát - chúng tôi mang đến giải pháp thiết kế toàn diện cho mọi nhu cầu.',
  categories: mockProjectCategories,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock Complete Project Page Data
const mockProjectPageData: ProjectPageData = {
  aboutProject: mockAboutProjectData,
  statsSection: mockStatsSectionData,
  projectCategories: mockProjectCategoriesData
};

// ========== MOCK DATA FUNCTIONS ==========

// Mock delay function to simulate API calls
const mockDelay = (ms: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API functions
export const fetchAboutProjectDataMock = async (): Promise<AboutProjectData> => {
  await mockDelay();
  console.log('Using mock AboutProjectData');
  return mockAboutProjectData;
};

export const fetchStatsSectionDataMock = async (): Promise<StatsSectionData> => {
  await mockDelay();
  console.log('Using mock StatsSectionData');
  return mockStatsSectionData;
};

export const fetchProjectCategoriesDataMock = async (): Promise<ProjectCategoriesData> => {
  await mockDelay();
  console.log('Using mock ProjectCategoriesData');
  return mockProjectCategoriesData;
};

export const fetchProjectPageDataMock = async (): Promise<ProjectPageData> => {
  await mockDelay();
  console.log('Using mock ProjectPageData');
  return mockProjectPageData;
};

// ========== API FUNCTIONS ==========

// Error handling utility
const handleApiError = (error: any, section: string) => {
  console.error(`Error fetching ${section} data:`, error);
  throw new Error(`Failed to fetch ${section} data. Please try again later.`);
};

// API Functions for each section
export const fetchAboutProjectDataApi = async (): Promise<AboutProjectData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projectpage/about-project`);
    const data: ApiResponse<AboutProjectData> = await response.json();
    
    console.log(`AboutProjectData from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch about project data');
    }
    
    return data.data!;
  } catch (error) {
    handleApiError(error, 'about project');
    throw error;
  }
};

export const fetchStatsSectionDataApi = async (): Promise<StatsSectionData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projectpage/stats-section`);
    const data: ApiResponse<StatsSectionData> = await response.json();
    
    console.log(`StatsSectionData from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch stats section data');
    }
    
    return data.data!;
  } catch (error) {
    handleApiError(error, 'stats section');
    throw error;
  }
};

export const fetchProjectCategoriesDataApi = async (): Promise<ProjectCategoriesData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projectpage/project-categories`);
    const data: ApiResponse<ProjectCategoriesData> = await response.json();
    
    console.log(`ProjectCategoriesData from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch project categories data');
    }
    
    return data.data!;
  } catch (error) {
    handleApiError(error, 'project categories');
    throw error;
  }
};

// Main function to fetch all project page data from API
export const fetchProjectPageDataApi = async (): Promise<ProjectPageData> => {
  try {
    // Fetch all data in parallel for better performance
    const [
      aboutProject,
      statsSection,
      projectCategories
    ] = await Promise.all([
      fetchAboutProjectDataApi(),
      fetchStatsSectionDataApi(),
      fetchProjectCategoriesDataApi()
    ]);

    return {
      aboutProject,
      statsSection,
      projectCategories
    };
  } catch (error) {
    handleApiError(error, 'project page');
    throw error;
  }
};

// ========== HYBRID FUNCTIONS (AUTO-SWITCH BETWEEN API AND MOCK) ==========

// Auto-switch functions based on configuration
export const fetchAboutProjectData = async (): Promise<AboutProjectData> => {
  return USE_MOCK_DATA ? fetchAboutProjectDataMock() : fetchAboutProjectDataApi();
};

export const fetchStatsSectionData = async (): Promise<StatsSectionData> => {
  return USE_MOCK_DATA ? fetchStatsSectionDataMock() : fetchStatsSectionDataApi();
};

export const fetchProjectCategoriesData = async (): Promise<ProjectCategoriesData> => {
  return USE_MOCK_DATA ? fetchProjectCategoriesDataMock() : fetchProjectCategoriesDataApi();
};

// Main function to fetch all project page data (auto-switch)
export const fetchProjectPageData = async (): Promise<ProjectPageData> => {
  return USE_MOCK_DATA ? fetchProjectPageDataMock() : fetchProjectPageDataApi();
};

// ========== UTILITY FUNCTIONS ==========

// Utility function to check API health
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// Utility function to get current data source
export const getCurrentDataSource = (): 'mock' | 'api' => {
  return USE_MOCK_DATA ? 'mock' : 'api';
};

// Utility function to get mock data directly
export const getMockData = () => ({
  aboutProject: mockAboutProjectData,
  statsSection: mockStatsSectionData,
  projectCategories: mockProjectCategoriesData,
  complete: mockProjectPageData
});

// Export mock data for direct access
export {
  mockAboutProjectData,
  mockStatsSectionData,
  mockProjectCategoriesData,
  mockProjectPageData,
  mockStatsItems,
  mockProjectCategories
}; 