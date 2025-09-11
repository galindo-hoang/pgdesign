// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Types for Project Category Management
export interface ProjectCategory {
  id: number;
  categoryId: string;
  title: string;
  projectCount: number;
  backgroundImageUrl: string;
  backgroundImageBlob?: string; // Base64 encoded image data
  navigationPath: string;
  displayOrder: number;
}

export interface ProjectCategoriesData {
  id: number;
  mainTitle: string;
  subtitle: string;
  description: string;
  categories: ProjectCategory[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectCategoryRequest {
  categoryId: string;
  title: string;
  projectCount: number;
  backgroundImageUrl: string;
  backgroundImageBlob?: string;
  navigationPath: string;
  displayOrder?: number;
}

export interface UpdateProjectCategoryRequest {
  title?: string;
  projectCount?: number;
  backgroundImageUrl?: string;
  backgroundImageBlob?: string;
  navigationPath?: string;
  displayOrder?: number;
}

export interface CreateProjectCategoriesDataRequest {
  mainTitle: string;
  subtitle: string;
  description: string;
  categories?: ProjectCategory[];
}

export interface UpdateProjectCategoriesDataRequest {
  mainTitle?: string;
  subtitle?: string;
  description?: string;
  categories?: ProjectCategory[];
}

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
const API_VERSION = "v1";
const API_ENDPOINT = `${API_BASE_URL}/api/${API_VERSION}/projectpage`;

class ProjectAdminService {
  // ========== PROJECT CATEGORIES DATA ==========

  async getProjectCategoriesData(): Promise<ProjectCategoriesData | null> {
    try {
      const response = await fetch(`${API_ENDPOINT}/project-categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<ProjectCategoriesData> = await response.json();

      if (!data.success) {
        throw new Error(
          data.error || "Failed to fetch project categories data"
        );
      }

      return data.data || null;
    } catch (error) {
      console.error("Error fetching project categories data:", error);
      throw error;
    }
  }

  async updateProjectCategoriesData(
    id: number,
    data: UpdateProjectCategoriesDataRequest
  ): Promise<ProjectCategoriesData> {
    try {
      const response = await fetch(`${API_ENDPOINT}/project-categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<ProjectCategoriesData> = await response.json();

      if (!result.success) {
        throw new Error(
          result.error || "Failed to update project categories data"
        );
      }

      return result.data!;
    } catch (error) {
      console.error("Error updating project categories data:", error);
      throw error;
    }
  }

  // ========== PROJECT CATEGORY MANAGEMENT ==========

  async createProjectCategory(
    categoriesDataId: number,
    data: CreateProjectCategoryRequest
  ): Promise<ProjectCategory> {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/project-categories/${categoriesDataId}/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<ProjectCategory> = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to create project category");
      }

      return result.data!;
    } catch (error) {
      console.error("Error creating project category:", error);
      throw error;
    }
  }

  async updateProjectCategory(
    categoriesDataId: number,
    categoryId: string,
    data: UpdateProjectCategoryRequest
  ): Promise<ProjectCategory> {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/project-categories/${categoriesDataId}/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<ProjectCategory> = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to update project category");
      }

      return result.data!;
    } catch (error) {
      console.error("Error updating project category:", error);
      throw error;
    }
  }

  async deleteProjectCategory(
    categoriesDataId: number,
    categoryId: string
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_ENDPOINT}/project-categories/${categoriesDataId}/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<boolean> = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to delete project category");
      }

      return result.data || false;
    } catch (error) {
      console.error("Error deleting project category:", error);
      throw error;
    }
  }

  // ========== IMAGE UPLOAD ==========

  async uploadCategoryImage(
    file: File
  ): Promise<{ url: string; blob?: string }> {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("section", "project-categories");

      const response = await fetch(
        `${API_BASE_URL}/api/${API_VERSION}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<{ url: string; blob?: string }> =
        await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to upload image");
      }

      return result.data!;
    } catch (error) {
      console.error("Error uploading category image:", error);
      throw error;
    }
  }

  // ========== UTILITY FUNCTIONS ==========

  async validateProjectCategoryData(data: any): Promise<string[]> {
    const errors: string[] = [];

    if (!data.categoryId || typeof data.categoryId !== "string") {
      errors.push("Category ID is required and must be a string");
    }

    if (!data.title || typeof data.title !== "string") {
      errors.push("Title is required and must be a string");
    }

    if (typeof data.projectCount !== "number" || data.projectCount < 0) {
      errors.push(
        "Project count is required and must be a non-negative number"
      );
    }

    if (!data.navigationPath || typeof data.navigationPath !== "string") {
      errors.push("Navigation path is required and must be a string");
    }

    return errors;
  }

  async validateProjectCategoriesDataData(data: any): Promise<string[]> {
    const errors: string[] = [];

    if (!data.mainTitle || typeof data.mainTitle !== "string") {
      errors.push("Main title is required and must be a string");
    }

    if (!data.subtitle || typeof data.subtitle !== "string") {
      errors.push("Subtitle is required and must be a string");
    }

    if (!data.description || typeof data.description !== "string") {
      errors.push("Description is required and must be a string");
    }

    return errors;
  }
}

const projectAdminService = new ProjectAdminService();
export default projectAdminService;
