import { Request, Response } from "express";
import { asyncHandler, createError } from "../middleware/errorHandler";
import { ApiResponse, HomePageData } from "../types/homePageTypes";

// Import all models
import HeroModel from "../models/HeroModel";
import AboutModel from "../models/AboutModel";
import ImageSliderModel from "../models/ImageSliderModel";
import StatsModel from "../models/StatsModel";
import SolutionModel from "../models/SolutionModel";
import WorkflowModel from "../models/WorkflowModel";
import ProjectDiaryModel from "../models/ProjectDiaryModel";
import TestimonialModel from "../models/TestimonialModel";
import ConsultationFormModel from "../models/ConsultationFormModel";
import { ProjectDetailModel } from "../models/ProjectDetailModel";

export class HomepageController {
  private projectDetailModel = new ProjectDetailModel();

  // Get all homepage data
  getHomepageData = asyncHandler(async (req: Request, res: Response) => {
    const [
      hero,
      about,
      homepageProjects, // Use projects instead of imageSlider
      stats,
      solution,
      workflow,
      projectDiary,
      testimonials,
      consultationForm,
    ] = await Promise.all([
      HeroModel.getHeroWithImages(),
      AboutModel.getActiveAbout(),
      this.projectDetailModel.getHomepageProjects(), // Get projects marked for homepage
      StatsModel.getStatsWithItems(),
      SolutionModel.getSolutionWithItems(),
      WorkflowModel.getWorkflowWithTabs(),
      ProjectDiaryModel.getProjectDiaryWithImages(),
      TestimonialModel.getTestimonialWithItems(),
      ConsultationFormModel.getConsultationFormWithProjectTypes(),
    ]);

    // Transform projects to image slider format for backward compatibility
    const imageSlider = homepageProjects.map((project) => ({
      id: project.id,
      image_url: project.thumbnailImage || "/images/default-project.png",
      image_alt: project.title,
      title: project.title,
      subtitle: project.category,
      size: project.area,
      display_order: 0,
      is_active: true,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
    }));

    // Align stats item keys with frontend expectations by adding camelCase aliases
    const statsAligned =
      stats && stats.items
        ? {
            header: stats.header,
            items: stats.items.map((item: any) => ({
              ...item,
              targetValue: item.target_value ?? item.targetValue ?? 0,
            })),
          }
        : stats;

    const response: ApiResponse<any> = {
      success: true,
      data: {
        hero,
        about,
        imageSlider, // Return in the expected format
        stats: statsAligned,
        solution,
        workflow,
        projectDiary,
        testimonials,
        consultationForm,
      },
    };

    res.json(response);
  });

  // Get homepage projects (new endpoint)
  getHomepageProjects = asyncHandler(async (req: Request, res: Response) => {
    const projects = await this.projectDetailModel.getHomepageProjects();

    const response: ApiResponse<any> = {
      success: true,
      data: projects,
    };

    res.json(response);
  });

  // HERO SECTION ENDPOINTS
  getHeroData = asyncHandler(async (req: Request, res: Response) => {
    const heroData = await HeroModel.getHeroWithImages();

    const response: ApiResponse<any> = {
      success: true,
      data: heroData,
    };

    res.json(response);
  });

  createHeroData = asyncHandler(async (req: Request, res: Response) => {
    const { images, ...heroData } = req.body;

    const createdHero = await HeroModel.createHeroWithImages(
      heroData,
      images || []
    );

    const response: ApiResponse<any> = {
      success: true,
      data: createdHero,
      message: "Hero data created successfully",
    };

    res.status(201).json(response);
  });

  updateHeroData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { images, ...heroData } = req.body;

    if (!id) {
      throw createError("ID parameter is required", 400);
    }

    const updatedHero = await HeroModel.updateHeroWithImages(
      parseInt(id),
      heroData,
      images
    );

    if (!updatedHero) {
      throw createError("Hero data not found", 404);
    }

    const response: ApiResponse<any> = {
      success: true,
      data: updatedHero,
      message: "Hero data updated successfully",
    };

    res.json(response);
  });

  deleteHeroData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw createError("ID parameter is required", 400);
    }

    const deleted = await HeroModel.delete(parseInt(id));

    if (!deleted) {
      throw createError("Hero data not found", 404);
    }

    const response: ApiResponse<any> = {
      success: true,
      message: "Hero data deleted successfully",
    };

    res.json(response);
  });

  // ABOUT SECTION ENDPOINTS
  getAboutData = asyncHandler(async (req: Request, res: Response) => {
    const aboutData = await AboutModel.getActiveAbout();

    const response: ApiResponse<any> = {
      success: true,
      data: aboutData,
    };

    res.json(response);
  });

  createAboutData = asyncHandler(async (req: Request, res: Response) => {
    const errors = await AboutModel.validateAboutData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(", ")}`, 400);
    }

    const createdAbout = await AboutModel.createOrUpdateAbout(req.body);

    const response: ApiResponse<any> = {
      success: true,
      data: createdAbout,
      message: "About data created successfully",
    };

    res.status(201).json(response);
  });

  updateAboutData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw createError("ID parameter is required", 400);
    }

    const errors = await AboutModel.validateAboutData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(", ")}`, 400);
    }

    const updatedAbout = await AboutModel.update(parseInt(id), req.body);

    if (!updatedAbout) {
      throw createError("About data not found", 404);
    }

    const response: ApiResponse<any> = {
      success: true,
      data: updatedAbout,
      message: "About data updated successfully",
    };

    res.json(response);
  });

  deleteAboutData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw createError("ID parameter is required", 400);
    }

    const deleted = await AboutModel.delete(parseInt(id));

    if (!deleted) {
      throw createError("About data not found", 404);
    }

    const response: ApiResponse<any> = {
      success: true,
      message: "About data deleted successfully",
    };

    res.json(response);
  });

  // IMAGE SLIDER ENDPOINTS
  getImageSliderData = asyncHandler(async (req: Request, res: Response) => {
    const projects = await this.projectDetailModel.getHomepageProjects();

    // Transform projects to image slider format
    const imageSlider = projects.map((project) => ({
      id: project.id,
      image_url: project.thumbnailImage || "/images/default-project.png",
      image_alt: project.title,
      title: project.title,
      subtitle: project.category,
      size: project.area,
      display_order: 0,
      is_active: true,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
    }));

    const response: ApiResponse<any> = {
      success: true,
      data: imageSlider,
    };

    res.json(response);
  });

  createImageSlide = asyncHandler(async (req: Request, res: Response) => {
    const errors = await ImageSliderModel.validateSlideData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(", ")}`, 400);
    }

    const createdSlide = await ImageSliderModel.createSlide(req.body);

    const response: ApiResponse<any> = {
      success: true,
      data: createdSlide,
      message: "Image slide created successfully",
    };

    res.status(201).json(response);
  });

  updateImageSlide = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw createError("ID parameter is required", 400);
    }

    const errors = await ImageSliderModel.validateSlideData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(", ")}`, 400);
    }

    const updatedSlide = await ImageSliderModel.update(parseInt(id), req.body);

    if (!updatedSlide) {
      throw createError("Image slide not found", 404);
    }

    const response: ApiResponse<any> = {
      success: true,
      data: updatedSlide,
      message: "Image slide updated successfully",
    };

    res.json(response);
  });

  deleteImageSlide = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw createError("ID parameter is required", 400);
    }

    const deleted = await ImageSliderModel.delete(parseInt(id));

    if (!deleted) {
      throw createError("Image slide not found", 404);
    }

    const response: ApiResponse<any> = {
      success: true,
      message: "Image slide deleted successfully",
    };

    res.json(response);
  });

  reorderImageSlides = asyncHandler(async (req: Request, res: Response) => {
    const { slideIds } = req.body;

    if (!Array.isArray(slideIds)) {
      throw createError("slideIds must be an array", 400);
    }

    await ImageSliderModel.reorderSlides(slideIds);

    const response: ApiResponse<any> = {
      success: true,
      message: "Image slides reordered successfully",
    };

    res.json(response);
  });

  // STATS SECTION ENDPOINTS
  getStatsData = asyncHandler(async (req: Request, res: Response) => {
    const statsData = await StatsModel.getStatsWithItems();

    // Align stats item keys with frontend expectations by adding camelCase aliases
    const aligned =
      statsData && statsData.items
        ? {
            header: statsData.header,
            items: statsData.items.map((item: any) => ({
              ...item,
              targetValue: item.target_value ?? item.targetValue ?? 0,
            })),
          }
        : statsData;

    const response: ApiResponse<any> = {
      success: true,
      data: aligned,
    };

    res.json(response);
  });

  createStatsData = asyncHandler(async (req: Request, res: Response) => {
    const { header, items } = req.body;

    const headerErrors = await StatsModel.validateStatsHeaderData(header);
    if (headerErrors.length > 0) {
      throw createError(
        `Header validation errors: ${headerErrors.join(", ")}`,
        400
      );
    }

    if (items && items.length > 0) {
      for (const item of items) {
        const itemErrors = await StatsModel.validateStatsItemData(item);
        if (itemErrors.length > 0) {
          throw createError(
            `Item validation errors: ${itemErrors.join(", ")}`,
            400
          );
        }
      }
    }

    const createdStats = await StatsModel.createStatsWithItems(
      header,
      items || []
    );

    const response: ApiResponse<any> = {
      success: true,
      data: createdStats,
      message: "Stats data created successfully",
    };

    res.status(201).json(response);
  });

  updateStatsData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { header, items } = req.body;

    if (!id) {
      throw createError("ID parameter is required", 400);
    }

    const headerErrors = await StatsModel.validateStatsHeaderData(header);
    if (headerErrors.length > 0) {
      throw createError(
        `Header validation errors: ${headerErrors.join(", ")}`,
        400
      );
    }

    if (items && items.length > 0) {
      for (const item of items) {
        const itemErrors = await StatsModel.validateStatsItemData(item);
        if (itemErrors.length > 0) {
          throw createError(
            `Item validation errors: ${itemErrors.join(", ")}`,
            400
          );
        }
      }
    }

    const updatedStats = await StatsModel.updateStatsWithItems(
      parseInt(id),
      header,
      items
    );

    if (!updatedStats) {
      throw createError("Stats data not found", 404);
    }

    const response: ApiResponse<any> = {
      success: true,
      data: updatedStats,
      message: "Stats data updated successfully",
    };

    res.json(response);
  });

  deleteStatsData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw createError("ID parameter is required", 400);
    }

    const deleted = await StatsModel.delete(parseInt(id));

    if (!deleted) {
      throw createError("Stats data not found", 404);
    }

    const response: ApiResponse<any> = {
      success: true,
      message: "Stats data deleted successfully",
    };

    res.json(response);
  });

  // SOLUTION SECTION ENDPOINTS
  getSolutionData = asyncHandler(async (req: Request, res: Response) => {
    const solutionData = await SolutionModel.getSolutionWithItems();

    const response: ApiResponse<any> = {
      success: true,
      data: solutionData,
    };

    res.json(response);
  });

  createSolutionData = asyncHandler(async (req: Request, res: Response) => {
    const { header, solutions } = req.body;

    const headerErrors = await SolutionModel.validateSolutionHeaderData(header);
    if (headerErrors.length > 0) {
      throw createError(
        `Header validation errors: ${headerErrors.join(", ")}`,
        400
      );
    }

    if (solutions && solutions.length > 0) {
      for (const solution of solutions) {
        const solutionErrors = await SolutionModel.validateSolutionItemData(
          solution
        );
        if (solutionErrors.length > 0) {
          throw createError(
            `Solution validation errors: ${solutionErrors.join(", ")}`,
            400
          );
        }
      }
    }

    const createdSolution = await SolutionModel.createSolutionWithItems(
      header,
      solutions || []
    );

    const response: ApiResponse<any> = {
      success: true,
      data: createdSolution,
      message: "Solution data created successfully",
    };

    res.status(201).json(response);
  });

  updateSolutionData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { header, solutions } = req.body;

    if (!id) {
      throw createError("ID parameter is required", 400);
    }

    const headerErrors = await SolutionModel.validateSolutionHeaderData(header);
    if (headerErrors.length > 0) {
      throw createError(
        `Header validation errors: ${headerErrors.join(", ")}`,
        400
      );
    }

    if (solutions && solutions.length > 0) {
      for (const solution of solutions) {
        const solutionErrors = await SolutionModel.validateSolutionItemData(
          solution
        );
        if (solutionErrors.length > 0) {
          throw createError(
            `Solution validation errors: ${solutionErrors.join(", ")}`,
            400
          );
        }
      }
    }

    const updatedSolution = await SolutionModel.updateSolutionWithItems(
      parseInt(id),
      header,
      solutions
    );

    if (!updatedSolution) {
      throw createError("Solution data not found", 404);
    }

    const response: ApiResponse<any> = {
      success: true,
      data: updatedSolution,
      message: "Solution data updated successfully",
    };

    res.json(response);
  });

  deleteSolutionData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw createError("ID parameter is required", 400);
    }

    const deleted = await SolutionModel.delete(parseInt(id));

    if (!deleted) {
      throw createError("Solution data not found", 404);
    }

    const response: ApiResponse<any> = {
      success: true,
      message: "Solution data deleted successfully",
    };

    res.json(response);
  });

  // WORKFLOW SECTION ENDPOINTS
  getWorkflowData = asyncHandler(async (req: Request, res: Response) => {
    const workflowData = await WorkflowModel.getWorkflowWithTabs();

    const response: ApiResponse<any> = {
      success: true,
      data: workflowData,
    };

    res.json(response);
  });

  createWorkflowData = asyncHandler(async (req: Request, res: Response) => {
    const { main, tabs } = req.body;

    const mainErrors = await WorkflowModel.validateWorkflowData(main);
    if (mainErrors.length > 0) {
      throw createError(
        `Main workflow validation errors: ${mainErrors.join(", ")}`,
        400
      );
    }

    if (tabs && tabs.length > 0) {
      for (const tab of tabs) {
        const tabErrors = await WorkflowModel.validateWorkflowTabData(tab);
        if (tabErrors.length > 0) {
          throw createError(
            `Tab validation errors: ${tabErrors.join(", ")}`,
            400
          );
        }
      }
    }

    const createdWorkflow = await WorkflowModel.createWorkflowWithTabs(
      main,
      tabs || []
    );

    const response: ApiResponse<any> = {
      success: true,
      data: createdWorkflow,
      message: "Workflow data created successfully",
    };

    res.status(201).json(response);
  });

  // PROJECT DIARY SECTION ENDPOINTS
  getProjectDiaryData = asyncHandler(async (req: Request, res: Response) => {
    const projectDiaryData =
      await ProjectDiaryModel.getProjectDiaryWithImages();

    const response: ApiResponse<any> = {
      success: true,
      data: projectDiaryData,
    };

    res.json(response);
  });

  // TESTIMONIAL SECTION ENDPOINTS
  getTestimonialData = asyncHandler(async (req: Request, res: Response) => {
    const testimonialData = await TestimonialModel.getTestimonialWithItems();

    const response: ApiResponse<any> = {
      success: true,
      data: testimonialData,
    };

    res.json(response);
  });

  // CONSULTATION FORM SECTION ENDPOINTS
  getConsultationFormData = asyncHandler(
    async (req: Request, res: Response) => {
      const consultationFormData =
        await ConsultationFormModel.getConsultationFormWithProjectTypes();

      const response: ApiResponse<any> = {
        success: true,
        data: consultationFormData,
      };

      res.json(response);
    }
  );
}

export default new HomepageController();
