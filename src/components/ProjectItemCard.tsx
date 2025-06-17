import React from "react";
import "./ProjectItemCard.css";

interface ProjectItem {
  id: string;
  title: string;
  thumbnailImage: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description?: string;
  category: string;
  subCategory: string;
  style?: string;
}

interface ProjectItemCardProps {
  project: ProjectItem;
  onClick?: (project: ProjectItem) => void;
}

const ProjectItemCard: React.FC<ProjectItemCardProps> = ({ project, onClick }) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(project);
    }
  };

  return (
    <div className="project-item-card" onClick={handleCardClick}>
      <div className="project-thumbnail">
        <img 
          src={project.thumbnailImage} 
          alt={project.title}
          className="project-image"
          loading="lazy"
        />
        <div className="project-overlay">
          <div className="project-category-tag">
            {project.subCategory}
          </div>
          {project.style && (
            <div className="project-style-tag">
              {project.style}
            </div>
          )}
        </div>
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        
        <div className="project-details">
          <div className="project-detail-item">
            <span className="detail-label">Khách hàng:</span>
            <span className="detail-value">{project.clientName}</span>
          </div>
          
          <div className="project-detail-item">
            <span className="detail-label">Diện tích:</span>
            <span className="detail-value">{project.area}</span>
          </div>
          
          <div className="project-detail-item">
            <span className="detail-label">Hoàn thành:</span>
            <span className="detail-value">{project.constructionDate}</span>
          </div>
          
          <div className="project-detail-item">
            <span className="detail-label">Địa chỉ:</span>
            <span className="detail-value">{project.address}</span>
          </div>
        </div>
        
        {project.description && (
          <p className="project-description">{project.description}</p>
        )}
        
        <div className="project-actions">
          <button className="view-details-btn">
            Xem chi tiết
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export type { ProjectItem };
export default ProjectItemCard; 