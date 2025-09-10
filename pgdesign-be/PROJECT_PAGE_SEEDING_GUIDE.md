# Project Page Seeding Guide

## 🎯 **Overview**
This guide explains how to seed Project Page data and images from the frontend mock data into MySQL database and MinIO storage.

## 📋 **What's Available**

### **Two Seeding Options**

#### 1. **Full Seeding with Image Upload** (Recommended)
- **Script**: `scripts/seedProjectPageFromMock.js`
- **Command**: `npm run seed:project-page`
- **What it does**:
  - ✅ Uploads images from `src/assets/images/` to MinIO
  - ✅ Uploads icons from `src/assets/icons/` to MinIO  
  - ✅ Seeds database with proper MinIO URLs
  - ✅ Complete synchronization between frontend mock and backend

#### 2. **Database-Only Seeding**
- **Script**: `database/seeds/009_project_page_from_mock.js`
- **Command**: `npm run seed` (runs all seeds including this one)
- **What it does**:
  - ✅ Seeds database with mock data
  - ⚠️  Uses existing MinIO URLs (requires images to be uploaded separately)

## 🚀 **Quick Start**

### **Prerequisites**
1. **MySQL** running on localhost:3306
2. **MinIO** running on localhost:9000
3. **Frontend assets** available in `src/assets/`

### **Recommended Approach** (Full Seeding)
```bash
cd pgdesign-be
npm run seed:project-page
```

### **Alternative Approach** (Database Only)
```bash
cd pgdesign-be
npm run migrate  # Ensure database schema is up to date
npm run seed     # Runs all seed files including project page
```

## 📊 **Mock Data Structure**

The seeding uses the exact same data structure as defined in `src/services/projectPageService.ts`:

### **About Project Data**
```javascript
{
  title: 'Dự án',
  subtitle: 'PG DESIGN',
  backgroundImageUrl: 'thumb-intro.jpg'
}
```

### **Stats Section Data**
```javascript
{
  mainHeadline: 'THÀNH TỰU CỦA CHÚNG TÔI',
  subHeadline: 'Những con số ấn tượng',
  description: '...',
  statsItems: [
    {
      iconName: 'experience-icon',
      targetValue: 5,
      label: 'Kinh nghiệm',
      suffix: '+ năm',
      category: 'experience'
      // ... more fields
    }
    // ... 4 total items
  ]
}
```

### **Project Categories Data**
```javascript
{
  mainTitle: 'DANH MỤC DỰ ÁN',
  subtitle: 'KHÁM PHÁ CÁC LOẠI HÌNH THIẾT KẾ',
  description: '...',
  categories: [
    {
      categoryId: 'house-normal',
      title: 'NHÀ PHỐ',
      projectCount: 45,
      navigationPath: '/projects/house-normal'
      // ... more fields
    }
    // ... 4 total categories
  ]
}
```

## 🖼️ **Required Images & Icons**

### **Images** (from `src/assets/images/`)
- `thumb-intro.jpg` - About project background
- `diary-image-1.jpg` - Experience stats background + House category
- `diary-image-2.jpg` - Customer stats background + Full package category  
- `diary-image-3.jpg` - Projects stats background + Rough construction category
- `diary-image-4.jpg` - Quality stats background + Interior design category

### **Icons** (from `src/assets/icons/`)
- `experience-icon.svg` - Experience stats icon
- `customer-icon.svg` - Customer stats icon
- `design-icon.svg` - Projects stats icon
- `building-icon.svg` - Quality stats icon

## 🗄️ **Database Schema**

The seeding populates these tables:

### **about_project_data**
- `id`, `title`, `subtitle`, `background_image_url`, `is_active`

### **stats_section_data** 
- `id`, `main_headline`, `sub_headline`, `description`, `is_active`

### **stats_items**
- `id`, `stats_section_id`, `icon_name`, `icon_url`, `target_value`, `label`, `suffix`, `description`, `background_image_url`, `category`, `display_order`, `is_active`

### **project_categories_data**
- `id`, `main_title`, `subtitle`, `description`, `is_active`

### **project_categories**
- `id`, `categories_data_id`, `category_id`, `title`, `project_count`, `background_image_url`, `navigation_path`, `display_order`, `is_active`

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

## 🧪 **Testing the Seeded Data**

After seeding, test the API endpoints:

```bash
# Get all project page data
curl http://localhost:3002/api/v1/projectpage

# Get individual sections
curl http://localhost:3002/api/v1/projectpage/about-project
curl http://localhost:3002/api/v1/projectpage/stats-section  
curl http://localhost:3002/api/v1/projectpage/project-categories
```

## 📝 **Seed Output Example**

```
🚀 Starting Project Page seeding from mock data...
📂 Assets path: ../../src/assets
✅ Bucket 'pgdesign-assets' already exists
📸 Uploading required images...
✅ Uploaded: thumb-intro.jpg -> http://localhost:9000/pgdesign-assets/images/thumb-intro.jpg
✅ Uploaded: diary-image-1.jpg -> http://localhost:9000/pgdesign-assets/images/diary-image-1.jpg
✅ Uploaded: diary-image-2.jpg -> http://localhost:9000/pgdesign-assets/images/diary-image-2.jpg
✅ Uploaded: diary-image-3.jpg -> http://localhost:9000/pgdesign-assets/images/diary-image-3.jpg
✅ Uploaded: diary-image-4.jpg -> http://localhost:9000/pgdesign-assets/images/diary-image-4.jpg
✅ Uploaded: experience-icon.svg -> http://localhost:9000/pgdesign-assets/icons/experience-icon.svg
✅ Uploaded: customer-icon.svg -> http://localhost:9000/pgdesign-assets/icons/customer-icon.svg
✅ Uploaded: design-icon.svg -> http://localhost:9000/pgdesign-assets/icons/design-icon.svg
✅ Uploaded: building-icon.svg -> http://localhost:9000/pgdesign-assets/icons/building-icon.svg
✅ Connected to MySQL
🧹 Cleaning up existing project page data...
📄 Inserting About Project data...
📊 Inserting Stats Section data...
📈 Inserting Stats Items...
🏗️ Inserting Project Categories data...
🏠 Inserting Project Categories...
✅ Database seeded successfully!

📋 Seed Summary:
   📄 About Project: 1 record
   📊 Stats Section: 1 record
   📈 Stats Items: 4 records
   🏗️ Project Categories Data: 1 record
   🏠 Project Categories: 4 records
```

## 🔄 **Data Synchronization**

### **Frontend Mock → Backend Database**
The seeding process ensures perfect synchronization:

1. **Frontend Mock Data** (`src/services/projectPageService.ts`)
   ↓
2. **Seeding Scripts** (extract data structure)
   ↓  
3. **Image Upload** (assets → MinIO)
   ↓
4. **Database Insert** (with MinIO URLs)
   ↓
5. **Backend API** (serves seeded data)
   ↓
6. **Frontend Production** (uses real API instead of mock)

## ⚙️ **Advanced Usage**

### **Custom Configuration**
Edit the configuration in `scripts/seedProjectPageFromMock.js`:

```javascript
// Change database settings
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'pgdesign',
  password: process.env.DB_PASSWORD || 'pgdesignpassword',
  database: process.env.DB_NAME || 'pgdesign_dev'
};

// Change MinIO settings
const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});
```

### **Partial Seeding**
To seed only specific sections, modify the seeding script or create custom scripts for individual sections.

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Images Not Found**
```
⚠️  File not found: /path/to/image.jpg
```
**Solution**: Ensure frontend assets exist in `src/assets/images/` and `src/assets/icons/`

#### **Database Connection Failed**
```
❌ Error connecting to MySQL
```
**Solution**: Check MySQL is running and credentials are correct

#### **MinIO Connection Failed**
```
❌ Error initializing bucket
```
**Solution**: Check MinIO is running on localhost:9000

#### **Permission Errors**
```
❌ Error uploading to MinIO
```
**Solution**: Check MinIO access credentials and bucket permissions

## 🎉 **Success Indicators**

✅ **All images uploaded to MinIO**  
✅ **Database records inserted successfully**  
✅ **API endpoints return seeded data**  
✅ **Frontend can switch from mock to real API**  
✅ **Images display correctly in frontend**

## 📚 **Related Documentation**

- **Frontend Mock Data**: `src/services/projectPageService.ts`
- **Database Schema**: `pgdesign-be/database/migrations/008_create_project_page_tables.js`
- **API Documentation**: `pgdesign-be/PROJECT_PAGE_API_DOCUMENTATION.md`
- **Image Upload Guide**: `pgdesign-be/IMAGE_UPLOAD_SUMMARY.md` 