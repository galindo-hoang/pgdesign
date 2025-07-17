# Service Page Service Documentation

## Overview
The `servicePageService.ts` provides functionality to fetch service page data either from API endpoints or from mock data, controlled by environment variables.

## Environment Configuration

### USE_MOCK_DATA Flag
You can control the data source using the `REACT_APP_USE_MOCK_DATA` environment variable:

#### To use Mock Data:
```bash
# In your .env file
REACT_APP_USE_MOCK_DATA=true
```

#### To use API Data:
```bash
# In your .env file
REACT_APP_USE_MOCK_DATA=false
# OR simply don't set the variable (defaults to API)
```

### API Configuration
```bash
# Base URL for API endpoints (optional)
REACT_APP_API_URL=http://localhost:3002/api
```

## Data Flow

### When USE_MOCK_DATA=true:
1. Service immediately returns mock data
2. No API calls are made
3. Faster loading for development/testing

### When USE_MOCK_DATA=false (default):
1. Service attempts to fetch data from API
2. If API call fails, automatically falls back to mock data
3. Console logs indicate whether data came from API or fallback

## Available Functions

### Main Data Fetching
- `fetchServicePageData()`: Main function that respects the USE_MOCK_DATA flag

### Utility Functions
- `isUsingMockData()`: Returns boolean indicating if mock data is being used
- `getDataSourceInfo()`: Returns configuration info for debugging
- `checkApiHealth()`: Checks if API endpoint is responding

### Individual Section Fetchers (Mock Data)
- `fetchHeroContentData()`
- `fetchServicesData()`
- `fetchProcessSection1Data()` through `fetchProcessSection4Data()`
- `fetchConstructionSection1Data()` through `fetchConstructionSection4Data()`

## Usage Example

```typescript
import { 
  fetchServicePageData, 
  isUsingMockData, 
  getDataSourceInfo 
} from '../services/servicePageService';

// Check current configuration
console.log('Data source info:', getDataSourceInfo());
console.log('Using mock data:', isUsingMockData());

// Fetch data (respects USE_MOCK_DATA flag)
const serviceData = await fetchServicePageData();
```

## Development Tips

1. **For Development**: Set `REACT_APP_USE_MOCK_DATA=true` for faster iteration
2. **For Testing API**: Set `REACT_APP_USE_MOCK_DATA=false` to test API integration
3. **For Production**: Ensure `REACT_APP_USE_MOCK_DATA` is not set or set to `false`

## Console Logging
The service provides helpful console logs to indicate:
- Whether mock data or API is being used
- API call success/failure
- Fallback to mock data when API fails 