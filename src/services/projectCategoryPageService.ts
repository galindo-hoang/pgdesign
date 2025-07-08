// src/services/projectCategoryPageService.ts
import {
  ProjectCategoryPageData,
  CategoryData,
  SubCategory,
  ProjectItem,
  ApiResponse
} from '../types/projectCategoryPageTypes';

// Import asset images
import diaryImage1 from "../assets/images/diary-image-1.jpg";
import diaryImage2 from "../assets/images/diary-image-2.jpg";
import diaryImage3 from "../assets/images/diary-image-3.jpg";
import diaryImage4 from "../assets/images/diary-image-4.jpg";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 10000; // 10 seconds

// Configuration for data source (can be controlled via environment variable)
const USE_MOCK_DATA = true;

// ========== MOCK DATA ==========

// Sample project data generator
const getSampleProjects = (category: string, subCategory: string): ProjectItem[] => {
  const baseProjects = [
    {
      id: `${category}-${subCategory}-1`,
      title: `Dự án ${subCategory} #1`,
      thumbnailImage: diaryImage1,
      clientName: "Anh Nguyễn Văn A",
      area: "120m²",
      constructionDate: "12/2023",
      address: "Quận 7, TP.HCM",
      description: "Dự án thiết kế hiện đại với không gian mở, tận dụng ánh sáng tự nhiên.",
      category,
      subCategory,
      style: "Modern"
    },
    {
      id: `${category}-${subCategory}-2`,
      title: `Dự án ${subCategory} #2`,
      thumbnailImage: diaryImage2,
      clientName: "Chị Trần Thị B",
      area: "150m²",
      constructionDate: "10/2023",
      address: "Quận 2, TP.HCM",
      description: "Thiết kế kết hợp phong cách cổ điển và hiện đại.",
      category,
      subCategory,
      style: "Neoclassical"
    },
    {
      id: `${category}-${subCategory}-3`,
      title: `Dự án ${subCategory} #3`,
      thumbnailImage: diaryImage3,
      clientName: "Anh Lê Văn C",
      area: "200m²",
      constructionDate: "08/2023",
      address: "Quận 1, TP.HCM",
      description: "Không gian sang trọng với những chi tiết tinh tế.",
      category,
      subCategory,
      style: "Classical"
    },
    {
      id: `${category}-${subCategory}-4`,
      title: `Dự án ${subCategory} #4`,
      thumbnailImage: diaryImage4,
      clientName: "Chị Phạm Thị D",
      area: "180m²",
      constructionDate: "06/2023",
      address: "Quận 3, TP.HCM",
      description: "Thiết kế Indochine mang đậm hơi thở văn hóa Á Đông.",
      category,
      subCategory,
      style: "Indochine"
    }
  ];

  return baseProjects;
};

// Mock categories data
const getMockCategoriesData = (): { [key: string]: CategoryData } => {
  return {
    "house-normal": {
      id: "house-normal",
      title: "NHÀ PHỐ",
      description: "Thiết kế nhà phố hiện đại, tối ưu hóa không gian và ánh sáng tự nhiên cho cuộc sống đô thị.",
      heroImage: diaryImage1,
      subCategories: [
        {
          id: "nha-ong",
          title: "Nhà Ống",
          description: "Thiết kế cho mặt tiền hẹp, chiều sâu dài, tận dụng tối đa diện tích.",
          projects: getSampleProjects("house-normal", "Nhà Ống")
        },
        {
          id: "nha-lien-ke",
          title: "Nhà Liền Kề",
          description: "Nhà phố trong khu quy hoạch, kiến trúc đồng bộ và hiện đại.",
          projects: getSampleProjects("house-normal", "Nhà Liền Kề")
        },
        {
          id: "house-normal-san-vuon",
          title: "Nhà Phố Có Sân Vườn",
          description: "Kết hợp không gian xanh, tạo sự thông thoáng và gần gũi thiên nhiên.",
          projects: getSampleProjects("house-normal", "Nhà Phố Có Sân Vườn")
        },
        {
          id: "shophouse",
          title: "Shophouse",
          description: "Tầng trệt kinh doanh, tầng trên ở, tối ưu hóa mặt tiền thu hút khách hàng.",
          projects: getSampleProjects("house-normal", "Shophouse")
        }
      ]
    },
    "house-full": {
      id: "house-full",
      title: "NHÀ VƯỜN",
      description: "Hòa quyện kiến trúc với thiên nhiên, tạo nên không gian sống xanh và thư thái.",
      heroImage: diaryImage2,
      subCategories: [
        {
          id: "resort-villa",
          title: "Resort Garden Houses",
          description: "Diện tích lớn, nhiều tiện ích cao cấp như hồ bơi, sân tennis.",
          projects: getSampleProjects("house-full", "Resort Garden Houses")
        },
        {
          id: "mini-garden",
          title: "Nhà Vườn Mini",
          description: "Diện tích vừa phải, vẫn có không gian xanh và cảnh quan nhỏ.",
          projects: getSampleProjects("house-full", "Nhà Vườn Mini")
        }
      ]
    },
    "house-rough": {
      id: "house-rough",
      title: "BIỆT THỰ",
      description: "Kiến trúc sang trọng và đẳng cấp, thể hiện phong cách sống luxury của gia chủ.",
      heroImage: diaryImage3,
      subCategories: [
        {
          id: "house-rough-don-lap",
          title: "Biệt Thự Đơn Lập",
          description: "Hoàn toàn độc lập, 4 mặt thoáng, tối đa hóa sự riêng tư.",
          projects: getSampleProjects("house-rough", "Biệt Thự Đơn Lập")
        },
        {
          id: "house-rough-song-lap",
          title: "Biệt Thự Song Lập",
          description: "Hai biệt thự kiến trúc đối xứng, chung một bức tường.",
          projects: getSampleProjects("house-rough", "Biệt Thự Song Lập")
        }
      ]
    },
    "house-interior": {
      id: "house-interior",
      title: "NHÀ CẤP 4",
      description: "Nhà một tầng đặc trưng của Việt Nam với nhiều biến thể phong cách và bố trí.",
      heroImage: diaryImage4,
      subCategories: [
        {
          id: "mai-thai",
          title: "Nhà Cấp 4 Mái Thái",
          description: "Mái dốc lớn hình chóp hoặc chữ A, đẹp mắt, thoát nước tốt.",
          projects: getSampleProjects("house-interior", "Mái Thái")
        },
        {
          id: "mai-nhat",
          title: "Nhà Cấp 4 Mái Nhật",
          description: "Độ dốc ít hơn mái Thái, tạo vẻ trang nghiêm, phù hợp phong cách hiện đại.",
          projects: getSampleProjects("house-interior", "Mái Nhật")
        },
        {
          id: "mai-bang",
          title: "Nhà Cấp 4 Mái Bằng",
          description: "Mái phẳng, có thể tận dụng không gian mái, kiến trúc vững chắc, hiện đại.",
          projects: getSampleProjects("house-interior", "Mái Bằng")
        },
        {
          id: "gac-lung",
          title: "Nhà Cấp 4 Gác Lửng",
          description: "Có thêm không gian gác lửng để tối ưu diện tích sử dụng.",
          projects: getSampleProjects("house-interior", "Gác Lửng")
        }
      ]
    }
  };
};

// Mock complete project category page data
const mockProjectCategoryPageData: ProjectCategoryPageData = {
  categories: getMockCategoriesData(),
  defaultHeroImage: diaryImage1
};

// ========== MOCK DATA FUNCTIONS ==========

// Mock delay function to simulate API calls
const mockDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API functions
export const fetchCategoryDataMock = async (categoryId: string): Promise<CategoryData | null> => {
  await mockDelay();
  console.log(`Using mock CategoryData for ${categoryId}`);
  const categories = getMockCategoriesData();
  return categories[categoryId] || null;
};

export const fetchAllCategoriesDataMock = async (): Promise<{ [key: string]: CategoryData }> => {
  await mockDelay();
  console.log('Using mock CategoriesData');
  return getMockCategoriesData();
};

export const fetchProjectCategoryPageDataMock = async (): Promise<ProjectCategoryPageData> => {
  await mockDelay();
  console.log('Using mock ProjectCategoryPageData');
  return mockProjectCategoryPageData;
};

export const fetchProjectsBySubCategoryMock = async (categoryId: string, subCategoryId: string): Promise<ProjectItem[]> => {
  await mockDelay();
  console.log(`Using mock projects for ${categoryId}/${subCategoryId}`);
  const categories = getMockCategoriesData();
  const category = categories[categoryId];
  if (!category) return [];
  
  const subCategory = category.subCategories.find(sub => sub.id === subCategoryId);
  return subCategory?.projects || [];
};

// ========== API FUNCTIONS ==========

// Error handling utility
const handleApiError = (error: any, section: string) => {
  console.error(`Error fetching ${section} data:`, error);
  throw new Error(`Failed to fetch ${section} data. Please try again later.`);
};

// API Functions
export const fetchCategoryDataApi = async (categoryId: string): Promise<CategoryData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/project-categories/${categoryId}`);
    const data: ApiResponse<CategoryData> = await response.json();
    
    console.log(`CategoryData from API for ${categoryId}: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch category data');
    }
    
    return data.data || null;
  } catch (error) {
    handleApiError(error, `category ${categoryId}`);
    throw error;
  }
};

export const fetchAllCategoriesDataApi = async (): Promise<{ [key: string]: CategoryData }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/project-categories`);
    const data: ApiResponse<{ [key: string]: CategoryData }> = await response.json();
    
    console.log(`CategoriesData from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch categories data');
    }
    
    return data.data || {};
  } catch (error) {
    handleApiError(error, 'categories');
    throw error;
  }
};

export const fetchProjectCategoryPageDataApi = async (): Promise<ProjectCategoryPageData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/project-category-page`);
    const data: ApiResponse<ProjectCategoryPageData> = await response.json();
    
    console.log(`ProjectCategoryPageData from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch project category page data');
    }
    
    return data.data!;
  } catch (error) {
    handleApiError(error, 'project category page');
    throw error;
  }
};

export const fetchProjectsBySubCategoryApi = async (categoryId: string, subCategoryId: string): Promise<ProjectItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/project-categories/${categoryId}/subcategories/${subCategoryId}/projects`);
    const data: ApiResponse<ProjectItem[]> = await response.json();
    
    console.log(`Projects from API for ${categoryId}/${subCategoryId}: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch projects data');
    }
    
    return data.data || [];
  } catch (error) {
    handleApiError(error, `projects for ${categoryId}/${subCategoryId}`);
    throw error;
  }
};

// ========== HYBRID FUNCTIONS (AUTO-SWITCH BETWEEN API AND MOCK) ==========

// Auto-switch functions based on configuration
export const fetchCategoryData = async (categoryId: string): Promise<CategoryData | null> => {
  return USE_MOCK_DATA ? fetchCategoryDataMock(categoryId) : fetchCategoryDataApi(categoryId);
};

export const fetchAllCategoriesData = async (): Promise<{ [key: string]: CategoryData }> => {
  return USE_MOCK_DATA ? fetchAllCategoriesDataMock() : fetchAllCategoriesDataApi();
};

export const fetchProjectCategoryPageData = async (): Promise<ProjectCategoryPageData> => {
  return USE_MOCK_DATA ? fetchProjectCategoryPageDataMock() : fetchProjectCategoryPageDataApi();
};

export const fetchProjectsBySubCategory = async (categoryId: string, subCategoryId: string): Promise<ProjectItem[]> => {
  return USE_MOCK_DATA ? fetchProjectsBySubCategoryMock(categoryId, subCategoryId) : fetchProjectsBySubCategoryApi(categoryId, subCategoryId);
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
  categories: getMockCategoriesData(),
  complete: mockProjectCategoryPageData
});

// Export mock data for direct access
export {
  mockProjectCategoryPageData,
  getMockCategoriesData,
  getSampleProjects
}; 