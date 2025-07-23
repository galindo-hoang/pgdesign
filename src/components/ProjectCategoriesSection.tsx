import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectCategoriesSection.css";

interface ProjectCategory {
  id: string;
  title: string;
  projectCount: number;
  backgroundImage: string;
  navigationPath: string;
}

interface ProjectCategoriesHeader {
  mainTitle: string;
  subtitle: string;
  description: string;
}

interface ProjectCategoriesSectionProps {
  header: ProjectCategoriesHeader;
  categories: ProjectCategory[];
}

const ProjectCategoriesSection: React.FC<ProjectCategoriesSectionProps> = ({
  header,
  categories
}) => {
  console.log(JSON.stringify(categories));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    console.log(categoryId);
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleViewMore = (e: React.MouseEvent, navigationPath: string) => {
    e.stopPropagation();
    navigate(navigationPath);
  };

  return (
    <section className="project-categories-section">
      <div className="categories-header">
        <h2 className="categories-main-title">{header.mainTitle}</h2>
        <div className="categories-subtitle-container">
          <h3 className="categories-subtitle">{header.subtitle}</h3>
          <div className="categories-accent-line"></div>
        </div>
        <p className="categories-description">
          {header.description}
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
                <div className="project">Dự án</div>
                <div className="title">{category.title}</div>
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