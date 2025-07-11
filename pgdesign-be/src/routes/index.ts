import { Router } from 'express';
import homepageRoutes from './homepage';
import intropageRoutes from './intropage';
import projectpageRoutes from './projectpage';
import servicepageRoutes from './servicepage';
import consultationRoutes from './consultation';
import projectdetailRoutes from './projectdetail';

const router: Router = Router();

// API version
const API_VERSION = 'v1';

// Homepage routes
router.use(`/${API_VERSION}/homepage`, homepageRoutes);

// Intro page routes
router.use(`/${API_VERSION}/intropage`, intropageRoutes);

// Project page routes
router.use(`/${API_VERSION}/projectpage`, projectpageRoutes);

// Service page routes
router.use(`/${API_VERSION}/servicepage`, servicepageRoutes);

// Consultation routes
router.use(`/${API_VERSION}/consultation`, consultationRoutes);

// Project detail routes
router.use(`/${API_VERSION}/projectdetail`, projectdetailRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: API_VERSION
  });
});

export default router; 