// src/routes/projectdetail.ts

import { Router } from 'express';
import { validateContentType } from '../middleware/validateContentType';
import ProjectDetailController from '../controllers/ProjectDetailController';

const router: Router = Router();

// ===== MAIN ENDPOINTS =====

/**
 * Get all project details with optional filtering and pagination
 * GET /api/v1/projectdetail
 * Query parameters:
 * - category: Filter by category
 * - subCategory: Filter by sub-category
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
 */
router.post(
  '/',
  validateContentType,
  ProjectDetailController.createProjectDetail
);

/**
 * Update project detail
 * PUT /api/v1/projectdetail/:id
 */
router.put(
  '/:id',
  validateContentType,
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

// ===== UTILITY ENDPOINTS =====

/**
 * Get all project categories
 * GET /api/v1/projectdetail/categories
 */
router.get(
  '/util/categories',
  ProjectDetailController.getCategories
);

/**
 * Get subcategories (optionally filtered by category)
 * GET /api/v1/projectdetail/subcategories?category=house-normal
 */
router.get(
  '/util/subcategories',
  ProjectDetailController.getSubCategories
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

export default router; 