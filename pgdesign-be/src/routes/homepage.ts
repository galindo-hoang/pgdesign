import { Router } from 'express';
import HomepageController from '../controllers/HomepageController';

const router: Router = Router();

// Get all homepage data
router.get('/', HomepageController.getHomepageData);

// HERO SECTION ROUTES
router.get('/hero', HomepageController.getHeroData);
router.post('/hero', HomepageController.createHeroData);
router.put('/hero/:id', HomepageController.updateHeroData);
router.delete('/hero/:id', HomepageController.deleteHeroData);

// ABOUT SECTION ROUTES
router.get('/about', HomepageController.getAboutData);
router.post('/about', HomepageController.createAboutData);
router.put('/about/:id', HomepageController.updateAboutData);
router.delete('/about/:id', HomepageController.deleteAboutData);

// IMAGE SLIDER ROUTES
router.get('/image-slider', HomepageController.getImageSliderData);
router.post('/image-slider', HomepageController.createImageSlide);
router.put('/image-slider/:id', HomepageController.updateImageSlide);
router.delete('/image-slider/:id', HomepageController.deleteImageSlide);
router.post('/image-slider/reorder', HomepageController.reorderImageSlides);

// STATS SECTION ROUTES
router.get('/stats', HomepageController.getStatsData);
router.post('/stats', HomepageController.createStatsData);
router.put('/stats/:id', HomepageController.updateStatsData);
router.delete('/stats/:id', HomepageController.deleteStatsData);

// SOLUTION SECTION ROUTES
router.get('/solution', HomepageController.getSolutionData);
router.post('/solution', HomepageController.createSolutionData);
router.put('/solution/:id', HomepageController.updateSolutionData);
router.delete('/solution/:id', HomepageController.deleteSolutionData);

// WORKFLOW SECTION ROUTES
router.get('/workflow', HomepageController.getWorkflowData);
router.post('/workflow', HomepageController.createWorkflowData);
// TODO: Add updateWorkflowData method to controller
// router.put('/workflow/:id', HomepageController.updateWorkflowData);

// PROJECT DIARY SECTION ROUTES
router.get('/project-diary', HomepageController.getProjectDiaryData);

// TESTIMONIAL SECTION ROUTES
router.get('/testimonials', HomepageController.getTestimonialData);

// CONSULTATION FORM SECTION ROUTES
router.get('/consultation-form', HomepageController.getConsultationFormData);

export default router; 