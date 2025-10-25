// src/services/homepageProjectService.ts
import { ImageSlideData } from '../types/homePageTypes';

interface HomepageProjectResponse {
  id: number;
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  thumbnailImage: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

const API_BASE_URL = 'http://localhost:3002/api/v1';

export const getHomepageProjects = async (): Promise<ImageSlideData[]> => {
  try {
    console.log('🌐 Fetching homepage projects from API...');
    
    const response = await fetch(`${API_BASE_URL}/projectdetail/util/homepage`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse<HomepageProjectResponse[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch homepage projects');
    }
    
    console.log('✅ Homepage projects fetched successfully:', result.data.length);
    
    // Map API response to ImageSlideData format
    const mappedData: ImageSlideData[] = result.data.map((project) => ({
      id: project.id,
      projectId: project.projectId,
      imageUrl: project.thumbnailImage,
      title: project.clientName, // slide-title maps to clientName
      subtitle: project.title,   // slide-subtitle maps to title
      size: project.area         // slide-size maps to area
    }));
    
    console.log('🔄 Mapped homepage projects:', mappedData);
    
    return mappedData;
  } catch (error) {
    console.error('❌ Error fetching homepage projects:', error);
    throw error;
  }
};
