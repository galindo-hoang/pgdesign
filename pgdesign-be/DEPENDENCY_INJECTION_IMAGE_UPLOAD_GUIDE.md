# Dependency Injection Image Upload System

## 🎯 Overview

Hệ thống upload images với **Dependency Injection pattern** cho phép tự động upload images khi create hoặc update projects và blogs từ webadmin hoặc website chính.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│           IFileUploadService                    │
│              (Interface)                        │
└─────────────────┬───────────────────────────────┘
                  │
                  │ injected into
                  ▼
┌─────────────────────────────────────────────────┐
│        ProjectImageService                      │
│        BlogImageService                         │
│          (Service Layer)                        │
└─────────────────┬───────────────────────────────┘
                  │
                  │ injected into
                  ▼
┌─────────────────────────────────────────────────┐
│      ProjectDetailController                    │
│      BlogPostController                         │
│         (Controllers)                           │
└─────────────────────────────────────────────────┘
```

## 📁 File Structure

```
pgdesign-be/src/
├── interfaces/
│   └── IFileUploadService.ts          # Storage interface
├── services/
│   ├── minIOFileUploadService.ts      # MinIO implementation
│   ├── awsS3FileUploadService.ts      # AWS S3 implementation
│   ├── projectImageService.ts         # ✨ NEW: Project image logic
│   └── blogImageService.ts            # ✨ NEW: Blog image logic
├── controllers/
│   ├── ProjectDetailController.ts     # ✨ UPDATED: With DI
│   └── BlogPostController.ts          # ✨ UPDATED: With DI (example)
└── routes/
    ├── projectdetail.ts               # ✨ UPDATED: New endpoints
    └── blog.ts                        # ✨ UPDATED: New endpoints (example)
```

## 🚀 Usage Examples

### 1. Create Project with Images (Webadmin)

#### Frontend Code
```javascript
// webadmin/src/services/projectService.ts

export const createProjectWithImages = async (
  projectData, 
  thumbnailFile, 
  galleryFiles
) => {
  const formData = new FormData();
  
  // Add project data as JSON string
  formData.append('projectData', JSON.stringify(projectData));
  
  // Add thumbnail file
  if (thumbnailFile) {
    formData.append('thumbnail', thumbnailFile);
  }
  
  // Add multiple gallery images
  if (galleryFiles && galleryFiles.length > 0) {
    galleryFiles.forEach(file => {
      formData.append('images', file);
    });
  }
  
  const response = await fetch('http://localhost:3002/api/v1/projectdetail/with-images', {
    method: 'POST',
    body: formData
    // No Content-Type header - browser sets it with boundary
  });
  
  return await response.json();
};
```

#### React Component Example
```jsx
import React, { useState } from 'react';

const CreateProjectForm = () => {
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [projectData, setProjectData] = useState({
    projectId: 'project-001',
    title: 'Modern Apartment',
    clientName: 'John Doe',
    // ... other fields
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await createProjectWithImages(
        projectData,
        thumbnailFile,
        galleryFiles
      );
      
      if (result.success) {
        alert('Project created successfully!');
        console.log('Uploaded URLs:', result.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Project fields */}
      <input 
        type="text" 
        value={projectData.title}
        onChange={(e) => setProjectData({...projectData, title: e.target.value})}
      />
      
      {/* Thumbnail upload */}
      <input 
        type="file" 
        accept="image/*"
        onChange={(e) => setThumbnailFile(e.target.files[0])}
      />
      
      {/* Gallery upload */}
      <input 
        type="file" 
        accept="image/*"
        multiple
        onChange={(e) => setGalleryFiles(Array.from(e.target.files))}
      />
      
      <button type="submit">Create Project</button>
    </form>
  );
};
```

### 2. Update Project with Images

#### Frontend Code
```javascript
export const updateProjectWithImages = async (
  projectId,
  projectData, 
  thumbnailFile = null, // Optional - only if replacing
  newGalleryFiles = [] // Optional - will be added to existing
) => {
  const formData = new FormData();
  formData.append('projectData', JSON.stringify(projectData));
  
  if (thumbnailFile) {
    formData.append('thumbnail', thumbnailFile);
  }
  
  if (newGalleryFiles.length > 0) {
    newGalleryFiles.forEach(file => formData.append('images', file));
  }
  
  const response = await fetch(
    `http://localhost:3002/api/v1/projectdetail/${projectId}/with-images`, 
    {
      method: 'PUT',
      body: formData
    }
  );
  
  return await response.json();
};
```

### 3. Remove Images from Gallery

#### Frontend Code
```javascript
export const removeProjectImages = async (projectId, imageUrls) => {
  const response = await fetch(
    `http://localhost:3002/api/v1/projectdetail/${projectId}/images`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrls })
    }
  );
  
  return await response.json();
};

// Usage
await removeProjectImages('project-001', [
  'http://localhost:9000/pgdesign-assets/project-details/project-001/image1.jpg',
  'http://localhost:9000/pgdesign-assets/project-details/project-001/image2.jpg'
]);
```

## 🔧 Backend Implementation Details

### ProjectImageService

```typescript
// services/projectImageService.ts

export class ProjectImageService {
  private uploadService: IFileUploadService;

  constructor(uploadService?: IFileUploadService) {
    // Dependency Injection - can inject custom storage service
    this.uploadService = uploadService || getFileUploadService();
  }

  // Core methods
  async uploadThumbnail(file: FileUpload, projectId: string): Promise<string>
  async uploadGalleryImages(files: FileUpload[], projectId: string): Promise<string[]>
  async replaceThumbnail(oldUrl: string, newFile: FileUpload, projectId: string): Promise<string>
  async addGalleryImages(existing: string[], new: FileUpload[], projectId: string): Promise<string[]>
  async deleteOldImages(urls: string[]): Promise<void>
}
```

### ProjectDetailController with DI

```typescript
// controllers/ProjectDetailController.ts

export class ProjectDetailController {
  private imageService: ProjectImageService;

  constructor(imageService?: ProjectImageService) {
    // Dependency Injection
    this.imageService = imageService || new ProjectImageService();
  }

  // New endpoints
  createProjectWithImages = asyncHandler(async (req, res) => { ... });
  updateProjectWithImages = asyncHandler(async (req, res) => { ... });
  removeProjectImages = asyncHandler(async (req, res) => { ... });
}
```

## 🧪 Testing with Dependency Injection

### Unit Tests

```typescript
// __tests__/projectDetailController.test.ts

import { ProjectDetailController } from '../controllers/ProjectDetailController';
import { ProjectImageService } from '../services/projectImageService';

describe('ProjectDetailController', () => {
  it('should create project with images', async () => {
    // Mock image service
    const mockImageService = {
      uploadThumbnail: jest.fn().mockResolvedValue('http://example.com/thumb.jpg'),
      uploadGalleryImages: jest.fn().mockResolvedValue([
        'http://example.com/img1.jpg',
        'http://example.com/img2.jpg'
      ])
    } as any;

    // Inject mock service
    const controller = new ProjectDetailController(mockImageService);

    // Test controller method
    const req = createMockRequest();
    const res = createMockResponse();
    
    await controller.createProjectWithImages(req, res);

    expect(mockImageService.uploadThumbnail).toHaveBeenCalledTimes(1);
    expect(mockImageService.uploadGalleryImages).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

```typescript
// __tests__/integration/projectWithImages.test.ts

import request from 'supertest';
import app from '../app';
import { FileUploadServiceFactory, StorageProvider } from '../factories/FileUploadServiceFactory';

describe('Project with Images Integration', () => {
  beforeAll(() => {
    // Use test storage provider
    FileUploadServiceFactory.reset();
    process.env.STORAGE_PROVIDER = 'local'; // or mock provider
  });

  it('should create project with images end-to-end', async () => {
    const response = await request(app)
      .post('/api/v1/projectdetail/with-images')
      .field('projectData', JSON.stringify({
        projectId: 'test-001',
        title: 'Test Project',
        // ... other fields
      }))
      .attach('thumbnail', 'test/fixtures/thumb.jpg')
      .attach('images', 'test/fixtures/img1.jpg')
      .attach('images', 'test/fixtures/img2.jpg');

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.thumbnailImage).toBeDefined();
    expect(response.body.data.projectImages).toHaveLength(2);
  });
});
```

## 🔌 Custom Storage Provider for Testing

```typescript
// services/mockFileUploadService.ts

export class MockFileUploadService implements IFileUploadService {
  private uploadedFiles: Map<string, Buffer> = new Map();

  async uploadImage(file: FileUpload, folder: string): Promise<string> {
    const mockUrl = `mock://${folder}/${file.originalname}`;
    this.uploadedFiles.set(mockUrl, file.buffer);
    return mockUrl;
  }

  async deleteFileByUrl(url: string): Promise<void> {
    this.uploadedFiles.delete(url);
  }

  // ... implement other interface methods

  // Helper for testing
  getUploadedFiles() {
    return this.uploadedFiles;
  }
}

// Usage in tests
const mockStorage = new MockFileUploadService();
const imageService = new ProjectImageService(mockStorage);
const controller = new ProjectDetailController(imageService);
```

## 🎨 Best Practices

### 1. Separation of Concerns

```typescript
// ✅ GOOD: Separation of concerns
class ProjectImageService {
  // Only handles image upload logic
  async uploadThumbnail(file: FileUpload, projectId: string) { ... }
}

class ProjectDetailController {
  // Only handles HTTP requests/responses
  async createProjectWithImages(req: Request, res: Response) {
    const urls = await this.imageService.uploadThumbnail(...);
    const project = await ProjectDetailModel.create(...);
    res.json(...);
  }
}

// ❌ BAD: Mixed concerns
class ProjectDetailController {
  async createProject(req: Request, res: Response) {
    // Image upload logic mixed with controller logic
    const buffer = await sharp(file.buffer).resize(...);
    await minioClient.putObject(...);
    const project = await ProjectDetailModel.create(...);
  }
}
```

### 2. Dependency Injection

```typescript
// ✅ GOOD: DI allows testing and flexibility
constructor(imageService?: ProjectImageService) {
  this.imageService = imageService || new ProjectImageService();
}

// ❌ BAD: Hard-coded dependency
constructor() {
  this.imageService = new ProjectImageService(); // Can't inject mock
}
```

### 3. Error Handling

```typescript
// ✅ GOOD: Proper error handling
async uploadThumbnail(file: FileUpload, projectId: string): Promise<string> {
  try {
    const result = await this.uploadService.uploadImageWithThumbnail(file, folder);
    return result.thumbnail;
  } catch (error) {
    console.error('Error uploading project thumbnail:', error);
    throw createError('Failed to upload project thumbnail', 500);
  }
}
```

### 4. Transaction-like Behavior

```typescript
// ✅ GOOD: Upload first, then save to DB
async createProjectWithImages(req, res) {
  // 1. Upload images first (can fail without DB changes)
  const thumbnailUrl = await this.imageService.uploadThumbnail(...);
  const imageUrls = await this.imageService.uploadGalleryImages(...);
  
  // 2. Save to database with URLs
  try {
    const project = await ProjectDetailModel.create({
      ...projectData,
      thumbnailImage: thumbnailUrl,
      projectImages: imageUrls
    });
    res.json({ success: true, data: project });
  } catch (dbError) {
    // 3. Cleanup: delete uploaded images if DB save fails
    await this.imageService.deleteOldImages([thumbnailUrl, ...imageUrls]);
    throw dbError;
  }
}
```

## 📊 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/v1/projectdetail/with-images` | Create project with images |
| **PUT** | `/api/v1/projectdetail/:id/with-images` | Update project with images |
| **DELETE** | `/api/v1/projectdetail/:id/images` | Remove specific images |

## 🔄 Flow Diagram

```
┌─────────────┐
│  Webadmin   │
│  Upload     │
└──────┬──────┘
       │ FormData (thumbnail + images + projectData)
       ▼
┌─────────────────────┐
│ ProjectDetail       │
│ Controller          │
│ (with DI)           │
└──────┬──────────────┘
       │ calls
       ▼
┌─────────────────────┐
│ ProjectImage        │
│ Service             │
│ (with DI)           │
└──────┬──────────────┘
       │ calls
       ▼
┌─────────────────────┐
│ IFileUploadService  │
│ (MinIO/S3/etc)      │
└──────┬──────────────┘
       │ uploads
       ▼
┌─────────────────────┐
│   S3/MinIO          │
│   Storage           │
└──────┬──────────────┘
       │ returns URLs
       ▼
┌─────────────────────┐
│ ProjectDetail       │
│ Database            │
│ (URLs only)         │
└─────────────────────┘
```

## ✨ Benefits

1. **Testability**: Easy to mock dependencies
2. **Flexibility**: Can swap storage providers
3. **Maintainability**: Clear separation of concerns
4. **Reusability**: Services can be reused across controllers
5. **Type Safety**: TypeScript interfaces ensure contract compliance

## 🎉 Summary

- ✅ Dependency Injection pattern implemented
- ✅ Service layer for image handling
- ✅ Automatic image upload on create/update
- ✅ Works with webadmin and main website
- ✅ Easy to test with mocks
- ✅ Flexible storage provider support
- ✅ Clean architecture

Your projects and blogs now automatically upload images to S3 when created or updated! 🚀

