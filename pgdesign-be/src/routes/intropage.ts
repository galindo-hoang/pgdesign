import { Router } from 'express';
import IntroPageController from '../controllers/IntroPageController';

const router: Router = Router();

// Get all intro page data
router.get('/', IntroPageController.getIntroPageData);

// ABOUT INTRO SECTION ROUTES
router.get('/about-intro', IntroPageController.getAboutIntroData);
router.post('/about-intro', IntroPageController.createAboutIntroData);
router.put('/about-intro/:id', IntroPageController.updateAboutIntroData);
router.delete('/about-intro/:id', IntroPageController.deleteAboutIntroData);

// VISION MISSION SECTION ROUTES  
router.get('/vision-mission', IntroPageController.getVisionMissionData);
router.post('/vision-mission', IntroPageController.createVisionMissionData);
router.put('/vision-mission/:id', IntroPageController.updateVisionMissionData);
router.delete('/vision-mission/:id', IntroPageController.deleteVisionMissionData);

// COMMITMENTS SECTION ROUTES
router.get('/commitments', IntroPageController.getCommitmentsData);
router.post('/commitments', IntroPageController.createCommitmentsData);
router.put('/commitments/:id', IntroPageController.updateCommitmentsData);
router.delete('/commitments/:id', IntroPageController.deleteCommitmentsData);

// TEAM SECTION ROUTES
router.get('/team', IntroPageController.getTeamData);
router.post('/team', IntroPageController.createTeamData);
router.put('/team/:id', IntroPageController.updateTeamData);
router.delete('/team/:id', IntroPageController.deleteTeamData);

export default router; 