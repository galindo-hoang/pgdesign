import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Upload, 
  X,
  Plus,
  Trash2,
  Loader2
} from 'lucide-react';
import {
  getProjectById,
  createProject,
  updateProject,
  ProjectDetailFormData
} from '../services/projectDetailAdminService';
import { generateProjectCode } from '../services/projectCodeService';
import {
  uploadProjectDetailThumbnail,
  uploadProjectDetailImages,
  uploadSingleImage,
  deleteFile,
  validateImageFile
} from '../services/imageUploadService';
import './ProjectDetailEditor.css';

// Types imported from service

interface ProjectDetailEditorProps {
  mode: 'add' | 'edit';
}

const ProjectDetailEditor: React.FC<ProjectDetailEditorProps> = ({ mode }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState<ProjectDetailFormData>({
    projectId: '',
    title: '',
    clientName: '',
    area: '',
    constructionDate: '',
    address: '',
    description: '',
    category: 'appartment',
    projectCategoryId: 1,
    style: 'Hiện đại',
    projectImages: [],
    projectStatus: 'Hoàn thành',
    completionDate: '',
    architectName: '',
    contractorName: '',
    metaTitle: '',
    metaDescription: '',
    tags: [],
    isOnHomePage: false,
    isActive: true,
    htmlContent: '<div><h3>Nội dung dự án</h3><p>Thêm mô tả chi tiết về dự án...</p></div>'
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  // Temporary editing state management
  const [originalFormData, setOriginalFormData] = useState<ProjectDetailFormData | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [originalThumbnailFile, setOriginalThumbnailFile] = useState<File | null>(null);
  const [originalPendingImageFiles, setOriginalPendingImageFiles] = useState<File[]>([]);
  
  // File state - store files to upload when saving
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [pendingImageFiles, setPendingImageFiles] = useState<File[]>([]);
  
  // Image deletion loading state
  const [deletingImages, setDeletingImages] = useState<Set<number>>(new Set());
  
  // ReactQuill ref
  const quillRef = useRef<ReactQuill>(null);

  // Load project data for edit mode
  useEffect(() => {
    if (mode === 'edit' && projectId) {
      loadProjectData(projectId);
    }
  }, [mode, projectId]);

  const loadProjectData = async (id: string) => {
    setLoading(true);
    try {
      const projectData = await getProjectById(id);
      console.log('Loaded project data:', projectData);
      console.log('Loaded projectImages (URLs):', projectData.projectImages);
      console.log('Loaded projectImages length:', projectData.projectImages?.length);
      
      // Use projectImages which now contains S3 URLs
      const finalProjectImages = projectData.projectImagesUrls || projectData.projectImages || [];
      
      const loadedFormData = {
        ...projectData,
        projectImages: finalProjectImages
      };
      
      setFormData(loadedFormData);
      // Store original data for comparison
      setOriginalFormData(loadedFormData);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error loading project:', error);
      // Handle error - maybe show error message or redirect
    } finally {
      setLoading(false);
    }
  };

  // Check if there are unsaved changes
  const checkUnsavedChanges = () => {
    if (!originalFormData) return false;
    
    // Compare form data
    const formDataChanged = JSON.stringify(formData) !== JSON.stringify(originalFormData);
    
    // Compare thumbnail file
    const thumbnailChanged = thumbnailFile !== originalThumbnailFile;
    
    // Compare pending image files
    const imagesChanged = JSON.stringify(pendingImageFiles) !== JSON.stringify(originalPendingImageFiles);
    
    return formDataChanged || thumbnailChanged || imagesChanged;
  };

  // Update unsaved changes state whenever form data changes
  useEffect(() => {
    setHasUnsavedChanges(checkUnsavedChanges());
  }, [formData, thumbnailFile, pendingImageFiles, originalFormData, originalThumbnailFile, originalPendingImageFiles]);

  // Warn user about unsaved changes when trying to leave
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'Bạn có thay đổi chưa lưu. Bạn có chắc chắn muốn rời khỏi trang?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Handle form changes
  const handleInputChange = async (field: keyof ProjectDetailFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate project code when category changes (only for new projects)
    if (field === 'category' && mode === 'add') {
      try {
        const generatedCode = await generateProjectCode(value);
        setFormData(prev => ({
          ...prev,
          projectId: generatedCode
        }));
      } catch (error) {
        console.error('Failed to generate project code:', error);
        // Fallback to manual input if generation fails
      }
    }
  };

  // Handle image selection - Just collect files, upload when saving
  const handleImageSelect = (file: File) => {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    // Add to pending files
    setPendingImageFiles(prev => [...prev, file]);
    
    // Show preview (create local URL)
    const localUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      projectImages: [...(prev.projectImages || []), localUrl]
    }));
  };

  // Handle image removal
  const handleImageRemove = async (index: number) => {
    // Add to deleting set
    setDeletingImages(prev => new Set(prev).add(index));
    
    try {
      const imageUrl = formData.projectImages?.[index];
      
      // Check if this is a local preview URL or S3 URL
      const isLocalUrl = imageUrl?.startsWith('blob:');
      
      if (isLocalUrl) {
        // Remove from pending files
        setPendingImageFiles(prev => prev.filter((_, i) => i !== index));
        // Revoke local URL
        URL.revokeObjectURL(imageUrl!);
      } else if (imageUrl) {
        // Delete from S3 for existing images
        try {
          await deleteFile(imageUrl);
        } catch (error) {
          console.warn('Failed to delete image from S3:', error);
        }
      }
      
      // Remove from display
      const newImages = (formData.projectImages || []).filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, projectImages: newImages }));
    } catch (error) {
      console.error('Error removing image:', error);
      alert('Lỗi khi xóa hình ảnh. Vui lòng thử lại.');
    } finally {
      // Remove from deleting set
      setDeletingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
  };

  // Handle thumbnail selection - Just collect file, upload when saving
  const handleThumbnailSelect = (file: File) => {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    // Store file for upload
    setThumbnailFile(file);
    
    // Show preview (create local URL)
    const localUrl = URL.createObjectURL(file);
    setFormData(prev => ({ 
      ...prev, 
      thumbnailImage: localUrl
    }));
  };

  // Handle tag management
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Discard all unsaved changes and revert to original state
  const handleDiscardChanges = () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy tất cả thay đổi chưa lưu?')) {
      if (originalFormData) {
        setFormData(originalFormData);
      }
      setThumbnailFile(originalThumbnailFile);
      setPendingImageFiles(originalPendingImageFiles);
      setHasUnsavedChanges(false);
      
      // Cleanup any blob URLs that were created
      formData.projectImages?.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    }
  };

  // Handle save - Upload images automatically when saving
  const handleSave = async () => {
    setSaving(true);
    try {
      console.log('Saving project with data:', formData);
      console.log('Thumbnail file:', thumbnailFile);
      console.log('Pending image files:', pendingImageFiles.length);
      
      if (mode === 'add') {
        // Create project with files - API will handle upload
        await createProject(formData, thumbnailFile, pendingImageFiles);
      } else if (projectId) {
        // Update project with files - API will handle upload
        await updateProject(projectId, formData, thumbnailFile, pendingImageFiles);
      }
      
      // Update original data after successful save
      setOriginalFormData(formData);
      setOriginalThumbnailFile(thumbnailFile);
      setOriginalPendingImageFiles(pendingImageFiles);
      setHasUnsavedChanges(false);
      
      // Cleanup local URLs
      formData.projectImages?.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
      
      navigate('/project-details');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Lỗi khi lưu dự án. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  // NOTE: File upload now handled by handleImageUpload and handleThumbnailUpload
  // which upload directly to S3 and return URLs

  if (loading) {
    return (
      <div className="project-editor-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="project-detail-editor">
      {/* Header */}
      <div className="editor-header">
        <div className="header-left">
          <button 
            className="btn-back"
            onClick={() => navigate('/project-details')}
          >
            <ArrowLeft size={20} />
            Quay lại
          </button>
          <h1>{mode === 'add' ? 'Thêm Dự Án Mới' : 'Chỉnh Sửa Dự Án'}</h1>
        </div>
        <div className="header-actions">
          <button 
            className="btn-preview"
            onClick={() => setShowPreview(true)}
          >
            <Eye size={18} />
            Xem trước
          </button>
          
          {hasUnsavedChanges && (
            <button 
              className="btn-discard"
              onClick={handleDiscardChanges}
              title="Hủy tất cả thay đổi chưa lưu"
            >
              <X size={18} />
              Hủy thay đổi
            </button>
          )}
          
          <button 
            className={`btn-save ${hasUnsavedChanges ? 'btn-save-unsaved' : ''}`}
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={18} />
            {saving ? 'Đang lưu...' : hasUnsavedChanges ? 'Lưu thay đổi' : 'Lưu'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="editor-content">
        {/* Left Panel - HTML Content Editor */}
        <div className="editor-left-panel">
          <div className="panel-header">
            <h3>Nội Dung Chi Tiết</h3>
            <p>Chỉnh sửa nội dung HTML của dự án</p>
          </div>
          
          <div className="html-editor-container">
            <div className="editor-controls">
              <h4>HTML Content Editor</h4>
              <div className="editor-buttons">
                <button 
                  className="editor-button editor-button-preview"
                  onClick={() => setShowPreview(true)}
                >
                  <Eye size={16} />
                  Preview HTML
                </button>
              </div>
            </div>
            
            <ReactQuill 
              ref={quillRef}
              value={formData.htmlContent} 
              onChange={(content) => handleInputChange('htmlContent', content)}
              placeholder="Nhập nội dung chi tiết dự án..."
              theme="snow"
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'color': [] }, { 'background': [] }],
                  [{ 'align': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link'],
                  ['clean']
                ]
              }}
              // formats={[
              //   'header',
              //   'bold', 'italic', 'underline', 'strike',
              //   'color', 'background',
              //   'align',
              //   'list', 'bullet',
              //   'link'
              // ]}
              style={{ minHeight: '400px' }}
            />
          </div>
        </div>

        {/* Right Panel - Project Information & Images */}
        <div className="editor-right-panel">
          {/* Project Images Section */}
          <div className="panel-section">
            <h3>Hình Ảnh Dự Án</h3>
            
            {/* Thumbnail */}
            <div className="form-group">
              <label>Ảnh Đại Diện</label>
              <div className="thumbnail-upload">
                {formData.thumbnailImage ? (
                  <div className="thumbnail-preview">
                    <img src={formData.thumbnailImage} alt="Thumbnail" />
                    <button 
                      className="remove-btn"
                      onClick={async () => {
                        const thumbUrl = formData.thumbnailImage;
                        
                        // Revoke local URL or delete from S3
                        if (thumbUrl?.startsWith('blob:')) {
                          URL.revokeObjectURL(thumbUrl);
                        } else if (thumbUrl) {
                          try {
                            await deleteFile(thumbUrl);
                          } catch (error) {
                            console.warn('Failed to delete thumbnail:', error);
                          }
                        }
                        
                        setThumbnailFile(null);
                        handleInputChange('thumbnailImage', undefined);
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="upload-placeholder">
                    <Upload size={24} />
                    <span>Chọn ảnh đại diện</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleThumbnailSelect(file);
                        }
                        e.target.value = '';
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Project Images Gallery */}
            <div className="form-group">
              <label>Thư Viện Ảnh ({formData.projectImages?.length || 0})</label>
              <div className="images-gallery">
                {(formData.projectImages || []).map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img src={image} alt={`Project ${index + 1}`} />
                    <div className="gallery-actions">
                      <button 
                        className="btn-remove"
                        onClick={() => handleImageRemove(index)}
                        disabled={deletingImages.has(index)}
                        title={deletingImages.has(index) ? "Đang xóa..." : "Xóa hình ảnh"}
                      >
                        {deletingImages.has(index) ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add Image Button */}
                <label className="add-image-btn">
                  <Plus size={24} />
                  <span>Thêm ảnh</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length === 0) {
                        return; // No files selected, do nothing
                      }
                      
                      let successCount = 0;
                      let errorCount = 0;
                      
                      for (const file of files) {
                        try {
                          handleImageSelect(file);
                          successCount++;
                        } catch (error) {
                          errorCount++;
                        }
                      }
                      
                      // Show success message
                      if (successCount > 0) {
                        alert(`Đã chọn ${successCount} ảnh! Nhấn Lưu để upload.`);
                      }
                      
                      // Reset input value to allow re-selecting the same files
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="panel-section">
            <h3>Thông Tin Dự Án</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Mã Dự Án *</label>
                <input
                  type="text"
                  value={formData.projectId}
                  onChange={(e) => handleInputChange('projectId', e.target.value)}
                  placeholder="VD: APARTMENT001"
                  readOnly={mode === 'add'}
                  className={mode === 'add' ? 'readonly-field' : ''}
                />
                {mode === 'add' && (
                  <small className="field-note">
                    Mã dự án sẽ được tự động tạo dựa trên danh mục
                  </small>
                )}
              </div>
              <div className="form-group">
                <label>Tên Dự Án *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Tên dự án"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Khách Hàng *</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="Tên khách hàng"
                />
              </div>
              <div className="form-group">
                <label>Diện Tích</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  placeholder="VD: 120m²"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Địa Chỉ</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Địa chỉ dự án"
                />
              </div>
              <div className="form-group">
                <label>Phong Cách</label>
                <select
                  value={formData.style}
                  onChange={(e) => handleInputChange('style', e.target.value)}
                >
                  <option value="Hiện đại">Hiện đại</option>
                  <option value="Cổ điển">Cổ điển</option>
                  <option value="Tối giản">Tối giản</option>
                  <option value="Sang trọng">Sang trọng</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ngày Khởi Công</label>
                <input
                  type="date"
                  value={formData.constructionDate}
                  onChange={(e) => handleInputChange('constructionDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Ngày Hoàn Thành</label>
                <input
                  type="date"
                  value={formData.completionDate}
                  onChange={(e) => handleInputChange('completionDate', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Trạng Thái</label>
                <select
                  value={formData.projectStatus}
                  onChange={(e) => handleInputChange('projectStatus', e.target.value)}
                >
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Đang thi công">Đang thi công</option>
                  <option value="Thiết kế">Thiết kế</option>
                </select>
              </div>
              <div className="form-group">
                <label>Danh Mục</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  <option value="appartment">Căn Hộ</option>
                  <option value="house-normal">Nhà Phố</option>
                  <option value="village">Biệt Thự</option>
                  <option value="house-business">Thương Mại</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Kiến Trúc Sư</label>
                <input
                  type="text"
                  value={formData.architectName}
                  onChange={(e) => handleInputChange('architectName', e.target.value)}
                  placeholder="Tên kiến trúc sư"
                />
              </div>
              <div className="form-group">
                <label>Nhà Thầu</label>
                <input
                  type="text"
                  value={formData.contractorName}
                  onChange={(e) => handleInputChange('contractorName', e.target.value)}
                  placeholder="Tên nhà thầu"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="form-group">
              <label>Tags</label>
              <div className="tags-input">
                <div className="tags-list">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="add-tag">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Thêm tag..."
                  />
                  <button onClick={handleAddTag}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="form-group">
              <div className="checkbox-group">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={formData.isOnHomePage}
                    onChange={(e) => handleInputChange('isOnHomePage', e.target.checked)}
                  />
                  Hiển thị trên trang chủ
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                  Kích hoạt
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      {showPreview && (
        <div className="preview-modal-overlay" onClick={() => setShowPreview(false)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Xem Trước Dự Án</h3>
              <button 
                className="modal-close-button"
                onClick={() => setShowPreview(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="project-preview">
                {formData.thumbnailImage && (
                  <img src={formData.thumbnailImage} alt="Preview" className="preview-thumbnail" />
                )}
                <div className="preview-info">
                  <h4>{formData.title || 'Tên dự án'}</h4>
                  <p><strong>Khách hàng:</strong> {formData.clientName || 'Chưa có'}</p>
                  <p><strong>Diện tích:</strong> {formData.area || 'Chưa có'}</p>
                  <p><strong>Địa chỉ:</strong> {formData.address || 'Chưa có'}</p>
                  <p><strong>Trạng thái:</strong> {formData.projectStatus}</p>
                  <div className="preview-content" dangerouslySetInnerHTML={{ __html: formData.htmlContent }} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-button modal-button-secondary"
                onClick={() => setShowPreview(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailEditor;
