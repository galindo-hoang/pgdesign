import {
  ProjectCategory,
  ProjectSubCategory,
  ProjectSubCategoryWithProjects,
  ProjectSubCategoryWithProjectOverview,
  ProjectOverviewData,
  ProjectDetail,
  ProjectCategoryApiResponse,
  CategoryInfo,
  ApiResponse
} from '../types/projectCategoryPageTypes';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1';
const API_TIMEOUT = 10000; // 10 seconds

// Configuration for data source
const USE_MOCK_DATA = true;

// ========== MOCK DATA ==========

// Mock categories mapping (matching our seeded data)
const mockCategoriesData: Record<string, Omit<ProjectCategory, 'subCategories'>> = {
  "house-normal": {
    id: 1,
    categoryId: "house-normal",
    title: "NHÀ PHỐ",
    description: "Thiết kế nhà phố hiện đại, tối ưu hóa không gian và ánh sáng tự nhiên cho cuộc sống đô thị.",
    heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg",
    displayOrder: 0,
    isActive: true
  },
  "house-full": {
    id: 2,
    categoryId: "house-full",
    title: "NHÀ VƯỜN",
    description: "Hòa quyện kiến trúc với thiên nhiên, tạo nên không gian sống xanh và thư thái.",
    heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg",
    displayOrder: 1,
    isActive: true
  },
  "house-rough": {
    id: 3,
    categoryId: "house-rough",
    title: "BIỆT THỰ",
    description: "Kiến trúc sang trọng và đẳng cấp, thể hiện phong cách sống luxury của gia chủ.",
    heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg",
    displayOrder: 2,
    isActive: true
  },
  "house-interior": {
    id: 4,
    categoryId: "house-interior",
    title: "NHÀ CẤP 4",
    description: "Nhà một tầng đặc trưng của Việt Nam với nhiều biến thể phong cách và bố trí.",
    heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg",
    displayOrder: 3,
    isActive: true
  }
};

// Mock subcategories data (matching our seeded data)
const mockSubCategoriesData: Record<string, ProjectSubCategory[]> = {
  "house-normal": [
    {
      id: 1,
      projectCategoryId: 1,
      subCategoryId: "nha-ong",
      title: "Nhà Ống",
      description: "Thiết kế cho mặt tiền hẹp, chiều sâu dài, tận dụng tối đa diện tích.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg",
      displayOrder: 0,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      projectCategoryId: 1,
      subCategoryId: "nha-lien-ke",
      title: "Nhà Liền Kề",
      description: "Nhà phố trong khu quy hoạch, kiến trúc đồng bộ và hiện đại.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg",
      displayOrder: 1,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      projectCategoryId: 1,
      subCategoryId: "house-normal-san-vuon",
      title: "Nhà Phố Có Sân Vườn",
      description: "Kết hợp không gian xanh, tạo sự thông thoáng và gần gũi thiên nhiên.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg",
      displayOrder: 2,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      projectCategoryId: 1,
      subCategoryId: "shophouse",
      title: "Shophouse",
      description: "Tầng trệt kinh doanh, tầng trên ở, tối ưu hóa mặt tiền thu hút khách hàng.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg",
      displayOrder: 3,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  "house-full": [
    {
      id: 5,
      projectCategoryId: 2,
      subCategoryId: "resort-garden-houses",
      title: "Resort Garden Houses",
      description: "Nhà vườn phong cách resort, tận hưởng không gian xanh mát.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg",
      displayOrder: 0,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      projectCategoryId: 2,
      subCategoryId: "nha-vuon-mini",
      title: "Nhà Vườn Mini",
      description: "Nhà vườn quy mô nhỏ, phù hợp với diện tích hạn chế.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg",
      displayOrder: 1,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  "house-rough": [
    {
      id: 7,
      projectCategoryId: 3,
      subCategoryId: "biet-thu-don-lap",
      title: "Biệt Thự Đơn Lập",
      description: "Biệt thự độc lập, không gian riêng tư tuyệt đối.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg",
      displayOrder: 0,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 8,
      projectCategoryId: 3,
      subCategoryId: "biet-thu-song-lap",
      title: "Biệt Thự Song Lập",
      description: "Biệt thự liền kề, tối ưu hóa không gian và chi phí.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg",
      displayOrder: 1,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  "house-interior": [
    {
      id: 9,
      projectCategoryId: 4,
      subCategoryId: "nha-cap-4-hien-dai",
      title: "Nhà Cấp 4 Hiện Đại",
      description: "Nhà cấp 4 thiết kế hiện đại, tối giản và tiện nghi.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg",
      displayOrder: 0,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 10,
      projectCategoryId: 4,
      subCategoryId: "nha-cap-4-truyen-thong",
      title: "Nhà Cấp 4 Truyền Thống",
      description: "Nhà cấp 4 phong cách truyền thống Việt Nam.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg",
      displayOrder: 1,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 11,
      projectCategoryId: 4,
      subCategoryId: "nha-cap-4-nong-thon",
      title: "Nhà Cấp 4 Nông Thôn",
      description: "Nhà cấp 4 phong cách nông thôn, gần gũi thiên nhiên.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg",
      displayOrder: 2,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 12,
      projectCategoryId: 4,
      subCategoryId: "nha-cap-4-tiet-kiem",
      title: "Nhà Cấp 4 Tiết Kiệm",
      description: "Nhà cấp 4 tối ưu hóa chi phí, phù hợp thu nhập trung bình.",
      heroImageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg",
      displayOrder: 3,
      projectCount: 4,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
};

// Mock project details generator
const generateMockProjectDetails = (categoryId: string, subCategoryId: string, count: number = 4): ProjectDetail[] => {
  const projects: ProjectDetail[] = [];
  
  for (let i = 1; i <= count; i++) {
    projects.push({
      id: i,
      projectId: `${categoryId}-${subCategoryId}-${i}`,
      title: `Dự án ${subCategoryId} #${i}`,
      clientName: `Anh/Chị ${String.fromCharCode(64 + i)}`,
      area: `${120 + i * 30}m²`,
      constructionDate: `${String(12 - i).padStart(2, '0')}/2023`,
      address: `Quận ${i}, TP.HCM`,
      description: `Mô tả chi tiết dự án ${subCategoryId} số ${i}`,
      category: categoryId,
      subCategory: subCategoryId,
      style: i % 2 === 0 ? "Modern" : "Classical",
      thumbnailImage: `http://localhost:9000/pgdesign-assets/images/diary-image-${i}.jpg`,
      htmlContent: `<h1>Dự án ${subCategoryId} #${i}</h1><p>Nội dung chi tiết...</p>`,
      projectImages: [
        `http://localhost:9000/pgdesign-assets/images/diary-image-${i}.jpg`,
        `http://localhost:9000/pgdesign-assets/images/diary-image-${i + 1}.jpg`
      ],
      projectStatus: "Completed",
      projectBudget: `${1 + i}M VND`,
      completionDate: `${String(12 - i).padStart(2, '0')}/2023`,
      architectName: "PG Design Team",
      contractorName: "PG Construction",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  return projects;
};

// ========== UTILITY FUNCTIONS ==========

// Transform ProjectOverviewData to ProjectDetail format
const transformOverviewToDetail = (overview: ProjectOverviewData, categoryId: string, subCategoryId: string): ProjectDetail => {
  return {
    id: overview.id,
    projectId: overview.projectId,
    title: overview.title,
    clientName: overview.clientName,
    area: overview.area,
    constructionDate: overview.constructionDate,
    address: overview.address,
    description: overview.title, // Use title as description fallback
    category: categoryId,
    subCategory: subCategoryId,
    style: "Modern", // Default style
    thumbnailImage: overview.thumbnailImage,
    htmlContent: `<h1>${overview.title}</h1><p>Project details...</p>`, // Basic HTML content
    projectImages: overview.thumbnailImage ? [overview.thumbnailImage] : [],
    projectStatus: overview.projectStatus,
    projectBudget: "N/A", // Not available in overview
    completionDate: overview.constructionDate,
    architectName: "PG Design Team", // Default
    contractorName: "PG Construction", // Default
    isActive: true,
    createdAt: new Date(overview.createdAt),
    updatedAt: new Date(overview.createdAt)
  };
};

// Transform backend date strings to Date objects
const transformDates = (obj: any): any => {
  if (typeof obj === 'string' && obj.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
    return new Date(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(transformDates);
  }
  if (obj && typeof obj === 'object') {
    const transformed: any = {};
    for (const key in obj) {
      transformed[key] = transformDates(obj[key]);
    }
    return transformed;
  }
  return obj;
};

// ========== MOCK FUNCTIONS ==========

const fetchCategoryWithSubCategoriesMock = async (categoryId: string): Promise<ProjectCategory> => {
  await mockDelay();
  console.log(`🎭 Mock: Fetching category ${categoryId} with subcategories`);
  
  const categoryData = mockCategoriesData[categoryId];
  if (!categoryData) {
    throw new Error(`Category ${categoryId} not found`);
  }

  const subcategories = mockSubCategoriesData[categoryId] || [];
  const subcategoriesWithProjects: ProjectSubCategoryWithProjects[] = subcategories.map((sub: ProjectSubCategory) => ({
    ...sub,
    projects: generateMockProjectDetails(categoryId, sub.subCategoryId, sub.projectCount)
  }));

  return {
    ...categoryData,
    subCategories: subcategoriesWithProjects
  };
};

const fetchSubCategoryProjectsMock = async (categoryId: string, subCategoryId: string): Promise<ProjectDetail[]> => {
  await mockDelay();
  console.log(`🎭 Mock: Fetching projects for ${categoryId}/${subCategoryId}`);
  
  return generateMockProjectDetails(categoryId, subCategoryId, 4);
};

// ========== API FUNCTIONS ==========

const fetchCategoryWithSubCategoriesApi = async (categoryId: string): Promise<ProjectCategory> => {
  try {
    console.log(`🌐 Real API: Fetching category ${categoryId} with subcategories`);
    
    const response = await fetch(`${API_BASE_URL}/projectsubcategories/category/${categoryId}/overview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(API_TIMEOUT)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData: ProjectCategoryApiResponse = await response.json();
    
    if (!rawData.success) {
      throw new Error(rawData.message || 'Failed to fetch category data');
    }

    // Transform the response data
    const subcategoriesData = transformDates(rawData.data) as ProjectSubCategoryWithProjectOverview[];
    
    // Transform to the expected format
    const subcategoriesWithProjects: ProjectSubCategoryWithProjects[] = subcategoriesData.map((sub) => ({
      ...sub,
      projects: sub.projectsOverview.projects.map((project) => 
        transformOverviewToDetail(project, categoryId, sub.subCategoryId)
      )
    }));

    // Get category info (using first subcategory's categoryId or default)
    const categoryInfo: CategoryInfo = mockCategoriesData[categoryId] || {
      id: subcategoriesData[0]?.projectCategoryId || 1,
      categoryId: categoryId,
      title: categoryId.toUpperCase().replace(/-/g, ' '),
      description: `Category ${categoryId}`,
      heroImageUrl: subcategoriesData[0]?.heroImageUrl || '/assets/images/default-hero.jpg',
      displayOrder: 0,
      isActive: true
    };

    return {
      ...categoryInfo,
      subCategories: subcategoriesWithProjects
    };
  } catch (error: any) {
    console.error(`Error fetching category ${categoryId}:`, error);
    throw new Error(`Failed to fetch category data: ${error.message}`);
  }
};

const fetchSubCategoryProjectsApi = async (categoryId: string, subCategoryId: string): Promise<ProjectDetail[]> => {
  try {
    console.log(`🌐 Real API: Fetching projects for ${categoryId}/${subCategoryId}`);
    
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/subcategories/${subCategoryId}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(API_TIMEOUT)
    });

    const data: ApiResponse<ProjectDetail[]> = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch projects data');
    }
    
    return data.data || [];
  } catch (error: any) {
    console.error(`Error fetching projects for ${categoryId}/${subCategoryId}:`, error);
    throw new Error(`Failed to fetch projects data: ${error.message}`);
  }
};

// ========== HYBRID FUNCTIONS (AUTO-SWITCH) ==========

// Mock delay function
const mockDelay = (ms: number = 300): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Main service functions

export const fetchCategoryWithSubCategories = async (categoryId: string): Promise<ProjectCategory> => {
  const dataSource = USE_MOCK_DATA ? '🎭 Mock Data' : '🌐 Real API';
  console.log(`${dataSource}: Fetching category ${categoryId}`);
  
  return USE_MOCK_DATA 
    ? fetchCategoryWithSubCategoriesMock(categoryId)
    : fetchCategoryWithSubCategoriesApi(categoryId);
};

export const fetchSubCategoryProjects = async (categoryId: string, subCategoryId: string): Promise<ProjectDetail[]> => {
  const dataSource = USE_MOCK_DATA ? '🎭 Mock Data' : '🌐 Real API';
  console.log(`${dataSource}: Fetching projects for ${categoryId}/${subCategoryId}`);
  
  return USE_MOCK_DATA 
    ? fetchSubCategoryProjectsMock(categoryId, subCategoryId)
    : fetchSubCategoryProjectsApi(categoryId, subCategoryId);
};

// Utility functions
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export const getCurrentDataSource = (): 'mock' | 'api' => {
  return USE_MOCK_DATA ? 'mock' : 'api';
};

// Export mock data for testing
export const getMockData = () => ({
  categories: mockCategoriesData,
  subcategories: mockSubCategoriesData,
  generateProjects: generateMockProjectDetails
}); 