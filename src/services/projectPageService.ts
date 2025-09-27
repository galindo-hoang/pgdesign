import {
  ProjectPageData,
  AboutProjectData,
  StatsSectionData,
  ProjectCategoriesData,
  StatsItem,
  ProjectCategory,
  ApiResponse,
} from "../types/projectPageTypes";

// Import asset images
import hero from "../assets/images/projectpage/project-hero.png";

// API Configuration
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3002/api/v1";

// Configuration for data source (can be controlled via environment variable)
const USE_MOCK_DATA = false;

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Cache storage
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

// Promise deduplication storage to prevent duplicate concurrent requests
const pendingRequests = new Map<string, Promise<any>>();

// Cache utility functions
const getCacheKey = (endpoint: string): string => `projectpage_${endpoint}`;

const isValidCache = (entry: CacheEntry<any>): boolean => {
  return Date.now() - entry.timestamp < CACHE_DURATION;
};

const getFromCache = <T>(key: string): T | null => {
  const entry = cache.get(key);
  if (entry && isValidCache(entry)) {
    console.log(`📦 Cache hit for ${key}`);
    return entry.data;
  }
  if (entry) {
    console.log(`🗑️ Cache expired for ${key}, removing...`);
    cache.delete(key);
  }
  return null;
};

const setCache = <T>(key: string, data: T): void => {
  console.log(`💾 Caching data for ${key}`);
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

// Clear all cache
export const clearProjectPageCache = (): void => {
  console.log('🧹 Clearing all project page cache');
  cache.clear();
  pendingRequests.clear();
};

// Promise deduplication helper
const withDeduplication = async <T>(
  key: string,
  fetchFn: () => Promise<T>
): Promise<T> => {
  // Check if there's already a pending request for this key
  if (pendingRequests.has(key)) {
    console.log(`⏳ Deduplicating request for ${key}`);
    return pendingRequests.get(key) as Promise<T>;
  }

  // Create new request
  const promise = fetchFn().finally(() => {
    // Clean up pending request when done
    pendingRequests.delete(key);
  });

  // Store pending request
  pendingRequests.set(key, promise);
  return promise;
};

// ========== MOCK DATA ==========

// Mock About Project Data
const mockAboutProjectData: AboutProjectData = {
  id: 1,
  title: "Dự án",
  subtitle: "PG DESIGN",
  backgroundImageBlob: hero,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock Stats Items
const mockStatsItems: StatsItem[] = [
  {
    id: 1,
    iconName: "experience-icon",
    targetValue: 5,
    label: "Kinh nghiệm",
    suffix: "+",
    description: "Năm kinh nghiệm",
    category: "experience",
    displayOrder: 0,
  },
  {
    id: 2,
    iconName: "customer-icon",
    targetValue: 500,
    label: "Khách hàng",
    suffix: "+",
    description: "Tin tưởng & hài lòng",
    category: "customers",
    displayOrder: 1,
  },
  {
    id: 3,
    iconName: "design-icon",
    targetValue: 450,
    label: "Dự án",
    suffix: "+",
    description: "Thiết kế hoàn thành",
    category: "projects",
    displayOrder: 2,
  },
  {
    id: 4,
    iconName: "building-icon",
    targetValue: 98,
    label: "Chất lượng",
    suffix: "%",
    description: "Cam kết hoàn hảo",
    category: "quality",
    displayOrder: 3,
  },
];

// Mock Stats Section Data
const mockStatsSectionData: StatsSectionData = {
  id: 1,
  mainHeadline: "THÀNH TỰU CỦA CHÚNG TÔI",
  subHeadline: "Những con số ấn tượng",
  description:
    "Với nhiều năm kinh nghiệm trong lĩnh vực thiết kế kiến trúc và nội thất, chúng tôi tự hào mang đến những giải pháp tối ưu cho mọi không gian sống.",
  statsItems: mockStatsItems,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock Project Categories - will be replaced by database data with base64 images
const mockProjectCategories: ProjectCategory[] = [
  {
    id: 1,
    categoryId: "house-normal",
    title: "NHÀ PHỐ",
    projectCount: 45,
    backgroundImageBlob: null, // Will be populated from database as base64
    navigationPath: "/projects/house-normal",
    displayOrder: 0,
  },
  {
    id: 2,
    categoryId: "appartment",
    title: "CĂN HỘ",
    projectCount: 32,
    backgroundImageBlob: null, // Will be populated from database as base64
    navigationPath: "/projects/appartment",
    displayOrder: 1,
  },
  {
    id: 3,
    categoryId: "village",
    title: "BIỆT THỰ",
    projectCount: 28,
    backgroundImageBlob: null, // Will be populated from database as base64
    navigationPath: "/projects/village",
    displayOrder: 2,
  },
  {
    id: 4,
    categoryId: "house-business",
    title: "THƯƠNG MẠI",
    projectCount: 50,
    backgroundImageBlob: null, // Will be populated from database as base64
    navigationPath: "/projects/house-business",
    displayOrder: 3,
  },
];

// Mock Project Categories Data
const mockProjectCategoriesData: ProjectCategoriesData = {
  id: 1,
  mainTitle: "DANH MỤC DỰ ÁN",
  subtitle: "KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ",
  description:
    "Từ những căn nhà phố hiện đại đến những biệt thự sang trọng, từ không gian nội thất tinh tế đến những ngôi nhà vườn xanh mát - chúng tôi mang đến giải pháp thiết kế toàn diện cho mọi nhu cầu.",
  categories: mockProjectCategories,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock Complete Project Page Data
const mockProjectPageData: ProjectPageData = {
  aboutProject: mockAboutProjectData,
  statsSection: mockStatsSectionData,
  projectCategories: mockProjectCategoriesData,
};

// ========== MOCK DATA FUNCTIONS ==========

// Mock delay function to simulate API calls
const mockDelay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Mock API functions
export const fetchAboutProjectDataMock =
  async (): Promise<AboutProjectData> => {
    await mockDelay();
    console.log("Using mock AboutProjectData");
    return mockAboutProjectData;
  };

export const fetchStatsSectionDataMock =
  async (): Promise<StatsSectionData> => {
    await mockDelay();
    console.log("Using mock StatsSectionData");
    return mockStatsSectionData;
  };

export const fetchProjectCategoriesDataMock =
  async (): Promise<ProjectCategoriesData> => {
    await mockDelay();
    console.log("Using mock ProjectCategoriesData");
    return mockProjectCategoriesData;
  };

export const fetchProjectPageDataMock = async (): Promise<ProjectPageData> => {
  await mockDelay();
  console.log("Using mock ProjectPageData");
  return mockProjectPageData;
};

// ========== API FUNCTIONS ==========

// Error handling utility
const handleApiError = (error: any, section: string) => {
  console.error(`Error fetching ${section} data:`, error);
  throw new Error(`Failed to fetch ${section} data. Please try again later.`);
};

// API Functions for each section
export const fetchAboutProjectDataApi = async (): Promise<AboutProjectData> => {
  const cacheKey = getCacheKey('about-project');
  
  // Check cache first
  const cachedData = getFromCache<AboutProjectData>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // Use deduplication to prevent concurrent requests
  return withDeduplication(cacheKey, async () => {
    try {
      console.log('🌐 Fetching AboutProjectData from API...');
      const response = await fetch(`${API_BASE_URL}/projectpage/about-project`);
      const data: ApiResponse<AboutProjectData> = await response.json();

      console.log(`AboutProjectData from API: ${JSON.stringify(data)}`);
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch about project data");
      }

      // Cache the result
      setCache(cacheKey, data.data!);
      return data.data!;
    } catch (error) {
      handleApiError(error, "about project");
      throw error;
    }
  });
};

export const fetchStatsSectionDataApi = async (): Promise<StatsSectionData> => {
  const cacheKey = getCacheKey('stats-section');
  
  // Check cache first
  const cachedData = getFromCache<StatsSectionData>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // Use deduplication to prevent concurrent requests
  return withDeduplication(cacheKey, async () => {
    try {
      console.log('🌐 Fetching StatsSectionData from API...');
      const response = await fetch(`${API_BASE_URL}/projectpage/stats-section`);
      const data: ApiResponse<StatsSectionData> = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch stats section data");
      }

      // Cache the result
      setCache(cacheKey, data.data!);
      return data.data!;
    } catch (error) {
      handleApiError(error, "stats section");
      throw error;
    }
  });
};

export const fetchProjectCategoriesDataApi =
  async (): Promise<ProjectCategoriesData> => {
    const cacheKey = getCacheKey('project-categories');
    
    // Check cache first
    const cachedData = getFromCache<ProjectCategoriesData>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // Use deduplication to prevent concurrent requests
    return withDeduplication(cacheKey, async () => {
      try {
        console.log('🌐 Fetching ProjectCategoriesData from API...');
        const response = await fetch(
          `${API_BASE_URL}/projectpage/project-categories`
        );
        const data: ApiResponse<ProjectCategoriesData> = await response.json();
        if (!response.ok) {
          throw new Error(
            data.error || "Failed to fetch project categories data"
          );
        }

        // Cache the result
        setCache(cacheKey, data.data!);
        return data.data!;
      } catch (error) {
        handleApiError(error, "project categories");
        throw error;
      }
    });
  };

// Main function to fetch all project page data from API
export const fetchProjectPageDataApi = async (): Promise<ProjectPageData> => {
  const cacheKey = getCacheKey('complete-page');
  
  // Check cache first for complete page data
  const cachedData = getFromCache<ProjectPageData>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // Use deduplication to prevent concurrent requests for complete page
  return withDeduplication(cacheKey, async () => {
    try {
      console.log('🌐 Fetching complete ProjectPageData from API...');
      // Fetch all data in parallel for better performance
      const [aboutProject, statsSection, projectCategories] = await Promise.all([
        fetchAboutProjectDataApi(),
        fetchStatsSectionDataApi(),
        fetchProjectCategoriesDataApi(),
      ]);

      const completeData: ProjectPageData = {
        aboutProject,
        statsSection,
        projectCategories,
      };

      // Cache the complete page data
      setCache(cacheKey, completeData);
      return completeData;
    } catch (error) {
      handleApiError(error, "project page");
      throw error;
    }
  });
};

// ========== HYBRID FUNCTIONS (AUTO-SWITCH BETWEEN API AND MOCK) ==========

// Auto-switch functions based on configuration
export const fetchAboutProjectData = async (): Promise<AboutProjectData> => {
  return USE_MOCK_DATA
    ? fetchAboutProjectDataMock()
    : fetchAboutProjectDataApi();
};

export const fetchStatsSectionData = async (): Promise<StatsSectionData> => {
  return USE_MOCK_DATA
    ? fetchStatsSectionDataMock()
    : fetchStatsSectionDataApi();
};

export const fetchProjectCategoriesData =
  async (): Promise<ProjectCategoriesData> => {
    return USE_MOCK_DATA
      ? fetchProjectCategoriesDataMock()
      : fetchProjectCategoriesDataApi();
  };

// Main function to fetch all project page data (auto-switch)
export const fetchProjectPageData = async (): Promise<ProjectPageData> => {
  return USE_MOCK_DATA ? fetchProjectPageDataMock() : fetchProjectPageDataApi();
};

// ========== UTILITY FUNCTIONS ==========

/**
 * Appends project images to htmlContent with base64 BLOB data handling
 * @param htmlContent - The existing HTML content
 * @param projectImages - Array of base64 encoded image data
 * @param title - Project title for alt text
 * @returns Enhanced HTML content with images
 */
export const appendProjectImagesToHtml = (
  htmlContent: string,
  projectImages: string[],
  title: string
): string => {
  if (!projectImages || projectImages.length === 0) {
    return htmlContent;
  }

  // Function to process base64 image data
  const processImageData = (imageData: string): string => {
    // If it's already a data URL, return as is
    if (imageData.startsWith("data:image/")) {
      return imageData;
    }
    // If it's base64 without data URL prefix, add the prefix
    if (imageData.startsWith("/9j/") || imageData.startsWith("iVBORw0KGgo")) {
      return `data:image/jpeg;base64,${imageData}`;
    }
    // For backward compatibility with file paths, return as is
    return imageData;
  };

  // Create image gallery HTML
  const imageGalleryHtml = `
    <div style="">
      <div style="display: flex; flex-direction: column;">
        ${projectImages
          .map((imageData, index) => {
            const processedData = processImageData(imageData);
            return `
            <img 
              src="${processedData}" 
              alt="${title} - Hình ${index + 1}" 
              style="width: 100%; height: auto; object-fit: cover; margin-bottom: 1px; margin-top: 1px;"
              loading="lazy"
            />
          `;
          })
          .join("")}
      </div>
    </div>
  `;

  // Check if htmlContent already has an image gallery section
  const hasImageGallery =
    htmlContent.includes("Hình ảnh dự án") ||
    htmlContent.includes("project-images") ||
    htmlContent.includes("image-gallery");

  if (hasImageGallery) {
    // If gallery already exists, replace it with new images
    const galleryRegex =
      /<div[^>]*>[\s\S]*?Hình ảnh dự án[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i;
    if (galleryRegex.test(htmlContent)) {
      return htmlContent.replace(galleryRegex, imageGalleryHtml);
    }
  }

  // Append the image gallery to the end of htmlContent
  return htmlContent + imageGalleryHtml;
};

/**
 * Processes all image data in a project data object (handles both URLs and base64 BLOB data)
 * @param projectData - Project data object
 * @returns Project data with processed image data
 */
export const processProjectImageUrls = (projectData: any): any => {
  if (!projectData) return projectData;

  const processImageData = (imageData: string): string => {
    // If it's already a data URL, return as is
    if (imageData.startsWith("data:image/")) {
      return imageData;
    }
    // If it's base64 without data URL prefix, add the prefix
    if (imageData.startsWith("/9j/") || imageData.startsWith("iVBORw0KGgo")) {
      return `data:image/jpeg;base64,${imageData}`;
    }
    // For backward compatibility with file paths, return as is
    return imageData;
  };

  // Process thumbnail image
  if (projectData.thumbnailImage) {
    projectData.thumbnailImage = processImageData(projectData.thumbnailImage);
  }

  // Process project images array
  if (projectData.projectImages && Array.isArray(projectData.projectImages)) {
    projectData.projectImages = projectData.projectImages.map(processImageData);
  }

  return projectData;
};

// Utility function to check API health
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
};

// Utility function to get current data source
export const getCurrentDataSource = (): "mock" | "api" => {
  return USE_MOCK_DATA ? "mock" : "api";
};

// Utility function to get mock data directly
export const getMockData = () => ({
  aboutProject: mockAboutProjectData,
  statsSection: mockStatsSectionData,
  projectCategories: mockProjectCategoriesData,
  complete: mockProjectPageData,
});

// Cache management utilities
export const getCacheInfo = () => {
  const cacheEntries = Array.from(cache.entries()).map(([key, entry]) => ({
    key,
    size: JSON.stringify(entry.data).length,
    age: Date.now() - entry.timestamp,
    isValid: isValidCache(entry),
  }));

  const pendingEntries = Array.from(pendingRequests.keys());
  
  return {
    totalEntries: cache.size,
    entries: cacheEntries,
    totalSize: cacheEntries.reduce((sum, entry) => sum + entry.size, 0),
    pendingRequests: pendingEntries,
    totalPending: pendingRequests.size,
  };
};

export const clearSpecificCache = (endpoint: string): boolean => {
  const key = getCacheKey(endpoint);
  const cacheDeleted = cache.delete(key);
  const pendingDeleted = pendingRequests.delete(key);
  return cacheDeleted || pendingDeleted;
};

// Export mock data for direct access
export {
  mockAboutProjectData,
  mockStatsSectionData,
  mockProjectCategoriesData,
  mockProjectPageData,
  mockStatsItems,
  mockProjectCategories,
};
