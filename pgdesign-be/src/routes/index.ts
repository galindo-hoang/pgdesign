import { Router } from "express";
import homepageRoutes from "./homepage";
import intropageRoutes from "./intropage";
import projectpageRoutes from "./projectpage";
import servicepageRoutes from "./servicepage";
import consultationRoutes from "./consultation";
import projectdetailRoutes from "./projectdetail";
import blogpageRoutes from "./blogpage";
import projectsubcategoriesRoutes from "./projectsubcategories";
import uploadRoutes from "./upload";
import profileRoutes from "./profile";
import { ProjectPageController } from "../controllers/ProjectPageController";
import { healthCheck, getPoolStatus } from "../config/database";

const router: Router = Router();

// API version
const API_VERSION = "v1";

// Initialize controller
const projectPageController = new ProjectPageController();

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

// Blog page routes
router.use(`/${API_VERSION}/blogpage`, blogpageRoutes);

// Project subcategories routes
router.use(`/${API_VERSION}/projectsubcategories`, projectsubcategoriesRoutes);

// Upload routes
router.use(`/${API_VERSION}/upload`, uploadRoutes);

// Profile page routes
router.use(`/${API_VERSION}/profile`, profileRoutes);

// About project route (standalone)
router.get(`/${API_VERSION}/about-project`, projectPageController.getAboutProjectData);

// Health check
router.get("/health", async (req, res) => {
  try {
    const dbHealth = await healthCheck();
    const poolStatus = getPoolStatus();
    
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      version: API_VERSION,
      database: dbHealth,
      connectionPool: poolStatus
    });
  } catch (error) {
    res.status(503).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      version: API_VERSION,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Database pool status endpoint
router.get("/pool-status", (req, res) => {
  try {
    const poolStatus = getPoolStatus();
    res.json({
      success: true,
      data: poolStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
