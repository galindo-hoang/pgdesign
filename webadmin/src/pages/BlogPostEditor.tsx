import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon,
  Upload,
  X,
  Plus
} from 'lucide-react';
import './BlogPostEditor.css';

// Import the local BlogContentSection component
import BlogContentSection, { BlogContentSectionRef } from '../components/BlogContentSection';

interface BlogPostData {
  id?: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  thumbnail: string;
  viewCount: number;
  hashtags: string[];
  publishDate: string;
  slug: string;
  htmlContent: string;
  author?: string;
  readTime?: string;
  category?: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

const BlogPostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [postData, setPostData] = useState<BlogPostData>({
    title: '',
    subtitle: '',
    excerpt: '',
    thumbnail: '',
    viewCount: 0,
    hashtags: [],
    publishDate: new Date().toISOString().split('T')[0],
    slug: '',
    htmlContent: '',
    author: '',
    readTime: '',
    category: '',
    status: 'draft',
    featured: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: []
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editorContent, setEditorContent] = useState<string>('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Ref for BlogContentSection
  const blogContentSectionRef = useRef<BlogContentSectionRef>(null);

  const loadPostData = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call to fetch post data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for editing
      const mockPost: BlogPostData = {
        id: id,
        title: 'Thiết kế nội thất phòng khách hiện đại',
        subtitle: 'Xu hướng thiết kế 2024',
        excerpt: 'Khám phá những xu hướng thiết kế nội thất phòng khách hiện đại với những gam màu tươi sáng và không gian mở...',
        thumbnail: '/assets/images/blog/hero-image.png',
        viewCount: 1250,
        hashtags: ['thiết kế nội thất', 'phòng khách', 'hiện đại'],
        publishDate: '2024-01-15',
        slug: 'thiet-ke-noi-that-phong-khach-hien-dai',
        htmlContent: '<h1>Thiết kế nội thất phòng khách hiện đại</h1><p>Nội dung bài viết...</p>',
        author: 'Admin',
        readTime: '5 phút',
        category: 'Thiết kế nội thất',
        status: 'published',
        featured: true,
        seoTitle: 'Thiết kế nội thất phòng khách hiện đại 2024',
        seoDescription: 'Khám phá xu hướng thiết kế nội thất phòng khách hiện đại với những ý tưởng độc đáo',
        seoKeywords: ['thiết kế nội thất', 'phòng khách', 'hiện đại', '2024']
      };
      
      setPostData(mockPost);
      setThumbnailPreview(mockPost.thumbnail);
      setEditorContent(mockPost.htmlContent);
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      loadPostData();
    }
  }, [isEditing, loadPostData]);

  const handleInputChange = (field: keyof BlogPostData, value: any) => {
    setPostData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !postData.seoKeywords?.includes(newKeyword.trim())) {
      setPostData(prev => ({
        ...prev,
        seoKeywords: [...(prev.seoKeywords || []), newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setPostData(prev => ({
      ...prev,
      seoKeywords: prev.seoKeywords?.filter(k => k !== keyword) || []
    }));
  };

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    setPostData(prev => ({
      ...prev,
      htmlContent: content
    }));
  };

  const handlePreviewContent = () => {
    if (blogContentSectionRef.current) {
      const formattedHTML = blogContentSectionRef.current.getFormattedHTML();
      
      console.log('Preview Content:');
      console.log('Formatted HTML:', formattedHTML);
      
      setEditorContent(formattedHTML);
      setShowPreviewModal(true);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Get the latest content from the editor
      if (blogContentSectionRef.current) {
        const formattedHTML = blogContentSectionRef.current.getFormattedHTML();
        
        setPostData(prev => ({
          ...prev,
          htmlContent: formattedHTML
        }));
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Saving post:', postData);
      alert(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
      navigate('/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Enhanced slug generation with Vietnamese character support
  const generateSlugFromTitle = (title: string) => {
    if (!title.trim()) return '';
    
    // Vietnamese character mapping
    const vietnameseMap: { [key: string]: string } = {
      'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
      'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
      'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
      'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
      'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
      'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
      'đ': 'd',
      'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A', 'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
      'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
      'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
      'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O', 'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
      'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
      'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
      'Đ': 'D'
    };

    let slug = title;
    
    // Replace Vietnamese characters
    Object.keys(vietnameseMap).forEach(char => {
      slug = slug.replace(new RegExp(char, 'g'), vietnameseMap[char]);
    });
    
    // Convert to lowercase and replace special characters
    slug = slug
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
      .trim();
    
    return slug;
  };

  // Auto-generate slug when title changes
  const handleTitleChange = (value: string) => {
    handleInputChange('title', value);
    
    // Auto-generate slug if it's empty or if user hasn't manually edited it
    if (!postData.slug || (!slugManuallyEdited && postData.slug === generateSlugFromTitle(postData.title))) {
      const newSlug = generateSlugFromTitle(value);
      setPostData(prev => ({
        ...prev,
        slug: newSlug
      }));
    }
  };

  // Manual slug generation (for the button)
  const handleGenerateSlug = () => {
    const newSlug = generateSlugFromTitle(postData.title);
    setPostData(prev => ({
      ...prev,
      slug: newSlug
    }));
    setSlugManuallyEdited(false);
  };

  // Handle manual slug editing
  const handleSlugChange = (value: string) => {
    handleInputChange('slug', value);
    setSlugManuallyEdited(true);
  };

  // Reset slug to auto-generated
  const handleResetSlug = () => {
    const newSlug = generateSlugFromTitle(postData.title);
    setPostData(prev => ({
      ...prev,
      slug: newSlug
    }));
    setSlugManuallyEdited(false);
  };

  if (loading) {
    return (
      <div className="blog-post-editor">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading post data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-editor">
      {/* Header */}
      <div className="editor-header">
        <div className="header-left">
          <button 
            className="back-btn"
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft />
            Back to Blog
          </button>
          <h1>{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
        </div>
        <div className="header-actions">
          <button 
            className="save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            <Save />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="editor-main">
          {/* Basic Information */}
          <div className="editor-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                value={postData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter post title"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subtitle">Subtitle</label>
              <input
                type="text"
                id="subtitle"
                value={postData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Enter subtitle (optional)"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="excerpt">Excerpt *</label>
              <textarea
                id="excerpt"
                value={postData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Enter a brief excerpt of the post"
                className="form-textarea"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="slug">Slug *</label>
              <div className="slug-input-group">
                <input
                  type="text"
                  id="slug"
                  value={postData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="post-url-slug"
                  className="form-input"
                />
                <button 
                  className="generate-slug-btn"
                  onClick={handleGenerateSlug}
                >
                  Generate
                </button>
                {slugManuallyEdited && (
                  <button 
                    className="reset-slug-btn"
                    onClick={handleResetSlug}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="editor-section">
            <h2>Content</h2>
            
            <BlogContentSection
              ref={blogContentSectionRef}
              htmlContent={postData.htmlContent}
              onEditorChange={handleEditorChange}
              onPreviewContent={handlePreviewContent}
              onSubmitContent={handleSave}
              showPreviewModal={showPreviewModal}
              onClosePreviewModal={() => setShowPreviewModal(false)}
              editorContent={editorContent}
              placeholder="Bắt đầu chỉnh sửa nội dung bài viết..."
              showEditorControls={true}
              showPreviewButton={true}
              showSubmitButton={false}
              previewButtonText="Preview Content"
              modalTitle="Content Preview"
            />
          </div>

          {/* SEO */}
          <div className="editor-section">
            <h2>SEO Settings</h2>
            
            <div className="form-group">
              <label htmlFor="seoTitle">SEO Title</label>
              <input
                type="text"
                id="seoTitle"
                value={postData.seoTitle}
                onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                placeholder="SEO optimized title"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="seoDescription">SEO Description</label>
              <textarea
                id="seoDescription"
                value={postData.seoDescription}
                onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                placeholder="SEO meta description"
                className="form-textarea"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>SEO Keywords</label>
              <div className="keywords-input-group">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Add keyword"
                  className="form-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                />
                <button 
                  className="add-keyword-btn"
                  onClick={handleAddKeyword}
                >
                  <Plus />
                </button>
              </div>
              <div className="keywords-tags">
                {postData.seoKeywords?.map((keyword, index) => (
                  <span key={index} className="keyword-tag">
                    {keyword}
                    <button 
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="remove-tag-btn"
                    >
                      <X />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="editor-sidebar">
          {/* Thumbnail */}
          <div className="editor-section">
            <h2>Thumbnail</h2>
            
            <div className="thumbnail-upload">
              {thumbnailPreview ? (
                <div className="thumbnail-preview">
                  <img src={thumbnailPreview} alt="Thumbnail preview" />
                  <button 
                    className="change-thumbnail-btn"
                    onClick={() => document.getElementById('thumbnail-input')?.click()}
                  >
                    <Upload />
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="thumbnail-placeholder">
                  <ImageIcon />
                  <p>No thumbnail selected</p>
                  <button 
                    className="upload-thumbnail-btn"
                    onClick={() => document.getElementById('thumbnail-input')?.click()}
                  >
                    <Upload />
                    Upload Image
                  </button>
                </div>
              )}
              <input
                id="thumbnail-input"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Metadata */}
          <div className="editor-section">
            <h2>Metadata</h2>
            
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                value={postData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Enter author name"
                className="form-input"
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={postData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="Enter category"
                className="form-input"
              />
            </div> */}

            <div className="form-group">
              <label htmlFor="readTime">Read Time</label>
              <input
                type="text"
                id="readTime"
                value={postData.readTime}
                onChange={(e) => handleInputChange('readTime', e.target.value)}
                placeholder="e.g., 5 phút"
                className="form-input"
              />
            </div>

            {/* <div className="form-group">
              <label>Hashtags</label>
              <div className="hashtags-input-group">
                <input
                  type="text"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  placeholder="Add hashtag"
                  className="form-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddHashtag()}
                />
                <button 
                  className="add-hashtag-btn"
                  onClick={handleAddHashtag}
                >
                  <Plus />
                </button>
              </div>
              <div className="hashtags-tags">
                {postData.hashtags.map((hashtag, index) => (
                  <span key={index} className="hashtag-tag">
                    #{hashtag}
                    <button 
                      onClick={() => handleRemoveHashtag(hashtag)}
                      className="remove-tag-btn"
                    >
                      <X />
                    </button>
                  </span>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor; 