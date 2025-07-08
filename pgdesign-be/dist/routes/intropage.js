"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IntroPageController_1 = __importDefault(require("../controllers/IntroPageController"));
const router = (0, express_1.Router)();
router.get('/', IntroPageController_1.default.getIntroPageData);
router.get('/about-intro', IntroPageController_1.default.getAboutIntroData);
router.post('/about-intro', IntroPageController_1.default.createAboutIntroData);
router.put('/about-intro/:id', IntroPageController_1.default.updateAboutIntroData);
router.delete('/about-intro/:id', IntroPageController_1.default.deleteAboutIntroData);
router.get('/vision-mission', IntroPageController_1.default.getVisionMissionData);
router.post('/vision-mission', IntroPageController_1.default.createVisionMissionData);
router.put('/vision-mission/:id', IntroPageController_1.default.updateVisionMissionData);
router.delete('/vision-mission/:id', IntroPageController_1.default.deleteVisionMissionData);
router.get('/commitments', IntroPageController_1.default.getCommitmentsData);
router.post('/commitments', IntroPageController_1.default.createCommitmentsData);
router.put('/commitments/:id', IntroPageController_1.default.updateCommitmentsData);
router.delete('/commitments/:id', IntroPageController_1.default.deleteCommitmentsData);
router.get('/team', IntroPageController_1.default.getTeamData);
router.post('/team', IntroPageController_1.default.createTeamData);
router.put('/team/:id', IntroPageController_1.default.updateTeamData);
router.delete('/team/:id', IntroPageController_1.default.deleteTeamData);
exports.default = router;
//# sourceMappingURL=intropage.js.map