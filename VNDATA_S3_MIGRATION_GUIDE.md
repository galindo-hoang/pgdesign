# VNData S3 Migration Guide

## ✅ VNData S3 Setup Complete

Bạn đã mua gói S3 storage từ **VNData** ([https://s3-hcm-r2.s3cloud.vn](https://s3-hcm-r2.s3cloud.vn)) - một dịch vụ S3-compatible tại Việt Nam.

### 🔐 Credentials

```
Endpoint:    https://s3-hcm-r2.s3cloud.vn
Access Key:  KS1KMPXYY4CEPQ5RW5BN
Secret Key:  ErdmFIm4R8T2WzU9QvUFyPb0Y1HUREdIxTBo8DEK
Region:      hcm-r2
Bucket:      pgdesign-assets
```

## 🚀 Quick Start

### Option 1: Switch to VNData (Recommended)

**Step 1: Update Environment Variables**

```bash
cd pgdesign-be

# Copy environment template
cp .env.production .env

# Or manually edit .env
nano .env
```

Add these lines to `.env`:

```env
# Storage Provider
STORAGE_PROVIDER=vndata-s3

# VNData S3 Credentials
VNDATA_S3_ENDPOINT=https://s3-hcm-r2.s3cloud.vn
VNDATA_ACCESS_KEY=KS1KMPXYY4CEPQ5RW5BN
VNDATA_SECRET_KEY=ErdmFIm4R8T2WzU9QvUFyPb0Y1HUREdIxTBo8DEK
VNDATA_BUCKET_NAME=pgdesign-assets
VNDATA_REGION=hcm-r2
```

**Step 2: Restart Backend**

```bash
# Kill current server
pkill -f "ts-node\|nodemon"

# Start with new config
npm run dev
```

**Step 3: Verify**

You should see:
```
✅ VNData S3 Service initialized: s3-hcm-r2.s3cloud.vn/pgdesign-assets
🚀 Server is running on port 3002
```

**Done!** ✅ New uploads sẽ tự động lưu vào VNData S3.

### Option 2: Keep MinIO for Development

```env
# Development: Use local MinIO
STORAGE_PROVIDER=minio
MINIO_ENDPOINT=localhost
MINIO_PORT=9000

# Production will use VNData (set in production environment)
```

## 📦 Files Created

1. **VNData Service Implementation**
   - `/src/services/vnDataS3FileUploadService.ts` ✅
   - Implements IFileUploadService interface
   - S3-compatible using MinIO client

2. **Factory Updated**
   - `/src/factories/FileUploadServiceFactory.ts` ✅
   - Added `VNDATA_S3` provider
   - Automatic config from environment

3. **Test Scripts**
   - `/scripts/testVNDataConnection.js` ✅
   - Tests passed! Connection verified

4. **Environment Templates**
   - `.env.production` ✅
   - Ready-to-use configuration

## 🔄 Migration Options

### Option A: Fresh Upload (Recommended)

Since bucket is empty, upload images mới:

```bash
# Run migration from public/assets to VNData
# Make sure STORAGE_PROVIDER=vndata-s3 in .env first

node scripts/migrateImagesFromPublicToMinIO.js
# Script will automatically use VNData because of STORAGE_PROVIDER env
```

### Option B: Copy from MinIO to VNData

```bash
# Run migration script (may take time với nhiều images)
node scripts/migrateMinIOToVNData.js
```

This will:
1. Copy all objects từ MinIO → VNData
2. Update database URLs: `localhost:9000` → `s3-hcm-r2.s3cloud.vn`

## 🧪 Testing

### Test Upload

```bash
# Test single image upload
curl -X POST http://localhost:3002/api/v1/upload/image \
  -F "image=@test-image.png" \
  -F "folder=test"

# Should return:
{
  "success": true,
  "data": {
    "url": "https://s3-hcm-r2.s3cloud.vn/pgdesign-assets/test/uuid.png"
  }
}
```

### Test Create Project

```bash
curl -X POST http://localhost:3002/api/v1/projectdetail \
  -F 'projectData={"projectId":"vndata-test-001",...}' \
  -F 'thumbnail=@image.jpg'

# Images will upload to VNData automatically
```

## 📊 Architecture

```
Frontend Upload
    ↓
Backend API (auto-detects provider from env)
    ↓
FileUploadServiceFactory
    ↓
VNDataS3FileUploadService (if STORAGE_PROVIDER=vndata-s3)
    ↓
VNData S3 Storage (Vietnam)
    ↓
Public URLs: https://s3-hcm-r2.s3cloud.vn/pgdesign-assets/...
```

## 💰 Benefits of VNData

✅ **Tốc độ**: Servers tại Việt Nam = faster cho users VN  
✅ **Giá rẻ**: Cheaper than AWS S3 cho VN market  
✅ **S3-Compatible**: Dùng same code như MinIO/AWS  
✅ **HTTPS**: Secure connections built-in  
✅ **CDN Ready**: Support CDN cho performance  

## 🔧 Configuration Options

### Development vs Production

```javascript
// config/storage.ts (example)
const getStorageProvider = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'vndata-s3';  // Production: VNData
  } else {
    return 'minio';       // Development: Local MinIO
  }
};
```

### Custom Bucket per Environment

```env
# Staging
STORAGE_PROVIDER=vndata-s3
VNDATA_BUCKET_NAME=pgdesign-staging

# Production
STORAGE_PROVIDER=vndata-s3
VNDATA_BUCKET_NAME=pgdesign-production
```

## 🎯 Current Status

✅ **Connection Tested** - All tests passed  
✅ **Bucket Created** - `pgdesign-assets` ready  
✅ **Public Policy Set** - Images publicly accessible  
✅ **Service Implemented** - VNDataS3FileUploadService ready  
✅ **Factory Updated** - Auto-switch based on env  
✅ **Test Upload Works** - Verified with test file  

## 📝 Next Steps

1. **Update .env**
   ```bash
   STORAGE_PROVIDER=vndata-s3
   # Add VNData credentials
   ```

2. **Restart Backend**
   ```bash
   npm run dev
   ```

3. **Upload Images**
   - Automatic for new projects
   - Or run migration script for existing

4. **Verify URLs**
   - Check API responses
   - Verify images accessible

## 🎉 Summary

**Implementation complete!**

- ✅ VNData S3 service created
- ✅ Factory pattern supports VNData
- ✅ Connection tested and verified
- ✅ Bucket created and configured
- ✅ Ready for production use

**Just update `.env` và restart server!** 🚀

Hệ thống sẽ tự động dùng VNData S3 cho tất cả uploads.

