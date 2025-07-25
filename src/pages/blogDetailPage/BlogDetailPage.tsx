import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetailPage.css";
import { BlogDetailData } from "../../types/blogDetailTypes";
import { ConsultationCTA } from "../../types/blogPageTypes";
import { fetchBlogDetailData } from "../../services/blogDetailService";
import { fetchConsultationCTA } from "../../services/blogPageService";
import LoadingSpinner from "../../components/LoadingSpinner";
import ConsultationCTASection from "../../components/ConsultationCTASection";
import BlogContentSection, { BlogContentSectionRef } from "../../components/BlogContentSection";

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [blogData, setBlogData] = useState<BlogDetailData | null>(null);
  const [consultationCTAData, setConsultationCTAData] = useState<ConsultationCTA | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [showHTMLOutput, setShowHTMLOutput] = useState(false);
  
  const blogContentSectionRef = useRef<BlogContentSectionRef>(null);

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

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    console.log('Editor content changed:', content);
  };

  const handlePreviewContent = () => {
    if (blogContentSectionRef.current) {
      const content = blogContentSectionRef.current.getEditorContent();
      const formattedHTML = blogContentSectionRef.current.getFormattedHTML();
      
      console.log('Preview Content:');
      console.log('Raw HTML:', content?.html);
      console.log('Formatted HTML:', formattedHTML);
      
      // Set the content to display in preview
      setEditorContent(formattedHTML);
      setShowHTMLOutput(true);
    }
  };

  const handleSubmitContent = async () => {
    if (blogContentSectionRef.current) {
      const content = blogContentSectionRef.current.getEditorContent();
      const formattedHTML = blogContentSectionRef.current.getFormattedHTML();
      
      try {
        // Show loading state
        console.log('Submitting content to backend...');
        
        // Prepare the data to send to backend
        const submitData = {
          slug: slug,
          title: blogData?.title,
          content: formattedHTML,
          rawContent: content?.html,
          delta: content?.delta,
          updatedAt: new Date().toISOString()
        };
        
        console.log('Submit Data:', submitData);
        
        // TODO: Replace with actual API call to your backend
        // Example API call:
        // const response = await fetch('/api/blog/update', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(submitData)
        // });
        // 
        // if (!response.ok) {
        //   throw new Error('Failed to submit content');
        // }
        // 
        // const result = await response.json();
        // console.log('Submit successful:', result);
        
        // For now, simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Nội dung đã được gửi thành công!');
        console.log('Content submitted successfully!');
        
      } catch (error) {
        console.error('Error submitting content:', error);
        alert('Có lỗi xảy ra khi gửi nội dung. Vui lòng thử lại.');
      }
    }
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
      <BlogContentSection
        htmlContent={blogData.htmlContent}
        onEditorChange={handleEditorChange}
        onPreviewContent={handlePreviewContent}
        onSubmitContent={handleSubmitContent}
        showPreviewModal={showHTMLOutput}
        onClosePreviewModal={() => setShowHTMLOutput(false)}
        editorContent={editorContent}
        placeholder="Bắt đầu chỉnh sửa nội dung bài viết..."
        ref={blogContentSectionRef}
      />

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