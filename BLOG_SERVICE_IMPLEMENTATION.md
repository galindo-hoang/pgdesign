# Blog Service Implementation

## Overview

The `fetchBlogDetailData` function has been updated to support fetching blog data by both **ID** and **slug**, with mock data that corresponds to the actual blog folders in `public/assets/blog`.

## Available Blog Posts

The service supports 8 blog posts corresponding to your folders:

| ID | Slug | Folder Name | Title |
|----|------|-------------|-------|
| 1 | 12-xu-huong | 12 xu hướng | 12 Xu Hướng Thiết Kế Không Gian Xanh Cho Ngôi Nhà Của Bạn |
| 2 | 21-mau-ke-tivi | 21+ mẫu | 21+ Mẫu Kệ Tivi Dưới Gầm Cầu Thang Đẹp Sang Trọng, Tinh Tế - Giá Phải Chăng |
| 3 | 4-tips-tao-diem-nhan-bep-sang-trong | 4-tips-tao-diem-nhan-bep-sang-trong | 4 Tips Tạo Điểm Nhấn Cho Bếp Sang Trọng & Tiện Nghi |
| 4 | 6-tip-ve-sinh-ban-an | 6+ tip | 6+ Tip Vệ Sinh Bộ Bàn Ăn Gỗ Đơn Giản Ngay Tại Nhà |
| 5 | kham-pha | khám phá | Khám Phá Những Ý Tưởng Thiết Kế Nội Thất Độc Đáo |
| 6 | nha-dep | nhà đẹp | Nhà Đẹp - Nghệ Thuật Tạo Không Gian Sống Hoàn Hảo |
| 7 | phoi-mau | phối màu | Nghệ Thuật Phối Màu Trong Thiết Kế Nội Thất |
| 8 | top-7 | top 7 | Top 7 Xu Hướng Thiết Kế Nội Thất 2024 |

## Usage

### Fetch by Slug
```typescript
// Fetch blog by slug
const blog = await fetchBlogDetailData('4-tips-tao-diem-nhan-bep-sang-trong');
```

### Fetch by ID
```typescript
// Fetch blog by ID
const blog = await fetchBlogDetailData('3'); // Same as above
```

## Data Structure

Each blog post contains:

```typescript
{
  id: string;           // "1", "2", "3", etc.
  title: string;        // Full title
  subtitle?: string;    // Subtitle
  excerpt: string;      // Short description
  thumbnail: string;    // Points to Picture1.png in the folder
  viewCount: number;    // View count
  hashtags: string[];   // Array of hashtags
  publishDate: string;  // Publication date
  slug: string;         // URL slug
  htmlContent: string;  // Placeholder for raw.html content
  author?: string;      // Author name
  readTime?: string;    // Reading time
  category?: string;    // Blog category
}
```

## Thumbnail and Content Mapping

- **Thumbnails**: Each blog uses `Picture1.png` from its corresponding folder
  - Example: `/assets/blog/12 xu hướng/Picture1.png`
  - Example: `/assets/blog/4-tips-tao-diem-nhan-bep-sang-trong/Picture1.png`

- **HTML Content**: Currently contains placeholder comments indicating where `raw.html` content should be loaded
  - Example: `<!-- Content from public/assets/blog/12 xu hướng/raw.html -->`

## Folder Structure

```
public/assets/blog/
├── 12 xu hướng/
│   ├── raw.html          ← Content for htmlContent field
│   ├── Picture1.png      ← Thumbnail image
│   └── Picture2.png, etc.
├── 4-tips-tao-diem-nhan-bep-sang-trong/
│   ├── raw.html          ← Content for htmlContent field
│   ├── Picture1.png      ← Thumbnail image
│   └── Picture2.png, etc.
└── ... (other folders)
```

## Next Steps

To complete the implementation:

1. **Load actual HTML content**: Replace the placeholder comments with actual content from `raw.html` files
2. **Add more blog posts**: Add new entries to `mockBlogDetails` for additional folders
3. **Update ID mapping**: Add new IDs to the `idToSlugMap` in the function

## Testing

You can test the function with:

```typescript
// Test by slug
const blog1 = await fetchBlogDetailData('4-tips-tao-diem-nhan-bep-sang-trong');
console.log(blog1.title); // "4 Tips Tạo Điểm Nhấn Cho Bếp Sang Trọng & Tiện Nghi"

// Test by ID
const blog2 = await fetchBlogDetailData('3');
console.log(blog2.title); // Same as above
``` 