# Service Page Service Implementation

## Overview
The Service Page now uses dynamic data through the `servicePageService` instead of static data hardcoded in the component.

## Architecture

### Files Created
1. **src/types/servicePageTypes.ts** - TypeScript interfaces for service page data
2. **src/services/servicePageService.ts** - Service layer for fetching service page data
3. **src/services/README_SERVICE_PAGE.md** - This documentation file

### Files Modified
1. **src/pages/servicePage/ServicePage.tsx** - Updated to use dynamic data with fallback

## Type Definitions

### ServicePageData
Main interface containing all service page data:
- `heroContent`: Hero section content
- `services`: Array of service items
- `processSection1-4`: Data for the 4 service process sections
- `constructionSection1-4`: Data for the 4 construction service sections

### Individual Types
- `HeroContent`: Hero section data (title, brand, description, image)
- `ServiceItem`: Individual service cards
- `ServiceProcessData`: Process section data
- `ConstructionServiceData`: Construction service section data

## Service Functions

### Individual Fetch Functions
- `fetchHeroContentData()`: Fetches hero section data
- `fetchServicesData()`: Fetches services array
- `fetchProcessSection1Data()` - `fetchProcessSection4Data()`: Fetches process sections
- `fetchConstructionSection1Data()` - `fetchConstructionSection4Data()`: Fetches construction sections

### Main Function
- `fetchServicePageData()`: Fetches all service page data in parallel

## Implementation Features

### 1. Dynamic Data Loading
- Uses async/await for data fetching
- Parallel loading of all sections for better performance
- Simulated API delays for realistic behavior

### 2. Error Handling
- Comprehensive error handling for each section
- Fallback to mock data when API fails
- Loading states and error messages

### 3. Mock Data Fallback
- Complete mock data structure preserved
- Automatic fallback when service fails
- Maintains same functionality as before

### 4. Loading States
- Loading spinner during data fetch
- Error display with retry option
- Graceful degradation

## Usage

The ServicePage component now:
1. Shows loading spinner during data fetch
2. Displays error message if data fetch fails completely
3. Uses fetched data or falls back to mock data
4. Maintains the same UI/UX as before

## API Integration

When real API is available, update the service functions to:
1. Replace mock data with actual fetch calls
2. Update API endpoints in the service functions
3. Adjust error handling as needed

## Migration Notes

- All original static data is preserved as mock data
- Component behavior remains identical
- Ready for real API integration
- No breaking changes to existing functionality 