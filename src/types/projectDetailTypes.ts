// src/types/projectDetailTypes.ts

export interface ProjectDetailData {
  id: number;
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description?: string;
  category: string;
  projectCategoryId: number;
  style?: string;
  thumbnailImage?: string;
  thumbnailImageBlob?: string; // Base64 encoded thumbnail image

  // Embedded HTML content from server
  htmlContent: string;

  // Additional project details
  projectImages?: string[]; // Array of image URLs
  projectImagesBlob?: string[]; // Array of base64 encoded image data (BLOB storage)
  projectStatus?: string; // Now includes budget information
  completionDate?: string;
  architectName?: string;
  contractorName?: string;

  // SEO and metadata
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];

  // Homepage display control
  isOnHomePage?: boolean;

  // Admin managed content
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// API Response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
