# Unified API với Automatic Image Upload

## ✅ Overview

API endpoints cũ đã được cập nhật để **tự động detect và xử lý image uploads** mà không cần tạo endpoints mới. Cùng một endpoint có thể nhận cả JSON và multipart/form-data.

## 🎯 Key Features

- ✅ **Same endpoints** - Không tạo endpoints mới với hậu tố `-with-images`
- ✅ **Smart detection** - Tự động detect xem có files hay không
- ✅ **Backward compatible** - JSON requests vẫn hoạt động bình thường
- ✅ **Automatic upload** - Upload images lên S3 tự động nếu có files
- ✅ **Clean API** - Đơn giản và dễ sử dụng

## 📊 API Endpoints (Unchanged URLs)

| Method | Endpoint | Content-Type | Description |
|--------|----------|--------------|-------------|
| **POST** | `/api/v1/projectdetail` | `application/json` hoặc `multipart/form-data` | Create project |
| **PUT** | `/api/v1/projectdetail/:id` | `application/json` hoặc `multipart/form-data` | Update project |
| **DELETE** | `/api/v1/projectdetail/:id/images` | `application/json` | Remove images |

## 🚀 Usage Examples

### 1. Create Project - JSON Only (No Images)

```javascript
// Cách cũ - vẫn hoạt động bình thường
const response = await fetch('http://localhost:3002/api/v1/projectdetail', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    projectId: 'project-001',
    title: 'Modern Apartment',
    clientName: 'John Doe',
    area: '120m2',
    // ... other fields
  })
});
```

### 2. Create Project - With Images

```javascript
// Cùng endpoint - chỉ cần đổi sang FormData
const formData = new FormData();

// Add project data as JSON string
formData.append('projectData', JSON.stringify({
  projectId: 'project-001',
  title: 'Modern Apartment',
  clientName: 'John Doe',
  area: '120m2',
  // ... other fields
}));

// Add thumbnail file (optional)
if (thumbnailFile) {
  formData.append('thumbnail', thumbnailFile);
}

// Add gallery images (optional)
if (galleryFiles && galleryFiles.length > 0) {
  galleryFiles.forEach(file => {
    formData.append('images', file);
  });
}

const response = await fetch('http://localhost:3002/api/v1/projectdetail', {
  method: 'POST',
  body: formData
  // No Content-Type header - browser sets it automatically
});

// Response
{
  "success": true,
  "data": {
    "id": 123,
    "projectId": "project-001",
    "thumbnailImage": "http://localhost:9000/pgdesign-assets/project-details/project-001/uuid_thumb.jpg",
    "projectImages": [
      "http://localhost:9000/pgdesign-assets/project-details/project-001/uuid1.jpg",
      "http://localhost:9000/pgdesign-assets/project-details/project-001/uuid2.jpg"
    ],
    // ... other fields
  },
  "message": "Project detail created successfully"
}
```

### 3. Update Project - JSON Only

```javascript
// Update chỉ text fields - không upload images
const response = await fetch('http://localhost:3002/api/v1/projectdetail/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Updated Title',
    description: 'Updated description'
  })
});
```

### 4. Update Project - With New Thumbnail

```javascript
// Cùng endpoint - upload thumbnail mới
const formData = new FormData();

formData.append('projectData', JSON.stringify({
  title: 'Updated Title',
  description: 'Updated description'
}));

// New thumbnail - will replace old one
formData.append('thumbnail', newThumbnailFile);

const response = await fetch('http://localhost:3002/api/v1/projectdetail/123', {
  method: 'PUT',
  body: formData
});

// Old thumbnail automatically deleted from S3
// New thumbnail URL returned in response
```

### 5. Update Project - Add Gallery Images

```javascript
// Add new images to existing gallery
const formData = new FormData();

formData.append('projectData', JSON.stringify({
  title: 'Updated Title'
}));

// Add new images - will be appended to existing images
newGalleryFiles.forEach(file => {
  formData.append('images', file);
});

const response = await fetch('http://localhost:3002/api/v1/projectdetail/123', {
  method: 'PUT',
  body: formData
});

// Response will have both old and new images
{
  "success": true,
  "data": {
    "projectImages": [
      "http://.../old-image-1.jpg",  // existing
      "http://.../old-image-2.jpg",  // existing
      "http://.../new-image-1.jpg",  // newly added
      "http://.../new-image-2.jpg"   // newly added
    ]
  }
}
```

### 6. Remove Specific Images

```javascript
// Remove specific images from gallery
const response = await fetch('http://localhost:3002/api/v1/projectdetail/123/images', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    imageUrls: [
      'http://localhost:9000/pgdesign-assets/project-details/project-001/image1.jpg',
      'http://localhost:9000/pgdesign-assets/project-details/project-001/image2.jpg'
    ]
  })
});

// Images deleted from both S3 and database
```

## 🔧 Backend Implementation

### Controller Logic (Simplified)

```typescript
createProjectDetail = asyncHandler(async (req: Request, res: Response) => {
  // Auto-detect: JSON or FormData?
  const projectData = req.body.projectData 
    ? JSON.parse(req.body.projectData)  // FormData
    : req.body;                          // JSON

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  
  // Upload thumbnail if exists
  if (files?.thumbnail?.[0]) {
    projectData.thumbnailImage = await this.imageService.uploadThumbnail(...);
  }

  // Upload gallery images if exist
  if (files?.images?.length > 0) {
    projectData.projectImages = await this.imageService.uploadGalleryImages(...);
  }

  // Create project (with or without images)
  const projectDetail = await ProjectDetailModel.create(projectData);
  
  res.status(201).json({ success: true, data: projectDetail });
});
```

## 📱 Frontend Service Update

### Webadmin Service

```javascript
// webadmin/src/services/projectDetailAdminService.ts

// Create project - auto detects if images included
export const createProject = async (projectData, thumbnailFile = null, imageFiles = []) => {
  // If có files, dùng FormData
  if (thumbnailFile || imageFiles.length > 0) {
    const formData = new FormData();
    formData.append('projectData', JSON.stringify(projectData));
    
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }
    
    imageFiles.forEach(file => {
      formData.append('images', file);
    });
    
    const response = await fetch(`${API_BASE_URL}/projectdetail`, {
      method: 'POST',
      body: formData
    });
    
    return await response.json();
  } else {
    // Không có files, dùng JSON như cũ
    const response = await fetch(`${API_BASE_URL}/projectdetail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    
    return await response.json();
  }
};

// Update project - auto detects if images included
export const updateProject = async (projectId, projectData, thumbnailFile = null, imageFiles = []) => {
  // Get numeric ID first
  const existingProject = await getProjectById(projectId);
  if (!existingProject.id) {
    throw new Error('Could not find project numeric ID');
  }

  // If có files, dùng FormData
  if (thumbnailFile || imageFiles.length > 0) {
    const formData = new FormData();
    formData.append('projectData', JSON.stringify(projectData));
    
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }
    
    imageFiles.forEach(file => {
      formData.append('images', file);
    });
    
    const response = await fetch(`${API_BASE_URL}/projectdetail/${existingProject.id}`, {
      method: 'PUT',
      body: formData
    });
    
    return await response.json();
  } else {
    // Không có files, dùng JSON như cũ
    const response = await fetch(`${API_BASE_URL}/projectdetail/${existingProject.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    
    return await response.json();
  }
};
```

## 🎨 Frontend Component Update

### React Component Example

```jsx
// webadmin/src/pages/ProjectDetailEditor.tsx

const handleSave = async () => {
  setSaving(true);
  try {
    // Collect files to upload
    const thumbnailFile = thumbnailInputRef.current?.files?.[0];
    const imageFiles = Array.from(imageInputRef.current?.files || []);

    if (mode === 'add') {
      // Create với automatic upload
      await createProject(formData, thumbnailFile, imageFiles);
    } else if (projectId) {
      // Update với automatic upload
      await updateProject(projectId, formData, thumbnailFile, imageFiles);
    }
    
    navigate('/project-details');
  } catch (error) {
    console.error('Error saving project:', error);
    alert('Lỗi khi lưu dự án');
  } finally {
    setSaving(false);
  }
};
```

## 🔄 Request Flow

### JSON Request (No Images)
```
Frontend → JSON body → Backend → Database → Response
```

### Multipart Request (With Images)
```
Frontend 
  ↓ FormData (files + projectData)
Backend Controller
  ↓ detects files
Image Service
  ↓ uploads to S3
S3 Storage
  ↓ returns URLs
Backend Controller
  ↓ saves URLs to database
Database
  ↓ returns project with URLs
Response to Frontend
```

## 📝 Request Examples

### cURL Examples

**Create without images:**
```bash
curl -X POST http://localhost:3002/api/v1/projectdetail \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "project-001",
    "title": "Modern Apartment",
    "clientName": "John Doe",
    "area": "120m2",
    "constructionDate": "2024-01-01",
    "address": "Hanoi",
    "category": "appartment",
    "projectCategoryId": 1,
    "htmlContent": "<div>Content</div>"
  }'
```

**Create with images:**
```bash
curl -X POST http://localhost:3002/api/v1/projectdetail \
  -F "projectData={\"projectId\":\"project-001\",\"title\":\"Modern Apartment\",\"clientName\":\"John Doe\",\"area\":\"120m2\",\"constructionDate\":\"2024-01-01\",\"address\":\"Hanoi\",\"category\":\"appartment\",\"projectCategoryId\":1,\"htmlContent\":\"<div>Content</div>\"}" \
  -F "thumbnail=@/path/to/thumbnail.jpg" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

**Update without images:**
```bash
curl -X PUT http://localhost:3002/api/v1/projectdetail/123 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "description": "Updated description"
  }'
```

**Update with images:**
```bash
curl -X PUT http://localhost:3002/api/v1/projectdetail/123 \
  -F "projectData={\"title\":\"Updated Title\",\"description\":\"Updated description\"}" \
  -F "thumbnail=@/path/to/new-thumbnail.jpg" \
  -F "images=@/path/to/new-image1.jpg"
```

## 💡 Benefits

### 1. **API Simplicity**
- ✅ Chỉ cần nhớ 1 endpoint cho create
- ✅ Chỉ cần nhớ 1 endpoint cho update
- ✅ Không cần endpoints riêng cho images

### 2. **Backward Compatibility**
- ✅ Existing JSON requests vẫn hoạt động
- ✅ Không breaking changes
- ✅ Gradual migration path

### 3. **Developer Experience**
- ✅ Intuitive API design
- ✅ Less endpoints to maintain
- ✅ Clear request/response format

### 4. **Automatic Image Management**
- ✅ Upload to S3 automatically
- ✅ Generate thumbnails automatically
- ✅ Delete old images automatically
- ✅ Store URLs in database automatically

## 🔄 Migration from Old Base64 System

### Before (Base64)
```javascript
// Frontend had to convert to base64 first
const base64Thumbnail = await fileToBase64(thumbnailFile);
const base64Images = await Promise.all(imageFiles.map(fileToBase64));

await fetch('/api/v1/projectdetail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    projectId: 'project-001',
    thumbnailImageBlob: base64Thumbnail,      // Large base64 string
    projectImagesBlob: base64Images,          // Array of large strings
    // ... other fields
  })
});
```

### After (S3 URLs)
```javascript
// Frontend chỉ cần gửi files trực tiếp
const formData = new FormData();
formData.append('projectData', JSON.stringify({
  projectId: 'project-001',
  // ... other fields (no thumbnail/images here)
}));

formData.append('thumbnail', thumbnailFile);         // Binary file
imageFiles.forEach(file => formData.append('images', file)); // Binary files

await fetch('/api/v1/projectdetail', {
  method: 'POST',
  body: formData  // Browser handles multipart encoding
});

// Backend automatically:
// 1. Uploads files to S3
// 2. Gets URLs
// 3. Saves URLs to database
// 4. Returns project with URLs
```

## 🎯 Best Practices

### 1. **Frontend Service Layer**

```javascript
// Good: Single function handles both cases
export const createProject = async (projectData, thumbnailFile = null, imageFiles = []) => {
  const hasFiles = thumbnailFile || imageFiles.length > 0;
  
  if (hasFiles) {
    const formData = new FormData();
    formData.append('projectData', JSON.stringify(projectData));
    if (thumbnailFile) formData.append('thumbnail', thumbnailFile);
    imageFiles.forEach(f => formData.append('images', f));
    
    return await fetchAPI('/projectdetail', 'POST', formData);
  } else {
    return await fetchAPI('/projectdetail', 'POST', projectData);
  }
};
```

### 2. **Error Handling**

```javascript
try {
  const result = await createProject(projectData, thumbnail, images);
  if (result.success) {
    console.log('Project created:', result.data);
    console.log('Thumbnail URL:', result.data.thumbnailImage);
    console.log('Image URLs:', result.data.projectImages);
  }
} catch (error) {
  if (error.message.includes('Validation')) {
    // Handle validation errors
  } else if (error.message.includes('upload')) {
    // Handle upload errors
  }
}
```

### 3. **Progressive Enhancement**

```javascript
// Start simple - no images
const basicProject = await createProject({
  projectId: 'project-001',
  title: 'My Project',
  // ... required fields
});

// Later - add images via update
await updateProject('project-001', {}, thumbnailFile, imageFiles);
```

## 📊 Comparison

| Feature | Old System (Base64) | New System (S3 URLs) |
|---------|-------------------|---------------------|
| **API Endpoints** | Same | ✅ Same (unified) |
| **Request Size** | Very large (base64) | Small (binary) |
| **Upload Speed** | Slow (large payload) | ✅ Fast |
| **Database Size** | Large | ✅ Small |
| **Image Quality** | Compressed for size | ✅ Original quality |
| **CDN Support** | Not possible | ✅ Easy to add |
| **Caching** | Poor | ✅ Excellent |
| **Browser Memory** | High usage | ✅ Low usage |

## 🧪 Testing

### Test JSON Request
```javascript
describe('ProjectDetail API', () => {
  it('should create project without images', async () => {
    const response = await request(app)
      .post('/api/v1/projectdetail')
      .send({ projectId: 'test-001', title: 'Test', ... });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
```

### Test Multipart Request
```javascript
describe('ProjectDetail API with Images', () => {
  it('should create project with images', async () => {
    const response = await request(app)
      .post('/api/v1/projectdetail')
      .field('projectData', JSON.stringify({ projectId: 'test-001', ... }))
      .attach('thumbnail', 'test/fixtures/thumb.jpg')
      .attach('images', 'test/fixtures/img1.jpg')
      .attach('images', 'test/fixtures/img2.jpg');
    
    expect(response.status).toBe(201);
    expect(response.body.data.thumbnailImage).toBeDefined();
    expect(response.body.data.projectImages).toHaveLength(2);
  });
});
```

## ✨ Summary

- ✅ **Unified API** - Cùng endpoints cho cả JSON và multipart requests
- ✅ **Smart Detection** - Backend tự động detect và xử lý files
- ✅ **No New Endpoints** - Không tạo endpoints mới
- ✅ **Backward Compatible** - JSON requests vẫn hoạt động
- ✅ **Automatic Upload** - Images tự động upload lên S3
- ✅ **Clean Code** - Đơn giản và dễ maintain

**API đã được unified và optimized!** 🎉


