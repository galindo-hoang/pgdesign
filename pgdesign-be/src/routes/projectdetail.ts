// src/routes/projectdetail.ts

import { Router } from 'express';
import { validateContentType } from '../middleware/validateContentType';
import ProjectDetailController from '../controllers/ProjectDetailController';
import { uploadFields } from '../middleware/uploadMiddleware';

const router: Router = Router();

// ===== MAIN ENDPOINTS =====

/**
 * Get all project details with optional filtering and pagination
 * GET /api/v1/projectdetail
 * Query parameters:
 * - category: Filter by category
 * - projectCategoryId: Filter by category ID
 * - projectStatus: Filter by project status
 * - isActive: Filter by active status
 * - page: Page number for pagination
 * - limit: Items per page for pagination
 */
router.get('/',ProjectDetailController.getAllProjectDetails);

/**
 * Get project detail by ID
 * GET /api/v1/projectdetail/:id
 */
router.get('/:id',ProjectDetailController.getProjectDetailById);

/**
 * Get project detail by project ID
 * GET /api/v1/projectdetail/project/:projectId
 */
router.get(
  '/project/:projectId',
  ProjectDetailController.getProjectDetailByProjectId
);

/**
 * Create new project detail
 * POST /api/v1/projectdetail
 * Supports both JSON and multipart/form-data (with automatic image upload)
 * 
 * JSON Request:
 * Content-Type: application/json
 * Body: { projectId, title, ... }
 * 
 * Multipart Request (with images):
 * Content-Type: multipart/form-data
 * Fields:
 * - projectData: JSON string with project details
 * - thumbnail: File (optional)
 * - images: File[] (optional, multiple files)
 */
router.post(
  '/',
  uploadFields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 20 }
  ]),
  ProjectDetailController.createProjectDetail
);

/**
 * Update project detail
 * PUT /api/v1/projectdetail/:id
 * Supports both JSON and multipart/form-data (with automatic image upload)
 * 
 * JSON Request:
 * Content-Type: application/json
 * Body: { title, description, ... }
 * 
 * Multipart Request (with images):
 * Content-Type: multipart/form-data
 * Fields:
 * - projectData: JSON string with updated project details
 * - thumbnail: File (optional) - will replace existing thumbnail
 * - images: File[] (optional) - will be added to existing images
 */
router.put(
  '/:id',
  uploadFields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 20 }
  ]),
  ProjectDetailController.updateProjectDetail
);

/**
 * Delete project detail (soft delete)
 * DELETE /api/v1/projectdetail/:id
 */
router.delete(
  '/:id',
  ProjectDetailController.deleteProjectDetail
);

/**
 * Hard delete project detail (permanent)
 * DELETE /api/v1/projectdetail/:id/hard
 */
router.delete(
  '/:id/hard',
  ProjectDetailController.hardDeleteProjectDetail
);

/**
 * Toggle homepage status for a project
 * PUT /api/v1/projectdetail/:id/homepage-status
 */
router.put('/:id/homepage-status', ProjectDetailController.toggleHomepageStatus);

// ===== CATEGORY ENDPOINTS =====

/**
 * Get projects by category (direct relationship)
 * GET /api/v1/projectdetail/category/:categoryId
 */
router.get(
  '/category/:categoryId',
  ProjectDetailController.getProjectsByCategory
);

// ===== UTILITY ENDPOINTS =====

/**
 * Get all project categories
 * GET /api/v1/projectdetail/util/categories
 */
router.get(
  '/util/categories',
  ProjectDetailController.getCategories
);

/**
 * Get project counts by category
 * GET /api/v1/projectdetail/util/category-counts
 */
router.get(
  '/util/category-counts',
  ProjectDetailController.getCategoryCounts
);

// ===== SEARCH ENDPOINTS =====

/**
 * Search project details by title, description, or tags
 * GET /api/v1/projectdetail/search?q=nhà phố&category=house-normal
 */
router.get(
  '/search/query',
  ProjectDetailController.searchProjectDetails
);

// ===== BULK OPERATIONS =====

/**
 * Bulk update project details
 * PUT /api/v1/projectdetail/bulk
 */
router.put('/bulk/update',validateContentType,ProjectDetailController.bulkUpdateProjectDetails);

/**
 * Bulk delete project details
 * DELETE /api/v1/projectdetail/bulk
 */
router.delete('/bulk/delete',validateContentType,ProjectDetailController.bulkDeleteProjectDetails);

// ===== IMAGE MANAGEMENT ENDPOINTS =====

/**
 * Remove specific images from project gallery
 * DELETE /api/v1/projectdetail/:id/images
 * Body: { imageUrls: string[] }
 */
router.delete(
  '/:id/images',
  validateContentType,
  ProjectDetailController.removeProjectImages
);

export default router; 