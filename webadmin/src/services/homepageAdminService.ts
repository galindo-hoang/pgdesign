// Homepage Admin Service - Communicates with pgdesign-be homepage APIs
import axios from 'axios';

// Backend API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1';

// Enhanced interfaces for homepage admin
export interface HeroData {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AboutData {
  id: number;
  headline: string;
  subHeadline: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageSlideData {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  size: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatItemData {
  id: number;
  icon: string;
  targetValue: number;
  label: string;
  suffix: string;
  description: string;
  backgroundImage: string;
  category: string;
  displayOrder: number;
}

export interface StatsData {
  id: number;
  header: {
    mainHeadline: string;
    subHeadline: string;
    description: string;
  };
  items: StatItemData[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SolutionItemData {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  link: string;
  displayOrder: number;
}

export interface SolutionData {
  id: number;
  header: {
    mainHeadline: string;
    subHeadline: string;
  };
  solutions: SolutionItemData[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowStepData {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
  diagram: string;
}

export interface WorkflowData {
  id: number;
  title: string;
  workflows: WorkflowStepData[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDiaryData {
  id: number;
  title: string;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestimonialItemData {
  id: number;
  customerName: string;
  customerAvatar: string;
  content: string;
  rating: number;
  projectType: string;
  displayOrder: number;
}

export interface TestimonialData {
  id: number;
  header: {
    mainHeadline: string;
    subHeadline: string;
    description: string;
  };
  testimonials: TestimonialItemData[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsultationFormData {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  projectTypes: string[];
  minInvestment: number;
  maxInvestment: number;
  stepInvestment: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HomepageData {
  hero: HeroData;
  about: AboutData;
  imageSlider: ImageSlideData[];
  stats: StatsData;
  solution: SolutionData;
  workflow: WorkflowData;
  projectDiary: ProjectDiaryData;
  testimonials: TestimonialData;
  consultationForm: ConsultationFormData;
}

export interface UploadResponse {
  success: boolean;
  data?: {
    url: string;
    filename: string;
    originalName: string;
    size: number;
    mimeType: string;
  };
  error?: string;
}

// API Response wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Error handling
const handleApiError = (error: any): never => {
  if (error.response) {
    throw new Error(`API Error: ${error.response.data?.message || error.response.statusText}`);
  } else if (error.request) {
    throw new Error('Network Error: Unable to connect to server');
  } else {
    throw new Error(`Error: ${error.message}`);
  }
};

// Data transformation helpers
const transformImageSlideData = (backendData: any): ImageSlideData => {
  return {
    id: backendData.id,
    imageUrl: backendData.image_url,
    title: backendData.title,
    subtitle: backendData.subtitle,
    size: backendData.size,
    displayOrder: backendData.display_order,
    isActive: backendData.is_active,
    createdAt: new Date(backendData.created_at),
    updatedAt: new Date(backendData.updated_at)
  };
};

const transformWorkflowData = (backendData: any): WorkflowData => {
  return {
    id: backendData.main?.id || 0,
    title: backendData.main?.title || '',
    workflows: (backendData.tabs || []).map((tab: any) => ({
      id: tab.id?.toString() || '',
      step: tab.display_order + 1,
      title: tab.title || '',
      description: tab.workflow_key || '',
      icon: tab.icon_url || '',
      diagram: tab.diagram_url || ''
    })),
    isActive: backendData.main?.is_active || false,
    createdAt: new Date(backendData.main?.created_at || Date.now()),
    updatedAt: new Date(backendData.main?.updated_at || Date.now())
  };
};

const transformProjectDiaryData = (backendData: any): ProjectDiaryData => {
  return {
    id: backendData.main?.id || 0,
    title: backendData.main?.title || '',
    images: (backendData.images || []).map((img: any) => img.image_url || ''),
    isActive: backendData.main?.is_active || false,
    createdAt: new Date(backendData.main?.created_at || Date.now()),
    updatedAt: new Date(backendData.main?.updated_at || Date.now())
  };
};

const transformConsultationFormData = (backendData: any): ConsultationFormData => {
  return {
    id: backendData.main?.id || 0,
    title: backendData.main?.title || '',
    description: backendData.main?.description || '',
    ctaText: backendData.main?.cta_text || '',
    projectTypes: (backendData.projectTypes || []).map((type: any) => type.name || ''),
    minInvestment: backendData.main?.min_investment || 0,
    maxInvestment: backendData.main?.max_investment || 0,
    stepInvestment: backendData.main?.step_investment || 0,
    isActive: backendData.main?.is_active || false,
    createdAt: new Date(backendData.main?.created_at || Date.now()),
    updatedAt: new Date(backendData.main?.updated_at || Date.now())
  };
};

class HomepageAdminService {
  private baseURL = API_BASE_URL;

  // Generic API call handler
  private async apiCall<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // File upload methods
  async uploadFile(file: File, section: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('image', file);  // Backend expects 'image' field name
    formData.append('folder', section);  // Backend expects 'folder' instead of 'section'

    try {
      const response = await fetch(`${this.baseURL}/upload/image`, {  // Use correct endpoint
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Upload failed: ${response.status} - ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      
      // Transform backend response to match our interface
      return {
        success: result.success,
        data: result.data ? {
          url: result.data.url,
          filename: result.data.filename,
          originalName: result.data.filename,
          size: result.data.size,
          mimeType: result.data.mimetype
        } : undefined,
        error: result.success ? undefined : result.message
      };
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  }

  // Multiple file upload
  async uploadFiles(files: File[], section: string): Promise<UploadResponse[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));  // Backend expects 'images' field name
    formData.append('folder', section);

    try {
      const response = await fetch(`${this.baseURL}/upload/images`, {  // Use correct endpoint
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Upload failed: ${response.status} - ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      
      // Transform backend response to match our interface
      if (result.success && result.data && result.data.urls) {
        return result.data.urls.map((url: string, index: number) => ({
          success: true,
          data: {
            url: url,
            filename: result.data.files?.[index]?.filename || 'unknown',
            originalName: result.data.files?.[index]?.filename || 'unknown',
            size: result.data.files?.[index]?.size || 0,
            mimeType: result.data.files?.[index]?.mimetype || 'unknown'
          }
        }));
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Multiple files upload error:', error);
      throw error;
    }
  }

  // Delete file
  async deleteFile(fileUrl: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/upload/file`, {  // Use correct endpoint
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: fileUrl }),  // Backend expects { url: string }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Delete failed: ${response.status} - ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('File delete error:', error);
      return false;
    }
  }

  // Get all homepage data
  async getAllHomepageData(): Promise<HomepageData> {
    const response = await this.apiCall<any>('/homepage');
    
    // Transform all sections from backend format to frontend format
    const transformedData = {
      ...response,
      imageSlider: Array.isArray(response.imageSlider) 
        ? response.imageSlider.map(transformImageSlideData)
        : [],
      workflow: response.workflow ? transformWorkflowData(response.workflow) : {
        id: 0,
        title: '',
        workflows: [],
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      projectDiary: response.projectDiary ? transformProjectDiaryData(response.projectDiary) : {
        id: 0,
        title: '',
        images: [],
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      consultationForm: response.consultationForm ? transformConsultationFormData(response.consultationForm) : {
        id: 0,
        title: '',
        description: '',
        ctaText: '',
        projectTypes: [],
        minInvestment: 0,
        maxInvestment: 0,
        stepInvestment: 0,
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };
    
    return transformedData;
  }

  // Hero Section
  async getHeroData(): Promise<HeroData> {
    return this.apiCall<HeroData>('/homepage/hero');
  }

  async updateHeroData(id: number, data: Partial<HeroData>): Promise<HeroData> {
    return this.apiCall<HeroData>(`/homepage/hero/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // About Section
  async getAboutData(): Promise<AboutData> {
    return this.apiCall<AboutData>('/homepage/about');
  }

  async updateAboutData(id: number, data: Partial<AboutData>): Promise<AboutData> {
    return this.apiCall<AboutData>(`/homepage/about/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Image Slider
  async getImageSliderData(): Promise<ImageSlideData[]> {
    return this.apiCall<ImageSlideData[]>('/homepage/image-slider');
  }

  async createImageSlide(data: Partial<ImageSlideData>): Promise<ImageSlideData> {
    return this.apiCall<ImageSlideData>('/homepage/image-slider', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateImageSlide(id: number, data: Partial<ImageSlideData>): Promise<ImageSlideData> {
    return this.apiCall<ImageSlideData>(`/homepage/image-slider/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteImageSlide(id: number): Promise<boolean> {
    try {
      await this.apiCall(`/homepage/image-slider/${id}`, { method: 'DELETE' });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Stats Section
  async getStatsData(): Promise<StatsData> {
    return this.apiCall<StatsData>('/homepage/stats');
  }

  async updateStatsData(id: number, data: Partial<StatsData>): Promise<StatsData> {
    return this.apiCall<StatsData>(`/homepage/stats/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateStatsItem(id: number, data: Partial<StatItemData>): Promise<StatItemData> {
    return this.apiCall<StatItemData>(`/homepage/stats/item/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Solution Section
  async getSolutionData(): Promise<SolutionData> {
    return this.apiCall<SolutionData>('/homepage/solution');
  }

  async updateSolutionData(id: number, data: Partial<SolutionData>): Promise<SolutionData> {
    return this.apiCall<SolutionData>(`/homepage/solution/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateSolutionItem(id: number, data: Partial<SolutionItemData>): Promise<SolutionItemData> {
    return this.apiCall<SolutionItemData>(`/homepage/solution/item/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Workflow Section
  async getWorkflowData(): Promise<WorkflowData> {
    return this.apiCall<WorkflowData>('/homepage/workflow');
  }

  async updateWorkflowData(id: number, data: Partial<WorkflowData>): Promise<WorkflowData> {
    return this.apiCall<WorkflowData>(`/homepage/workflow/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Project Diary Section
  async getProjectDiaryData(): Promise<ProjectDiaryData> {
    return this.apiCall<ProjectDiaryData>('/homepage/project-diary');
  }

  async updateProjectDiaryData(id: number, data: Partial<ProjectDiaryData>): Promise<ProjectDiaryData> {
    return this.apiCall<ProjectDiaryData>(`/homepage/project-diary/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Testimonials Section
  async getTestimonialData(): Promise<TestimonialData> {
    return this.apiCall<TestimonialData>('/homepage/testimonials');
  }

  async updateTestimonialData(id: number, data: Partial<TestimonialData>): Promise<TestimonialData> {
    return this.apiCall<TestimonialData>(`/homepage/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonialItem(id: number, data: Partial<TestimonialItemData>): Promise<TestimonialItemData> {
    return this.apiCall<TestimonialItemData>(`/homepage/testimonials/item/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Consultation Form Section
  async getConsultationFormData(): Promise<ConsultationFormData> {
    return this.apiCall<ConsultationFormData>('/homepage/consultation-form');
  }

  async updateConsultationFormData(id: number, data: Partial<ConsultationFormData>): Promise<ConsultationFormData> {
    return this.apiCall<ConsultationFormData>(`/homepage/consultation-form/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Bulk operations
  async bulkUploadImages(files: File[], section: string): Promise<UploadResponse[]> {
    return this.uploadFiles(files, section);
  }

  async bulkDeleteFiles(fileUrls: string[]): Promise<boolean[]> {
    const deletePromises = fileUrls.map(url => this.deleteFile(url));
    return Promise.all(deletePromises);
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.apiCall('/health');
      return true;
    } catch (error) {
      return false;
    }
  }
}

const homepageAdminService = new HomepageAdminService();
export default homepageAdminService; 
