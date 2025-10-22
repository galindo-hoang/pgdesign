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
const sampleImage1 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/diary-image-1.png';;
const sampleImage2 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/diary-image-2.png';;
const sampleImage3 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/diary-image-3.png';;
const sampleImage4 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/diary-image-4.png';;
const consultationImage = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/thumb-intro.png';;

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1';
const API_TIMEOUT = 10000; // 10 seconds

// Configuration for data source (can be controlled via environment variable)
const USE_MOCK_DATA = true;

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

// Interface for Google Sheets data structure
interface GoogleSheetsData {
  title: string;
  contentLink: string;
  imageLink: string;
  sheetName?: string; // Track which sheet the data came from
}

// Interface for multiple sheets data
interface MultiSheetData {
  [sheetName: string]: GoogleSheetsData[];
}

// Interface for Google Sheets metadata
interface GoogleSheetMetadata {
  properties?: {
    title?: string;
  };
}

// Interface for Google Drive document content
interface GoogleDriveDocument {
  documentId: string;
  title: string;
  content: string;
  htmlContent: string;
  lastModified: string;
}

// Interface for enhanced blog data with embedded content
interface EnhancedGoogleSheetsData extends GoogleSheetsData {
  embeddedContent?: string;
  documentId?: string;
  isGoogleDoc?: boolean;
}

// Utility function to extract clean URL from various Google Sheets formats
const extractUrl = (urlString: string): string => {
  if (!urlString || typeof urlString !== 'string') {
    return '';
  }
  
  let cleanUrl = urlString.trim();
  
  // Handle HYPERLINK formula (common in Google Sheets)
  if (cleanUrl.startsWith('=HYPERLINK(')) {
    // Extract URL from HYPERLINK("URL", "TEXT")
    const urlMatch = cleanUrl.match(/=HYPERLINK\("([^"]+)"/);
    if (urlMatch && urlMatch[1]) {
      cleanUrl = urlMatch[1];
    } else {
      return ''; // Invalid HYPERLINK formula
    }
  }
  
  // Remove surrounding quotes
  if (cleanUrl.startsWith('"') && cleanUrl.endsWith('"')) {
    cleanUrl = cleanUrl.slice(1, -1);
  }
  
  // Validate URL format
  try {
    new URL(cleanUrl);
    return cleanUrl;
  } catch (error) {
    return ''; // Invalid URL
  }
};

// Utility function to extract Google Doc ID from URL
const extractGoogleDocId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    
    // Handle different Google Docs URL formats
    if (urlObj.hostname === 'docs.google.com' && urlObj.pathname.includes('/document/d/')) {
      const match = urlObj.pathname.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
      return match ? match[1] : null;
    }
    
    return null;
  } catch (error) {
    return null;
  }
};

// Function to read Google Drive document and generate embedded HTML
const readGoogleDriveDocument = async (documentUrl: string): Promise<GoogleDriveDocument | null> => {
  try {
    const documentId = extractGoogleDocId(documentUrl);
    
    if (!documentId) {
      console.warn('⚠️ Invalid Google Docs URL:', documentUrl);
      return null;
    }
    
    console.log(`📄 Reading Google Doc: ${documentId}`);
    
    // Google Docs API endpoint
    const apiUrl = `https://docs.googleapis.com/v1/documents/${documentId}`;
    const apiKey = "AIzaSyADtWdOgQXmiRzNS5EqLTD4Nw_3DQQBAXU"; // Use your API key
    
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(API_TIMEOUT)
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        console.error('❌ 401 Unauthorized: Google Docs API requires OAuth2 or Service Account');
        console.error('🔧 Solutions:');
        console.error('1. Google Docs API requires OAuth2 authentication, not API keys');
        console.error('2. Use Service Account credentials for server-side access');
        console.error('3. Or use OAuth2 for user-specific access');
        console.error('4. For now, using fallback to document URL');
        
        // Fallback: Return document with link to original
        return {
          documentId,
          title: 'Google Document (Requires Authentication)',
          content: 'This document requires authentication to view. Please click the link below to view in Google Docs.',
          htmlContent: `
            <div class="google-doc-fallback">
              <p>🔒 This Google Document requires authentication to view the content.</p>
              <p>To view this document, please click the link below:</p>
              <a href="${documentUrl}" target="_blank" rel="noopener noreferrer" class="google-doc-link">
                📄 Open in Google Docs
              </a>
              <p><small>Note: Google Docs API requires OAuth2 authentication or Service Account credentials.</small></p>
            </div>
          `,
          lastModified: new Date().toISOString()
        };
      } else if (response.status === 403) {
        console.error('❌ 403 Forbidden: Google Docs API access denied');
        console.error('🔧 Solutions:');
        console.error('1. Enable Google Docs API in Google Cloud Console');
        console.error('2. Check API key permissions');
        console.error('3. Ensure document is publicly accessible');
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const documentData = await response.json();
    
    // Extract document content and convert to HTML with image support
    const htmlContent = await convertGoogleDocToHtmlWithImages(documentData, documentId, apiKey);
    
    return {
      documentId,
      title: documentData.title || 'Untitled Document',
      content: extractPlainText(documentData),
      htmlContent,
      lastModified: documentData.documentId || new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Error reading Google Drive document:', error);
    return null;
  }
};

// Function to convert Google Doc content to HTML with image support
const convertGoogleDocToHtmlWithImages = async (documentData: any, documentId: string, apiKey: string): Promise<string> => {
  try {
    const { body } = documentData;
    if (!body || !body.content) {
      return '<p>No content available</p>';
    }
    
    let html = '<div class="google-doc-content">';
    
    // Extract all inline object IDs for image fetching
    const inlineObjectIds = new Set<string>();
    
    const extractInlineObjectIds = (element: any) => {
      if (element.paragraph && element.paragraph.elements) {
        element.paragraph.elements.forEach((el: any) => {
          if (el.inlineObjectElement && el.inlineObjectElement.inlineObjectId) {
            inlineObjectIds.add(el.inlineObjectElement.inlineObjectId);
          }
        });
      } else if (element.table && element.table.tableRows) {
        element.table.tableRows.forEach((row: any) => {
          if (row.tableCells) {
            row.tableCells.forEach((cell: any) => {
              if (cell.content) {
                cell.content.forEach(extractInlineObjectIds);
              }
            });
          }
        });
      }
    };
    
    body.content.forEach(extractInlineObjectIds);
    
    // Fetch image data for all inline objects
    const imageData = new Map<string, string>();
    
    if (inlineObjectIds.size > 0) {
      console.log(`🖼️ Found ${inlineObjectIds.size} images to fetch`);
      
      for (const objectId of Array.from(inlineObjectIds)) {
        try {
          const imageUrl = `https://docs.googleapis.com/v1/documents/${documentId}/inlines/${objectId}?key=${apiKey}`;
          const imageResponse = await fetch(imageUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(API_TIMEOUT)
          });
          
          if (imageResponse.ok) {
            const imageInfo = await imageResponse.json();
            if (imageInfo.inlineObject && imageInfo.inlineObject.embeddedObject) {
              const embeddedObject = imageInfo.inlineObject.embeddedObject;
              if (embeddedObject.imageProperties && embeddedObject.imageProperties.contentUri) {
                imageData.set(objectId, embeddedObject.imageProperties.contentUri);
              }
            }
          }
        } catch (error) {
          console.warn(`⚠️ Failed to fetch image ${objectId}:`, error);
        }
      }
    }
    
    // Convert content to HTML with real image URLs
    body.content.forEach((element: any) => {
      if (element.paragraph) {
        html += convertParagraphToHtmlWithImages(element.paragraph, imageData);
      } else if (element.table) {
        html += convertTableToHtmlWithImages(element.table, imageData);
      } else if (element.sectionBreak) {
        html += '<hr class="section-break">';
      }
    });
    
    html += '</div>';
    return html;
    
  } catch (error) {
    console.error('❌ Error converting Google Doc to HTML with images:', error);
    return '<p>Error loading content</p>';
  }
};

// Function to convert inline images to HTML with real image URLs
const convertInlineImageToHtmlWithUrl = (inlineObjectElement: any, imageData: Map<string, string>): string => {
  try {
    const { inlineObjectId, textStyle } = inlineObjectElement;
    
    // Check if we have the real image URL
    const imageUrl = imageData.get(inlineObjectId);
    
    let imageHtml: string;
    
    if (imageUrl) {
      // Use the real image URL
      imageHtml = `<img src="${imageUrl}" alt="Embedded image" class="google-doc-image" />`;
      console.log(`✅ Using real image URL: ${imageUrl}`);
    } else {
      // Fallback to placeholder
      imageHtml = '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=" alt="Embedded image" class="google-doc-image" />';
      console.log(`⚠️ No image URL found for ${inlineObjectId}, using placeholder`);
    }
    
    // Apply image styling if available
    if (textStyle) {
      const style = [];
      
      if (textStyle.fontSize) {
        const fontSize = textStyle.fontSize.magnitude;
        style.push(`width: ${fontSize * 2}px`);
        style.push(`height: auto`);
      }
      
      if (style.length > 0) {
        imageHtml = imageHtml.replace('class="google-doc-image"', `class="google-doc-image" style="${style.join('; ')}"`);
      }
    }
    
    return imageHtml;
    
  } catch (error) {
    console.error('❌ Error converting inline image with URL:', error);
    return '<span class="image-placeholder">[Image]</span>';
  }
};

// Function to convert paragraph to HTML with image support
const convertParagraphToHtmlWithImages = (paragraph: any, imageData: Map<string, string>): string => {
  let html = '<p>';
  
  if (paragraph.elements) {
    paragraph.elements.forEach((element: any) => {
      if (element.textRun) {
        const { textRun } = element;
        const { content, textStyle } = textRun;
        
        let styledContent = content;
        
        // Apply text styling
        if (textStyle) {
          if (textStyle.bold) {
            styledContent = `<strong>${styledContent}</strong>`;
          }
          if (textStyle.italic) {
            styledContent = `<em>${styledContent}</em>`;
          }
          if (textStyle.underline) {
            styledContent = `<u>${styledContent}</u>`;
          }
          if (textStyle.strikethrough) {
            styledContent = `<del>${styledContent}</del>`;
          }
          
          // Apply font size
          if (textStyle.fontSize) {
            const fontSize = textStyle.fontSize.magnitude;
            styledContent = `<span style="font-size: ${fontSize}pt;">${styledContent}</span>`;
          }
          
          // Apply font family
          if (textStyle.weightedFontFamily) {
            const fontFamily = textStyle.weightedFontFamily.fontFamily;
            styledContent = `<span style="font-family: '${fontFamily}', sans-serif;">${styledContent}</span>`;
          }
          
          // Apply text color
          if (textStyle.foregroundColor && textStyle.foregroundColor.color) {
            const color = textStyle.foregroundColor.color;
            if (color.rgbColor) {
              const { red, green, blue } = color.rgbColor;
              const rgbColor = `rgb(${Math.round(red * 255)}, ${Math.round(green * 255)}, ${Math.round(blue * 255)})`;
              styledContent = `<span style="color: ${rgbColor};">${styledContent}</span>`;
            }
          }
        }
        
        html += styledContent;
      } else if (element.inlineObjectElement) {
        // Handle inline images with real URLs
        html += convertInlineImageToHtmlWithUrl(element.inlineObjectElement, imageData);
      } else if (element.pageBreak) {
        html += '<div class="page-break"></div>';
      }
    });
  }
  
  html += '</p>';
  return html;
};

// Function to convert table to HTML with image support
const convertTableToHtmlWithImages = (table: any, imageData: Map<string, string>): string => {
  try {
    let html = '<table class="google-doc-table">';
    
    if (table.tableRows) {
      table.tableRows.forEach((row: any) => {
        html += '<tr>';
        
        if (row.tableCells) {
          row.tableCells.forEach((cell: any) => {
            html += '<td>';
            
            if (cell.content) {
              cell.content.forEach((element: any) => {
                if (element.paragraph) {
                  html += convertParagraphToHtmlWithImages(element.paragraph, imageData);
                }
              });
            }
            
            html += '</td>';
          });
        }
        
        html += '</tr>';
      });
    }
    
    html += '</table>';
    return html;
    
  } catch (error) {
    console.error('❌ Error converting table to HTML with images:', error);
    return '<p>[Table content]</p>';
  }
};

// Function to extract plain text from Google Doc
const extractPlainText = (documentData: any): string => {
  try {
    const { body } = documentData;
    if (!body || !body.content) {
      return '';
    }
    
    let text = '';
    
    body.content.forEach((element: any) => {
      if (element.paragraph && element.paragraph.elements) {
        element.paragraph.elements.forEach((textElement: any) => {
          if (textElement.textRun) {
            text += textElement.textRun.content;
          }
        });
        text += '\n';
      }
    });
    
    return text.trim();
    
  } catch (error) {
    console.error('❌ Error extracting plain text:', error);
    return '';
  }
};

// Enhanced function that reads Google Sheets and embeds Google Drive documents
export const readFilespreadsheetWithEmbeddedContent = async(): Promise<{ [sheetName: string]: EnhancedGoogleSheetsData[] }> => {
  try {
    console.log('📊 Reading Google Sheets with embedded Google Drive content...');
    
    // First, get the regular Google Sheets data
    const multiSheetData = await readFilespreadsheet();
    
    // Process each sheet to add embedded content
    const enhancedData: { [sheetName: string]: EnhancedGoogleSheetsData[] } = {};
    
    for (const [sheetName, sheetData] of Object.entries(multiSheetData)) {
      console.log(`📄 Processing embedded content for sheet: ${sheetName}`);
      
      const enhancedSheetData: EnhancedGoogleSheetsData[] = [];
      
      for (const item of sheetData) {
        const enhancedItem: EnhancedGoogleSheetsData = { ...item };
        
        // Check if this is a Google Docs URL
        if (item.contentLink && extractGoogleDocId(item.contentLink)) {
          console.log(`🔗 Processing Google Doc: ${item.title}`);
          
          try {
            const documentData = await readGoogleDriveDocument(item.contentLink);
            
            if (documentData) {
              enhancedItem.embeddedContent = documentData.htmlContent;
              enhancedItem.documentId = documentData.documentId;
              enhancedItem.isGoogleDoc = true;
              
              console.log(`✅ Successfully embedded Google Doc: ${documentData.title}`);
            } else {
              console.log(`⚠️ Failed to read Google Doc for: ${item.title}`);
            }
          } catch (error) {
            console.error(`❌ Error processing Google Doc for ${item.title}:`, error);
          }
        } else {
          console.log(`📝 Regular URL (not Google Doc): ${item.title}`);
        }
        
        enhancedSheetData.push(enhancedItem);
      }
      
      enhancedData[sheetName] = enhancedSheetData;
    }
    
    console.log('🎉 Successfully processed all sheets with embedded content ', enhancedData);
    return enhancedData;
    
  } catch (error) {
    console.error('❌ Error reading Google Sheets with embedded content:', error);
    // Return mock data as fallback
    return getMockEnhancedData();
  }
};

export const readFilespreadsheet = async(): Promise<MultiSheetData> => {
  try {
    console.log('📊 Reading multiple sheets from Google Sheets...');
    
    // Google Sheets URL from the provided link
    const spreadsheetId = '1KjaeNtt0D9uWGVRa2ZRCi9OQ05CLnifCCOia-Q8dBvo';
    // const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
    const apiKey = "AIzaSyADtWdOgQXmiRzNS5EqLTD4Nw_3DQQBAXU";
    
    if (!apiKey) {
      console.warn('⚠️ Google Sheets API key not found. Using mock data instead.');
      return getMockMultiSheetData();
    }
    
    // Check if API key is properly configured
    if (apiKey === 'AIzaSyADtWdOgQXmiRzNS5EqLTD4Nw_3DQQBAXU') {
      console.warn('⚠️ Using hardcoded API key. Consider using environment variable for security.');
    }
    
    // First, get the spreadsheet metadata to see all available sheets
    const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`;
    
    console.log('🌐 Fetching spreadsheet metadata...');
    
    const metadataResponse = await fetch(metadataUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(API_TIMEOUT)
    });
    
    if (!metadataResponse.ok) {
      if (metadataResponse.status === 403) {
        console.error('❌ 403 Forbidden: Permission denied. Possible causes:');
        console.error('1. Spreadsheet is not publicly accessible');
        console.error('2. API key restrictions are too strict');
        console.error('3. Google Sheets API not enabled');
        console.error('4. Spreadsheet ID is incorrect');
        console.error('🔧 Solutions:');
        console.error('- Make spreadsheet public: Share > Anyone with link can view');
        console.error('- Check API key restrictions in Google Cloud Console');
        console.error('- Enable Google Sheets API in Google Cloud Console');
        throw new Error('403 Forbidden: Permission denied. Check spreadsheet sharing and API key permissions.');
      }
      throw new Error(`HTTP error! status: ${metadataResponse.status}`);
    }

    const metadata = await metadataResponse.json();
    const sheets: GoogleSheetMetadata[] = metadata.sheets || [];
    
    console.log(`📋 Found ${sheets.length} sheets in spreadsheet:`, sheets.map(sheet => sheet.properties?.title).join(', '));
    
    // Fetch data from all sheets
    const multiSheetData: MultiSheetData = {};
    
    for (const sheet of sheets) {
      const sheetName = sheet.properties?.title;
      if (!sheetName) continue;
      
      console.log(`📄 Fetching data from sheet: ${sheetName}`);
      
      try {
        const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}?key=${apiKey}`;
        
        const sheetResponse = await fetch(sheetUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(API_TIMEOUT)
        });
        
        if (sheetResponse.ok) {
          const sheetData = await sheetResponse.json();
          
          if (sheetData.values && Array.isArray(sheetData.values)) {
            const parsedSheetData: GoogleSheetsData[] = [];
            
            // Skip the header row (row 1) and process data rows
            for (let i = 1; i < sheetData.values.length; i++) {
              const row = sheetData.values[i];
              // Check if row has at least 2 columns (title, content link)
              if (row && row.length >= 2) {
                const [title, contentLink, imageLink] = row;
                
                // Only add rows that have a title (skip empty rows)
                if (title && title.trim()) {
                  // Extract clean URL from contentLink
                  const cleanContentLink = extractUrl(contentLink || '');
                  
                  parsedSheetData.push({
                    title: title.trim(),
                    contentLink: cleanContentLink,
                    imageLink: imageLink ? extractUrl(imageLink.trim()) : '',
                    sheetName: sheetName
                  });
                  
                  // Log URL extraction for debugging
                  if (contentLink && contentLink !== cleanContentLink) {
                    console.log(`🔗 URL extracted for "${title.trim()}":`);
                    console.log(`   Original: "${contentLink}"`);
                    console.log(`   Clean: "${cleanContentLink}"`);
                  }
                }
              }
            }
            
            if (parsedSheetData.length > 0) {
              multiSheetData[sheetName] = parsedSheetData;
              console.log(`✅ Successfully parsed ${parsedSheetData.length} entries from sheet: ${sheetName}`);
            } else {
              console.log(`⚠️ No valid data found in sheet: ${sheetName}`);
            }
          }
        } else {
          console.warn(`⚠️ Failed to fetch sheet ${sheetName}: ${sheetResponse.status}`);
        }
      } catch (error) {
        console.error(`❌ Error fetching sheet ${sheetName}:`, error);
      }
    }
    
    const totalEntries = Object.values(multiSheetData).reduce((sum, entries) => sum + entries.length, 0);
    console.log(`🎉 Successfully parsed ${totalEntries} total entries from ${Object.keys(multiSheetData).length} sheets`);
    
    return multiSheetData;
    
  } catch (error) {
    console.error('❌ Error reading Google Sheets:', error);
    console.log('🔄 Falling back to mock data...');
    
    // Return mock data as fallback
    return getMockMultiSheetData();
  }
};

// Mock enhanced data for fallback
const getMockEnhancedData = (): { [sheetName: string]: EnhancedGoogleSheetsData[] } => {
  return {
    "BLOG WEBSITE": [
      {
        title: "Nhà đẹp là do mix chất liệu đúng cách – Bạn đã biết chưa?",
        contentLink: "https://example.com/blog1",
        imageLink: "https://image1.png",
        sheetName: "BLOG WEBSITE",
        embeddedContent: "<div class='google-doc-content'><p>This is <strong>mock embedded content</strong> with <em>styling</em>.</p></div>",
        documentId: "mock-doc-1",
        isGoogleDoc: true
      },
      {
        title: "4 Tips Tạo Điểm Nhấn Cho Bếp Sang Trọng & Tiện Nghi",
        contentLink: "https://example.com/blog2",
        imageLink: "https://image2.png",
        sheetName: "BLOG WEBSITE",
        embeddedContent: "<div class='google-doc-content'><p>More <span style='color: red;'>styled content</span> here.</p></div>",
        documentId: "mock-doc-2",
        isGoogleDoc: true
      }
    ]
  };
};

// Mock multi-sheet data for fallback
const getMockMultiSheetData = (): MultiSheetData => {
  return {
    "BLOG WEBSITE": [
      {
        title: "Nhà đẹp là do mix chất liệu đúng cách – Bạn đã biết chưa?",
        contentLink: "https://example.com/blog1",
        imageLink: "https://image1.png",
        sheetName: "BLOG WEBSITE"
      },
      {
        title: "4 Tips Tạo Điểm Nhấn Cho Bếp Sang Trọng & Tiện Nghi",
        contentLink: "https://example.com/blog2",
        imageLink: "https://image2.png",
        sheetName: "BLOG WEBSITE"
      },
      {
        title: "Khám Phá 4 Phong Cách Tủ Quần Áo Đẹp Chuẩn Gu & Cá Tính",
        contentLink: "https://example.com/blog3",
        imageLink: "https://image3.png",
        sheetName: "BLOG WEBSITE"
      }
    ],
    "NEWS": [
      {
        title: "Tin tức mới nhất về thiết kế nội thất 2024",
        contentLink: "https://example.com/news1",
        imageLink: "https://news1.png",
        sheetName: "NEWS"
      },
      {
        title: "Xu hướng thiết kế nhà ở hiện đại",
        contentLink: "https://example.com/news2",
        imageLink: "https://news2.png",
        sheetName: "NEWS"
      }
    ],
    "TIPS": [
      {
        title: "Cách chọn màu sắc cho phòng khách",
        contentLink: "https://example.com/tip1",
        imageLink: "https://tip1.png",
        sheetName: "TIPS"
      },
      {
        title: "Mẹo trang trí nhà nhỏ",
        contentLink: "https://example.com/tip2",
        imageLink: "https://tip2.png",
        sheetName: "TIPS"
      }
    ]
  };
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