# Blog Post htmlContent Load Fix

## Vấn đề

Khi edit blog post, field `htmlContent` không hiển thị trong content editor mặc dù nó có trong API response.

## Nguyên nhân

1. **Interface thiếu fields**: `BlogPost` interface trong `blogService.ts` không có các fields như `htmlContent`, `slug`, `subtitle`, etc.

2. **Không load htmlContent**: Trong `loadPostData` function, `htmlContent` được set thành empty string thay vì lấy từ API response.

3. **Không sync với editor**: Editor content không được load từ `htmlContent` khi edit.

## Giải pháp

### 1. Update BlogPost Interface

**File: `webadmin/src/services/blogService.ts`**

Thêm các fields mới vào interface:

```typescript
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'published' | 'draft' | 'archived';
  publishDate: string;
  views: number;
  featured: boolean;
  thumbnail: string;
  metadataImages: string[];
  htmlContent?: string;      // ✅ Added
  slug?: string;             // ✅ Added
  subtitle?: string;         // ✅ Added
  excerpt?: string;          // ✅ Added
  hashtags?: string[];      // ✅ Added
  readTime?: string;        // ✅ Added
  category?: string;        // ✅ Added
}
```

### 2. Load htmlContent from API

**File: `webadmin/src/pages/BlogPostEditor.tsx`**

Trong `loadPostData` function, update để load tất cả fields:

```typescript
setPostData({
  id: post.id,
  title: post.title,
  subtitle: post.subtitle || '',           // ✅ Now loads from API
  excerpt: post.excerpt || post.content,  // ✅ Now loads from API
  thumbnail: post.thumbnail || '',
  viewCount: post.views,
  hashtags: post.hashtags || [],          // ✅ Now loads from API
  publishDate: parsedPublishDate,
  slug: post.slug || '',                  // ✅ Now loads from API
  htmlContent: post.htmlContent || '',     // ✅ Now loads from API
  author: post.author,
  readTime: post.readTime || '',          // ✅ Now loads from API
  category: post.category || '',          // ✅ Now loads from API
  status: post.status,
  featured: post.featured,
  seoTitle: '',
  seoDescription: '',
  seoKeywords: []
});

// Set editor content from htmlContent
setEditorContent(post.htmlContent || '');  // ✅ Now loads into editor
```

### 3. Sync htmlContent with Editor

**File: `webadmin/src/pages/BlogPostEditor.tsx`**

Thêm useEffect để sync htmlContent với editor:

```typescript
// Sync htmlContent to editor when postData changes
useEffect(() => {
  if (postData.htmlContent && !editorContent) {
    setEditorContent(postData.htmlContent);
  }
}, [postData.htmlContent, editorContent]);
```

## Kết quả

### Trước khi fix:
- ❌ htmlContent luôn empty khi load
- ❌ Editor không hiển thị content đã lưu
- ❌ Phải nhập lại content mỗi lần edit

### Sau khi fix:
- ✅ htmlContent được load từ API
- ✅ Editor hiển thị content đã lưu
- ✅ Có thể edit content hiện có
- ✅ Các fields khác cũng được load đúng (subtitle, hashtags, slug, etc.)

## Test Case

### Test Case 1: Create New Blog Post
1. Vào "Add New Blog Post"
2. Nhập title, subtitle, excerpt
3. Nhập content trong editor
4. Save
5. Result: ✅ Lưu thành công với htmlContent

### Test Case 2: Edit Existing Blog Post
1. Click "Edit" trên một blog post
2. Check editor
3. Result: ✅ Editor hiển thị content đã lưu từ htmlContent
4. Edit content
5. Save
6. Result: ✅ Content được update

### Test Case 3: API Response
```json
{
  "success": true,
  "data": {
    "id": "6",
    "title": "My Blog Post",
    "content": "Excerpt here...",
    "htmlContent": "<p>Full HTML content here...</p>",
    "slug": "my-blog-post-slug",
    "subtitle": "Blog subtitle",
    "hashtags": ["tag1", "tag2"],
    ...
  }
}
```

Editor sẽ load `htmlContent` và hiển thị trong Quill editor.

