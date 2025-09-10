# PG Design Backend API

A Node.js REST API backend for the PG Design website, providing CRUD operations for homepage content with MySQL database and MinIO file storage.

## Features

- 🚀 **Node.js & Express** - Fast and scalable REST API
- 🗄️ **MySQL Database** - Reliable relational database with Knex.js ORM
- 📁 **MinIO File Storage** - S3-compatible object storage for images and files
- 🔒 **Security** - Rate limiting, CORS, input validation
- 📱 **TypeScript** - Type-safe development
- 🎯 **CRUD Operations** - Complete Create, Read, Update, Delete for all sections
- 🖼️ **Image Processing** - Automatic image optimization and thumbnail generation
- 📊 **Database Migrations** - Version-controlled database schema

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd pgdesign-be

# Install dependencies
npm install

# Build the project
npm run build
```

## Environment Setup

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pgdesign_dev

# MinIO Configuration
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET_NAME=pgdesign-assets

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,svg,webp

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true
```

## Database Setup

### 1. Create MySQL Database
```sql
CREATE DATABASE pgdesign_dev;
```

### 2. Run Migrations
```bash
npm run migrate
```

### 3. Seed Data
```bash
npm run seed
```

## Running the Application

```bash
# Development mode
npm run dev

# Production
npm run build
npm start
```

The API will be available at `http://localhost:3001`

## API Documentation

### Base URL
```
http://localhost:3001/api/v1
```

### Endpoints

#### Get All Homepage Data
```
GET /homepage
```

#### Hero Section
```
GET /homepage/hero
POST /homepage/hero
PUT /homepage/hero/:id
DELETE /homepage/hero/:id
```

#### About Section
```
GET /homepage/about
POST /homepage/about
PUT /homepage/about/:id
DELETE /homepage/about/:id
```

#### Image Slider
```
GET /homepage/image-slider
POST /homepage/image-slider
PUT /homepage/image-slider/:id
DELETE /homepage/image-slider/:id
POST /homepage/image-slider/reorder
```

#### Stats Section
```
GET /homepage/stats
POST /homepage/stats
PUT /homepage/stats/:id
DELETE /homepage/stats/:id
```

### Example Request Bodies

**Hero Section:**
```json
{
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "is_active": true
}
```

**About Section:**
```json
{
  "headline": "MỖI THIẾT KẾ LÀ MỘT CÂU CHUYỆN",
  "sub_headline": "MỖI CÔNG TRÌNH LÀ MỘT DẤU ẤN",
  "description": "Thành lập từ năm 2022...",
  "is_active": true
}
```

**Stats Section:**
```json
{
  "header": {
    "main_headline": "THÀNH TỰU CỦA CHÚNG TÔI",
    "sub_headline": "Những con số ấn tượng",
    "description": "Với nhiều năm kinh nghiệm..."
  },
  "items": [
    {
      "icon_name": "experience-icon",
      "icon_url": "https://example.com/icon.svg",
      "target_value": 5,
      "label": "Kinh nghiệm",
      "suffix": "+ năm",
      "description": "Kinh nghiệm",
      "background_image_url": "https://example.com/bg.jpg",
      "category": "experience"
    }
  ]
}
```

## Project Structure

```
pgdesign-be/
├── src/
│   ├── config/         # Database & MinIO configuration
│   ├── controllers/    # API controllers
│   ├── middleware/     # Express middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic services
│   ├── types/          # TypeScript types
│   └── app.ts          # Express app setup
├── database/
│   ├── migrations/     # Database migrations
│   └── seeds/          # Database seeds
└── README.md
```

## Development Commands

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Run migrations
npm run migrate

# Run seeds
npm run seed

# Rollback migration
npm run migrate:rollback
```

## License

MIT License 