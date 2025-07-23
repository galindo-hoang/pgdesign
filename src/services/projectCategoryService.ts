import {
  ProjectCategory,
  ProjectDetail,
  CategoryInfo,
  ApiResponse
} from '../types/projectCategoryPageTypes';


import houseNormal from "../assets/images/projectpage/house-normal.jpg";
import appartment from "../assets/images/projectpage/appartment.png";
import houseBusiness from "../assets/images/projectpage/house-business.jpg";
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

// Mock project data for each category
const mockProjectsData: Record<string, ProjectDetail[]> = {
  "house-normal": [
    {
      id: 1,
      projectId: "HN001",
      title: "Nhà Phố Hiện Đại 3 Tầng - Quận 7",
      clientName: "Anh Minh",
      area: "4x15m",
      constructionDate: "2024-01-15",
      address: "123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM",
      description: "Thiết kế nhà phố hiện đại với không gian mở, tận dụng tối đa ánh sáng tự nhiên.",
      category: "house-normal",
      projectCategoryId: 1,
      style: "Hiện đại",
      thumbnailImage: "http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg",
      htmlContent: "<div>Chi tiết dự án nhà phố hiện đại...</div>",
      projectImages: [
        "http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg",
        "http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg"
      ],
      projectStatus: "Hoàn thành • 2.5 tỷ",
      completionDate: "2024-06-30",
      architectName: "KTS Nguyễn Văn A",
      contractorName: "PG Design",
      metaTitle: "Nhà Phố Hiện Đại 3 Tầng",
      metaDescription: "Dự án nhà phố hiện đại tại Quận 7",
      tags: ["nhà phố", "hiện đại", "3 tầng"],
      isOnHomePage: true,
      isActive: true,
      createdAt: "2024-01-15T00:00:00Z",
      updatedAt: "2024-06-30T00:00:00Z"
    },
    {
      id: 2,
      projectId: "HN002",
      title: "Nhà Phố Tân Cổ Điển - Quận 2",
      clientName: "Chị Lan",
      area: "5x18m",
      constructionDate: "2024-02-01",
      address: "456 Đường Trần Não, Quận 2, TP.HCM",
      description: "Nhà phố phong cách tân cổ điển với kiến trúc tinh tế và nội thất sang trọng.",
      category: "house-normal",
      projectCategoryId: 1,
      style: "Tân cổ điển",
      thumbnailImage: "http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg",
      htmlContent: "<div>Chi tiết dự án nhà phố tân cổ điển...</div>",
      projectImages: [
        "http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg",
        "http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg"
      ],
      projectStatus: "Đang thi công • 3.2 tỷ",
      architectName: "KTS Phạm Thị B",
      contractorName: "PG Design",
      metaTitle: "Nhà Phố Tân Cổ Điển",
      metaDescription: "Dự án nhà phố tân cổ điển tại Quận 2",
      tags: ["nhà phố", "tân cổ điển", "sang trọng"],
      isOnHomePage: false,
      isActive: true,
      createdAt: "2024-02-01T00:00:00Z",
      updatedAt: "2024-02-01T00:00:00Z"
    }
  ],
  "appartment": [
    {
      id: 3,
      projectId: "HF001",
      title: "Xây Nhà Trọn Gói 2 Tầng - Bình Dương",
      clientName: "Anh Tùng",
      area: "6x20m",
      constructionDate: "2024-03-01",
      address: "789 Đường Dĩ An, Bình Dương",
      description: "Dự án xây nhà trọn gói bao gồm thiết kế, thi công và nội thất hoàn thiện.",
      category: "appartment",
      projectCategoryId: 2,
      style: "Hiện đại",
      thumbnailImage: "http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg",
      htmlContent: "<div>Chi tiết dự án xây nhà trọn gói...</div>",
      projectImages: [
        "http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg",
        "http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg"
      ],
      projectStatus: "Hoàn thành • 1.8 tỷ",
      completionDate: "2024-08-15",
      architectName: "KTS Lê Văn C",
      contractorName: "PG Design",
      metaTitle: "Xây Nhà Trọn Gói 2 Tầng",
      metaDescription: "Dự án xây nhà trọn gói tại Bình Dương",
      tags: ["xây nhà", "trọn gói", "2 tầng"],
      isOnHomePage: true,
      isActive: true,
      createdAt: "2024-03-01T00:00:00Z",
      updatedAt: "2024-08-15T00:00:00Z"
    }
  ],
  "village": [
    {
      id: 4,
      projectId: "HR001",
      title: "Thi Công Phần Thô Biệt Thự - Đồng Nai",
      clientName: "Anh Khang",
      area: "8x25m",
      constructionDate: "2024-04-01",
      address: "321 Đường Biên Hòa, Đồng Nai",
      description: "Thi công phần thô biệt thự với kết cấu bê tông cốt thép chất lượng cao.",
      category: "village",
      projectCategoryId: 3,
      style: "Biệt thự",
      thumbnailImage: "http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg",
      htmlContent: "<div>Chi tiết dự án thi công phần thô...</div>",
      projectImages: [
        "http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg",
        "http://localhost:9000/pgdesign-assets/images/diary-image-5.jpg"
      ],
      projectStatus: "Đang thi công • 2.0 tỷ",
      architectName: "KTS Hoàng Văn D",
      contractorName: "PG Design",
      metaTitle: "Thi Công Phần Thô Biệt Thự",
      metaDescription: "Dự án thi công phần thô tại Đồng Nai",
      tags: ["phần thô", "biệt thự", "bê tông"],
      isOnHomePage: false,
      isActive: true,
      createdAt: "2024-04-01T00:00:00Z",
      updatedAt: "2024-04-01T00:00:00Z"
    }
  ],
  "house-business": [
    {
      id: 5,
      projectId: "HI001",
      title: "Thiết Kế Nội Thất Căn Hộ Duplex - Quận 1",
      clientName: "Chị Hoa",
      area: "120m²",
      constructionDate: "2024-05-01",
      address: "555 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      description: "Thiết kế nội thất căn hộ duplex cao cấp với phong cách hiện đại và tinh tế.",
      category: "house-business",
      projectCategoryId: 4,
      style: "Hiện đại cao cấp",
      thumbnailImage: "http://localhost:9000/pgdesign-assets/images/diary-image-5.jpg",
      htmlContent: "<div>Chi tiết dự án thiết kế nội thất...</div>",
      projectImages: [
        "http://localhost:9000/pgdesign-assets/images/diary-image-5.jpg",
        "http://localhost:9000/pgdesign-assets/images/diary-image-6.jpg"
      ],
      projectStatus: "Hoàn thành • 800 triệu",
      completionDate: "2024-07-15",
      architectName: "KTS Trần Thị E",
      contractorName: "PG Design",
      metaTitle: "Thiết Kế Nội Thất Căn Hộ Duplex",
      metaDescription: "Dự án nội thất căn hộ duplex tại Quận 1",
      tags: ["nội thất", "duplex", "cao cấp"],
      isOnHomePage: true,
      isActive: true,
      createdAt: "2024-05-01T00:00:00Z",
      updatedAt: "2024-07-15T00:00:00Z"
    }
  ]
};

// Utility function for mock delay
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Transform dates (for compatibility) - no longer needed since we use strings
const transformDates = (data: any): any => {
  // Return data as-is since we now use string dates
  return data;
};

// ========== MOCK FUNCTIONS ==========

const fetchCategoryWithProjectsMock = async (categoryId: string): Promise<ProjectCategory> => {
  console.log(`🎭 Mock Data: Fetching category ${categoryId} with projects`);
  await delay(800);

  const categoryInfo = mockCategoriesData[categoryId];
  if (!categoryInfo) {
    throw new Error(`Category ${categoryId} not found`);
  }

  const projects = mockProjectsData[categoryId] || [];

  return {
    ...categoryInfo,
    projects: projects,
    projectCount: projects.length
  };
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
      heroImageUrl: '/assets/images/default-hero.jpg',
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

// For backward compatibility (deprecated - use fetchCategoryWithProjects instead)
export const fetchCategoryWithSubCategories = fetchCategoryWithProjects; 