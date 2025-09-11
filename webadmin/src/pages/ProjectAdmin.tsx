import React, { useState, useEffect } from "react";
import {
  Save,
  Edit,
  Eye,
  RefreshCw,
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
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"header" | "categories">("header");
  const [editingCategory, setEditingCategory] =
    useState<ProjectCategory | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [formStates, setFormStates] = useState<FormStates>({
    categoriesData: {},
    categories: [],
  });

  const [categoryImages, setCategoryImages] = useState<
    Record<number, ImageData[]>
  >({});

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
          images[category.id] = [
            {
              id: `category-${category.id}`,
              url: category.backgroundImageBlob || category.backgroundImageUrl,
              title: `${category.title} Background`,
              alt: `${category.title} Background Image`,
            },
          ];
        });
      }
      setCategoryImages(images);
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

  const handleImageUpload = async (
    files: File[],
    categoryId?: number
  ): Promise<string[]> => {
    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const result = await projectAdminService.uploadCategoryImage(file);
        uploadedUrls.push(result.blob || result.url);
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

  const handleCategoryImageChange = async (
    categoryId: number,
    images: ImageData[]
  ) => {
    setCategoryImages((prev) => ({
      ...prev,
      [categoryId]: images,
    }));

    // Handle new file uploads
    const newFiles = images.filter((img) => img.file);
    if (newFiles.length > 0) {
      try {
        const files = newFiles.map((img) => img.file!);
        const uploadedUrls = await handleImageUpload(files, categoryId);

        // Update image URLs
        const updatedImages = images.map((img, index) => {
          if (img.file) {
            const uploadIndex = newFiles.findIndex((f) => f.file === img.file);
            return { ...img, url: uploadedUrls[uploadIndex], file: undefined };
          }
          return img;
        });

        setCategoryImages((prev) => ({
          ...prev,
          [categoryId]: updatedImages,
        }));

        // Update category data
        const updatedCategories = Array.isArray(formStates.categories)
          ? formStates.categories.map((cat) =>
              cat.id === categoryId
                ? {
                    ...cat,
                    backgroundImageBlob:
                      updatedImages[0]?.url || cat.backgroundImageUrl,
                  }
                : cat
            )
          : [];
        updateFormState("categories", updatedCategories);
      } catch (error) {
        console.error("Category image upload error:", error);
      }
    } else {
      // Just update URLs without upload
      const updatedCategories = Array.isArray(formStates.categories)
        ? formStates.categories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  backgroundImageBlob: images[0]?.url || cat.backgroundImageUrl,
                }
              : cat
          )
        : [];
      updateFormState("categories", updatedCategories);
    }
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

      // Initialize image for new category
      setCategoryImages((prev) => ({
        ...prev,
        [newCategory.id]: [
          {
            id: `category-${newCategory.id}`,
            url:
              newCategory.backgroundImageBlob || newCategory.backgroundImageUrl,
            title: `${newCategory.title} Background`,
            alt: `${newCategory.title} Background Image`,
          },
        ],
      }));

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

  const handleDeleteCategory = async (categoryId: string) => {
    if (!projectData) return;
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      setSaving(true);
      await projectAdminService.deleteProjectCategory(
        projectData.id,
        categoryId
      );

      const updatedCategories = formStates.categories.filter(
        (cat) => cat.categoryId !== categoryId
      );
      updateFormState("categories", updatedCategories);

      // Remove category images
      setCategoryImages((prev) => {
        const newImages = { ...prev };
        const categoryToDelete = formStates.categories.find(
          (cat) => cat.categoryId === categoryId
        );
        if (categoryToDelete) {
          delete newImages[categoryToDelete.id];
        }
        return newImages;
      });

      alert("Category deleted successfully!");
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Failed to delete category");
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
              onClick={() => setShowPreview(true)}
              className="preview-btn"
            >
              <Eye />
              Preview
            </button>
            <button
              onClick={loadProjectData}
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
                ? formStates.categories.map((category) => (
                    <div key={category.id} className="category-card">
                      <div className="category-image">
                        <ImageUpload
                          images={categoryImages[category.id] || []}
                          onImagesChange={(images) =>
                            handleCategoryImageChange(category.id, images)
                          }
                          maxFiles={1}
                          allowedTypes={[
                            "image/jpeg",
                            "image/png",
                            "image/gif",
                            "image/webp",
                          ]}
                          maxSize={5}
                          showPreview={true}
                        />
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
                                <button
                                  onClick={() =>
                                    handleDeleteCategory(category.categoryId)
                                  }
                                  className="delete-category-btn"
                                >
                                  <Trash2 />
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
                  ))
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

      {/* Preview Modal */}
      {showPreview && (
        <div className="preview-modal">
          <div className="preview-header">
            <h3>Project Categories Preview</h3>
            <button onClick={() => setShowPreview(false)} className="close-btn">
              <X />
            </button>
          </div>
          <div className="preview-content">
            <iframe
              src="http://localhost:3000/projects"
              width="100%"
              height="800px"
              title="Project Categories Preview"
            />
          </div>
        </div>
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
              className="form-input"
              placeholder="e.g., house-normal"
              required
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
              className="form-input"
              min="0"
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
              className="form-input"
              placeholder="e.g., /projects/house-normal"
              required
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
              className="form-input"
              min="0"
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
