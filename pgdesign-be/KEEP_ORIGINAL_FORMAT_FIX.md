# Keep Original Image Format - Fix Applied

## ✅ Vấn đề đã sửa

### Trước khi sửa (❌):
```typescript
// Code cũ - LUÔN convert sang JPEG
if (metadata.width && metadata.width > 1920) {
  return await sharpInstance
    .resize(1920, null, { ... })
    .jpeg({ quality: 85 })  // ← Convert tất cả sang JPEG!
    .toBuffer();
}
```

**Kết quả:**
- Upload PNG → Bị convert sang JPEG ❌
- Upload WebP → Bị convert sang JPEG ❌
- Upload GIF → Bị convert sang JPEG ❌

### Sau khi sửa (✅):
```typescript
// Code mới - GIỮ NGUYÊN format gốc
if (metadata.width && metadata.width > 1920) {
  console.log(`🔄 Resizing from ${metadata.width}px to 1920px (keeping ${mimeType} format)`);
  
  let resized = sharpInstance.resize(1920, null, {
    withoutEnlargement: true,
    fit: 'inside'
  });

  // Keep original format
  switch (mimeType) {
    case 'image/jpeg':
    case 'image/jpg':
      return await resized.jpeg({ quality: 90 }).toBuffer();
    case 'image/png':
      return await resized.png({ quality: 90 }).toBuffer();
    case 'image/webp':
      return await resized.webp({ quality: 90 }).toBuffer();
    case 'image/gif':
      return await resized.toBuffer();
    default:
      return await resized.toBuffer();
  }
}
```

**Kết quả:**
- Upload PNG → GIỮ NGUYÊN PNG ✅
- Upload WebP → GIỮ NGUYÊN WebP ✅
- Upload GIF → GIỮ NGUYÊN GIF ✅
- Upload JPG → GIỮ NGUYÊN JPG ✅

## 🎯 Thay đổi chính

### 1. Removed WebP Conversion
```diff
- // Convert to WebP for better compression (optional)
- if (process.env.CONVERT_TO_WEBP === 'true') {
-   return await sharpInstance
-     .webp({ quality: 85 })
-     .toBuffer();
- }
```
→ Đã XÓA logic convert sang WebP

### 2. Format-Aware Resizing
```typescript
switch (mimeType) {
  case 'image/jpeg':
  case 'image/jpg':
    return await resized.jpeg({ quality: 90 }).toBuffer();
  case 'image/png':
    return await resized.png({ quality: 90 }).toBuffer();
  case 'image/webp':
    return await resized.webp({ quality: 90 }).toBuffer();
  case 'image/gif':
    return await resized.toBuffer();
  default:
    return await resized.toBuffer();
}
```

### 3. Increased Quality
```diff
- .jpeg({ quality: 85 })
+ .jpeg({ quality: 90 })  // Better quality
+ .png({ quality: 90 })
+ .webp({ quality: 90 })
```

## 📊 Test Cases

### Test Case 1: Upload PNG (Large)
```bash
Input:
  - File: screenshot.png
  - Size: 3000x2000px
  - Format: PNG

Output:
  - Resized: 1920x1280px
  - Format: PNG ✅ (kept original)
  - URL: https://s3.../uuid.png
  - Content-Type: image/png
```

### Test Case 2: Upload JPG (Large)
```bash
Input:
  - File: photo.jpg
  - Size: 4000x3000px
  - Format: JPEG

Output:
  - Resized: 1920x1440px
  - Format: JPEG ✅ (kept original)
  - URL: https://s3.../uuid.jpg
  - Content-Type: image/jpeg
```

### Test Case 3: Upload WebP
```bash
Input:
  - File: image.webp
  - Size: 2500x1500px
  - Format: WebP

Output:
  - Resized: 1920x1152px
  - Format: WebP ✅ (kept original)
  - URL: https://s3.../uuid.webp
  - Content-Type: image/webp
```

### Test Case 4: Upload PNG (Small - No Resize)
```bash
Input:
  - File: icon.png
  - Size: 800x600px
  - Format: PNG

Output:
  - No resize needed
  - Format: PNG ✅ (kept original)
  - URL: https://s3.../uuid.png
  - Content-Type: image/png
  - Log: "✅ Image size OK (800px), keeping original format: image/png"
```

## 🔍 Verification

### Check Logs
Sau khi upload, xem logs để verify:

```bash
# Large image (will be resized)
🔄 Resizing image from 3000px to 1920px (keeping image/png format)

# Small image (no resize)
✅ Image size OK (800px), keeping original format: image/png
```

### Check File Properties
```bash
# Download và check file
curl -I https://s3-hcm-r2.s3cloud.vn/pgdesign-new/images/uuid.png

# Expected headers:
Content-Type: image/png
Content-Length: [file size]

# Verify actual format
file downloaded.png
# Output: PNG image data, 1920 x 1280, 8-bit/color RGBA
```

### Browser DevTools
1. Upload image qua web interface
2. F12 → Network tab
3. Check upload response
4. Verify returned URL
5. Open URL in new tab → Check image displays correctly

## 📝 Format Support

| Format | Resize Support | Quality Control | Notes |
|--------|---------------|-----------------|-------|
| JPEG   | ✅ Yes        | ✅ Yes (90%)    | Standard |
| PNG    | ✅ Yes        | ✅ Yes (90%)    | Transparency preserved |
| WebP   | ✅ Yes        | ✅ Yes (90%)    | Modern format |
| GIF    | ✅ Yes        | ⚠️ No quality   | Animation may be lost |
| SVG    | ⚠️ No resize  | N/A             | Vector, no processing |

## 🎯 Behavior Summary

### Small Images (width ≤ 1920px)
```
Input → No Processing → Upload Original
```
- ✅ Format: Kept
- ✅ Size: Kept  
- ✅ Quality: Original

### Large Images (width > 1920px)
```
Input → Resize to 1920px → Keep Format → Upload
```
- ✅ Format: Kept (PNG stays PNG, JPG stays JPG)
- ✅ Size: Reduced to 1920px width
- ✅ Quality: 90% (high quality)

### SVG Images (special case)
```
Input → Skip Processing → Upload Original
```
- ✅ Format: SVG (vector)
- ✅ Size: Original
- ✅ No processing needed

## 🔧 Configuration

### Quality Settings
```typescript
// Current: 90% quality for all formats
jpeg({ quality: 90 })
png({ quality: 90 })
webp({ quality: 90 })
```

Để thay đổi quality, sửa trong code:
```typescript
// For lower file size:
jpeg({ quality: 80 })  // Lower quality, smaller file
png({ quality: 80 })

// For maximum quality:
jpeg({ quality: 95 })  // Higher quality, larger file
png({ quality: 95 })
```

### Max Width
```typescript
// Current: 1920px
if (metadata.width && metadata.width > 1920) {
  // resize...
}

// To change max width:
if (metadata.width && metadata.width > 2560) {  // 2K resolution
  sharpInstance.resize(2560, null, { ... })
}
```

## ⚠️ Important Notes

### PNG Transparency
✅ PNG transparency is preserved during resize

### GIF Animations
⚠️ GIF animations may be lost during resize
- Sharp only keeps first frame when resizing
- Consider skipping resize for GIFs if animation is important

### File Size Impact
Keeping original format means:
- PNG files remain larger than equivalent JPEG
- WebP already optimized, good balance
- JPEG smallest for photos

Example:
```
Same image, different formats:
- PNG:  2.5 MB (highest quality, transparency)
- WebP: 0.8 MB (good quality, transparency)
- JPEG: 0.5 MB (good quality, no transparency)
```

## ✅ Final Result

**Upload JPG → Get JPG back ✅**
**Upload PNG → Get PNG back ✅**
**Upload WebP → Get WebP back ✅**

No more unexpected format conversions! 🎉

