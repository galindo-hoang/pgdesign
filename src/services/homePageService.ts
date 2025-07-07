import {
  HomePageData,
  HeroData,
  AboutData,
  ImageSlideData,
  StatsData,
  SolutionData,
  WorkflowData,
  ProjectDiaryData,
  TestimonialData,
  ConsultationFormData
} from '../types/homePageTypes';

// Import icons and diagrams (these would normally come from a CDN or be handled differently)
import { ReactComponent as BriefcaseIcon } from "../assets/icons/experience-icon.svg";
import { ReactComponent as HandshakeIcon } from "../assets/icons/customer-icon.svg";
import { ReactComponent as DesignIcon } from "../assets/icons/design-icon.svg";
import { ReactComponent as GearIcon } from "../assets/icons/building-icon.svg";
import { ReactComponent as DesignProcessIcon } from "../assets/icons/design-icon.svg";
import { ReactComponent as ConstructionProcessIcon } from "../assets/icons/building-icon.svg";
import { ReactComponent as WorkProcessFlowDiagram1 } from "../assets/icons/work-process-flow-diagram-1.svg";
import { ReactComponent as WorkProcessFlowDiagram2 } from "../assets/icons/work-process-flow-diagram-2.svg";

// Import images
import thumbIntro from "../assets/images/thumb-intro.jpg";
import thumbIntro1 from "../assets/images/diary-image-1.jpg";
import thumbIntro2 from "../assets/images/diary-image-2.jpg";
import thumbIntro3 from "../assets/images/diary-image-3.jpg";
import solutionImg1 from "../assets/images/diary-image-5.jpg";
import solutionImg2 from "../assets/images/diary-image-6.jpg";
import solutionImg3 from "../assets/images/diary-image-7.jpg";
import solutionImg4 from "../assets/images/diary-image-8.jpg";
import experienceImg from "../assets/images/diary-image-1.jpg";
import customerImg from "../assets/images/diary-image-2.jpg";
import projectImg from "../assets/images/diary-image-3.jpg";
import qualityImg from "../assets/images/diary-image-4.jpg";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 10000; // 10 seconds

// Utility function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Error handling utility
const handleApiError = (error: any, section: string) => {
  console.error(`Error fetching ${section} data:`, error);
  throw new Error(`Failed to fetch ${section} data. Please try again later.`);
};

// API Functions for each section
export const fetchHeroData = async (): Promise<HeroData> => {
  try {
    // Simulate API call
    await delay(500);
    
    // In real implementation, this would be:
    // const response = await fetch(`${API_BASE_URL}/hero`);
    // return await response.json();
    
    return {
      images: [
        thumbIntro,
        thumbIntro1,
        thumbIntro2,
        thumbIntro3,
        thumbIntro,
      ]
    };
  } catch (error) {
    handleApiError(error, 'hero');
    throw error;
  }
};

export const fetchAboutData = async (): Promise<AboutData> => {
  try {
    await delay(300);
    
    return {
      headline: "MỖI THIẾT KẾ LÀ MỘT CÂU CHUYỆN",
      subHeadline: "MỖI CÔNG TRÌNH LÀ MỘT DẤU ẤN",
      description: "Thành lập từ năm 2022, PG là đội ngũ kiến trúc sư trẻ đầy đam mê và nhiệt huyết, hoạt động chuyên sâu trong lĩnh vực Kiến trúc - Xây dựng - Nội thất. Chúng tôi mang đến giải pháp toàn diện từ thiết kế ý tưởng đến thi công hoàn thiện, giúp khách hàng tối ưu không gian sống, tiết kiệm thời gian và chi phí, nhưng vẫn đảm bảo thẩm mỹ và công năng."
    };
  } catch (error) {
    handleApiError(error, 'about');
    throw error;
  }
};

export const fetchImageSliderData = async (): Promise<ImageSlideData[]> => {
  try {
    await delay(400);
    
    return [
      {
        id: 1,
        imageUrl: thumbIntro1,
        title: "NHÀ ANH TRẠCH",
        subtitle: "Thi công nội thất nhà phố",
        size: "180m2",
      },
      {
        id: 2,
        imageUrl: thumbIntro2,
        title: "ANH MỸ - OPAL GARDEN",
        subtitle: "Thi công nội thất căn hộ",
        size: "180m2",
      },
      {
        id: 3,
        imageUrl: thumbIntro3,
        title: "SKY LINKED VILLA",
        subtitle: "Thi công nội thất biệt thự",
        size: "180m2",
      },
      {
        id: 4,
        imageUrl: thumbIntro,
        title: "DỰ ÁN MỚI 1",
        subtitle: "Thi công nội thất chung cư",
        size: "120m2",
      },
      {
        id: 5,
        imageUrl: thumbIntro1,
        title: "DỰ ÁN MỚI 2",
        subtitle: "Thi công nội thất văn phòng",
        size: "300m2",
      },
    ];
  } catch (error) {
    handleApiError(error, 'image slider');
    throw error;
  }
};

export const fetchStatsData = async (): Promise<StatsData> => {
  try {
    await delay(350);
    
    return {
      header: {
        mainHeadline: "THÀNH TỰU CỦA CHÚNG TÔI",
        subHeadline: "Những con số ấn tượng",
        description: "Với nhiều năm kinh nghiệm trong lĩnh vực thiết kế kiến trúc và nội thất, chúng tôi tự hào mang đến những giải pháp tối ưu cho mọi không gian sống."
      },
      items: [
        {
          id: 1,
          icon: BriefcaseIcon,
          targetValue: 5,
          label: "Kinh nghiệm",
          suffix: "+ năm",
          description: "Kinh nghiệm",
          backgroundImage: experienceImg,
          category: "experience"
        },
        {
          id: 2,
          icon: HandshakeIcon,
          targetValue: 500,
          label: "Khách hàng",
          suffix: "+",
          description: "Tin tưởng & hài lòng",
          backgroundImage: customerImg,
          category: "customers"
        },
        {
          id: 3,
          icon: DesignIcon,
          targetValue: 450,
          label: "Dự án",
          suffix: "+",
          description: "Thiết kế hoàn thành",
          backgroundImage: projectImg,
          category: "projects"
        },
        {
          id: 4,
          icon: GearIcon,
          targetValue: 98,
          label: "Chất lượng",
          suffix: "%",
          description: "Cam kết hoàn hảo",
          backgroundImage: qualityImg,
          category: "quality"
        },
      ]
    };
  } catch (error) {
    handleApiError(error, 'stats');
    throw error;
  }
};

export const fetchSolutionData = async (): Promise<SolutionData> => {
  try {
    await delay(300);
    
    return {
      header: {
        mainHeadline: "GIẢI PHÁP KHÔNG GIAN",
        subHeadline: "DÀNH RIÊNG CHO BẠN"
      },
      solutions: [
        {
          id: 1,
          imageUrl: solutionImg1,
          category: "Dịch vụ",
          title: "Thiết kế kiến trúc",
          link: "/services/architecture-design",
        },
        {
          id: 2,
          imageUrl: solutionImg2,
          category: "Dịch vụ",
          title: "Thiết kế nội thất",
          link: "/services/interior-design",
        },
        {
          id: 3,
          imageUrl: solutionImg3,
          category: "Dịch vụ",
          title: "Thi công hoàn thiện",
          link: "/services/construction",
        },
        {
          id: 4,
          imageUrl: solutionImg4,
          category: "Dịch vụ",
          title: "Thi công trọn gói",
          link: "/services/full-package",
        },
      ]
    };
  } catch (error) {
    handleApiError(error, 'solution');
    throw error;
  }
};

export const fetchWorkflowData = async (): Promise<WorkflowData> => {
  try {
    await delay(250);
    
    return {
      title: "QUY TRÌNH LÀM VIỆC",
      workflows: [
        {
          id: 'design',
          icon: DesignProcessIcon,
          title: 'QUY TRÌNH THIẾT KẾ',
          diagram: WorkProcessFlowDiagram1
        },
        {
          id: 'construction',
          icon: ConstructionProcessIcon,
          title: 'QUY TRÌNH THI CÔNG',
          diagram: WorkProcessFlowDiagram2
        }
      ]
    };
  } catch (error) {
    handleApiError(error, 'workflow');
    throw error;
  }
};

export const fetchProjectDiaryData = async (): Promise<ProjectDiaryData> => {
  try {
    await delay(200);
    
    return {
      title: "NHẬT KÝ HÀNH TRÌNH",
      images: [
        { src: thumbIntro1, alt: "People presenting something at a table" },
        { src: thumbIntro2, alt: "People inspecting a room in construction" },
        { src: thumbIntro3, alt: "Construction workers reviewing plans" },
        { src: solutionImg1, alt: "Stylish kitchen interior" },
        { src: solutionImg2, alt: "Person using a tablet at a desk" },
        { src: solutionImg3, alt: "Modern living room interior" },
        { src: solutionImg4, alt: "Team standing in front of a house design" },
        { src: thumbIntro, alt: "Worker installing a window" },
      ]
    };
  } catch (error) {
    handleApiError(error, 'project diary');
    throw error;
  }
};

export const fetchTestimonialData = async (): Promise<TestimonialData> => {
  try {
    await delay(300);
    
    return {
      header: {
        mainHeadline: "CẢM NHẬN KHÁCH HÀNG",
        subHeadline: "VỀ PG DESIGN"
      },
      testimonials: [
        {
          name: "CHỊ NHI",
          project: "CHUNG CƯ CITY GATES - Q1",
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.",
        },
        {
          name: "ANH BÌNH",
          project: "CHUNG CƯ CITY GATES - Q1",
          text: "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor.",
        },
        {
          name: "CHỊ LAN",
          project: "DỰ ÁN BIỆT THỰ ĐÀ LẠT - Q1",
          text: "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.",
        },
        {
          name: "ANH THỊNH",
          project: "NHÀ PHỐ QUẬN 7 - Q1",
          text: "Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.",
        },
        {
          name: "CHỊ MAI",
          project: "CĂN HỘ CAO CẤP - Q8",
          text: "Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.",
        },
      ]
    };
  } catch (error) {
    handleApiError(error, 'testimonials');
    throw error;
  }
};

export const fetchConsultationFormData = async (): Promise<ConsultationFormData> => {
  try {
    await delay(150);
    
    return {
      title: "ĐĂNG KÝ TƯ VẤN",
      projectTypes: [
        "-- Chọn loại công trình --",
        "Nhà Phố - Căn hộ",
        "Nhà hàng - Khách sạn",
        "Quán Cafe",
        "Văn phòng",
        "Biệt thự",
        "Shophouse",
      ],
      minInvestment: 100,
      maxInvestment: 10000,
      stepInvestment: 100
    };
  } catch (error) {
    handleApiError(error, 'consultation form');
    throw error;
  }
};

// Main function to fetch all homepage data
export const fetchHomePageData = async (): Promise<HomePageData> => {
  try {
    // Fetch all data in parallel for better performance
    const [
      hero,
      about,
      imageSlider,
      stats,
      solution,
      workflow,
      projectDiary,
      testimonials,
      consultationForm
    ] = await Promise.all([
      fetchHeroData(),
      fetchAboutData(),
      fetchImageSliderData(),
      fetchStatsData(),
      fetchSolutionData(),
      fetchWorkflowData(),
      fetchProjectDiaryData(),
      fetchTestimonialData(),
      fetchConsultationFormData()
    ]);

    return {
      hero,
      about,
      imageSlider,
      stats,
      solution,
      workflow,
      projectDiary,
      testimonials,
      consultationForm
    };
  } catch (error) {
    handleApiError(error, 'homepage');
    throw error;
  }
};

// Utility function to check API health
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    // const response = await fetch(`${API_BASE_URL}/health`);
    // return response.ok;
    await delay(100);
    return true;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}; 