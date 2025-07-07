import { Request, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { ApiResponse, HomePageData } from '../types/homePageTypes';

// Import all models
import HeroModel from '../models/HeroModel';
import AboutModel from '../models/AboutModel';
import ImageSliderModel from '../models/ImageSliderModel';
import StatsModel from '../models/StatsModel';

export class HomepageController {
  
  // Get all homepage data
  getHomepageData = asyncHandler(async (req: Request, res: Response) => {
    const [
      hero,
      about,
      imageSlider,
      stats
    ] = await Promise.all([
      HeroModel.getHeroWithImages(),
      AboutModel.getActiveAbout(),
      ImageSliderModel.getAllSlides(),
      StatsModel.getStatsWithItems()
    ]);

    const response: ApiResponse<any> = {
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

  // HERO SECTION ENDPOINTS
  getHeroData = asyncHandler(async (req: Request, res: Response) => {
    const heroData = await HeroModel.getHeroWithImages();
    
    const response: ApiResponse<any> = {
      success: true,
      data: heroData
    };

    res.json(response);
  });

  createHeroData = asyncHandler(async (req: Request, res: Response) => {
    const { images, ...heroData } = req.body;
    
    const createdHero = await HeroModel.createHeroWithImages(heroData, images || []);
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdHero,
      message: 'Hero data created successfully'
    };

    res.status(201).json(response);
  });

  updateHeroData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { images, ...heroData } = req.body;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const updatedHero = await HeroModel.updateHeroWithImages(parseInt(id), heroData, images);
    
    if (!updatedHero) {
      throw createError('Hero data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedHero,
      message: 'Hero data updated successfully'
    };

    res.json(response);
  });

  deleteHeroData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const deleted = await HeroModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('Hero data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'Hero data deleted successfully'
    };

    res.json(response);
  });

  // ABOUT SECTION ENDPOINTS
  getAboutData = asyncHandler(async (req: Request, res: Response) => {
    const aboutData = await AboutModel.getActiveAbout();
    
    const response: ApiResponse<any> = {
      success: true,
      data: aboutData
    };

    res.json(response);
  });

  createAboutData = asyncHandler(async (req: Request, res: Response) => {
    const errors = await AboutModel.validateAboutData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const createdAbout = await AboutModel.createOrUpdateAbout(req.body);
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdAbout,
      message: 'About data created successfully'
    };

    res.status(201).json(response);
  });

  updateAboutData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const errors = await AboutModel.validateAboutData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const updatedAbout = await AboutModel.update(parseInt(id), req.body);
    
    if (!updatedAbout) {
      throw createError('About data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedAbout,
      message: 'About data updated successfully'
    };

    res.json(response);
  });

  deleteAboutData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const deleted = await AboutModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('About data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'About data deleted successfully'
    };

    res.json(response);
  });

  // IMAGE SLIDER ENDPOINTS
  getImageSliderData = asyncHandler(async (req: Request, res: Response) => {
    const slides = await ImageSliderModel.getAllSlides();
    
    const response: ApiResponse<any> = {
      success: true,
      data: slides
    };

    res.json(response);
  });

  createImageSlide = asyncHandler(async (req: Request, res: Response) => {
    const errors = await ImageSliderModel.validateSlideData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const createdSlide = await ImageSliderModel.createSlide(req.body);
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdSlide,
      message: 'Image slide created successfully'
    };

    res.status(201).json(response);
  });

  updateImageSlide = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const errors = await ImageSliderModel.validateSlideData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const updatedSlide = await ImageSliderModel.update(parseInt(id), req.body);
    
    if (!updatedSlide) {
      throw createError('Image slide not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedSlide,
      message: 'Image slide updated successfully'
    };

    res.json(response);
  });

  deleteImageSlide = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const deleted = await ImageSliderModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('Image slide not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'Image slide deleted successfully'
    };

    res.json(response);
  });

  reorderImageSlides = asyncHandler(async (req: Request, res: Response) => {
    const { slideIds } = req.body;
    
    if (!Array.isArray(slideIds)) {
      throw createError('slideIds must be an array', 400);
    }
    
    await ImageSliderModel.reorderSlides(slideIds);
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'Image slides reordered successfully'
    };

    res.json(response);
  });

  // STATS SECTION ENDPOINTS
  getStatsData = asyncHandler(async (req: Request, res: Response) => {
    const statsData = await StatsModel.getStatsWithItems();
    
    const response: ApiResponse<any> = {
      success: true,
      data: statsData
    };

    res.json(response);
  });

  createStatsData = asyncHandler(async (req: Request, res: Response) => {
    const { header, items } = req.body;
    
    const headerErrors = await StatsModel.validateStatsHeaderData(header);
    if (headerErrors.length > 0) {
      throw createError(`Header validation errors: ${headerErrors.join(', ')}`, 400);
    }
    
    if (items && items.length > 0) {
      for (const item of items) {
        const itemErrors = await StatsModel.validateStatsItemData(item);
        if (itemErrors.length > 0) {
          throw createError(`Item validation errors: ${itemErrors.join(', ')}`, 400);
        }
      }
    }
    
    const createdStats = await StatsModel.createStatsWithItems(header, items || []);
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdStats,
      message: 'Stats data created successfully'
    };

    res.status(201).json(response);
  });

  updateStatsData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { header, items } = req.body;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const headerErrors = await StatsModel.validateStatsHeaderData(header);
    if (headerErrors.length > 0) {
      throw createError(`Header validation errors: ${headerErrors.join(', ')}`, 400);
    }
    
    if (items && items.length > 0) {
      for (const item of items) {
        const itemErrors = await StatsModel.validateStatsItemData(item);
        if (itemErrors.length > 0) {
          throw createError(`Item validation errors: ${itemErrors.join(', ')}`, 400);
        }
      }
    }
    
    const updatedStats = await StatsModel.updateStatsWithItems(parseInt(id), header, items);
    
    if (!updatedStats) {
      throw createError('Stats data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedStats,
      message: 'Stats data updated successfully'
    };

    res.json(response);
  });

  deleteStatsData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const deleted = await StatsModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('Stats data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'Stats data deleted successfully'
    };

    res.json(response);
  });
}

export default new HomepageController(); 