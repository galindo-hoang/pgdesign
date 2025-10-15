# File Upload Service Interface Guide

## 🎯 Overview

Hệ thống file upload đã được refactor để sử dụng **Interface Pattern** và **Factory Pattern**, cho phép dễ dàng switch giữa các storage providers (MinIO, AWS S3, Google Cloud, Azure, etc.) mà không cần thay đổi code logic.

## 📁 File Structure

```
pgdesign-be/src/
├── interfaces/
│   └── IFileUploadService.ts        # Interface definition
├── services/
│   ├── fileUploadService.ts         # MinIO implementation
│   └── awsS3FileUploadService.ts    # AWS S3 implementation (example)
└── factories/
    └── FileUploadServiceFactory.ts  # Factory pattern
```

## 🔧 Interface Definition

```typescript
export interface IFileUploadService {
  // Core methods
  validateFile(file: FileUpload): void;
  uploadImage(file: FileUpload, folder?: string): Promise<string>;
  uploadMultipleImages(files: FileUpload[], folder?: string): Promise<string[]>;
  uploadImageWithThumbnail(file: FileUpload, folder?: string): Promise<{ original: string; thumbnail: string }>;
  deleteFile(objectName: string): Promise<void>;
  deleteFileByUrl(url: string): Promise<void>;
  
  // Utility methods
  getFileUrl(objectName: string): Promise<string>;
  extractObjectNameFromUrl(url: string): string;
  processImage(buffer: Buffer, mimeType: string): Promise<Buffer>;
  generateThumbnail(buffer: Buffer, width?: number, height?: number): Promise<Buffer>;
}
```

## 🚀 Usage Examples

### 1. Using Default Service (MinIO)

```typescript
// Import default singleton instance
import fileUploadService from '../services/fileUploadService';

// Use directly
const imageUrl = await fileUploadService.uploadImage(file, 'projects');
```

### 2. Using Factory Pattern

```typescript
import { FileUploadServiceFactory, StorageProvider } from '../factories/FileUploadServiceFactory';

// Get service instance (singleton)
const uploadService = FileUploadServiceFactory.getInstance();

// Or create specific provider
const minioService = FileUploadServiceFactory.createService(StorageProvider.MINIO);
const s3Service = FileUploadServiceFactory.createService(StorageProvider.AWS_S3);
```

### 3. Using Environment Variable

```typescript
// In your .env file:
// STORAGE_PROVIDER=minio  (or 'aws-s3', 'google-cloud', etc.)

import { getFileUploadService } from '../factories/FileUploadServiceFactory';

// Automatically uses provider from env
const uploadService = getFileUploadService();
const url = await uploadService.uploadImage(file, 'images');
```

### 4. Custom Configuration

```typescript
import { MinIOFileUploadService } from '../services/fileUploadService';

// Create custom instance with specific config
const customService = new MinIOFileUploadService({
  bucketName: 'custom-bucket',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: ['image/jpeg', 'image/png'],
  publicEndpoint: 'cdn.example.com'
});

const url = await customService.uploadImage(file, 'custom-folder');
```

## 🔄 Switching Providers

### Option 1: Environment Variable

Thay đổi trong `.env`:
```env
# Switch to AWS S3
STORAGE_PROVIDER=aws-s3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=your-bucket
```

Restart server → Hệ thống tự động dùng AWS S3!

### Option 2: Runtime Switch

```typescript
import { FileUploadServiceFactory, StorageProvider } from '../factories/FileUploadServiceFactory';

// Development: Use MinIO
if (process.env.NODE_ENV === 'development') {
  const service = FileUploadServiceFactory.createService(StorageProvider.MINIO);
}

// Production: Use AWS S3
if (process.env.NODE_ENV === 'production') {
  const service = FileUploadServiceFactory.createService(StorageProvider.AWS_S3);
}
```

## 📝 Implementing New Storage Provider

### Step 1: Create Service Class

```typescript
// src/services/googleCloudStorageService.ts

import { IFileUploadService, FileUploadConfig } from '../interfaces/IFileUploadService';

export class GoogleCloudStorageService implements IFileUploadService {
  private config: FileUploadConfig;

  constructor(config?: FileUploadConfig) {
    this.config = {
      bucketName: process.env.GCS_BUCKET_NAME,
      ...config
    };
    // Initialize Google Cloud Storage client
  }

  // Implement all interface methods
  async uploadImage(file: FileUpload, folder?: string): Promise<string> {
    // Your Google Cloud Storage upload logic
  }

  // ... implement other methods
}
```

### Step 2: Add to Factory

```typescript
// src/factories/FileUploadServiceFactory.ts

import { GoogleCloudStorageService } from '../services/googleCloudStorageService';

export enum StorageProvider {
  // ... existing providers
  GOOGLE_CLOUD = 'google-cloud'
}

// In createService method:
case StorageProvider.GOOGLE_CLOUD:
  return new GoogleCloudStorageService(config);
```

### Step 3: Use New Provider

```typescript
// Set in .env
STORAGE_PROVIDER=google-cloud
GCS_BUCKET_NAME=your-bucket
```

Done! 🎉

## 🧪 Testing Different Providers

```typescript
// test/fileUpload.test.ts

import { FileUploadServiceFactory, StorageProvider } from '../factories/FileUploadServiceFactory';

describe('File Upload Services', () => {
  it('should work with MinIO', async () => {
    const service = FileUploadServiceFactory.createService(StorageProvider.MINIO);
    const url = await service.uploadImage(mockFile, 'test');
    expect(url).toContain('localhost:9000');
  });

  it('should work with AWS S3', async () => {
    const service = FileUploadServiceFactory.createService(StorageProvider.AWS_S3);
    const url = await service.uploadImage(mockFile, 'test');
    expect(url).toContain('amazonaws.com');
  });
});
```

## 📊 Current Implementations

### ✅ MinIO (Default)
- **Status:** Fully implemented and tested
- **Use case:** Local development, self-hosted production
- **Config:**
  ```env
  STORAGE_PROVIDER=minio
  MINIO_ENDPOINT=localhost
  MINIO_PORT=9000
  MINIO_BUCKET_NAME=pgdesign-assets
  MINIO_ACCESS_KEY=minioadmin
  MINIO_SECRET_KEY=minioadmin
  ```

### ✅ AWS S3 (Example Implementation)
- **Status:** Code ready, needs AWS SDK installation
- **Use case:** AWS cloud production
- **Install:** `npm install @aws-sdk/client-s3`
- **Config:**
  ```env
  STORAGE_PROVIDER=aws-s3
  AWS_REGION=us-east-1
  AWS_ACCESS_KEY_ID=your-key
  AWS_SECRET_ACCESS_KEY=your-secret
  AWS_S3_BUCKET=your-bucket
  ```

### 🔜 Google Cloud Storage
- **Status:** Not implemented yet
- **Install:** `npm install @google-cloud/storage`
- **Implementation:** Follow the pattern in `awsS3FileUploadService.ts`

### 🔜 Azure Blob Storage
- **Status:** Not implemented yet
- **Install:** `npm install @azure/storage-blob`
- **Implementation:** Follow the pattern in `awsS3FileUploadService.ts`

### 🔜 Local File System
- **Status:** Not implemented yet
- **Use case:** Testing, simple deployments
- **No external dependencies needed**

## 🎯 Best Practices

### 1. Use Dependency Injection

```typescript
// controllers/UploadController.ts

import { IFileUploadService } from '../interfaces/IFileUploadService';
import { getFileUploadService } from '../factories/FileUploadServiceFactory';

export class UploadController {
  private uploadService: IFileUploadService;

  constructor(uploadService?: IFileUploadService) {
    // Inject service or use default
    this.uploadService = uploadService || getFileUploadService();
  }

  async uploadImage(req: Request, res: Response) {
    const url = await this.uploadService.uploadImage(file, 'images');
    res.json({ url });
  }
}
```

### 2. Configure per Environment

```typescript
// config/storage.ts

import { FileUploadServiceFactory, StorageProvider } from '../factories/FileUploadServiceFactory';

export const getStorageService = () => {
  const env = process.env.NODE_ENV;
  
  switch (env) {
    case 'development':
      return FileUploadServiceFactory.createService(StorageProvider.MINIO);
    
    case 'staging':
      return FileUploadServiceFactory.createService(StorageProvider.AWS_S3, {
        bucketName: 'staging-bucket'
      });
    
    case 'production':
      return FileUploadServiceFactory.createService(StorageProvider.AWS_S3, {
        bucketName: 'production-bucket'
      });
    
    default:
      return FileUploadServiceFactory.createService(StorageProvider.MINIO);
  }
};
```

### 3. Error Handling

```typescript
try {
  const url = await uploadService.uploadImage(file, 'images');
  return url;
} catch (error) {
  if (error.message.includes('Invalid file type')) {
    // Handle validation error
  } else if (error.message.includes('Failed to upload')) {
    // Handle upload error
  }
  throw error;
}
```

## 🔒 Security Considerations

1. **Validation:** Always validate files before upload
2. **Size Limits:** Configure appropriate file size limits
3. **Mime Types:** Restrict allowed file types
4. **Access Control:** Use proper ACLs on storage
5. **URL Signing:** Consider signed URLs for sensitive content

## 📚 Additional Resources

- [MinIO Documentation](https://min.io/docs/)
- [AWS S3 SDK](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-examples.html)
- [Google Cloud Storage](https://cloud.google.com/storage/docs)
- [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/)

## 🎉 Summary

- ✅ Interface-based architecture
- ✅ Factory pattern for easy switching
- ✅ MinIO implementation (production-ready)
- ✅ AWS S3 example implementation
- ✅ Environment-based configuration
- ✅ Easy to extend with new providers
- ✅ Backward compatible with existing code

Bây giờ bạn có thể dễ dàng switch storage providers mà không cần thay đổi business logic! 🚀

