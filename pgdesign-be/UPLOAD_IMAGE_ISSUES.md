# Upload Image Issues Found

## ❌ VẤN ĐỀ 1: Extension Mismatch

**Line 86-88:**
```typescript
const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
const fileName = `${uuidv4()}.${fileExtension}`;
const objectName = `${folder}/${fileName}`;
```

**Line 118-126 (processImage):**
```typescript
if (metadata.width && metadata.width > 1920) {
  return await sharpInstance
    .resize(1920, null, { ... })
    .jpeg({ quality: 85 })  // ← Always converts to JPEG!
    .toBuffer();
}
```

### Vấn đề:
Khi upload file **PNG** có width > 1920:
- Extension: `image.png` → fileName: `uuid.png` ✅
- Processing: Convert to JPEG ❌
- Result: File thực tế là JPEG nhưng extension là `.png`

### Tương tự với WebP:
```typescript
if (process.env.CONVERT_TO_WEBP === 'true') {
  return await sharpInstance
    .webp({ quality: 85 })  // ← Convert to WebP
    .toBuffer();
}
```

File JPG upload → convert to WebP → nhưng extension vẫn là `.jpg`

---

## ❌ VẤN ĐỀ 2: Undefined Extension

**Line 86:**
```typescript
const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
```

### Vấn đề:
- Nếu `originalname` không có dấu chấm (e.g., "image")
- `fileExtension` = `undefined`
- `fileName` = `uuid.undefined`
- Extension không hợp lệ!

---

## ❌ VẤN ĐỀ 3: MIME Type vs Extension

**Line 100:**
```typescript
await this.s3Client.putObject(this.bucketName, objectName, processedBuffer, {
  'Content-Type': file.mimetype,  // ← Original MIME type
  'Cache-Control': 'max-age=31536000',
});
```

### Vấn đề:
- Original file: `image.png` → mimetype: `image/png`
- After processing: JPEG buffer
- Upload with: Content-Type: `image/png` (wrong!)
- Actual data: JPEG

Browser sẽ nhận:
```
Content-Type: image/png
Extension: .png
Actual data: JPEG binary
```
→ Có thể gây lỗi rendering hoặc caching issues!

---

## ✅ GIẢI PHÁP ĐỀ XUẤT

### Fix 1: Track Actual Format After Processing

```typescript
async uploadImage(file: FileUpload, folder: string = 'images'): Promise<string> {
  this.validateFile(file);

  try {
    let processedBuffer = file.buffer;
    let actualFormat = file.mimetype;
    let actualExtension = file.originalname.split('.').pop()?.toLowerCase() || 'jpg';

    // Process image if it's not SVG
    if (file.mimetype !== 'image/svg+xml') {
      const processed = await this.processImage(file.buffer, file.mimetype);
      processedBuffer = processed.buffer;
      actualFormat = processed.format;
      actualExtension = processed.extension;
    }

    const fileName = `${uuidv4()}.${actualExtension}`;
    const objectName = `${folder}/${fileName}`;

    // Upload with correct Content-Type
    await this.s3Client.putObject(this.bucketName, objectName, processedBuffer, {
      'Content-Type': actualFormat,
      'Cache-Control': 'max-age=31536000',
    });

    return await this.getFileUrl(objectName);
  } catch (error) {
    console.error('Error uploading file to VNData S3:', error);
    throw createError('Failed to upload file to VNData S3', 500);
  }
}
```

### Fix 2: Update processImage to Return Format Info

```typescript
interface ProcessedImage {
  buffer: Buffer;
  format: string;  // MIME type
  extension: string;  // File extension
}

async processImage(buffer: Buffer, mimeType: string): Promise<ProcessedImage> {
  try {
    const sharpInstance = sharp(buffer);
    const metadata = await sharpInstance.metadata();

    // Check if we need to convert to WebP
    const shouldConvertToWebP = process.env.CONVERT_TO_WEBP === 'true';
    
    // Resize if image is too large
    if (metadata.width && metadata.width > 1920) {
      if (shouldConvertToWebP) {
        // Convert to WebP
        return {
          buffer: await sharpInstance
            .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
            .webp({ quality: 85 })
            .toBuffer(),
          format: 'image/webp',
          extension: 'webp'
        };
      } else {
        // Keep original format or use JPEG
        const isJpeg = mimeType === 'image/jpeg' || mimeType === 'image/jpg';
        return {
          buffer: await sharpInstance
            .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
            .jpeg({ quality: 85 })
            .toBuffer(),
          format: 'image/jpeg',
          extension: 'jpg'
        };
      }
    }

    // Convert to WebP without resizing
    if (shouldConvertToWebP) {
      return {
        buffer: await sharpInstance.webp({ quality: 85 }).toBuffer(),
        format: 'image/webp',
        extension: 'webp'
      };
    }

    // No processing needed, return original
    const extension = this.getExtensionFromMimeType(mimeType);
    return {
      buffer: buffer,
      format: mimeType,
      extension: extension
    };
  } catch (error) {
    console.error('Error processing image:', error);
    const extension = this.getExtensionFromMimeType(mimeType);
    return {
      buffer: buffer,
      format: mimeType,
      extension: extension
    };
  }
}

private getExtensionFromMimeType(mimeType: string): string {
  const mimeToExt: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg'
  };
  return mimeToExt[mimeType] || 'jpg';
}
```

### Fix 3: Fallback for Missing Extension

```typescript
const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
if (!fileExtension) {
  throw createError('File must have a valid extension', 400);
}
```

---

## 🧪 TEST CASES

### Test Case 1: Upload PNG > 1920px
```
Input: image.png (2000x1500px)
Current behavior:
  - File name: uuid.png
  - Content-Type: image/png
  - Actual data: JPEG ❌

Expected behavior:
  - File name: uuid.jpg
  - Content-Type: image/jpeg
  - Actual data: JPEG ✅
```

### Test Case 2: Upload JPG with CONVERT_TO_WEBP=true
```
Input: photo.jpg
Current behavior:
  - File name: uuid.jpg
  - Content-Type: image/jpeg
  - Actual data: WebP ❌

Expected behavior:
  - File name: uuid.webp
  - Content-Type: image/webp
  - Actual data: WebP ✅
```

### Test Case 3: Upload file without extension
```
Input: originalname = "myimage"
Current behavior:
  - File name: uuid.undefined ❌

Expected behavior:
  - Error: "File must have a valid extension" ✅
```

---

## 📊 IMPACT

### High Impact:
- ❌ Browser cache issues (wrong Content-Type)
- ❌ Image display issues in some browsers
- ❌ CDN caching with wrong headers
- ❌ File extension doesn't match actual format

### Examples:
```bash
# Current behavior:
curl -I https://s3.../uuid.png
Content-Type: image/png
# But actual data is JPEG → Browser confusion!

# Fixed behavior:
curl -I https://s3.../uuid.jpg
Content-Type: image/jpeg
# Matches actual data ✅
```

---

## ⚡ PRIORITY: HIGH

This affects:
- ✅ All image uploads
- ✅ All JPG/PNG files > 1920px
- ✅ All uploads when CONVERT_TO_WEBP=true
- ✅ Browser caching and rendering
- ✅ CDN behavior

**Recommendation:** Fix immediately before production deployment.

