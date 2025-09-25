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

// Admin routes for managing consultation requests
// GET /api/v1/consultation/requests - Get all consultation requests
router.get(
  '/requests',
  consultationController.getConsultationRequests
);

// GET /api/v1/consultation/requests/stats - Get consultation request statistics
router.get(
  '/requests/stats',
  consultationController.getConsultationRequestStatistics
);

// GET /api/v1/consultation/requests/recent - Get recent consultation requests
router.get(
  '/requests/recent',
  consultationController.getRecentConsultationRequests
);

// GET /api/v1/consultation/requests/:id - Get single consultation request
router.get(
  '/requests/:id',
  consultationController.getConsultationRequestById
);

// PUT /api/v1/consultation/requests/:id - Update consultation request
router.put(
  '/requests/:id',
  validateContentType,
  consultationController.updateConsultationRequest
);

// PUT /api/v1/consultation/requests/:id/status - Update consultation request status
router.put(
  '/requests/:id/status',
  validateContentType,
  consultationController.updateConsultationRequestStatus
);

// DELETE /api/v1/consultation/requests/:id - Delete consultation request
router.delete(
  '/requests/:id',
  consultationController.deleteConsultationRequest
);

export default router; 