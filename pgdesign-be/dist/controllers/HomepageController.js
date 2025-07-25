"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageController = void 0;
const errorHandler_1 = require("../middleware/errorHandler");
const HeroModel_1 = __importDefault(require("../models/HeroModel"));
const AboutModel_1 = __importDefault(require("../models/AboutModel"));
const ImageSliderModel_1 = __importDefault(require("../models/ImageSliderModel"));
const StatsModel_1 = __importDefault(require("../models/StatsModel"));
const SolutionModel_1 = __importDefault(require("../models/SolutionModel"));
const WorkflowModel_1 = __importDefault(require("../models/WorkflowModel"));
const ProjectDiaryModel_1 = __importDefault(require("../models/ProjectDiaryModel"));
const TestimonialModel_1 = __importDefault(require("../models/TestimonialModel"));
const ConsultationFormModel_1 = __importDefault(require("../models/ConsultationFormModel"));
const ProjectDetailModel_1 = require("../models/ProjectDetailModel");
class HomepageController {
    constructor() {
        this.projectDetailModel = new ProjectDetailModel_1.ProjectDetailModel();
        this.getHomepageData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const [hero, about, homepageProjects, stats, solution, workflow, projectDiary, testimonials, consultationForm] = await Promise.all([
                HeroModel_1.default.getHeroWithImages(),
                AboutModel_1.default.getActiveAbout(),
                this.projectDetailModel.getHomepageProjects(),
                StatsModel_1.default.getStatsWithItems(),
                SolutionModel_1.default.getSolutionWithItems(),
                WorkflowModel_1.default.getWorkflowWithTabs(),
                ProjectDiaryModel_1.default.getProjectDiaryWithImages(),
                TestimonialModel_1.default.getTestimonialWithItems(),
                ConsultationFormModel_1.default.getConsultationFormWithProjectTypes()
            ]);
            const imageSlider = homepageProjects.map(project => ({
                id: project.id,
                image_url: project.thumbnailImage || '/images/default-project.png',
                image_alt: project.title,
                title: project.title,
                subtitle: project.category,
                size: project.area,
                display_order: 0,
                is_active: true,
                created_at: project.createdAt,
                updated_at: project.updatedAt
            }));
            const response = {
                success: true,
                data: {
                    hero,
                    about,
                    imageSlider,
                    stats,
                    solution,
                    workflow,
                    projectDiary,
                    testimonials,
                    consultationForm
                }
            };
            res.json(response);
        });
        this.getHomepageProjects = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const projects = await this.projectDetailModel.getHomepageProjects();
            const response = {
                success: true,
                data: projects
            };
            res.json(response);
        });
        this.getHeroData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const heroData = await HeroModel_1.default.getHeroWithImages();
            const response = {
                success: true,
                data: heroData
            };
            res.json(response);
        });
        this.createHeroData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { images, ...heroData } = req.body;
            const createdHero = await HeroModel_1.default.createHeroWithImages(heroData, images || []);
            const response = {
                success: true,
                data: createdHero,
                message: 'Hero data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateHeroData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const { images, ...heroData } = req.body;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const updatedHero = await HeroModel_1.default.updateHeroWithImages(parseInt(id), heroData, images);
            if (!updatedHero) {
                throw (0, errorHandler_1.createError)('Hero data not found', 404);
            }
            const response = {
                success: true,
                data: updatedHero,
                message: 'Hero data updated successfully'
            };
            res.json(response);
        });
        this.deleteHeroData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await HeroModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('Hero data not found', 404);
            }
            const response = {
                success: true,
                message: 'Hero data deleted successfully'
            };
            res.json(response);
        });
        this.getAboutData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const aboutData = await AboutModel_1.default.getActiveAbout();
            const response = {
                success: true,
                data: aboutData
            };
            res.json(response);
        });
        this.createAboutData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const errors = await AboutModel_1.default.validateAboutData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const createdAbout = await AboutModel_1.default.createOrUpdateAbout(req.body);
            const response = {
                success: true,
                data: createdAbout,
                message: 'About data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateAboutData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const errors = await AboutModel_1.default.validateAboutData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const updatedAbout = await AboutModel_1.default.update(parseInt(id), req.body);
            if (!updatedAbout) {
                throw (0, errorHandler_1.createError)('About data not found', 404);
            }
            const response = {
                success: true,
                data: updatedAbout,
                message: 'About data updated successfully'
            };
            res.json(response);
        });
        this.deleteAboutData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await AboutModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('About data not found', 404);
            }
            const response = {
                success: true,
                message: 'About data deleted successfully'
            };
            res.json(response);
        });
        this.getImageSliderData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const projects = await this.projectDetailModel.getHomepageProjects();
            const imageSlider = projects.map(project => ({
                id: project.id,
                image_url: project.thumbnailImage || '/images/default-project.png',
                image_alt: project.title,
                title: project.title,
                subtitle: project.category,
                size: project.area,
                display_order: 0,
                is_active: true,
                created_at: project.createdAt,
                updated_at: project.updatedAt
            }));
            const response = {
                success: true,
                data: imageSlider
            };
            res.json(response);
        });
        this.createImageSlide = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const errors = await ImageSliderModel_1.default.validateSlideData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const createdSlide = await ImageSliderModel_1.default.createSlide(req.body);
            const response = {
                success: true,
                data: createdSlide,
                message: 'Image slide created successfully'
            };
            res.status(201).json(response);
        });
        this.updateImageSlide = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const errors = await ImageSliderModel_1.default.validateSlideData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const updatedSlide = await ImageSliderModel_1.default.update(parseInt(id), req.body);
            if (!updatedSlide) {
                throw (0, errorHandler_1.createError)('Image slide not found', 404);
            }
            const response = {
                success: true,
                data: updatedSlide,
                message: 'Image slide updated successfully'
            };
            res.json(response);
        });
        this.deleteImageSlide = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await ImageSliderModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('Image slide not found', 404);
            }
            const response = {
                success: true,
                message: 'Image slide deleted successfully'
            };
            res.json(response);
        });
        this.reorderImageSlides = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { slideIds } = req.body;
            if (!Array.isArray(slideIds)) {
                throw (0, errorHandler_1.createError)('slideIds must be an array', 400);
            }
            await ImageSliderModel_1.default.reorderSlides(slideIds);
            const response = {
                success: true,
                message: 'Image slides reordered successfully'
            };
            res.json(response);
        });
        this.getStatsData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const statsData = await StatsModel_1.default.getStatsWithItems();
            const response = {
                success: true,
                data: statsData
            };
            res.json(response);
        });
        this.createStatsData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { header, items } = req.body;
            const headerErrors = await StatsModel_1.default.validateStatsHeaderData(header);
            if (headerErrors.length > 0) {
                throw (0, errorHandler_1.createError)(`Header validation errors: ${headerErrors.join(', ')}`, 400);
            }
            if (items && items.length > 0) {
                for (const item of items) {
                    const itemErrors = await StatsModel_1.default.validateStatsItemData(item);
                    if (itemErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Item validation errors: ${itemErrors.join(', ')}`, 400);
                    }
                }
            }
            const createdStats = await StatsModel_1.default.createStatsWithItems(header, items || []);
            const response = {
                success: true,
                data: createdStats,
                message: 'Stats data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateStatsData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const { header, items } = req.body;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const headerErrors = await StatsModel_1.default.validateStatsHeaderData(header);
            if (headerErrors.length > 0) {
                throw (0, errorHandler_1.createError)(`Header validation errors: ${headerErrors.join(', ')}`, 400);
            }
            if (items && items.length > 0) {
                for (const item of items) {
                    const itemErrors = await StatsModel_1.default.validateStatsItemData(item);
                    if (itemErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Item validation errors: ${itemErrors.join(', ')}`, 400);
                    }
                }
            }
            const updatedStats = await StatsModel_1.default.updateStatsWithItems(parseInt(id), header, items);
            if (!updatedStats) {
                throw (0, errorHandler_1.createError)('Stats data not found', 404);
            }
            const response = {
                success: true,
                data: updatedStats,
                message: 'Stats data updated successfully'
            };
            res.json(response);
        });
        this.deleteStatsData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await StatsModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('Stats data not found', 404);
            }
            const response = {
                success: true,
                message: 'Stats data deleted successfully'
            };
            res.json(response);
        });
        this.getSolutionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const solutionData = await SolutionModel_1.default.getSolutionWithItems();
            const response = {
                success: true,
                data: solutionData
            };
            res.json(response);
        });
        this.createSolutionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { header, solutions } = req.body;
            const headerErrors = await SolutionModel_1.default.validateSolutionHeaderData(header);
            if (headerErrors.length > 0) {
                throw (0, errorHandler_1.createError)(`Header validation errors: ${headerErrors.join(', ')}`, 400);
            }
            if (solutions && solutions.length > 0) {
                for (const solution of solutions) {
                    const solutionErrors = await SolutionModel_1.default.validateSolutionItemData(solution);
                    if (solutionErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Solution validation errors: ${solutionErrors.join(', ')}`, 400);
                    }
                }
            }
            const createdSolution = await SolutionModel_1.default.createSolutionWithItems(header, solutions || []);
            const response = {
                success: true,
                data: createdSolution,
                message: 'Solution data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateSolutionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const { header, solutions } = req.body;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const headerErrors = await SolutionModel_1.default.validateSolutionHeaderData(header);
            if (headerErrors.length > 0) {
                throw (0, errorHandler_1.createError)(`Header validation errors: ${headerErrors.join(', ')}`, 400);
            }
            if (solutions && solutions.length > 0) {
                for (const solution of solutions) {
                    const solutionErrors = await SolutionModel_1.default.validateSolutionItemData(solution);
                    if (solutionErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Solution validation errors: ${solutionErrors.join(', ')}`, 400);
                    }
                }
            }
            const updatedSolution = await SolutionModel_1.default.updateSolutionWithItems(parseInt(id), header, solutions);
            if (!updatedSolution) {
                throw (0, errorHandler_1.createError)('Solution data not found', 404);
            }
            const response = {
                success: true,
                data: updatedSolution,
                message: 'Solution data updated successfully'
            };
            res.json(response);
        });
        this.deleteSolutionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await SolutionModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('Solution data not found', 404);
            }
            const response = {
                success: true,
                message: 'Solution data deleted successfully'
            };
            res.json(response);
        });
        this.getWorkflowData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const workflowData = await WorkflowModel_1.default.getWorkflowWithTabs();
            const response = {
                success: true,
                data: workflowData
            };
            res.json(response);
        });
        this.createWorkflowData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { main, tabs } = req.body;
            const mainErrors = await WorkflowModel_1.default.validateWorkflowData(main);
            if (mainErrors.length > 0) {
                throw (0, errorHandler_1.createError)(`Main workflow validation errors: ${mainErrors.join(', ')}`, 400);
            }
            if (tabs && tabs.length > 0) {
                for (const tab of tabs) {
                    const tabErrors = await WorkflowModel_1.default.validateWorkflowTabData(tab);
                    if (tabErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Tab validation errors: ${tabErrors.join(', ')}`, 400);
                    }
                }
            }
            const createdWorkflow = await WorkflowModel_1.default.createWorkflowWithTabs(main, tabs || []);
            const response = {
                success: true,
                data: createdWorkflow,
                message: 'Workflow data created successfully'
            };
            res.status(201).json(response);
        });
        this.getProjectDiaryData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const projectDiaryData = await ProjectDiaryModel_1.default.getProjectDiaryWithImages();
            const response = {
                success: true,
                data: projectDiaryData
            };
            res.json(response);
        });
        this.getTestimonialData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const testimonialData = await TestimonialModel_1.default.getTestimonialWithItems();
            const response = {
                success: true,
                data: testimonialData
            };
            res.json(response);
        });
        this.getConsultationFormData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const consultationFormData = await ConsultationFormModel_1.default.getConsultationFormWithProjectTypes();
            const response = {
                success: true,
                data: consultationFormData
            };
            res.json(response);
        });
    }
}
exports.HomepageController = HomepageController;
exports.default = new HomepageController();
//# sourceMappingURL=HomepageController.js.map