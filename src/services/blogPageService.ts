// src/services/blogPageService.ts
import {
  BlogPageData,
  BlogHeroData,
  ProjectItem,
  ContentSection,
  ConsultationCTA,
  DesignStyle,
  ImportantFactor,
  ProcessStep,
  ProjectGalleryData,
  BlogPageFilters,
  ApiResponse
} from '../types/blogPageTypes';

// Import sample images
import sampleImage1 from "../assets/images/diary-image-1.jpg";
import sampleImage2 from "../assets/images/diary-image-2.jpg";
import sampleImage3 from "../assets/images/diary-image-3.jpg";
import sampleImage4 from "../assets/images/diary-image-4.jpg";
import consultationImage from "../assets/images/thumb-intro.jpg";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1';
const API_TIMEOUT = 10000; // 10 seconds

// Configuration for data source (can be controlled via environment variable)
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

// ========== MOCK DATA ==========

// Mock Hero Data
const mockHeroData: BlogHeroData = {
  id: 1,
  title: "PG DESIGN - THIẾT KẾ NỘI THẤT PHÒNG KHÁCH ĐẸP, HIỆN ĐẠI TẠI TP.HCM",
  subtitle: "Khám phá bộ sưu tập những không gian phòng khách được thiết kế tinh tế, kết hợp hoàn hảo giữa thẩm mỹ và công năng sử dụng.",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock Project Items
const mockProjectItems: ProjectItem[] = [
  {
    id: "1",
    title: "Thiết kế nội thất Phòng khách Nhà Phố Hiện Đại – Quận 2",
    image: sampleImage1,
    area: "20 m²",
    style: "Phong cách hiện đại",
    client: "Anh Tú",
    location: "Quận 2",
    isActive: true,
    displayOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "Thiết kế nội thất Phòng khách Biệt Thự Cổ Điển – Quận 7",
    image: sampleImage2,
    area: "35 m²",
    style: "Phong cách cổ điển",
    client: "Chị Lan",
    location: "Quận 7",
    isActive: true,
    displayOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "Thiết kế nội thất Phòng khách Căn Hộ Minimalist – Quận 1",
    image: sampleImage3,
    area: "18 m²",
    style: "Phong cách tối giản",
    client: "Anh Nam",
    location: "Quận 1",
    isActive: true,
    displayOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    title: "Thiết kế nội thất Phòng khách Nhà Vườn Indochine – Quận 3",
    image: sampleImage4,
    area: "28 m²",
    style: "Phong cách Indochine",
    client: "Chị Hoa",
    location: "Quận 3",
    isActive: true,
    displayOrder: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    title: "Thiết kế nội thất Phòng khách Penthouse Luxury – Quận 2",
    image: sampleImage1,
    area: "45 m²",
    style: "Phong cách sang trọng",
    client: "Anh Minh",
    location: "Quận 2",
    isActive: true,
    displayOrder: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6",
    title: "Thiết kế nội thất Phòng khách Studio Scandinavian – Quận 5",
    image: sampleImage2,
    area: "15 m²",
    style: "Phong cách Bắc Âu",
    client: "Chị Mai",
    location: "Quận 5",
    isActive: true,
    displayOrder: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "7",
    title: "Thiết kế nội thất Phòng khách Duplex Modern – Quận 4",
    image: sampleImage3,
    area: "32 m²",
    style: "Phong cách hiện đại",
    client: "Anh Hoàng",
    location: "Quận 4",
    isActive: true,
    displayOrder: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "8",
    title: "Thiết kế nội thất Phòng khách Townhouse Vintage – Quận 6",
    image: sampleImage4,
    area: "24 m²",
    style: "Phong cách vintage",
    client: "Chị Thúy",
    location: "Quận 6",
    isActive: true,
    displayOrder: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock Design Styles
const mockDesignStyles: DesignStyle[] = [
  {
    id: 1,
    name: "Phong cách hiện đại (Modern)",
    description: "Đặc trưng bởi những đường nét sạch sẽ, màu sắc trung tính và sử dụng vật liệu công nghiệp như thép, kính, beton.",
    displayOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Phong cách cổ điển (Classical)",
    description: "Mang đậm nét truyền thống với những chi tiết trang trí tinh xảo, màu sắc ấm áp và vật liệu tự nhiên.",
    displayOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: "Phong cách tối giản (Minimalist)",
    description: "\"Less is more\" - ít đồ đạc nhưng mỗi món đều có ý nghĩa và công năng rõ ràng.",
    displayOrder: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    name: "Phong cách Indochine",
    description: "Kết hợp tinh tế giữa văn hóa Á Đông và kiến trúc Pháp, tạo nên vẻ đẹp hoài cổ độc đáo.",
    displayOrder: 4,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock Important Factors
const mockImportantFactors: ImportantFactor[] = [
  {
    id: 1,
    title: "Tối ưu không gian",
    description: "Bố trí nội thất hợp lý để tạo động tuyến thuận tiện, không gian thoáng đãng và dễ dàng di chuyển.",
    displayOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: "Ánh sáng và thông gió",
    description: "Tận dụng ánh sáng tự nhiên, kết hợp chiếu sáng nhân tạo và đảm bảo thông gió tốt cho không gian.",
    displayOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: "Màu sắc và vật liệu",
    description: "Lựa chọn bảng màu hài hòa, vật liệu chất lượng phù hợp với phong cách và sở thích của gia chủ.",
    displayOrder: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    title: "Công năng và thẩm mỹ",
    description: "Cân bằng giữa tính thực tiễn và vẻ đẹp, đảm bảo không gian vừa đẹp vừa tiện dụng trong sinh hoạt hằng ngày.",
    displayOrder: 4,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock Process Steps
const mockProcessSteps: ProcessStep[] = [
  {
    id: 1,
    stepNumber: "01",
    title: "Khảo sát và tư vấn",
    description: "Đo đạc không gian, tìm hiểu nhu cầu và sở thích của khách hàng.",
    displayOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    stepNumber: "02",
    title: "Thiết kế concept",
    description: "Lên ý tưởng thiết kế tổng thể, chọn phong cách và bảng màu.",
    displayOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    stepNumber: "03",
    title: "Thiết kế chi tiết",
    description: "Hoàn thiện bản vẽ 2D, 3D và danh sách vật tư cụ thể.",
    displayOrder: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    stepNumber: "04",
    title: "Thi công và giám sát",
    description: "Triển khai thi công theo đúng thiết kế và giám sát chất lượng.",
    displayOrder: 4,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Mock Content Section
const mockContentSection: ContentSection = {
  id: 1,
  mainTitle: "PG DESIGN - THIẾT KẾ NỘI THẤT PHÒNG KHÁCH ĐẸP, HIỆN ĐẠI TẠI TP.HCM",
  introText: "Phòng khách là không gian trung tâm của ngôi nhà, nơi gia đình quây quần và đón tiếp khách. Một phòng khách được thiết kế đẹp không chỉ tạo ấn tượng mạnh mẽ với khách ghé thăm mà còn mang lại cảm giác thoải mái, ấm cúng cho chính gia chủ.",
  designStylesTitle: "Các phong cách thiết kế phòng khách đẹp",
  designStyles: mockDesignStyles,
  factorsTitle: "Những yếu tố quan trọng khi thiết kế nội thất phòng khách",
  importantFactors: mockImportantFactors,
  processTitle: "Quy trình thiết kế nội thất phòng khách chuyên nghiệp",
  processSteps: mockProcessSteps,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock Consultation CTA
const mockConsultationCTA: ConsultationCTA = {
  id: 1,
  title: "NHẬN TƯ VẤN THIẾT KẾ NỘI THẤT",
  description: "Bạn đang muốn thiết kế không gian phòng khách đẹp và hiện đại? Hãy liên hệ với PG Design để được tư vấn miễn phí và nhận báo giá chi tiết.",
  features: ["Tư vấn miễn phí", "Thiết kế 3D chân thực", "Thi công chuyên nghiệp"],
  buttonText: "ĐĂNG KÝ TƯ VẤN NGAY",
  imageUrl: consultationImage,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mock Complete Blog Page Data
const mockBlogPageData: BlogPageData = {
  heroData: mockHeroData,
  projectItems: mockProjectItems,
  contentSection: mockContentSection,
  consultationCTA: mockConsultationCTA
};

// ========== UTILITY FUNCTIONS ==========

// Utility function to simulate API delay
const mockDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Error handling utility
const handleApiError = (error: any, section: string) => {
  console.error(`Error fetching ${section} data:`, error);
  throw new Error(`Failed to fetch ${section} data. Please try again later.`);
};

// ========== MOCK FUNCTIONS ==========

export const fetchBlogHeroDataMock = async (): Promise<BlogHeroData> => {
  await mockDelay();
  console.log('Using mock BlogHeroData');
  return mockHeroData;
};

export const fetchProjectItemsMock = async (filters?: BlogPageFilters): Promise<ProjectGalleryData> => {
  await mockDelay();
  console.log('Using mock ProjectItems');
  
  let filteredProjects = [...mockProjectItems];
  
  // Apply filters if provided
  if (filters) {
    if (filters.style) {
      filteredProjects = filteredProjects.filter(project => 
        project.style.toLowerCase().includes(filters.style!.toLowerCase())
      );
    }
    if (filters.location) {
      filteredProjects = filteredProjects.filter(project => 
        project.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
  }
  
  const limit = filters?.limit || 6;
  const offset = filters?.offset || 0;
  const paginatedProjects = filteredProjects.slice(offset, offset + limit);
  
  return {
    projects: paginatedProjects,
    totalProjects: filteredProjects.length,
    hasMore: offset + limit < filteredProjects.length
  };
};

export const fetchContentSectionMock = async (): Promise<ContentSection> => {
  await mockDelay();
  console.log('Using mock ContentSection');
  return mockContentSection;
};

export const fetchConsultationCTAMock = async (): Promise<ConsultationCTA> => {
  await mockDelay();
  console.log('Using mock ConsultationCTA');
  return mockConsultationCTA;
};

export const fetchBlogPageDataMock = async (): Promise<BlogPageData> => {
  await mockDelay();
  console.log('Using mock BlogPageData');
  return mockBlogPageData;
};

// ========== API FUNCTIONS ==========

export const fetchBlogHeroDataApi = async (): Promise<BlogHeroData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogpage/hero`);
    const data: ApiResponse<BlogHeroData> = await response.json();
    
    console.log(`BlogHeroData from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch blog hero data');
    }
    
    return data.data!;
  } catch (error) {
    handleApiError(error, 'blog hero');
    throw error;
  }
};

export const fetchProjectItemsApi = async (filters?: BlogPageFilters): Promise<ProjectGalleryData> => {
  try {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/blogpage/projects?${queryParams}`);
    const data: ApiResponse<ProjectGalleryData> = await response.json();
    
    console.log(`ProjectItems from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch project items');
    }
    
    return data.data!;
  } catch (error) {
    handleApiError(error, 'project items');
    throw error;
  }
};

export const fetchContentSectionApi = async (): Promise<ContentSection> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogpage/content-section`);
    const data: ApiResponse<ContentSection> = await response.json();
    
    console.log(`ContentSection from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch content section');
    }
    
    return data.data!;
  } catch (error) {
    handleApiError(error, 'content section');
    throw error;
  }
};

export const fetchConsultationCTAApi = async (): Promise<ConsultationCTA> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogpage/consultation-cta`);
    const data: ApiResponse<ConsultationCTA> = await response.json();
    
    console.log(`ConsultationCTA from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch consultation CTA');
    }
    
    return data.data!;
  } catch (error) {
    handleApiError(error, 'consultation CTA');
    throw error;
  }
};

export const fetchBlogPageDataApi = async (): Promise<BlogPageData> => {
  try {
    // Fetch all data in parallel for better performance
    const [
      heroData,
      projectGallery,
      contentSection,
      consultationCTA
    ] = await Promise.all([
      fetchBlogHeroDataApi(),
      fetchProjectItemsApi(),
      fetchContentSectionApi(),
      fetchConsultationCTAApi()
    ]);

    return {
      heroData,
      projectItems: projectGallery.projects,
      contentSection,
      consultationCTA
    };
  } catch (error) {
    handleApiError(error, 'blog page');
    throw error;
  }
};

// ========== HYBRID FUNCTIONS (AUTO-SWITCH BETWEEN API AND MOCK) ==========

// Auto-switch functions based on configuration
export const fetchBlogHeroData = async (): Promise<BlogHeroData> => {
  return USE_MOCK_DATA ? fetchBlogHeroDataMock() : fetchBlogHeroDataApi();
};

export const fetchProjectItems = async (filters?: BlogPageFilters): Promise<ProjectGalleryData> => {
  return USE_MOCK_DATA ? fetchProjectItemsMock(filters) : fetchProjectItemsApi(filters);
};

export const fetchContentSection = async (): Promise<ContentSection> => {
  return USE_MOCK_DATA ? fetchContentSectionMock() : fetchContentSectionApi();
};

export const fetchConsultationCTA = async (): Promise<ConsultationCTA> => {
  return USE_MOCK_DATA ? fetchConsultationCTAMock() : fetchConsultationCTAApi();
};

// Main function to fetch all blog page data (auto-switch)
export const fetchBlogPageData = async (): Promise<BlogPageData> => {
  return USE_MOCK_DATA ? fetchBlogPageDataMock() : fetchBlogPageDataApi();
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
  heroData: mockHeroData,
  projectItems: mockProjectItems,
  contentSection: mockContentSection,
  consultationCTA: mockConsultationCTA,
  complete: mockBlogPageData
});

// Export mock data for direct access
export {
  mockHeroData,
  mockProjectItems,
  mockContentSection,
  mockConsultationCTA,
  mockBlogPageData
}; 