import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    loadProjectData();
  }, []);

  const loadProjectData = async () => {
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
          // Convert base64 to data URL if exists
          let imageUrl = '';
          if (category.backgroundImageBlob && typeof category.backgroundImageBlob === 'string') {
            // Check if it's already a data URL
            if (category.backgroundImageBlob.startsWith('data:image/')) {
              imageUrl = category.backgroundImageBlob;
            } else {
              // Convert raw base64 to data URL
              imageUrl = `data:image/jpeg;base64,${category.backgroundImageBlob}`;
            }
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
  };

  const updateFormState = (section: keyof FormStates, data: any) => {
    setFormStates((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
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
                  const processedImage = processImageData(category.backgroundImageBlob);
                  return (
                    <div key={category.id} className="category-card">
                      <div className="category-image">
                        {processedImage ? (
                          <div className="category-image-preview">
                            <img 
                              src={processedImage || ''}
                              alt={category.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        ) : (
                          <div className="category-image-upload" style={{ border: '2px solid red' }}>
                            {(() => {
                              console.log('Showing upload placeholder for:', category.title);
                              return null;
                            })()}
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/gif,image/webp"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  try {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      const dataUrl = reader.result as string;
                                      const base64 = dataUrl.split(',')[1];
                                      const updatedCategories = formStates.categories.map((cat) =>
                                        cat.id === category.id
                                          ? { ...cat, backgroundImageBlob: base64 }
                                          : cat
                                      );
                                      updateFormState("categories", updatedCategories);
                                    };
                                    reader.readAsDataURL(file);
                                  } catch (error) {
                                    console.error('Error processing image:', error);
                                  }
                                }
                              }}
                              style={{ display: 'none' }}
                              id={`file-input-${category.id}`}
                            />
                            <label 
                              htmlFor={`file-input-${category.id}`}
                              className="upload-placeholder"
                              style={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '150px',
                                border: '2px dashed #d1d5db',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                color: '#6b7280'
                              }}
                            >
                              <Upload size={24} />
                              <span>Click to upload image</span>
                            </label>
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
                                {/* <button
                                  onClick={() =>
                                    handleDeleteCategory(category.categoryId)
                                  }
                                  className="delete-category-btn"
                                >
                                  <Trash2 />
                                </button> */}
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
    categoryId: category?.categoryId || "",
    title: category?.title || "",
    projectCount: category?.projectCount || 0,
    navigationPath: category?.navigationPath || "",
    displayOrder: category?.displayOrder || 0,
    backgroundImageBlob: category?.backgroundImageBlob || null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert null to undefined for API compatibility
    const submitData = {
      ...formData,
      backgroundImageBlob: formData.backgroundImageBlob || undefined,
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
            <label>Category ID *</label>
            <input
              type="text"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className={`form-input ${category ? 'form-input-disabled' : ''}`}
              placeholder="e.g., house-normal"
              required
              disabled={!!category}
              readOnly={!!category}
            />
          </div>

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
            <label>Project Count</label>
            <input
              type="number"
              value={formData.projectCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  projectCount: parseInt(e.target.value) || 0,
                })
              }
              className={`form-input ${category ? 'form-input-disabled' : ''}`}
              min="0"
              disabled={!!category}
              readOnly={!!category}
            />
          </div>

          <div className="form-group">
            <label>Navigation Path *</label>
            <input
              type="text"
              value={formData.navigationPath}
              onChange={(e) =>
                setFormData({ ...formData, navigationPath: e.target.value })
              }
              className={`form-input ${category ? 'form-input-disabled' : ''}`}
              placeholder="e.g., /projects/house-normal"
              required
              disabled={!!category}
              readOnly={!!category}
            />
          </div>

          <div className="form-group">
            <label>Display Order</label>
            <input
              type="number"
              value={formData.displayOrder}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  displayOrder: parseInt(e.target.value) || 0,
                })
              }
              className={`form-input ${category ? 'form-input-disabled' : ''}`}
              min="0"
              disabled={!!category}
              readOnly={!!category}
            />
          </div>

          <div className="form-group">
            <label>Background Image</label>
            <SingleImageUpload
              onImageUpload={(base64Data) =>
                setFormData({ ...formData, backgroundImageBlob: base64Data })
              }
              onImageRemove={() => {}}
              currentImage={formData.backgroundImageBlob}
              maxSizeKB={2048}
              acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
            />
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
