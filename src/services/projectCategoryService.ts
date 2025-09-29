import {
  ProjectCategory,
  ProjectDetail,
  CategoryInfo,
  ApiResponse,
} from "../types/projectCategoryPageTypes";

import { additionalProjectData } from "./additionalProjectData";

import houseNormal from "../assets/images/projectpage/house-normal.png";
import appartment from "../assets/images/projectpage/appartment.png";
import houseBusiness from "../assets/images/projectpage/house-business.png";
import village from "../assets/images/projectpage/village.png";

// API Configuration
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3002/api/v1";
const API_TIMEOUT = 10000; // 10 seconds

// Configuration for data source
const USE_MOCK_DATA = false;

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Retry helper function
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  retries: number = MAX_RETRIES,
  delay: number = RETRY_DELAY
): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && error.name !== 'AbortError') {
      console.log(`🔄 Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryWithBackoff(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Cache storage
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

// Cache helper functions
const getCacheKey = (key: string): string => `projectCategory-${key}`;

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

// Request deduplication with stronger singleton pattern
const pendingRequests = new Map<string, Promise<any>>();
const requestCounters = new Map<string, number>();

const withDeduplication = async <T>(key: string, requestFn: () => Promise<T>): Promise<T> => {
  // Increment request counter
  const currentCount = (requestCounters.get(key) || 0) + 1;
  requestCounters.set(key, currentCount);
  
  console.log(`🚨 Request #${currentCount} for ${key}`);
  
  if (pendingRequests.has(key)) {
    console.log(`⏳ BLOCKING duplicate request #${currentCount} for ${key} - using existing promise`);
    return pendingRequests.get(key)!;
  }

  console.log(`🟢 EXECUTING first request for ${key}`);
  const promise = requestFn().finally(() => {
    console.log(`🔚 Request completed for ${key}, cleaning up...`);
    pendingRequests.delete(key);
    // Reset counter after a delay to allow new requests
    setTimeout(() => requestCounters.delete(key), 1000);
  });
  
  pendingRequests.set(key, promise);
  return promise;
};

// ========== MOCK DATA ==========

// Mock categories mapping (matching our seeded data)
const mockCategoriesData: Record<string, Omit<ProjectCategory, "projects">> = {
  "house-normal": {
    id: 1,
    categoryId: "house-normal",
    title: "NHÀ PHỐ",
    description:
      "Thiết kế nhà phố hiện đại, tối ưu hóa không gian và ánh sáng tự nhiên cho cuộc sống đô thị.",
    heroImageUrl: houseNormal,
    heroImageBlob: undefined, // Will be populated from database
    displayOrder: 0,
    isActive: true,
    projectCount: 25,
  },
  appartment: {
    id: 2,
    categoryId: "appartment",
    title: "CĂN HỘ",
    description:
      "Hòa quyện kiến trúc với thiên nhiên, tạo nên không gian sống xanh và thư thái.",
    heroImageUrl: appartment,
    heroImageBlob: undefined, // Will be populated from database
    displayOrder: 1,
    isActive: true,
    projectCount: 18,
  },
  village: {
    id: 3,
    categoryId: "village",
    title: "BIỆT THỰ",
    description:
      "Thi công phần thô với chất lượng cao, đảm bảo kết cấu vững chắc cho công trình.",
    heroImageUrl: village,
    heroImageBlob: undefined, // Will be populated from database
    displayOrder: 2,
    isActive: true,
    projectCount: 12,
  },
  "house-business": {
    id: 4,
    categoryId: "house-business",
    title: "THƯƠNG MẠI",
    description:
      "Thiết kế và thi công nội thất sang trọng, hiện đại phù hợp với phong cách sống.",
    heroImageUrl: houseBusiness,
    heroImageBlob: undefined, // Will be populated from database
    displayOrder: 3,
    isActive: true,
    projectCount: 30,
  },
};

// ========== MOCK FUNCTIONS ==========

const fetchCategoryWithProjectsMock = async (
  categoryId: string
): Promise<ProjectCategory> => {
  console.log(`🎭 Mock Data: Fetching category ${categoryId} with projects`);
  // await delay(800);

  const categoryInfo = mockCategoriesData[categoryId];
  if (!categoryInfo) {
    throw new Error(`Category ${categoryId} not found`);
  }
  const projects =
    additionalProjectData[categoryId as keyof typeof additionalProjectData];

  return {
    ...categoryInfo,
    projects: projects,
    projectCount: projects.length,
  };
};

const fetchCategoryProjectForHomePageMock = async (): Promise<
  ProjectDetail[]
> => {
  console.log(
    `🎭 Mock Data: Fetching projects for HomePage (isOnHomePage: true)`
  );
  // await delay(800);

  // Get all projects from additional data and filter by isOnHomePage flag
  const allProjects: ProjectDetail[] = [];

  // Collect projects from all categories
  Object.values(additionalProjectData).forEach((categoryProjects) => {
    allProjects.push(...categoryProjects);
  });

  // Filter projects that are marked for homepage display
  const homePageProjects = allProjects.filter(
    (project) => project.isOnHomePage === true
  );

  console.log(
    `Found ${homePageProjects.length} projects for homepage out of ${allProjects.length} total projects`
  );

  return homePageProjects;
};

// ========== API FUNCTIONS ==========

const fetchCategoryWithProjectsApi = async (
  categoryId: string
): Promise<ProjectCategory> => {
  const cacheKey = getCacheKey(`category-${categoryId}`);
  
  // Check cache first
  const cachedData = getFromCache<ProjectCategory>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // Use deduplication to prevent concurrent requests
  return withDeduplication(cacheKey, async () => {
    return retryWithBackoff(async () => {
      const timestamp = new Date().toISOString();
      console.log(`🌐 Real API [${timestamp}]: Fetching category ${categoryId} with projects`);

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

      try {
        const response = await fetch(
          `${API_BASE_URL}/projectdetail/category/${categoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const projectsData: ApiResponse<ProjectDetail[]> = await response.json();

        if (!projectsData.success) {
          throw new Error(projectsData.message || "Failed to fetch projects data");
        }

        // Get category info (you might need a separate API call for this)
        const categoryInfo: CategoryInfo = mockCategoriesData[categoryId] || {
          id: 1,
          categoryId: categoryId,
          title: categoryId.toUpperCase().replace(/-/g, " "),
          description: `Category ${categoryId}`,
          heroImageUrl: "/assets/images/default-hero.png",
          displayOrder: 0,
          isActive: true,
        };

        const result = {
          ...categoryInfo,
          projects: projectsData.data,
          projectCount: projectsData.data.length,
        };

        // Cache the result
        setCache(cacheKey, result);
        return result;

      } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          console.warn(`Request timeout for category ${categoryId}`);
          throw new Error(`Request timeout - please try again`);
        }
        throw error;
      }
    });
  });
};

const fetchCategoryProjectForHomePageApi = async (): Promise<
  ProjectDetail[]
> => {
  try {
    console.log(
      `🌐 Real API: Fetching projects for HomePage (isOnHomePage: true)`
    );

    const response = await fetch(`${API_BASE_URL}/projectdetail/homepage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(API_TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const projectsData: ApiResponse<ProjectDetail[]> = await response.json();

    if (!projectsData.success) {
      throw new Error(
        projectsData.message || "Failed to fetch homepage projects data"
      );
    }

    console.log(
      `Found ${projectsData.data.length} projects for homepage from API`
    );

    return projectsData.data;
  } catch (error: any) {
    console.error(`Error fetching homepage projects:`, error);
    throw new Error(`Failed to fetch homepage projects data: ${error.message}`);
  }
};

// ========== EXPORTED FUNCTIONS ==========

/**
 * Fetch category with all its projects (Direct relationship: category -> projects)
 */
export const fetchCategoryWithProjects = async (
  categoryId: string
): Promise<ProjectCategory> => {
  const dataSource = USE_MOCK_DATA ? "🎭 Mock Data" : "🌐 Real API";
  console.log(`${dataSource}: Fetching category ${categoryId} with projects`);

  // hello
  return USE_MOCK_DATA
    ? fetchCategoryWithProjectsMock(categoryId)
    : fetchCategoryWithProjectsApi(categoryId);
};

/**
 * Get current data source
 */
export const getCurrentDataSource = (): "mock" | "api" => {
  return USE_MOCK_DATA ? "mock" : "api";
};

/**
 * Get all available categories
 */
export const getAvailableCategories = (): string[] => {
  return Object.keys(mockCategoriesData);
};

export const fetchCategoryProjectForHomePage = async (): Promise<
  ProjectDetail[]
> => {
  const dataSource = USE_MOCK_DATA ? "🎭 Mock Data" : "🌐 Real API";
  console.log(
    `${dataSource}: Fetching projects for HomePage (isOnHomePage: true)`
  );

  return USE_MOCK_DATA
    ? fetchCategoryProjectForHomePageMock()
    : fetchCategoryProjectForHomePageApi();
};

// For backward compatibility (deprecated - use fetchCategoryWithProjects instead)
export const fetchCategoryWithSubCategories = fetchCategoryWithProjects;
