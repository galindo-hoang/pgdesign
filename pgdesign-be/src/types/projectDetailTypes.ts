// src/types/projectDetailTypes.ts

export interface ProjectDetailData {
  id?: number;
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description?: string | undefined;
  category: string;
  subCategory: string;
  style?: string | undefined;
  thumbnailImage?: string | undefined;
  
  // Embedded HTML content from server
  htmlContent: string;
  
  // Additional project details
  projectImages?: string[] | undefined;
  projectStatus?: string | undefined;
  projectBudget?: string | undefined;
  completionDate?: string | undefined;
  architectName?: string | undefined;
  contractorName?: string | undefined;
  
  // SEO and metadata
  metaTitle?: string | undefined;
  metaDescription?: string | undefined;
  tags?: string[] | undefined;
  
  // Homepage display control
  isOnHomePage?: boolean;
  
  // Admin managed content
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  
  // Associated specifications
  projectSpecs?: ProjectSpecification[] | undefined;
}

export interface ProjectSpecification {
  id?: number;
  projectDetailId?: number;
  label: string;
  value: string;
  unit?: string | undefined;
  displayOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Request types for creating/updating project details
export interface CreateProjectDetailRequest {
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description?: string | undefined;
  category: string;
  subCategory: string;
  style?: string | undefined;
  thumbnailImage?: string | undefined;
  htmlContent: string;
  projectImages?: string[] | undefined;
  projectStatus?: string | undefined;
  projectBudget?: string | undefined;
  completionDate?: string | undefined;
  architectName?: string | undefined;
  contractorName?: string | undefined;
  metaTitle?: string | undefined;
  metaDescription?: string | undefined;
  tags?: string[] | undefined;
  isOnHomePage?: boolean;
  projectSpecs?: Omit<ProjectSpecification, 'id' | 'projectDetailId' | 'createdAt' | 'updatedAt'>[] | undefined;
}

export interface UpdateProjectDetailRequest {
  projectId?: string | undefined;
  title?: string | undefined;
  clientName?: string | undefined;
  area?: string | undefined;
  constructionDate?: string | undefined;
  address?: string | undefined;
  description?: string | undefined;
  category?: string | undefined;
  subCategory?: string | undefined;
  style?: string | undefined;
  thumbnailImage?: string | undefined;
  htmlContent?: string | undefined;
  projectImages?: string[] | undefined;
  projectStatus?: string | undefined;
  projectBudget?: string | undefined;
  completionDate?: string | undefined;
  architectName?: string | undefined;
  contractorName?: string | undefined;
  metaTitle?: string | undefined;
  metaDescription?: string | undefined;
  tags?: string[] | undefined;
  isOnHomePage?: boolean;
  projectSpecs?: Omit<ProjectSpecification, 'id' | 'projectDetailId' | 'createdAt' | 'updatedAt'>[] | undefined;
}

// Database table interfaces
export interface ProjectDetailRow {
  id: number;
  project_id: string;
  title: string;
  client_name: string;
  area: string;
  construction_date: string;
  address: string;
  description?: string | null;
  category: string;
  sub_category: string;
  style?: string | null;
  thumbnail_image?: string | null;
  html_content: string;
  project_images?: string | null; // JSON string
  project_status?: string | null;
  project_budget?: string | null;
  completion_date?: string | null;
  architect_name?: string | null;
  contractor_name?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  tags?: string | null; // JSON string
  is_on_homepage: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectSpecificationRow {
  id: number;
  project_detail_id: number;
  label: string;
  value: string;
  unit?: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
    stack?: string;
  };
}

// Pagination types
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

// Filter types
export interface ProjectDetailFilters {
  category?: string;
  subCategory?: string;
  projectStatus?: string;
  isActive?: boolean;
} 