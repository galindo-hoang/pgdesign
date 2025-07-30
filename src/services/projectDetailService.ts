// src/services/projectDetailService.ts

import { ProjectDetailData, ApiResponse } from '../types/projectDetailTypes';
import { getProjectByProjectId } from './additionalProjectData';
import { appendProjectImagesToHtml, processProjectImageUrls } from './projectPageService';

// Environment configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';
const API_VERSION = 'v1';
const API_ENDPOINT = `${API_BASE_URL}/api/${API_VERSION}/projectdetail`;
const USE_MOCK_DATA = true;

// Mock project detail data - Project 1
const mockProjectDetailData: ProjectDetailData = {
  id: "project-001",
  title: "Nhà Phố Hiện Đại 3 Tầng",
  clientName: "Anh Nguyễn Văn A",
  area: "120m²",
  constructionDate: "2023-06-15",
  address: "123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM",
  description: "Thiết kế nhà phố hiện đại với không gian mở và ánh sáng tự nhiên",
  category: "house-normal",
  subCategory: "Nhà Ống",
  style: "Hiện đại",
  thumbnailImage: "/assets/images/diary-image-1.png",
  
  // Embedded HTML content from server (admin can modify this - only main content area)
  htmlContent: `
    <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;">Đây là dự án nhà phố hiện đại được thiết kế với phong cách tối giản nhưng không kém phần sang trọng. Công trình được hoàn thành với chất lượng cao và sự hài lòng của khách hàng.</p>
    
    <h3 style="color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;">Đặc điểm nổi bật</h3>
    <ul style="line-height: 1.6; color: #555;">
      <li style="margin-bottom: 0.5rem;">Thiết kế mặt tiền hiện đại với các đường nét sạch sẽ</li>
      <li style="margin-bottom: 0.5rem;">Tối ưu hóa ánh sáng tự nhiên cho toàn bộ không gian</li>
      <li style="margin-bottom: 0.5rem;">Sử dụng vật liệu cao cấp và thân thiện với môi trường</li>
      <li style="margin-bottom: 0.5rem;">Bố trí không gian thông minh, tận dụng tối đa diện tích</li>
    </ul>
    
    <h3 style="color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;">Không gian chức năng</h3>
    <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;"><strong style="color: #1b3025;">Tầng 1:</strong> Phòng khách, phòng bếp, phòng ăn và khu vực tiếp khách</p>
    <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;"><strong style="color: #1b3025;">Tầng 2:</strong> Phòng ngủ chính, phòng ngủ khách và phòng tắm</p>
    <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;"><strong style="color: #1b3025;">Tầng 3:</strong> Phòng làm việc, khu vực thư giãn và sân thượng</p>
    
    <div style="">
      <h3 style="color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;">Hình ảnh dự án</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <img src="/assets/images/diary-image-1.png" alt="Mặt tiền nhà" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <img src="/assets/images/diary-image-2.png" alt="Phòng khách" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <img src="/assets/images/diary-image-3.png" alt="Phòng bếp" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <img src="/assets/images/diary-image-4.png" alt="Phòng ngủ" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      </div>
    </div>
    
    <h3 style="color: #1b3025; margin-top: 2rem; margin-bottom: 1rem;">Vật liệu sử dụng</h3>
    <ul style="line-height: 1.6; color: #555;">
      <li style="margin-bottom: 0.5rem;">Gạch ốp lát: Granite cao cấp</li>
      <li style="margin-bottom: 0.5rem;">Cửa sổ: Nhôm kính cường lực</li>
      <li style="margin-bottom: 0.5rem;">Sơn: Sơn nước cao cấp chống thấm</li>
      <li style="margin-bottom: 0.5rem;">Hệ thống điện: Schneider Electric</li>
      <li style="margin-bottom: 0.5rem;">Cửa gỗ: Gỗ công nghiệp MDF chống ẩm</li>
      <li style="margin-bottom: 0.5rem;">Sàn gỗ: Sàn gỗ công nghiệp cao cấp</li>
    </ul>
    
    <p style="line-height: 1.6; color: #333; margin-bottom: 1rem;">
      <em style="color: #666; font-style: italic;">
        Dự án được hoàn thành vào tháng 12/2023 với sự hài lòng cao của khách hàng. 
        Đây là minh chứng cho chất lượng và uy tín của PG Design trong lĩnh vực thiết kế và thi công.
      </em>
    </p>
    
    <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 2rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
      <h3 style="color: #1b3025; margin-bottom: 1rem;">Cam kết chất lượng</h3>
      <p style="color: #333; line-height: 1.6; margin-bottom: 1rem;">
        PG Design cam kết mang đến cho khách hàng những công trình chất lượng cao với:
      </p>
      <ul style="color: #555; line-height: 1.6; margin: 0;">
        <li style="margin-bottom: 0.5rem;">✓ Thiết kế độc đáo, phù hợp với nhu cầu khách hàng</li>
        <li style="margin-bottom: 0.5rem;">✓ Vật liệu xây dựng chất lượng cao, có nguồn gốc rõ ràng</li>
        <li style="margin-bottom: 0.5rem;">✓ Thi công đúng tiến độ với đội ngũ thợ lành nghề</li>
        <li style="margin-bottom: 0.5rem;">✓ Bảo hành công trình lên đến 2 năm</li>
        <li style="margin-bottom: 0;">✓ Hỗ trợ khách hàng 24/7 trong quá trình thi công</li>
      </ul>
    </div>
  `,
  
  projectImages: [
    "/assets/images/diary-image-1.png",
    "/assets/images/diary-image-2.png",
    "/assets/images/diary-image-3.png",
    "/assets/images/diary-image-4.png"
  ],
  
  projectStatus: "Hoàn thành • 2.5 tỷ đồng",
  completionDate: "2023-12-20",
  architectName: "KTS. Lê Văn B",
  contractorName: "Công ty TNHH Xây dựng PG Design",
  
  metaTitle: "Nhà Phố Hiện Đại 3 Tầng - Dự án PG Design",
  metaDescription: "Khám phá dự án nhà phố hiện đại 3 tầng với thiết kế tinh tế và không gian sống tối ưu.",
  tags: ["nhà phố", "hiện đại", "3 tầng", "thiết kế", "xây dựng"],
  
  isActive: true,
  createdAt: "2023-06-15T10:00:00.000Z",
  updatedAt: "2023-12-20T15:30:00.000Z"
};

// Utility function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Error handling utility
const handleApiError = (error: any, context: string) => {
  console.error(`API Error in ${context}:`, error);
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    throw new Error('Network error - please check your connection');
  }
  
  if (error.response?.status === 404) {
    throw new Error('Project not found');
  }
  
  if (error.response?.status === 500) {
    throw new Error('Server error - please try again later');
  }
  
  throw new Error(error.message || 'An unexpected error occurred');
};

// Mock API functions
export const fetchProjectDetailDataMock = async (projectId: string): Promise<ProjectDetailData> => {
  // await delay(800); // Simulate API delay
  
  // Try to find project in additional data first
  const additionalProject = getProjectByProjectId(projectId);
  if (additionalProject) {
    // Process image URLs and append images to htmlContent
    const processedProject = processProjectImageUrls(additionalProject);
    const enhancedHtmlContent = appendProjectImagesToHtml(
      processedProject.htmlContent,
      processedProject.projectImages || [],
      processedProject.title
    );
    
    // Convert ProjectDetail to ProjectDetailData format
    return {
      id: processedProject.projectId,
      title: processedProject.title,
      clientName: processedProject.clientName,
      area: processedProject.area,
      constructionDate: processedProject.constructionDate,
      address: processedProject.address,
      description: processedProject.description || "",
      category: processedProject.category,
      subCategory: processedProject.category, // Use category as subCategory for compatibility
      style: processedProject.style || "",
      thumbnailImage: processedProject.thumbnailImage || "",
      htmlContent: enhancedHtmlContent,
      projectImages: processedProject.projectImages || [],
      projectStatus: processedProject.projectStatus || "",
      completionDate: processedProject.completionDate || "",
      architectName: processedProject.architectName || "",
      contractorName: processedProject.contractorName || "",
      metaTitle: processedProject.metaTitle || "",
      metaDescription: processedProject.metaDescription || "",
      tags: processedProject.tags || [],
      isActive: processedProject.isActive || true,
      createdAt: processedProject.createdAt || "",
      updatedAt: processedProject.updatedAt || ""
    };
  }
  
  // Fallback to original mock data with image processing
  const processedMockData = processProjectImageUrls(mockProjectDetailData);
  const enhancedHtmlContent = appendProjectImagesToHtml(
    processedMockData.htmlContent,
    processedMockData.projectImages || [],
    processedMockData.title
  );
  
  return {
    ...processedMockData,
    id: projectId,
    htmlContent: enhancedHtmlContent
  };
};

// Real API functions
export const fetchProjectDetailDataApi = async (projectId: string): Promise<ProjectDetailData> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/${projectId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Project not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse<ProjectDetailData> = await response.json();
    
    console.log(`ProjectDetailData from API for ${projectId}:`, data);
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch project detail data');
    }
    
    // Process image URLs and append images to htmlContent
    const processedData = processProjectImageUrls(data.data!);
    const enhancedHtmlContent = appendProjectImagesToHtml(
      processedData.htmlContent,
      processedData.projectImages || [],
      processedData.title
    );
    
    return {
      ...processedData,
      htmlContent: enhancedHtmlContent
    };
  } catch (error) {
    handleApiError(error, `project detail ${projectId}`);
    throw error;
  }
};

// Main service function
export const fetchProjectDetailData = async (projectId: string): Promise<ProjectDetailData> => {
  if (USE_MOCK_DATA) {
    return fetchProjectDetailDataMock(projectId);
  }
  
  try {
    return await fetchProjectDetailDataApi(projectId);
  } catch (error) {
    // Fallback to mock data if API fails in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('API failed, falling back to mock data:', error);
      return fetchProjectDetailDataMock(projectId);
    }
    throw error;
  }
};

// Data source helper
export const getCurrentDataSource = () => {
  return USE_MOCK_DATA ? 'mock' : 'api';
};

// Additional service functions for CRUD operations
export const projectDetailService = {
  // Get project detail by project ID
  fetchProjectDetailData,
  fetchProjectDetailDataMock,
  fetchProjectDetailDataApi,
  getCurrentDataSource,
  mockData: mockProjectDetailData,

  // Get all project details with filtering
  async getAllProjectDetails(filters?: {
    category?: string;
    subCategory?: string;
    projectStatus?: string;
    page?: number;
    limit?: number;
  }): Promise<ProjectDetailData[]> {
    if (USE_MOCK_DATA) {
      // await delay(300);
      return [mockProjectDetailData];
    }

    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }
      
      const response = await fetch(`${API_ENDPOINT}?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching project details:', error);
      if (process.env.NODE_ENV === 'development') {
        return [mockProjectDetailData];
      }
      return [];
    }
  },

  // Create project detail
  async createProjectDetail(projectData: Omit<ProjectDetailData, 'id'>): Promise<ProjectDetailData | null> {
    if (USE_MOCK_DATA) {
      // await delay(1000);
      return { ...projectData, id: `project-${Date.now()}` };
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error creating project detail:', error);
      return null;
    }
  },

  // Update project detail
  async updateProjectDetail(id: string, projectData: Partial<ProjectDetailData>): Promise<ProjectDetailData | null> {
    if (USE_MOCK_DATA) {
      // await delay(1000);
      return { ...mockProjectDetailData, ...projectData, id };
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error('Error updating project detail:', error);
      return null;
    }
  },

  // Delete project detail
  async deleteProjectDetail(id: string): Promise<boolean> {
    if (USE_MOCK_DATA) {
      // await delay(500);
      return true;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error deleting project detail:', error);
      return false;
    }
  },

  // Get project categories
  async getProjectCategories(): Promise<string[]> {
    if (USE_MOCK_DATA) {
      // await delay(200);
      return ['house-normal', 'appartment', 'apartment', 'office', 'commercial'];
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/util/categories`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching project categories:', error);
      return ['house-normal', 'appartment', 'apartment', 'office', 'commercial'];
    }
  },

  // Get project subcategories
  async getProjectSubCategories(category?: string): Promise<string[]> {
    if (USE_MOCK_DATA) {
      // await delay(200);
      return ['Nhà Ống', 'Nhà Biệt Thự', 'Căn Hộ', 'Văn Phòng'];
    }

    try {
      const queryParams = new URLSearchParams();
      if (category) {
        queryParams.append('category', category);
      }
      
      const response = await fetch(`${API_ENDPOINT}/util/subcategories?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching project subcategories:', error);
      return ['Nhà Ống', 'Nhà Biệt Thự', 'Căn Hộ', 'Văn Phòng'];
    }
  },

  // Search project details
  async searchProjectDetails(query: string, filters?: {
    category?: string;
    subCategory?: string;
    page?: number;
    limit?: number;
  }): Promise<ProjectDetailData[]> {
    if (USE_MOCK_DATA) {
      // await delay(300);
      return query.toLowerCase().includes('nhà phố') ? [mockProjectDetailData] : [];
    }

    try {
      const queryParams = new URLSearchParams({ q: query });
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }
      
      const response = await fetch(`${API_ENDPOINT}/search/query?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error searching project details:', error);
      return [];
    }
  }
}; 