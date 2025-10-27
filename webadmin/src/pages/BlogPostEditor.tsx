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
import { createBlogPost, updateBlogPost, getBlogPost, BlogPost, BlogResponse } from '../services/blogService';

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
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [metadataImages, setMetadataImages] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Ref for BlogContentSection
  const blogContentSectionRef = useRef<BlogContentSectionRef>(null);

  const loadPostData = useCallback(async () => {
    setLoading(true);
    try {
      if (!id) {
        setLoading(false);
        return;
      }

      // Call API to fetch post data
      const result = await getBlogPost(id);
      
      if (result.success && result.data) {
        const post = result.data;
        
        // Parse publishDate to YYYY-MM-DD format
        let parsedPublishDate = post.publishDate || new Date().toISOString().split('T')[0];
        try {
          const date = new Date(post.publishDate);
          if (!isNaN(date.getTime())) {
            parsedPublishDate = date.toISOString().split('T')[0];
          }
        } catch (e) {
          console.warn('Failed to parse publishDate:', e);
        }

        setPostData({
          id: post.id,
          title: post.title,
          subtitle: post.subtitle || '',
          excerpt: post.excerpt || post.content,
          thumbnail: post.thumbnail || '', // Get thumbnail from API
          viewCount: post.views,
          hashtags: post.hashtags || [],
          publishDate: parsedPublishDate,
          slug: post.slug || '',
          htmlContent: post.htmlContent || '',
          author: post.author,
          readTime: post.readTime || '',
          category: post.category || '',
          status: post.status,
          featured: post.featured,
          seoTitle: '',
          seoDescription: '',
          seoKeywords: []
        });

        // Set thumbnail preview if thumbnail exists
        if (post.thumbnail) {
          setThumbnailPreview(post.thumbnail);
        }
        
        // Set metadata images if they exist
        if (post.metadataImages && post.metadataImages.length > 0) {
          setMetadataImages(post.metadataImages);
        }
        
        // Set editor content from htmlContent
        setEditorContent(post.htmlContent || '');
      } else {
        console.error('Failed to load blog post:', result.error);
        alert('Failed to load blog post data');
      }
    } catch (error) {
      console.error('Error loading post:', error);
      alert('Error loading blog post data');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      loadPostData();
    }
  }, [isEditing, loadPostData]);

  // Sync htmlContent to editor when postData changes
  useEffect(() => {
    if (postData.htmlContent && !editorContent) {
      setEditorContent(postData.htmlContent);
    }
  }, [postData.htmlContent, editorContent]);

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

  const handleThumbnailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Upload and get URL
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('section', 'blog-thumbnails');

        const response = await fetch('http://localhost:3002/api/v1/upload/image', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data?.url) {
            setPostData(prev => ({
              ...prev,
              thumbnail: result.data.url
            }));
          }
        } else {
          console.error('Thumbnail upload failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading thumbnail:', error);
      }
    }
  };

  const handleMetadataImagesChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setUploadingImages(true);
      
      try {
        const uploadedUrls: string[] = [];
        
        // Upload each file
        for (const file of files) {
          const formData = new FormData();
          formData.append('image', file);
          formData.append('section', 'blog-metadata');

          const response = await fetch('http://localhost:3002/api/v1/upload/image', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data?.url) {
              uploadedUrls.push(result.data.url);
            }
          }
        }
        
        // Add URLs to metadata images
        setMetadataImages(prev => [...prev, ...uploadedUrls]);
      } catch (error) {
        console.error('Error uploading metadata images:', error);
        alert('Error uploading images. Please try again.');
      } finally {
        setUploadingImages(false);
        // Reset input
        event.target.value = '';
      }
    }
  };

  const handleRemoveMetadataImage = (index: number) => {
    setMetadataImages(prev => prev.filter((_, i) => i !== index));
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

      // Prepare data for API
      // Note: publishDate will be auto-generated by backend
      const postPayload: any = {
        title: postData.title,
        subtitle: postData.subtitle || '',
        content: postData.excerpt, // Use excerpt as content for API
        htmlContent: postData.htmlContent,
        author: postData.author || 'Admin',
        status: postData.status,
        // publishDate removed - backend will auto-generate
        views: postData.viewCount,
        featured: postData.featured,
        slug: postData.slug,
        thumbnail: postData.thumbnail,
        metadataImages: metadataImages // Store metadata images URLs
      };

      // Call API
      let result;
      if (isEditing && id) {
        result = await updateBlogPost(id, postPayload);
      } else {
        result = await createBlogPost(postPayload);
      }

      if (result.success) {
        alert(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
        navigate('/blog');
      } else {
        throw new Error(result.error || 'Failed to save blog post');
      }
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
    // Don't allow title change when editing
    if (isEditing) {
      return;
    }
    
    handleInputChange('title', value);
    
    // Always auto-generate slug from title
    const newSlug = generateSlugFromTitle(value);
    setPostData(prev => ({
      ...prev,
      slug: newSlug
    }));
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
                readOnly={isEditing}
                disabled={isEditing}
                style={isEditing ? { 
                  background: '#f5f5f5', 
                  cursor: 'not-allowed',
                  opacity: 0.6 
                } : {}}
              />
              {isEditing && (
                <small style={{ color: '#6c757d', fontSize: '12px', display: 'block', marginTop: '0.25rem' }}>
                  Title không thể chỉnh sửa khi đang edit bài viết
                </small>
              )}
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
              <input
                type="text"
                id="slug"
                value={postData.slug || ''}
                placeholder={postData.slug ? '' : 'post-url-slug'}
                className="form-input"
                readOnly
                disabled
                style={{ 
                  background: '#f5f5f5', 
                  cursor: 'not-allowed',
                  opacity: 0.6
                }}
              />
              <small style={{ color: '#6c757d', fontSize: '12px', display: 'block', marginTop: '0.25rem' }}>
                Slug được tự động tạo dựa trên title
              </small>
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

          {/* Thư Viện Ảnh */}
          <div className="editor-section">
            <h2>Thư Viện Ảnh ({metadataImages.length})</h2>
            
            <div className="form-group">
              <div className="images-gallery">
                {metadataImages.map((imageUrl, index) => (
                  <div key={index} className="gallery-item">
                    <img src={imageUrl} alt={`Metadata ${index + 1}`} />
                    <div className="gallery-actions">
                      <button 
                        className="btn-remove"
                        onClick={() => handleRemoveMetadataImage(index)}
                        title="Xóa hình ảnh"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add Image Button */}
                <label className="add-image-btn" style={{ pointerEvents: uploadingImages ? 'none' : 'auto' }}>
                  {uploadingImages ? (
                    <div>Uploading...</div>
                  ) : (
                    <>
                      <Plus size={24} />
                      <span>THÊM ẢNH</span>
                    </>
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleMetadataImagesChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor; 