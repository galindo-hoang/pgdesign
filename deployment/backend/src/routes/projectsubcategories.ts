import { Router } from 'express';
import { validateContentType } from '../middleware/validateContentType';
import ProjectSubCategoriesController from '../controllers/ProjectSubCategoriesController';

const router: Router = Router();

// ========== MAIN ENDPOINTS ==========

/**
 * Get all project subcategories with optional filtering
 * GET /api/v1/projectsubcategories
 * Query parameters:
 * - projectCategoryId: Filter by project category ID
 * - categoryId: Filter by category ID (category_id from project_categories)
 * - isActive: Filter by active status
 * - includeCategories: Include category information
 */
router.get('/', ProjectSubCategoriesController.getAllProjectSubCategories);

/**
 * Get subcategories by category ID
 * GET /api/v1/projectsubcategories/category/:categoryId
 */
router.get('/category/:categoryId', ProjectSubCategoriesController.getSubCategoriesByCategoryId);

/**
 * Get subcategories with project details overview by category ID
 * GET /api/v1/projectsubcategories/category/:categoryId/overview
 */
router.get('/category/:categoryId/overview', ProjectSubCategoriesController.getSubCategoriesWithProjectOverviewByCategoryId);

/**
 * Get subcategories grouped by category
 * GET /api/v1/projectsubcategories/grouped
 */
router.get('/grouped', ProjectSubCategoriesController.getSubCategoriesGroupedByCategory);

/**
 * Get subcategory by category ID and sub-category ID
 * GET /api/v1/projectsubcategories/category/:categoryId/subcategory/:subCategoryId
 */
router.get('/category/:categoryId/subcategory/:subCategoryId', ProjectSubCategoriesController.getSubCategoryByIds);

/**
 * Get subcategory by sub-category ID only (globally unique)
 * GET /api/v1/projectsubcategories/subcategory/:subCategoryId
 */
router.get('/subcategory/:subCategoryId', ProjectSubCategoriesController.getSubCategoryBySubCategoryId);

/**
 * Get single subcategory by ID
 * GET /api/v1/projectsubcategories/:id
 */
router.get('/:id', ProjectSubCategoriesController.getProjectSubCategoryById);

/**
 * Create new subcategory
 * POST /api/v1/projectsubcategories
 */
router.post('/', validateContentType, ProjectSubCategoriesController.createProjectSubCategory);

/**
 * Update subcategory by sub-category ID
 * PUT /api/v1/projectsubcategories/subcategory/:subCategoryId
 */
router.put('/subcategory/:subCategoryId', validateContentType, ProjectSubCategoriesController.updateSubCategoryBySubCategoryId);

/**
 * Update subcategory
 * PUT /api/v1/projectsubcategories/:id
 */
router.put('/:id', validateContentType, ProjectSubCategoriesController.updateProjectSubCategory);

/**
 * Update project count for a subcategory
 * PATCH /api/v1/projectsubcategories/:id/count
 */
router.patch('/:id/count', validateContentType, ProjectSubCategoriesController.updateProjectCount);

/**
 * Delete subcategory (soft delete)
 * DELETE /api/v1/projectsubcategories/:id
 */
router.delete('/:id', ProjectSubCategoriesController.deleteProjectSubCategory);

export default router; 