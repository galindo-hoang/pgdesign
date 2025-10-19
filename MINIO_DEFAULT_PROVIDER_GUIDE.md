# MinIO as Default Storage Provider

## ✅ Configuration

MinIO đã được thiết lập làm **default storage provider** cho hệ thống. Tất cả các providers khác đều optional và sẽ fallback về MinIO nếu không available.

## 🎯 Default Behavior

### Automatic Fallback Chain

```
User specifies provider → Check if available → Fallback to MinIO if not

Examples:
  STORAGE_PROVIDER=aws-s3      → AWS SDK not installed → ⚠️ Fallback to MinIO
  STORAGE_PROVIDER=google-cloud → Not implemented     → ⚠️ Fallback to MinIO
  STORAGE_PROVIDER=invalid     → Unknown provider     → ⚠️ Fallback to MinIO
  (not specified)              → Use default          → ✅ MinIO
```

### Code Implementation

```typescript
// FileUploadServiceFactory.ts

static createService(provider: StorageProvider = StorageProvider.MINIO, config?: FileUploadConfig) {
  switch (provider) {
    case StorageProvider.MINIO:
      // ✅ Always available - no external dependencies
      return new MinIOFileUploadService(config);

    case StorageProvider.AWS_S3:
      try {
        return new AWSS3FileUploadService(config);
      } catch (error) {
        console.warn('AWS S3 SDK not available, falling back to MinIO');
        return new MinIOFileUploadService(config);  // ← Fallback
      }

    case StorageProvider.GOOGLE_CLOUD:
      console.warn('Google Cloud not implemented, using MinIO');
      return new MinIOFileUploadService(config);  // ← Fallback

    default:
      console.warn(`Unknown provider, using MinIO`);
      return new MinIOFileUploadService(config);  // ← Fallback
  }
}
```

## 📊 Provider Support Status

| Provider | Status | Dependencies | Fallback |
|----------|--------|--------------|----------|
| **MinIO** | ✅ Production Ready | Built-in | N/A (default) |
| **AWS S3** | 🟡 Example Ready | `@aws-sdk/client-s3` | → MinIO |
| **Google Cloud** | ⚪ Not Implemented | `@google-cloud/storage` | → MinIO |
| **Azure Blob** | ⚪ Not Implemented | `@azure/storage-blob` | → MinIO |
| **Local FS** | ⚪ Not Implemented | Built-in | → MinIO |

## 🔧 Environment Configuration

### Default (MinIO) - No Config Needed

```bash
# .env - MinIO với default values
# Không cần set STORAGE_PROVIDER, mặc định là minio

# Optional: Override MinIO settings
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_BUCKET_NAME=pgdesign-assets
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
```

### Try AWS S3 (với fallback)

```bash
# .env
STORAGE_PROVIDER=aws-s3

# AWS S3 config (if AWS SDK installed)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=your-bucket

# MinIO config (fallback nếu AWS không available)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_BUCKET_NAME=pgdesign-assets
```

**Kết quả:**
- Nếu AWS SDK installed → Use AWS S3 ✅
- Nếu AWS SDK missing → Use MinIO ⚠️ (với warning log)

## 🚀 Usage Examples

### Example 1: Default Usage (MinIO)

```typescript
// Không cần config gì - tự động dùng MinIO
import { getFileUploadService } from '../factories/FileUploadServiceFactory';

const uploadService = getFileUploadService();
const url = await uploadService.uploadImage(file, 'images');

// Console: ✅ File Upload Service initialized with provider: MinIO (default)
```

### Example 2: Try AWS S3, Fallback to MinIO

```bash
# .env
STORAGE_PROVIDER=aws-s3
```

```typescript
import { getFileUploadService } from '../factories/FileUploadServiceFactory';

const uploadService = getFileUploadService();
// If AWS SDK not installed:
// Console: ⚠️ AWS S3 SDK not available, falling back to MinIO
// Console: ⚠️ To use AWS S3, install: npm install @aws-sdk/client-s3
// Console: ✅ File Upload Service initialized with provider: MinIO (default)

const url = await uploadService.uploadImage(file, 'images');
// Works perfectly với MinIO!
```

### Example 3: Invalid Provider

```bash
# .env
STORAGE_PROVIDER=invalid-provider
```

```typescript
const uploadService = getFileUploadService();
// Console: ⚠️ Unknown storage provider: invalid-provider, using MinIO as default
// Console: ✅ File Upload Service initialized with provider: MinIO (default)

// Vẫn hoạt động bình thường với MinIO
```

## 💡 Why MinIO as Default?

### 1. **No External Dependencies**
- ✅ Already installed in project
- ✅ No additional packages needed
- ✅ Works out of the box

### 2. **S3-Compatible**
- ✅ Same API as AWS S3
- ✅ Easy to migrate to AWS later
- ✅ Industry standard

### 3. **Self-Hosted**
- ✅ Full control over data
- ✅ No cloud costs during development
- ✅ Privacy compliant

### 4. **Production Ready**
- ✅ High performance
- ✅ Scalable
- ✅ Reliable
- ✅ Well documented

## 🔄 Migration Path

### Development → Production

#### Development: Use MinIO (Default)
```bash
# .env.development
STORAGE_PROVIDER=minio  # or omit - defaults to minio
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
```

#### Production: Switch to AWS S3
```bash
# .env.production
STORAGE_PROVIDER=aws-s3
AWS_REGION=us-east-1
AWS_S3_BUCKET=production-bucket
AWS_ACCESS_KEY_ID=prod-key
AWS_SECRET_ACCESS_KEY=prod-secret

# Keep MinIO config as fallback
MINIO_ENDPOINT=backup-server.com
MINIO_BUCKET_NAME=backup-bucket
```

**Benefits:**
- Development: Free, fast, local MinIO
- Production: Scalable AWS S3
- Fallback: Always works with MinIO

## 🛡️ Reliability Features

### 1. **Graceful Degradation**
```typescript
try {
  return new AWSS3FileUploadService(config);
} catch (error) {
  console.warn('AWS S3 not available, falling back to MinIO');
  return new MinIOFileUploadService(config);  // Always works
}
```

### 2. **Safe Defaults**
```typescript
// All config có defaults
{
  bucketName: process.env.MINIO_BUCKET_NAME || 'pgdesign-assets',
  endpoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: process.env.MINIO_PORT || '9000',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
}
```

### 3. **Clear Logging**
```
✅ File Upload Service initialized with provider: MinIO (default)
⚠️ AWS S3 SDK not available, falling back to MinIO
⚠️ To use AWS S3, install: npm install @aws-sdk/client-s3
```

## 📝 Environment Variables

### Required (None! All have defaults)

MinIO sẽ hoạt động ngay cả khi không config gì.

### Optional (MinIO)

```bash
# Override defaults if needed
MINIO_ENDPOINT=minio.example.com
MINIO_PORT=9000
MINIO_USE_SSL=true
MINIO_BUCKET_NAME=my-custom-bucket
MINIO_PUBLIC_ENDPOINT=cdn.example.com
MINIO_ACCESS_KEY=custom-key
MINIO_SECRET_KEY=custom-secret
MAX_FILE_SIZE=10485760  # 10MB
```

### Optional (AWS S3)

```bash
# Only if you want to use AWS S3
STORAGE_PROVIDER=aws-s3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=your-bucket
```

## 🧪 Testing

### Test Default Provider
```typescript
describe('FileUploadServiceFactory', () => {
  it('should default to MinIO', () => {
    const service = FileUploadServiceFactory.getInstance();
    expect(service).toBeInstanceOf(MinIOFileUploadService);
  });

  it('should fallback to MinIO on invalid provider', () => {
    process.env.STORAGE_PROVIDER = 'invalid';
    const service = FileUploadServiceFactory.getInstance();
    expect(service).toBeInstanceOf(MinIOFileUploadService);
  });

  it('should fallback to MinIO when AWS SDK not available', () => {
    process.env.STORAGE_PROVIDER = 'aws-s3';
    // Assume AWS SDK not installed
    const service = FileUploadServiceFactory.getInstance();
    expect(service).toBeInstanceOf(MinIOFileUploadService);
  });
});
```

## 🎯 Recommendation

### For Development
```bash
# Đơn giản nhất - không config gì
# MinIO tự động dùng với defaults
```

### For Staging
```bash
# Có thể dùng MinIO hoặc cloud storage
STORAGE_PROVIDER=minio
MINIO_ENDPOINT=staging-minio.example.com
```

### For Production
```bash
# Option 1: Self-hosted MinIO (recommended for control)
STORAGE_PROVIDER=minio
MINIO_ENDPOINT=prod-minio.example.com
MINIO_USE_SSL=true
MINIO_PUBLIC_ENDPOINT=cdn.example.com

# Option 2: AWS S3 (recommended for scale)
STORAGE_PROVIDER=aws-s3
AWS_REGION=us-east-1
AWS_S3_BUCKET=prod-bucket
# ... AWS credentials
```

## ✨ Summary

**MinIO là default vì:**
- ✅ No external dependencies
- ✅ S3-compatible API
- ✅ Self-hosted
- ✅ Production ready
- ✅ Cost effective
- ✅ Works out of the box

**Fallback behavior:**
- ✅ All providers fallback to MinIO
- ✅ Clear warnings in logs
- ✅ System always works
- ✅ No runtime errors

**Configuration:**
- ✅ Zero config needed for development
- ✅ Simple config for production
- ✅ Safe defaults everywhere
- ✅ Easy to override

**Hệ thống luôn hoạt động với MinIO!** 🚀

