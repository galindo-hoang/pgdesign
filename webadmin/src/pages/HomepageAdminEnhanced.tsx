import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Edit, 
  Eye, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Monitor, 
  X, 
  Settings, 
  Image, 
  BarChart3, 
  Target, 
  Workflow, 
  Camera, 
  Star, 
  MessageSquare,
  Upload,
  AlertCircle
} from 'lucide-react';
import homepageAdminService, { 
  HomepageData, 
  HeroData, 
  AboutData, 
  ImageSlideData, 
  StatsData, 
  SolutionData,
  WorkflowData,
  ProjectDiaryData,
  TestimonialData,
  ConsultationFormData
} from '../services/homepageAdminService';
import MultipleImageUpload, { ImageData } from '../components/MultipleImageUpload';
import './HomepageAdmin.css';

interface FormStates {
  hero: Partial<HeroData>;
  about: Partial<AboutData>;
  imageSlides: ImageSlideData[];
  stats: Partial<StatsData>;
  solution: Partial<SolutionData>;
  workflow: Partial<WorkflowData>;
  projectDiary: Partial<ProjectDiaryData>;
  testimonials: Partial<TestimonialData>;
  consultationForm: Partial<ConsultationFormData>;
}

const HomepageAdminEnhanced: React.FC = () => {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [editMode, setEditMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  // Form states for editing
  const [formStates, setFormStates] = useState<FormStates>({
    hero: {},
    about: {},
    imageSlides: [],
    stats: {},
    solution: {},
    workflow: {},
    projectDiary: {},
    testimonials: {},
    consultationForm: {}
  });

  // Image management states
  const [heroImages, setHeroImages] = useState<ImageData[]>([]);
  const [projectDiaryImages, setProjectDiaryImages] = useState<ImageData[]>([]);
  const [imageSliderImages, setImageSliderImages] = useState<ImageData[]>([]);

  useEffect(() => {
    loadHomepageData();
  }, []);

  const loadHomepageData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await homepageAdminService.getAllHomepageData();
      setHomepageData(data);
      
      // Initialize form data
      setFormStates({
        hero: { ...data.hero },
        about: { ...data.about },
        imageSlides: [...data.imageSlider],
        stats: { ...data.stats },
        solution: { ...data.solution },
        workflow: { ...data.workflow },
        projectDiary: { ...data.projectDiary },
        testimonials: { ...data.testimonials },
        consultationForm: { ...data.consultationForm }
      });

      // Initialize image states
      setHeroImages(data.hero.images.map((url, index) => ({
        id: `hero-${index}`,
        url,
        title: `Hero Image ${index + 1}`,
        alt: `Hero Image ${index + 1}`,
        size: 'Unknown',
        type: 'image/jpeg'
      })));

      setProjectDiaryImages(data.projectDiary.images.map((url, index) => ({
        id: `diary-${index}`,
        url,
        title: `Project Image ${index + 1}`,
        alt: `Project Image ${index + 1}`,
        size: 'Unknown',
        type: 'image/jpeg'
      })));

      setImageSliderImages(data.imageSlider.map((slide, index) => ({
        id: `slider-${slide.id}`,
        url: slide.imageUrl,
        title: slide.title,
        alt: slide.subtitle,
        size: 'Unknown',
        type: 'image/jpeg'
      })));
      
    } catch (err) {
      console.error('Error loading homepage data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const updateFormState = (section: keyof FormStates, data: any) => {
    setFormStates(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleImageUpload = async (files: File[], section: string): Promise<string[]> => {
    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      const uploadPromises = files.map(async (file, index) => {
        const progressKey = `${section}-${index}`;
        setUploadProgress(prev => ({ ...prev, [progressKey]: 0 }));

        const result = await homepageAdminService.uploadFile(file, section);
        
        if (result.success && result.data) {
          setUploadProgress(prev => ({ ...prev, [progressKey]: 100 }));
          return result.data.url;
        }
        throw new Error(result.error || 'Upload failed');
      });

      const results = await Promise.all(uploadPromises);
      uploadedUrls.push(...results);
      
      // Clear progress
      setTimeout(() => setUploadProgress({}), 2000);
      
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setUploading(false);
    }

    return uploadedUrls;
  };

  const handleHeroImagesChange = async (images: ImageData[]) => {
    setHeroImages(images);
    
    // Handle file uploads
    const newFiles = images.filter(img => img.file);
    if (newFiles.length > 0) {
      try {
        const files = newFiles.map(img => img.file!);
        const uploadedUrls = await handleImageUpload(files, 'hero');
        
        // Update URLs for uploaded images
        const updatedImages = images.map(img => {
          if (img.file) {
            const index = newFiles.findIndex(f => f.file === img.file);
            return { ...img, url: uploadedUrls[index], file: undefined };
          }
          return img;
        });
        
        setHeroImages(updatedImages);
        updateFormState('hero', { images: updatedImages.map(img => img.url) });
      } catch (error) {
        console.error('Hero images upload error:', error);
      }
    } else {
      updateFormState('hero', { images: images.map(img => img.url) });
    }
  };

  const handleProjectDiaryImagesChange = async (images: ImageData[]) => {
    setProjectDiaryImages(images);
    
    // Handle file uploads
    const newFiles = images.filter(img => img.file);
    if (newFiles.length > 0) {
      try {
        const files = newFiles.map(img => img.file!);
        const uploadedUrls = await handleImageUpload(files, 'projectDiary');
        
        // Update URLs for uploaded images
        const updatedImages = images.map(img => {
          if (img.file) {
            const index = newFiles.findIndex(f => f.file === img.file);
            return { ...img, url: uploadedUrls[index], file: undefined };
          }
          return img;
        });
        
        setProjectDiaryImages(updatedImages);
        updateFormState('projectDiary', { images: updatedImages.map(img => img.url) });
      } catch (error) {
        console.error('Project diary images upload error:', error);
      }
    } else {
      updateFormState('projectDiary', { images: images.map(img => img.url) });
    }
  };

  const handleSaveSection = async (section: keyof FormStates) => {
    if (!homepageData) return;
    
    try {
      setSaving(true);
      let updatedData: any;
      
      switch (section) {
        case 'hero':
          if (homepageData.hero.id) {
            updatedData = await homepageAdminService.updateHeroData(homepageData.hero.id, formStates.hero);
            setHomepageData(prev => prev ? { ...prev, hero: updatedData } : null);
          }
          break;
          
        case 'about':
          if (homepageData.about.id) {
            updatedData = await homepageAdminService.updateAboutData(homepageData.about.id, formStates.about);
            setHomepageData(prev => prev ? { ...prev, about: updatedData } : null);
          }
          break;
          
        case 'stats':
          if (homepageData.stats.id) {
            updatedData = await homepageAdminService.updateStatsData(homepageData.stats.id, formStates.stats);
            setHomepageData(prev => prev ? { ...prev, stats: updatedData } : null);
          }
          break;
          
        case 'solution':
          if (homepageData.solution.id) {
            updatedData = await homepageAdminService.updateSolutionData(homepageData.solution.id, formStates.solution);
            setHomepageData(prev => prev ? { ...prev, solution: updatedData } : null);
          }
          break;
          
        case 'workflow':
          if (homepageData.workflow.id) {
            updatedData = await homepageAdminService.updateWorkflowData(homepageData.workflow.id, formStates.workflow);
            setHomepageData(prev => prev ? { ...prev, workflow: updatedData } : null);
          }
          break;
          
        case 'projectDiary':
          if (homepageData.projectDiary.id) {
            updatedData = await homepageAdminService.updateProjectDiaryData(homepageData.projectDiary.id, formStates.projectDiary);
            setHomepageData(prev => prev ? { ...prev, projectDiary: updatedData } : null);
          }
          break;
          
        case 'testimonials':
          if (homepageData.testimonials.id) {
            updatedData = await homepageAdminService.updateTestimonialData(homepageData.testimonials.id, formStates.testimonials);
            setHomepageData(prev => prev ? { ...prev, testimonials: updatedData } : null);
          }
          break;
          
        case 'consultationForm':
          if (homepageData.consultationForm.id) {
            updatedData = await homepageAdminService.updateConsultationFormData(homepageData.consultationForm.id, formStates.consultationForm);
            setHomepageData(prev => prev ? { ...prev, consultationForm: updatedData } : null);
          }
          break;
      }
      
      alert(`${section} section updated successfully!`);
      
    } catch (err) {
      console.error(`Error updating ${section}:`, err);
      alert(`Failed to update ${section} section`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImageSlide = async (slideId: number) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return;
    
    try {
      await homepageAdminService.deleteImageSlide(slideId);
      const updatedSlides = formStates.imageSlides.filter(slide => slide.id !== slideId);
      setFormStates(prev => ({ ...prev, imageSlides: updatedSlides }));
      
      // Update image slider images state
      setImageSliderImages(prev => prev.filter(img => img.id !== `slider-${slideId}`));
      
      alert('Image slide deleted successfully!');
    } catch (err) {
      console.error('Error deleting slide:', err);
      alert('Failed to delete image slide');
    }
  };

  const handleBulkImageUpload = async (files: File[], section: string) => {
    try {
      setUploading(true);
      const uploadedUrls = await handleImageUpload(files, section);
      
      // Update the appropriate section based on the target
      switch (section) {
        case 'hero':
          const newHeroImages = uploadedUrls.map((url, index) => ({
            id: `hero-new-${Date.now()}-${index}`,
            url,
            title: `Hero Image ${heroImages.length + index + 1}`,
            alt: `Hero Image ${heroImages.length + index + 1}`,
            size: 'Unknown',
            type: 'image/jpeg'
          }));
          setHeroImages(prev => [...prev, ...newHeroImages]);
          updateFormState('hero', { images: [...heroImages, ...newHeroImages].map(img => img.url) });
          break;
          
        case 'projectDiary':
          const newDiaryImages = uploadedUrls.map((url, index) => ({
            id: `diary-new-${Date.now()}-${index}`,
            url,
            title: `Project Image ${projectDiaryImages.length + index + 1}`,
            alt: `Project Image ${projectDiaryImages.length + index + 1}`,
            size: 'Unknown',
            type: 'image/jpeg'
          }));
          setProjectDiaryImages(prev => [...prev, ...newDiaryImages]);
          updateFormState('projectDiary', { images: [...projectDiaryImages, ...newDiaryImages].map(img => img.url) });
          break;
      }
      
      alert(`Successfully uploaded ${uploadedUrls.length} images to ${section} section!`);
    } catch (error) {
      console.error('Bulk upload error:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const PreviewModal = () => {
    if (!showPreview || !homepageData) return null;

    return (
      <div className="preview-modal-overlay">
        <div className="preview-modal">
          <div className="preview-header">
            <h2>Homepage Preview</h2>
            <button onClick={() => setShowPreview(false)} className="close-btn">
              <X />
            </button>
          </div>
          <div className="preview-content">
            <iframe 
              src="http://localhost:3000/" 
              width="100%" 
              height="800px"
              title="Homepage Preview"
            />
          </div>
        </div>
      </div>
    );
  };

  const LoadingOverlay = () => (
    <div className="loading-overlay">
      <div className="loading-content">
        <RefreshCw className="loading-spinner" />
        <p>Loading homepage data...</p>
      </div>
    </div>
  );

  const ErrorAlert = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
    <div className="error-alert">
      <AlertCircle className="error-icon" />
      <div>
        <h3>Error Loading Data</h3>
        <p>{message}</p>
      </div>
      <button onClick={onRetry} className="retry-btn">
        <RefreshCw />
        Retry
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="homepage-admin">
        <LoadingOverlay />
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage-admin">
        <ErrorAlert message={error} onRetry={loadHomepageData} />
      </div>
    );
  }

  if (!homepageData) {
    return (
      <div className="homepage-admin">
        <div className="no-data-container">
          <p>No homepage data available</p>
          <button onClick={loadHomepageData} className="retry-btn">
            <RefreshCw />
            Reload
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { key: 'hero', label: 'Hero Section', icon: <Eye />, color: '#3b82f6' },
    { key: 'about', label: 'About Section', icon: <Edit />, color: '#10b981' },
    { key: 'imageSlider', label: 'Image Slider', icon: <Image />, color: '#f59e0b' },
    { key: 'stats', label: 'Statistics', icon: <BarChart3 />, color: '#ef4444' },
    { key: 'solution', label: 'Solutions', icon: <Target />, color: '#8b5cf6' },
    { key: 'workflow', label: 'Workflow', icon: <Workflow />, color: '#06b6d4' },
    { key: 'projectDiary', label: 'Project Diary', icon: <Camera />, color: '#f97316' },
    { key: 'testimonials', label: 'Testimonials', icon: <Star />, color: '#eab308' },
    { key: 'consultationForm', label: 'Contact Form', icon: <MessageSquare />, color: '#84cc16' },
  ];

  return (
    <div className="homepage-admin">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Homepage Management</h1>
          <p>Manage all content sections and images of the homepage</p>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => setShowPreview(true)} 
            className="preview-btn"
          >
            <Monitor />
            Preview Homepage
          </button>
          <button 
            onClick={loadHomepageData} 
            className="refresh-btn"
            disabled={loading}
          >
            <RefreshCw className={loading ? 'spinning' : ''} />
            Refresh
          </button>
          <button 
            onClick={() => setEditMode(!editMode)} 
            className={`edit-btn ${editMode ? 'active' : ''}`}
          >
            <Edit />
            {editMode ? 'View Mode' : 'Edit Mode'}
          </button>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="upload-progress">
          <div className="progress-content">
            <Upload className="upload-spinner" />
            <p>Uploading images...</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="section-nav">
        {sections.map(section => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`nav-btn ${activeSection === section.key ? 'active' : ''}`}
            style={activeSection === section.key ? { borderColor: section.color, color: section.color } : {}}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="content-area">
        {/* Hero Section */}
        {activeSection === 'hero' && (
          <div className="section-content">
            <div className="section-header">
              <h2>Hero Section</h2>
              {editMode && (
                <button 
                  onClick={() => handleSaveSection('hero')} 
                  className="save-btn"
                  disabled={saving}
                >
                  <Save />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </div>
            
            {editMode ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formStates.hero.title || ''}
                    onChange={(e) => updateFormState('hero', { title: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Subtitle</label>
                  <textarea
                    value={formStates.hero.subtitle || ''}
                    onChange={(e) => updateFormState('hero', { subtitle: e.target.value })}
                    className="form-textarea"
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>Hero Images</label>
                  <MultipleImageUpload
                    images={heroImages}
                    onImagesChange={handleHeroImagesChange}
                    maxFiles={10}
                    allowedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                    maxSize={5}
                    showPreview={true}
                    enableCrop={false}
                    multiple={true}
                    className="hero-image-upload"
                  />
                </div>
              </div>
            ) : (
              <div className="view-content">
                <div className="content-card">
                  <h3>Title</h3>
                  <p>{homepageData.hero.title}</p>
                </div>
                <div className="content-card">
                  <h3>Subtitle</h3>
                  <p>{homepageData.hero.subtitle}</p>
                </div>
                <div className="content-card">
                  <h3>Images ({heroImages.length})</h3>
                  <div className="image-grid">
                    {heroImages.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image.url} alt={image.alt} />
                        <div className="image-info">
                          <p>{image.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <div className="section-content">
            <div className="section-header">
              <h2>About Section</h2>
              {editMode && (
                <button 
                  onClick={() => handleSaveSection('about')} 
                  className="save-btn"
                  disabled={saving}
                >
                  <Save />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </div>
            
            {editMode ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Headline</label>
                  <input
                    type="text"
                    value={formStates.about.headline || ''}
                    onChange={(e) => updateFormState('about', { headline: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Sub Headline</label>
                  <input
                    type="text"
                    value={formStates.about.subHeadline || ''}
                    onChange={(e) => updateFormState('about', { subHeadline: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={formStates.about.description || ''}
                    onChange={(e) => updateFormState('about', { description: e.target.value })}
                    className="form-textarea"
                    rows={5}
                  />
                </div>
              </div>
            ) : (
              <div className="view-content">
                <div className="content-card">
                  <h3>Headline</h3>
                  <p>{homepageData.about.headline}</p>
                </div>
                <div className="content-card">
                  <h3>Sub Headline</h3>
                  <p>{homepageData.about.subHeadline}</p>
                </div>
                <div className="content-card">
                  <h3>Description</h3>
                  <p>{homepageData.about.description}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project Diary Section */}
        {activeSection === 'projectDiary' && (
          <div className="section-content">
            <div className="section-header">
              <h2>Project Diary Section</h2>
              {editMode && (
                <button 
                  onClick={() => handleSaveSection('projectDiary')} 
                  className="save-btn"
                  disabled={saving}
                >
                  <Save />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </div>
            
            {editMode ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formStates.projectDiary.title || ''}
                    onChange={(e) => updateFormState('projectDiary', { title: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Project Images</label>
                  <MultipleImageUpload
                    images={projectDiaryImages}
                    onImagesChange={handleProjectDiaryImagesChange}
                    maxFiles={20}
                    allowedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
                    maxSize={5}
                    showPreview={true}
                    enableCrop={false}
                    multiple={true}
                    className="project-diary-image-upload"
                  />
                </div>
              </div>
            ) : (
              <div className="view-content">
                <div className="content-card">
                  <h3>Title</h3>
                  <p>{homepageData.projectDiary.title}</p>
                </div>
                <div className="content-card">
                  <h3>Images ({projectDiaryImages.length})</h3>
                  <div className="image-grid">
                    {projectDiaryImages.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image.url} alt={image.alt} />
                        <div className="image-info">
                          <p>{image.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Add other sections as needed... */}
      </div>

      {/* Preview Modal */}
      <PreviewModal />
    </div>
  );
};

export default HomepageAdminEnhanced; 