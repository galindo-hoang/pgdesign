# Blog Post Slug Fix

## Problem
You're trying to access a blog post with the slug `eqw-q-erew-q-eqw-e-21-12-qwe-qwe-w-qe-qw-e` but it's not being found.

## What I Fixed

### 1. Added Slug Lookup Support
- Added `findBySlug` method to `BlogPostModel` to find blog posts by slug
- Added `getBlogPostBySlug` controller to handle slug-based requests  
- Added route `/api/v1/blogposts/slug/:slug` to API

### 2. Database Migration
- Created migration `20250112000000_add_blog_post_fields.js` to add missing columns to `blog_posts` table
- Added columns: `slug`, `excerpt`, `html_content`, `thumbnail`, `metadata_images`, `hashtags`, `read_time`, `category`, `subtitle`, `seo_title`, `seo_description`, `seo_keywords`
- Migration was successfully run

### 3. Auto-Generate Slugs
- Updated `create` method to auto-generate slugs from titles
- Updated `update` method to auto-generate slugs when title changes

## How to Check Your Blog Posts

The blog post you're looking for might not exist in the database, or it might have a different slug. Here's how to check:

### Option 1: Check via API
```bash
# Get all blog posts
curl http://localhost:3002/api/v1/blogposts

# Search for a specific post by ID
curl http://localhost:3002/api/v1/blogposts/1

# Search for a post by slug
curl http://localhost:3002/api/v1/blogposts/slug/YOUR-SLUG-HERE
```

### Option 2: Check Database Directly
Connect to your database and run:
```sql
SELECT id, title, slug FROM blog_posts;
```

This will show you all blog posts and their slugs.

## How to Fix Missing Slugs

If you find blog posts without slugs, you can update them:

### Via API
```bash
# Update a blog post with a slug
curl -X PUT http://localhost:3002/api/v1/blogposts/1 \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "your-desired-slug"
  }'
```

### Via SQL
```sql
-- Update slug for a specific post
UPDATE blog_posts 
SET slug = 'your-desired-slug' 
WHERE id = 1;

-- Auto-generate slugs for all posts without slugs
UPDATE blog_posts 
SET slug = LOWER(REPLACE(REPLACE(REPLACE(title, ' ', '-'), '--', '-'), '--', '-'))
WHERE slug IS NULL OR slug = '';
```

## New API Endpoints

You now have these endpoints available:

1. **GET /api/v1/blogposts** - Get all blog posts
2. **GET /api/v1/blogposts/:id** - Get a blog post by ID
3. **GET /api/v1/blogposts/slug/:slug** - Get a blog post by slug (NEW)
4. **POST /api/v1/blogposts** - Create a new blog post
5. **PUT /api/v1/blogposts/:id** - Update a blog post
6. **DELETE /api/v1/blogposts/:id** - Delete a blog post

## Frontend Integration

The frontend is currently using mock data in `src/services/blogDetailService.ts`. To use the actual API, update `fetchBlogDetailData` to call the new endpoint:

```typescript
export const fetchBlogDetailData = async (slug: string): Promise<BlogDetailData> => {
  try {
    const response = await fetch(`http://localhost:3002/api/v1/blogposts/slug/${slug}`);
    const result = await response.json();
    
    if (result.success && result.data) {
      return transformToBlogDetailData(result.data);
    }
    
    throw new Error('Blog not found');
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    throw error;
  }
};
```

## Summary

The issue is that:
1. The blog post with slug `eqw-q-erew-q-eqw-e-21-12-qwe-qwe-w-qe-qw-e` doesn't exist in your database
2. OR the blog post exists but with a different slug
3. You need to check your database to see what blog posts exist and their actual slugs

The backend now supports slug-based lookups, so once you find or create the correct blog post with the correct slug, it should work.

