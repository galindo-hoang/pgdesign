import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetailPage.css";
import { BlogDetailData } from "../../types/blogDetailTypes";
import { ConsultationCTA } from "../../types/blogPageTypes";
import { fetchBlogDetailData } from "../../services/blogDetailService";
import { fetchConsultationCTA } from "../../services/blogPageService";
import LoadingSpinner from "../../components/LoadingSpinner";
import ConsultationCTASection from "../../components/ConsultationCTASection";
import QuillEditor, { QuillEditorRef } from "../../components/QuillEditor";

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [blogData, setBlogData] = useState<BlogDetailData | null>(null);
  const [consultationCTAData, setConsultationCTAData] = useState<ConsultationCTA | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [showHTMLOutput, setShowHTMLOutput] = useState(false);
  
  const quillEditorRef = useRef<QuillEditorRef>(null);

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
        
        // Fetch blog detail data and consultation CTA data in parallel
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

  // Handle Escape key to close preview modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showHTMLOutput) {
        setShowHTMLOutput(false);
      }
    };

    if (showHTMLOutput) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [showHTMLOutput]);

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
    if (quillEditorRef.current) {
      const content = quillEditorRef.current.getContent();
      const formattedHTML = quillEditorRef.current.getFormattedHTML();
      
      console.log('Preview Content:');
      console.log('Raw HTML:', content.html);
      console.log('Formatted HTML:', formattedHTML);
      
      // Set the content to display in preview
      setEditorContent(formattedHTML);
      setShowHTMLOutput(true);
    }
  };

  const handleSubmitContent = async () => {
    if (quillEditorRef.current) {
      const content = quillEditorRef.current.getContent();
      const formattedHTML = quillEditorRef.current.getFormattedHTML();
      
      try {
        // Show loading state
        console.log('Submitting content to backend...');
        
        // Prepare the data to send to backend
        const submitData = {
          slug: slug,
          title: blogData?.title,
          content: formattedHTML,
          rawContent: content.html,
          delta: content.delta,
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
      <div className="blog-content-wrapper">
        <div className="content-grid">
          {/* Main Content */}
          <div className="main-content">
            <div className="editor-controls" style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
              <h4>Editor Controls</h4>
              <button 
                onClick={handlePreviewContent}
                style={{ marginRight: '10px', padding: '8px 16px', background: '#0078d4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Preview Content
              </button>
              <button 
                onClick={handleSubmitContent}
                style={{ padding: '8px 16px', background: '#107c10', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Submit Content
              </button>
            </div>

            <QuillEditor 
              ref={quillEditorRef}
              value={blogData.htmlContent} 
              onChange={handleEditorChange}
              placeholder="Bắt đầu chỉnh sửa nội dung bài viết..."
            />

            {/* Full Screen Preview Modal */}
            {showHTMLOutput && (
              <div className="preview-modal-overlay" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}>
                <div className="preview-modal" style={{
                  background: 'white',
                  borderRadius: '12px',
                  width: '100%',
                  maxWidth: '1200px',
                  height: '90vh',
                  maxHeight: '800px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  overflow: 'hidden'
                }}>
                  {/* Modal Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    borderBottom: '1px solid #e9ecef',
                    background: '#f8f9fa'
                  }}>
                    <h3 style={{ margin: 0, color: '#495057', fontSize: '18px', fontWeight: '600' }}>
                      Content Preview
                    </h3>
                    <button 
                      onClick={() => setShowHTMLOutput(false)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        fontSize: '24px', 
                        cursor: 'pointer', 
                        color: '#666',
                        padding: '8px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#e9ecef';
                        e.currentTarget.style.color = '#495057';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#666';
                      }}
                    >
                      ×
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: '24px',
                    background: 'white'
                  }}>
                    <div 
                      className="preview-content"
                      style={{ 
                        maxWidth: '800px',
                        margin: '0 auto',
                        lineHeight: '1.6',
                        fontSize: '16px'
                      }}
                      dangerouslySetInnerHTML={{ __html: editorContent }}
                    />
                  </div>

                  {/* Modal Footer */}
                  <div style={{
                    padding: '16px 24px',
                    borderTop: '1px solid #e9ecef',
                    background: '#f8f9fa',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px'
                  }}>
                    <button 
                      onClick={() => setShowHTMLOutput(false)}
                      style={{
                        padding: '8px 16px',
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#5a6268';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#6c757d';
                      }}
                    >
                      Close
                    </button>
                    <button 
                      onClick={handleSubmitContent}
                      style={{
                        padding: '8px 16px',
                        background: '#0078d4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#106ebe';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#0078d4';
                      }}
                    >
                      Submit Content
                    </button>
                  </div>
                </div>
              </div>
            )}
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