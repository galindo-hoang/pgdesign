"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HomepageController_js_1 = __importDefault(require("../controllers/HomepageController.js"));
const router = (0, express_1.Router)();
router.get('/', HomepageController_js_1.default.getHomepageData);
router.get('/hero', HomepageController_js_1.default.getHeroData);
router.post('/hero', HomepageController_js_1.default.createHeroData);
router.put('/hero/:id', HomepageController_js_1.default.updateHeroData);
router.delete('/hero/:id', HomepageController_js_1.default.deleteHeroData);
router.get('/about', HomepageController_js_1.default.getAboutData);
router.post('/about', HomepageController_js_1.default.createAboutData);
router.put('/about/:id', HomepageController_js_1.default.updateAboutData);
router.delete('/about/:id', HomepageController_js_1.default.deleteAboutData);
router.get('/image-slider', HomepageController_js_1.default.getImageSliderData);
router.post('/image-slider', HomepageController_js_1.default.createImageSlide);
router.put('/image-slider/:id', HomepageController_js_1.default.updateImageSlide);
router.delete('/image-slider/:id', HomepageController_js_1.default.deleteImageSlide);
router.post('/image-slider/reorder', HomepageController_js_1.default.reorderImageSlides);
router.get('/stats', HomepageController_js_1.default.getStatsData);
router.post('/stats', HomepageController_js_1.default.createStatsData);
router.put('/stats/:id', HomepageController_js_1.default.updateStatsData);
router.delete('/stats/:id', HomepageController_js_1.default.deleteStatsData);
exports.default = router;
//# sourceMappingURL=homepage.js.map