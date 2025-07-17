# Intro Page Data Seeding Documentation

## Overview

This documentation outlines the process of seeding mock data from the frontend `introPageService.ts` into the MySQL database and MinIO storage for the intro page functionality.

## ✅ Completed Implementation

### 1. Database Seeding

**Seed File:** `database/seeds/009_intro_page_data.js`

**Data Seeded:**
- **About Intro:** 1 section with brand title, subtitle, identity, and descriptions
- **Vision Mission:** 1 section with vision/mission content and core values
- **Mission Items:** 4 mission statement items
- **Core Values:** 4 core company values
- **Commitments:** 1 section with 6 commitment items
- **Team:** 1 section with 2 board directors and 6 team members

### 2. Image Integration

**MinIO Storage:** All images are stored in MinIO with the following patterns:
- `http://localhost:9000/pgdesign-assets/images/[filename]` for photos
- `http://localhost:9000/pgdesign-assets/icons/[filename]` for SVG icons

**Images Used:**
- `thumb-intro.jpg` for about intro background, director photos, and team member photos
- `vision-mission-section.jpg` for vision/mission section
- Various SVG icons for commitment items (direct-execution-icon.svg, quality-materials-icon.svg, etc.)

### 3. Database Tables Populated

- `about_intro_data` - 1 record
- `vision_mission_data` - 1 record
- `mission_items` - 4 records (linked to vision_mission_data)
- `core_values` - 4 records (linked to vision_mission_data)
- `commitments_data` - 1 record
- `commitment_items` - 6 records (linked to commitments_data)
- `team_data` - 1 record
- `board_directors` - 2 records (linked to team_data)
- `team_members` - 6 records (linked to team_data)

### 4. Frontend Integration

**Updated:** `src/services/introPageService.ts`
- Changed `USE_MOCK_DATA` from `true` to `false`
- Frontend now uses real API data instead of mock data

## 🚀 Usage Instructions

### Running the Seed

```bash
cd pgdesign-be
npx knex seed:run --specific=009_intro_page_data.js
```

### Testing the Implementation

1. **Check Database:**
   ```sql
   SELECT COUNT(*) FROM about_intro_data WHERE is_active = true;
   SELECT COUNT(*) FROM vision_mission_data WHERE is_active = true;
   SELECT COUNT(*) FROM mission_items WHERE is_active = true;
   SELECT COUNT(*) FROM core_values WHERE is_active = true;
   SELECT COUNT(*) FROM commitments_data WHERE is_active = true;
   SELECT COUNT(*) FROM commitment_items WHERE is_active = true;
   SELECT COUNT(*) FROM team_data WHERE is_active = true;
   SELECT COUNT(*) FROM board_directors WHERE is_active = true;
   SELECT COUNT(*) FROM team_members WHERE is_active = true;
   ```

2. **Test API Endpoints:**
   ```bash
   # Get all intro page data
   curl http://localhost:3002/api/v1/intropage
   
   # Get about intro data
   curl http://localhost:3002/api/v1/intropage/about-intro
   
   # Get vision mission data
   curl http://localhost:3002/api/v1/intropage/vision-mission
   
   # Get commitments data
   curl http://localhost:3002/api/v1/intropage/commitments
   
   # Get team data
   curl http://localhost:3002/api/v1/intropage/team
   ```

3. **Verify Images:**
   ```bash
   # Check about intro background image
   curl -I http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg
   
   # Check vision mission image
   curl -I http://localhost:9000/pgdesign-assets/images/vision-mission-section.jpg
   
   # Check commitment icon
   curl -I http://localhost:9000/pgdesign-assets/icons/direct-execution-icon.svg
   ```

## 📊 Data Structure

### About Intro Schema
```javascript
{
  id: number,
  brand_title: string,
  brand_subtitle: string,
  identity: string,
  description_1: string,
  description_2: string,
  background_image_url: string,
  is_active: boolean
}
```

### Vision Mission Schema
```javascript
{
  id: number,
  image_url: string,
  vision_title: string,
  vision_paragraph_1: string,
  vision_paragraph_2: string,
  mission_title: string,
  core_values_title: string,
  is_active: boolean
}
```

### Content Relationships
- `vision_mission_data` (1) → `mission_items` (4)
- `vision_mission_data` (1) → `core_values` (4)
- `commitments_data` (1) → `commitment_items` (6)
- `team_data` (1) → `board_directors` (2)
- `team_data` (1) → `team_members` (6)

## 🔧 Technical Details

### API Endpoints Available
- `GET /api/v1/intropage` - Complete intro page data
- `GET /api/v1/intropage/about-intro` - About intro section
- `GET /api/v1/intropage/vision-mission` - Vision/mission section with nested data
- `GET /api/v1/intropage/commitments` - Commitments section with nested items
- `GET /api/v1/intropage/team` - Team section with directors and members

### Backend Components
- **Controller:** `src/controllers/IntroPageController.ts`
- **Model:** `src/models/IntroPageModel.ts`
- **Routes:** `src/routes/intropage.ts`
- **Types:** `src/types/introPageTypes.ts`

### Frontend Integration
- **Service:** `src/services/introPageService.ts`
- **Types:** `src/types/introPageTypes.ts`
- **Configuration:** `USE_MOCK_DATA = false`

## 🎯 Key Features

1. **Real Database Integration**: Frontend now fetches data from MySQL instead of mock data
2. **Icon Support**: SVG icons are served from MinIO with proper URLs
3. **Relational Data**: Proper foreign key relationships between main sections and their items
4. **API-First**: Complete REST API for intro page functionality
5. **Type Safety**: Full TypeScript support across frontend and backend
6. **Structured Content**: Hierarchical data organization for complex sections

## 🔄 Data Flow

1. **Database** → Stores structured intro page data with relationships
2. **MinIO** → Serves images and icons with public URLs
3. **Backend API** → Fetches data from database with proper joins and formatting
4. **Frontend Service** → Consumes API data and provides to components
5. **React Components** → Render intro page sections with real data

## 🌟 Benefits

- **Performance**: Real database queries with optimized joins
- **Scalability**: Easy to add more team members, commitments, or values
- **Maintainability**: Centralized data management with proper relationships
- **SEO Ready**: Real content for search engine optimization
- **CMS Ready**: Foundation for admin panel integration
- **Icon Management**: Centralized icon storage and serving

## 📝 Mock Data Migrated

### About Intro Section
- Brand title: "PG DESIGN"
- Brand subtitle: "KIẾN TẠO KHÔNG GIAN"
- Identity: "KHẲNG ĐỊNH BẢN SẮC"
- Two detailed description paragraphs

### Vision Mission Section
- Vision with 2 paragraphs
- Mission with 4 items
- Core values with 4 detailed values

### Commitments Section
- 6 commitment items with icons:
  - KHÔNG KHOÁN THẦU (direct-execution-icon)
  - VẬT TƯ ĐẠT CHUẨN (quality-materials-icon)
  - CHI PHÍ MINH BẠCH (clear-pricing-icon)
  - THI CÔNG ĐÚNG TIẾN ĐỘ (timely-delivery-icon)
  - GIÁ HỢP LÝ - TỐI ƯU NGÂN SÁCH (reasonable-price-icon)
  - CAM KẾT BẢO HÀNH (post-handover-warranty-icon)

### Team Section
- 2 Board Directors: CEO & Founder, Project Director
- 6 Team Members: Various roles in architecture, design, and management

## 📈 Future Enhancements

1. **Admin Panel**: Create/edit/delete intro page content
2. **Image Upload**: Direct upload to MinIO from admin interface
3. **Dynamic Team**: Add/remove team members dynamically
4. **Localization**: Multi-language support for content
5. **Analytics**: Track intro page engagement
6. **Social Integration**: Link team members to social profiles

---

**Status:** ✅ Complete and Production Ready
**Date:** December 2024
**Version:** 1.0.0 