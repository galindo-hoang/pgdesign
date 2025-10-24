import React, { useState, useEffect, useCallback } from "react";
import {
  Save,
  Edit,
  Plus,
  Trash2,
  X,
  Image,
  Target,
  Upload,
  Building2,
} from "lucide-react";
import projectAdminService, {
  ProjectCategoriesData,
  ProjectCategory,
  CreateProjectCategoryRequest,
  UpdateProjectCategoryRequest,
  UpdateProjectCategoriesDataRequest,
} from "../services/projectAdminService";
import ImageUpload, { ImageData } from "../components/ImageUpload";
import SingleImageUpload from "../components/SingleImageUpload";
import "./ProjectAdmin.css";

interface FormStates {
  categoriesData: UpdateProjectCategoriesDataRequest;
  categories: ProjectCategory[];
}

const ProjectAdmin: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectCategoriesData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"header" | "categories">("header");
  const [editingCategory, setEditingCategory] =
    useState<ProjectCategory | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [formStates, setFormStates] = useState<FormStates>({
    categoriesData: {},
    categories: [],
  });

  // Legacy categoryImages state - now using base64 data directly
  // const [categoryImages, setCategoryImages] = useState<
  //   Record<number, ImageData[]>
  // >({});


  // Helper function to process image data - handle double-encoding issue
  const processImageData = (imageData: any): string | null => {
    // Check if imageData exists and is valid
    if (!imageData) return null;
    
    // If imageData is not a string, log for debugging
    if (typeof imageData !== 'string') {
      console.log('imageData is not string:', typeof imageData, imageData);
      return null;
    }
    
    // Now we know imageData is a string
    const imageString = imageData.trim();
    if (imageString === '') return null;
    
    // Check if this is a double-encoded base64 string
    if (imageString.startsWith('data:image/') && imageString.includes('base64,')) {
      try {
        const base64Part = imageString.split('base64,')[1];
        const decoded = atob(base64Part);
        
        // If decoded string is also a data URL, use it instead
        if (decoded.startsWith('data:image/')) {
          console.log('Detected double-encoded image, using decoded version');
          return decoded;
        }
      } catch (error) {
        console.log('Error decoding base64:', error);
      }
    }
    
    // Return original string if no double-encoding detected
    return imageString;
  };

  const loadProjectData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await projectAdminService.getProjectCategoriesData();
      console.log("Loaded project data:", data);

      if (!data) {
        throw new Error("No data received from API");
      }

      setProjectData(data);
      setFormStates({
        categoriesData: {
          mainTitle: data.mainTitle,
          subtitle: data.subtitle,
          description: data.description,
        },
        categories: Array.isArray(data.categories) ? [...data.categories] : [],
      });

      // Initialize category images
      const images: Record<number, ImageData[]> = {};
      if (Array.isArray(data.categories)) {
        data.categories.forEach((category) => {
          // Use S3 URL directly
          let imageUrl = '';
          if (category.backgroundImageUrl && typeof category.backgroundImageUrl === 'string') {
            imageUrl = category.backgroundImageUrl;
          }
          
          images[category.id] = [
            {
              id: `category-${category.id}`,
              url: imageUrl,
              title: `${category.title} Background`,
              alt: `${category.title} Background Image`,
              size: 'Unknown',
              type: 'image/jpeg'
            },
          ];
        });
      }
      // Legacy setCategoryImages removed - now using base64 data directly
    } catch (err) {
      console.error("Error loading project data:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      if (isMounted) {
        await loadProjectData();
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, [loadProjectData]);

  const updateFormState = (section: keyof FormStates, data: any) => {
    setFormStates((prev) => ({
      ...prev,
      [section]: data, // Replace the entire section data instead of merging
    }));
  };

  const handleSaveHeader = async () => {
    if (!projectData) return;

    try {
      setSaving(true);
      const updatedData = await projectAdminService.updateProjectCategoriesData(
        projectData.id,
        formStates.categoriesData
      );
      setProjectData(updatedData);
      alert("Header data updated successfully!");
    } catch (err) {
      console.error("Error updating header:", err);
      alert("Failed to update header data");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCategories = async () => {
    if (!projectData) return;

    try {
      setSaving(true);
      const updatedData = await projectAdminService.updateProjectCategoriesData(
        projectData.id,
        { categories: formStates.categories }
      );
      setProjectData(updatedData);
      alert("Categories updated successfully!");
    } catch (err) {
      console.error("Error updating categories:", err);
      alert("Failed to update categories");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateCategory = async (
    categoryData: CreateProjectCategoryRequest
  ) => {
    if (!projectData) return;

    try {
      setSaving(true);
      const newCategory = await projectAdminService.createProjectCategory(
        projectData.id,
        categoryData
      );

      const updatedCategories = [...formStates.categories, newCategory];
      updateFormState("categories", updatedCategories);

      // Legacy setCategoryImages removed - base64 data handled directly in component

      setShowCategoryForm(false);
      alert("Category created successfully!");
    } catch (err) {
      console.error("Error creating category:", err);
      alert("Failed to create category");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCategory = async (
    categoryId: string,
    categoryData: UpdateProjectCategoryRequest
  ) => {
    if (!projectData) return;

    try {
      setSaving(true);
      const updatedCategory = await projectAdminService.updateProjectCategory(
        projectData.id,
        categoryId,
        categoryData
      );

      console.log("Updated category from API:", updatedCategory);
      console.log("Current categories:", formStates.categories);
      console.log("Looking for categoryId:", categoryId);

      const updatedCategories = Array.isArray(formStates.categories)
        ? formStates.categories.map((cat) => {
            console.log(
              "Comparing cat.categoryId:",
              cat.categoryId,
              "with categoryId:",
              categoryId
            );
            return cat.categoryId === categoryId ? updatedCategory : cat;
          })
        : [];

      console.log("Updated categories:", updatedCategories);
      updateFormState("categories", updatedCategories);

      setEditingCategory(null);
      alert("Category updated successfully!");
    } catch (err) {
      console.error("Error updating category:", err);
      alert("Failed to update category");
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="project-admin">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading project data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-admin">
        <div className="error-container">
          <h2>Error loading project data</h2>
          <p>{error}</p>
          <button onClick={loadProjectData}>Try Again</button>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="project-admin">
        <div className="error-container">
          <h2>No project data available</h2>
          <p>Unable to load project categories data.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "header", label: "Header Settings", icon: <Edit /> },
    { key: "categories", label: "Categories", icon: <Target /> },
  ];

  return (
    <div className="project-admin">
      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <div className="header-title">
            <Building2 />
            <h1>Project Categories Management</h1>
          </div>
          <div className="header-actions">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`edit-btn ${editMode ? "active" : ""}`}
            >
              <Edit />
              {editMode ? "View Mode" : "Edit Mode"}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "header" | "categories")}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="content-area">
        {/* Header Settings Tab */}
        {activeTab === "header" && (
          <div className="section-content">
            <div className="section-header">
              <h2>Project Categories Header</h2>
              {editMode && (
                <button
                  onClick={handleSaveHeader}
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
                  <label>Main Title</label>
                  <input
                    type="text"
                    value={formStates.categoriesData.mainTitle || ""}
                    onChange={(e) =>
                      updateFormState("categoriesData", {
                        mainTitle: e.target.value,
                      })
                    }
                    className="form-input"
                    placeholder="e.g., DANH MỤC DỰ ÁN"
                  />
                </div>

                <div className="form-group">
                  <label>Subtitle</label>
                  <input
                    type="text"
                    value={formStates.categoriesData.subtitle || ""}
                    onChange={(e) =>
                      updateFormState("categoriesData", {
                        subtitle: e.target.value,
                      })
                    }
                    className="form-input"
                    placeholder="e.g., KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={formStates.categoriesData.description || ""}
                    onChange={(e) =>
                      updateFormState("categoriesData", {
                        description: e.target.value,
                      })
                    }
                    className="form-textarea"
                    rows={4}
                    placeholder="Describe the project categories section..."
                  />
                </div>
              </div>
            ) : (
              <div className="view-content">
                <div className="content-card">
                  <h3>Main Title</h3>
                  <p>{projectData.mainTitle || "No title available"}</p>
                </div>
                <div className="content-card">
                  <h3>Subtitle</h3>
                  <p>{projectData.subtitle || "No subtitle available"}</p>
                </div>
                <div className="content-card">
                  <h3>Description</h3>
                  <p>{projectData.description || "No description available"}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="section-content">
            <div className="section-header">
              <h2>Project Categories ({formStates.categories.length})</h2>
              {editMode && (
                <div className="section-actions">
                  <button
                    onClick={() => setShowCategoryForm(true)}
                    className="add-category-btn"
                  >
                    <Plus />
                    Add Category
                  </button>
                  <button
                    onClick={handleSaveCategories}
                    className="save-btn"
                    disabled={saving}
                  >
                    <Save />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>

            <div className="categories-grid">
              {Array.isArray(formStates.categories)
                ? formStates.categories.map((category) => {
                  return (
                    <div key={category.id} className="category-card">
                      <div className="category-image">
                        {category.backgroundImageUrl ? (
                          <div className="category-image-preview">
                            <img 
                              src={category.backgroundImageUrl}
                              alt={category.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="category-image-upload hidden" style={{ border: '2px dashed #ccc' }}>
                              <div className="upload-placeholder">
                                <span>Click to upload image</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="category-image-upload" style={{ border: '2px dashed #ccc' }}>
                            <div className="upload-placeholder">
                              <span>Click to upload image</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="category-info">
                        <div className="category-header">
                          <h3>{category.title}</h3>
                          <div className="category-actions">
                            {editMode && (
                              <>
                                <button
                                  onClick={() => setEditingCategory(category)}
                                  className="edit-category-btn"
                                >
                                  <Edit />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="category-details">
                          <p>
                            <strong>Category ID:</strong> {category.categoryId}
                          </p>
                          <p>
                            <strong>Projects:</strong> {category.projectCount}
                          </p>
                          <p>
                            <strong>Navigation:</strong>{" "}
                            {category.navigationPath}
                          </p>
                          <p>
                            <strong>Order:</strong> {category.displayOrder}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
                : []}
            </div>
          </div>
        )}
      </div>

      {/* Category Form Modal */}
      {showCategoryForm && (
        <CategoryFormModal
          onSave={(data) =>
            handleCreateCategory(data as CreateProjectCategoryRequest)
          }
          onCancel={() => setShowCategoryForm(false)}
          saving={saving}
        />
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <CategoryFormModal
          category={editingCategory}
          onSave={(data) =>
            handleUpdateCategory(
              editingCategory.categoryId,
              data as UpdateProjectCategoryRequest
            )
          }
          onCancel={() => setEditingCategory(null)}
          saving={saving}
        />
      )}

    </div>
  );
};

// Category Form Modal Component
interface CategoryFormModalProps {
  category?: ProjectCategory;
  onSave: (
    data: CreateProjectCategoryRequest | UpdateProjectCategoryRequest
  ) => void;
  onCancel: () => void;
  saving: boolean;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  category,
  onSave,
  onCancel,
  saving,
}) => {
  const [formData, setFormData] = useState({
    title: category?.title || "",
    backgroundImageUrl: category?.backgroundImageUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert empty string to undefined for API compatibility
    const submitData = {
      ...formData,
      backgroundImageUrl: formData.backgroundImageUrl || undefined,
    };
    onSave(submitData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{category ? "Edit Category" : "Add New Category"}</h3>
          <button onClick={onCancel} className="close-btn">
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="form-input"
              placeholder="e.g., NHÀ PHỐ"
              required
            />
          </div>

          <div className="form-group">
            <label>Background Image</label>
            {!category && (
              <input
                type="url"
                value={formData.backgroundImageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, backgroundImageUrl: e.target.value })
                }
                className="form-input"
                placeholder="https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/category.png"
              />
            )}
            {formData.backgroundImageUrl && (
              <div 
                className="image-preview-container" 
                style={{ 
                  marginTop: '10px',
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                <img 
                  src={formData.backgroundImageUrl} 
                  alt="Background preview" 
                  style={{ 
                    maxWidth: '200px', 
                    maxHeight: '150px', 
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {category && (
                  <div 
                    className="image-upload-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                    onClick={() => {
                      document.getElementById(`file-input-${category.id}`)?.click();
                    }}
                  >
                    <div style={{ color: 'white', textAlign: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      <div style={{ fontSize: '12px', marginTop: '4px' }}>Upload Image</div>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  id={`file-input-${category?.id || 'new'}`}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        // Upload file to server
                        const formData = new FormData();
                        formData.append('image', file);
                        formData.append('section', 'project-categories');

                        const response = await fetch(
                          `${process.env.REACT_APP_API_URL || 'http://localhost:3002'}/api/v1/upload/image`,
                          {
                            method: 'POST',
                            body: formData,
                          }
                        );

                        if (response.ok) {
                          const result = await response.json();
                          if (result.success && result.data?.url) {
                            setFormData(prev => ({ 
                              ...prev, 
                              backgroundImageUrl: result.data.url 
                            }));
                          }
                        } else {
                          console.error('Upload failed:', response.statusText);
                        }
                      } catch (error) {
                        console.error('Error uploading image:', error);
                      }
                    }
                  }}
                  style={{ display: 'none' }}
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={saving}>
              <Save />
              {saving
                ? "Saving..."
                : category
                ? "Update Category"
                : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectAdmin;
