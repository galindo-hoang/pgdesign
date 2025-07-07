import { Router } from 'express';
import homepageRoutes from './homepage';

const router: Router = Router();

// API version
const API_VERSION = 'v1';

// Homepage routes
router.use(`/${API_VERSION}/homepage`, homepageRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: API_VERSION
  });
});

export default router; 