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
  projectCount: number;
  backgroundImage: string;
  navigationPath: string;
}

const ProjectCategoriesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories: ProjectCategory[] = [
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
      title: "Thiết kế  và thi công nội thất",
      projectCount: 50,
      backgroundImage: khongGianBg,
      navigationPath: "/projects/house-interior",
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleViewMore = (e: React.MouseEvent, navigationPath: string) => {
    e.stopPropagation();
    
    navigate(navigationPath);
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
              <div className="category-top">
                <div>Dự án</div>
                <div>{category.title}</div>
              </div>
                             <div className="category-bottom">
                 <span className="project-count">{category.projectCount} dự án</span>
                 <button 
                     className="view-more"
                     onClick={(e) => handleViewMore(e, category.navigationPath)}
                     aria-label={`Xem chi tiết dự án ${category.title}`}
                   >
                     Xem chi tiết
                   </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectCategoriesSection; 