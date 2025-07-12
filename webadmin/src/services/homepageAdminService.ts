// Homepage Admin Service - Communicates with pgdesign-be homepage APIs
import axios from 'axios';

// Backend API base URL
const API_BASE_URL = 'http://localhost:3002/api/v1/homepage';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Type definitions based on the homepage data structure
export interface HeroData {
  id?: number;
  title: string;
  subtitle: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AboutData {
  id?: number;
  headline: string;
  subHeadline: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ImageSlideData {
  id?: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  size: string;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface StatsData {
  id?: number;
  header: {
    mainHeadline: string;
    subHeadline: string;
    description: string;
  };
  items: Array<{
    id: number;
    targetValue: number;
    label: string;
    suffix: string;
    description: string;
    iconName: string;
    backgroundImageUrl: string;
    category: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface SolutionData {
  id?: number;
  header: {
    mainHeadline: string;
    subHeadline: string;
  };
  solutions: Array<{
    id: number;
    imageUrl: string;
    category: string;
    title: string;
    link: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkflowData {
  id?: number;
  title: string;
  workflows: Array<{
    id: number;
    iconName: string;
    title: string;
    description: string;
    step: number;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectDiaryData {
  id?: number;
  title: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TestimonialData {
  id?: number;
  header: {
    mainHeadline: string;
    subHeadline: string;
    description: string;
  };
  testimonials: Array<{
    id: number;
    customerName: string;
    customerAvatar: string;
    content: string;
    rating: number;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConsultationFormData {
  id?: number;
  title: string;
  description: string;
  ctaText: string;
  createdAt?: string;
  updatedAt?: string;
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

// Homepage Admin Service Class
class HomepageAdminService {
  // Get all homepage data
  async getAllHomepageData(): Promise<HomepageData> {
    try {
      const response = await api.get<ApiResponse<HomepageData>>('');
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch homepage data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  // HERO SECTION METHODS
  async getHeroData(): Promise<HeroData> {
    try {
      const response = await api.get<ApiResponse<HeroData>>('/hero');
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch hero data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  async updateHeroData(id: number, data: Partial<HeroData>): Promise<HeroData> {
    try {
      const response = await api.put<ApiResponse<HeroData>>(`/hero/${id}`, data);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to update hero data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  async createHeroData(data: Omit<HeroData, 'id'>): Promise<HeroData> {
    try {
      const response = await api.post<ApiResponse<HeroData>>('/hero', data);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to create hero data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  // ABOUT SECTION METHODS
  async getAboutData(): Promise<AboutData> {
    try {
      const response = await api.get<ApiResponse<AboutData>>('/about');
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch about data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  async updateAboutData(id: number, data: Partial<AboutData>): Promise<AboutData> {
    try {
      const response = await api.put<ApiResponse<AboutData>>(`/about/${id}`, data);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to update about data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  // IMAGE SLIDER METHODS
  async getImageSliderData(): Promise<ImageSlideData[]> {
    try {
      const response = await api.get<ApiResponse<ImageSlideData[]>>('/image-slider');
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch image slider data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  async createImageSlide(data: Omit<ImageSlideData, 'id'>): Promise<ImageSlideData> {
    try {
      const response = await api.post<ApiResponse<ImageSlideData>>('/image-slider', data);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to create image slide');
    } catch (error) {
      return handleApiError(error);
    }
  }

  async updateImageSlide(id: number, data: Partial<ImageSlideData>): Promise<ImageSlideData> {
    try {
      const response = await api.put<ApiResponse<ImageSlideData>>(`/image-slider/${id}`, data);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to update image slide');
    } catch (error) {
      return handleApiError(error);
    }
  }

  async deleteImageSlide(id: number): Promise<void> {
    try {
      const response = await api.delete<ApiResponse<void>>(`/image-slider/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to delete image slide');
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  async reorderImageSlides(slideIds: number[]): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/image-slider/reorder', { slideIds });
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to reorder image slides');
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  // STATS SECTION METHODS
  async getStatsData(): Promise<StatsData> {
    try {
      const response = await api.get<ApiResponse<StatsData>>('/stats');
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch stats data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  async updateStatsData(id: number, data: Partial<StatsData>): Promise<StatsData> {
    try {
      const response = await api.put<ApiResponse<StatsData>>(`/stats/${id}`, data);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to update stats data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  // SOLUTION SECTION METHODS
  async getSolutionData(): Promise<SolutionData> {
    try {
      const response = await api.get<ApiResponse<SolutionData>>('/solution');
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch solution data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  async updateSolutionData(id: number, data: Partial<SolutionData>): Promise<SolutionData> {
    try {
      const response = await api.put<ApiResponse<SolutionData>>(`/solution/${id}`, data);
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to update solution data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  // WORKFLOW SECTION METHODS
  async getWorkflowData(): Promise<WorkflowData> {
    try {
      const response = await api.get<ApiResponse<WorkflowData>>('/workflow');
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch workflow data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  // TODO: Backend route doesn't exist yet - uncomment when PUT /workflow/:id is implemented
  // async updateWorkflowData(id: number, data: Partial<WorkflowData>): Promise<WorkflowData> {
  //   try {
  //     const response = await api.put<ApiResponse<WorkflowData>>(`/workflow/${id}`, data);
  //     if (response.data.success) {
  //       return response.data.data;
  //     }
  //     throw new Error(response.data.error || 'Failed to update workflow data');
  //   } catch (error) {
  //     return handleApiError(error);
  //   }
  // }

  // PROJECT DIARY METHODS
  async getProjectDiaryData(): Promise<ProjectDiaryData> {
    try {
      const response = await api.get<ApiResponse<ProjectDiaryData>>('/project-diary');
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch project diary data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  // TESTIMONIAL METHODS
  async getTestimonialData(): Promise<TestimonialData> {
    try {
      const response = await api.get<ApiResponse<TestimonialData>>('/testimonials');
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch testimonial data');
    } catch (error) {
      return handleApiError(error);
    }
  }

  // CONSULTATION FORM METHODS
  async getConsultationFormData(): Promise<ConsultationFormData> {
    try {
      const response = await api.get<ApiResponse<ConsultationFormData>>('/consultation-form');
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch consultation form data');
    } catch (error) {
      return handleApiError(error);
    }
  }
}

// Export singleton instance
export const homepageAdminService = new HomepageAdminService();
export default homepageAdminService; 