import { Router } from 'express';
import { HomepageController } from '../controllers/HomepageController';

const router: Router = Router();
const homepageController = new HomepageController();

// MAIN ROUTES
router.get('/', homepageController.getHomepageData);

// SECTION-SPECIFIC ROUTES
router.get('/hero', homepageController.getHeroData);
router.get('/about', homepageController.getAboutData);
router.get('/image-slider', homepageController.getImageSliderData);
router.get('/homepage-projects', homepageController.getHomepageProjects); // New route
router.get('/stats', homepageController.getStatsData);
router.get('/solution', homepageController.getSolutionData);
router.get('/workflow', homepageController.getWorkflowData);
router.get('/project-diary', homepageController.getProjectDiaryData);
router.get('/testimonials', homepageController.getTestimonialData);
router.get('/consultation-form', homepageController.getConsultationFormData);

// EDIT/UPDATE ROUTES
router.put('/hero/:id', homepageController.updateHeroData);
router.put('/about/:id', homepageController.updateAboutData);
router.put('/stats/:id', homepageController.updateStatsData);
router.put('/solution/:id', homepageController.updateSolutionData);
router.put('/workflow/:id', homepageController.updateWorkflowData);
router.put('/project-diary/:id', homepageController.updateProjectDiaryData);
router.put('/testimonials/:id', homepageController.updateTestimonialData);
router.put('/consultation-form/:id', homepageController.updateConsultationFormData);

export default router; 