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

export default router; 