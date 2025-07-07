# Intro Page Service Documentation

This service provides data for the intro page with support for both **mock data** and **real API calls**.

## Features

- **Hybrid Data Source**: Switch between mock data and API calls
- **Complete Mock Data**: Full Vietnamese content for all intro page sections
- **API Integration**: Real backend API calls with error handling
- **Environment Configuration**: Easy switching via environment variables

## Configuration

### Environment Variables

Add to your `.env` file:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3002/api/v1

# Data Source Configuration
# Set to 'true' to use mock data
# Set to 'false' or remove to use API calls
REACT_APP_USE_MOCK_DATA=false
```

### Data Source Options

1. **API Mode** (default): `REACT_APP_USE_MOCK_DATA=false`
   - Fetches data from backend API
   - Requires backend server running
   - Real database data

2. **Mock Mode**: `REACT_APP_USE_MOCK_DATA=true`
   - Uses local mock data
   - No backend required
   - Simulated API delays
   - Perfect for development

## Available Functions

### Auto-Switch Functions (Recommended)
```typescript
// Automatically switches between mock/API based on environment
import { 
  fetchIntroPageData,
  fetchAboutIntroData,
  fetchVisionMissionData,
  fetchCommitmentsData,
  fetchTeamData
} from '../services/introPageService';
```

### Explicit API Functions
```typescript
// Always uses API calls
import { 
  fetchIntroPageDataApi,
  fetchAboutIntroDataApi,
  fetchVisionMissionDataApi,
  fetchCommitmentsDataApi,
  fetchTeamDataApi
} from '../services/introPageService';
```

### Explicit Mock Functions
```typescript
// Always uses mock data
import { 
  fetchIntroPageDataMock,
  fetchAboutIntroDataMock,
  fetchVisionMissionDataMock,
  fetchCommitmentsDataMock,
  fetchTeamDataMock
} from '../services/introPageService';
```

### Direct Mock Data Access
```typescript
// Get mock data directly
import { 
  mockAboutIntroData,
  mockVisionMissionData,
  mockCommitmentsData,
  mockTeamData,
  mockIntroPageData,
  getMockData
} from '../services/introPageService';

// Get all mock data
const allMockData = getMockData();
```

## Utility Functions

```typescript
import { 
  getCurrentDataSource,
  checkApiHealth
} from '../services/introPageService';

// Check if using mock or API
const dataSource = getCurrentDataSource(); // 'mock' | 'api'

// Check if API is healthy
const isApiHealthy = await checkApiHealth();
```

## Usage Examples

### Basic Usage (Auto-Switch)
```typescript
import React, { useState, useEffect } from 'react';
import { fetchIntroPageData } from '../services/introPageService';

const IntroPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const introData = await fetchIntroPageData();
        setData(introData);
      } catch (error) {
        console.error('Failed to load intro data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ... component JSX
};
```

### Force Mock Data
```typescript
import { fetchIntroPageDataMock } from '../services/introPageService';

// Always use mock data regardless of environment
const introData = await fetchIntroPageDataMock();
```

### Force API Data
```typescript
import { fetchIntroPageDataApi } from '../services/introPageService';

// Always use API regardless of environment
const introData = await fetchIntroPageDataApi();
```

## Mock Data Content

The mock data includes complete Vietnamese content for:

- **About Intro**: Brand title, subtitle, identity, descriptions, background image
- **Vision Mission**: Vision, mission items, core values with detailed descriptions
- **Commitments**: 6 commitment items with icons and descriptions
- **Team**: Board directors and team members with roles

## Development Tips

1. **Start with Mock Data**: Set `REACT_APP_USE_MOCK_DATA=true` for initial development
2. **Test API Integration**: Switch to `false` to test with real backend
3. **Error Handling**: Both mock and API functions include proper error handling
4. **Performance**: Mock functions include realistic delays to simulate API calls

## Error Handling

```typescript
try {
  const data = await fetchIntroPageData();
  // Handle successful data
} catch (error) {
  // Handle errors (network, validation, etc.)
  console.error('Data fetch failed:', error.message);
}
```

## File Structure

```
src/services/introPageService.ts
├── Mock Data Section
│   ├── mockAboutIntroData
│   ├── mockVisionMissionData
│   ├── mockCommitmentsData
│   └── mockTeamData
├── Mock Functions
│   ├── fetchAboutIntroDataMock()
│   ├── fetchVisionMissionDataMock()
│   ├── fetchCommitmentsDataMock()
│   └── fetchTeamDataMock()
├── API Functions
│   ├── fetchAboutIntroDataApi()
│   ├── fetchVisionMissionDataApi()
│   ├── fetchCommitmentsDataApi()
│   └── fetchTeamDataApi()
└── Hybrid Functions (Auto-Switch)
    ├── fetchAboutIntroData()
    ├── fetchVisionMissionData()
    ├── fetchCommitmentsData()
    └── fetchTeamData()
```

This architecture provides maximum flexibility for development and production environments. 