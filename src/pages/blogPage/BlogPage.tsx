import React, { useState, useEffect } from "react";
import "./BlogPage.css";

// Import BlogPageService
import { 
  fetchBlogPageData, 
  fetchProjectItems, 
  getCurrentDataSource 
} from "../../services/blogPageService";

// Import types
import { 
  BlogPageData, 
  ProjectGalleryData, 
  BlogPageFilters 
} from "../../types/blogPageTypes";

// Import LoadingSpinner component
import LoadingSpinner from "../../components/LoadingSpinner";

// Import sample images as fallback
import consultationImage from "../../assets/images/thumb-intro.jpg";

const BlogPage: React.FC = () => {
  // State management
  const [blogData, setBlogData] = useState<BlogPageData | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectGalleryData | null>(null);

  // Load blog page data on component mount
  useEffect(() => {
    const loadBlogPageData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log(`Loading blog page data from ${getCurrentDataSource()} source...`);
        
        const data = await fetchBlogPageData();
        setBlogData(data);

        // Load initial projects data
        const projectFilters: BlogPageFilters = {
          limit: visibleProjects,
          offset: 0
        };
        const projectGallery = await fetchProjectItems(projectFilters);
        setProjectsData(projectGallery);

      } catch (err: any) {
        console.error('Error loading blog page data:', err);
        setError(err.message || 'Failed to load blog page data');
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogPageData();
  }, [visibleProjects]);

  // Handle load more projects
  const handleLoadMore = async () => {
    if (!projectsData || !projectsData.hasMore) return;

    try {
      const newLimit = visibleProjects + 6;
      const filters: BlogPageFilters = {
        limit: newLimit,
        offset: 0
      };

      const newProjectsData = await fetchProjectItems(filters);
      setProjectsData(newProjectsData);
      setVisibleProjects(newLimit);
    } catch (err: any) {
      console.error('Error loading more projects:', err);
      setError('Failed to load more projects');
    }
  };

  const handleConsultationClick = () => {
    // Handle consultation form or contact
    console.log("Consultation requested");
  };

  // Retry function for error handling
  const handleRetry = () => {
    window.location.reload();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="blog-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh' 
        }}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blogData) {
    return (
      <div className="blog-page">
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: '#666'
        }}>
          <h2>Có lỗi xảy ra</h2>
          <p>{error || 'Không thể tải dữ liệu trang blog'}</p>
          <button 
            onClick={handleRetry}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#1b3025',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">
            {blogData.heroData?.title || "PG DESIGN - THIẾT KẾ NỘI THẤT PHÒNG KHÁCH ĐẸP, HIỆN ĐẠI TẠI TP.HCM"}
          </h1>
          <p className="blog-hero-subtitle">
            {blogData.heroData?.subtitle || "Khám phá bộ sưu tập những không gian phòng khách được thiết kế tinh tế, kết hợp hoàn hảo giữa thẩm mỹ và công năng sử dụng."}
          </p>
        </div>
      </section>

      {/* Project Gallery Grid */}
      <section className="project-gallery">
        <div className="project-gallery-container">
          <div className="project-grid">
            {projectsData?.projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <button className="project-view-btn">Xem chi tiết</button>
                  </div>
                </div>
                
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-details">
                    <div className="project-detail">
                      <span className="detail-icon">📐</span>
                      <span className="detail-text">{project.area}</span>
                    </div>
                    <div className="project-detail">
                      <span className="detail-icon">🎨</span>
                      <span className="detail-text">{project.style}</span>
                    </div>
                    <div className="project-detail">
                      <span className="detail-icon">👤</span>
                      <span className="detail-text">{project.client} – {project.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {projectsData?.hasMore && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore}>
                Xem thêm dự án
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Information/Content Section */}
      <section className="blog-content">
        <div className="blog-content-container">
          <div className="content-header">
            <h2 className="content-main-title">
              {blogData.contentSection?.mainTitle || "PG DESIGN - THIẾT KẾ NỘI THẤT PHÒNG KHÁCH ĐẸP, HIỆN ĐẠI TẠI TP.HCM"}
            </h2>
          </div>

          <div className="content-body">
            <p className="content-intro">
              {blogData.contentSection?.introText || "Phòng khách là không gian trung tâm của ngôi nhà, nơi gia đình quây quần và đón tiếp khách. Một phòng khách được thiết kế đẹp không chỉ tạo ấn tượng mạnh mẽ với khách ghé thăm mà còn mang lại cảm giác thoải mái, ấm cúng cho chính gia chủ."}
            </p>

            <h3 className="content-section-title">
              {blogData.contentSection?.designStylesTitle || "Các phong cách thiết kế phòng khách đẹp"}
            </h3>
            <div className="content-list">
              {blogData.contentSection?.designStyles.map((style, index) => (
                <div key={style.id} className="list-item">
                  <span className="list-number">{index + 1}.</span>
                  <div className="list-content">
                    <strong>{style.name}:</strong> {style.description}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="content-section-title">
              {blogData.contentSection?.factorsTitle || "Những yếu tố quan trọng khi thiết kế nội thất phòng khách"}
            </h3>
            <div className="content-factors">
              {blogData.contentSection?.importantFactors.map((factor) => (
                <div key={factor.id} className="factor-item">
                  <h4 className="factor-title">{factor.title}</h4>
                  <p className="factor-desc">{factor.description}</p>
                </div>
              ))}
            </div>

            <h3 className="content-section-title">
              {blogData.contentSection?.processTitle || "Quy trình thiết kế nội thất phòng khách chuyên nghiệp"}
            </h3>
            <div className="process-steps">
              {blogData.contentSection?.processSteps.map((step) => (
                <div key={step.id} className="step-item">
                  <div className="step-number">{step.stepNumber}</div>
                  <div className="step-content">
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="consultation-cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              {blogData.consultationCTA?.title || "NHẬN TƯ VẤN THIẾT KẾ NỘI THẤT"}
            </h2>
            <p className="cta-description">
              {blogData.consultationCTA?.description || "Bạn đang muốn thiết kế không gian phòng khách đẹp và hiện đại? Hãy liên hệ với PG Design để được tư vấn miễn phí và nhận báo giá chi tiết."}
            </p>
            <div className="cta-features">
              {blogData.consultationCTA?.features.map((feature, index) => (
                <div key={index} className="cta-feature">
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">{feature}</span>
                </div>
              ))}
            </div>
            <button className="cta-button" onClick={handleConsultationClick}>
              {blogData.consultationCTA?.buttonText || "ĐĂNG KÝ TƯ VẤN NGAY"}
            </button>
          </div>
          <div className="cta-image">
            <img 
              src={blogData.consultationCTA?.imageUrl || consultationImage} 
              alt="Interior Design Consultation" 
              className="consultation-image"
            />
          </div>
        </div>
      </section>

      {/* Data source indicator (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          background: '#1b3025',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 1000
        }}>
          Data: {getCurrentDataSource()}
        </div>
      )}
    </div>
  );
};

export default BlogPage; 