# Project Admin Guide

## Overview

The Project Admin interface allows you to manage project categories for the main website's Project page. This includes managing the header information and individual project categories with their images, titles, and metadata.

## Features

### 1. Header Management

- **Main Title**: The primary heading for the project categories section
- **Subtitle**: Secondary heading that provides context
- **Description**: Detailed description of the project categories section

### 2. Category Management

- **Create Categories**: Add new project categories
- **Edit Categories**: Modify existing category information
- **Delete Categories**: Remove categories from the system
- **Image Management**: Upload and manage background images for each category
- **Display Order**: Control the order in which categories appear

### 3. Category Properties

Each project category includes:

- **Category ID**: Unique identifier (e.g., "house-normal", "appartment")
- **Title**: Display name (e.g., "NHÀ PHỐ", "CHUNG CƯ")
- **Project Count**: Number of projects in this category
- **Navigation Path**: URL path for the category page
- **Background Image**: Visual representation stored as BLOB in database
- **Display Order**: Numerical order for category arrangement

## Usage

### Accessing Project Admin

1. Log into the webadmin system
2. Navigate to "Project Categories" in the sidebar menu
3. The interface will load with current project data

### Managing Header Information

1. Click on the "Header Settings" tab
2. Toggle to "Edit Mode"
3. Modify the main title, subtitle, and description
4. Click "Save Changes" to update

### Managing Categories

#### Adding a New Category

1. Switch to "Categories" tab
2. Toggle to "Edit Mode"
3. Click "Add Category" button
4. Fill in the required information:
   - Category ID (unique identifier)
   - Title (display name)
   - Project Count (number of projects)
   - Navigation Path (URL path)
   - Display Order (sorting order)
5. Click "Create Category"

#### Editing an Existing Category

1. Find the category in the grid
2. Click the edit button (pencil icon)
3. Modify the information as needed
4. Click "Update Category"

#### Deleting a Category

1. Find the category in the grid
2. Click the delete button (trash icon)
3. Confirm the deletion

#### Managing Category Images

1. In edit mode, click on the image area of any category
2. Upload a new image or replace existing one
3. Images are automatically processed and stored as BLOBs in the database
4. Supported formats: JPEG, PNG, GIF, WebP
5. Maximum file size: 5MB

### Preview

- Click "Preview" button to see how the project page will look
- This opens the main website's project page in an iframe
- Useful for testing changes before publishing

## API Integration

The Project Admin connects to the following backend endpoints:

- `GET /api/v1/projectpage/project-categories` - Fetch all project data
- `PUT /api/v1/projectpage/project-categories/{id}` - Update project data
- `POST /api/v1/projectpage/project-categories/{id}/categories` - Create new category
- `PUT /api/v1/projectpage/project-categories/{id}/categories/{categoryId}` - Update category
- `DELETE /api/v1/projectpage/project-categories/{id}/categories/{categoryId}` - Delete category
- `POST /api/v1/upload` - Upload images

## Data Structure

### ProjectCategoriesData

```typescript
{
  id: number;
  mainTitle: string;
  subtitle: string;
  description: string;
  categories: ProjectCategory[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### ProjectCategory

```typescript
{
  id: number;
  categoryId: string;
  title: string;
  projectCount: number;
  backgroundImageBlob?: string; // Base64 encoded image data
  navigationPath: string;
  displayOrder: number;
}
```

## Best Practices

1. **Category IDs**: Use descriptive, URL-friendly identifiers (e.g., "house-normal", "appartment")
2. **Navigation Paths**: Ensure paths match your routing structure (e.g., "/projects/house-normal")
3. **Display Order**: Use sequential numbers for proper sorting
4. **Images**: Optimize images before uploading for better performance
5. **Titles**: Keep titles concise and descriptive
6. **Project Counts**: Keep counts accurate to reflect actual project numbers

## Troubleshooting

### Common Issues

1. **Image Upload Failures**

   - Check file size (max 5MB)
   - Ensure supported format (JPEG, PNG, GIF, WebP)
   - Verify network connection

2. **Save Failures**

   - Check all required fields are filled
   - Ensure Category ID is unique
   - Verify navigation path format

3. **Preview Not Loading**
   - Ensure main website is running on localhost:3000
   - Check browser console for errors

### Error Messages

- "Failed to load data": Check API connection and database status
- "Upload failed": Verify file format and size requirements
- "Category ID already exists": Choose a unique identifier
- "Invalid navigation path": Ensure path starts with "/"

## Security Notes

- All image uploads are processed and stored as base64 BLOBs in the database
- No direct file system access required
- Images are validated before processing
- File size and type restrictions are enforced

## Performance Considerations

- Images are automatically optimized during upload
- BLOB storage reduces external dependencies
- Caching is handled by the backend API
- Large images may take time to process
