// Project Detail Admin Service
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1';

export interface ProjectDetailFormData {
  id?: number;
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description: string;
  category: string;
  projectCategoryId: number;
  style: string;
  thumbnailImageBlob?: string;
  projectImages?: string[]; // Legacy field from server
  projectImagesBlob: string[];
  projectStatus: string;
  completionDate: string;
  architectName: string;
  contractorName: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  isOnHomePage: boolean;
  isActive: boolean;
  htmlContent: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Convert ISO datetime string to YYYY-MM-DD format for HTML date inputs
const formatDateForInput = (isoDateString: string): string => {
  if (!isoDateString) return '';
  try {
    const date = new Date(isoDateString);
    return date.toISOString().split('T')[0]; // Gets YYYY-MM-DD
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

// Get project by ID
export const getProjectById = async (projectId: string): Promise<ProjectDetailFormData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projectdetail/project/${projectId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<ProjectDetailFormData> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.message || 'Failed to fetch project data');
    }

    // Convert date fields to proper format for HTML date inputs
    const projectData = {
      ...data.data,
      constructionDate: formatDateForInput(data.data.constructionDate),
      completionDate: formatDateForInput(data.data.completionDate)
    };

    return projectData;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

// Create new project
export const createProject = async (projectData: Omit<ProjectDetailFormData, 'id'>): Promise<ProjectDetailFormData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projectdetail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<ProjectDetailFormData> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.message || 'Failed to create project');
    }

    return data.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update existing project
export const updateProject = async (projectId: string, projectData: ProjectDetailFormData): Promise<ProjectDetailFormData> => {
  try {
    // First get the project to find its numeric ID
    const existingProject = await getProjectById(projectId);
    
    if (!existingProject.id) {
      throw new Error('Could not find project numeric ID');
    }

    // Use numeric ID for PUT request
    const response = await fetch(`${API_BASE_URL}/projectdetail/${existingProject.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<ProjectDetailFormData> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.message || 'Failed to update project');
    }

    return data.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    // First get the project to find its numeric ID
    const existingProject = await getProjectById(projectId);
    
    if (!existingProject.id) {
      throw new Error('Could not find project numeric ID');
    }

    // Use numeric ID for DELETE request
    const response = await fetch(`${API_BASE_URL}/projectdetail/${existingProject.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<null> = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to delete project');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Get project categories for dropdown
export const getProjectCategories = async (): Promise<Array<{id: number, categoryId: string, title: string}>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projectpage/project-categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<{categories: Array<{id: number, categoryId: string, title: string}>}> = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error(data.message || 'Failed to fetch categories');
    }

    return data.data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return default categories
    return [
      { id: 1, categoryId: 'appartment', title: 'APARTMENT' },
      { id: 2, categoryId: 'house-normal', title: 'HOUSE NORMAL' },
      { id: 3, categoryId: 'village', title: 'VILLA' },
      { id: 4, categoryId: 'house-business', title: 'COMMERCIAL' }
    ];
  }
};

// File conversion utilities
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Chỉ hỗ trợ file JPG, PNG, WebP' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File không được vượt quá 5MB' };
  }

  return { valid: true };
};
