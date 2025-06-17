import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectCategoriesSection.css";

// Import project images for category backgrounds
import nhaPhoBg from "../assets/images/diary-image-1.jpg";
import nhaVuonBg from "../assets/images/diary-image-2.jpg";
import bietThuBg from "../assets/images/diary-image-3.jpg";
import khongGianBg from "../assets/images/diary-image-4.jpg";

interface ProjectCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  projectCount: number;
  backgroundImage: string;
  navigationPath: string;
}

const ProjectCategoriesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories: ProjectCategory[] = [
    {
      id: "nha-pho",
      title: "NHÀ PHỐ",
      description: "Thiết kế hiện đại cho không gian sống đô thị, tối ưu hóa diện tích và ánh sáng tự nhiên.",
      icon: "🏢",
      projectCount: 45,
      backgroundImage: nhaPhoBg,
      navigationPath: "/projects/nha-pho",
    },
    {
      id: "nha-vuon",
      title: "NHÀ VƯỜN",
      description: "Hòa quyện kiến trúc với thiên nhiên, tạo nên không gian sống xanh và thư thái.",
      icon: "🌿",
      projectCount: 32,
      backgroundImage: nhaVuonBg,
      navigationPath: "/projects/nha-vuon",
    },
    {
      id: "biet-thu",
      title: "BIỆT THỰ",
      description: "Kiến trúc sang trọng và đẳng cấp, thể hiện phong cách sống luxury của gia chủ.",
      icon: "🏛️",
      projectCount: 28,
      backgroundImage: bietThuBg,
      navigationPath: "/projects/biet-thu",
    },
    {
      id: "nha-cap4",
      title: "NHÀ CẤP 4",
      description: "Một loại hình nhà ở đặc trưng của Việt Nam, thường chỉ có một tầng (tầng trệt). Tuy nhiên, nó không chỉ đơn thuần là một ngôi nhà một tầng mà còn có nhiều biến thể dựa trên phong cách và cách thức bố trí.",
      icon: "🎨",
      projectCount: 50,
      backgroundImage: khongGianBg,
      navigationPath: "/projects/nha-cap4",
    },
    {
      id: "can-ho-chung-cu",
      title: "CĂN HỘ CHUNG CƯ",
      description: "Là một không gian sống riêng tư bên trong một tòa nhà lớn hơn, được thiết kế để đáp ứng nhu cầu sinh hoạt của một gia đình hoặc cá nhân.",
      icon: "🎨",
      projectCount: 30,
      backgroundImage: khongGianBg,
      navigationPath: "/projects/can-ho-chung-cu",
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleViewMore = (e: React.MouseEvent, navigationPath: string) => {
    e.stopPropagation();
    
    navigate(navigationPath);
  };

  const handleExploreAll = () => {
    navigate("/projects");
  };

  return (
    <section className="project-categories-section">
      <div className="categories-header">
        <h2 className="categories-main-title">DANH MỤC DỰ ÁN</h2>
        <div className="categories-subtitle-container">
          <h3 className="categories-subtitle">KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ</h3>
          <div className="categories-accent-line"></div>
        </div>
        <p className="categories-description">
          Từ những căn nhà phố hiện đại đến những biệt thự sang trọng, 
          từ không gian nội thất tinh tế đến những ngôi nhà vườn xanh mát - 
          chúng tôi mang đến giải pháp thiết kế toàn diện cho mọi nhu cầu.
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div 
              className="category-background"
              style={{ backgroundImage: `url(${category.backgroundImage})` }}
            />
            <div className="category-overlay"></div>
            
            <div className="category-content-wrapper">
              <div className="category-icon">
                <span>{category.icon}</span>
              </div>
              <div className="category-content">
                <h4 className="category-title">{category.title}</h4>
                <p className="category-description">{category.description}</p>
                <div className="category-stats">
                  <span className="project-count">{category.projectCount} dự án</span>
                  <button 
                    className="view-more"
                    onClick={(e) => handleViewMore(e, category.navigationPath)}
                    aria-label={`Xem thêm dự án ${category.title}`}
                  >
                    Xem thêm →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="categories-cta">
        <button 
          className="explore-all-btn"
          onClick={handleExploreAll}
        >
          <span>KHÁM PHÁ TẤT CẢ DỰ ÁN</span>
          <div className="btn-arrow">→</div>
        </button>
      </div>
    </section>
  );
};

export default ProjectCategoriesSection; 