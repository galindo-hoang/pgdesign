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
  projectCategoryId: number;
  style?: string | undefined;
  thumbnailImage?: string | undefined;
  thumbnailImageBlob?: string | undefined; // Base64 encoded thumbnail image

  // Embedded HTML content from server
  htmlContent: string;

  // Additional project details
  projectImages?: string[] | undefined; // Array of base64 encoded image data
  projectImagesBlob?: string[] | undefined; // Array of base64 encoded image data (new BLOB storage)
  projectStatus?: string | undefined; // Now includes budget information
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
  projectCategoryId: number;
  style?: string | undefined;
  thumbnailImage?: string | undefined;
  htmlContent: string;
  projectImages?: string[] | undefined; // Array of base64 encoded image data
  projectImagesBlob?: string[] | undefined; // Array of base64 encoded image data (new BLOB storage)
  projectStatus?: string | undefined; // Now includes budget information
  completionDate?: string | undefined;
  architectName?: string | undefined;
  contractorName?: string | undefined;
  metaTitle?: string | undefined;
  metaDescription?: string | undefined;
  tags?: string[] | undefined;
  isOnHomePage?: boolean;
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
  projectCategoryId?: number | undefined;
  style?: string | undefined;
  thumbnailImage?: string | undefined;
  htmlContent?: string | undefined;
  projectImages?: string[] | undefined; // Array of base64 encoded image data
  projectImagesBlob?: string[] | undefined; // Array of base64 encoded image data (new BLOB storage)
  projectStatus?: string | undefined; // Now includes budget information
  completionDate?: string | undefined;
  architectName?: string | undefined;
  contractorName?: string | undefined;
  metaTitle?: string | undefined;
  metaDescription?: string | undefined;
  tags?: string[] | undefined;
  isOnHomePage?: boolean;
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
  project_category_id: number;
  style?: string | null;
  thumbnail_image?: string | null;
  thumbnail_image_blob?: string | null; // Base64 encoded thumbnail image
  html_content: string;
  project_images?: string | null; // JSON string
  project_images_blob?: string | null; // JSON string of base64 encoded images
  project_status?: string | null; // Now includes budget information
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
  projectCategoryId?: number;
  projectStatus?: string;
  isActive?: boolean;
}
