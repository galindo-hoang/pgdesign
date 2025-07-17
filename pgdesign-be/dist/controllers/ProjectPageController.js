"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectPageController = void 0;
const errorHandler_1 = require("../middleware/errorHandler");
const AboutProjectModel_1 = __importDefault(require("../models/AboutProjectModel"));
const StatsSectionModel_1 = __importDefault(require("../models/StatsSectionModel"));
const ProjectCategoriesModel_1 = __importDefault(require("../models/ProjectCategoriesModel"));
class ProjectPageController {
    constructor() {
        this.getProjectPageData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const [aboutProject, statsSection, projectCategories] = await Promise.all([
                AboutProjectModel_1.default.getActiveAboutProject(),
                StatsSectionModel_1.default.getActiveStatsSection(),
                ProjectCategoriesModel_1.default.getActiveProjectCategories()
            ]);
            const response = {
                success: true,
                data: {
                    aboutProject,
                    statsSection,
                    projectCategories
                }
            };
            res.json(response);
        });
        this.getAboutProjectData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const aboutProjectData = await AboutProjectModel_1.default.getActiveAboutProject();
            const response = {
                success: true,
                data: aboutProjectData
            };
            res.json(response);
        });
        this.createAboutProjectData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const errors = await AboutProjectModel_1.default.validateAboutProjectData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const createdAboutProject = await AboutProjectModel_1.default.createOrUpdateAboutProject(req.body);
            const response = {
                success: true,
                data: createdAboutProject,
                message: 'About project data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateAboutProjectData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const errors = await AboutProjectModel_1.default.validateAboutProjectData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const updatedAboutProject = await AboutProjectModel_1.default.update(parseInt(id), req.body);
            if (!updatedAboutProject) {
                throw (0, errorHandler_1.createError)('About project data not found', 404);
            }
            const response = {
                success: true,
                data: updatedAboutProject,
                message: 'About project data updated successfully'
            };
            res.json(response);
        });
        this.deleteAboutProjectData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await AboutProjectModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('About project data not found', 404);
            }
            const response = {
                success: true,
                message: 'About project data deleted successfully'
            };
            res.json(response);
        });
        this.getStatsSectionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const statsSectionData = await StatsSectionModel_1.default.getActiveStatsSection();
            const response = {
                success: true,
                data: statsSectionData
            };
            res.json(response);
        });
        this.createStatsSectionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { statsSection, statsItems } = req.body;
            const headerErrors = await StatsSectionModel_1.default.validateStatsSectionData(statsSection);
            if (headerErrors.length > 0) {
                throw (0, errorHandler_1.createError)(`Stats section validation errors: ${headerErrors.join(', ')}`, 400);
            }
            if (statsItems && statsItems.length > 0) {
                for (const item of statsItems) {
                    const itemErrors = await StatsSectionModel_1.default.validateStatsItemData(item);
                    if (itemErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Stats item validation errors: ${itemErrors.join(', ')}`, 400);
                    }
                }
            }
            const createdStatsSection = await StatsSectionModel_1.default.createStatsSectionWithItems(statsSection, statsItems || []);
            const response = {
                success: true,
                data: createdStatsSection,
                message: 'Stats section data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateStatsSectionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const { statsSection, statsItems } = req.body;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const headerErrors = await StatsSectionModel_1.default.validateStatsSectionData(statsSection);
            if (headerErrors.length > 0) {
                throw (0, errorHandler_1.createError)(`Stats section validation errors: ${headerErrors.join(', ')}`, 400);
            }
            if (statsItems && statsItems.length > 0) {
                for (const item of statsItems) {
                    const itemErrors = await StatsSectionModel_1.default.validateStatsItemData(item);
                    if (itemErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Stats item validation errors: ${itemErrors.join(', ')}`, 400);
                    }
                }
            }
            const updatedStatsSection = await StatsSectionModel_1.default.updateStatsSectionWithItems(parseInt(id), statsSection, statsItems || []);
            if (!updatedStatsSection) {
                throw (0, errorHandler_1.createError)('Stats section data not found', 404);
            }
            const response = {
                success: true,
                data: updatedStatsSection,
                message: 'Stats section data updated successfully'
            };
            res.json(response);
        });
        this.deleteStatsSectionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await StatsSectionModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('Stats section data not found', 404);
            }
            const response = {
                success: true,
                message: 'Stats section data deleted successfully'
            };
            res.json(response);
        });
        this.getProjectCategoriesData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const projectCategoriesData = await ProjectCategoriesModel_1.default.getActiveProjectCategories();
            const response = {
                success: true,
                data: projectCategoriesData
            };
            res.json(response);
        });
        this.createProjectCategoriesData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { projectCategories, categories } = req.body;
            const headerErrors = await ProjectCategoriesModel_1.default.validateProjectCategoriesData(projectCategories);
            if (headerErrors.length > 0) {
                throw (0, errorHandler_1.createError)(`Project categories validation errors: ${headerErrors.join(', ')}`, 400);
            }
            if (categories && categories.length > 0) {
                for (const category of categories) {
                    const categoryErrors = await ProjectCategoriesModel_1.default.validateProjectCategoryData(category);
                    if (categoryErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Project category validation errors: ${categoryErrors.join(', ')}`, 400);
                    }
                }
            }
            const createdProjectCategories = await ProjectCategoriesModel_1.default.createProjectCategoriesWithItems(projectCategories, categories || []);
            const response = {
                success: true,
                data: createdProjectCategories,
                message: 'Project categories data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateProjectCategoriesData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const { projectCategories, categories } = req.body;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const headerErrors = await ProjectCategoriesModel_1.default.validateProjectCategoriesData(projectCategories);
            if (headerErrors.length > 0) {
                throw (0, errorHandler_1.createError)(`Project categories validation errors: ${headerErrors.join(', ')}`, 400);
            }
            if (categories && categories.length > 0) {
                for (const category of categories) {
                    const categoryErrors = await ProjectCategoriesModel_1.default.validateProjectCategoryData(category);
                    if (categoryErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Project category validation errors: ${categoryErrors.join(', ')}`, 400);
                    }
                }
            }
            const updatedProjectCategories = await ProjectCategoriesModel_1.default.updateProjectCategoriesWithItems(parseInt(id), projectCategories, categories || []);
            if (!updatedProjectCategories) {
                throw (0, errorHandler_1.createError)('Project categories data not found', 404);
            }
            const response = {
                success: true,
                data: updatedProjectCategories,
                message: 'Project categories data updated successfully'
            };
            res.json(response);
        });
        this.deleteProjectCategoriesData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await ProjectCategoriesModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('Project categories data not found', 404);
            }
            const response = {
                success: true,
                message: 'Project categories data deleted successfully'
            };
            res.json(response);
        });
        this.getProjectCategoryById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const category = await ProjectCategoriesModel_1.default.getProjectCategoryById(id);
            if (!category) {
                throw (0, errorHandler_1.createError)('Project category not found', 404);
            }
            const response = {
                success: true,
                data: category,
                message: 'Project category retrieved successfully'
            };
            res.json(response);
        });
    }
}
exports.ProjectPageController = ProjectPageController;
const projectPageController = new ProjectPageController();
exports.default = projectPageController;
//# sourceMappingURL=ProjectPageController.js.map