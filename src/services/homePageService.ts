import {
  HomePageData,
  HeroData,
  AboutData,
  ImageSlideData,
  StatsData,
  SolutionData,
  WorkflowData,
  ProjectDiaryData,
  TestimonialData,
  ConsultationFormData
} from '../types/homePageTypes';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1';
const API_TIMEOUT = 10000; // 10 seconds

// Utility function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Error handling utility
const handleApiError = (error: any, section: string) => {
  console.error(`Error fetching ${section} data:`, error);
  throw new Error(`Failed to fetch ${section} data. Please try again later.`);
};

// API Functions for each section
export const fetchHeroData = async (): Promise<HeroData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/hero`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch hero data');
    }
    
    return data.data;
  } catch (error) {
    handleApiError(error, 'hero');
    throw error;
  }
};

export const fetchAboutData = async (): Promise<AboutData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/about`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch about data');
    }
    
    return data.data;
  } catch (error) {
    handleApiError(error, 'about');
    throw error;
  }
};

export const fetchImageSliderData = async (): Promise<ImageSlideData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/image-slider`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch image slider data');
    }
    
    return data.data;
  } catch (error) {
    handleApiError(error, 'image slider');
    throw error;
  }
};

export const fetchStatsData = async (): Promise<StatsData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/stats`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch stats data');
    }
    
    return data.data;
  } catch (error) {
    handleApiError(error, 'stats');
    throw error;
  }
};

export const fetchSolutionData = async (): Promise<SolutionData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/solution`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch solution data');
    }
    
    return data.data;
  } catch (error) {
    handleApiError(error, 'solution');
    throw error;
  }
};

export const fetchWorkflowData = async (): Promise<WorkflowData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/workflow`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch workflow data');
    }
    
    return data.data;
  } catch (error) {
    handleApiError(error, 'workflow');
    throw error;
  }
};

export const fetchProjectDiaryData = async (): Promise<ProjectDiaryData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/project-diary`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch project diary data');
    }
    
    return data.data;
  } catch (error) {
    handleApiError(error, 'project diary');
    throw error;
  }
};

export const fetchTestimonialData = async (): Promise<TestimonialData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/testimonials`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch testimonial data');
    }
    
    return data.data;
  } catch (error) {
    handleApiError(error, 'testimonials');
    throw error;
  }
};

export const fetchConsultationFormData = async (): Promise<ConsultationFormData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage/consultation-form`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch consultation form data');
    }
    
    return data.data;
  } catch (error) {
    handleApiError(error, 'consultation form');
    throw error;
  }
};

// Main function to fetch all homepage data
export const fetchHomePageData = async (): Promise<HomePageData> => {
  try {
    // Fetch all data in parallel for better performance
    const [
      hero,
      about,
      imageSlider,
      stats,
      solution,
      workflow,
      projectDiary,
      testimonials,
      consultationForm
    ] = await Promise.all([
      fetchHeroData(),
      fetchAboutData(),
      fetchImageSliderData(),
      fetchStatsData(),
      fetchSolutionData(),
      fetchWorkflowData(),
      fetchProjectDiaryData(),
      fetchTestimonialData(),
      fetchConsultationFormData()
    ]);

    return {
      hero,
      about,
      imageSlider,
      stats,
      solution,
      workflow,
      projectDiary,
      testimonials,
      consultationForm
    };
  } catch (error) {
    handleApiError(error, 'homepage');
    throw error;
  }
};

// Utility function to check API health
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}; 