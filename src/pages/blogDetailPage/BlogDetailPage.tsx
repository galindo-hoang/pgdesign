import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetailPage.css";
import { BlogDetailData } from "../../types/blogDetailTypes";
import { ConsultationCTA } from "../../types/blogPageTypes";
import { fetchBlogDetailData } from "../../services/blogDetailService";
import { fetchConsultationCTA } from "../../services/blogPageService";
import LoadingSpinner from "../../components/LoadingSpinner";
import ConsultationCTASection from "../../components/ConsultationCTASection";

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [blogData, setBlogData] = useState<BlogDetailData | null>(null);
  const [consultationCTAData, setConsultationCTAData] = useState<ConsultationCTA | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) {
        setError('Blog slug is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const [blogDetailData, consultationData] = await Promise.all([
          fetchBlogDetailData(slug),
          fetchConsultationCTA()
        ]);
        
        setBlogData(blogDetailData);
        setConsultationCTAData(consultationData);

      } catch (err: any) {
        console.error('Error loading data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [slug]);

  const handleBackClick = () => {
    navigate('/blog');
  };

  const handleConsultationClick = () => {
    // Handle consultation form or contact
    console.log("Consultation requested");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="blog-detail-page">
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

  // Show error state
  if (error || !blogData) {
    return (
      <div className="blog-detail-page">
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: '#666'
        }}>
          <h2>Có lỗi xảy ra</h2>
          <p>{error || 'Không thể tải dữ liệu bài viết'}</p>
          <button 
            onClick={handleBackClick}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#1b3025',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            Quay lại
          </button>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#666',
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-detail-page">
      {/* Hero Section */}
      <div className="blog-hero">
        <img 
          src={blogData.thumbnail} 
          alt={blogData.title}
          className="hero-background-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">

            <div className="blog-meta">
              <span className="category">{blogData.category}</span>
              <span className="publish-date">{formatDate(blogData.publishDate)}</span>
              <span className="read-time">{blogData.readTime}</span>
            </div>
            <h1 className="blog-title">{blogData.title}</h1>
            {blogData.subtitle && (
              <h2 className="blog-subtitle">{blogData.subtitle}</h2>
            )}
            <p className="blog-excerpt">{blogData.excerpt}</p>
            <div className="blog-stats">
              <span className="view-count">👁 {blogData.viewCount.toLocaleString()} lượt xem</span>
              {blogData.author && (
                <span className="author">✍ {blogData.author}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="blog-content-wrapper">
        <div className="content-grid">
          {/* Main Content */}
          <div className="main-content">
            <div 
              className="embedded-html-content"
              dangerouslySetInnerHTML={{ __html: blogData.htmlContent }}
            />
            
            
          </div>
          
          {/* Sidebar - Only Related Articles */}
          <div className="sidebar">
            {/* Related Articles */}
            <div className="related-articles-card">
              <h3>Bài viết liên quan</h3>
              <div className="related-articles-list">
                <div className="related-article">
                  <img src="/src/assets/images/diary-image-3.png" alt="Related article" />
                  <div className="related-article-info">
                    <h4>Khám Phá 4 Phong Cách Tủ Quần Áo Đẹp</h4>
                    <span>1,678 lượt xem</span>
                  </div>
                </div>
                <div className="related-article">
                  <img src="/src/assets/images/diary-image-4.png" alt="Related article" />
                  <div className="related-article-info">
                    <h4>Các cách phối màu nội thất đẹp</h4>
                    <span>2,431 lượt xem</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <ConsultationCTASection
        title={consultationCTAData?.title}
        description={consultationCTAData?.description}
        features={consultationCTAData?.features}
        buttonText={consultationCTAData?.buttonText}
        imageUrl={consultationCTAData?.imageUrl}
        onConsultationClick={handleConsultationClick}
      />
    </div>
  );
};

export default BlogDetailPage; 