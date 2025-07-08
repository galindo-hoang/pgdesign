"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectPageController_1 = __importDefault(require("../controllers/ProjectPageController"));
const router = (0, express_1.Router)();
router.get('/', ProjectPageController_1.default.getProjectPageData);
router.get('/about-project', ProjectPageController_1.default.getAboutProjectData);
router.post('/about-project', ProjectPageController_1.default.createAboutProjectData);
router.put('/about-project/:id', ProjectPageController_1.default.updateAboutProjectData);
router.delete('/about-project/:id', ProjectPageController_1.default.deleteAboutProjectData);
router.get('/stats-section', ProjectPageController_1.default.getStatsSectionData);
router.post('/stats-section', ProjectPageController_1.default.createStatsSectionData);
router.put('/stats-section/:id', ProjectPageController_1.default.updateStatsSectionData);
router.delete('/stats-section/:id', ProjectPageController_1.default.deleteStatsSectionData);
router.get('/project-categories', ProjectPageController_1.default.getProjectCategoriesData);
router.post('/project-categories', ProjectPageController_1.default.createProjectCategoriesData);
router.put('/project-categories/:id', ProjectPageController_1.default.updateProjectCategoriesData);
router.delete('/project-categories/:id', ProjectPageController_1.default.deleteProjectCategoriesData);
exports.default = router;
//# sourceMappingURL=projectpage.js.map