# Blog Page Data Seeding Documentation

## Overview

This documentation outlines the process of seeding mock data from the frontend `blogPageService.ts` into the MySQL database and MinIO storage for the blog page functionality.

## ✅ Completed Implementation

### 1. Database Seeding

**Seed File:** `database/seeds/008_blog_page_data.js`

**Data Seeded:**
- **Hero Data:** 1 hero section with title and subtitle
- **Project Items:** 8 project items with images, descriptions, and metadata
- **Content Section:** 1 main content section with structured content
- **Design Styles:** 4 design styles (Modern, Classical, Minimalist, Indochine)
- **Important Factors:** 4 key factors for interior design
- **Process Steps:** 4-step design process
- **Consultation CTA:** 1 call-to-action section with features

### 2. Image Integration

**MinIO Storage:** All images are stored in MinIO with the following pattern:
- `http://localhost:9000/pgdesign-assets/images/[filename]`

**Images Used:**
- `diary-image-1.jpg` through `diary-image-4.jpg` for project items
- `thumb-intro.jpg` for consultation CTA

### 3. Database Tables Populated

- `blog_hero_data` - 1 record
- `blog_project_items` - 8 records
- `blog_content_sections` - 1 record
- `blog_design_styles` - 4 records (linked to content section)
- `blog_important_factors` - 4 records (linked to content section)
- `blog_process_steps` - 4 records (linked to content section)
- `blog_consultation_cta` - 1 record

### 4. Frontend Integration

**Updated:** `src/services/blogPageService.ts`
- Changed `USE_MOCK_DATA` from `true` to `false`
- Frontend now uses real API data instead of mock data

## 🚀 Usage Instructions

### Running the Seed

```bash
cd pgdesign-be
npx knex seed:run --specific=008_blog_page_data.js
```

### Testing the Implementation

1. **Check Database:**
   ```sql
   SELECT COUNT(*) FROM blog_hero_data WHERE is_active = true;
   SELECT COUNT(*) FROM blog_project_items WHERE is_active = true;
   SELECT COUNT(*) FROM blog_content_sections WHERE is_active = true;
   SELECT COUNT(*) FROM blog_design_styles WHERE is_active = true;
   SELECT COUNT(*) FROM blog_important_factors WHERE is_active = true;
   SELECT COUNT(*) FROM blog_process_steps WHERE is_active = true;
   SELECT COUNT(*) FROM blog_consultation_cta WHERE is_active = true;
   ```

2. **Test API Endpoints:**
   ```bash
   # Get all blog page data
   curl http://localhost:3002/api/v1/blogpage
   
   # Get hero data
   curl http://localhost:3002/api/v1/blogpage/hero
   
   # Get project items
   curl http://localhost:3002/api/v1/blogpage/projects
   
   # Get content section
   curl http://localhost:3002/api/v1/blogpage/content-section
   
   # Get consultation CTA
   curl http://localhost:3002/api/v1/blogpage/consultation-cta
   ```

3. **Verify Images:**
   ```bash
   # Check first project image
   curl -I http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg
   
   # Check consultation CTA image
   curl -I http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg
   ```

## 📊 Data Structure

### Project Items Schema
```javascript
{
  id: number,
  project_id: string,
  title: string,
  image_url: string,
  area: string,
  style: string,
  client_name: string,
  location: string,
  is_active: boolean,
  display_order: number
}
```

### Content Relationships
- `blog_content_sections` (1) → `blog_design_styles` (4)
- `blog_content_sections` (1) → `blog_important_factors` (4)
- `blog_content_sections` (1) → `blog_process_steps` (4)

## 🔧 Technical Details

### API Endpoints Available
- `GET /api/v1/blogpage` - Complete blog page data
- `GET /api/v1/blogpage/hero` - Hero section data
- `GET /api/v1/blogpage/projects` - Project items with pagination
- `GET /api/v1/blogpage/content-section` - Content section with nested data
- `GET /api/v1/blogpage/consultation-cta` - Consultation call-to-action

### Backend Components
- **Controller:** `src/controllers/BlogPageController.ts`
- **Model:** `src/models/BlogPageModel.ts`
- **Routes:** `src/routes/blogpage.ts`
- **Types:** `src/types/blogPageTypes.ts`

### Frontend Integration
- **Service:** `src/services/blogPageService.ts`
- **Types:** `src/types/blogPageTypes.ts`
- **Configuration:** `USE_MOCK_DATA = false`

## 🎯 Key Features

1. **Real Database Integration**: Frontend now fetches data from MySQL instead of mock data
2. **Image Support**: All images are served from MinIO with proper URLs
3. **Structured Data**: Relational data with proper foreign key relationships
4. **API-First**: Complete REST API for blog page functionality
5. **Type Safety**: Full TypeScript support across frontend and backend
6. **Pagination**: Project items support pagination and filtering

## 🔄 Data Flow

1. **Database** → Stores structured blog page data
2. **MinIO** → Serves images with public URLs
3. **Backend API** → Fetches data from database and formats for frontend
4. **Frontend Service** → Consumes API data and provides to components
5. **React Components** → Render blog page with real data

## 🌟 Benefits

- **Performance**: Real database queries instead of mock data
- **Scalability**: Easy to add more projects, styles, and content
- **Maintainability**: Centralized data management
- **SEO Ready**: Real content for search engine optimization
- **CMS Ready**: Foundation for admin panel integration

## 📝 Future Enhancements

1. **Admin Panel**: Create/edit/delete blog page content
2. **Image Upload**: Direct upload to MinIO from admin interface
3. **Search & Filter**: Enhanced project filtering capabilities
4. **Analytics**: Track blog page performance
5. **Localization**: Multi-language support

---

**Status:** ✅ Complete and Production Ready
**Date:** December 2024
**Version:** 1.0.0 