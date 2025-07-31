import { 
  CapabilitiesData, 
  ConstructionProcessData, 
  TechnicalAdvantagesData,
  ProfilePageData 
} from '../types/profilePageTypes';

// Import placeholder images for fallback
import architecturalImage1 from '../assets/images/profilepage/1.jpg';
import architecturalImage2 from '../assets/images/profilepage/2.jpg';
import architecturalImage3 from '../assets/images/profilepage/3.jpg';
import architecturalImage4 from '../assets/images/profilepage/4.1.jpg';
import architecturalImage5 from '../assets/images/profilepage/4.jpg';
import architecturalImage6 from '../assets/images/profilepage/5.jpg';
import architecturalImage7 from '../assets/images/profilepage/6.jpg';
import architecturalImage8 from '../assets/images/profilepage/7.jpg';
import architecturalImage9 from '../assets/images/profilepage/8.jpg';
import architecturalImage10 from '../assets/images/profilepage/9.jpg';
import architecturalImage11 from '../assets/images/profilepage/10.jpg';
import architecturalImage12 from '../assets/images/profilepage/11.jpg';
import architecturalImage13 from '../assets/images/profilepage/12.jpg';
import architecturalImage14 from '../assets/images/profilepage/13.jpg';
import architecturalImage15 from '../assets/images/profilepage/14.jpg';
import architecturalImage16 from '../assets/images/profilepage/15.jpg';
import architecturalImage17 from '../assets/images/profilepage/16.jpg';
import architecturalImage18 from '../assets/images/profilepage/17.jpg';
import architecturalImage19 from '../assets/images/profilepage/18.jpg';
import architecturalImage20 from '../assets/images/profilepage/19.jpg';
import architecturalImage21 from '../assets/images/profilepage/20.jpg';
import architecturalImage22 from '../assets/images/profilepage/21.jpg';

// API Base URL - update this to match your backend
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// API Endpoints
const API_ENDPOINTS = {
  PROFILE_PAGE: `${API_BASE_URL}/profile`,
  CAPABILITIES: `${API_BASE_URL}/profile/capabilities`,
  CONSTRUCTION_PROCESS: `${API_BASE_URL}/profile/construction-process`,
  TECHNICAL_ADVANTAGES: `${API_BASE_URL}/profile/technical-advantages`,
  HEALTH_CHECK: `${API_BASE_URL}/health`
};

// Mock data for fallback when API is not available
const mockCapabilitiesData: CapabilitiesData = {
  title: 'NĂNG LỰC',
  companyName: 'PG DESIGN',
  serviceLine: 'THIẾT KẾ & THI CÔNG TRỌN GÓI',
  description: 'Tối ưu toàn bộ quy trình - Đảm bảo chất lượng - Tiết kiệm chi phí',
  capabilities: [
    'Một đầu mối - Xuyên suốt từ thiết kế đến thi công, giúp giảm sai sót và rút ngắn tiến độ.',
    'Thi công nhanh hơn đến 25%, kiểm soát chất lượng và an toàn công trình.',
    'Tiết kiệm 10-20% chi phí nhờ quy trình khép kín và quản lý ngân sách hiệu quả.',
    'Thiết kế hiện đại, đề thi công phù hợp xu hướng và nhu cầu sử dụng thực tế.',
    'Đội ngũ trẻ, giàu nhiệt huyết - luôn cập nhật xu hướng mới và hướng không gian sống.'
  ],
  images: {
    mainImage: architecturalImage1,
    sideImages: [architecturalImage2, architecturalImage3]
  },
  benefitsTitle: 'LỢI ÍCH KHÁCH HÀNG NHẬN ĐƯỢC KHI CHỌN PG DESIGN'
};

const mockConstructionProcessData: ConstructionProcessData = {
  sections: [
    {
      title: 'Tư vấn & Thiết kế',
      description: 'Tư vấn chuyên sâu về phong cách, không gian và ngân sách. Thiết kế 3D chi tiết với nhiều phương án lựa chọn.',
      images: [architecturalImage4, architecturalImage5],
      layoutType: 'two-images'
    },
    {
      title: 'Lập kế hoạch & Dự toán',
      description: 'Lập kế hoạch thi công chi tiết, dự toán ngân sách chính xác và lịch trình thực hiện rõ ràng.',
      images: [architecturalImage6, architecturalImage7, architecturalImage8],
      layoutType: 'three-images'
    },
    {
      title: 'Thi công & Giám sát',
      description: 'Thi công theo đúng thiết kế với đội ngũ thợ lành nghề. Giám sát chất lượng 24/7 đảm bảo tiến độ.',
      images: [architecturalImage9,architecturalImage10],
      layoutType: 'single-large'
    },
    {
      title: 'Nghiệm thu & Bàn giao',
      description: 'Nghiệm thu từng hạng mục, đảm bảo chất lượng. Bàn giao công trình hoàn thiện với hướng dẫn sử dụng.',
      images: [architecturalImage11, architecturalImage12, architecturalImage13],
      layoutType: 'time-optimization'
    }
  ]
};

const mockTechnicalAdvantagesData: TechnicalAdvantagesData = {
  mainTitle: 'ƯU ĐIỂM KỸ THUẬT',
  phases: [
    {
      title: 'Thiết kế thông minh',
      description: 'Áp dụng công nghệ BIM và phần mềm thiết kế 3D tiên tiến để tạo ra bản vẽ chi tiết và chính xác.',
      images: [ architecturalImage14, architecturalImage15, architecturalImage16],
      layoutType: 'three-grid'
    },
    {
      title: 'Vật liệu chất lượng',
      description: 'Sử dụng vật liệu cao cấp, có nguồn gốc rõ ràng và đảm bảo tiêu chuẩn an toàn, bền vững.',
      images: [architecturalImage17, architecturalImage18, architecturalImage19, architecturalImage20],
      layoutType: 'mixed-layout'
    }
  ]
};

// Helper function to check if API is available
const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(API_ENDPOINTS.HEALTH_CHECK, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });
    return response.ok;
  } catch (error) {
    console.warn('API health check failed, using mock data:', error);
    return false;
  }
};

// Generic API fetch function with error handling
const fetchFromAPI = async <T>(endpoint: string, fallbackData: T): Promise<T> => {
  try {
    const isApiAvailable = await checkApiHealth();
    
    if (!isApiAvailable) {
      console.log('API not available, using mock data');
      return fallbackData;
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    console.log('Falling back to mock data');
    return fallbackData;
  }
};

// Fetch capabilities data
export const fetchCapabilitiesData = async (): Promise<CapabilitiesData> => {
  return fetchFromAPI(API_ENDPOINTS.CAPABILITIES, mockCapabilitiesData);
};

// Fetch construction process data
export const fetchConstructionProcessData = async (): Promise<ConstructionProcessData> => {
  return fetchFromAPI(API_ENDPOINTS.CONSTRUCTION_PROCESS, mockConstructionProcessData);
};

// Fetch technical advantages data
export const fetchTechnicalAdvantagesData = async (): Promise<TechnicalAdvantagesData> => {
  return fetchFromAPI(API_ENDPOINTS.TECHNICAL_ADVANTAGES, mockTechnicalAdvantagesData);
};

// Fetch all profile page data at once
export const fetchProfilePageData = async (): Promise<ProfilePageData> => {
  try {
    const isApiAvailable = await checkApiHealth();
    
    if (!isApiAvailable) {
      console.log('API not available, using mock data for all sections');
      return {
        capabilities: mockCapabilitiesData,
        constructionProcess: mockConstructionProcessData,
        technicalAdvantages: mockTechnicalAdvantagesData
      };
    }

    const response = await fetch(API_ENDPOINTS.PROFILE_PAGE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile page data:', error);
    console.log('Falling back to mock data for all sections');
    return {
      capabilities: mockCapabilitiesData,
      constructionProcess: mockConstructionProcessData,
      technicalAdvantages: mockTechnicalAdvantagesData
    };
  }
};

// Update capabilities data (for admin use)
export const updateCapabilitiesData = async (data: CapabilitiesData, token?: string): Promise<void> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(API_ENDPOINTS.CAPABILITIES, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`Update failed: ${response.status} ${response.statusText}`);
    }

    console.log('Capabilities data updated successfully');
  } catch (error) {
    console.error('Error updating capabilities data:', error);
    throw error;
  }
};

// Update construction process data (for admin use)
export const updateConstructionProcessData = async (data: ConstructionProcessData, token?: string): Promise<void> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(API_ENDPOINTS.CONSTRUCTION_PROCESS, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`Update failed: ${response.status} ${response.statusText}`);
    }

    console.log('Construction process data updated successfully');
  } catch (error) {
    console.error('Error updating construction process data:', error);
    throw error;
  }
};

// Update technical advantages data (for admin use)
export const updateTechnicalAdvantagesData = async (data: TechnicalAdvantagesData, token?: string): Promise<void> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(API_ENDPOINTS.TECHNICAL_ADVANTAGES, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`Update failed: ${response.status} ${response.statusText}`);
    }

    console.log('Technical advantages data updated successfully');
  } catch (error) {
    console.error('Error updating technical advantages data:', error);
    throw error;
  }
};

// Check if the API is available and healthy
export const checkProfileApiHealth = async (): Promise<{ isHealthy: boolean; message: string }> => {
  try {
    const response = await fetch(API_ENDPOINTS.HEALTH_CHECK, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(3000)
    });

    if (response.ok) {
      return { isHealthy: true, message: 'API is healthy and available' };
    } else {
      return { isHealthy: false, message: `API responded with status: ${response.status}` };
    }
  } catch (error) {
    return { 
      isHealthy: false, 
      message: `API health check failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
};

// Get API configuration info
export const getApiConfig = () => {
  return {
    baseUrl: API_BASE_URL,
    endpoints: API_ENDPOINTS,
    isDevelopment: process.env.NODE_ENV === 'development'
  };
}; 