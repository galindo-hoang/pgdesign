import React, { useState } from "react";
import "./ProjectCategoriesSection.css";

interface ProjectCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  projectCount: number;
  backgroundImage?: string;
}

const ProjectCategoriesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: ProjectCategory[] = [
    {
      id: "nha-pho",
      title: "NHÀ PHỐ",
      description: "Thiết kế hiện đại cho không gian sống đô thị, tối ưu hóa diện tích và ánh sáng tự nhiên.",
      icon: "🏢",
      projectCount: 45,
    },
    {
      id: "nha-vuon",
      title: "NHÀ VƯỜN",
      description: "Hòa quyện kiến trúc với thiên nhiên, tạo nên không gian sống xanh và thư thái.",
      icon: "🌿",
      projectCount: 32,
    },
    {
      id: "biet-thu",
      title: "BIỆT THỰ",
      description: "Kiến trúc sang trọng và đẳng cấp, thể hiện phong cách sống luxury của gia chủ.",
      icon: "🏛️",
      projectCount: 28,
    },
    {
      id: "khong-gian",
      title: "KHÔNG GIAN",
      description: "Thiết kế nội thất độc đáo, tối ưu hóa công năng và thẩm mỹ cho mọi không gian.",
      icon: "🎨",
      projectCount: 67,
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
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
            <div className="category-icon">
              <span>{category.icon}</span>
            </div>
            <div className="category-content">
              <h4 className="category-title">{category.title}</h4>
              <p className="category-description">{category.description}</p>
              <div className="category-stats">
                <span className="project-count">{category.projectCount} dự án</span>
                <span className="view-more">Xem thêm →</span>
              </div>
            </div>
            <div className="category-overlay"></div>
          </div>
        ))}
      </div>

      <div className="categories-cta">
        <button className="explore-all-btn">
          <span>KHÁM PHÁ TẤT CẢ DỰ ÁN</span>
          <div className="btn-arrow">→</div>
        </button>
      </div>
    </section>
  );
};

export default ProjectCategoriesSection; 