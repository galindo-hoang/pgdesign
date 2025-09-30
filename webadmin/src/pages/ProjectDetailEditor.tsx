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
  Trash2
} from 'lucide-react';
import {
  getProjectById,
  createProject,
  updateProject,
  fileToBase64,
  validateImageFile,
  ProjectDetailFormData
} from '../services/projectDetailAdminService';
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
    projectImagesBlob: [],
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
      setFormData(projectData);
    } catch (error) {
      console.error('Error loading project:', error);
      // Handle error - maybe show error message or redirect
    } finally {
      setLoading(false);
    }
  };

  // Handle form changes
  const handleInputChange = (field: keyof ProjectDetailFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (base64Data: string, index?: number) => {
    if (index !== undefined) {
      // Replace existing image
      const newImages = [...formData.projectImagesBlob];
      newImages[index] = base64Data;
      setFormData(prev => ({ ...prev, projectImagesBlob: newImages }));
    } else {
      // Add new image
      setFormData(prev => ({
        ...prev,
        projectImagesBlob: [...prev.projectImagesBlob, base64Data]
      }));
    }
  };

  // Handle image removal
  const handleImageRemove = (index: number) => {
    const newImages = formData.projectImagesBlob.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, projectImagesBlob: newImages }));
  };

  // Handle thumbnail upload
  const handleThumbnailUpload = (base64Data: string) => {
    setFormData(prev => ({ ...prev, thumbnailImageBlob: base64Data }));
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

  // Handle save
  const handleSave = async () => {
    setSaving(true);
    try {
      if (mode === 'add') {
        await createProject(formData);
      } else if (projectId) {
        await updateProject(projectId, formData);
      }
      navigate('/project-details');
    } catch (error) {
      console.error('Error saving project:', error);
      // TODO: Show error message to user
    } finally {
      setSaving(false);
    }
  };

  // Handle file upload with validation
  const handleFileUpload = async (file: File): Promise<string> => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    return await fileToBase64(file);
  };

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
          <button 
            className="btn-save"
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={18} />
            {saving ? 'Đang lưu...' : 'Lưu'}
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
                  ['link', 'image'],
                  ['clean']
                ]
              }}
              formats={[
                'header',
                'bold', 'italic', 'underline', 'strike',
                'color', 'background',
                'align',
                'list', 'bullet',
                'link', 'image'
              ]}
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
                {formData.thumbnailImageBlob ? (
                  <div className="thumbnail-preview">
                    <img src={formData.thumbnailImageBlob} alt="Thumbnail" />
                    <button 
                      className="remove-btn"
                      onClick={() => handleInputChange('thumbnailImageBlob', undefined)}
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
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const base64 = await handleFileUpload(file);
                            handleThumbnailUpload(base64);
                            alert('Upload ảnh đại diện thành công!');
                          } catch (error) {
                            alert(`Lỗi upload: ${error}`);
                          }
                        }
                        // Reset input value to allow re-selecting the same file
                        e.target.value = '';
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Project Images Gallery */}
            <div className="form-group">
              <label>Thư Viện Ảnh ({formData.projectImagesBlob.length})</label>
              <div className="images-gallery">
                {formData.projectImagesBlob.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img src={image} alt={`Project ${index + 1}`} />
                    <div className="gallery-actions">
                      <button 
                        className="btn-remove"
                        onClick={() => handleImageRemove(index)}
                      >
                        <Trash2 size={16} />
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
                          const base64 = await handleFileUpload(file);
                          handleImageUpload(base64);
                          successCount++;
                        } catch (error) {
                          errorCount++;
                          alert(`Lỗi upload ${file.name}: ${error}`);
                        }
                      }
                      
                      // Show success message only if at least one file was uploaded
                      if (successCount > 0) {
                        alert(`Đã upload thành công ${successCount} ảnh!`);
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
                />
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
                {formData.thumbnailImageBlob && (
                  <img src={formData.thumbnailImageBlob} alt="Preview" className="preview-thumbnail" />
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
