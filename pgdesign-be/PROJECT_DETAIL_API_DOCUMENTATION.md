# Project Detail API Documentation

## Overview
This API provides complete CRUD operations for project details in the PG Design website, including project information, specifications, and embedded HTML content for dynamic project pages.

## Base URL
```
http://localhost:3002/api/v1/projectdetail
```

## Features
- Complete project detail data management
- Embedded HTML content support for admin control
- Project specifications management
- Full CRUD operations with validation
- Search and filtering capabilities
- Category and subcategory management
- Pagination support
- Bulk operations support

---

## API Endpoints

### 1. Get All Project Details

**GET** `/`

Retrieves all project details with optional filtering and pagination.

#### Query Parameters
- `category` (optional): Filter by project category
- `subCategory` (optional): Filter by project sub-category
- `projectStatus` (optional): Filter by project status
- `isActive` (optional): Filter by active status (true/false)
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page for pagination

#### Response Without Pagination (200)
```json
{
  "success": true,
  "message": "Project details retrieved successfully",
  "data": [
    {
      "id": 1,
      "projectId": "project-001",
      "title": "Nhà Phố Hiện Đại 3 Tầng",
      "clientName": "Anh Nguyễn Văn A",
      "area": "120m²",
      "constructionDate": "2023-06-15",
      "address": "123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM",
      "description": "Thiết kế nhà phố hiện đại với không gian mở và ánh sáng tự nhiên",
      "category": "house-normal",
      "subCategory": "Nhà Ống",
      "style": "Hiện đại",
      "thumbnailImage": "/assets/images/diary-image-1.jpg",
      "htmlContent": "<p>Embedded HTML content...</p>",
      "projectImages": [
        "/assets/images/diary-image-1.jpg",
        "/assets/images/diary-image-2.jpg"
      ],
      "projectStatus": "Hoàn thành",
      "projectBudget": "2.5 tỷ đồng",
      "completionDate": "2023-12-20",
      "architectName": "KTS. Lê Văn B",
      "contractorName": "Công ty TNHH Xây dựng PG Design",
      "metaTitle": "Nhà Phố Hiện Đại 3 Tầng - Dự án PG Design",
      "metaDescription": "Khám phá dự án nhà phố hiện đại 3 tầng với thiết kế tinh tế",
      "tags": ["nhà phố", "hiện đại", "3 tầng"],
      "isActive": true,
      "createdAt": "2023-06-15T10:00:00.000Z",
      "updatedAt": "2023-12-20T15:30:00.000Z",
      "projectSpecs": [
        {
          "id": 1,
          "label": "Diện tích đất",
          "value": "120",
          "unit": "m²",
          "displayOrder": 1
        }
      ]
    }
  ]
}
```

#### Response With Pagination (200)
```json
{
  "success": true,
  "message": "Project details retrieved successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### 2. Get Project Detail by ID

**GET** `/:id`

Retrieves a specific project detail by its database ID.

#### Response (200)
```json
{
  "success": true,
  "message": "Project detail retrieved successfully",
  "data": {
    "id": 1,
    "projectId": "project-001",
    "title": "Nhà Phố Hiện Đại 3 Tầng",
    // ... full project detail data
  }
}
```

### 3. Get Project Detail by Project ID

**GET** `/project/:projectId`

Retrieves a specific project detail by its unique project ID.

#### Response (200)
```json
{
  "success": true,
  "message": "Project detail retrieved successfully",
  "data": {
    "id": 1,
    "projectId": "project-001",
    "title": "Nhà Phố Hiện Đại 3 Tầng",
    // ... full project detail data
  }
}
```

### 4. Create Project Detail

**POST** `/`

Creates a new project detail with specifications.

#### Request Body
```json
{
  "projectId": "project-003",
  "title": "Biệt Thự Hiện Đại 2 Tầng",
  "clientName": "Chị Nguyễn Thị C",
  "area": "200m²",
  "constructionDate": "2024-01-15",
  "address": "456 Đường Lê Văn Sỹ, Quận 3, TP.HCM",
  "description": "Thiết kế biệt thự hiện đại với sân vườn",
  "category": "house-full",
  "subCategory": "Biệt Thự",
  "style": "Hiện đại",
  "thumbnailImage": "/assets/images/project-thumb.jpg",
  "htmlContent": "<p>Detailed HTML content for the project...</p>",
  "projectImages": [
    "/assets/images/project-1.jpg",
    "/assets/images/project-2.jpg"
  ],
  "projectStatus": "Đang thi công",
  "projectBudget": "5.2 tỷ đồng",
  "completionDate": "2024-06-30",
  "architectName": "KTS. Trần Văn D",
  "contractorName": "Công ty TNHH Xây dựng PG Design",
  "metaTitle": "Biệt Thự Hiện Đại 2 Tầng - Dự án PG Design",
  "metaDescription": "Khám phá biệt thự hiện đại 2 tầng với thiết kế sang trọng",
  "tags": ["biệt thự", "hiện đại", "2 tầng"],
  "projectSpecs": [
    {
      "label": "Diện tích đất",
      "value": "200",
      "unit": "m²",
      "displayOrder": 1
    },
    {
      "label": "Diện tích xây dựng",
      "value": "350",
      "unit": "m²",
      "displayOrder": 2
    }
  ]
}
```

#### Validation Rules
- **projectId**: Required, unique, max 100 characters
- **title**: Required, max 300 characters
- **clientName**: Required, max 200 characters
- **area**: Required, max 50 characters
- **constructionDate**: Required, valid date
- **address**: Required, max 500 characters
- **category**: Required, max 100 characters
- **subCategory**: Required, max 100 characters
- **htmlContent**: Required, longtext
- **projectSpecs**: Array of specifications (optional)

#### Response (201)
```json
{
  "success": true,
  "message": "Project detail created successfully",
  "data": {
    "id": 3,
    "projectId": "project-003",
    "title": "Biệt Thự Hiện Đại 2 Tầng",
    // ... full created project detail data
  }
}
```

### 5. Update Project Detail

**PUT** `/:id`

Updates an existing project detail.

#### Request Body (Partial)
```json
{
  "title": "Updated Project Title",
  "description": "Updated project description",
  "projectStatus": "Hoàn thành",
  "htmlContent": "<p>Updated HTML content...</p>",
  "projectSpecs": [
    {
      "label": "Diện tích đất",
      "value": "150",
      "unit": "m²",
      "displayOrder": 1
    }
  ]
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Project detail updated successfully",
  "data": {
    "id": 1,
    "projectId": "project-001",
    "title": "Updated Project Title",
    // ... updated project detail data
  }
}
```

### 6. Delete Project Detail (Soft Delete)

**DELETE** `/:id`

Soft deletes a project detail (sets `is_active` to false).

#### Response (200)
```json
{
  "success": true,
  "message": "Project detail deleted successfully"
}
```

### 7. Hard Delete Project Detail

**DELETE** `/:id/hard`

Permanently deletes a project detail and all associated specifications.

#### Response (200)
```json
{
  "success": true,
  "message": "Project detail permanently deleted"
}
```

## Utility Endpoints

### 8. Get Categories

**GET** `/util/categories`

Retrieves all available project categories.

#### Response (200)
```json
{
  "success": true,
  "message": "Project categories retrieved successfully",
  "data": [
    "house-normal",
    "house-full",
    "apartment",
    "office",
    "commercial"
  ]
}
```

### 9. Get Subcategories

**GET** `/util/subcategories`

Retrieves all available project subcategories, optionally filtered by category.

#### Query Parameters
- `category` (optional): Filter subcategories by category

#### Response (200)
```json
{
  "success": true,
  "message": "Project sub-categories retrieved successfully",
  "data": [
    "Nhà Ống",
    "Nhà Biệt Thự",
    "Căn Hộ",
    "Văn Phòng"
  ]
}
```

## Search Endpoints

### 10. Search Project Details

**GET** `/search/query`

Searches project details by title, description, or tags.

#### Query Parameters
- `q` (required): Search query
- `category` (optional): Filter by category
- `subCategory` (optional): Filter by sub-category
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page for pagination

#### Response (200)
```json
{
  "success": true,
  "message": "Found 3 project(s) matching \"nhà phố\"",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  }
}
```

## Bulk Operations

### 11. Bulk Update Project Details

**PUT** `/bulk/update`

Updates multiple project details at once.

#### Request Body
```json
{
  "projectIds": [1, 2, 3],
  "updateData": {
    "projectStatus": "Hoàn thành",
    "isActive": true
  }
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Bulk update completed for 3 project(s)",
  "data": [
    {
      "id": 1,
      "success": true,
      "data": {...}
    },
    {
      "id": 2,
      "success": true,
      "data": {...}
    },
    {
      "id": 3,
      "success": false,
      "error": "Project not found"
    }
  ]
}
```

### 12. Bulk Delete Project Details

**DELETE** `/bulk/delete`

Soft deletes multiple project details at once.

#### Request Body
```json
{
  "projectIds": [1, 2, 3]
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Bulk delete completed for 3 project(s)",
  "data": [
    {
      "id": 1,
      "success": true
    },
    {
      "id": 2,
      "success": true
    },
    {
      "id": 3,
      "success": false,
      "error": "Project not found"
    }
  ]
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "error": {
    "message": "Validation errors: projectId is required, title is required",
    "statusCode": 400
  }
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "error": {
    "message": "Project detail not found",
    "statusCode": 404
  }
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": {
    "message": "Failed to create project detail",
    "statusCode": 500
  }
}
```

## Database Schema

### project_details
```sql
id (INT, PRIMARY KEY, AUTO_INCREMENT)
project_id (VARCHAR(100), UNIQUE, NOT NULL)
title (VARCHAR(300), NOT NULL)
client_name (VARCHAR(200), NOT NULL)
area (VARCHAR(50), NOT NULL)
construction_date (DATE, NOT NULL)
address (VARCHAR(500), NOT NULL)
description (TEXT, NULLABLE)
category (VARCHAR(100), NOT NULL)
sub_category (VARCHAR(100), NOT NULL)
style (VARCHAR(100), NULLABLE)
thumbnail_image (VARCHAR(500), NULLABLE)
html_content (LONGTEXT, NOT NULL)
project_images (JSON, NULLABLE)
project_status (VARCHAR(100), NULLABLE)
project_budget (VARCHAR(100), NULLABLE)
completion_date (DATE, NULLABLE)
architect_name (VARCHAR(200), NULLABLE)
contractor_name (VARCHAR(200), NULLABLE)
meta_title (VARCHAR(300), NULLABLE)
meta_description (TEXT, NULLABLE)
tags (JSON, NULLABLE)
is_active (BOOLEAN, DEFAULT TRUE)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### project_specifications
```sql
id (INT, PRIMARY KEY, AUTO_INCREMENT)
project_detail_id (INT, NOT NULL, FOREIGN KEY)
label (VARCHAR(200), NOT NULL)
value (VARCHAR(100), NOT NULL)
unit (VARCHAR(50), NULLABLE)
display_order (INT, DEFAULT 0)
is_active (BOOLEAN, DEFAULT TRUE)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

## Testing Examples

### Get All Project Details
```bash
curl -X GET http://localhost:3002/api/v1/projectdetail
```

### Get Project Detail by Project ID
```bash
curl -X GET http://localhost:3002/api/v1/projectdetail/project/project-001
```

### Create New Project Detail
```bash
curl -X POST http://localhost:3002/api/v1/projectdetail \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "project-003",
    "title": "Biệt Thự Hiện Đại 2 Tầng",
    "clientName": "Chị Nguyễn Thị C",
    "area": "200m²",
    "constructionDate": "2024-01-15",
    "address": "456 Đường Lê Văn Sỹ, Quận 3, TP.HCM",
    "category": "house-full",
    "subCategory": "Biệt Thự",
    "htmlContent": "<p>Detailed HTML content...</p>",
    "projectSpecs": [
      {
        "label": "Diện tích đất",
        "value": "200",
        "unit": "m²",
        "displayOrder": 1
      }
    ]
  }'
```

### Update Project Detail
```bash
curl -X PUT http://localhost:3002/api/v1/projectdetail/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project Title",
    "projectStatus": "Hoàn thành"
  }'
```

### Search Project Details
```bash
curl -X GET "http://localhost:3002/api/v1/projectdetail/search/query?q=nhà%20phố&category=house-normal"
```

### Get Categories
```bash
curl -X GET http://localhost:3002/api/v1/projectdetail/util/categories
```

### Delete Project Detail
```bash
curl -X DELETE http://localhost:3002/api/v1/projectdetail/1
```

## Setup Instructions

1. **Run Migration:**
   ```bash
   npx knex migrate:latest
   ```

2. **Seed Database:**
   ```bash
   npx knex seed:run --specific=007_project_detail_data.js
   ```

3. **Start Backend Server:**
   ```bash
   npm start
   ```

4. **Test API:**
   ```bash
   curl -X GET http://localhost:3002/api/v1/projectdetail
   ```

## Notes

1. **Embedded HTML Content**: The `htmlContent` field allows admins to store rich HTML content that will be rendered on the frontend project detail page
2. **Project Specifications**: Related specifications are automatically managed through the API
3. **Soft Delete**: Default delete operations are soft deletes (set `is_active` to false)
4. **Unique Project IDs**: Each project must have a unique `projectId` for frontend routing
5. **JSON Fields**: `project_images` and `tags` are stored as JSON arrays in the database
6. **Validation**: All required fields are validated before database operations
7. **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
8. **Pagination**: Large datasets support pagination for better performance

## Frontend Integration

The API is designed to work seamlessly with the React frontend:

- **Project ID Routing**: Use `projectId` for frontend routing (e.g., `/project-detail/project-001`)
- **HTML Content**: The `htmlContent` field is rendered using `dangerouslySetInnerHTML`
- **Mock Data Fallback**: The service includes mock data fallback for development
- **Error Handling**: Proper error handling for network issues and API errors
- **Loading States**: All API calls support loading states in the frontend 