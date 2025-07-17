// src/routes/servicepage.ts
import { Router } from 'express';
import { validateContentType } from '../middleware/validateContentType';
import servicePageController from '../controllers/ServicePageController';

const router: Router = Router();

// ==============================================
// MAIN ENDPOINT - Get All Service Page Data
// ==============================================

// GET /api/v1/servicepage - Get complete service page data (for frontend)
router.get(
  '/',
  servicePageController.getServicePageData
);

// ==============================================
// HERO CONTENT ROUTES
// ==============================================

// GET /api/v1/servicepage/hero - Get hero content
router.get(
  '/hero',
  servicePageController.getHeroContent
);

// POST /api/v1/servicepage/hero - Create hero content
router.post(
  '/hero',
  validateContentType,
  servicePageController.createHeroContent
);

// PUT /api/v1/servicepage/hero/:id - Update hero content
router.put(
  '/hero/:id',
  validateContentType,
  servicePageController.updateHeroContent
);

// DELETE /api/v1/servicepage/hero/:id - Delete hero content
router.delete(
  '/hero/:id',
  servicePageController.deleteHeroContent
);

// ==============================================
// SERVICES ROUTES
// ==============================================

// GET /api/v1/servicepage/services - Get all services (with optional pagination)
router.get(
  '/services',
  servicePageController.getServices
);

// GET /api/v1/servicepage/services/:id - Get service by ID
router.get(
  '/services/:id',
  servicePageController.getServiceById
);

// POST /api/v1/servicepage/services - Create new service
router.post(
  '/services',
  validateContentType,
  servicePageController.createService
);

// PUT /api/v1/servicepage/services/:id - Update service
router.put(
  '/services/:id',
  validateContentType,
  servicePageController.updateService
);

// DELETE /api/v1/servicepage/services/:id - Delete service
router.delete(
  '/services/:id',
  servicePageController.deleteService
);

// ==============================================
// PROCESS SECTIONS ROUTES
// ==============================================

// GET /api/v1/servicepage/process-sections - Get all process sections
router.get(
  '/process-sections',
  servicePageController.getProcessSections
);

// GET /api/v1/servicepage/process-sections/:number - Get process section by number (1-4)
router.get(
  '/process-sections/:number',
  servicePageController.getProcessSectionByNumber
);

// POST /api/v1/servicepage/process-sections - Create new process section
router.post(
  '/process-sections',
  validateContentType,
  servicePageController.createProcessSection
);

// PUT /api/v1/servicepage/process-sections/:number - Update process section by number
router.put(
  '/process-sections/:number',
  validateContentType,
  servicePageController.updateProcessSection
);

// DELETE /api/v1/servicepage/process-sections/:number - Delete process section by number
router.delete(
  '/process-sections/:number',
  servicePageController.deleteProcessSection
);

// ==============================================
// CONSTRUCTION SECTIONS ROUTES
// ==============================================

// GET /api/v1/servicepage/construction-sections - Get all construction sections
router.get(
  '/construction-sections',
  servicePageController.getConstructionSections
);

// GET /api/v1/servicepage/construction-sections/:number - Get construction section by number (1-4)
router.get(
  '/construction-sections/:number',
  servicePageController.getConstructionSectionByNumber
);

// POST /api/v1/servicepage/construction-sections - Create new construction section
router.post(
  '/construction-sections',
  validateContentType,
  servicePageController.createConstructionSection
);

// PUT /api/v1/servicepage/construction-sections/:number - Update construction section by number
router.put(
  '/construction-sections/:number',
  validateContentType,
  servicePageController.updateConstructionSection
);

// DELETE /api/v1/servicepage/construction-sections/:number - Delete construction section by number
router.delete(
  '/construction-sections/:number',
  servicePageController.deleteConstructionSection
);

export default router; 