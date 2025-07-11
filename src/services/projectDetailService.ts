// src/services/projectDetailService.ts

import { ProjectDetailData, ApiResponse } from '../types/projectDetailTypes';

// Environment configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';
const USE_MOCK_DATA = true; // Default to true for development

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
  thumbnailImage: "/assets/images/diary-image-1.jpg",
  
  // Embedded HTML content from server (admin can modify this)
  htmlContent: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Barlow', sans-serif;
          background-color: #f8f9fa;
        }
        
        .project-hero {
          position: relative;
          height: 60vh;
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/images/diary-image-1.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
        }
        
        .project-hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
        }
        
        .project-hero .subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
        }
        
        .project-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 7fr 3fr;
          gap: 3rem;
          margin-top: 2rem;
        }
        
        .main-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .sidebar {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          height: fit-content;
        }
        
        .main-content h2 {
          color: #1b3025;
          border-bottom: 3px solid #4CAF50;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .main-content h3 {
          color: #1b3025;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .main-content p {
          line-height: 1.6;
          color: #333;
          margin-bottom: 1rem;
        }
        
        .main-content ul {
          line-height: 1.6;
          color: #555;
        }
        
        .main-content li {
          margin-bottom: 0.5rem;
        }
        
        .project-gallery {
          margin: 2rem 0;
        }
        
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .image-grid img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .info-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .info-card h3 {
          color: #1b3025;
          margin-bottom: 1rem;
          border-bottom: 2px solid #4CAF50;
          padding-bottom: 0.5rem;
        }
        
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .info-item:last-child {
          border-bottom: none;
        }
        
        .info-item strong {
          color: #1b3025;
        }
        
        .status-badge {
          background: #4CAF50;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        

        
        @media (max-width: 768px) {
          .project-hero h1 {
            font-size: 2rem;
          }
          
          .content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .project-content {
            padding: 1rem;
          }
          
          .image-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="project-hero">
        <div>
          <h1>Nhà Phố Hiện Đại 3 Tầng</h1>
          <div class="subtitle">Anh Nguyễn Văn A • 120m² • Quận 5, TP.HCM</div>
        </div>
      </div>
      
      <div class="project-content">
        <div class="content-grid">
          <div class="main-content">
            <h2>Thông tin chi tiết dự án</h2>
            <p>Đây là dự án nhà phố hiện đại được thiết kế với phong cách tối giản nhưng không kém phần sang trọng. Công trình được hoàn thành với chất lượng cao và sự hài lòng của khách hàng.</p>
            
            <h3>Đặc điểm nổi bật</h3>
            <ul>
              <li>Thiết kế mặt tiền hiện đại với các đường nét sạch sẽ</li>
              <li>Tối ưu hóa ánh sáng tự nhiên cho toàn bộ không gian</li>
              <li>Sử dụng vật liệu cao cấp và thân thiện với môi trường</li>
              <li>Bố trí không gian thông minh, tận dụng tối đa diện tích</li>
            </ul>
            
            <h3>Không gian chức năng</h3>
            <p><strong>Tầng 1:</strong> Phòng khách, phòng bếp, phòng ăn và khu vực tiếp khách</p>
            <p><strong>Tầng 2:</strong> Phòng ngủ chính, phòng ngủ khách và phòng tắm</p>
            <p><strong>Tầng 3:</strong> Phòng làm việc, khu vực thư giãn và sân thượng</p>
            
            <div class="project-gallery">
              <h3>Hình ảnh dự án</h3>
              <div class="image-grid">
                <img src="/assets/images/diary-image-1.jpg" alt="Mặt tiền nhà">
                <img src="/assets/images/diary-image-2.jpg" alt="Phòng khách">
                <img src="/assets/images/diary-image-3.jpg" alt="Phòng bếp">
                <img src="/assets/images/diary-image-4.jpg" alt="Phòng ngủ">
              </div>
            </div>
            
            <h3>Vật liệu sử dụng</h3>
            <ul>
              <li>Gạch ốp lát: Granite cao cấp</li>
              <li>Cửa sổ: Nhôm kính cường lực</li>
              <li>Sơn: Sơn nước cao cấp chống thấm</li>
              <li>Hệ thống điện: Schneider Electric</li>
              <li>Cửa gỗ: Gỗ công nghiệp MDF chống ẩm</li>
              <li>Sàn gỗ: Sàn gỗ công nghiệp cao cấp</li>
            </ul>
            
            <p><em>Dự án được hoàn thành vào tháng 12/2023 với sự hài lòng cao của khách hàng. Đây là minh chứng cho chất lượng và uy tín của PG Design trong lĩnh vực thiết kế và thi công.</em></p>
          </div>
          
          <div class="sidebar">
            <div class="info-card">
              <h3>Thông tin dự án</h3>
              <div class="info-item">
                <strong>Khách hàng:</strong>
                <span>Anh Nguyễn Văn A</span>
              </div>
              <div class="info-item">
                <strong>Diện tích:</strong>
                <span>120m²</span>
              </div>
              <div class="info-item">
                <strong>Địa chỉ:</strong>
                <span>Quận 5, TP.HCM</span>
              </div>
              <div class="info-item">
                <strong>Ngày khởi công:</strong>
                <span>15/06/2023</span>
              </div>
              <div class="info-item">
                <strong>Ngày hoàn thành:</strong>
                <span>20/12/2023</span>
              </div>
              <div class="info-item">
                <strong>Trạng thái:</strong>
                <span class="status-badge">Hoàn thành</span>
              </div>
            </div>
            
            <div class="info-card">
              <h3>Thông số kỹ thuật</h3>
              <div class="info-item">
                <strong>Số tầng:</strong>
                <span>3 tầng</span>
              </div>
              <div class="info-item">
                <strong>Số phòng ngủ:</strong>
                <span>4 phòng</span>
              </div>
              <div class="info-item">
                <strong>Số phòng tắm:</strong>
                <span>3 phòng</span>
              </div>
              <div class="info-item">
                <strong>Diện tích xây dựng:</strong>
                <span>300m²</span>
              </div>
              <div class="info-item">
                <strong>Kinh phí:</strong>
                <span>2.5 tỷ đồng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  
  projectImages: [
    "/assets/images/diary-image-1.jpg",
    "/assets/images/diary-image-2.jpg",
    "/assets/images/diary-image-3.jpg",
    "/assets/images/diary-image-4.jpg"
  ],
  
  projectSpecs: [
    { id: "1", label: "Diện tích đất", value: "120", unit: "m²", displayOrder: 1 },
    { id: "2", label: "Diện tích xây dựng", value: "300", unit: "m²", displayOrder: 2 },
    { id: "3", label: "Số tầng", value: "3", displayOrder: 3 },
    { id: "4", label: "Số phòng ngủ", value: "4", displayOrder: 4 },
    { id: "5", label: "Số phòng tắm", value: "3", displayOrder: 5 }
  ],
  
  projectStatus: "Hoàn thành",
  projectBudget: "2.5 tỷ đồng",
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
  await delay(800); // Simulate API delay
  
  console.log(`Using mock ProjectDetailData for project: ${projectId}`);
  
  // Return mock data with the requested ID
  return {
    ...mockProjectDetailData,
    id: projectId
  };
};

// Real API functions
export const fetchProjectDetailDataApi = async (projectId: string): Promise<ProjectDetailData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse<ProjectDetailData> = await response.json();
    
    console.log(`ProjectDetailData from API for ${projectId}:`, data);
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch project detail data');
    }
    
    return data.data!;
  } catch (error) {
    handleApiError(error, `project detail ${projectId}`);
    throw error;
  }
};

// Main service function
export const fetchProjectDetailData = async (projectId: string): Promise<ProjectDetailData> => {
  return USE_MOCK_DATA ? fetchProjectDetailDataMock(projectId) : fetchProjectDetailDataApi(projectId);
};

// Data source helper
export const getCurrentDataSource = () => {
  return USE_MOCK_DATA ? 'mock' : 'api';
};

// Export available functions for external use
export const projectDetailService = {
  fetchProjectDetailData,
  fetchProjectDetailDataMock,
  fetchProjectDetailDataApi,
  getCurrentDataSource,
  mockData: mockProjectDetailData
}; 