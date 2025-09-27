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
import { fetchCategoryProjectForHomePage } from './projectCategoryService';
import { processProjectImageUrls } from './projectPageService';

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
import hero1 from "../assets/images/homepage/hero1.png";
import hero2 from "../assets/images/homepage/hero2.png";
import hero3 from "../assets/images/homepage/hero3.png";
import hero4 from "../assets/images/homepage/hero4.png";
import projectDiary1 from "../assets/images/homepage/projectdiary1.png";
import projectDiary2 from "../assets/images/homepage/projectdiary2.png";
import projectDiary3 from "../assets/images/homepage/projectdiary3.png";
import projectDiary4 from "../assets/images/homepage/projectdiary4.png";
import projectDiary5 from "../assets/images/homepage/projectdiary5.png";
import projectDiary6 from "../assets/images/homepage/projectdiary6.png";
import projectDiary7 from "../assets/images/homepage/projectdiary7.png";
import projectDiary8 from "../assets/images/homepage/projectdiary8.png";
import thumbIntro from "../assets/images/thumb-intro.png";
import thumbIntro1 from "../assets/images/diary-image-1.png";
import thumbIntro2 from "../assets/images/diary-image-2.png";
import thumbIntro3 from "../assets/images/diary-image-3.png";
import solutionImg1 from "../assets/images/homepage/solution1.png";
import solutionImg2 from "../assets/images/homepage/solution2.png";
import solutionImg3 from "../assets/images/homepage/solution3.png";
import solutionImg4 from "../assets/images/homepage/solution4.png";
import experienceImg from "../assets/images/diary-image-1.png";
import customerImg from "../assets/images/diary-image-2.png";
import projectImg from "../assets/images/diary-image-3.png";
import qualityImg from "../assets/images/diary-image-4.png";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1';

// Feature flag for mock data
const USE_MOCK_DATA = true;

// Cache for image slider data to prevent unnecessary API calls
let imageSliderCache: {
  data: ImageSlideData[] | null;
  timestamp: number;
  promise: Promise<ImageSlideData[]> | null;
} = {
  data: null,
  timestamp: 0,
  promise: null
};

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

// Error handling utility
const handleApiError = (error: any, section: string) => {
  console.error(`Error fetching ${section} data:`, error);
  throw new Error(`Failed to fetch ${section} data. Please try again later.`);
};

// API Functions for each section
export const fetchHeroData = async (): Promise<HeroData> => {
  try {
    if (USE_MOCK_DATA) {
      // Use mock data
      // await delay(500);
      return {
        images: [
          hero1,
          hero2,
          hero3,
          hero4
        ]
      };
    } else {
      // Make real API call
      const response = await fetch(`${API_BASE_URL}/homepage/hero`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        images: data.data.images || []
      };
    }
  } catch (error) {
    handleApiError(error, 'hero');
    throw error;
  }
};

export const fetchAboutData = async (): Promise<AboutData> => {
  try {
    if (USE_MOCK_DATA) {
      // Use mock data
      // await delay(300);
      return {
        headline: "MỖI THIẾT KẾ LÀ MỘT CÂU CHUYỆN",
        subHeadline: "MỖI CÔNG TRÌNH LÀ MỘT DẤU ẤN",
        description: "Thành lập từ năm 2022, PG là đội ngũ kiến trúc sư trẻ đầy đam mê và nhiệt huyết, hoạt động chuyên sâu trong lĩnh vực Kiến trúc - Xây dựng - Nội thất. Chúng tôi mang đến giải pháp toàn diện từ thiết kế ý tưởng đến thi công hoàn thiện, giúp khách hàng tối ưu không gian sống, tiết kiệm thời gian và chi phí, nhưng vẫn đảm bảo thẩm mỹ và công năng."
      };
    } else {
      // Make real API call
      const response = await fetch(`${API_BASE_URL}/homepage/about`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        headline: data.data.headline || '',
        subHeadline: data.data.sub_headline || '',
        description: data.data.description || ''
      };
    }
  } catch (error) {
    handleApiError(error, 'about');
    throw error;
  }
};

export const fetchImageSliderData = async (): Promise<ImageSlideData[]> => {
  const now = Date.now();
  
  // Check if we have valid cached data
  if (imageSliderCache.data && (now - imageSliderCache.timestamp) < CACHE_DURATION) {
    console.log('📦 Using cached image slider data');
    return imageSliderCache.data;
  }
  
  // Check if there's an ongoing request
  if (imageSliderCache.promise) {
    console.log('⏳ Waiting for ongoing image slider request');
    return imageSliderCache.promise;
  }
  
  // Create new request
  console.log('🔄 Fetching fresh image slider data');
  imageSliderCache.promise = fetchImageSliderDataInternal();
  
  try {
    const result = await imageSliderCache.promise;
    // Cache the successful result
    imageSliderCache.data = result;
    imageSliderCache.timestamp = now;
    imageSliderCache.promise = null;
    return result;
  } catch (error) {
    // Clear the promise on error
    imageSliderCache.promise = null;
    throw error;
  }
};

const fetchImageSliderDataInternal = async (): Promise<ImageSlideData[]> => {
  try {
    // Fetch projects marked for homepage display
    const homePageProjects = await fetchCategoryProjectForHomePage();
    
    // Process image URLs to handle PUBLIC_URL prefix
    const processedProjects = homePageProjects.map(project => processProjectImageUrls(project));
    
    // Convert to ImageSlideData format
    const imageSliderData: ImageSlideData[] = processedProjects.map(project => ({
      id: project.id,
      projectId: project.projectId,
      imageUrl: project.thumbnailImage,
      title: project.title,
      subtitle: project.clientName,
      size: project.area
    }));
    
    console.log(`Converted ${imageSliderData.length} projects to image slider format`);
    
    return imageSliderData;
  } catch (error) {
    console.error('Error fetching image slider data from projects:', error);
    console.log('Falling back to original mock data for image slider');
    // await delay(400);
    return [
      {
        id: 1,
        imageUrl: thumbIntro1,
        projectId: "NHÀ ANH TRẠCH",
        title: "NHÀ ANH TRẠCH",
        subtitle: "Thi công nội thất nhà phố",
        size: "180m2",
      },
      {
        id: 2,
        imageUrl: thumbIntro2,
        projectId: "ANH MỸ - OPAL GARDEN",
        title: "ANH MỸ - OPAL GARDEN",
        subtitle: "Thi công nội thất căn hộ",
        size: "180m2",
      },
      {
        id: 3,
        imageUrl: thumbIntro3,
        projectId: "SKY LINKED VILLA",
        title: "SKY LINKED VILLA",
        subtitle: "Thi công nội thất biệt thự",
        size: "180m2",
      },
      {
        id: 4,
        imageUrl: thumbIntro,
        projectId: "DỰ ÁN MỚI 1",
        title: "DỰ ÁN MỚI 1",
        subtitle: "Thi công nội thất chung cư",
        size: "120m2",
      },
      {
        id: 5,
        imageUrl: thumbIntro1,
        projectId: "DỰ ÁN MỚI 2",
        title: "DỰ ÁN MỚI 2",
        subtitle: "Thi công nội thất văn phòng",
        size: "300m2",
      },
    ];
  }
};

export const fetchStatsData = async (): Promise<StatsData> => {
  try {
    if (USE_MOCK_DATA) {
      // Use mock data
      // await delay(350);
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
            suffix: "+",
            description: "Năm kinh nghiệm",
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
    } else {
      // Make real API call
      const response = await fetch(`${API_BASE_URL}/homepage/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        header: {
          mainHeadline: data.data.header.main_headline || '',
          subHeadline: data.data.header.sub_headline || '',
          description: data.data.header.description || ''
        },
        items: data.data.items.map((item: any) => ({
          id: item.id,
          icon: BriefcaseIcon, // Keep using default icons since backend doesn't provide components
          targetValue: item.targetValue || 0,
          label: item.label || '',
          suffix: item.suffix || '',
          description: item.description || '',
          category: item.category || ''
        }))
      };
    }
  } catch (error) {
    handleApiError(error, 'stats');
    throw error;
  }
};

export const fetchSolutionData = async (): Promise<SolutionData> => {
  try {
    if (USE_MOCK_DATA) {
      // Use mock data
      // await delay(300);
      return {
        header: {
          mainHeadline: "GIẢI PHÁP KHÔNG GIAN",
          subHeadline: "DÀNH RIÊNG CHO BẠN"
        },
        solutions: [
          {
            id: 1,
            imageUrl: solutionImg1,
            category: "Dịch vụ thi công",
            title: ["Phần thô", "Trọn gói hoàn thiện"],
            link: "/services/architecture-design",
          },
          {
            id: 2,
            imageUrl: solutionImg2,
            category: "Dịch vụ thi công",
            title: ["Nội thất"],
            link: "/services/interior-design",
          },
          {
            id: 3,
            imageUrl: solutionImg3,
            category: "Dịch vụ thiết kế",
            title: ["Kiến trúc", "Nội thất"],
            link: "/services/construction",
          },
          {
            id: 4,
            imageUrl: solutionImg4,
            category: "Dịch vụ thi công",
            title: ["Cải tạo sửa chữa", "Dự án đã có bản vẽ"],
            link: "/services/full-package",
          },
        ]
      };
    } else {
      // Make real API call
      const response = await fetch(`${API_BASE_URL}/homepage/solution`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        header: {
          mainHeadline: data.data.header.main_headline || '',
          subHeadline: data.data.header.sub_headline || ''
        },
        solutions: data.data.solutions.map((solution: any) => ({
          id: solution.id,
          imageUrl: solution.image_url || '',
          category: solution.category || '',
          title: Array.isArray(solution.title) ? solution.title : [solution.title],
          link: solution.link || ''
        }))
      };
    }
  } catch (error) {
    handleApiError(error, 'solution');
    throw error;
  }
};

export const fetchWorkflowData = async (): Promise<WorkflowData> => {
  try {
    if (USE_MOCK_DATA) {
      // Use mock data
      // await delay(250);
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
    } else {
      // Make real API call
      const response = await fetch(`${API_BASE_URL}/homepage/workflow`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        title: data.data.main.title || '',
        workflows: data.data.tabs.map((tab: any) => ({
          id: tab.workflow_key || '',
          icon: tab.workflow_key === 'design' ? DesignProcessIcon : ConstructionProcessIcon,
          title: tab.title || '',
          diagram: tab.workflow_key === 'design' ? WorkProcessFlowDiagram1 : WorkProcessFlowDiagram2
        }))
      };
    }
  } catch (error) {
    handleApiError(error, 'workflow');
    throw error;
  }
};

export const fetchProjectDiaryData = async (): Promise<ProjectDiaryData> => {
  try {
    if (USE_MOCK_DATA) {
      // Use mock data
      // await delay(200);
      return {
        title: "NHẬT KÝ HÀNH TRÌNH",
        images: [
          { src: projectDiary1, alt: "People presenting something at a table" },
          { src: projectDiary2, alt: "People inspecting a room in construction" },
          { src: projectDiary3, alt: "Construction workers reviewing plans" },
          { src: projectDiary4, alt: "Stylish kitchen interior" },
          { src: projectDiary5, alt: "Person using a tablet at a desk" },
          { src: projectDiary6, alt: "Modern living room interior" },
          { src: projectDiary7, alt: "Team standing in front of a house design" },
          { src: projectDiary8, alt: "Worker installing a window" },
        ]
      };
    } else {
      // Make real API call
      const response = await fetch(`${API_BASE_URL}/homepage/project-diary`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        title: data.data.main.title || '',
        images: data.data.images.map((image: any) => ({
          src: image.image_url || '',
          alt: image.image_alt || ''
        }))
      };
    }
  } catch (error) {
    handleApiError(error, 'project diary');
    throw error;
  }
};

export const fetchTestimonialData = async (): Promise<TestimonialData> => {
  try {
    if (USE_MOCK_DATA) {
      // Use mock data
      // await delay(300);
      return {
        header: {
          mainHeadline: "CẢM NHẬN KHÁCH HÀNG",
          subHeadline: "VỀ PG DESIGN"
        },
        testimonials: [
          {
            name: "CHỊ NHI",
            project: "CHUNG CƯ CITY GATES - Q1",
            text: "Tôi rất hài lòng với Dịch vụ thi công thiết kế và thi công nội thất của PG Design. Mọi thứ đều được hoàn thiện đúng tiến độ, đúng như những gì tôi mong đợi - thậm chí còn đẹp hơn cả bản vẽ 3D. Nhân sự tư vấn kỹ lưỡng, thân thiện và luôn sẵn sàng hỗ trợ bất cứ khi nào tôi cần.",
          },
          {
            name: "ANH BÌNH",
            project: "CHUNG CƯ CITY GATES - Q1",
            text: "Điều tôi ấn tượng nhất ở PG Design là sự chuyên nghiệp và tinh tế trong từng chi tiết. Không gian sống sau khi hoàn thiện vừa hiện đại, vừa mang tính cá nhân hóa cao. Gia đình tôi cảm thấy thoải mái và hài lòng mỗi ngày khi trở về nhà.",
          },
          {
            name: "CHỊ LAN",
            project: "DỰ ÁN BIỆT THỰ ĐÀ LẠT - Q1",
            text: "Biệt thự của tôi ở Đà Lạt có nhiều góc khó xử lý, nhưng PG Design đã đưa ra những giải pháp rất thông minh và thẩm mỹ. Thiết kế vừa sang trọng, vừa gần gũi với thiên nhiên – đúng như mong muốn ban đầu. Tôi đánh giá cao sự tận tâm và gu thẩm mỹ của đội ngũ.",
          },
          {
            name: "ANH THỊNH",
            project: "NHÀ PHỐ QUẬN 7 - Q1",
            text: "PG Design đã biến ngôi nhà phố của tôi thành một không gian sống hoàn hảo. Từ thiết kế ban đầu đến thi công hoàn thiện, mọi bước đều được thực hiện một cách chuyên nghiệp. Đặc biệt là phần bếp và phòng khách, vừa đẹp vừa tiện dụng cho gia đình.",
          },
          {
            name: "CHỊ MAI",
            project: "CĂN HỘ CAO CẤP - Q8",
            text: "Làm việc với PG Design là một trải nghiệm tuyệt vời. Họ không chỉ tạo ra không gian đẹp mà còn hiểu rõ nhu cầu sử dụng của gia đình. Căn hộ sau khi hoàn thiện vừa hiện đại, vừa ấm cúng. Tôi rất hài lòng với kết quả cuối cùng.",
          },
          {
            name: "ANH TUẤN",
            project: "SHOPHOUSE QUẬN 2",
            text: "Dự án shophouse của tôi được PG Design thiết kế rất thông minh, tối ưu không gian kinh doanh và sinh hoạt. Đội ngũ thi công chuyên nghiệp, đảm bảo chất lượng và tiến độ. Tôi đánh giá cao sự tận tâm và trách nhiệm của họ.",
          },
          {
            name: "CHỊ HƯƠNG",
            project: "VĂN PHÒNG QUẬN 3",
            text: "Văn phòng công ty tôi được PG Design thiết kế theo phong cách hiện đại, tạo môi trường làm việc chuyên nghiệp và thoải mái. Nhân viên ai cũng thích không gian mới này. Cảm ơn PG Design đã mang lại giá trị thực sự cho doanh nghiệp.",
          },
          {
            name: "ANH MINH",
            project: "CĂN HỘ STUDIO - Q4",
            text: "Căn hộ studio nhỏ của tôi được PG Design tối ưu hóa không gian một cách tuyệt vời. Mọi góc đều được sử dụng hiệu quả, tạo cảm giác rộng rãi hơn thực tế. Thiết kế vừa đẹp vừa thực dụng, phù hợp với lối sống hiện đại.",
          },
        ]
      };
    } else {
      // Make real API call
      const response = await fetch(`${API_BASE_URL}/homepage/testimonials`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        header: {
          mainHeadline: data.data.header.main_headline || '',
          subHeadline: data.data.header.sub_headline || ''
        },
        testimonials: data.data.testimonials.map((testimonial: any) => ({
          name: testimonial.name || '',
          project: testimonial.project || '',
          text: testimonial.text || ''
        }))
      };
    }
  } catch (error) {
    handleApiError(error, 'testimonials');
    throw error;
  }
};

export const fetchConsultationFormData = async (): Promise<ConsultationFormData> => {
  try {
    if (USE_MOCK_DATA) {
      // Use mock data
      // await delay(150);
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
    } else {
      // Make real API call
      const response = await fetch(`${API_BASE_URL}/homepage/consultation-form`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        title: data.data.main.title || '',
        projectTypes: data.data.projectTypes.map((type: any) => type.name || ''),
        minInvestment: data.data.main.min_investment || 100,
        maxInvestment: data.data.main.max_investment || 10000,
        stepInvestment: data.data.main.step_investment || 100
      };
    }
  } catch (error) {
    handleApiError(error, 'consultation form');
    throw error;
  }
};

// Main function to fetch all homepage data
export const fetchHomePageData = async (): Promise<HomePageData> => {
  try {
    if (USE_MOCK_DATA) {
      // Use mock data - fetch all data in parallel for better performance
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
    } else {
      // Make real API call to get all data at once
      const response = await fetch(`${API_BASE_URL}/homepage`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const apiData = data.data;
      
      return {
        hero: {
          images: apiData.hero.images || []
        },
        about: {
          headline: apiData.about.headline || '',
          subHeadline: apiData.about.sub_headline || '',
          description: apiData.about.description || ''
        },
        imageSlider: apiData.imageSlider.map((slide: any) => ({
          id: slide.id,
          imageUrl: slide.image_url || '',
          title: slide.title || '',
          subtitle: slide.subtitle || '',
          size: slide.size || ''
        })),
        stats: {
          header: {
            mainHeadline: apiData.stats.header.main_headline || '',
            subHeadline: apiData.stats.header.sub_headline || '',
            description: apiData.stats.header.description || ''
          },
          items: apiData.stats.items.map((item: any) => ({
            id: item.id,
            icon: BriefcaseIcon,
            targetValue: item.targetValue || 0,
            label: item.label || '',
            suffix: item.suffix || '',
            description: item.description || '',
            category: item.category || ''
          }))
        },
        solution: {
          header: {
            mainHeadline: apiData.solution.header.main_headline || '',
            subHeadline: apiData.solution.header.sub_headline || ''
          },
          solutions: apiData.solution.solutions.map((solution: any) => ({
            id: solution.id,
            imageUrl: solution.image_url || '',
            category: solution.category || '',
            title: Array.isArray(solution.title) ? solution.title : [solution.title],
            link: solution.link || ''
          }))
        },
        workflow: {
          title: apiData.workflow.main.title || '',
          workflows: apiData.workflow.tabs.map((tab: any) => ({
            id: tab.workflow_key || '',
            icon: tab.workflow_key === 'design' ? DesignProcessIcon : ConstructionProcessIcon,
            title: tab.title || '',
            diagram: tab.workflow_key === 'design' ? WorkProcessFlowDiagram1 : WorkProcessFlowDiagram2
          }))
        },
        projectDiary: {
          title: apiData.projectDiary.main.title || '',
          images: apiData.projectDiary.images.map((image: any) => ({
            src: image.image_url || '',
            alt: image.image_alt || ''
          }))
        },
        testimonials: {
          header: {
            mainHeadline: apiData.testimonials.header.main_headline || '',
            subHeadline: apiData.testimonials.header.sub_headline || ''
          },
          testimonials: apiData.testimonials.testimonials.map((testimonial: any) => ({
            name: testimonial.name || '',
            project: testimonial.project || '',
            text: testimonial.text || ''
          }))
        },
        consultationForm: {
          title: apiData.consultationForm.main.title || '',
          projectTypes: apiData.consultationForm.projectTypes.map((type: any) => type.name || ''),
          minInvestment: apiData.consultationForm.main.min_investment || 100,
          maxInvestment: apiData.consultationForm.main.max_investment || 10000,
          stepInvestment: apiData.consultationForm.main.step_investment || 100
        }
      };
    }
  } catch (error) {
    handleApiError(error, 'homepage');
    throw error;
  }
};

// Utility function to check API health
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    if (USE_MOCK_DATA) {
      // Mock health check
      // await delay(100);
      return true;
    } else {
      // Real API health check
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      return response.ok;
    }
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

/**
 * Clear the image slider cache to force a fresh fetch
 * Useful when you need to refresh the data
 */
export const clearImageSliderCache = (): void => {
  console.log('🗑️ Clearing image slider cache');
  imageSliderCache = {
    data: null,
    timestamp: 0,
    promise: null
  };
}; 