import {
  IntroPageData,
  AboutIntroData,
  VisionMissionData,
  CommitmentsData,
  TeamData,
  ApiResponse,
} from "../types/introPageTypes";
import hero from "../assets/images/intropage/hero.png";
import mission from "../assets/images/intropage/mission.png";
import CEOImage from "../assets/images/PG NHÂN SỰ/PHAN TÔ THƯ - GIÁM ĐỐC.jpg";
import CEOImage2 from "../assets/images/PG NHÂN SỰ/VÕ NGUYÊN PHÁP - GIÁM ĐỐC THI CÔNG.jpg";
import employeeImage2 from "../assets/images/PG NHÂN SỰ/ĐỖ TUYẾT QUY - TRƯỞNG PHÒNG MARKETING.jpg";
import employeeImage3 from "../assets/images/PG NHÂN SỰ/Y NHẬT MINH - TRƯỞNG PHÒNG KINH DOANH.jpg";
import employeeImage4 from "../assets/images/PG NHÂN SỰ/CÁP NGUYỄN HỒNG PHÚC - KINH DOANH.jpg";
import employeeImage5 from "../assets/images/PG NHÂN SỰ/ĐẶNG HỒNG SƠN - KỸ SƯ XÂY DỰNG.jpg";
import employeeImage6 from "../assets/images/PG NHÂN SỰ/DIỆP GIA HY - KINH DOANH.jpg";
import employeeImage7 from "../assets/images/PG NHÂN SỰ/LÊ ĐÌNH THIÊN - KIẾN TRÚC SƯ.jpg";
import employeeImage8 from "../assets/images/PG NHÂN SỰ/LÊ DUY HUY - KĨ SƯ XÂY DỰNG.jpg";
import employeeImage9 from "../assets/images/PG NHÂN SỰ/LÊ THỊ NGỌC DIỄM - THIẾT KẾ NỘI THẤT.jpg";
import employeeImage10 from "../assets/images/PG NHÂN SỰ/NGUYỄN HOÀNG BẢO - KĨ SƯ XÂY.jpg";
import employeeImage11 from "../assets/images/PG NHÂN SỰ/NGUYỄN THÀNH THẠO - KỸ SƯ MEP.jpg";
import employeeImage12 from "../assets/images/PG NHÂN SỰ/NGUYỄN THỊ THU THẢO - KẾ TOÁN HÀNH CHÍNH.jpg";
import employeeImage13 from "../assets/images/PG NHÂN SỰ/PHAN NHẬT HÀ - THIẾT KẾ NỘI THẤT.jpg";
import employeeImage14 from "../assets/images/PG NHÂN SỰ/NGUYỄN THỊ THU HUYỀN - MARKETING.jpg";

// API Configuration
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3002/api/v1";

// Configuration for data source (can be controlled via environment variable)
const USE_MOCK_DATA = true;

// ========== MOCK DATA ==========

// Mock About Intro Data
const mockAboutIntroData: AboutIntroData = {
  id: 1,
  brandTitle: "PG DESIGN",
  brandSubtitle: "KIẾN TẠO KHÔNG GIAN",
  identity: "KHẲNG ĐỊNH BẢN SẮC",
  descriptions: [
    "Là đơn vị chuyên nghiệp trong lĩnh vực thiết kế kiến trúc, nội thất và thi công trọn gói. Với đội ngũ thiết kế và thi công giàu kinh nghiệm, chúng tôi cam kết mang đến những công trình chất lượng cao, đúng tiến độ và phản ánh rõ rệt tính cách của từng khách hàng.",
  ],
  backgroundImage: hero,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock Vision Mission Data
const mockVisionMissionData: VisionMissionData = {
  id: 1,
  image: mission,
  vision: {
    title: "TẦM NHÌN",
    paragraphs: [
      "PG Design tự hào trở thành đơn vị thiết kế - thi công uy tín hàng đầu: nơi mở không gian không chỉ được đầu tư về công năng và thẩm mỹ, mà còn là nơi kiến tạo câu chuyện bằng không gian sống của người sở hữu.",
      "Chúng tôi tin rằng, một không gian đẹp là không gian đặt dấu cảm xúc và đồng điệu với nhu cầu sống, từ đó nâng tầm trải nghiệm và chất lượng cuộc sống mỗi ngày.",
    ],
  },
  mission: {
    title: "SỨ MỆNH",
    items: [
      "Cung cấp các giải pháp thiết kế - thi công đồng bộ, chuyên nghiệp, đúng tiến độ tối ưu chi phí mà vẫn đảm bảo chất lượng và phong cách riêng.",
      "Đạt chuẩn mực thiết kế dựa trên nhu cầu, gu thẩm mỹ và mục tiêu sử dụng của từng khách hàng.",
      "Không ngừng sáng tạo, cập nhật xu hướng vật liệu, công nghệ và phong cách mới trong ngành thiết kế - nội thất.",
      "Xây dựng mối quan hệ lâu dài với khách hàng: Uy tín - Minh bạch - Tận tâm.",
    ],
  },
  coreValues: {
    title: "GIÁ TRỊ CỐT LÕI",
    values: [
      {
        id: 1,
        title: "1. Tận tâm & Chuyên nghiệp",
        description:
          "Đồng hành cùng khách hàng từ bản vẽ đầu tiên dần hoàn thiện công trình, với tinh thần trách nhiệm và thái độ tận tâm.",
        displayOrder: 0,
      },
      {
        id: 2,
        title: "2. Sáng tạo & Cá tính",
        description:
          'Không gian được thiết kế không chỉ đẹp, mà còn mang dấu ấn riêng, thể hiện rõ "chất" của người sở hữu.',
        displayOrder: 1,
      },
      {
        id: 3,
        title: "3. Chất lượng & Hoàn hảo",
        description:
          "Luôn chọn giải pháp tốt nhất, vật liệu chất lượng và thi công chỉnh chu để đạt đến sự hoàn hảo trong từng chi tiết.",
        displayOrder: 2,
      },
      {
        id: 4,
        title: "4. Hiệu quả & Kinh tế hợp lý",
        description:
          "Tối ưu hóa chi phí mà vẫn đảm bảo tính thẩm mỹ, công năng và độ bền của công trình.",
        displayOrder: 3,
      },
    ],
  },
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock Commitments Data
const mockCommitmentsData: CommitmentsData = {
  id: 1,
  title: "CAM KẾT CỦA PG DESIGN",
  commitments: [
    {
      id: 1,
      iconName: "direct-execution-icon",
      title: "KHÔNG KHOÁN THẦU",
      description:
        "PG Design cam kết trực tiếp đảm nhận từ khâu thiết kế đến thi công.",
      displayOrder: 0,
    },
    {
      id: 2,
      iconName: "quality-materials-icon",
      title: "VẬT TƯ ĐẠT CHUẨN",
      description:
        "Chúng tôi sử dụng vật liệu chính hãng, đảm bảo độ bền và tính thẩm mỹ cho công trình.",
      displayOrder: 1,
    },
    {
      id: 3,
      iconName: "clear-pricing-icon",
      title: "CHI PHÍ MINH BẠCH",
      description:
        "Mọi hạng mục đều được minh bạch trong báo giá. Cam kết không phát sinh bất ngờ.",
      displayOrder: 2,
    },
    {
      id: 4,
      iconName: "timely-delivery-icon",
      title: "THI CÔNG ĐÚNG TIẾN ĐỘ",
      description:
        "Chúng tôi thực hiện công trình đúng tiến độ đã thống nhất với khách hàng.",
      displayOrder: 3,
    },
    {
      id: 5,
      iconName: "reasonable-price-icon",
      title: "GIÁ HỢP LÝ",
      description:
        "Chi phí thiết kế và thi công được tính toán hợp lý cho khách hàng.",
      displayOrder: 4,
    },
    {
      id: 6,
      iconName: "post-handover-warranty-icon",
      title: "CAM KẾT BẢO HÀNH",
      description:
        "Sau khi bàn giao vẫn luôn đồng hành cùng khách hàng bảo hành chuyên nghiệp và chu đáo.",
      displayOrder: 5,
    },
  ],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock Team Data
const mockTeamData: TeamData = {
  id: 1,
  content: {
    heading: "Đội ngũ PG Design",
    description:
      "Những người trẻ đầy nhiệt huyết và đam mê sáng tạo. Đội ngũ được xây dựng để đồng hành cùng bạn từ bước định hình ý tưởng, phát triển bản sắc thương hiệu cho đến quản lý toàn bộ quy trình - từ trước đến sau khi sản phẩm hoàn thiện.",
  },
  boardDirectors: [
    {
      id: 1,
      name: "Phan Tô Thư",
      title: "Giám Đốc",
      image: CEOImage,
      displayOrder: 0,
    },
    {
      id: 2,
      name: "Võ Nguyên Pháp",
      title: "Giám đốc dự án",
      image: CEOImage2,
      displayOrder: 1,
    },
  ],
  teamMembers: [
    {
      id: 3,
      name: "Đỗ Tuyết Quy",
      title: "Trưởng Phòng Marketing",
      image: employeeImage2,
      displayOrder: 1,
    },
    {
      id: 4,
      name: "Y Nhật Minh",
      title: "Trưởng phòng Kinh Doanh",
      image: employeeImage3,
      displayOrder: 2,
    },
    {
      id: 12,
      name: "Nguyễn Thị Thu Thảo",
      title: "Kế Toán Hành Chính",
      image: employeeImage12,
      displayOrder: 11,
    },
    {
      id: 14,
      name: "NGUYỄN THỊ THU HUYỀN",
      title: "Marketing",
      image: employeeImage14,
      displayOrder: 13,
    },
    {
      id: 15,
      name: "Cáp Nguyễn Hồng Phúc",
      title: "Kinh Doanh",
      image: employeeImage4,
      displayOrder: 14,
    },
    {
      id: 16,
      name: "Diệp Gia Hy",
      title: "Kinh Doanh",
      image: employeeImage6,
      displayOrder: 15,
    },
    {
      id: 5,
      name: "Đặng Hồng Sơn",
      title: "Kỹ Sư Xây Dựng",
      image: employeeImage5,
      displayOrder: 4,
    },
    {
      id: 7,
      name: "Lê Đình Thiên",
      title: "Kiến Trúc Sư",
      image: employeeImage7,
      displayOrder: 6,
    },
    {
      id: 8,
      name: "Lê Duy Huy",
      title: "Kĩ Sư Xây Dựng",
      image: employeeImage8,
      displayOrder: 7,
    },
    {
      id: 9,
      name: "Lê Thị Ngọc Diễm",
      title: "Thiết Kế Nội Thất",
      image: employeeImage9,
      displayOrder: 8,
    },
    {
      id: 10,
      name: "Nguyễn Hoàng Bảo",
      title: "Kĩ Sư Xây",
      image: employeeImage10,
      displayOrder: 9,
    },
    {
      id: 11,
      name: "Nguyễn Thành Thạo",
      title: "Kỹ Sư MEP",
      image: employeeImage11,
      displayOrder: 10,
    },
    {
      id: 13,
      name: "Phan Nhật Hà",
      title: "Thiết Kế Nội Thất",
      image: employeeImage13,
      displayOrder: 12,
    },
  ],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock Complete Intro Page Data
const mockIntroPageData: IntroPageData = {
  aboutIntro: mockAboutIntroData,
  visionMission: mockVisionMissionData,
  commitments: mockCommitmentsData,
  team: mockTeamData,
};

// ========== MOCK DATA FUNCTIONS ==========

// Mock delay function to simulate API calls
const mockDelay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Mock API functions
export const fetchAboutIntroDataMock = async (): Promise<AboutIntroData> => {
  await mockDelay();
  console.log("Using mock AboutIntroData");
  return mockAboutIntroData;
};

export const fetchVisionMissionDataMock =
  async (): Promise<VisionMissionData> => {
    await mockDelay();
    console.log("Using mock VisionMissionData");
    return mockVisionMissionData;
  };

export const fetchCommitmentsDataMock = async (): Promise<CommitmentsData> => {
  await mockDelay();
  console.log("Using mock CommitmentsData");
  return mockCommitmentsData;
};

export const fetchTeamDataMock = async (): Promise<TeamData> => {
  await mockDelay();
  console.log("Using mock TeamData");
  return mockTeamData;
};

export const fetchIntroPageDataMock = async (): Promise<IntroPageData> => {
  await mockDelay();
  console.log("Using mock IntroPageData");
  return mockIntroPageData;
};

// ========== API FUNCTIONS ==========

// Error handling utility
const handleApiError = (error: any, section: string) => {
  console.error(`Error fetching ${section} data:`, error);
  throw new Error(`Failed to fetch ${section} data. Please try again later.`);
};

// API Functions for each section
export const fetchAboutIntroDataApi = async (): Promise<AboutIntroData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/intropage/about-intro`);
    const data: ApiResponse<AboutIntroData> = await response.json();

    console.log(`AboutIntroData from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch about intro data");
    }

    return data.data!;
  } catch (error) {
    handleApiError(error, "about intro");
    throw error;
  }
};

export const fetchVisionMissionDataApi =
  async (): Promise<VisionMissionData> => {
    try {
      const response = await fetch(`${API_BASE_URL}/intropage/vision-mission`);
      const data: ApiResponse<VisionMissionData> = await response.json();

      console.log(`VisionMissionData from API: ${JSON.stringify(data)}`);
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch vision mission data");
      }

      return data.data!;
    } catch (error) {
      handleApiError(error, "vision mission");
      throw error;
    }
  };

export const fetchCommitmentsDataApi = async (): Promise<CommitmentsData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/intropage/commitments`);
    const data: ApiResponse<CommitmentsData> = await response.json();

    console.log(`CommitmentsData from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch commitments data");
    }

    return data.data!;
  } catch (error) {
    handleApiError(error, "commitments");
    throw error;
  }
};

export const fetchTeamDataApi = async (): Promise<TeamData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/intropage/team`);
    const data: ApiResponse<TeamData> = await response.json();

    console.log(`TeamData from API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch team data");
    }

    return data.data!;
  } catch (error) {
    handleApiError(error, "team");
    throw error;
  }
};

// Main function to fetch all intro page data from API
export const fetchIntroPageDataApi = async (): Promise<IntroPageData> => {
  try {
    // Use the single optimized endpoint that fetches all data in parallel on the backend
    const response = await fetch(`${API_BASE_URL}/intropage`);
    const data: ApiResponse<IntroPageData> = await response.json();

    console.log(`IntroPageData from optimized API: ${JSON.stringify(data)}`);
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch intro page data");
    }

    return data.data!;
  } catch (error) {
    handleApiError(error, "intro page");
    throw error;
  }
};

// ========== HYBRID FUNCTIONS (AUTO-SWITCH BETWEEN API AND MOCK) ==========

// Auto-switch functions based on configuration
export const fetchAboutIntroData = async (): Promise<AboutIntroData> => {
  return USE_MOCK_DATA ? fetchAboutIntroDataMock() : fetchAboutIntroDataApi();
};

export const fetchVisionMissionData = async (): Promise<VisionMissionData> => {
  return USE_MOCK_DATA
    ? fetchVisionMissionDataMock()
    : fetchVisionMissionDataApi();
};

export const fetchCommitmentsData = async (): Promise<CommitmentsData> => {
  return USE_MOCK_DATA ? fetchCommitmentsDataMock() : fetchCommitmentsDataApi();
};

export const fetchTeamData = async (): Promise<TeamData> => {
  return USE_MOCK_DATA ? fetchTeamDataMock() : fetchTeamDataApi();
};

// Main function to fetch all intro page data (auto-switch)
export const fetchIntroPageData = async (): Promise<IntroPageData> => {
  return USE_MOCK_DATA ? fetchIntroPageDataMock() : fetchIntroPageDataApi();
};

// ========== UTILITY FUNCTIONS ==========

// Utility function to check API health
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
};

// Utility function to get current data source
export const getCurrentDataSource = (): "mock" | "api" => {
  return USE_MOCK_DATA ? "mock" : "api";
};

// Utility function to get mock data directly
export const getMockData = () => ({
  aboutIntro: mockAboutIntroData,
  visionMission: mockVisionMissionData,
  commitments: mockCommitmentsData,
  team: mockTeamData,
  complete: mockIntroPageData,
});

// Export mock data for direct access
export {
  mockAboutIntroData,
  mockVisionMissionData,
  mockCommitmentsData,
  mockTeamData,
  mockIntroPageData,
};
