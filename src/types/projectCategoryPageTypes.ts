// Updated types to match backend database structure and API response

export interface ProjectSubCategory {
  id: number;
  projectCategoryId: number;
  subCategoryId: string;
  title: string;
  description?: string;
  heroImageUrl?: string;
  displayOrder: number;
  projectCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Project overview data returned by backend (limited fields for listing)
export interface ProjectOverviewData {
  id: number;
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  address: string;
  thumbnailImage?: string;
  constructionDate: string;
  projectStatus?: string;
  createdAt: Date;
}

// Full project detail structure (for project detail pages)
export interface ProjectDetail {
  id: number;
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description?: string;
  category: string;
  subCategory: string;
  style?: string;
  thumbnailImage?: string;
  htmlContent: string;
  projectImages?: string[];
  projectStatus?: string;
  projectBudget?: string;
  completionDate?: string;
  architectName?: string;
  contractorName?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Backend API response structure for subcategories with project overview
export interface ProjectSubCategoryWithProjectOverview extends ProjectSubCategory {
  projectsOverview: {
    totalProjects: number;
    projects: ProjectOverviewData[];
  };
}

// For compatibility - transforms ProjectOverviewData to ProjectDetail format
export interface ProjectSubCategoryWithProjects extends ProjectSubCategory {
  projects: ProjectDetail[];
}

// Updated to match actual backend response structure
export interface ProjectCategoryApiResponse {
  success: boolean;
  data: ProjectSubCategoryWithProjectOverview[];
  message: string;
}

// Category information structure (when needed)
export interface CategoryInfo {
  id: number;
  categoryId: string;
  title: string;
  description?: string;
  heroImageUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

// Complete category structure with subcategories (for frontend display)
export interface ProjectCategory extends CategoryInfo {
  subCategories: ProjectSubCategoryWithProjects[];
}

export interface ProjectCategoryPageData {
  category: ProjectCategory;
  defaultHeroImage?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Service function types for fetching data
export interface ProjectCategoryService {
  fetchCategoryWithSubCategories(categoryId: string): Promise<ProjectCategory>;
  fetchSubCategoryProjects(categoryId: string, subCategoryId: string): Promise<ProjectDetail[]>;
}

// Legacy types for backward compatibility (if needed)
export interface CategoryData {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  title: string;
  description: string;
  projects: ProjectItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  thumbnailImage: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description: string;
  category: string;
  subCategory: string;
  style: string;
} 