// src/services/servicePageService.ts
// 
// Service for fetching service page data from API or mock data
// 
// Environment Variables:
// - REACT_APP_USE_MOCK_DATA: Set to 'true' to use mock data instead of API calls
// - REACT_APP_API_URL: Base URL for API endpoints (defaults to http://localhost:3002/api)
//
// Usage:
// To use mock data: Set REACT_APP_USE_MOCK_DATA=true in your .env file
// To use API data: Set REACT_APP_USE_MOCK_DATA=false or remove the variable
import {
  ServicePageData,
  HeroContent,
  ServiceItem,
  ServiceProcessData,
  ConstructionServiceData
} from '../types/servicePageTypes';

import heroImage from "../assets/images/vision-mission-section.jpg";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';
const API_TIMEOUT = 10000; // 10 seconds
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true' || false;

// Utility function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Error handling utility
const handleApiError = (error: any, section: string) => {
  console.error(`Error fetching ${section} data:`, error);
  throw new Error(`Failed to fetch ${section} data. Please try again later.`);
};

// Main function to fetch all service page data from backend
export const fetchServicePageData = async (): Promise<ServicePageData> => {
  // Check if mock data should be used
  if (USE_MOCK_DATA) {
    console.log('Using mock data for service page (USE_MOCK_DATA flag is enabled)');
    return await fetchServicePageDataMock();
  }

  try {
    console.log('Fetching service page data from API...');
    const response = await fetch(`${API_BASE_URL}/v1/servicepage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(API_TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error('Invalid response format from API');
    }

    console.log('Successfully fetched service page data from API');
    return result.data;
  } catch (error) {
    console.error('Error fetching service page data from API:', error);
    console.log('Falling back to mock data...');
    // Fallback to mock data if API fails
    return await fetchServicePageDataMock();
  }
};

// Fallback mock data function
const fetchServicePageDataMock = async (): Promise<ServicePageData> => {
  try {
    // Fetch all data in parallel for better performance
    const [
      heroContent,
      services,
      processSection1,
      constructionSection1,
      processSection2,
      constructionSection2,
      processSection3,
      constructionSection3,
      processSection4,
      constructionSection4
    ] = await Promise.all([
      fetchHeroContentData(),
      fetchServicesData(),
      fetchProcessSection1Data(),
      fetchConstructionSection1Data(),
      fetchProcessSection2Data(),
      fetchConstructionSection2Data(),
      fetchProcessSection3Data(),
      fetchConstructionSection3Data(),
      fetchProcessSection4Data(),
      fetchConstructionSection4Data()
    ]);

    return {
      heroContent,
      services,
      processSection1,
      constructionSection1,
      processSection2,
      constructionSection2,
      processSection3,
      constructionSection3,
      processSection4,
      constructionSection4
    };
  } catch (error) {
    handleApiError(error, 'service page');
    throw error;
  }
};

// API Functions for each section (kept as fallback)
export const fetchHeroContentData = async (): Promise<HeroContent> => {
  try {
    await delay(300);
    
    // In real implementation, this would be:
    // const response = await fetch(`${API_BASE_URL}/service-page/hero`);
    // return await response.json();
    
    return {
      mainTitle: "DỊCH VỤ",
      brandName: "PG DESIGN",
      description: "Chúng tôi đồng hành cùng khách hàng từ bản vẽ ý tưởng đến không gian sống hoàn thiện, tối ưu công năng - nâng tầm thẩm mỹ - đảm bảo chất lượng thi công.",
      heroImageUrl: heroImage
    };
  } catch (error) {
    handleApiError(error, 'hero content');
    throw error;
  }
};

export const fetchServicesData = async (): Promise<ServiceItem[]> => {
  try {
    await delay(250);
    
    return [
      {
        id: 1,
        title: "Dịch vụ thi công",
        subtitle: "Phần thô hoặc",
        description: "Trọn gói hoàn thiện"
      },
      {
        id: 2,
        title: "Dịch vụ thi công",
        subtitle: "",
        description: "Nội thất"
      },
      {
        id: 3,
        title: "Dịch vụ thiết kế",
        subtitle: "",
        description: "Kiến trúc - Nội thất"
      },
      {
        id: 4,
        title: "Dịch vụ thi công",
        subtitle: "Cải tạo sửa chữa hoặc",
        description: "Dự án đã có bản vẽ"
      }
    ];
  } catch (error) {
    handleApiError(error, 'services');
    throw error;
  }
};

export const fetchProcessSection1Data = async (): Promise<ServiceProcessData> => {
  try {
    await delay(200);
    
    return {
      processNumber: 1,
      title: "THI CÔNG PHẦN THÔ HOẶC TRỌN GÓI HOÀN THIỆN",
      description: "PG Design đảm nhận toàn bộ quy trình xây dựng từ phần thô đến hoàn thiện công trình — bao gồm thi công móng, kết cấu, xây tô, ốp lát, sơn nước, lắp đặt thiết bị vệ sinh, hệ thống điện - nước và trần đến hoàn chỉnh.",
      note: "Không bao gồm thi công đồ nội thất rời - xem mục Thi công nội thất",
      imageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-7.jpg"
    };
  } catch (error) {
    handleApiError(error, 'process section 1');
    throw error;
  }
};

export const fetchConstructionSection1Data = async (): Promise<ConstructionServiceData> => {
  try {
    await delay(200);
    
    return {
      titleLeft: "THI CÔNG PHẦN THÔ",
      contentsLeft: [
        "Đào móng, thi công móng - thi công bể tự hoại",
        "Thi công hệ khung bê tông cột thép: cột, dầm, sàn, cầu thang",
        "Thi công tường bao che, tường ngăn nhà",
        "Lắp đặt hệ thống điện, nước âm tường, sàn",
        "Thi công chống thấm, cán nền sàn, tô tường"
      ],
      titleRight: "TRỌN GÓI HOÀN THIỆN",
      contentsRight: [
        "Lát gạch nền, tường, khu vực vệ sinh",
        "Sơn nước trong - ngoài nhà",
        "Lắp trần thạch cao, trang trí phào chỉ (nếu có)",
        "Lắp thiết bị vệ sinh",
        "Lắp hệ thống điện nổi, đèn chiếu sáng",
        "Lắp đặt cửa chính, cửa sổ, lan can"
      ]
    };
  } catch (error) {
    handleApiError(error, 'construction section 1');
    throw error;
  }
};

export const fetchProcessSection2Data = async (): Promise<ServiceProcessData> => {
  try {
    await delay(200);
    
    return {
      processNumber: 2,
      title: "THI CÔNG NỘI THẤT",
      description: "PG Design đồng hành cùng bạn từ khâu hoàn thiện công trình, thi công nội thất đến cải tạo lại toàn bộ không gian sống - mang đến sự chỉn chu, tiện nghi và cảm xúc sống trọn vẹn.",
      note: "",
      imageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-7.jpg"
    };
  } catch (error) {
    handleApiError(error, 'process section 2');
    throw error;
  }
};

export const fetchConstructionSection2Data = async (): Promise<ConstructionServiceData> => {
  try {
    await delay(200);
    
    return {
      titleLeft: "THI CÔNG HOÀN THIỆN",
      contentsLeft: [
        "Ốp lát gạch nền, tường WC, bếp, ban công",
        "Sơn nước hoàn thiện trong - ngoài",
        "Thi công trần thạch cao, phào chỉ (nếu có)",
        "Lắp thiết bị điện, đèn chiếu sáng",
        "Lắp đặt thiết bị vệ sinh",
        "Vệ sinh tổng thể trước khi bàn giao"
      ],
      titleRight: "THI CÔNG NỘI THẤT",
      contentsRight: [
        "Gia công, sản xuất và lắp đặt nội thất theo bản vẽ thiết kế",
        "Trình mẫu vật tư và nghiệm thu vật liệu đầu vào trước khi sản xuất",
        "Vật liệu nội thất từ gỗ công nghiệp (An Cường,...) gỗ tự nhiên (gỗ óc chó...) hoặc gỗ nhựa (Picomat, WPB...)",
        "Cung cấp lắp đặt phụ kiện tủ từ cơ bản tới cao cấp",
        "Cung cấp và lắp đặt thiết bị bếp (máy rửa chén, bếp từ, lò vi sóng...)",
        "Cung cấp và lắp đặt thiết bị thông minh (nếu có)",
        "Nhận thi công nội thất từ thiết kế của khách hàng"
      ]
    };
  } catch (error) {
    handleApiError(error, 'construction section 2');
    throw error;
  }
};

export const fetchProcessSection3Data = async (): Promise<ServiceProcessData> => {
  try {
    await delay(200);
    
    return {
      processNumber: 3,
      title: "THIẾT KẾ KIẾN TRÚC & NỘI THẤT",
      description: "Từ khái niệm không gian đến bản vẽ chi tiết, PG Design kiến tạo nên những thiết kế vừa chuẩn công năng, vừa đậm chất thẩm mỹ - thể hiện rõ cá tính và phong cách sống của gia chủ trong từng đường nét.",
      note: "",
      imageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-7.jpg"
    };
  } catch (error) {
    handleApiError(error, 'process section 3');
    throw error;
  }
};

export const fetchConstructionSection3Data = async (): Promise<ConstructionServiceData> => {
  try {
    await delay(200);
    
    return {
      titleLeft: "THIẾT KẾ KIẾN TRÚC",
      contentsLeft: [
        "Bản vẽ cơ sở kiến trúc",
        "Phối cảnh thiết kế hoàn chỉnh",
        "Bộ hồ sơ kiến trúc chi tiết",
        "Bộ hồ sơ kết cấu",
        "Hồ sơ kỹ thuật điện - nước"
      ],
      titleRight: "THIẾT KẾ NỘI THẤT",
      contentsRight: [
        "Định hướng không gian tổng thể",
        "Phối cảnh nội thất hoàn chỉnh",
        "Mặt bằng & chi tiết kỹ thuật",
        "Thiết kế chi tiết tiện ích phụ",
        "Hồ sơ kỹ thuật điện - công nghệ"
      ]
    };
  } catch (error) {
    handleApiError(error, 'construction section 3');
    throw error;
  }
};

export const fetchProcessSection4Data = async (): Promise<ServiceProcessData> => {
  try {
    await delay(200);
    
    return {
      processNumber: 4,
      title: "CẢI TẠO SỬA CHỮA HOẶC DỰ ÁN ĐÃ CÓ BẢN VẼ",
      description: "PG Design nhận thi công các công trình đã có bản vẽ kiến trúc hoặc nội thất, đảm bảo đúng kỹ thuật - đúng thiết kế - đúng tiến độ, mang đến sản phẩm cuối cùng hoàn thiện với chất lượng chuẩn mực.",
      note: "",
      imageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-7.jpg"
    };
  } catch (error) {
    handleApiError(error, 'process section 4');
    throw error;
  }
};

export const fetchConstructionSection4Data = async (): Promise<ConstructionServiceData> => {
  try {
    await delay(200);
    
    return {
      titleLeft: "CẢI TẠO SỬA CHỮA",
      contentsLeft: [
        "Khảo sát thực tế hiện trạng công trình",
        "Đánh giá kết cấu, hệ thống điện nước, vật liệu, công năng",
        "Đề xuất phương án cải tạo phù hợp nhu cầu - thẩm mỹ - ngân sách",
        "Lập hồ sơ thiết kế cải tạo và dự toán công trình",
        "Thi công từ phần thô đến hoàn thiện",
        "Đảm bảo tiến độ, giám sát kỹ thuật và an toàn công trình trong suốt quá trình thi công"
      ],
      titleRight: "DỰ ÁN ĐÃ CÓ BẢN VẼ",
      contentsRight: [
        "Tiếp nhận, rà soát và phân tích bản vẽ thiết kế",
        "Tư vấn vật tư, phương án thi công phù hợp thực tế",
        "Bóc tách khối lượng - lập báo giá chi tiết",
        "Trình mẫu vật tư trước khi thi công",
        "Triển khai thi công theo đúng hồ sơ thiết kế",
        "Nghiệm thu từng phần & tổng thể công trình với CĐT trước khi bản giao",
        "Giám sát chặt chẽ - bảo hành công trình sau hoàn thiện"
      ]
    };
  } catch (error) {
    handleApiError(error, 'construction section 4');
    throw error;
  }
};

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

// Utility function to check if mock data is being used
export const isUsingMockData = (): boolean => {
  return USE_MOCK_DATA;
};

// Utility function to get current data source info
export const getDataSourceInfo = () => {
  return {
    useMockData: USE_MOCK_DATA,
    apiBaseUrl: API_BASE_URL,
    apiTimeout: API_TIMEOUT
  };
}; 