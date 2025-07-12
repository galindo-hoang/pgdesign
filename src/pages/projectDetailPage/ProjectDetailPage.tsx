import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetailPage.css";
import { ProjectDetailData } from "../../types/projectDetailTypes";
import { fetchProjectDetailData } from "../../services/projectDetailService";
import heroImage from "../../assets/images/diary-image-1.jpg";

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  const [projectData, setProjectData] = useState<ProjectDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjectData = async () => {
      if (!projectId) {
        setError('Project ID is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchProjectDetailData("1");
        setProjectData(data);
      } catch (err: any) {
        console.error('Error loading project detail data:', err);
        setError(err.message || 'Failed to load project detail data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectData();
  }, [projectId]);

  // Show blank screen while loading
  if (isLoading) {
    return <div className="blank-screen"></div>;
  }

  // Show blank screen if there's an error (you can modify this to show error if needed)
  if (error) {
    return <div className="blank-screen"></div>;
  }

  // Show blank screen if no data
  if (!projectData) {
    return <div className="blank-screen"></div>;
  }

  // Render hybrid layout: JSX structure with embedded HTML content in main area
  return (
    <div className="project-detail-page-dynamic">
      {/* Hero Section */}
      <div className="project-hero">
        <img 
          src={projectData.thumbnailImage || heroImage} 
          alt={projectData.title}
          className="hero-background-image"
        />
        <div className="hero-overlay">
          <div>
            <h1>{projectData.title}</h1>
            <div className="subtitle">
              {projectData.clientName} • {projectData.area} • {projectData.address}
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="project-content">
        <div className="content-grid">
                    {/* Main Content */}
          <div className="main-content">
            <h2>Thông tin chi tiết dự án</h2>
            <div 
              className="embedded-html-content"
              dangerouslySetInnerHTML={{ __html: projectData.htmlContent }}
            />
          </div>
          
          {/* Sidebar */}
          <div className="sidebar">
            <div className="info-card">
              <h3>Thông tin dự án</h3>
              <div className="info-item">
                <strong>Khách hàng:</strong>
                <span>{projectData.clientName}</span>
              </div>
              <div className="info-item">
                <strong>Diện tích:</strong>
                <span>{projectData.area}</span>
              </div>
              <div className="info-item">
                <strong>Địa chỉ:</strong>
                <span>{projectData.address}</span>
              </div>
              <div className="info-item">
                <strong>Ngày khởi công:</strong>
                <span>{new Date(projectData.constructionDate).toLocaleDateString('vi-VN')}</span>
              </div>
              {projectData.completionDate && (
                <div className="info-item">
                  <strong>Ngày hoàn thành:</strong>
                  <span>{new Date(projectData.completionDate).toLocaleDateString('vi-VN')}</span>
                </div>
              )}
              {projectData.projectStatus && (
                <div className="info-item">
                  <strong>Trạng thái:</strong>
                  <span className="status-badge">{projectData.projectStatus}</span>
                </div>
              )}
            </div>
            
            {projectData.projectSpecs && projectData.projectSpecs.length > 0 && (
              <div className="info-card">
                <h3>Thông số kỹ thuật</h3>
                {projectData.projectSpecs
                  .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                  .map((spec) => (
                    <div key={spec.id} className="info-item">
                      <strong>{spec.label}:</strong>
                      <span>{spec.value} {spec.unit || ''}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage; 