"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageController = void 0;
const errorHandler_js_1 = require("../middleware/errorHandler.js");
const HeroModel_js_1 = __importDefault(require("../models/HeroModel.js"));
const AboutModel_js_1 = __importDefault(require("../models/AboutModel.js"));
const ImageSliderModel_js_1 = __importDefault(require("../models/ImageSliderModel.js"));
const StatsModel_js_1 = __importDefault(require("../models/StatsModel.js"));
class HomepageController {
    constructor() {
        this.getHomepageData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const [hero, about, imageSlider, stats] = await Promise.all([
                HeroModel_js_1.default.getHeroWithImages(),
                AboutModel_js_1.default.getActiveAbout(),
                ImageSliderModel_js_1.default.getAllSlides(),
                StatsModel_js_1.default.getStatsWithItems()
            ]);
            const response = {
                success: true,
                data: {
                    hero,
                    about,
                    imageSlider,
                    stats
                }
            };
            res.json(response);
        });
        this.getHeroData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const heroData = await HeroModel_js_1.default.getHeroWithImages();
            const response = {
                success: true,
                data: heroData
            };
            res.json(response);
        });
        this.createHeroData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const { images, ...heroData } = req.body;
            const createdHero = await HeroModel_js_1.default.createHeroWithImages(heroData, images || []);
            const response = {
                success: true,
                data: createdHero,
                message: 'Hero data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateHeroData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const { images, ...heroData } = req.body;
            if (!id) {
                throw (0, errorHandler_js_1.createError)('ID parameter is required', 400);
            }
            const updatedHero = await HeroModel_js_1.default.updateHeroWithImages(parseInt(id), heroData, images);
            if (!updatedHero) {
                throw (0, errorHandler_js_1.createError)('Hero data not found', 404);
            }
            const response = {
                success: true,
                data: updatedHero,
                message: 'Hero data updated successfully'
            };
            res.json(response);
        });
        this.deleteHeroData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_js_1.createError)('ID parameter is required', 400);
            }
            const deleted = await HeroModel_js_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_js_1.createError)('Hero data not found', 404);
            }
            const response = {
                success: true,
                message: 'Hero data deleted successfully'
            };
            res.json(response);
        });
        this.getAboutData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const aboutData = await AboutModel_js_1.default.getActiveAbout();
            const response = {
                success: true,
                data: aboutData
            };
            res.json(response);
        });
        this.createAboutData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const errors = await AboutModel_js_1.default.validateAboutData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_js_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const createdAbout = await AboutModel_js_1.default.createOrUpdateAbout(req.body);
            const response = {
                success: true,
                data: createdAbout,
                message: 'About data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateAboutData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_js_1.createError)('ID parameter is required', 400);
            }
            const errors = await AboutModel_js_1.default.validateAboutData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_js_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const updatedAbout = await AboutModel_js_1.default.update(parseInt(id), req.body);
            if (!updatedAbout) {
                throw (0, errorHandler_js_1.createError)('About data not found', 404);
            }
            const response = {
                success: true,
                data: updatedAbout,
                message: 'About data updated successfully'
            };
            res.json(response);
        });
        this.deleteAboutData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_js_1.createError)('ID parameter is required', 400);
            }
            const deleted = await AboutModel_js_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_js_1.createError)('About data not found', 404);
            }
            const response = {
                success: true,
                message: 'About data deleted successfully'
            };
            res.json(response);
        });
        this.getImageSliderData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const slides = await ImageSliderModel_js_1.default.getAllSlides();
            const response = {
                success: true,
                data: slides
            };
            res.json(response);
        });
        this.createImageSlide = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const errors = await ImageSliderModel_js_1.default.validateSlideData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_js_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const createdSlide = await ImageSliderModel_js_1.default.createSlide(req.body);
            const response = {
                success: true,
                data: createdSlide,
                message: 'Image slide created successfully'
            };
            res.status(201).json(response);
        });
        this.updateImageSlide = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_js_1.createError)('ID parameter is required', 400);
            }
            const errors = await ImageSliderModel_js_1.default.validateSlideData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_js_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const updatedSlide = await ImageSliderModel_js_1.default.update(parseInt(id), req.body);
            if (!updatedSlide) {
                throw (0, errorHandler_js_1.createError)('Image slide not found', 404);
            }
            const response = {
                success: true,
                data: updatedSlide,
                message: 'Image slide updated successfully'
            };
            res.json(response);
        });
        this.deleteImageSlide = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_js_1.createError)('ID parameter is required', 400);
            }
            const deleted = await ImageSliderModel_js_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_js_1.createError)('Image slide not found', 404);
            }
            const response = {
                success: true,
                message: 'Image slide deleted successfully'
            };
            res.json(response);
        });
        this.reorderImageSlides = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const { slideIds } = req.body;
            if (!Array.isArray(slideIds)) {
                throw (0, errorHandler_js_1.createError)('slideIds must be an array', 400);
            }
            await ImageSliderModel_js_1.default.reorderSlides(slideIds);
            const response = {
                success: true,
                message: 'Image slides reordered successfully'
            };
            res.json(response);
        });
        this.getStatsData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const statsData = await StatsModel_js_1.default.getStatsWithItems();
            const response = {
                success: true,
                data: statsData
            };
            res.json(response);
        });
        this.createStatsData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const { header, items } = req.body;
            const headerErrors = await StatsModel_js_1.default.validateStatsHeaderData(header);
            if (headerErrors.length > 0) {
                throw (0, errorHandler_js_1.createError)(`Header validation errors: ${headerErrors.join(', ')}`, 400);
            }
            if (items && items.length > 0) {
                for (const item of items) {
                    const itemErrors = await StatsModel_js_1.default.validateStatsItemData(item);
                    if (itemErrors.length > 0) {
                        throw (0, errorHandler_js_1.createError)(`Item validation errors: ${itemErrors.join(', ')}`, 400);
                    }
                }
            }
            const createdStats = await StatsModel_js_1.default.createStatsWithItems(header, items || []);
            const response = {
                success: true,
                data: createdStats,
                message: 'Stats data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateStatsData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const { header, items } = req.body;
            if (!id) {
                throw (0, errorHandler_js_1.createError)('ID parameter is required', 400);
            }
            const headerErrors = await StatsModel_js_1.default.validateStatsHeaderData(header);
            if (headerErrors.length > 0) {
                throw (0, errorHandler_js_1.createError)(`Header validation errors: ${headerErrors.join(', ')}`, 400);
            }
            if (items && items.length > 0) {
                for (const item of items) {
                    const itemErrors = await StatsModel_js_1.default.validateStatsItemData(item);
                    if (itemErrors.length > 0) {
                        throw (0, errorHandler_js_1.createError)(`Item validation errors: ${itemErrors.join(', ')}`, 400);
                    }
                }
            }
            const updatedStats = await StatsModel_js_1.default.updateStatsWithItems(parseInt(id), header, items);
            if (!updatedStats) {
                throw (0, errorHandler_js_1.createError)('Stats data not found', 404);
            }
            const response = {
                success: true,
                data: updatedStats,
                message: 'Stats data updated successfully'
            };
            res.json(response);
        });
        this.deleteStatsData = (0, errorHandler_js_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_js_1.createError)('ID parameter is required', 400);
            }
            const deleted = await StatsModel_js_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_js_1.createError)('Stats data not found', 404);
            }
            const response = {
                success: true,
                message: 'Stats data deleted successfully'
            };
            res.json(response);
        });
    }
}
exports.HomepageController = HomepageController;
exports.default = new HomepageController();
//# sourceMappingURL=HomepageController.js.map