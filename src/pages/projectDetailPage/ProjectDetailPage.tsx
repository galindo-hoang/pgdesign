import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetailPage.css';

interface ProjectDetail {
  id: string;
  title: string;
  thumbnailImage: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description?: string;
  category: string;
  subCategory: string;
  style?: string;
  htmlContent?: string; // Admin-editable HTML content
}

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editableContent, setEditableContent] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Simulate loading project data
    // In a real app, you would fetch this from your API
    const loadProject = async () => {
      try {
        // Mock project data - replace with your actual data fetching logic
        const mockProject: ProjectDetail = {
          id: projectId || '',
          title: 'Blank Project Page',
          thumbnailImage: '/path/to/image.jpg',
          clientName: 'Admin',
          area: '',
          constructionDate: '',
          address: '',
          description: '',
          category: '',
          subCategory: '',
          style: '',
          htmlContent: '' // Start completely blank
        };
        
        setProject(mockProject);
        setEditableContent(mockProject.htmlContent || '');
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading project:', error);
        setIsLoading(false);
      }
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const handleSaveContent = () => {
    if (project) {
      // Here you would save the edited content to your backend/database
      console.log('Saving content:', editableContent);
      setProject({ ...project, htmlContent: editableContent });
      setIsAdminMode(false);
      // Add your API call to save content here
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleImageUpload = (file: File) => {
    // Create a temporary URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);
    
    // Insert image HTML at cursor position or append to content
    const imageHtml = `<img src="${imageUrl}" alt="${file.name}" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
    
    // Add to the textarea content
    setEditableContent(prev => prev + '\n' + imageHtml);
    
    // In a real app, you would upload to your server here
    console.log('Image uploaded:', file.name);
    // Example API call:
    // uploadImageToServer(file).then(url => {
    //   const serverImageHtml = `<img src="${url}" alt="${file.name}" style="max-width: 100%; height: auto;" />`;
    //   setEditableContent(prev => prev.replace(imageUrl, url));
    // });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      handleImageUpload(file);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      handleImageUpload(file);
    });
    
    // Reset input
    e.target.value = '';
  };

  const insertImagePlaceholder = () => {
    const imagePlaceholder = `<img src="https://via.placeholder.com/600x400/f0f0f0/666666?text=Your+Image+Here" alt="Replace with your image URL" style="max-width: 100%; height: auto; margin: 10px 0;" />`;
    setEditableContent(prev => prev + '\n' + imagePlaceholder);
  };

  const insertHtmlTemplate = () => {
    const template = `<div style="padding: 40px; max-width: 1200px; margin: 0 auto;">
  <h1 style="color: #2F674B; text-align: center; margin-bottom: 30px;">Project Title</h1>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px;">
    <div>
      <img src="https://via.placeholder.com/500x300" alt="Project Image" style="width: 100%; border-radius: 8px;" />
    </div>
    <div>
      <h2 style="color: #2F674B;">Project Details</h2>
      <p><strong>Client:</strong> Client Name</p>
      <p><strong>Area:</strong> 150 m²</p>
      <p><strong>Year:</strong> 2024</p>
      <p><strong>Location:</strong> Address Here</p>
      <p style="margin-top: 20px;">Project description and details go here...</p>
    </div>
  </div>
  
  <h2 style="color: #2F674B; text-align: center;">Project Gallery</h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
    <img src="https://via.placeholder.com/400x300" alt="Image 1" style="width: 100%; border-radius: 8px;" />
    <img src="https://via.placeholder.com/400x300" alt="Image 2" style="width: 100%; border-radius: 8px;" />
    <img src="https://via.placeholder.com/400x300" alt="Image 3" style="width: 100%; border-radius: 8px;" />
  </div>
</div>`;
    setEditableContent(template);
  };

  if (isLoading) {
    return (
      <div className="project-detail-page">
        <div className="loading-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="error-container">
          <h2>Project not found</h2>
          <button onClick={handleGoBack} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Floating Admin Button */}
      <div className="floating-admin-controls">
        <button 
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`floating-admin-toggle ${isAdminMode ? 'active' : ''}`}
          title={isAdminMode ? 'Exit Admin Mode' : 'Enter Admin Mode'}
        >
          {isAdminMode ? '✕' : '✎'}
        </button>
      </div>

      {/* Main content area - completely blank white canvas */}
      <div className="blank-content-area">
        {isAdminMode ? (
          <div className="admin-edit-overlay">
            <div className="admin-edit-container">
              <div className="admin-edit-header">
                <h3>Edit Page Content</h3>
                              <div className="admin-edit-actions">
                <div className="image-upload-controls">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="upload-button">
                    📁 Upload Images
                  </label>
                  <button onClick={insertImagePlaceholder} className="placeholder-button">
                    🖼️ Image Placeholder
                  </button>
                  <button onClick={insertHtmlTemplate} className="template-button">
                    📋 Page Template
                  </button>
                </div>
                <div className="save-cancel-controls">
                  <button onClick={handleSaveContent} className="save-button">
                    Save Changes
                  </button>
                  <button 
                    onClick={() => {
                      setEditableContent(project.htmlContent || '');
                      setIsAdminMode(false);
                    }}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              </div>
                          <div 
              className={`editor-container ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <textarea
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                className="html-editor"
                placeholder="Enter HTML content here to build this page...&#10;&#10;💡 Tips:&#10;• Drag & drop images directly here&#10;• Use Upload Images button&#10;• Write HTML: <img src='URL' alt='description'>&#10;• Add styles: style='width: 100%; border-radius: 8px;'"
                rows={25}
              />
              {isDragging && (
                <div className="drag-overlay">
                  <div className="drag-message">
                    📁 Drop images here to upload
                  </div>
                </div>
              )}
            </div>
                          <div className="editor-help">
              <p><strong>💡 HTML Editor Help:</strong></p>
              <p>• Drag & drop images directly into the editor</p>
              <p>• Use "Upload Images" button to select multiple files</p>
              <p>• Write HTML tags: <code>&lt;h1&gt;Title&lt;/h1&gt;</code>, <code>&lt;p&gt;Text&lt;/p&gt;</code></p>
              <p>• Image example: <code>&lt;img src="URL" alt="description" style="margin: 20px;"&gt;</code></p>
            </div>
            </div>
          </div>
        ) : (
          <div className="blank-canvas">
            {project.htmlContent ? (
              <div 
                className="rendered-content"
                dangerouslySetInnerHTML={{ __html: project.htmlContent }}
              />
            ) : (
              <div className="completely-blank">
                {/* Completely empty - no placeholder text */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage; 