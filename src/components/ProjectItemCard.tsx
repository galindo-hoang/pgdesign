import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    // Navigate to project detail page
    navigate(`/project-detail/${project.id}`);
    
    // Keep the onClick callback for backward compatibility
    if (onClick) {
      onClick(project);
    }
  };

  return (
    <div 
      className="project-masonry-card" 
      onClick={handleCardClick}
    >
      <div className="project-image-container">
        <img 
          src={project.thumbnailImage} 
          alt={project.title}
          className="project-masonry-image"
          loading="lazy"
        />
        
        {/* Category label - always visible */}
        {/* <div className="project-category-label">
          {project.subCategory}
        </div> */}
        
        {/* Hover overlay with client info */}
        <div className="project-hover-overlay">
          <div className="client-info">
            <div className="client-name">{project.clientName}</div>
            <div className="project-specs">
              <span className="area">{project.area}</span>
              <span className="location">{project.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export type { ProjectItem };
export default ProjectItemCard; 