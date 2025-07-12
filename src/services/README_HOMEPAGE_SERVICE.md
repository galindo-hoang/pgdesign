# Homepage Service Configuration

## Overview
The Homepage Service supports both mock data and real API calls, controlled by the `USE_MOCK_DATA` environment variable.

## Environment Variables

Create a `.env` file in your project root with the following configuration:

```env
# Homepage Service Configuration
# Set to 'true' to use mock data, 'false' or leave undefined to use real API
REACT_APP_USE_MOCK_DATA=true

# API Configuration
# Base URL for the backend API
REACT_APP_API_URL=http://localhost:3002/api/v1
```

## Usage Modes

### 1. Mock Data Mode (Development)
- **Environment Variable**: `REACT_APP_USE_MOCK_DATA=true`
- **Purpose**: For development, testing, and when backend is not available
- **Features**: 
  - Uses predefined mock data
  - Simulates API delays for realistic testing
  - No network requests made
  - Faster development cycle

### 2. Real API Mode (Production)
- **Environment Variable**: `REACT_APP_USE_MOCK_DATA=false` or leave undefined
- **Purpose**: For production and integration testing
- **Features**:
  - Makes actual HTTP requests to backend
  - Handles real API responses
  - Proper error handling
  - CORS support

## API Endpoints

When using Real API Mode, the service calls these endpoints:

- `GET /homepage` - Get all homepage data at once
- `GET /homepage/hero` - Get hero section data
- `GET /homepage/about` - Get about section data
- `GET /homepage/image-slider` - Get image slider data
- `GET /homepage/stats` - Get stats section data
- `GET /homepage/solution` - Get solution section data
- `GET /homepage/workflow` - Get workflow section data
- `GET /homepage/project-diary` - Get project diary data
- `GET /homepage/testimonials` - Get testimonials data
- `GET /homepage/consultation-form` - Get consultation form data
- `GET /health` - API health check

## Console Logging

The service automatically logs its current mode:
- 🎭 Mock Data Mode: `🏠 Homepage Service Mode: 🎭 Mock Data`
- 🌐 Real API Mode: `🏠 Homepage Service Mode: 🌐 Real API`

## Example Usage

```typescript
import { fetchHomePageData, checkApiHealth } from './homePageService';

// Check API health
const isHealthy = await checkApiHealth();

// Fetch all homepage data
const homepageData = await fetchHomePageData();

// Fetch individual sections
const heroData = await fetchHeroData();
const aboutData = await fetchAboutData();
```

## Data Structure

The service returns data in the following format:

```typescript
interface HomePageData {
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
```

## Error Handling

- Network errors are caught and logged
- Fallback error messages provided
- Timeout protection (10 seconds)
- Graceful degradation

## Development Tips

1. **Start with Mock Data**: Set `REACT_APP_USE_MOCK_DATA=true` for initial development
2. **Switch to Real API**: Set `REACT_APP_USE_MOCK_DATA=false` when backend is ready
3. **Check Console**: Monitor console logs to verify which mode is active
4. **Test Both Modes**: Ensure your app works in both mock and real API modes 