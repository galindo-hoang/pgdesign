// src/routes/blogpage.ts

import { Router } from 'express';
import { validateContentType } from '../middleware/validateContentType';
import { BlogPageController } from '../controllers/BlogPageController';

const router: Router = Router();
const blogPageController = new BlogPageController();

// ==============================================
// MAIN ENDPOINT - Get All Blog Page Data
// ==============================================

/**
 * Get complete blog page data (for frontend)
 * GET /api/v1/blogpage
 * Returns all blog page sections: hero, projects, content, consultation CTA
 */
router.get(
  '/',
  blogPageController.getBlogPageData
);

// ==============================================
// HERO SECTION ROUTES
// ==============================================

/**
 * Get blog hero data
 * GET /api/v1/blogpage/hero
 */
router.get(
  '/hero',
  blogPageController.getHeroData
);

/**
 * Create blog hero data
 * POST /api/v1/blogpage/hero
 * Body: { title, subtitle, isActive?, displayOrder? }
 */
router.post(
  '/hero',
  validateContentType,
  blogPageController.createHeroData
);

/**
 * Update blog hero data
 * PUT /api/v1/blogpage/hero/:id
 * Body: { title?, subtitle?, isActive?, displayOrder? }
 */
router.put(
  '/hero/:id',
  validateContentType,
  blogPageController.updateHeroData
);

// ==============================================
// PROJECT ITEMS ROUTES
// ==============================================

/**
 * Get project items with filtering and pagination
 * GET /api/v1/blogpage/projects
 * Query parameters:
 * - category: Filter by category/style
 * - style: Filter by style
 * - location: Filter by location
 * - limit: Number of items to return (default: 6)
 * - offset: Number of items to skip (default: 0)
 */
router.get(
  '/projects',
  blogPageController.getProjectItems
);

/**
 * Get single project item by ID
 * GET /api/v1/blogpage/projects/:id
 */
router.get(
  '/projects/:id',
  blogPageController.getProjectItemById
);

/**
 * Create new project item
 * POST /api/v1/blogpage/projects
 * Body: { projectId, title, imageUrl, area, style, clientName, location, isActive?, displayOrder? }
 */
router.post(
  '/projects',
  validateContentType,
  blogPageController.createProjectItem
);

/**
 * Update project item
 * PUT /api/v1/blogpage/projects/:id
 * Body: { projectId?, title?, imageUrl?, area?, style?, clientName?, location?, isActive?, displayOrder? }
 */
router.put(
  '/projects/:id',
  validateContentType,
  blogPageController.updateProjectItem
);

/**
 * Delete project item (soft delete)
 * DELETE /api/v1/blogpage/projects/:id
 */
router.delete(
  '/projects/:id',
  blogPageController.deleteProjectItem
);

// ==============================================
// CONTENT SECTION ROUTES
// ==============================================

/**
 * Get content section data (includes design styles, factors, process steps)
 * GET /api/v1/blogpage/content-section
 */
router.get(
  '/content-section',
  blogPageController.getContentSection
);

/**
 * Create content section with related data
 * POST /api/v1/blogpage/content-section
 * Body: {
 *   mainTitle, introText, designStylesTitle, factorsTitle, processTitle,
 *   designStyles: [{ name, description, displayOrder?, isActive? }],
 *   importantFactors: [{ title, description, displayOrder?, isActive? }],
 *   processSteps: [{ stepNumber, title, description, displayOrder?, isActive? }],
 *   isActive?, displayOrder?
 * }
 */
router.post(
  '/content-section',
  validateContentType,
  blogPageController.createContentSection
);

// ==============================================
// CONSULTATION CTA ROUTES
// ==============================================

/**
 * Get consultation CTA data
 * GET /api/v1/blogpage/consultation-cta
 */
router.get(
  '/consultation-cta',
  blogPageController.getConsultationCTA
);

/**
 * Create consultation CTA
 * POST /api/v1/blogpage/consultation-cta
 * Body: { title, description, features: string[], buttonText, imageUrl, isActive?, displayOrder? }
 */
router.post(
  '/consultation-cta',
  validateContentType,
  blogPageController.createConsultationCTA
);

// ==============================================
// SEARCH AND FILTERING ROUTES
// ==============================================

/**
 * Search projects with advanced filtering
 * GET /api/v1/blogpage/search
 * Query parameters:
 * - query: Search text (searches in title, style, location, client)
 * - category: Filter by category
 * - style: Filter by style
 * - location: Filter by location
 * - isActive: Filter by active status (true/false)
 * - dateFrom: Filter by creation date from (YYYY-MM-DD)
 * - dateTo: Filter by creation date to (YYYY-MM-DD)
 * - sortBy: Sort field (created_at, updated_at, display_order, title)
 * - sortOrder: Sort direction (asc, desc)
 * - page: Page number for pagination
 * - limit: Items per page
 */
router.get(
  '/search',
  blogPageController.searchProjects
);

// ==============================================
// BULK OPERATIONS ROUTES
// ==============================================

/**
 * Bulk update project items
 * PUT /api/v1/blogpage/projects/bulk-update
 * Body: {
 *   ids: number[],
 *   updates: { isActive?: boolean, displayOrder?: number }
 * }
 */
router.put(
  '/projects/bulk-update',
  validateContentType,
  blogPageController.bulkUpdateProjects
);

/**
 * Bulk delete project items
 * DELETE /api/v1/blogpage/projects/bulk-delete
 * Body: {
 *   ids: number[],
 *   hardDelete?: boolean
 * }
 */
router.delete(
  '/projects/bulk-delete',
  validateContentType,
  blogPageController.bulkDeleteProjects
);

// ==============================================
// UTILITY ROUTES
// ==============================================

/**
 * Get unique styles for filtering
 * GET /api/v1/blogpage/util/styles
 */
router.get(
  '/util/styles',
  blogPageController.getStyles
);

/**
 * Get unique locations for filtering
 * GET /api/v1/blogpage/util/locations
 */
router.get(
  '/util/locations',
  blogPageController.getLocations
);

/**
 * Get blog page statistics
 * GET /api/v1/blogpage/stats
 */
router.get(
  '/stats',
  blogPageController.getStats
);

export default router; 