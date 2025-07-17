# Project Category Page Implementation

## Overview

The ProjectCategoryPage component has been redesigned to work with the new database structure featuring project categories, subcategories, and project details. This implementation fetches data from the backend API and displays subcategories with project overview information.

## Architecture

### 1. Database Structure

```
project_categories (1) ←→ (N) project_sub_categories ←→ (N) project_details
```

- **project_categories**: Main category data (e.g., "NHÀ PHỐ", "NHÀ VƯỜN")
- **project_sub_categories**: Subcategories within each category (e.g., "Nhà Ống", "Nhà Liền Kề")
- **project_details**: Individual project data with full details

### 2. Frontend Structure

```
src/
├── types/projectCategoryPageTypes.ts    # TypeScript interfaces
├── services/projectCategoryService.ts  # API service functions
├── pages/ProjectCategoryPage.tsx        # Main component
└── pages/ProjectCategoryPage.css        # Styles
```

## Key Features

### 1. URL Parameter Handling

**Route Parameter**: `project_category_id`
- Component receives category ID from URL (e.g., `/category/house-normal`)
- Fetches all subcategories and projects for that category

### 2. Enhanced Subcategory Navigation

Each subcategory card displays:
- **Title**: Subcategory name
- **Description**: Brief description of the subcategory
- **Project Count**: Number of projects in subcategory
- **Project Overview**: First 3 projects showing:
  - Thumbnail image
  - Area (e.g., "150m²")
  - Address
  - Client name

### 3. Data Flow

```
URL Parameter → Service Function → Component State → UI Rendering
```

1. **URL**: `/category/house-normal`
2. **Service**: `fetchCategoryWithSubCategories("house-normal")`
3. **Data**: Category + Subcategories + Projects
4. **UI**: Navigation cards + Active subcategory content

## TypeScript Interfaces

### Core Types

```typescript
interface ProjectSubCategory {
  id: number;
  projectCategoryId: number;
  subCategoryId: string;
  title: string;
  description?: string;
  heroImageUrl?: string;
  displayOrder: number;
  projectCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectDetail {
  id: number;
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  address: string;
  thumbnailImage?: string;
  // ... other fields
}

interface ProjectCategory {
  id: number;
  categoryId: string;
  title: string;
  description?: string;
  heroImageUrl?: string;
  subCategories: ProjectSubCategoryWithProjects[];
}
```

## Service Functions

### Mock Data Support

The service supports both mock data and real API calls:

```typescript
// Environment variable controls data source
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

// Main service function
export const fetchCategoryWithSubCategories = async (categoryId: string): Promise<ProjectCategory> => {
  return USE_MOCK_DATA 
    ? fetchCategoryWithSubCategoriesMock(categoryId)
    : fetchCategoryWithSubCategoriesApi(categoryId);
};
```

### API Endpoints

```typescript
// Get category with subcategories
GET /api/v1/categories/{categoryId}/subcategories

// Get projects for specific subcategory
GET /api/v1/categories/{categoryId}/subcategories/{subCategoryId}/projects
```

## Component Implementation

### State Management

```typescript
const [categoryData, setCategoryData] = useState<ProjectCategory | null>(null);
const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

### Effect Hook

```typescript
useEffect(() => {
  const loadData = async () => {
    if (project_category_id) {
      const categoryResult = await fetchCategoryWithSubCategories(project_category_id);
      setCategoryData(categoryResult);
      // Set first subcategory as active
      if (categoryResult.subCategories.length > 0) {
        setActiveSubCategory(categoryResult.subCategories[0].subCategoryId);
      }
    }
  };
  loadData();
}, [project_category_id]);
```

## UI Components

### 1. Category Header

```tsx
<div className="category-header" style={{
  backgroundImage: `url(${categoryData.heroImageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}}>
  <div className="floating-particles"></div>
  <div className="category-header-content">
    <h1 className="category-title">{categoryData.title}</h1>
    <p className="category-description">{categoryData.description}</p>
  </div>
</div>
```

### 2. Subcategory Navigation

```tsx
<div className="subcategory-nav-container">
  {categoryData.subCategories.map((subCategory) => (
    <div key={subCategory.id} className="subcategory-nav-wrapper">
      <button className={`subcategory-nav-item ${activeSubCategory === subCategory.subCategoryId ? "active" : ""}`}>
        <div className="subcategory-nav-content">
          <h3>{subCategory.title}</h3>
          <p>{subCategory.description}</p>
          <div className="subcategory-projects-overview">
            <span className="project-count">{subCategory.projectCount} dự án</span>
            {subCategory.projects.slice(0, 3).map((project) => (
              <div key={project.id} className="project-overview-item">
                <img src={project.thumbnailImage} alt={project.title} />
                <div className="project-info">
                  <span className="project-area">{project.area}</span>
                  <span className="project-address">{project.address}</span>
                  <span className="project-client">{project.clientName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </button>
    </div>
  ))}
</div>
```

### 3. Project Grid

```tsx
<div className="projects-grid">
  {activeSubCategoryData.projects.map((projectDetail) => {
    const projectItem = {
      id: projectDetail.projectId,
      title: projectDetail.title,
      thumbnailImage: projectDetail.thumbnailImage,
      clientName: projectDetail.clientName,
      area: projectDetail.area,
      // ... transform other fields
    };
    
    return (
      <ProjectItemCard
        key={projectDetail.id}
        project={projectItem}
        onClick={(project) => handleProjectClick(projectDetail)}
      />
    );
  })}
</div>
```

## Styling

### Key CSS Classes

- `.subcategory-nav-container`: Grid layout for subcategory cards
- `.subcategory-nav-item`: Individual subcategory card with hover effects
- `.subcategory-nav-item.active`: Active state with blue gradient
- `.project-overview-item`: Individual project preview in navigation
- `.project-thumbnail`: Small project image (40x40px)
- `.project-info`: Project details (area, address, client)

### Responsive Design

```css
@media (max-width: 768px) {
  .subcategory-nav-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .project-thumbnail {
    width: 32px;
    height: 32px;
  }
}
```

## Navigation Flow

### From Project Page

```typescript
// In ProjectPage component
const handleCategoryClick = (categoryId: string) => {
  navigate(`/category/${categoryId}`);
};
```

### Project Category Page Route

```typescript
// In App.tsx or routing configuration
<Route path="/category/:project_category_id" element={<ProjectCategoryPage />} />
```

## Error Handling

### Loading States

```typescript
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
if (!categoryData) return <NotFoundMessage />;
```

### Service Error Handling

```typescript
try {
  const categoryResult = await fetchCategoryWithSubCategories(project_category_id);
  setCategoryData(categoryResult);
} catch (err) {
  console.error('Error loading project category data:', err);
  setError('Failed to load category data');
}
```

## Performance Optimizations

### 1. Image Optimization

- Project thumbnails are sized at 40x40px for navigation
- Lazy loading can be implemented for project grid
- WebP format support for better compression

### 2. Data Caching

- Service functions can implement caching
- React Query or SWR can be added for better data management

### 3. Code Splitting

- Component can be lazy-loaded
- Routes can be split for better performance

## Environment Configuration

### Environment Variables

```env
# Data source configuration
REACT_APP_USE_MOCK_DATA=true

# API configuration
REACT_APP_API_URL=http://localhost:3002/api/v1
```

### Development vs Production

```typescript
// Mock data for development
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

// API health check
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
};
```

## Testing

### Unit Tests

```typescript
// Test component rendering
describe('ProjectCategoryPage', () => {
  it('renders category data correctly', () => {
    render(<ProjectCategoryPage />);
    expect(screen.getByText('NHÀ PHỐ')).toBeInTheDocument();
  });
});

// Test service functions
describe('projectCategoryService', () => {
  it('fetches category data successfully', async () => {
    const data = await fetchCategoryWithSubCategories('house-normal');
    expect(data.categoryId).toBe('house-normal');
  });
});
```

### Integration Tests

```typescript
// Test full user flow
describe('Category Navigation Flow', () => {
  it('navigates from project page to category page', () => {
    // Test navigation and data loading
  });
});
```

## Future Enhancements

### 1. Search and Filter

- Add search functionality for projects
- Filter by area, budget, style
- Sort by date, popularity

### 2. Advanced UI Features

- Image galleries in navigation
- Video previews
- 3D model previews

### 3. SEO Optimization

- Meta tags for each category
- Structured data markup
- Sitemap generation

### 4. Analytics

- Track category views
- Monitor user interactions
- A/B testing for navigation

## Troubleshooting

### Common Issues

1. **Route Parameter Not Found**
   - Check URL parameter name matches `project_category_id`
   - Verify routing configuration

2. **Data Not Loading**
   - Check API endpoint availability
   - Verify mock data configuration
   - Check network connectivity

3. **Styling Issues**
   - Verify CSS imports
   - Check responsive breakpoints
   - Test browser compatibility

### Debug Mode

```typescript
// Enable debug logging
const DEBUG_MODE = process.env.NODE_ENV === 'development';

if (DEBUG_MODE) {
  console.log('Category Data:', categoryData);
  console.log('Active Subcategory:', activeSubCategory);
}
```

## Summary

The ProjectCategoryPage implementation provides a comprehensive solution for displaying project categories with subcategories and project overview data. The component is fully responsive, supports both mock and real data, and includes proper error handling and loading states.

Key benefits:
- Clean separation of concerns
- Type-safe implementation
- Responsive design
- Extensible architecture
- Performance optimized
- Developer-friendly debugging 