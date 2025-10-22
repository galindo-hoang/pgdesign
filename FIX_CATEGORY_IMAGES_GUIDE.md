# Fix Category Background Images - User Guide

## Vấn đề
Category cards không hiển thị background images mặc dù API đã trả về URLs đúng.

## Nguyên nhân
Frontend đang sử dụng field name cũ (`backgroundImageBlob`) thay vì field mới (`backgroundImageUrl`) từ API.

## ✅ Đã sửa

### 1. Updated TypeScript Types
**File:** `src/types/projectPageTypes.ts`

```typescript
export interface ProjectCategory {
  id: number;
  categoryId: string;
  title: string;
  projectCount: number;
  backgroundImageBlob?: string | null; // Deprecated
  backgroundImageUrl: string | null;   // ← NEW: S3 URL
  navigationPath: string;
  displayOrder: number;
}
```

### 2. Updated Component
**File:** `src/components/ProjectCategoriesSection.tsx`

```typescript
// OLD CODE (❌):
const processedImage = processImageData(category.backgroundImageBlob);

// NEW CODE (✅):
const imageUrl = category.backgroundImageUrl || processImageData(category.backgroundImageBlob);
```

## 🔧 Bước để fix trên browser

### Option 1: Clear Cache & Rebuild (Recommended)

```bash
# 1. Stop frontend nếu đang chạy (Ctrl+C)

# 2. Clear cache
cd /Users/huy.hoang/Desktop/pgdesign
rm -rf node_modules/.cache

# 3. Rebuild
npm run build

# 4. Restart dev server
npm start
```

### Option 2: Hard Reload Browser

1. Mở DevTools (F12 hoặc Cmd+Option+I)
2. Nhấp chuột phải vào nút Reload
3. Chọn **"Empty Cache and Hard Reload"**
4. Hoặc nhấn **Cmd+Shift+R** (Mac) / **Ctrl+Shift+R** (Windows)

### Option 3: Clear Local Storage

Trong browser console (F12), chạy:
```javascript
// Clear all cache
localStorage.clear();
sessionStorage.clear();

// Reload page
window.location.reload(true);
```

## 📊 Verify Fix

### 1. Check API Response
```bash
curl -s http://localhost:3002/api/v1/projectpage/project-categories | jq '.data.categories[] | {categoryId, backgroundImageUrl}'
```

**Expected output:**
```json
{
  "categoryId": "house-normal",
  "backgroundImageUrl": "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/house-normal-011/1.png"
}
{
  "categoryId": "appartment",
  "backgroundImageUrl": "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/appartment-001/phu-gia-hung-01.png"
}
...
```

### 2. Check Browser DevTools

1. Mở DevTools → Network tab
2. Filter: `project-categories`
3. Reload page
4. Click vào request
5. Check Response → Verify có `backgroundImageUrl`

### 3. Check Console Logs

Trong Console, bạn sẽ thấy:
```
🌐 Fetching ProjectCategoriesData from API...
```

Nếu thấy cached data:
```
Using cached data for: project-page/project-categories
```
→ Cần clear cache!

### 4. Visual Check

Category cards should show background images:
- **house-normal**: Nhà phố image
- **appartment**: Căn hộ image  
- **village**: Biệt thự image
- **house-business**: Thương mại image

## 🐛 Debug Steps

### 1. Check Component Props

Add console log trong component:
```typescript
// In ProjectCategoriesSection.tsx line ~95
categories.map((category) => {
  console.log('Category:', category.categoryId);
  console.log('backgroundImageUrl:', category.backgroundImageUrl);
  console.log('backgroundImageBlob:', category.backgroundImageBlob);
  const imageUrl = category.backgroundImageUrl || processImageData(category.backgroundImageBlob);
  console.log('Final imageUrl:', imageUrl);
  // ...
})
```

### 2. Check Network Request

```bash
# Test API directly
curl -s http://localhost:3002/api/v1/projectpage/project-categories | jq '.data.categories[0].backgroundImageUrl'
```

Should output:
```
"https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/house-normal-011/1.png"
```

### 3. Test Image URL

```bash
# Test if image URL works
curl -I "https://s3-hcm-r2.s3cloud.vn/pgdesign-new/project-details/house-normal-011/1.png"
```

Should return:
```
HTTP/1.1 200 OK
```

## 🎯 Quick Fix Summary

```bash
# Quick fix in one command
cd /Users/huy.hoang/Desktop/pgdesign && \
rm -rf node_modules/.cache && \
echo "✅ Cache cleared! Now refresh browser with Cmd+Shift+R"
```

## 📝 Cache Configuration

Nếu vẫn gặp vấn đề, có thể tắt cache trong development:

**File:** `src/services/projectPageService.ts`

```typescript
// Find this line (~line 14):
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Change to:
const CACHE_DURATION = 0; // Disable cache for development
```

## ✅ Expected Result

After fix, category cards should display:

```
┌────────────────────┐  ┌────────────────────┐
│  [House Image]     │  │  [Apartment Img]   │
│                    │  │                    │
│  Dự án             │  │  Dự án             │
│  NHÀ PHỐ           │  │  CĂN HỘ            │
│                    │  │                    │
│  10 dự án          │  │  10 dự án          │
│  [Xem chi tiết]    │  │  [Xem chi tiết]    │
└────────────────────┘  └────────────────────┘
```

## 🔍 Still Not Working?

If images still don't show after all above steps:

1. Check CORS in browser console
2. Check if S3 URLs are accessible
3. Check Network tab for failed requests
4. Verify backend is running on port 3002
5. Check file permissions on images

Run diagnostic:
```bash
./test-category-background-images.sh
```

Should show all ✅ green checks.

