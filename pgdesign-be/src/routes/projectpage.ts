import { Router } from "express";
import projectPageController from "../controllers/ProjectPageController";
import { validateContentType } from "../middleware/validateContentType";

const router: Router = Router();

// ========== MAIN PROJECT PAGE ENDPOINT ==========

// GET /api/v1/projectpage - Get all project page data
router.get("/", projectPageController.getProjectPageData);

// ========== ABOUT PROJECT SECTION ROUTES ==========

// GET /api/v1/projectpage/about-project - Get about project data
router.get("/about-project", projectPageController.getAboutProjectData);

// POST /api/v1/projectpage/about-project - Create about project data
router.post(
  "/about-project",
  validateContentType,
  projectPageController.createAboutProjectData
);

// PUT /api/v1/projectpage/about-project/:id - Update about project data
router.put(
  "/about-project/:id",
  validateContentType,
  projectPageController.updateAboutProjectData
);

// DELETE /api/v1/projectpage/about-project/:id - Delete about project data
router.delete(
  "/about-project/:id",
  projectPageController.deleteAboutProjectData
);

// ========== STATS SECTION ROUTES ==========

// GET /api/v1/projectpage/stats-section - Get stats section data
router.get("/stats-section", projectPageController.getStatsSectionData);

// POST /api/v1/projectpage/stats-section - Create stats section data
router.post(
  "/stats-section",
  validateContentType,
  projectPageController.createStatsSectionData
);

// PUT /api/v1/projectpage/stats-section/:id - Update stats section data
router.put(
  "/stats-section/:id",
  validateContentType,
  projectPageController.updateStatsSectionData
);

// DELETE /api/v1/projectpage/stats-section/:id - Delete stats section data
router.delete(
  "/stats-section/:id",
  projectPageController.deleteStatsSectionData
);

// ========== PROJECT CATEGORIES SECTION ROUTES ==========

// GET /api/v1/projectpage/project-categories - Get project categories data
router.get(
  "/project-categories",
  projectPageController.getProjectCategoriesData
);

// GET /api/v1/projectpage/categories/:id - Get single project category by ID (category_id or id)
router.get("/categories/:id", projectPageController.getProjectCategoryById);

// POST /api/v1/projectpage/project-categories - Create project categories data
router.post(
  "/project-categories",
  validateContentType,
  projectPageController.createProjectCategoriesData
);

// PUT /api/v1/projectpage/project-categories/:id - Update project categories data
router.put(
  "/project-categories/:id",
  validateContentType,
  projectPageController.updateProjectCategoriesData
);

// DELETE /api/v1/projectpage/project-categories/:id - Delete project categories data
router.delete(
  "/project-categories/:id",
  projectPageController.deleteProjectCategoriesData
);

// ========== INDIVIDUAL PROJECT CATEGORY ROUTES ==========

// POST /api/v1/projectpage/project-categories/:id/categories - Create a new category within project categories data
router.post(
  "/project-categories/:id/categories",
  validateContentType,
  projectPageController.createProjectCategory
);

// PUT /api/v1/projectpage/project-categories/:dataId/categories/:categoryId - Update a specific category
router.put(
  "/project-categories/:dataId/categories/:categoryId",
  validateContentType,
  projectPageController.updateProjectCategory
);

// DELETE /api/v1/projectpage/project-categories/:dataId/categories/:categoryId - Delete a specific category
router.delete(
  "/project-categories/:dataId/categories/:categoryId",
  projectPageController.deleteProjectCategory
);

export default router;
