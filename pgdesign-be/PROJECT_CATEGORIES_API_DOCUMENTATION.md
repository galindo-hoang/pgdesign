# Project Categories & Subcategories API Documentation

## Overview
This document provides comprehensive API documentation for the Project Categories and Project Subcategories endpoints. These APIs manage the hierarchical structure of project categories and their subcategories.

## Base URLs
- Project Categories: `/api/v1/projectpage/categories`
- Project Subcategories: `/api/v1/projectsubcategories`

## Authentication
All endpoints require appropriate authentication headers.

---

## Project Categories API

### 1. Get All Project Categories
Get all individual project categories (simplified list).

**Endpoint:** `GET /api/v1/projectpage/categories`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "categoryId": "house-normal",
      "title": "NHÀ PHỐ",
      "projectCount": 4,
      "backgroundImageUrl": "https://example.com/image.jpg",
      "navigationPath": "/projects/house-normal",
      "displayOrder": 1
    }
  ],
  "message": "Project categories retrieved successfully"
}
```

### 2. Get Single Project Category
Get a single project category by ID (supports both `category_id` and numeric `id`).

**Endpoint:** `GET /api/v1/projectpage/categories/:id`

**Parameters:**
- `id` (path parameter): Either `category_id` (string) or numeric `id`

**Examples:**
- `GET /api/v1/projectpage/categories/house-normal`
- `GET /api/v1/projectpage/categories/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "categoryId": "house-normal",
    "title": "NHÀ PHỐ",
    "projectCount": 4,
    "backgroundImageUrl": "https://example.com/image.jpg",
    "navigationPath": "/projects/house-normal",
    "displayOrder": 1
  },
  "message": "Project category retrieved successfully"
}
```

**Error Responses:**
- `404`: Project category not found
- `400`: ID parameter is required

---

## Project Subcategories API

### 1. Get All Project Subcategories
Get all project subcategories with optional filtering.

**Endpoint:** `GET /api/v1/projectsubcategories`

**Query Parameters:**
- `projectCategoryId` (optional): Filter by project category ID (numeric)
- `categoryId` (optional): Filter by category ID (string, e.g., "house-normal")
- `isActive` (optional): Filter by active status (boolean)
- `includeCategories` (optional): Include parent category information (boolean)

**Examples:**
- `GET /api/v1/projectsubcategories`
- `GET /api/v1/projectsubcategories?categoryId=house-normal`
- `GET /api/v1/projectsubcategories?includeCategories=true`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "projectCategoryId": 1,
      "subCategoryId": "nha-ong",
      "title": "Nhà Ống",
      "description": "Thiết kế nhà ống hiện đại",
      "heroImageUrl": "https://example.com/hero.jpg",
      "displayOrder": 1,
      "projectCount": 3,
      "isActive": true,
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  ],
  "message": "Project subcategories retrieved successfully"
}
```

### 2. Get Subcategories by Category ID
Get subcategories for a specific category.

**Endpoint:** `GET /api/v1/projectsubcategories/category/:categoryId`

**Parameters:**
- `categoryId` (path parameter): Category ID (string, e.g., "house-normal")

**Example:**
- `GET /api/v1/projectsubcategories/category/house-normal`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "projectCategoryId": 1,
      "subCategoryId": "nha-ong",
      "title": "Nhà Ống",
      "description": "Thiết kế nhà ống hiện đại",
      "heroImageUrl": "https://example.com/hero.jpg",
      "displayOrder": 1,
      "projectCount": 3,
      "isActive": true,
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  ],
  "message": "Project subcategories retrieved successfully"
}
```

### 3. Get Subcategories Grouped by Category
Get all subcategories grouped by their parent categories.

**Endpoint:** `GET /api/v1/projectsubcategories/grouped`

**Response:**
```json
{
  "success": true,
  "data": {
    "house-normal": [
      {
        "id": 1,
        "projectCategoryId": 1,
        "subCategoryId": "nha-ong",
        "title": "Nhà Ống",
        "description": "Thiết kế nhà ống hiện đại",
        "heroImageUrl": "https://example.com/hero.jpg",
        "displayOrder": 1,
        "projectCount": 3,
        "isActive": true,
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-01T00:00:00Z"
      }
    ],
    "house-full": [
      // ... other subcategories
    ]
  },
  "message": "Project subcategories grouped by category retrieved successfully"
}
```

### 4. Get Single Subcategory by ID
Get a single subcategory by its ID.

**Endpoint:** `GET /api/v1/projectsubcategories/:id`

**Parameters:**
- `id` (path parameter): Subcategory ID (numeric)

**Example:**
- `GET /api/v1/projectsubcategories/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "projectCategoryId": 1,
    "subCategoryId": "nha-ong",
    "title": "Nhà Ống",
    "description": "Thiết kế nhà ống hiện đại",
    "heroImageUrl": "https://example.com/hero.jpg",
    "displayOrder": 1,
    "projectCount": 3,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  },
  "message": "Project subcategory retrieved successfully"
}
```

### 5. Get Subcategory by Category and Sub-Category IDs
Get a subcategory by both category ID and sub-category ID.

**Endpoint:** `GET /api/v1/projectsubcategories/category/:categoryId/subcategory/:subCategoryId`

**Parameters:**
- `categoryId` (path parameter): Category ID (string)
- `subCategoryId` (path parameter): Sub-category ID (string)

**Example:**
- `GET /api/v1/projectsubcategories/category/house-normal/subcategory/nha-ong`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "projectCategoryId": 1,
    "subCategoryId": "nha-ong",
    "title": "Nhà Ống",
    "description": "Thiết kế nhà ống hiện đại",
    "heroImageUrl": "https://example.com/hero.jpg",
    "displayOrder": 1,
    "projectCount": 3,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  },
  "message": "Project subcategory retrieved successfully"
}
```

### 6. Create New Subcategory
Create a new project subcategory.

**Endpoint:** `POST /api/v1/projectsubcategories`

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "projectCategoryId": 1,
  "subCategoryId": "nha-ong",
  "title": "Nhà Ống",
  "description": "Thiết kế nhà ống hiện đại",
  "heroImageUrl": "https://example.com/hero.jpg",
  "displayOrder": 1,
  "projectCount": 0,
  "isActive": true
}
```

**Required Fields:**
- `projectCategoryId`: Project category ID (number)
- `subCategoryId`: Sub-category ID (string)
- `title`: Subcategory title (string)

**Optional Fields:**
- `description`: Description (string)
- `heroImageUrl`: Hero image URL (string)
- `displayOrder`: Display order (number, default: 0)
- `projectCount`: Project count (number, default: 0)
- `isActive`: Active status (boolean, default: true)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "projectCategoryId": 1,
    "subCategoryId": "nha-ong",
    "title": "Nhà Ống",
    "description": "Thiết kế nhà ống hiện đại",
    "heroImageUrl": "https://example.com/hero.jpg",
    "displayOrder": 1,
    "projectCount": 0,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  },
  "message": "Project subcategory created successfully"
}
```

### 7. Update Subcategory
Update an existing project subcategory.

**Endpoint:** `PUT /api/v1/projectsubcategories/:id`

**Headers:**
- `Content-Type: application/json`

**Parameters:**
- `id` (path parameter): Subcategory ID (numeric)

**Request Body:**
```json
{
  "title": "Updated Nhà Ống",
  "description": "Updated description",
  "heroImageUrl": "https://example.com/new-hero.jpg",
  "displayOrder": 2,
  "projectCount": 5,
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "projectCategoryId": 1,
    "subCategoryId": "nha-ong",
    "title": "Updated Nhà Ống",
    "description": "Updated description",
    "heroImageUrl": "https://example.com/new-hero.jpg",
    "displayOrder": 2,
    "projectCount": 5,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T12:00:00Z"
  },
  "message": "Project subcategory updated successfully"
}
```

### 8. Update Project Count
Update the project count for a subcategory.

**Endpoint:** `PATCH /api/v1/projectsubcategories/:id/count`

**Headers:**
- `Content-Type: application/json`

**Parameters:**
- `id` (path parameter): Subcategory ID (numeric)

**Request Body:**
```json
{
  "count": 10
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project count updated successfully"
}
```

### 9. Delete Subcategory
Delete a project subcategory (soft delete).

**Endpoint:** `DELETE /api/v1/projectsubcategories/:id`

**Parameters:**
- `id` (path parameter): Subcategory ID (numeric)

**Response:**
```json
{
  "success": true,
  "message": "Project subcategory deleted successfully"
}
```

---

## Error Responses

### Common Error Formats
All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```

### Error Codes
- `400`: Bad Request - Invalid input data
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Server error

### Validation Errors
When validation fails, the response includes detailed error messages:

```json
{
  "success": false,
  "error": {
    "message": "Validation errors: Project category ID is required and must be a number, Title is required and must be a string",
    "status": 400
  }
}
```

---

## Usage Examples

### Frontend Integration
```javascript
// Get all categories
const categories = await fetch('/api/v1/projectpage/categories')
  .then(res => res.json());

// Get subcategories for a category
const subcategories = await fetch('/api/v1/projectsubcategories/category/house-normal')
  .then(res => res.json());

// Create a new subcategory
const newSubcategory = await fetch('/api/v1/projectsubcategories', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    projectCategoryId: 1,
    subCategoryId: 'new-subcategory',
    title: 'New Subcategory',
    description: 'Description here'
  })
}).then(res => res.json());
```

### cURL Examples
```bash
# Get all categories
curl -X GET http://localhost:3000/api/v1/projectpage/categories

# Get single category
curl -X GET http://localhost:3000/api/v1/projectpage/categories/house-normal

# Create new subcategory
curl -X POST http://localhost:3000/api/v1/projectsubcategories \
  -H "Content-Type: application/json" \
  -d '{
    "projectCategoryId": 1,
    "subCategoryId": "test-subcategory",
    "title": "Test Subcategory",
    "description": "Test description"
  }'
```

---

## Database Schema

### project_categories Table
- `id` (INT, PRIMARY KEY)
- `categories_data_id` (INT, FOREIGN KEY)
- `category_id` (VARCHAR, UNIQUE) - Used for URL-friendly identification
- `title` (VARCHAR)
- `project_count` (INT)
- `background_image_url` (TEXT)
- `navigation_path` (VARCHAR)
- `display_order` (INT)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### project_details Table (Direct Relationship)
- `project_category_id` (INT, FOREIGN KEY) - Direct reference to project_categories.id
- Projects are now directly linked to categories without intermediate subcategories

### Constraints
- `project_categories.category_id` has UNIQUE constraint
- `project_details.project_category_id` references `project_categories.id`

---

## Notes
- All endpoints return JSON responses
- The `category_id` field in project_categories is used for URL-friendly identification
- Project counts are maintained separately and should be updated when projects are added/removed
- Display order determines the sorting of categories in the frontend
- Projects are now directly linked to categories without subcategories 