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
        
        const data = await fetchProjectDetailData(projectId);
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

  // Render the project detail layout as JSX components
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
            <p>
              Đây là dự án nhà phố hiện đại được thiết kế với phong cách tối giản nhưng không kém phần sang trọng. 
              Công trình được hoàn thành với chất lượng cao và sự hài lòng của khách hàng.
            </p>
            
            <h3>Đặc điểm nổi bật</h3>
            <ul>
              <li>Thiết kế mặt tiền hiện đại với các đường nét sạch sẽ</li>
              <li>Tối ưu hóa ánh sáng tự nhiên cho toàn bộ không gian</li>
              <li>Sử dụng vật liệu cao cấp và thân thiện với môi trường</li>
              <li>Bố trí không gian thông minh, tận dụng tối đa diện tích</li>
            </ul>
            
            <h3>Không gian chức năng</h3>
            <p><strong>Tầng 1:</strong> Phòng khách, phòng bếp, phòng ăn và khu vực tiếp khách</p>
            <p><strong>Tầng 2:</strong> Phòng ngủ chính, phòng ngủ khách và phòng tắm</p>
            <p><strong>Tầng 3:</strong> Phòng làm việc, khu vực thư giãn và sân thượng</p>
            
            <div className="project-gallery">
              <h3>Hình ảnh dự án</h3>
              <div className="image-grid">
                {projectData.projectImages?.map((image, index) => (
                                     <img 
                     key={index}
                     src={image} 
                     alt={`Project view ${index + 1}`}
                   />
                ))}
              </div>
            </div>
            
            <h3>Vật liệu sử dụng</h3>
            <ul>
              <li>Gạch ốp lát: Granite cao cấp</li>
              <li>Cửa sổ: Nhôm kính cường lực</li>
              <li>Sơn: Sơn nước cao cấp chống thấm</li>
              <li>Hệ thống điện: Schneider Electric</li>
              <li>Cửa gỗ: Gỗ công nghiệp MDF chống ẩm</li>
              <li>Sàn gỗ: Sàn gỗ công nghiệp cao cấp</li>
            </ul>
            
            <p>
              <em>
                Dự án được hoàn thành vào tháng 12/2023 với sự hài lòng cao của khách hàng. 
                Đây là minh chứng cho chất lượng và uy tín của PG Design trong lĩnh vực thiết kế và thi công.
              </em>
            </p>
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