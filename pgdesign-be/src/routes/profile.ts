import { Router } from "express";
import { validateContentType } from "../middleware/validateContentType";
import ProfilePageController from "../controllers/ProfilePageController";

const router: Router = Router();

// Aggregated endpoint
router.get("/", ProfilePageController.getProfilePageData);

// Capabilities
router.get("/capabilities", ProfilePageController.getCapabilities);
router.put(
  "/capabilities",
  validateContentType,
  ProfilePageController.updateCapabilities
);

// Construction process
router.get(
  "/construction-process",
  ProfilePageController.getConstructionProcess
);
router.put(
  "/construction-process",
  validateContentType,
  ProfilePageController.updateConstructionProcess
);

// Technical advantages
router.get(
  "/technical-advantages",
  ProfilePageController.getTechnicalAdvantages
);
router.put(
  "/technical-advantages",
  validateContentType,
  ProfilePageController.updateTechnicalAdvantages
);

export default router;
