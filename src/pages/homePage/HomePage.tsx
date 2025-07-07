import React, { useRef, useEffect, useState } from "react";
import "./HomePage.css";
import thumbIntro from "../../assets/images/thumb-intro.jpg";
import thumbIntro1 from "../../assets/images/diary-image-1.jpg";
import thumbIntro2 from "../../assets/images/diary-image-2.jpg";
import thumbIntro3 from "../../assets/images/diary-image-3.jpg";
import AboutSection from "../../components/AboutSection";
import ImageSliderSection from "../../components/ImageSliderSection";
import StatsSection from "../../components/StatsSection";
import SolutionSection from "../../components/SolutionSection";
import WorkflowSection from "../../components/WorkProcessSection";
import ProjectDiarySection from "../../components/ProjectDiarySection";
import TestimonialSliderSection from "../../components/TestimonialSliderSection";
import ConsultationFormSection from "../../components/ConsultationFormSection";

// Import your SVG icons
import { ReactComponent as BriefcaseIcon } from "../../assets/icons/experience-icon.svg";
import { ReactComponent as HandshakeIcon } from "../../assets/icons/customer-icon.svg";
import { ReactComponent as DesignIcon } from "../../assets/icons/design-icon.svg";
import { ReactComponent as GearIcon } from "../../assets/icons/building-icon.svg";

// Import workflow icons and diagrams
import { ReactComponent as DesignProcessIcon } from "../../assets/icons/design-icon.svg";
import { ReactComponent as ConstructionProcessIcon } from "../../assets/icons/building-icon.svg";
import { ReactComponent as WorkProcessFlowDiagram1 } from "../../assets/icons/work-process-flow-diagram-1.svg";
import { ReactComponent as WorkProcessFlowDiagram2 } from "../../assets/icons/work-process-flow-diagram-2.svg";

// Import project images for backgrounds
import experienceImg from "../../assets/images/diary-image-1.jpg";
import customerImg from "../../assets/images/diary-image-2.jpg";
import projectImg from "../../assets/images/diary-image-3.jpg";
import qualityImg from "../../assets/images/diary-image-4.jpg";

// Import solution service images
import solutionImg1 from "../../assets/images/diary-image-5.jpg";
import solutionImg2 from "../../assets/images/diary-image-6.jpg";
import solutionImg3 from "../../assets/images/diary-image-7.jpg";
import solutionImg4 from "../../assets/images/diary-image-8.jpg";

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageAnimating, setIsImageAnimating] = useState(false);

  const heroImages = [
    thumbIntro, 
    thumbIntro1, 
    thumbIntro2, 
    thumbIntro3, 
    thumbIntro, 
  ];

  // Image slider data
  const imageSliderData = [
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

  // Solution section data
  const solutionHeader = {
    mainHeadline: "GIẢI PHÁP KHÔNG GIAN",
    subHeadline: "DÀNH RIÊNG CHO BẠN"
  };

  const solutionData = [
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
  ];

  // Testimonials section data
  const testimonialHeader = {
    mainHeadline: "CẢM NHẬN KHÁCH HÀNG",
    subHeadline: "VỀ PG DESIGN"
  };

  const testimonialsData = [
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
  ];

  // Project diary data
  const projectDiaryData = [
    { src: thumbIntro1, alt: "People presenting something at a table" },
    { src: thumbIntro2, alt: "People inspecting a room in construction" },
    { src: thumbIntro3, alt: "Construction workers reviewing plans" },
    { src: solutionImg1, alt: "Stylish kitchen interior" },
    { src: solutionImg2, alt: "Person using a tablet at a desk" },
    { src: solutionImg3, alt: "Modern living room interior" },
    { src: solutionImg4, alt: "Team standing in front of a house design" },
    { src: thumbIntro, alt: "Worker installing a window" },
  ];

  // Workflow section data
  const workflowData = {
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

  // Consultation form data
  const consultationFormDataProps = {
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

  useEffect(() => {
    if (!isHeroVisible) return;

    const imageChangeInterval = setInterval(() => {
      setIsImageAnimating(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % heroImages.length
        );
        setIsImageAnimating(false);
      }, 300); 
    }, 4000);

    return () => clearInterval(imageChangeInterval);
  }, [isHeroVisible, heroImages.length]);

  useEffect(() => {
    const immediateTimer = setTimeout(() => {
      console.log('Hero - Immediate animation trigger'); 
      setIsHeroVisible(true);
    }, 500);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Hero - Intersection triggered:', entry.isIntersecting);
          if (entry.isIntersecting && !isHeroVisible) {
            console.log('Hero - Starting zoom animation');
            clearTimeout(immediateTimer); 
            setIsHeroVisible(true);
          }
        });
      },
      {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      clearTimeout(immediateTimer);
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      observer.disconnect();
    };
  }, [isHeroVisible]);

  return (
    <div className="home-page">
      <section ref={heroRef} className="hero-section">
        <div className={`hero-image-container ${isHeroVisible ? 'zoom-in-hero' : ''}`}>
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`PG Design - Kiến tạo không gian ${index + 1}`}
              className={`hero-image ${
                index === currentImageIndex ? 'active' : ''
              } ${isImageAnimating && index === currentImageIndex ? 'animating' : ''}`}
              style={{
                opacity: index === currentImageIndex ? 1 : 0,
                zIndex: index === currentImageIndex ? 2 : 1
              }}
            />
          ))}
        </div>
      </section>

      <main className="main-content">
          <AboutSection 
            headline = "MỖI THIẾT KẾ LÀ MỘT CÂU CHUYỆN"
            subHeadline= "MỖI CÔNG TRÌNH LÀ MỘT DẤU ẤN"
            description = "Thành lập từ năm 2022, PG là đội ngũ kiến trúc sư trẻ đầy đam mê và nhiệt huyết, hoạt động chuyên sâu trong lĩnh vực Kiến trúc - Xây dựng - Nội thất. Chúng tôi mang đến giải pháp toàn diện từ thiết kế ý tưởng đến thi công hoàn thiện, giúp khách hàng tối ưu không gian sống, tiết kiệm thời gian và chi phí, nhưng vẫn đảm bảo thẩm mỹ và công năng."
          />
          <ImageSliderSection slides={imageSliderData} />
          <StatsSection stateHeader={stateHeader} stateItems={statIcons}/>
          <SolutionSection header={solutionHeader} solutions={solutionData} />
          <WorkflowSection title={workflowData.title} workflows={workflowData.workflows} />
          <ProjectDiarySection title="NHẬT KÝ HÀNH TRÌNH" images={projectDiaryData} />
          <TestimonialSliderSection header={testimonialHeader} testimonials={testimonialsData} />
          <ConsultationFormSection formData={consultationFormDataProps} />
      </main>
    </div>
  );
};

export default HomePage;
