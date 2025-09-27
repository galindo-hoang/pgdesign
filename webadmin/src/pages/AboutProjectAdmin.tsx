import React, { useState, useEffect } from 'react';
import { Save, Edit, Eye, RefreshCw, X } from 'lucide-react';
import SingleImageUpload from '../components/SingleImageUpload';
import './AboutProjectAdmin.css';

interface AboutProjectData {
  id: number;
  title: string;
  subtitle: string;
  backgroundImageBlob: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const AboutProjectAdmin: React.FC = () => {
  const [aboutProjectData, setAboutProjectData] = useState<AboutProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    backgroundImageBlob: null as string | null,
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1';

  useEffect(() => {
    loadAboutProjectData();
  }, []);

  const loadAboutProjectData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/projectpage/about-project`);
      const data: ApiResponse<AboutProjectData> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch about project data');
      }

      if (data.data) {
        setAboutProjectData(data.data);
        setFormData({
          title: data.data.title,
          subtitle: data.data.subtitle,
          backgroundImageBlob: data.data.backgroundImageBlob,
        });
      }
    } catch (err) {
      console.error('Error loading about project data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        backgroundImageBlob: formData.backgroundImageBlob,
      };

      let response;
      if (aboutProjectData?.id) {
        // Update existing
        response = await fetch(`${API_BASE_URL}/projectpage/about-project/${aboutProjectData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new
        response = await fetch(`${API_BASE_URL}/projectpage/about-project`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      const data: ApiResponse<AboutProjectData> = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save about project data');
      }

      if (data.data) {
        setAboutProjectData(data.data);
        setEditMode(false);
        alert('About project data saved successfully!');
      }
    } catch (err) {
      console.error('Error saving about project data:', err);
      setError(err instanceof Error ? err.message : 'Failed to save data');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (base64Data: string) => {
    setFormData(prev => ({
      ...prev,
      backgroundImageBlob: base64Data
    }));
  };


  const toggleEditMode = () => {
    if (editMode) {
      // Reset form data when canceling edit
      if (aboutProjectData) {
        setFormData({
          title: aboutProjectData.title,
          subtitle: aboutProjectData.subtitle,
          backgroundImageBlob: aboutProjectData.backgroundImageBlob,
        });
      }
    } else {
      // When entering edit mode, hide preview
      setShowPreview(false);
    }
    setEditMode(!editMode);
  };

  if (loading) {
    return (
      <div className="about-project-admin">
        <div className="loading-container">
          <RefreshCw className="loading-spinner" />
          <p>Loading about project data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="about-project-admin">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={loadAboutProjectData} className="retry-btn">
            <RefreshCw />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="about-project-admin">
      {/* Header */}
      <div className="admin-header">
        <div className="header-left">
          <h1>About Project Management</h1>
          <p>Manage the about project section for the project page</p>
        </div>
        <div className="header-actions">
          {!editMode && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`preview-btn ${showPreview ? 'active' : ''}`}
            >
              <Eye />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          )}
          <button
            onClick={toggleEditMode}
            className={`edit-btn ${editMode ? 'active' : ''}`}
          >
            {editMode ? <X /> : <Edit />}
            {editMode ? 'Cancel' : 'Edit Mode'}
          </button>
          {editMode && (
            <button
              onClick={handleSave}
              className="save-btn"
              disabled={saving}
            >
              <Save />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {editMode ? (
          <div className="edit-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="form-input"
                placeholder="Enter title (e.g., Dự án)"
              />
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                className="form-input"
                placeholder="Enter subtitle (e.g., PG DESIGN)"
              />
            </div>

            <div className="form-group">
              <label>Background Image</label>
              <SingleImageUpload
                onImageUpload={handleImageUpload}
                onImageRemove={() => {}} 
                currentImage={formData.backgroundImageBlob}
                maxSizeKB={2048}
                acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
              />
            </div>
          </div>
        ) : (
          <div className="view-content">
            <div className="content-section">
              <h3>Current About Project Data</h3>
              <div className="data-display">
                <div className="data-item">
                  <label>Title:</label>
                  <span>{aboutProjectData?.title || 'Not set'}</span>
                </div>
                <div className="data-item">
                  <label>Subtitle:</label>
                  <span>{aboutProjectData?.subtitle || 'Not set'}</span>
                </div>
                <div className="data-item">
                  <label>Background Image:</label>
                  {aboutProjectData?.backgroundImageBlob ? (
                    <div className="image-display-readonly">
                      <img 
                        src={aboutProjectData.backgroundImageBlob} 
                        alt="Background" 
                        style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #e5e7eb' }}
                      />
                    </div>
                  ) : (
                    <span>No image uploaded</span>
                  )}
                </div>
                <div className="data-item">
                  <label>Status:</label>
                  <span className={`status ${aboutProjectData?.isActive ? 'active' : 'inactive'}`}>
                    {aboutProjectData?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {aboutProjectData?.updatedAt && (
                  <div className="data-item">
                    <label>Last Updated:</label>
                    <span>{new Date(aboutProjectData.updatedAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Preview Section - Only show when not in edit mode */}
        {showPreview && !editMode && (
          <div className="preview-section">
            <h3>Preview</h3>
            <div 
              className="about-project-preview"
              style={{
                backgroundImage: aboutProjectData?.backgroundImageBlob ? `url(${aboutProjectData.backgroundImageBlob})` : 'none',
                backgroundColor: aboutProjectData?.backgroundImageBlob ? 'transparent' : '#f0f0f0',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '2rem',
                color: 'white',
                position: 'relative'
              }}
            >
              <div style={{ 
                background: 'rgba(0,0,0,0.5)', 
                padding: '2rem', 
                borderRadius: '8px',
                maxWidth: '500px'
              }}>
                <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>
                  {aboutProjectData?.title || 'Title'}
                </h2>
                {aboutProjectData?.subtitle && (
                  <h3 style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'normal' }}>
                    {aboutProjectData.subtitle}
                  </h3>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Live Preview in Edit Mode */}
        {editMode && (
          <div className="edit-preview-section">
            <h3>Live Preview</h3>
            <div 
              className="about-project-preview"
              style={{
                backgroundImage: formData.backgroundImageBlob ? `url(${formData.backgroundImageBlob})` : 'none',
                backgroundColor: formData.backgroundImageBlob ? 'transparent' : '#f0f0f0',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '2rem',
                color: 'white',
                position: 'relative',
                marginTop: '2rem',
                border: '2px dashed #007bff',
                borderRadius: '8px'
              }}
            >
              <div style={{ 
                background: 'rgba(0,0,0,0.5)', 
                padding: '2rem', 
                borderRadius: '8px',
                maxWidth: '500px'
              }}>
                <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>
                  {formData.title || 'Title'}
                </h2>
                {formData.subtitle && (
                  <h3 style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'normal' }}>
                    {formData.subtitle}
                  </h3>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutProjectAdmin;
