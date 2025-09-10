# Blog Page API Documentation

## Overview

The Blog Page API provides comprehensive CRUD operations for managing blog page content including hero sections, project galleries, content sections, and consultation CTAs.

## Base URL

```
http://localhost:3002/api/v1/blogpage
```

## Authentication

Currently, no authentication is required for GET endpoints. POST, PUT, and DELETE operations should implement appropriate authentication in production.

## API Endpoints

### 1. Main Blog Page Data

#### GET /api/v1/blogpage
Get complete blog page data for frontend consumption.

**Response:**
```json
{
  "success": true,
  "data": {
    "heroData": {
      "id": 1,
      "title": "PG DESIGN - THIẾT KẾ NỘI THẤT PHÒNG KHÁCH ĐẸP, HIỆN ĐẠI TẠI TP.HCM",
      "subtitle": "Khám phá bộ sưu tập...",
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    },
    "projectItems": [...],
    "contentSection": {...},
    "consultationCTA": {...}
  },
  "message": "Blog page data retrieved successfully"
}
```

### 2. Hero Section

#### GET /api/v1/blogpage/hero
Get blog hero section data.

#### POST /api/v1/blogpage/hero
Create new hero section.

**Request Body:**
```json
{
  "title": "New Blog Hero Title",
  "subtitle": "Hero subtitle text",
  "isActive": true,
  "displayOrder": 1
}
```

#### PUT /api/v1/blogpage/hero/:id
Update existing hero section.

**Request Body:**
```json
{
  "title": "Updated title",
  "subtitle": "Updated subtitle"
}
```

### 3. Project Items

#### GET /api/v1/blogpage/projects
Get project items with filtering and pagination.

**Query Parameters:**
- `category` (string): Filter by category/style
- `style` (string): Filter by style
- `location` (string): Filter by location  
- `limit` (number): Number of items to return (default: 6)
- `offset` (number): Number of items to skip (default: 0)

**Example:**
```
GET /api/v1/blogpage/projects?style=hiện đại&limit=10&offset=0
```

**Response:**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "blog-project-001",
        "title": "Thiết kế nội thất Phòng khách Nhà Phố Hiện Đại – Quận 2",
        "image": "http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg",
        "area": "20 m²",
        "style": "Phong cách hiện đại",
        "client": "Anh Tú",
        "location": "Quận 2",
        "isActive": true,
        "displayOrder": 1,
        "createdAt": "2024-01-15T10:00:00Z",
        "updatedAt": "2024-01-15T10:00:00Z"
      }
    ],
    "totalProjects": 8,
    "hasMore": false
  },
  "message": "Project items retrieved successfully"
}
```

#### GET /api/v1/blogpage/projects/:id
Get single project item by ID.

#### POST /api/v1/blogpage/projects
Create new project item.

**Request Body:**
```json
{
  "projectId": "blog-project-009",
  "title": "New Project Title",
  "imageUrl": "http://example.com/image.jpg",
  "area": "25 m²",
  "style": "Phong cách hiện đại",
  "clientName": "Anh Minh",
  "location": "Quận 1",
  "isActive": true,
  "displayOrder": 9
}
```

#### PUT /api/v1/blogpage/projects/:id
Update existing project item.

#### DELETE /api/v1/blogpage/projects/:id
Delete project item (soft delete).

### 4. Content Section

#### GET /api/v1/blogpage/content-section
Get content section with design styles, factors, and process steps.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "mainTitle": "PG DESIGN - THIẾT KẾ NỘI THẤT...",
    "introText": "Phòng khách là không gian trung tâm...",
    "designStylesTitle": "Các phong cách thiết kế phòng khách đẹp",
    "designStyles": [
      {
        "id": 1,
        "name": "Phong cách hiện đại (Modern)",
        "description": "Đặc trưng bởi những đường nét sạch sẽ...",
        "displayOrder": 1,
        "isActive": true,
        "createdAt": "2024-01-15T10:00:00Z",
        "updatedAt": "2024-01-15T10:00:00Z"
      }
    ],
    "factorsTitle": "Những yếu tố quan trọng...",
    "importantFactors": [...],
    "processTitle": "Quy trình thiết kế nội thất...",
    "processSteps": [...]
  }
}
```

#### POST /api/v1/blogpage/content-section
Create content section with related data.

**Request Body:**
```json
{
  "mainTitle": "Content Section Title",
  "introText": "Introduction text...",
  "designStylesTitle": "Design Styles Section",
  "factorsTitle": "Important Factors Section",
  "processTitle": "Process Section",
  "designStyles": [
    {
      "name": "Modern Style",
      "description": "Clean lines and neutral colors...",
      "displayOrder": 1,
      "isActive": true
    }
  ],
  "importantFactors": [
    {
      "title": "Space Optimization",
      "description": "Arrange furniture properly...",
      "displayOrder": 1,
      "isActive": true
    }
  ],
  "processSteps": [
    {
      "stepNumber": "01",
      "title": "Survey and Consultation",
      "description": "Measure space and understand requirements...",
      "displayOrder": 1,
      "isActive": true
    }
  ]
}
```

### 5. Consultation CTA

#### GET /api/v1/blogpage/consultation-cta
Get consultation call-to-action data.

#### POST /api/v1/blogpage/consultation-cta
Create consultation CTA.

**Request Body:**
```json
{
  "title": "NHẬN TƯ VẤN THIẾT KẾ NỘI THẤT",
  "description": "Contact description...",
  "features": [
    "Tư vấn miễn phí",
    "Thiết kế 3D chân thực",
    "Thi công chuyên nghiệp"
  ],
  "buttonText": "ĐĂNG KÝ TƯ VẤN NGAY",
  "imageUrl": "http://example.com/consultation.jpg",
  "isActive": true,
  "displayOrder": 1
}
```

### 6. Search and Filtering

#### GET /api/v1/blogpage/search
Advanced search with multiple filters.

**Query Parameters:**
- `query` (string): Search text (searches title, style, location, client)
- `category` (string): Filter by category
- `style` (string): Filter by style
- `location` (string): Filter by location
- `isActive` (boolean): Filter by active status
- `dateFrom` (string): Filter by creation date from (YYYY-MM-DD)
- `dateTo` (string): Filter by creation date to (YYYY-MM-DD)
- `sortBy` (string): Sort field (created_at, updated_at, display_order, title)
- `sortOrder` (string): Sort direction (asc, desc)
- `page` (number): Page number for pagination
- `limit` (number): Items per page

**Example:**
```
GET /api/v1/blogpage/search?query=hiện đại&location=Quận 2&sortBy=created_at&sortOrder=desc&page=1&limit=10
```

### 7. Bulk Operations

#### PUT /api/v1/blogpage/projects/bulk-update
Bulk update multiple project items.

**Request Body:**
```json
{
  "ids": [1, 2, 3],
  "updates": {
    "isActive": false,
    "displayOrder": 10
  }
}
```

#### DELETE /api/v1/blogpage/projects/bulk-delete
Bulk delete multiple project items.

**Request Body:**
```json
{
  "ids": [1, 2, 3],
  "hardDelete": false
}
```

### 8. Utility Endpoints

#### GET /api/v1/blogpage/util/styles
Get unique styles for filtering dropdown.

**Response:**
```json
{
  "success": true,
  "data": [
    "Phong cách hiện đại",
    "Phong cách cổ điển",
    "Phong cách tối giản",
    "Phong cách Indochine"
  ]
}
```

#### GET /api/v1/blogpage/util/locations
Get unique locations for filtering dropdown.

#### GET /api/v1/blogpage/stats
Get blog page statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalProjects": 8,
    "activeProjects": 8,
    "totalStyles": 4,
    "totalFactors": 4,
    "totalProcessSteps": 4,
    "lastUpdated": "2024-01-15T10:00:00Z"
  }
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message description",
  "message": "Human-readable error message"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Validation Rules

### Hero Section
- `title`: Required, max 500 characters
- `subtitle`: Required

### Project Items
- `projectId`: Required, unique
- `title`: Required, max 500 characters
- `imageUrl`: Required, valid URL
- `area`: Required
- `style`: Required
- `clientName`: Required
- `location`: Required

### Content Section
- `mainTitle`: Required
- `introText`: Required
- `designStylesTitle`: Required
- `factorsTitle`: Required
- `processTitle`: Required

## Database Schema

### Tables Created
- `blog_hero_data`: Hero section content
- `blog_project_items`: Project gallery items
- `blog_content_sections`: Content section headers
- `blog_design_styles`: Design style entries
- `blog_important_factors`: Important factor entries
- `blog_process_steps`: Process step entries
- `blog_consultation_cta`: Consultation call-to-action

## Sample Data

The API comes with comprehensive sample data including:
- 1 hero section
- 8 project items
- 1 content section with 4 design styles, 4 factors, and 4 process steps
- 1 consultation CTA

## Performance Considerations

- Project listing supports pagination to handle large datasets
- Database indexes on commonly filtered fields (style, location, is_active)
- Bulk operations for efficient multiple record updates
- Lazy loading for related data when needed

## Frontend Integration

The frontend BlogPageService automatically switches between mock data and API data based on environment configuration:

```typescript
// Set in .env file
REACT_APP_USE_MOCK_DATA=false  // Use API
REACT_APP_USE_MOCK_DATA=true   // Use mock data
```

## Migration and Setup

1. Run migration: `npx knex migrate:up 011_create_blog_page_tables.js`
2. Seed sample data: `npx knex seed:run --specific=008_blog_page_data.js`
3. Start backend server: `npm run dev`
4. API available at: `http://localhost:3002/api/v1/blogpage` 