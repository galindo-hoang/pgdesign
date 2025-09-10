# File Upload System Documentation

## ✅ **Issues Fixed**

1. **Fixed FileUploadService**: Now generates public URLs instead of expiring presigned URLs
2. **Created Upload API Endpoints**: Complete set of upload endpoints for different use cases
3. **Added Multer Middleware**: Proper file upload handling with validation
4. **Made MinIO Bucket Public**: Files are now publicly accessible without authentication
5. **Updated Upload Scripts**: Scripts now use public URLs

## 📋 **Available Upload Endpoints**

### Base URL: `http://localhost:3002/api/v1/upload`

### 1. **Single Image Upload**
```
POST /api/v1/upload/image
Content-Type: multipart/form-data

Body:
- image: file (required)
- folder: string (optional, default: 'images')

Response:
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "http://localhost:9000/pgdesign-assets/images/uuid.jpg",
    "filename": "original-name.jpg",
    "size": 1024576,
    "mimetype": "image/jpeg"
  }
}
```

### 2. **Multiple Images Upload**
```
POST /api/v1/upload/images
Content-Type: multipart/form-data

Body:
- images: file[] (required, max 10 files)
- folder: string (optional, default: 'images')

Response:
{
  "success": true,
  "message": "Images uploaded successfully",
  "data": {
    "urls": ["http://localhost:9000/pgdesign-assets/images/uuid1.jpg", ...],
    "count": 3,
    "files": [{"filename": "...", "size": 1024, "mimetype": "image/jpeg"}, ...]
  }
}
```

### 3. **Image with Thumbnail**
```
POST /api/v1/upload/image-with-thumbnail
Content-Type: multipart/form-data

Body:
- image: file (required)
- folder: string (optional, default: 'images')

Response:
{
  "success": true,
  "message": "Image with thumbnail uploaded successfully",
  "data": {
    "original": "http://localhost:9000/pgdesign-assets/images/uuid.jpg",
    "thumbnail": "http://localhost:9000/pgdesign-assets/images/thumbnails/uuid_thumb.jpg",
    "filename": "original-name.jpg",
    "size": 1024576,
    "mimetype": "image/jpeg"
  }
}
```

### 4. **Project Images**
```
POST /api/v1/upload/project-images
Content-Type: multipart/form-data

Body:
- projectImages: file[] (required, max 10 files)
- projectId: string (optional, default: 'general')

Response:
{
  "success": true,
  "message": "Project images uploaded successfully",
  "data": {
    "urls": ["http://localhost:9000/pgdesign-assets/projects/project-id/uuid1.jpg", ...],
    "count": 5,
    "projectId": "project-123"
  }
}
```

### 5. **Icons Upload**
```
POST /api/v1/upload/icons
Content-Type: multipart/form-data

Body:
- icons: file[] (required, max 20 files)

Response:
{
  "success": true,
  "message": "Icons uploaded successfully",
  "data": {
    "urls": ["http://localhost:9000/pgdesign-assets/icons/uuid1.svg", ...],
    "count": 3
  }
}
```

### 6. **File Deletion**
```
DELETE /api/v1/upload/file
Content-Type: application/json

Body:
{
  "url": "http://localhost:9000/pgdesign-assets/images/uuid.jpg"
}

Response:
{
  "success": true,
  "message": "File deleted successfully"
}
```

## 🔧 **Integration Examples**

### Example 1: **Update Homepage Hero Section with Image Upload**

```typescript
// In HomepageController.ts
import { uploadSingle } from '../middleware/uploadMiddleware';
import { convertMulterFileToFileUpload } from '../middleware/uploadMiddleware';
import fileUploadService from '../services/fileUploadService';

// Add this method to HomepageController
updateHeroWithImage = asyncHandler(async (req: Request, res: Response) => {
  const { heroData } = req.body;
  
  // Handle image upload if provided
  if (req.file) {
    const fileUpload = convertMulterFileToFileUpload(req.file);
    const imageUrl = await fileUploadService.uploadImage(fileUpload, 'hero');
    heroData.imageUrl = imageUrl;
  }
  
  // Update hero data in database
  const updatedHero = await HeroModel.update(heroData.id, heroData);
  
  res.json({
    success: true,
    data: updatedHero,
    message: 'Hero updated successfully'
  });
});
```

```typescript
// In homepage.ts routes
import { uploadSingle } from '../middleware/uploadMiddleware';

// Add this route
router.put('/hero-with-image', uploadSingle('heroImage'), homepageController.updateHeroWithImage);
```

### Example 2: **Project Category with Background Image**

```typescript
// In ProjectPageController.ts
updateProjectCategoryWithImage = asyncHandler(async (req: Request, res: Response) => {
  const { categoryData } = req.body;
  
  // Handle background image upload
  if (req.file) {
    const fileUpload = convertMulterFileToFileUpload(req.file);
    const imageUrl = await fileUploadService.uploadImage(fileUpload, 'categories');
    categoryData.backgroundImageUrl = imageUrl;
  }
  
  // Update category in database
  const updatedCategory = await ProjectCategoriesModel.update(categoryData.id, categoryData);
  
  res.json({
    success: true,
    data: updatedCategory,
    message: 'Category updated successfully'
  });
});
```

### Example 3: **Blog Post with Multiple Images**

```typescript
// In BlogPageController.ts
import { uploadMultiple } from '../middleware/uploadMiddleware';

createBlogPostWithImages = asyncHandler(async (req: Request, res: Response) => {
  const { blogData } = req.body;
  
  // Handle multiple images upload
  if (req.files && Array.isArray(req.files)) {
    const files = req.files as Express.Multer.File[];
    const fileUploads = files.map(convertMulterFileToFileUpload);
    const imageUrls = await fileUploadService.uploadMultipleImages(fileUploads, 'blog');
    blogData.imageUrls = imageUrls;
  }
  
  // Create blog post in database
  const createdBlog = await BlogPageModel.create(blogData);
  
  res.json({
    success: true,
    data: createdBlog,
    message: 'Blog post created successfully'
  });
});
```

```typescript
// In blogpage.ts routes
router.post('/blog-with-images', uploadMultiple('blogImages', 5), blogPageController.createBlogPostWithImages);
```

## 🛠️ **Frontend Integration Examples**

### JavaScript/React Example:

```javascript
// Upload single image
const uploadSingleImage = async (file, folder = 'images') => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', folder);
  
  const response = await fetch('http://localhost:3002/api/v1/upload/image', {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
};

// Upload multiple images
const uploadMultipleImages = async (files, folder = 'images') => {
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  formData.append('folder', folder);
  
  const response = await fetch('http://localhost:3002/api/v1/upload/images', {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
};

// Update hero section with image
const updateHeroWithImage = async (heroData, imageFile) => {
  const formData = new FormData();
  formData.append('heroData', JSON.stringify(heroData));
  if (imageFile) {
    formData.append('heroImage', imageFile);
  }
  
  const response = await fetch('http://localhost:3002/api/v1/homepage/hero-with-image', {
    method: 'PUT',
    body: formData
  });
  
  return await response.json();
};
```

### React Component Example:

```jsx
import React, { useState } from 'react';

const ImageUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('images', file));
    
    try {
      const response = await fetch('http://localhost:3002/api/v1/upload/images', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      if (result.success) {
        setUploadedUrls(result.data.urls);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        onChange={handleFileSelect}
      />
      <button onClick={handleUpload}>Upload Images</button>
      
      {uploadedUrls.length > 0 && (
        <div>
          <h3>Uploaded Images:</h3>
          {uploadedUrls.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded ${index}`} width="200" />
          ))}
        </div>
      )}
    </div>
  );
};
```

## 📝 **Configuration**

### Environment Variables:
```env
# MinIO Configuration
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET_NAME=pgdesign-assets
MINIO_PUBLIC_ENDPOINT=localhost:9000  # For production, use your domain

# Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB in bytes
CONVERT_TO_WEBP=false  # Optional: convert images to WebP
```

### File Types Supported:
- `image/jpeg`
- `image/jpg`
- `image/png`
- `image/gif`
- `image/webp`
- `image/svg+xml`

### File Size Limits:
- Maximum file size: 5MB (configurable)
- Maximum files per upload: 10 (configurable per endpoint)

## 🔒 **Security Features**

1. **File Type Validation**: Only allowed image types accepted
2. **File Size Limits**: Prevents oversized uploads
3. **File Processing**: Images are processed and optimized
4. **Unique Filenames**: UUID-based naming prevents conflicts
5. **Folder Organization**: Files organized by purpose/category

## 🎯 **Best Practices**

1. **Always validate file uploads** on both client and server side
2. **Use appropriate folder structures** for different content types
3. **Implement proper error handling** for failed uploads
4. **Consider image optimization** for better performance
5. **Use thumbnails** for large images in listings
6. **Implement file cleanup** for unused images

## 🚀 **Public URL Format**

All uploaded files are now publicly accessible at:
```
http://localhost:9000/pgdesign-assets/[folder]/[filename]
```

For production, replace `localhost:9000` with your MinIO server's public endpoint.

## 📋 **Testing Commands**

```bash
# Test single image upload
curl -X POST http://localhost:3002/api/v1/upload/image \
  -F "image=@/path/to/your/image.jpg" \
  -F "folder=test"

# Test multiple images upload
curl -X POST http://localhost:3002/api/v1/upload/images \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg" \
  -F "folder=test"

# Test file deletion
curl -X DELETE http://localhost:3002/api/v1/upload/file \
  -H "Content-Type: application/json" \
  -d '{"url": "http://localhost:9000/pgdesign-assets/test/uuid.jpg"}'
```

## 🎉 **Summary**

The file upload system is now fully functional with:
- ✅ Public URLs (no expiration)
- ✅ Multiple upload endpoints
- ✅ File validation and processing
- ✅ Proper error handling
- ✅ Easy integration with existing APIs
- ✅ Frontend-friendly responses

Your images and SVG files will now be uploaded to MinIO and accessible via public URLs! 