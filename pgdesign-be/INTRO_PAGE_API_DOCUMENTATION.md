# Intro Page CRUD API Documentation

This document provides complete documentation for all CRUD (Create, Read, Update, Delete) operations available for the intro page sections.

## Base URL
```
http://localhost:3002/api/v1/intropage
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

## 1. Main Intro Page Endpoint

### Get All Intro Page Data
```
GET /api/v1/intropage
```

**Response:**
```json
{
  "success": true,
  "data": {
    "aboutIntro": { ... },
    "visionMission": { ... },
    "commitments": { ... },
    "team": { ... }
  }
}
```

---

## 2. About Intro Section

### Get About Intro Data
```
GET /api/v1/intropage/about-intro
```

### Create About Intro Data
```
POST /api/v1/intropage/about-intro
```

**Request Body:**
```json
{
  "brandTitle": "PG DESIGN",
  "brandSubtitle": "KIẾN TẠO KHÔNG GIAN",
  "identity": "KHẲNG ĐỊNH BẢN SẮC",
  "descriptions": [
    "Description paragraph 1",
    "Description paragraph 2"
  ],
  "backgroundImage": "http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg"
}
```

### Update About Intro Data
```
PUT /api/v1/intropage/about-intro/:id
```

**Request Body:** (partial update supported)
```json
{
  "brandTitle": "Updated PG DESIGN",
  "descriptions": [
    "Updated description paragraph 1",
    "Updated description paragraph 2"
  ]
}
```

### Delete About Intro Data
```
DELETE /api/v1/intropage/about-intro/:id
```

---

## 3. Vision Mission Section

### Get Vision Mission Data
```
GET /api/v1/intropage/vision-mission
```

### Create Vision Mission Data
```
POST /api/v1/intropage/vision-mission
```

**Request Body:**
```json
{
  "visionMission": {
    "image": "http://localhost:9000/pgdesign-assets/images/vision-mission-section.jpg",
    "vision": {
      "title": "TẦM NHÌN",
      "paragraphs": [
        "Vision paragraph 1",
        "Vision paragraph 2"
      ]
    },
    "mission": {
      "title": "SỨ MỆNH"
    },
    "coreValues": {
      "title": "GIÁ TRỊ CỐT LÕI"
    }
  },
  "missionItems": [
    "Mission item 1",
    "Mission item 2",
    "Mission item 3"
  ],
  "coreValues": [
    {
      "title": "Core Value 1",
      "description": "Description for core value 1",
      "displayOrder": 0
    },
    {
      "title": "Core Value 2",
      "description": "Description for core value 2",
      "displayOrder": 1
    }
  ]
}
```

### Update Vision Mission Data
```
PUT /api/v1/intropage/vision-mission/:id
```

**Request Body:** (partial update supported)
```json
{
  "visionMission": {
    "vision": {
      "title": "Updated Vision Title",
      "paragraphs": [
        "Updated vision paragraph 1",
        "Updated vision paragraph 2"
      ]
    }
  },
  "missionItems": [
    "Updated mission item 1",
    "Updated mission item 2"
  ]
}
```

### Delete Vision Mission Data
```
DELETE /api/v1/intropage/vision-mission/:id
```

---

## 4. Commitments Section

### Get Commitments Data
```
GET /api/v1/intropage/commitments
```

### Create Commitments Data
```
POST /api/v1/intropage/commitments
```

**Request Body:**
```json
{
  "commitments": {
    "title": "CAM KẾT CỦA PG DESIGN"
  },
  "commitmentItems": [
    {
      "iconName": "direct-execution-icon",
      "iconUrl": "http://localhost:9000/pgdesign-assets/icons/direct-execution-icon.svg",
      "title": "KHÔNG KHOÁN THẦU",
      "description": "PG Design cam kết trực tiếp đảm nhận từ khâu thiết kế đến thi công, không giao khoán cho bên thứ ba.",
      "displayOrder": 0
    },
    {
      "iconName": "quality-materials-icon",
      "iconUrl": "http://localhost:9000/pgdesign-assets/icons/quality-materials-icon.svg",
      "title": "VẬT TƯ ĐẠT CHUẨN",
      "description": "Chúng tôi sử dụng vật liệu chính hãng, rõ nguồn gốc, đảm bảo độ bền và tính thẩm mỹ cho công trình.",
      "displayOrder": 1
    }
  ]
}
```

### Update Commitments Data
```
PUT /api/v1/intropage/commitments/:id
```

**Request Body:** (partial update supported)
```json
{
  "commitments": {
    "title": "Updated Commitments Title"
  },
  "commitmentItems": [
    {
      "iconName": "new-icon",
      "iconUrl": "http://localhost:9000/pgdesign-assets/icons/new-icon.svg",
      "title": "NEW COMMITMENT",
      "description": "New commitment description",
      "displayOrder": 0
    }
  ]
}
```

### Delete Commitments Data
```
DELETE /api/v1/intropage/commitments/:id
```

---

## 5. Team Section

### Get Team Data
```
GET /api/v1/intropage/team
```

### Create Team Data
```
POST /api/v1/intropage/team
```

**Request Body:**
```json
{
  "team": {
    "content": {
      "heading": "Đội ngũ PG Design",
      "description": "Những người trẻ đầy nhiệt huyết và đam mê sáng tạo. Đội ngũ được xây dựng để đồng hành cùng bạn từ bước định hình ý tưởng, phát triển bản sắc thương hiệu cho đến quản lý toàn bộ quy trình - từ trước đến sau khi sản phẩm hoàn thiện."
    }
  },
  "boardDirectors": [
    {
      "name": "Phan Anh Thư",
      "title": "CEO & Founder",
      "image": "http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg",
      "displayOrder": 0
    },
    {
      "name": "Võ Nguyên Pháp",
      "title": "Project Director",
      "image": "http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg",
      "displayOrder": 1
    }
  ],
  "teamMembers": [
    {
      "name": "Nguyễn Văn A",
      "title": "Senior Architect",
      "image": "http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg",
      "displayOrder": 0
    },
    {
      "name": "Trần Thị B",
      "title": "Interior Designer",
      "image": "http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg",
      "displayOrder": 1
    }
  ]
}
```

### Update Team Data
```
PUT /api/v1/intropage/team/:id
```

**Request Body:** (partial update supported)
```json
{
  "team": {
    "content": {
      "heading": "Updated Team Heading",
      "description": "Updated team description"
    }
  },
  "boardDirectors": [
    {
      "name": "Updated Director Name",
      "title": "Updated Director Title",
      "image": "http://localhost:9000/pgdesign-assets/images/updated-image.jpg",
      "displayOrder": 0
    }
  ]
}
```

### Delete Team Data
```
DELETE /api/v1/intropage/team/:id
```

---

## Testing Examples

### Using curl to test endpoints:

**Get all intro page data:**
```bash
curl -X GET http://localhost:3002/api/v1/intropage
```

**Create new about intro data:**
```bash
curl -X POST http://localhost:3002/api/v1/intropage/about-intro \
  -H "Content-Type: application/json" \
  -d '{
    "brandTitle": "PG DESIGN",
    "brandSubtitle": "KIẾN TẠO KHÔNG GIAN",
    "identity": "KHẲNG ĐỊNH BẢN SẮC",
    "descriptions": [
      "Description paragraph 1",
      "Description paragraph 2"
    ],
    "backgroundImage": "http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg"
  }'
```

**Update about intro data:**
```bash
curl -X PUT http://localhost:3002/api/v1/intropage/about-intro/1 \
  -H "Content-Type: application/json" \
  -d '{
    "brandTitle": "Updated PG DESIGN"
  }'
```

**Delete about intro data:**
```bash
curl -X DELETE http://localhost:3002/api/v1/intropage/about-intro/1
```

---

## Notes

1. All endpoints support proper validation and return appropriate error messages
2. The system uses an active/inactive flag pattern - only one record per section can be active at a time
3. When creating new data, existing active records are automatically deactivated
4. All endpoints support partial updates (PATCH-like behavior with PUT)
5. Images are stored in MinIO and referenced by URL
6. The API includes proper error handling and validation for all fields
7. Response data is properly formatted and includes related items (mission items, core values, commitment items, team members)

## Status Codes

- `200 OK` - Successful GET/PUT/DELETE operations
- `201 Created` - Successful POST operations
- `400 Bad Request` - Validation errors or missing required fields
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors 