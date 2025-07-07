import { Router } from 'express';
import ProjectPageController from '../controllers/ProjectPageController';

const router: Router = Router();

// Get all project page data
router.get('/', ProjectPageController.getProjectPageData);

// ABOUT PROJECT SECTION ROUTES
router.get('/about-project', ProjectPageController.getAboutProjectData);
router.post('/about-project', ProjectPageController.createAboutProjectData);
router.put('/about-project/:id', ProjectPageController.updateAboutProjectData);
router.delete('/about-project/:id', ProjectPageController.deleteAboutProjectData);

// STATS SECTION ROUTES  
router.get('/stats-section', ProjectPageController.getStatsSectionData);
router.post('/stats-section', ProjectPageController.createStatsSectionData);
router.put('/stats-section/:id', ProjectPageController.updateStatsSectionData);
router.delete('/stats-section/:id', ProjectPageController.deleteStatsSectionData);

// PROJECT CATEGORIES SECTION ROUTES
router.get('/project-categories', ProjectPageController.getProjectCategoriesData);
router.post('/project-categories', ProjectPageController.createProjectCategoriesData);
router.put('/project-categories/:id', ProjectPageController.updateProjectCategoriesData);
router.delete('/project-categories/:id', ProjectPageController.deleteProjectCategoriesData);

export default router; 