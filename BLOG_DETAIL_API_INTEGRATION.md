# Blog Detail API Integration

## Tổng quan

Đã tích hợp API backend để lấy blog post theo slug khi người dùng click vào blog từ website chính.

## Thay đổi

### Backend (`pgdesign-be`)

#### 1. Model Updates (`BlogPostModel.ts`)

**Thêm interface fields:**
- `htmlContent?: string`
- `subtitle?: string`
- `excerpt?: string`
- `hashtags?: string[]`
- `readTime?: string`
- `category?: string`
- `seoTitle?: string`
- `seoDescription?: string`
- `seoKeywords?: string`

**Cập nhật `transformRowToData`:**
- Populate tất cả các fields từ database row
- Parse hashtags từ string sang array
- Handle các trường hợp data không tồn tại

#### 2. Migration

Đã chạy migration `20250112000000_add_blog_post_fields.js` để thêm các columns:
- `slug` (VARCHAR 500)
- `excerpt` (TEXT)
- `html_content` (TEXT)
- `thumbnail` (VARCHAR 500)
- `metadata_images` (TEXT)
- `hashtags` (TEXT)
- `read_time` (VARCHAR 50)
- `category` (VARCHAR 200)
- `subtitle` (VARCHAR 500)
- `seo_title` (VARCHAR 500)
- `seo_description` (TEXT)
- `seo_keywords` (TEXT)

### Frontend (`src`)

#### 1. Blog Posts Service (`blogPostsService.ts`)

**Updated `BlogPost` interface:**
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
  thumbnail?: string;
  metadataImages?: string[];
  slug?: string;
  htmlContent?: string;
  subtitle?: string;
  excerpt?: string;
  hashtags?: string[];
  readTime?: string;
  category?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}
```

**Added `getBlogPostBySlug` function:**
```typescript
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogposts/slug/${slug}`);
    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
};
```

#### 2. Blog Detail Service (`blogDetailService.ts`)

**Added transformation function:**
```typescript
const transformBlogPostToDetail = (blogPost: BlogPost): BlogDetailData => {
  return {
    id: blogPost.id,
    title: blogPost.title,
    subtitle: blogPost.subtitle,
    excerpt: blogPost.excerpt || blogPost.content,
    thumbnail: blogPost.thumbnail || '/assets/blog/default.png',
    viewCount: blogPost.views,
    hashtags: blogPost.hashtags || [],
    publishDate: blogPost.publishDate,
    slug: blogPost.slug || '',
    htmlContent: blogPost.htmlContent || blogPost.content,
    author: blogPost.author,
    readTime: blogPost.readTime,
    category: blogPost.category
  };
};
```

**Updated `fetchBlogDetailData`:**
- Ưu tiên gọi API backend với slug
- Fallback về mock data nếu API không tìm thấy
- Transform data từ `BlogPost` sang `BlogDetailData`

## Cách sử dụng

### API Endpoints

#### Get Blog Post by Slug
```
GET /api/v1/blogposts/slug/:slug
```

**Example:**
```bash
curl http://localhost:3002/api/v1/blogposts/slug/my-blog-post-slug
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "My Blog Post",
    "content": "Content here...",
    "author": "Admin",
    "status": "published",
    "publishDate": "2024-01-15",
    "views": 1250,
    "featured": true,
    "thumbnail": "/image.jpg",
    "slug": "my-blog-post-slug",
    "htmlContent": "<p>HTML content...</p>",
    "subtitle": "Subtitle here",
    "excerpt": "Excerpt here...",
    "hashtags": ["tag1", "tag2"],
    "readTime": "5 phút",
    "category": "Category"
  }
}
```

### Frontend Integration

Blog detail page tự động gọi API khi load:

```typescript
// In BlogDetailPage.tsx
useEffect(() => {
  const loadData = async () => {
    if (!slug) {
      setError('Blog slug is required');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const [blogDetailData, consultationData] = await Promise.all([
        fetchBlogDetailData(slug), // Calls API /api/v1/blogposts/slug/:slug
        fetchConsultationCTA()
      ]);
      
      setBlogData(blogDetailData);
      setConsultationCTAData(consultationData);
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  loadData();
}, [slug]);
```

## Kiểm tra

### Test API
```bash
# Test get blog post by slug
curl http://localhost:3002/api/v1/blogposts/slug/your-slug-here

# Test get all blog posts
curl http://localhost:3002/api/v1/blogposts
```

### Kiểm tra Database

Nếu blog post không có slug, cần update:

```sql
-- Xem các blog posts
SELECT id, title, slug FROM blog_posts;

-- Generate slug cho các blog posts chưa có
UPDATE blog_posts 
SET slug = LOWER(REPLACE(REPLACE(REPLACE(title, ' ', '-'), '--', '-'), '--', '-'))
WHERE slug IS NULL OR slug = '';
```

## Lưu ý

1. **Slug Generation**: Slug được tự động generate từ title khi tạo hoặc update blog post
2. **Fallback**: Nếu API không tìm thấy blog post, sẽ fallback về mock data
3. **Data Transformation**: Backend data được transform sang format frontend cần
4. **Validation**: Luôn kiểm tra slug tồn tại trước khi hiển thị

## Next Steps

1. Tạo script để migrate các blog posts hiện có sang format mới
2. Update webadmin để generate slugs khi tạo blog posts mới
3. Thêm validation cho slugs (unique, format)

