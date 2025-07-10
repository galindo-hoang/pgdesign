# Service Page API Documentation

## Overview
This API provides complete CRUD operations for the PG Design service page, including hero content, services, process sections, and construction sections.

## Base URL
```
http://localhost:3002/api/v1/servicepage
```

## Features
- Complete service page data retrieval for frontend
- Full CRUD operations for all sections
- Proper validation and error handling
- Pagination support for services
- Section-based management for process and construction content

---

## API Endpoints

### 1. Get Complete Service Page Data

**GET** `/`

Retrieves all service page data in the format expected by the frontend.

#### Response (200)
```json
{
  "success": true,
  "message": "Service page data retrieved successfully",
  "data": {
    "heroContent": {
      "mainTitle": "DỊCH VỤ",
      "brandName": "PG DESIGN",
      "description": "Chúng tôi đồng hành cùng khách hàng từ bản vẽ ý tưởng đến không gian sống hoàn thiện.",
      "heroImageUrl": "/assets/images/vision-mission-section.jpg"
    },
    "services": [
      {
        "id": 1,
        "title": "Dịch vụ thi công",
        "subtitle": "Phần thô hoặc",
        "description": "Trọn gói hoàn thiện"
      }
    ],
    "processSection1": {
      "processNumber": 1,
      "title": "THI CÔNG PHẦN THÔ HOẶC TRỌN GÓI HOÀN THIỆN",
      "description": "PG Design đảm nhận toàn bộ quy trình xây dựng từ phần thô đến hoàn thiện công trình.",
      "note": "Không bao gồm thi công đồ nội thất rời"
    },
    "constructionSection1": {
      "titleLeft": "THI CÔNG PHẦN THÔ",
      "contentsLeft": ["Đào móng, thi công móng - thi công bể tự hoại", "..."],
      "titleRight": "TRỌN GÓI HOÀN THIỆN",
      "contentsRight": ["Lát gạch nền, tường, khu vực vệ sinh", "..."]
    }
  }
}
```

---

## Hero Content Management

### 2. Get Hero Content

**GET** `/hero`

#### Response (200)
```json
{
  "success": true,
  "message": "Hero content retrieved successfully",
  "data": {
    "id": 1,
    "main_title": "DỊCH VỤ",
    "brand_name": "PG DESIGN",
    "description": "Chúng tôi đồng hành cùng khách hàng từ bản vẽ ý tưởng đến không gian sống hoàn thiện.",
    "hero_image_url": "/assets/images/vision-mission-section.jpg",
    "is_active": true,
    "display_order": 1,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### 3. Create Hero Content

**POST** `/hero`

#### Request Body
```json
{
  "mainTitle": "DỊCH VỤ",
  "brandName": "PG DESIGN",
  "description": "Chúng tôi đồng hành cùng khách hàng từ bản vẽ ý tưởng đến không gian sống hoàn thiện.",
  "heroImageUrl": "/assets/images/vision-mission-section.jpg",
  "displayOrder": 1
}
```

#### Validation Rules
- **mainTitle**: Required, max 100 characters
- **brandName**: Required, max 100 characters
- **description**: Required, text
- **heroImageUrl**: Optional, max 500 characters
- **displayOrder**: Optional, integer (default: 1)

#### Response (201)
```json
{
  "success": true,
  "message": "Hero content created successfully",
  "data": {
    "id": 1,
    "main_title": "DỊCH VỤ",
    "brand_name": "PG DESIGN",
    "description": "Chúng tôi đồng hành cùng khách hàng...",
    "hero_image_url": "/assets/images/vision-mission-section.jpg",
    "is_active": true,
    "display_order": 1,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Update Hero Content

**PUT** `/hero/:id`

#### Request Body (Partial)
```json
{
  "mainTitle": "DỊCH VỤ THIẾT KẾ",
  "description": "Updated description"
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Hero content updated successfully",
  "data": {
    "id": 1,
    "main_title": "DỊCH VỤ THIẾT KẾ",
    "brand_name": "PG DESIGN",
    "description": "Updated description",
    "hero_image_url": "/assets/images/vision-mission-section.jpg",
    "is_active": true,
    "display_order": 1,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T12:45:00.000Z"
  }
}
```

### 5. Delete Hero Content

**DELETE** `/hero/:id`

#### Response (200)
```json
{
  "success": true,
  "message": "Hero content deleted successfully"
}
```

---

## Services Management

### 6. Get All Services

**GET** `/services`

#### Query Parameters
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page (default: 10)

#### Response Without Pagination (200)
```json
{
  "success": true,
  "message": "Services retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Dịch vụ thi công",
      "subtitle": "Phần thô hoặc",
      "description": "Trọn gói hoàn thiện",
      "is_active": true,
      "display_order": 1,
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Response With Pagination (200)
```json
{
  "success": true,
  "message": "Services retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Dịch vụ thi công",
      "subtitle": "Phần thô hoặc",
      "description": "Trọn gói hoàn thiện",
      "is_active": true,
      "display_order": 1,
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 4,
    "totalPages": 1
  }
}
```

### 7. Get Service by ID

**GET** `/services/:id`

#### Response (200)
```json
{
  "success": true,
  "message": "Service retrieved successfully",
  "data": {
    "id": 1,
    "title": "Dịch vụ thi công",
    "subtitle": "Phần thô hoặc",
    "description": "Trọn gói hoàn thiện",
    "is_active": true,
    "display_order": 1,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### 8. Create Service

**POST** `/services`

#### Request Body
```json
{
  "title": "Dịch vụ thi công",
  "subtitle": "Phần thô hoặc",
  "description": "Trọn gói hoàn thiện",
  "displayOrder": 1
}
```

#### Validation Rules
- **title**: Required, max 200 characters
- **subtitle**: Optional, max 200 characters
- **description**: Required, text
- **displayOrder**: Required, integer

#### Response (201)
```json
{
  "success": true,
  "message": "Service created successfully",
  "data": {
    "id": 5,
    "title": "Dịch vụ thi công",
    "subtitle": "Phần thô hoặc",
    "description": "Trọn gói hoàn thiện",
    "is_active": true,
    "display_order": 1,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### 9. Update Service

**PUT** `/services/:id`

#### Request Body (Partial)
```json
{
  "title": "Updated service title",
  "description": "Updated description"
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Service updated successfully",
  "data": {
    "id": 1,
    "title": "Updated service title",
    "subtitle": "Phần thô hoặc",
    "description": "Updated description",
    "is_active": true,
    "display_order": 1,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T12:45:00.000Z"
  }
}
```

### 10. Delete Service

**DELETE** `/services/:id`

#### Response (200)
```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

---

## Process Sections Management

### 11. Get All Process Sections

**GET** `/process-sections`

#### Response (200)
```json
{
  "success": true,
  "message": "Process sections retrieved successfully",
  "data": [
    {
      "id": 1,
      "process_number": 1,
      "title": "THI CÔNG PHẦN THÔ HOẶC TRỌN GÓI HOÀN THIỆN",
      "description": "PG Design đảm nhận toàn bộ quy trình xây dựng từ phần thô đến hoàn thiện công trình.",
      "note": "Không bao gồm thi công đồ nội thất rời",
      "is_active": true,
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 12. Get Process Section by Number

**GET** `/process-sections/:number`

#### URL Parameters
- `number`: Process section number (1-4)

#### Response (200)
```json
{
  "success": true,
  "message": "Process section retrieved successfully",
  "data": {
    "id": 1,
    "process_number": 1,
    "title": "THI CÔNG PHẦN THÔ HOẶC TRỌN GÓI HOÀN THIỆN",
    "description": "PG Design đảm nhận toàn bộ quy trình xây dựng từ phần thô đến hoàn thiện công trình.",
    "note": "Không bao gồm thi công đồ nội thất rời",
    "is_active": true,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### 13. Create Process Section

**POST** `/process-sections`

#### Request Body
```json
{
  "processNumber": 1,
  "title": "THI CÔNG PHẦN THÔ HOẶC TRỌN GÓI HOÀN THIỆN",
  "description": "PG Design đảm nhận toàn bộ quy trình xây dựng từ phần thô đến hoàn thiện công trình.",
  "note": "Không bao gồm thi công đồ nội thất rời"
}
```

#### Validation Rules
- **processNumber**: Required, integer (1-4), unique
- **title**: Required, max 300 characters
- **description**: Required, text
- **note**: Optional, text

#### Response (201)
```json
{
  "success": true,
  "message": "Process section created successfully",
  "data": {
    "id": 5,
    "process_number": 1,
    "title": "THI CÔNG PHẦN THÔ HOẶC TRỌN GÓI HOÀN THIỆN",
    "description": "PG Design đảm nhận toàn bộ quy trình xây dựng từ phần thô đến hoàn thiện công trình.",
    "note": "Không bao gồm thi công đồ nội thất rời",
    "is_active": true,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### 14. Update Process Section

**PUT** `/process-sections/:number`

#### Request Body (Partial)
```json
{
  "title": "Updated process title",
  "description": "Updated description"
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Process section updated successfully",
  "data": {
    "id": 1,
    "process_number": 1,
    "title": "Updated process title",
    "description": "Updated description",
    "note": "Không bao gồm thi công đồ nội thất rời",
    "is_active": true,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T12:45:00.000Z"
  }
}
```

### 15. Delete Process Section

**DELETE** `/process-sections/:number`

#### Response (200)
```json
{
  "success": true,
  "message": "Process section deleted successfully"
}
```

---

## Construction Sections Management

### 16. Get All Construction Sections

**GET** `/construction-sections`

#### Response (200)
```json
{
  "success": true,
  "message": "Construction sections retrieved successfully",
  "data": [
    {
      "id": 1,
      "section_number": 1,
      "title_left": "THI CÔNG PHẦN THÔ",
      "contents_left": [
        "Đào móng, thi công móng - thi công bể tự hoại",
        "Thi công hệ khung bê tông cột thép: cột, dầm, sàn, cầu thang",
        "Thi công tường bao che, tường ngăn nhà",
        "Lắp đặt hệ thống điện, nước âm tường, sàn",
        "Thi công chống thấm, cán nền sàn, tô tường"
      ],
      "title_right": "TRỌN GÓI HOÀN THIỆN",
      "contents_right": [
        "Lát gạch nền, tường, khu vực vệ sinh",
        "Sơn nước trong - ngoài nhà",
        "Lắp trần thạch cao, trang trí phào chỉ (nếu có)",
        "Lắp thiết bị vệ sinh",
        "Lắp hệ thống điện nổi, đèn chiếu sáng",
        "Lắp đặt cửa chính, cửa sổ, lan can"
      ],
      "is_active": true,
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 17. Get Construction Section by Number

**GET** `/construction-sections/:number`

#### URL Parameters
- `number`: Construction section number (1-4)

#### Response (200)
```json
{
  "success": true,
  "message": "Construction section retrieved successfully",
  "data": {
    "id": 1,
    "section_number": 1,
    "title_left": "THI CÔNG PHẦN THÔ",
    "contents_left": [
      "Đào móng, thi công móng - thi công bể tự hoại",
      "Thi công hệ khung bê tông cột thép: cột, dầm, sàn, cầu thang"
    ],
    "title_right": "TRỌN GÓI HOÀN THIỆN",
    "contents_right": [
      "Lát gạch nền, tường, khu vực vệ sinh",
      "Sơn nước trong - ngoài nhà"
    ],
    "is_active": true,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### 18. Create Construction Section

**POST** `/construction-sections`

#### Request Body
```json
{
  "sectionNumber": 1,
  "titleLeft": "THI CÔNG PHẦN THÔ",
  "contentsLeft": [
    "Đào móng, thi công móng - thi công bể tự hoại",
    "Thi công hệ khung bê tông cột thép: cột, dầm, sàn, cầu thang",
    "Thi công tường bao che, tường ngăn nhà"
  ],
  "titleRight": "TRỌN GÓI HOÀN THIỆN",
  "contentsRight": [
    "Lát gạch nền, tường, khu vực vệ sinh",
    "Sơn nước trong - ngoài nhà",
    "Lắp trần thạch cao, trang trí phào chỉ (nếu có)"
  ]
}
```

#### Validation Rules
- **sectionNumber**: Required, integer (1-4), unique
- **titleLeft**: Required, max 200 characters
- **contentsLeft**: Required, array of strings
- **titleRight**: Required, max 200 characters
- **contentsRight**: Required, array of strings

#### Response (201)
```json
{
  "success": true,
  "message": "Construction section created successfully",
  "data": {
    "id": 5,
    "section_number": 1,
    "title_left": "THI CÔNG PHẦN THÔ",
    "contents_left": [
      "Đào móng, thi công móng - thi công bể tự hoại",
      "Thi công hệ khung bê tông cột thép: cột, dầm, sàn, cầu thang"
    ],
    "title_right": "TRỌN GÓI HOÀN THIỆN",
    "contents_right": [
      "Lát gạch nền, tường, khu vực vệ sinh",
      "Sơn nước trong - ngoài nhà"
    ],
    "is_active": true,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### 19. Update Construction Section

**PUT** `/construction-sections/:number`

#### Request Body (Partial)
```json
{
  "titleLeft": "Updated left title",
  "contentsLeft": [
    "Updated content 1",
    "Updated content 2"
  ]
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Construction section updated successfully",
  "data": {
    "id": 1,
    "section_number": 1,
    "title_left": "Updated left title",
    "contents_left": [
      "Updated content 1",
      "Updated content 2"
    ],
    "title_right": "TRỌN GÓI HOÀN THIỆN",
    "contents_right": [
      "Lát gạch nền, tường, khu vực vệ sinh",
      "Sơn nước trong - ngoài nhà"
    ],
    "is_active": true,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T12:45:00.000Z"
  }
}
```

### 20. Delete Construction Section

**DELETE** `/construction-sections/:number`

#### Response (200)
```json
{
  "success": true,
  "message": "Construction section deleted successfully"
}
```

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "error": {
    "message": "Validation failed: title is required",
    "statusCode": 400
  }
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "error": {
    "message": "Service not found",
    "statusCode": 404
  }
}
```

### Conflict Error (409)
```json
{
  "success": false,
  "error": {
    "message": "Process section 1 already exists",
    "statusCode": 409
  }
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": {
    "message": "Failed to fetch service page data",
    "statusCode": 500
  }
}
```

---

## Database Schema

### service_page_hero
```sql
id (INT, PRIMARY KEY, AUTO_INCREMENT)
main_title (VARCHAR(100), NOT NULL)
brand_name (VARCHAR(100), NOT NULL)
description (TEXT, NOT NULL)
hero_image_url (VARCHAR(500), NULLABLE)
is_active (BOOLEAN, DEFAULT TRUE)
display_order (INT, DEFAULT 1)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### service_page_services
```sql
id (INT, PRIMARY KEY, AUTO_INCREMENT)
title (VARCHAR(200), NOT NULL)
subtitle (VARCHAR(200), DEFAULT '')
description (TEXT, NOT NULL)
is_active (BOOLEAN, DEFAULT TRUE)
display_order (INT, NOT NULL)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### service_page_process_sections
```sql
id (INT, PRIMARY KEY, AUTO_INCREMENT)
process_number (INT, NOT NULL, UNIQUE)
title (VARCHAR(300), NOT NULL)
description (TEXT, NOT NULL)
note (TEXT, DEFAULT '')
is_active (BOOLEAN, DEFAULT TRUE)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### service_page_construction_sections
```sql
id (INT, PRIMARY KEY, AUTO_INCREMENT)
section_number (INT, NOT NULL, UNIQUE)
title_left (VARCHAR(200), NOT NULL)
contents_left (JSON, NOT NULL)
title_right (VARCHAR(200), NOT NULL)
contents_right (JSON, NOT NULL)
is_active (BOOLEAN, DEFAULT TRUE)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

---

## Testing Examples

### Get Complete Service Page Data
```bash
curl -X GET http://localhost:3002/api/v1/servicepage
```

### Create New Service
```bash
curl -X POST http://localhost:3002/api/v1/servicepage/services \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Service",
    "subtitle": "Subtitle",
    "description": "Service description",
    "displayOrder": 5
  }'
```

### Update Process Section 1
```bash
curl -X PUT http://localhost:3002/api/v1/servicepage/process-sections/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Process Title",
    "description": "Updated description"
  }'
```

### Update Construction Section 2
```bash
curl -X PUT http://localhost:3002/api/v1/servicepage/construction-sections/2 \
  -H "Content-Type: application/json" \
  -d '{
    "titleLeft": "Updated Title",
    "contentsLeft": ["New content 1", "New content 2"]
  }'
```

---

## Notes

1. **Section Numbers**: Process and construction sections use numbers 1-4, corresponding to the four main service types
2. **Active Status**: All entities have an `is_active` field for soft deletion
3. **JSON Storage**: Construction section contents are stored as JSON arrays in the database
4. **Pagination**: Services endpoint supports optional pagination via query parameters
5. **Default Values**: The main endpoint provides default values if sections don't exist in the database
6. **Error Handling**: All endpoints include comprehensive error handling and validation
7. **Frontend Compatibility**: The main endpoint (`GET /`) returns data in the exact format expected by the frontend service 