// src/routes/consultation.ts
import { Router } from 'express';
import { validateContentType } from '../middleware/validateContentType';
import consultationController from '../controllers/ConsultationController';

const router: Router = Router();

// POST /api/v1/consultation/submit - Submit consultation form
router.post(
  '/submit',
  validateContentType,
  consultationController.submitConsultationForm
);

// GET /api/v1/consultation/status - Get email service status
router.get(
  '/status',
  consultationController.getEmailServiceStatus
);

export default router; 