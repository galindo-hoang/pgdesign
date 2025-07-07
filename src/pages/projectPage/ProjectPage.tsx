import React from "react";
import "./ProjectPage.css";
import AboutProjectSection from "../../components/AboutProjectSection";
import backgroundImage from "../../assets/images/thumb-intro.jpg"; // Adjust path as needed
import ProjectCategoriesSection from "../../components/ProjectCategoriesSection";
import StatsSection from "../../components/StatsSection";

// Import your SVG icons
import { ReactComponent as BriefcaseIcon } from "../../assets/icons/experience-icon.svg";
import { ReactComponent as HandshakeIcon } from "../../assets/icons/customer-icon.svg";
import { ReactComponent as DesignIcon } from "../../assets/icons/design-icon.svg";
import { ReactComponent as GearIcon } from "../../assets/icons/building-icon.svg";

// Import project images for backgrounds
import experienceImg from "../../assets/images/diary-image-1.jpg";
import customerImg from "../../assets/images/diary-image-2.jpg";
import projectImg from "../../assets/images/diary-image-3.jpg";
import qualityImg from "../../assets/images/diary-image-4.jpg";

// Import project category images
import nhaPhoBg from "../../assets/images/diary-image-1.jpg";
import nhaVuonBg from "../../assets/images/diary-image-2.jpg";
import bietThuBg from "../../assets/images/diary-image-3.jpg";
import khongGianBg from "../../assets/images/diary-image-4.jpg";


const ProjectPage: React.FC = () => {
  const stateHeader = {
    mainHeadline: "THÀNH TỰU CỦA CHÚNG TÔI",
    subHeadline: "Những con số ấn tượng",
    description: "Với nhiều năm kinh nghiệm trong lĩnh vực thiết kế kiến trúc và nội thất, chúng tôi tự hào mang đến những giải pháp tối ưu cho mọi không gian sống."
  }
  const statIcons = [
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
    ];

  const aboutProjectSectionContent = {
    title: "Dự án",
    subtitle: "PG DESIGN",
    backgroundImage: backgroundImage
  }

  // Project Categories Section Data
  const projectCategoriesHeader = {
    mainTitle: "DANH MỤC DỰ ÁN",
    subtitle: "KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ",
    description: "Từ những căn nhà phố hiện đại đến những biệt thự sang trọng, từ không gian nội thất tinh tế đến những ngôi nhà vườn xanh mát - chúng tôi mang đến giải pháp thiết kế toàn diện cho mọi nhu cầu."
  };

  const projectCategories = [
    {
      id: "house-normal",
      title: "NHÀ PHỐ",
      projectCount: 45,
      backgroundImage: nhaPhoBg,
      navigationPath: "/projects/house-normal",
    },
    {
      id: "house-full",
      title: "Xây nhà trọn gói",
      projectCount: 32,
      backgroundImage: nhaVuonBg,
      navigationPath: "/projects/house-full",
    },
    {
      id: "house-rough",
      title: "Xây dựng phần thô",
      projectCount: 28,
      backgroundImage: bietThuBg,
      navigationPath: "/projects/house-rough",
    },
    {
      id: "house-interior",
      title: "Thiết kế và thi công nội thất",
      projectCount: 50,
      backgroundImage: khongGianBg,
      navigationPath: "/projects/house-interior",
    }
  ];

  return (
    <div className="project-page">
      <AboutProjectSection content={aboutProjectSectionContent}/>
      <StatsSection stateHeader={stateHeader} stateItems={statIcons}/>
      <ProjectCategoriesSection header={projectCategoriesHeader} categories={projectCategories} />
    </div>
  );
};

export default ProjectPage;
