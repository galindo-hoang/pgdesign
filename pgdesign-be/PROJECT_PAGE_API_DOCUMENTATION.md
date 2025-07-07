# Project Page CRUD API Documentation

This document provides complete documentation for all CRUD (Create, Read, Update, Delete) operations available for the project page sections.

## Base URL
```
http://localhost:3002/api/v1/projectpage
```

## Response Format
All endpoints return responses in the following format:
```json
{
  "success": boolean,
  "data": object | null,
  "message": string (optional)
}
```

## Error Response Format
```json
{
  "success": false,
  "error": {
    "message": string,
    "statusCode": number,
    "stack": string
  }
}
```

---

## 1. Main Project Page Endpoint

### Get All Project Page Data
```
GET /api/v1/projectpage
```

**Response:**
```json
{
  "success": true,
  "data": {
    "aboutProject": { ... },
    "statsSection": { ... },
    "projectCategories": { ... }
  }
}
```

---

## 2. About Project Section

### Get About Project Data
```
GET /api/v1/projectpage/about-project
```

### Create About Project Data
```
POST /api/v1/projectpage/about-project
```

**Request Body:**
```json
{
  "title": "Dự án",
  "subtitle": "PG DESIGN",
  "backgroundImageUrl": "http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg"
}
```

### Update About Project Data
```
PUT /api/v1/projectpage/about-project/:id
```

**Request Body:** (partial update supported)
```json
{
  "title": "Updated Project Title",
  "subtitle": "Updated PG DESIGN"
}
```

### Delete About Project Data
```
DELETE /api/v1/projectpage/about-project/:id
```

---

## 3. Stats Section

### Get Stats Section Data
```
GET /api/v1/projectpage/stats-section
```

### Create Stats Section Data
```
POST /api/v1/projectpage/stats-section
```

**Request Body:**
```json
{
  "statsSection": {
    "mainHeadline": "THÀNH TỰU CỦA CHÚNG TÔI",
    "subHeadline": "Những con số ấn tượng",
    "description": "Với nhiều năm kinh nghiệm trong lĩnh vực thiết kế kiến trúc..."
  },
  "statsItems": [
    {
      "iconName": "experience-icon",
      "iconUrl": "http://localhost:9000/pgdesign-assets/icons/experience-icon.svg",
      "targetValue": 5,
      "label": "Kinh nghiệm",
      "suffix": "+ năm",
      "description": "Kinh nghiệm",
      "backgroundImageUrl": "http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg",
      "category": "experience",
      "displayOrder": 0
    },
    {
      "iconName": "customer-icon",
      "iconUrl": "http://localhost:9000/pgdesign-assets/icons/customer-icon.svg",
      "targetValue": 500,
      "label": "Khách hàng",
      "suffix": "+",
      "description": "Tin tưởng & hài lòng",
      "backgroundImageUrl": "http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg",
      "category": "customers",
      "displayOrder": 1
    }
  ]
}
```

### Update Stats Section Data
```
PUT /api/v1/projectpage/stats-section/:id
```

**Request Body:** (partial update supported)
```json
{
  "statsSection": {
    "mainHeadline": "Updated Main Headline"
  },
  "statsItems": [
    {
      "iconName": "updated-icon",
      "iconUrl": "http://localhost:9000/pgdesign-assets/icons/updated-icon.svg",
      "targetValue": 10,
      "label": "Updated Label",
      "suffix": "+ years",
      "description": "Updated description",
      "backgroundImageUrl": "http://localhost:9000/pgdesign-assets/images/updated-image.jpg",
      "category": "updated",
      "displayOrder": 0
    }
  ]
}
```

### Delete Stats Section Data
```
DELETE /api/v1/projectpage/stats-section/:id
```

---

## 4. Project Categories Section

### Get Project Categories Data
```
GET /api/v1/projectpage/project-categories
```

### Create Project Categories Data
```
POST /api/v1/projectpage/project-categories
```

**Request Body:**
```json
{
  "projectCategories": {
    "mainTitle": "DANH MỤC DỰ ÁN",
    "subtitle": "KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ",
    "description": "Từ những căn nhà phố hiện đại đến những biệt thự sang trọng..."
  },
  "categories": [
    {
      "categoryId": "house-normal",
      "title": "NHÀ PHỐ",
      "projectCount": 45,
      "backgroundImageUrl": "http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg",
      "navigationPath": "/projects/house-normal",
      "displayOrder": 0
    },
    {
      "categoryId": "house-full",
      "title": "Xây nhà trọn gói",
      "projectCount": 32,
      "backgroundImageUrl": "http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg",
      "navigationPath": "/projects/house-full",
      "displayOrder": 1
    }
  ]
}
```

### Update Project Categories Data
```
PUT /api/v1/projectpage/project-categories/:id
```

**Request Body:** (partial update supported)
```json
{
  "projectCategories": {
    "mainTitle": "Updated Categories Title"
  },
  "categories": [
    {
      "categoryId": "updated-category",
      "title": "Updated Category",
      "projectCount": 100,
      "backgroundImageUrl": "http://localhost:9000/pgdesign-assets/images/updated-image.jpg",
      "navigationPath": "/projects/updated-category",
      "displayOrder": 0
    }
  ]
}
```

### Delete Project Categories Data
```
DELETE /api/v1/projectpage/project-categories/:id
```

---

## Testing Examples

### Using curl to test endpoints:

**Get all project page data:**
```bash
curl -X GET http://localhost:3002/api/v1/projectpage
```

**Create new about project data:**
```bash
curl -X POST http://localhost:3002/api/v1/projectpage/about-project \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Dự án",
    "subtitle": "PG DESIGN", 
    "backgroundImageUrl": "http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg"
  }'
```

**Create stats section with items:**
```bash
curl -X POST http://localhost:3002/api/v1/projectpage/stats-section \
  -H "Content-Type: application/json" \
  -d '{
    "statsSection": {
      "mainHeadline": "THÀNH TỰU CỦA CHÚNG TÔI",
      "subHeadline": "Những con số ấn tượng",
      "description": "Mô tả thành tựu..."
    },
    "statsItems": [
      {
        "iconName": "experience-icon",
        "iconUrl": "http://localhost:9000/pgdesign-assets/icons/experience-icon.svg",
        "targetValue": 5,
        "label": "Kinh nghiệm",
        "suffix": "+ năm",
        "description": "Kinh nghiệm",
        "backgroundImageUrl": "http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg",
        "category": "experience",
        "displayOrder": 0
      }
    ]
  }'
```

**Update about project data:**
```bash
curl -X PUT http://localhost:3002/api/v1/projectpage/about-project/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project Title"
  }'
```

**Delete about project data:**
```bash
curl -X DELETE http://localhost:3002/api/v1/projectpage/about-project/1
```

---

## Database Tables

### 1. about_project_data
- `id` (Primary Key)
- `title` (String)
- `subtitle` (String)
- `background_image_url` (Text)
- `is_active` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### 2. stats_section_data
- `id` (Primary Key)
- `main_headline` (String)
- `sub_headline` (String)
- `description` (Text)
- `is_active` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### 3. stats_items
- `id` (Primary Key)
- `stats_section_id` (Foreign Key)
- `icon_name` (String)
- `icon_url` (Text)
- `target_value` (Integer)
- `label` (String)
- `suffix` (String)
- `description` (Text)
- `background_image_url` (Text)
- `category` (String)
- `display_order` (Integer)
- `is_active` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### 4. project_categories_data
- `id` (Primary Key)
- `main_title` (String)
- `subtitle` (String)
- `description` (Text)
- `is_active` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### 5. project_categories
- `id` (Primary Key)
- `categories_data_id` (Foreign Key)
- `category_id` (String)
- `title` (String)
- `project_count` (Integer)
- `background_image_url` (Text)
- `navigation_path` (String)
- `display_order` (Integer)
- `is_active` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

---

## Notes

1. All endpoints support proper validation and return appropriate error messages
2. The system uses an active/inactive flag pattern - only one record per section can be active at a time
3. When creating new data, existing active records are automatically deactivated
4. All endpoints support partial updates (PATCH-like behavior with PUT)
5. Images are stored in MinIO and referenced by URL
6. The API includes proper error handling and validation for all fields
7. Response data is properly formatted and includes related items (stats items, project categories)
8. Transaction support ensures data consistency when updating related tables

## Status Codes

- `200 OK` - Successful GET/PUT/DELETE operations
- `201 Created` - Successful POST operations
- `400 Bad Request` - Validation errors or missing required fields
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

## Setup Instructions

1. **Start Database:**
   ```bash
   docker-compose up -d
   ```

2. **Run Migrations:**
   ```bash
   npm run migrate
   ```

3. **Seed Database:**
   ```bash
   npx knex seed:run --specific=005_project_page_data.js
   ```

4. **Start Backend Server:**
   ```bash
   npm start
   ```

The project page APIs will be available at `http://localhost:3002/api/v1/projectpage` 