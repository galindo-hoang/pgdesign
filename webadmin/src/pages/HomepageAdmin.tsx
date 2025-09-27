import React, { useState, useEffect } from "react";
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
} from "lucide-react";
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
  ConsultationFormData,
} from "../services/homepageAdminService";
import MultipleImageUpload, { ImageData } from "../components/MultipleImageUpload";
import "./HomepageAdmin.css";

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

const HomepageAdmin: React.FC = () => {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [editMode, setEditMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);

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
    consultationForm: {},
  });

  // Image management states
  const [heroImages, setHeroImages] = useState<ImageData[]>([]);
  const [projectDiaryImages, setProjectDiaryImages] = useState<ImageData[]>([]);

  useEffect(() => {
    loadHomepageData();
  }, []);

  const loadHomepageData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await homepageAdminService.getAllHomepageData();
      console.log("Loaded homepage data:", data);

      // Validate data structure
      if (!data) {
        throw new Error("No data received from API");
      }

      setHomepageData(data);

      // Initialize form data with proper null checks and fallbacks
      setFormStates({
        hero: data.hero || {},
        about: data.about || {},
        imageSlides: Array.isArray(data.imageSlider)
          ? [...data.imageSlider]
          : [],
        stats: data.stats || {},
        solution: data.solution || {},
        workflow: data.workflow || {},
        projectDiary: data.projectDiary || {},
        testimonials: data.testimonials || {},
        consultationForm: data.consultationForm || {},
      });

      // Initialize image states from URLs with null checks
      setHeroImages(
        (data.hero?.images || []).map((url, index) => ({
          id: `hero-${index}`,
          url,
          title: `Hero Image ${index + 1}`,
          alt: `Hero Image ${index + 1}`,
          size: 'Unknown',
          type: 'image/jpeg'
        }))
      );

      setProjectDiaryImages(
        (data.projectDiary?.images || []).map((url, index) => ({
          id: `diary-${index}`,
          url,
          title: `Project Image ${index + 1}`,
          alt: `Project Image ${index + 1}`,
          size: 'Unknown',
          type: 'image/jpeg'
        }))
      );
    } catch (err) {
      console.error("Error loading homepage data:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const updateFormState = (section: keyof FormStates, data: any) => {
    setFormStates((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  // Handle file uploads with progress tracking
  const handleImageUpload = async (
    files: File[],
    section: string
  ): Promise<string[]> => {
    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const result = await homepageAdminService.uploadFile(file, section);

        if (result.success && result.data) {
          uploadedUrls.push(result.data.url);
        } else {
          throw new Error(result.error || "Upload failed");
        }
      }

      return uploadedUrls;
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Failed to upload images: ${error}`);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Handle hero images change
  const handleHeroImagesChange = async (images: ImageData[]) => {
    setHeroImages(images);

    // Handle new file uploads
    const newFiles = images.filter((img) => img.file);
    if (newFiles.length > 0) {
      try {
        const files = newFiles.map((img) => img.file!);
        const uploadedUrls = await handleImageUpload(files, "hero");

        // Update image URLs
        const updatedImages = images.map((img, index) => {
          if (img.file) {
            const uploadIndex = newFiles.findIndex((f) => f.file === img.file);
            return { ...img, url: uploadedUrls[uploadIndex], file: undefined };
          }
          return img;
        });

        setHeroImages(updatedImages);
        updateFormState("hero", {
          images: updatedImages.map((img) => img.url),
        });
      } catch (error) {
        console.error("Hero images upload error:", error);
      }
    } else {
      // Just update URLs without upload
      updateFormState("hero", { images: images.map((img) => img.url) });
    }
  };

  // Handle project diary images change
  const handleProjectDiaryImagesChange = async (images: ImageData[]) => {
    setProjectDiaryImages(images);

    // Handle new file uploads
    const newFiles = images.filter((img) => img.file);
    if (newFiles.length > 0) {
      try {
        const files = newFiles.map((img) => img.file!);
        const uploadedUrls = await handleImageUpload(files, "projectDiary");

        // Update image URLs
        const updatedImages = images.map((img, index) => {
          if (img.file) {
            const uploadIndex = newFiles.findIndex((f) => f.file === img.file);
            return { ...img, url: uploadedUrls[uploadIndex], file: undefined };
          }
          return img;
        });

        setProjectDiaryImages(updatedImages);
        updateFormState("projectDiary", {
          images: updatedImages.map((img) => img.url),
        });
      } catch (error) {
        console.error("Project diary images upload error:", error);
      }
    } else {
      // Just update URLs without upload
      updateFormState("projectDiary", { images: images.map((img) => img.url) });
    }
  };

  const handleSaveSection = async (section: keyof FormStates) => {
    if (!homepageData) return;

    try {
      setSaving(true);
      let updatedData: any;

      switch (section) {
        case "hero":
          if (homepageData.hero?.id) {
            updatedData = await homepageAdminService.updateHeroData(
              homepageData.hero.id,
              formStates.hero
            );
            setHomepageData((prev) =>
              prev ? { ...prev, hero: updatedData } : null
            );
          }
          break;

        case "about":
          if (homepageData.about?.id) {
            updatedData = await homepageAdminService.updateAboutData(
              homepageData.about.id,
              formStates.about
            );
            setHomepageData((prev) =>
              prev ? { ...prev, about: updatedData } : null
            );
          }
          break;

        case "stats":
          if (homepageData.stats?.id) {
            updatedData = await homepageAdminService.updateStatsData(
              homepageData.stats.id,
              formStates.stats
            );
            setHomepageData((prev) =>
              prev ? { ...prev, stats: updatedData } : null
            );
          }
          break;

        case "solution":
          if (homepageData.solution?.id) {
            updatedData = await homepageAdminService.updateSolutionData(
              homepageData.solution.id,
              formStates.solution
            );
            setHomepageData((prev) =>
              prev ? { ...prev, solution: updatedData } : null
            );
          }
          break;

        case "workflow":
          if (homepageData.workflow?.id) {
            updatedData = await homepageAdminService.updateWorkflowData(
              homepageData.workflow.id,
              formStates.workflow
            );
            setHomepageData((prev) =>
              prev ? { ...prev, workflow: updatedData } : null
            );
          }
          break;

        case "projectDiary":
          if (homepageData.projectDiary?.id) {
            updatedData = await homepageAdminService.updateProjectDiaryData(
              homepageData.projectDiary.id,
              formStates.projectDiary
            );
            setHomepageData((prev) =>
              prev ? { ...prev, projectDiary: updatedData } : null
            );
          }
          break;

        case "testimonials":
          if (homepageData.testimonials?.id) {
            updatedData = await homepageAdminService.updateTestimonialData(
              homepageData.testimonials.id,
              formStates.testimonials
            );
            setHomepageData((prev) =>
              prev ? { ...prev, testimonials: updatedData } : null
            );
          }
          break;

        case "consultationForm":
          if (homepageData.consultationForm?.id) {
            updatedData = await homepageAdminService.updateConsultationFormData(
              homepageData.consultationForm.id,
              formStates.consultationForm
            );
            setHomepageData((prev) =>
              prev ? { ...prev, consultationForm: updatedData } : null
            );
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
    if (!window.confirm("Are you sure you want to delete this slide?")) return;

    try {
      await homepageAdminService.deleteImageSlide(slideId);
      const updatedSlides = formStates.imageSlides.filter(
        (slide) => slide.id !== slideId
      );
      setFormStates((prev) => ({ ...prev, imageSlides: updatedSlides }));
      alert("Image slide deleted successfully!");
    } catch (err) {
      console.error("Error deleting slide:", err);
      alert("Failed to delete image slide");
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
    { key: "hero", label: "Hero Section", icon: <Eye />, color: "#3b82f6" },
    { key: "about", label: "About Section", icon: <Edit />, color: "#10b981" },
    {
      key: "imageSlider",
      label: "Image Slider",
      icon: <Image />,
      color: "#f59e0b",
    },
    {
      key: "stats",
      label: "Statistics",
      icon: <BarChart3 />,
      color: "#ef4444",
    },
    { key: "solution", label: "Solutions", icon: <Target />, color: "#8b5cf6" },
    {
      key: "workflow",
      label: "Workflow",
      icon: <Workflow />,
      color: "#06b6d4",
    },
    {
      key: "projectDiary",
      label: "Project Diary",
      icon: <Camera />,
      color: "#f97316",
    },
    {
      key: "testimonials",
      label: "Testimonials",
      icon: <Star />,
      color: "#eab308",
    },
    {
      key: "consultationForm",
      label: "Contact Form",
      icon: <MessageSquare />,
      color: "#84cc16",
    },
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
          <button onClick={() => setShowPreview(true)} className="preview-btn">
            <Monitor />
            Preview Homepage
          </button>
          <button
            onClick={loadHomepageData}
            className="refresh-btn"
            disabled={loading}
          >
            <RefreshCw className={loading ? "spinning" : ""} />
            Refresh
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`edit-btn ${editMode ? "active" : ""}`}
          >
            <Edit />
            {editMode ? "View Mode" : "Edit Mode"}
          </button>
        </div>
      </div>

      {/* Upload Progress Indicator */}
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
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`nav-btn ${
              activeSection === section.key ? "active" : ""
            }`}
            style={
              activeSection === section.key
                ? { borderColor: section.color, color: section.color }
                : {}
            }
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="content-area">
        {/* Hero Section */}
        {activeSection === "hero" && (
          <div className="section-content">
            <div className="section-header">
              <h2>Hero Section</h2>
              {editMode && (
                <button
                  onClick={() => handleSaveSection("hero")}
                  className="save-btn"
                  disabled={saving}
                >
                  <Save />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>

            {editMode ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formStates.hero.title || ""}
                    onChange={(e) =>
                      updateFormState("hero", { title: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Subtitle</label>
                  <textarea
                    value={formStates.hero.subtitle || ""}
                    onChange={(e) =>
                      updateFormState("hero", { subtitle: e.target.value })
                    }
                    className="form-textarea"
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>Hero Images</label>
                  <p className="form-helper">
                    Upload images or drag & drop them below
                  </p>
                  <MultipleImageUpload
                    images={heroImages}
                    onImagesChange={handleHeroImagesChange}
                    maxFiles={10}
                    allowedTypes={[
                      "image/jpeg",
                      "image/png",
                      "image/gif",
                      "image/webp",
                    ]}
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
                  <p>{homepageData.hero?.title || "No title available"}</p>
                </div>
                <div className="content-card">
                  <h3>Subtitle</h3>
                  <p>
                    {homepageData.hero?.subtitle || "No subtitle available"}
                  </p>
                </div>
                <div className="content-card">
                  <h3>Images ({heroImages.length})</h3>
                  <div className="image-grid">
                    {heroImages.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image.url} alt={image.alt} />
                        <div className="image-info">
                          <p>{image.title || `Image ${index + 1}`}</p>
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
        {activeSection === "about" && (
          <div className="section-content">
            <div className="section-header">
              <h2>About Section</h2>
              {editMode && (
                <button
                  onClick={() => handleSaveSection("about")}
                  className="save-btn"
                  disabled={saving}
                >
                  <Save />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>

            {editMode ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Headline</label>
                  <input
                    type="text"
                    value={formStates.about.headline || ""}
                    onChange={(e) =>
                      updateFormState("about", { headline: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Sub Headline</label>
                  <input
                    type="text"
                    value={formStates.about.subHeadline || ""}
                    onChange={(e) =>
                      updateFormState("about", { subHeadline: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={formStates.about.description || ""}
                    onChange={(e) =>
                      updateFormState("about", { description: e.target.value })
                    }
                    className="form-textarea"
                    rows={5}
                  />
                </div>
              </div>
            ) : (
              <div className="view-content">
                <div className="content-card">
                  <h3>Headline</h3>
                  <p>
                    {homepageData.about?.headline || "No headline available"}
                  </p>
                </div>
                <div className="content-card">
                  <h3>Sub Headline</h3>
                  <p>
                    {homepageData.about?.subHeadline ||
                      "No sub headline available"}
                  </p>
                </div>
                <div className="content-card">
                  <h3>Description</h3>
                  <p>
                    {homepageData.about?.description ||
                      "No description available"}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Image Slider Section */}
        {activeSection === "imageSlider" && (
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
              {(formStates.imageSlides || []).map((slide) => (
                <div key={slide.id} className="slide-card">
                  <div className="slide-image">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title || "Slide image"}
                    />
                  </div>
                  <div className="slide-info">
                    <h4>{slide.title || "No title"}</h4>
                    <p>{slide.subtitle || "No subtitle"}</p>
                    <span className="slide-size">
                      {slide.size || "No size"}
                    </span>
                  </div>
                  <div className="slide-actions">
                    <button className="edit-slide-btn">
                      <Edit />
                    </button>
                    <button
                      className="delete-slide-btn"
                      onClick={() =>
                        slide.id && handleDeleteImageSlide(slide.id)
                      }
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics Section */}
        {activeSection === "stats" && (
          <div className="section-content">
            <div className="section-header">
              <h2>Statistics Section</h2>
              {editMode && (
                <button
                  onClick={() => handleSaveSection("stats")}
                  className="save-btn"
                  disabled={saving}
                >
                  <Save />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>

            {editMode ? (
              <div className="edit-form">
                <div className="form-section">
                  <h3>Header</h3>
                  <div className="form-group">
                    <label>Main Headline</label>
                    <input
                      type="text"
                      value={formStates.stats.header?.mainHeadline || ""}
                      onChange={(e) =>
                        updateFormState("stats", {
                          header: {
                            ...formStates.stats.header,
                            mainHeadline: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Sub Headline</label>
                    <input
                      type="text"
                      value={formStates.stats.header?.subHeadline || ""}
                      onChange={(e) =>
                        updateFormState("stats", {
                          header: {
                            ...formStates.stats.header,
                            subHeadline: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formStates.stats.header?.description || ""}
                      onChange={(e) =>
                        updateFormState("stats", {
                          header: {
                            ...formStates.stats.header,
                            description: e.target.value,
                          },
                        })
                      }
                      className="form-textarea"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="view-content">
                <div className="content-card">
                  <h3>Header</h3>
                  <p>
                    <strong>Main:</strong>{" "}
                    {homepageData.stats?.header?.mainHeadline || "N/A"}
                  </p>
                  <p>
                    <strong>Sub:</strong>{" "}
                    {homepageData.stats?.header?.subHeadline || "N/A"}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {homepageData.stats?.header?.description || "N/A"}
                  </p>
                </div>
                <div className="content-card">
                  <h3>
                    Statistics Items ({(homepageData.stats?.items || []).length}
                    )
                  </h3>
                  <div className="stats-grid">
                    {(homepageData.stats?.items || []).map((item) => (
                      <div key={item.id} className="stat-item">
                        <h4>{item.label || "No label"}</h4>
                        <p>
                          {item.targetValue}
                          {item.suffix}
                        </p>
                        <small>{item.description || "No description"}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Solutions Section */}
        {activeSection === "solution" && (
          <div className="section-content">
            <div className="section-header">
              <h2>Solutions Section</h2>
              {editMode && (
                <button
                  onClick={() => handleSaveSection("solution")}
                  className="save-btn"
                  disabled={saving}
                >
                  <Save />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>

            {editMode ? (
              <div className="edit-form">
                <div className="form-section">
                  <h3>Header</h3>
                  <div className="form-group">
                    <label>Main Headline</label>
                    <input
                      type="text"
                      value={formStates.solution.header?.mainHeadline || ""}
                      onChange={(e) =>
                        updateFormState("solution", {
                          header: {
                            ...formStates.solution.header,
                            mainHeadline: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Sub Headline</label>
                    <input
                      type="text"
                      value={formStates.solution.header?.subHeadline || ""}
                      onChange={(e) =>
                        updateFormState("solution", {
                          header: {
                            ...formStates.solution.header,
                            subHeadline: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="view-content">
                <div className="content-card">
                  <h3>Header</h3>
                  <p>
                    <strong>Main:</strong>{" "}
                    {homepageData.solution?.header?.mainHeadline || "N/A"}
                  </p>
                  <p>
                    <strong>Sub:</strong>{" "}
                    {homepageData.solution?.header?.subHeadline || "N/A"}
                  </p>
                </div>
                <div className="content-card">
                  <h3>
                    Solutions ({(homepageData.solution?.solutions || []).length}
                    )
                  </h3>
                  <div className="solutions-grid">
                    {(homepageData.solution?.solutions || []).map(
                      (solution) => (
                        <div key={solution.id} className="solution-item">
                          <img
                            src={solution.imageUrl}
                            alt={
                              Array.isArray(solution.title)
                                ? solution.title.join(" ")
                                : solution.title || "Solution image"
                            }
                          />
                          <h4>
                            {Array.isArray(solution.title)
                              ? solution.title.join(" ")
                              : solution.title || "No title"}
                          </h4>
                          <p>{solution.category || "No category"}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Workflow Section */}
        {activeSection === "workflow" && (
          <div className="section-content">
            <div className="section-header">
              <h2>Workflow Section</h2>
              {editMode && (
                <button
                  onClick={() => handleSaveSection("workflow")}
                  className="save-btn"
                  disabled={saving}
                >
                  <Save />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>

            {editMode ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formStates.workflow.title || ""}
                    onChange={(e) =>
                      updateFormState("workflow", { title: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
              </div>
            ) : (
              <div className="view-content">
                <div className="content-card">
                  <h3>Title</h3>
                  <p>{homepageData.workflow?.title || "No title available"}</p>
                </div>
                <div className="content-card">
                  <h3>
                    Workflow Steps (
                    {(homepageData.workflow?.workflows || []).length})
                  </h3>
                  <div className="workflow-grid">
                    {(homepageData.workflow?.workflows || []).map((step) => (
                      <div key={step.id} className="workflow-step">
                        <div className="step-number">{step.step}</div>
                        <h4>{step.title || "No title"}</h4>
                        <p>{step.description || "No description"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project Diary Section */}
        {activeSection === "projectDiary" && (
          <div className="section-content">
            <div className="section-header">
              <h2>Project Diary Section</h2>
              {editMode && (
                <button
                  onClick={() => handleSaveSection("projectDiary")}
                  className="save-btn"
                  disabled={saving}
                >
                  <Save />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>

            {editMode ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formStates.projectDiary.title || ""}
                    onChange={(e) =>
                      updateFormState("projectDiary", { title: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Project Images</label>
                  <p className="form-helper">
                    Upload project images or drag & drop them below
                  </p>
                  <MultipleImageUpload
                    images={projectDiaryImages}
                    onImagesChange={handleProjectDiaryImagesChange}
                    maxFiles={20}
                    allowedTypes={[
                      "image/jpeg",
                      "image/png",
                      "image/gif",
                      "image/webp",
                    ]}
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
                  <p>
                    {homepageData.projectDiary?.title || "No title available"}
                  </p>
                </div>
                <div className="content-card">
                  <h3>Images ({projectDiaryImages.length})</h3>
                  <div className="image-grid">
                    {projectDiaryImages.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image.url} alt={image.alt} />
                        <div className="image-info">
                          <p>{image.title || `Image ${index + 1}`}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Testimonials Section */}
        {activeSection === "testimonials" && (
          <div className="section-content">
            <div className="section-header">
              <h2>Testimonials Section</h2>
              {editMode && (
                <button
                  onClick={() => handleSaveSection("testimonials")}
                  className="save-btn"
                  disabled={saving}
                >
                  <Save />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>

            {editMode ? (
              <div className="edit-form">
                <div className="form-section">
                  <h3>Header</h3>
                  <div className="form-group">
                    <label>Main Headline</label>
                    <input
                      type="text"
                      value={formStates.testimonials.header?.mainHeadline || ""}
                      onChange={(e) =>
                        updateFormState("testimonials", {
                          header: {
                            ...formStates.testimonials.header,
                            mainHeadline: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Sub Headline</label>
                    <input
                      type="text"
                      value={formStates.testimonials.header?.subHeadline || ""}
                      onChange={(e) =>
                        updateFormState("testimonials", {
                          header: {
                            ...formStates.testimonials.header,
                            subHeadline: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formStates.testimonials.header?.description || ""}
                      onChange={(e) =>
                        updateFormState("testimonials", {
                          header: {
                            ...formStates.testimonials.header,
                            description: e.target.value,
                          },
                        })
                      }
                      className="form-textarea"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="view-content">
                <div className="content-card">
                  <h3>Header</h3>
                  <p>
                    <strong>Main:</strong>{" "}
                    {homepageData.testimonials?.header?.mainHeadline || "N/A"}
                  </p>
                  <p>
                    <strong>Sub:</strong>{" "}
                    {homepageData.testimonials?.header?.subHeadline || "N/A"}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {homepageData.testimonials?.header?.description || "N/A"}
                  </p>
                </div>
                <div className="content-card">
                  <h3>
                    Testimonials (
                    {(homepageData.testimonials?.testimonials || []).length})
                  </h3>
                  <div className="testimonials-grid">
                    {(homepageData.testimonials?.testimonials || []).map(
                      (testimonial) => (
                        <div key={testimonial.id} className="testimonial-item">
                          <img
                            src={testimonial.customerAvatar}
                            alt={testimonial.customerName}
                          />
                          <h4>{testimonial.customerName || "No name"}</h4>
                          <p>"{testimonial.content || "No content"}"</p>
                          <div className="rating">
                            {Array.from(
                              { length: testimonial.rating || 0 },
                              (_, i) => (
                                <Star key={i} className="star-filled" />
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Consultation Form Section */}
        {activeSection === "consultationForm" && (
          <div className="section-content">
            <div className="section-header">
              <h2>Consultation Form Section</h2>
              {editMode && (
                <button
                  onClick={() => handleSaveSection("consultationForm")}
                  className="save-btn"
                  disabled={saving}
                >
                  <Save />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>

            {editMode ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formStates.consultationForm.title || ""}
                    onChange={(e) =>
                      updateFormState("consultationForm", {
                        title: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={formStates.consultationForm.description || ""}
                    onChange={(e) =>
                      updateFormState("consultationForm", {
                        description: e.target.value,
                      })
                    }
                    className="form-textarea"
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>CTA Text</label>
                  <input
                    type="text"
                    value={formStates.consultationForm.ctaText || ""}
                    onChange={(e) =>
                      updateFormState("consultationForm", {
                        ctaText: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>
              </div>
            ) : (
              <div className="view-content">
                <div className="content-card">
                  <h3>Title</h3>
                  <p>
                    {homepageData.consultationForm?.title ||
                      "No title available"}
                  </p>
                </div>
                <div className="content-card">
                  <h3>Description</h3>
                  <p>
                    {homepageData.consultationForm?.description ||
                      "No description available"}
                  </p>
                </div>
                <div className="content-card">
                  <h3>CTA Text</h3>
                  <p>
                    {homepageData.consultationForm?.ctaText ||
                      "No CTA text available"}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal />
    </div>
  );
};

export default HomepageAdmin;
