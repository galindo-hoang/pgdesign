import React, { useState, useEffect } from 'react';
import { Save, Edit, Eye, RefreshCw, Plus, Trash2 } from 'lucide-react';
import homepageAdminService, { 
  HomepageData, 
  HeroData, 
  AboutData, 
  ImageSlideData, 
  StatsData, 
  SolutionData 
} from '../services/homepageAdminService';
import './HomepageAdmin.css';

const HomepageAdmin: React.FC = () => {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [editMode, setEditMode] = useState(false);

  // Form states for editing
  const [heroForm, setHeroForm] = useState<Partial<HeroData>>({});
  const [aboutForm, setAboutForm] = useState<Partial<AboutData>>({});
  const [imageSlides, setImageSlides] = useState<ImageSlideData[]>([]);

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
      setHeroForm(data.hero);
      setAboutForm(data.about);
      setImageSlides(data.imageSlider);
      
    } catch (err) {
      console.error('Error loading homepage data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHero = async () => {
    if (!homepageData?.hero.id || !heroForm) return;
    
    try {
      setSaving(true);
      const updatedHero = await homepageAdminService.updateHeroData(
        homepageData.hero.id, 
        heroForm
      );
      
      setHomepageData(prev => prev ? { ...prev, hero: updatedHero } : null);
      setEditMode(false);
      alert('Hero section updated successfully!');
      
    } catch (err) {
      console.error('Error updating hero:', err);
      alert('Failed to update hero section');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAbout = async () => {
    if (!homepageData?.about.id || !aboutForm) return;
    
    try {
      setSaving(true);
      const updatedAbout = await homepageAdminService.updateAboutData(
        homepageData.about.id, 
        aboutForm
      );
      
      setHomepageData(prev => prev ? { ...prev, about: updatedAbout } : null);
      setEditMode(false);
      alert('About section updated successfully!');
      
    } catch (err) {
      console.error('Error updating about:', err);
      alert('Failed to update about section');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImageSlide = async (slideId: number) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return;
    
    try {
      await homepageAdminService.deleteImageSlide(slideId);
      const updatedSlides = imageSlides.filter(slide => slide.id !== slideId);
      setImageSlides(updatedSlides);
      alert('Image slide deleted successfully!');
    } catch (err) {
      console.error('Error deleting slide:', err);
      alert('Failed to delete image slide');
    }
  };

  if (loading) {
    return (
      <div className="homepage-admin">
        <div className="loading-container">
          <RefreshCw className="loading-spinner" />
          <p>Loading homepage data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage-admin">
        <div className="error-container">
          <h2>Error Loading Data</h2>
          <p>{error}</p>
          <button onClick={loadHomepageData} className="retry-btn">
            <RefreshCw />
            Retry
          </button>
        </div>
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
    { key: 'hero', label: 'Hero Section', icon: <Eye /> },
    { key: 'about', label: 'About Section', icon: <Edit /> },
    { key: 'imageSlider', label: 'Image Slider', icon: <Plus /> },
    { key: 'stats', label: 'Stats Section', icon: <Eye /> },
    { key: 'solutions', label: 'Solutions', icon: <Eye /> },
    { key: 'workflow', label: 'Workflow', icon: <Eye /> },
  ];

  return (
    <div className="homepage-admin">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Homepage Management</h1>
          <p>Manage all content sections of the homepage</p>
        </div>
        <div className="header-actions">
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

      {/* Navigation */}
      <div className="section-nav">
        {sections.map(section => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`nav-btn ${activeSection === section.key ? 'active' : ''}`}
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
                  onClick={handleSaveHero} 
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
                    value={heroForm.title || ''}
                    onChange={(e) => setHeroForm(prev => ({ ...prev, title: e.target.value }))}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Subtitle</label>
                  <textarea
                    value={heroForm.subtitle || ''}
                    onChange={(e) => setHeroForm(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="form-textarea"
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>Images (one URL per line)</label>
                  <textarea
                    value={heroForm.images?.join('\n') || ''}
                    onChange={(e) => setHeroForm(prev => ({ 
                      ...prev, 
                      images: e.target.value.split('\n').filter(url => url.trim()) 
                    }))}
                    className="form-textarea"
                    rows={5}
                    placeholder="Enter image URLs, one per line"
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
                  <h3>Images ({homepageData.hero.images.length})</h3>
                  <div className="image-grid">
                    {homepageData.hero.images.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image} alt={`Hero ${index + 1}`} />
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
                  onClick={handleSaveAbout} 
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
                    value={aboutForm.headline || ''}
                    onChange={(e) => setAboutForm(prev => ({ ...prev, headline: e.target.value }))}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Sub Headline</label>
                  <input
                    type="text"
                    value={aboutForm.subHeadline || ''}
                    onChange={(e) => setAboutForm(prev => ({ ...prev, subHeadline: e.target.value }))}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={aboutForm.description || ''}
                    onChange={(e) => setAboutForm(prev => ({ ...prev, description: e.target.value }))}
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

        {/* Image Slider Section */}
        {activeSection === 'imageSlider' && (
          <div className="section-content">
            <div className="section-header">
              <h2>Image Slider</h2>
              <div className="header-actions">
                <button className="add-btn">
                  <Plus />
                  Add Slide
                </button>
              </div>
            </div>
            
            <div className="slides-grid">
              {imageSlides.map((slide) => (
                <div key={slide.id} className="slide-card">
                  <div className="slide-image">
                    <img src={slide.imageUrl} alt={slide.title} />
                  </div>
                  <div className="slide-info">
                    <h4>{slide.title}</h4>
                    <p>{slide.subtitle}</p>
                    <span className="slide-size">{slide.size}</span>
                  </div>
                  <div className="slide-actions">
                    <button className="edit-slide-btn">
                      <Edit />
                    </button>
                    <button 
                      className="delete-slide-btn"
                      onClick={() => slide.id && handleDeleteImageSlide(slide.id)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other sections - View only for now */}
        {(activeSection === 'stats' || activeSection === 'solutions' || activeSection === 'workflow') && (
          <div className="section-content">
            <div className="section-header">
              <h2>
                {activeSection === 'stats' && 'Statistics Section'}
                {activeSection === 'solutions' && 'Solutions Section'}
                {activeSection === 'workflow' && 'Workflow Section'}
              </h2>
            </div>
            
            <div className="view-content">
              <div className="content-card">
                <p>This section is view-only for now. Full editing capabilities coming soon.</p>
                <pre className="data-preview">
                  {JSON.stringify(
                    activeSection === 'stats' ? homepageData.stats :
                    activeSection === 'solutions' ? homepageData.solution :
                    homepageData.workflow,
                    null, 2
                  )}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomepageAdmin; 