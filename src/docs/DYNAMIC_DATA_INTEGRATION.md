# Dynamic Data Integration Guide

## Overview

The PG Design website has been refactored to use a service-based architecture for data fetching instead of hardcoded static data. This guide explains how the system works and how to customize it for production use.

## Architecture

### Components Structure

```
src/
├── types/
│   └── homePageTypes.ts          # TypeScript interfaces for all data
├── services/
│   └── homePageService.ts        # API service with mock data
├── components/
│   └── LoadingSpinner.tsx        # Loading states component
├── pages/
│   └── homePage/
│       └── HomePage.tsx          # Updated to use service
└── docs/
    └── DYNAMIC_DATA_INTEGRATION.md
```

### Data Flow

1. **HomePage component** calls `fetchHomePageData()` on mount
2. **HomePageService** fetches data from APIs (currently mocked)
3. **Loading states** are shown while data is being fetched
4. **Error handling** with retry functionality
5. **Components receive data** as props instead of hardcoded values

## Current Implementation

### Mock Data Service

The `homePageService.ts` currently uses mock data with simulated API delays:

```typescript
// Current mock implementation
export const fetchHeroData = async (): Promise<HeroData> => {
  try {
    await delay(500); // Simulate API call
    
    // In production, this would be:
    // const response = await fetch(`${API_BASE_URL}/hero`);
    // return await response.json();
    
    return {
      images: [/* mock data */]
    };
  } catch (error) {
    handleApiError(error, 'hero');
    throw error;
  }
};
```

### Environment Configuration

The service uses environment variables for API configuration:

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 10000; // 10 seconds
```

## Converting to Real APIs

### Step 1: Update Environment Variables

Create a `.env` file in your project root:

```env
# Development
REACT_APP_API_URL=http://localhost:3001/api

# Production
REACT_APP_API_URL=https://your-api-domain.com/api
```

### Step 2: Implement Real API Calls

Replace mock data with actual API calls in `homePageService.ts`:

```typescript
export const fetchHeroData = async (): Promise<HeroData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hero`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(API_TIMEOUT)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    handleApiError(error, 'hero');
    throw error;
  }
};
```

### Step 3: Backend API Endpoints

Your backend should provide these endpoints:

```
GET /api/hero              # Hero section data
GET /api/about             # About section data  
GET /api/image-slider      # Image slider data
GET /api/stats             # Statistics data
GET /api/solution          # Solution section data
GET /api/workflow          # Workflow data
GET /api/project-diary     # Project diary data
GET /api/testimonials      # Testimonials data
GET /api/consultation-form # Form configuration data
GET /api/homepage          # All data in one request (recommended)
GET /api/health            # Health check endpoint
```

### Step 4: Expected API Response Format

Each endpoint should return data matching the TypeScript interfaces:

```json
// GET /api/hero
{
  "images": [
    "https://cdn.example.com/hero1.jpg",
    "https://cdn.example.com/hero2.jpg"
  ]
}

// GET /api/about  
{
  "headline": "MỖI THIẾT KẾ LÀ MỘT CÂU CHUYỆN",
  "subHeadline": "MỖI CÔNG TRÌNH LÀ MỘT DẤU ẤN", 
  "description": "Thành lập từ năm 2022..."
}

// GET /api/homepage (recommended approach)
{
  "hero": { "images": [...] },
  "about": { "headline": "...", ... },
  "imageSlider": [...],
  "stats": { "header": {...}, "items": [...] },
  "solution": { "header": {...}, "solutions": [...] },
  "workflow": { "title": "...", "workflows": [...] },
  "projectDiary": { "title": "...", "images": [...] },
  "testimonials": { "header": {...}, "testimonials": [...] },
  "consultationForm": { "title": "...", "projectTypes": [...] }
}
```

## Customizing Components

### Adding New Data Fields

1. **Update TypeScript interfaces** in `homePageTypes.ts`:

```typescript
export interface AboutData {
  headline: string;
  subHeadline: string;
  description: string;
  newField: string; // Add new field
}
```

2. **Update service** to return new data:

```typescript
export const fetchAboutData = async (): Promise<AboutData> => {
  // ... existing code
  return {
    headline: "...",
    subHeadline: "...", 
    description: "...",
    newField: "New data" // Add new field
  };
};
```

3. **Update component** to use new data:

```typescript
const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <section>
      <h1>{data.headline}</h1>
      <h2>{data.subHeadline}</h2>
      <p>{data.description}</p>
      <p>{data.newField}</p> {/* Use new field */}
    </section>
  );
};
```

### Adding Loading States to Individual Sections

For granular loading states, you can fetch data per section:

```typescript
const HomePage: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);
  
  useEffect(() => {
    const loadHeroData = async () => {
      setHeroLoading(true);
      try {
        const data = await fetchHeroData();
        setHeroData(data);
      } catch (error) {
        // Handle error
      } finally {
        setHeroLoading(false);
      }
    };
    
    loadHeroData();
  }, []);

  return (
    <div>
      {heroLoading ? (
        <LoadingSpinner text="Đang tải hero..." />
      ) : (
        <HeroSection data={heroData} />
      )}
    </div>
  );
};
```

## Production Optimizations

### 1. Image Optimization

Use optimized image URLs from CDN:

```typescript
// In production service
return {
  images: [
    "https://cdn.pgdesign.com/hero-1-optimized.webp",
    "https://cdn.pgdesign.com/hero-2-optimized.webp"
  ]
};
```

### 2. Caching Strategy

Implement caching for static data:

```typescript
const cache = new Map();

export const fetchWithCache = async (key: string, fetchFn: Function) => {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const data = await fetchFn();
  cache.set(key, data);
  return data;
};
```

### 3. Error Boundaries

Add React Error Boundaries for better error handling:

```typescript
import { ErrorBoundary } from 'react-error-boundary';

const HomePage = () => (
  <ErrorBoundary fallback={<ErrorFallback />}>
    <HomePageContent />
  </ErrorBoundary>
);
```

### 4. Performance Monitoring

Add performance tracking:

```typescript
export const fetchHomePageData = async (): Promise<HomePageData> => {
  const startTime = performance.now();
  
  try {
    const data = await Promise.all([/* API calls */]);
    
    const loadTime = performance.now() - startTime;
    console.log(`Homepage data loaded in ${loadTime}ms`);
    
    return data;
  } catch (error) {
    // Error tracking
    throw error;
  }
};
```

## Testing

### Mock Service for Tests

Create a test version of the service:

```typescript
// __tests__/mockHomePageService.ts
export const mockFetchHomePageData = async (): Promise<HomePageData> => {
  return {
    hero: { images: ['test1.jpg', 'test2.jpg'] },
    about: { headline: 'Test', subHeadline: 'Test', description: 'Test' },
    // ... other mock data
  };
};
```

### Component Testing

Test components with mock data:

```typescript
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

jest.mock('../services/homePageService', () => ({
  fetchHomePageData: () => Promise.resolve(mockData)
}));

test('renders homepage with loaded data', async () => {
  render(<HomePage />);
  
  // Wait for loading to complete
  await waitForElementToBeRemoved(screen.getByText('Đang tải...'));
  
  // Assert data is displayed
  expect(screen.getByText('MỖI THIẾT KẾ LÀ MỘT CÂU CHUYỆN')).toBeInTheDocument();
});
```

## Best Practices

1. **Always handle loading states** for better UX
2. **Implement retry mechanisms** for failed requests
3. **Use TypeScript interfaces** to ensure type safety
4. **Cache static data** to improve performance
5. **Monitor API performance** and implement fallbacks
6. **Use environment variables** for different environments
7. **Implement proper error logging** for production debugging

## Migration Checklist

- [ ] Set up backend API endpoints
- [ ] Update environment variables
- [ ] Replace mock API calls with real ones
- [ ] Test all data fetching scenarios
- [ ] Implement proper error handling
- [ ] Add performance monitoring
- [ ] Set up image CDN for optimized loading
- [ ] Test loading states and error states
- [ ] Deploy and monitor in production

## Support

For questions about this implementation, refer to:
- TypeScript interfaces in `src/types/homePageTypes.ts`
- Service implementation in `src/services/homePageService.ts`  
- Component usage examples in `src/pages/homePage/HomePage.tsx` 