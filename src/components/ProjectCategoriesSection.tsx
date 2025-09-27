import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectCategoriesSection.css";

interface ProjectCategory {
  id: number;
  categoryId: string;
  title: string;
  projectCount: number;
  backgroundImageBlob: string | null;
  navigationPath: string;
  displayOrder: number;
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  // Process image data - handle double-encoding issue
  const processImageData = (imageData: string | null): string | null => {
    // Check if imageData exists and is valid
    if (!imageData) return null;
    
    // If imageData is not a string, log for debugging
    if (typeof imageData !== 'string') {
      console.log('imageData is not string:', typeof imageData, imageData);
      return null;
    }
    
    // Now we know imageData is a string
    const imageString = imageData.trim();
    if (imageString === '') return null;
    
    // Check if this is a double-encoded base64 string
    if (imageString.startsWith('data:image/') && imageString.includes('base64,')) {
      try {
        const base64Part = imageString.split('base64,')[1];
        const decoded = atob(base64Part);
        
        // If decoded string is also a data URL, use it instead
        if (decoded.startsWith('data:image/')) {
          console.log('Detected double-encoded image, using decoded version');
          return decoded;
        }
      } catch (error) {
        console.log('Error decoding base64:', error);
      }
    }
    
    // Return original string if no double-encoding detected
    return imageString;
  };

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
          {categories.map((category) => {
            const processedImage = processImageData(category.backgroundImageBlob);
            return (
            <div
              key={category.categoryId}
              className={`category-card ${selectedCategory === category.categoryId ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.categoryId)}
            >
            <div 
              className="category-background"
              style={{ 
                backgroundImage: processedImage 
                  ? `url(${processedImage})` 
                  : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                backgroundColor: !processedImage ? '#f0f0f0' : 'transparent'
              }}
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
            );
          })}
      </div>
    </section>
  );
};

export default ProjectCategoriesSection; 