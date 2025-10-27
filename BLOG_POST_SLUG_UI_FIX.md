# Blog Post Slug UI Fix

## Vấn đề

1. **Slug không hiển thị**: Slug field hiển thị placeholder "post-url-slug" thay vì giá trị thực
2. **UI không đồng đều**: Slug field không có styling giống title (thiếu opacity)
3. **API không trả về slug**: Backend không trả về slug field trong API response

## Nguyên nhân

1. Backend không auto-generate slug nếu slug trong database là empty
2. Slug field thiếu opacity styling giống title field
3. Slug field không có disabled attribute

## Giải pháp

### 1. Backend Auto-Generate Slug

**File: `pgdesign-be/src/models/BlogPostModel.ts`**

```typescript
// Add slug if it exists
if (row.slug && row.slug.trim() !== '') {
  result.slug = row.slug;
} else {
  // Auto-generate slug if not present ✅ NEW
  result.slug = row.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
```

### 2. Update Slug Field Styling

**File: `webadmin/src/pages/BlogPostEditor.tsx`**

Thêm opacity và disabled attribute:

```tsx
<input
  type="text"
  id="slug"
  value={postData.slug || ''}              // ✅ Ensure always has value
  placeholder={postData.slug ? '' : 'post-url-slug'}  // ✅ Hide placeholder when has value
  className="form-input"
  readOnly
  disabled                                  // ✅ Added
  style={{ 
    background: '#f5f5f5', 
    cursor: 'not-allowed',
    opacity: 0.6                            // ✅ Added to match title
  }}
/>
```

## Kết quả

### Trước khi fix:
- ❌ Slug field hiển thị placeholder "post-url-slug"
- ❌ UI không đồng đều với title (không có opacity)
- ❌ API không trả về slug cho posts chưa có slug

### Sau khi fix:
- ✅ Slug hiển thị giá trị thực từ database hoặc auto-generated từ title
- ✅ UI đồng đều với title (có opacity: 0.6)
- ✅ Slug luôn có giá trị trong API response
- ✅ Placeholder chỉ hiển thị khi slug empty

## Styling Comparison

### Title Field (when editing):
```tsx
style={{ 
  background: '#f5f5f5', 
  cursor: 'not-allowed',
  opacity: 0.6 
}}
readOnly={isEditing}
disabled={isEditing}
```

### Slug Field (now matches):
```tsx
style={{ 
  background: '#f5f5f5', 
  cursor: 'not-allowed',
  opacity: 0.6                      // ✅ Added
}}
readOnly
disabled                             // ✅ Added
```

## Test Results

### Test Case 1: Slug already exists
- **Database**: `slug = "eqw-q-erew-q-eqw-e-21-12-qwe-qwe-w-qe-qw-e"`
- **API Response**: ✅ Returns slug
- **UI**: ✅ Displays slug with opacity 0.6
- **Placeholder**: ✅ Hidden

### Test Case 2: Slug is empty
- **Database**: `slug = NULL` or `''`
- **API Response**: ✅ Auto-generates slug from title
- **UI**: ✅ Displays auto-generated slug with opacity 0.6
- **Placeholder**: ✅ Shows only when slug is empty

### Test Case 3: Create new post
- **Title**: "My New Blog Post"
- **Slug**: Auto-generated as "my-new-blog-post"
- **UI**: ✅ Shows generated slug
- **Editing**: ✅ Slug locked, title locked

## API Example

### Before:
```json
{
  "success": true,
  "data": {
    "id": "6",
    "title": "eqw querew q ưeqw e 21...",
    "content": "12312312",
    ...
    // ❌ No slug field
  }
}
```

### After:
```json
{
  "success": true,
  "data": {
    "id": "6",
    "title": "eqw querew q ưeqw e 21...",
    "slug": "eqw-q-erew-q-eqw-e-21-12-qwe-qwe-w-qe-qw-e", ✅
    ...
  }
}
```

