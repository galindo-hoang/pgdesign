# Project Sub-Categories Implementation Guide

## 🎯 **Overview**
This guide explains the complete implementation of Project Sub-Categories system, including database relationships, seeding from frontend mock data, and backend models.

## 🏗️ **Database Schema & Relationships**

### **Table Structure**

#### **project_sub_categories**
```sql
CREATE TABLE project_sub_categories (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  project_category_id INT UNSIGNED NOT NULL,
  sub_category_id VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  hero_image_url TEXT NULL,
  display_order INT DEFAULT 0,
  project_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (project_category_id) REFERENCES project_categories(id) ON DELETE CASCADE,
  UNIQUE KEY project_sub_cat_unique (project_category_id, sub_category_id)
);
```

#### **project_details** (Updated)
```sql
ALTER TABLE project_details 
ADD COLUMN project_sub_category_id INT UNSIGNED NULL,
ADD FOREIGN KEY (project_sub_category_id) REFERENCES project_sub_categories(id) ON DELETE SET NULL;
```

### **Relationships Established**

#### **One-to-Many: project_categories → project_sub_categories**
```
project_categories (1) ←→ (N) project_sub_categories
```
- Each category can have multiple subcategories
- Foreign key: `project_sub_categories.project_category_id`
- Cascade delete: When category deleted, subcategories are deleted

#### **One-to-Many: project_sub_categories → project_details**
```
project_sub_categories (1) ←→ (N) project_details
```
- Each subcategory can have multiple projects
- Foreign key: `project_details.project_sub_category_id`
- Set null on delete: When subcategory deleted, projects remain but reference is nulled

## 📊 **Mock Data Structure**

### **Frontend Mock Data Extracted**
Based on `src/services/projectCategoryPageService.ts`:

```javascript
const mockSubCategoriesData = {
  "house-normal": [
    {
      id: "nha-ong",
      title: "Nhà Ống",
      description: "Thiết kế cho mặt tiền hẹp, chiều sâu dài, tận dụng tối đa diện tích.",
      heroImageUrl: "diary-image-1.jpg",
      displayOrder: 0
    },
    // ... 3 more subcategories
  ],
  "house-full": [
    {
      id: "resort-villa",
      title: "Resort Garden Houses",
      description: "Diện tích lớn, nhiều tiện ích cao cấp như hồ bơi, sân tennis.",
      heroImageUrl: "diary-image-2.jpg",
      displayOrder: 0
    },
    // ... 1 more subcategory
  ],
  // ... more categories
};
```

### **Seeded Data Summary**
- **Total Subcategories**: 12
- **house-normal**: 4 subcategories (Nhà Ống, Nhà Liền Kề, Nhà Phố Có Sân Vườn, Shophouse)
- **house-full**: 2 subcategories (Resort Garden Houses, Nhà Vườn Mini)
- **house-rough**: 2 subcategories (Biệt Thự Đơn Lập, Biệt Thự Song Lập)
- **house-interior**: 4 subcategories (Nhà Cấp 4 variants)

## 🔧 **Implementation Files**

### **Database Migration**
- **File**: `pgdesign-be/database/migrations/012_create_project_sub_categories_table.js`
- **Purpose**: Creates `project_sub_categories` table and relationships
- **Usage**: `npm run migrate`

### **Seeding Scripts**

#### **1. Main Seeding Script** (Recommended)
- **File**: `pgdesign-be/scripts/seedProjectSubCategoriesFromMock.js`
- **Command**: `npm run seed:subcategories`
- **Features**:
  - ✅ Uploads hero images to MinIO
  - ✅ Seeds database with MinIO URLs
  - ✅ Maps frontend mock data to database structure
  - ✅ Validates category relationships

#### **2. Database-Only Seed**
- **File**: `pgdesign-be/database/seeds/010_project_sub_categories_from_mock.js`
- **Command**: `npm run seed` (runs all seeds)
- **Features**:
  - ✅ Seeds database with mock data
  - ⚠️  Uses existing MinIO URLs (requires images to be uploaded separately)

### **Backend Model**
- **File**: `pgdesign-be/src/models/ProjectSubCategoriesModel.ts`
- **Features**:
  - ✅ TypeScript interfaces and types
  - ✅ CRUD operations with proper relationships
  - ✅ Data transformation between DB and API formats
  - ✅ Validation methods
  - ✅ Filtering and grouping capabilities

### **Verification Script**
- **File**: `pgdesign-be/scripts/verifySubCategories.js`
- **Purpose**: Verify seeding results and relationships
- **Usage**: `node scripts/verifySubCategories.js`

## 🚀 **Quick Start**

### **1. Run Migration**
```bash
cd pgdesign-be
npm run migrate
```

### **2. Seed Subcategories**
```bash
npm run seed:subcategories
```

### **3. Verify Results**
```bash
node scripts/verifySubCategories.js
```

## 📝 **Usage Examples**

### **Using the Model in Controllers**

```typescript
import { ProjectSubCategoriesModel } from '../models/ProjectSubCategoriesModel';

const subCategoriesModel = new ProjectSubCategoriesModel();

// Get all subcategories for a category
const subcategories = await subCategoriesModel.getByCategoryId('house-normal');

// Get subcategories with parent category info
const withCategories = await subCategoriesModel.getAllWithCategories();

// Get specific subcategory
const subcategory = await subCategoriesModel.getBySubCategoryId('house-normal', 'nha-ong');

// Get grouped by category
const grouped = await subCategoriesModel.getGroupedByCategory();
```

### **API Endpoint Examples**

```typescript
// GET /api/v1/categories/:categoryId/subcategories
router.get('/:categoryId/subcategories', async (req, res) => {
  const subcategories = await subCategoriesModel.getByCategoryId(req.params.categoryId);
  res.json({ success: true, data: subcategories });
});

// GET /api/v1/categories/:categoryId/subcategories/:subCategoryId  
router.get('/:categoryId/subcategories/:subCategoryId', async (req, res) => {
  const subcategory = await subCategoriesModel.getBySubCategoryId(
    req.params.categoryId, 
    req.params.subCategoryId
  );
  res.json({ success: true, data: subcategory });
});
```

## 🔗 **Frontend Integration**

### **Updating Frontend Service**
Once the backend is ready, update `src/services/projectCategoryPageService.ts`:

```typescript
// Change this:
const USE_MOCK_DATA = true;

// To this:
const USE_MOCK_DATA = true;
```

### **API Endpoints for Frontend**
- `GET /api/v1/categories` - All categories
- `GET /api/v1/categories/:categoryId/subcategories` - Subcategories for category
- `GET /api/v1/categories/:categoryId/subcategories/:subCategoryId` - Specific subcategory
- `GET /api/v1/categories/:categoryId/subcategories/:subCategoryId/projects` - Projects in subcategory

## 📊 **Current Status**

### **✅ Completed**
- [x] Database migration with proper relationships
- [x] Image upload to MinIO from frontend assets
- [x] Database seeding from frontend mock data  
- [x] Backend model with full CRUD operations
- [x] Data validation and transformation
- [x] Verification scripts and documentation

### **🔄 Next Steps**
1. **Create Backend Controllers** for API endpoints
2. **Create Backend Routes** for subcategories
3. **Update Project Details** to use subcategory relationships
4. **Create Admin Interface** for managing subcategories
5. **Frontend Integration** to use real API instead of mock data

## 🎯 **Data Flow**

```
Frontend Mock Data (projectCategoryPageService.ts)
    ↓
Image Upload Script (uploads hero images to MinIO)
    ↓  
Database Seeding (populates project_sub_categories with MinIO URLs)
    ↓
Backend Model (provides CRUD operations with relationships)
    ↓
Backend Controllers & Routes (API endpoints)
    ↓
Frontend Service (switches from mock to real API)
```

## 🧪 **Testing the Implementation**

### **Verify Database Structure**
```sql
-- Check table structure
DESCRIBE project_sub_categories;

-- Check relationships
SELECT 
  pc.title as category,
  psc.title as subcategory,
  psc.project_count
FROM project_categories pc
JOIN project_sub_categories psc ON pc.id = psc.project_category_id
WHERE pc.is_active = true AND psc.is_active = true
ORDER BY pc.display_order, psc.display_order;
```

### **Test Model Operations**
```typescript
const model = new ProjectSubCategoriesModel();

// Test basic operations
const all = await model.getAll();
const byCategory = await model.getByCategoryId('house-normal');
const specific = await model.getBySubCategoryId('house-normal', 'nha-ong');
```

## 🔧 **Configuration**

### **Database Configuration** 
```javascript
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'pgdesign', 
  password: 'pgdesignpassword',
  database: 'pgdesign_dev'
};
```

### **MinIO Configuration**
```javascript
const minioClient = new Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin',
});
```

## 📚 **Related Files**

### **Migration & Schema**
- `pgdesign-be/database/migrations/012_create_project_sub_categories_table.js`
- `pgdesign-be/database/migrations/008_create_project_page_tables.js` (original project categories)

### **Seeding & Data**
- `pgdesign-be/scripts/seedProjectSubCategoriesFromMock.js`
- `pgdesign-be/database/seeds/010_project_sub_categories_from_mock.js`
- `src/services/projectCategoryPageService.ts` (frontend mock data source)

### **Backend Code**
- `pgdesign-be/src/models/ProjectSubCategoriesModel.ts`
- `pgdesign-be/src/models/BaseModel.ts` (parent class)

### **Package Configuration**
- `pgdesign-be/package.json` (contains `seed:subcategories` script)

---

**🎉 The Project Sub-Categories system is now fully implemented with proper relationships and ready for backend API development!** 