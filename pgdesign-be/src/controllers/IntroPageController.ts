import { Request, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { ApiResponse } from '../types/introPageTypes';

// Import all models
import AboutIntroModel from '../models/AboutIntroModel';
import VisionMissionModel from '../models/VisionMissionModel';
import CommitmentsModel from '../models/CommitmentsModel';
import TeamModel from '../models/TeamModel';

export class IntroPageController {
  
  // Get all intro page data
  getIntroPageData = asyncHandler(async (req: Request, res: Response) => {
    const [
      aboutIntro,
      visionMission,
      commitments,
      team
    ] = await Promise.all([
      AboutIntroModel.getActiveAboutIntro(),
      VisionMissionModel.getActiveVisionMission(),
      CommitmentsModel.getActiveCommitments(),
      TeamModel.getActiveTeam()
    ]);

    const response: ApiResponse<any> = {
      success: true,
      data: {
        aboutIntro,
        visionMission,
        commitments,
        team
      }
    };

    res.json(response);
  });

  // ABOUT INTRO SECTION ENDPOINTS
  getAboutIntroData = asyncHandler(async (req: Request, res: Response) => {
    const aboutIntroData = await AboutIntroModel.getActiveAboutIntro();
    
    const response: ApiResponse<any> = {
      success: true,
      data: aboutIntroData
    };

    res.json(response);
  });

  createAboutIntroData = asyncHandler(async (req: Request, res: Response) => {
    const errors = await AboutIntroModel.validateAboutIntroData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const createdAboutIntro = await AboutIntroModel.createOrUpdateAboutIntro(req.body);
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdAboutIntro,
      message: 'About intro data created successfully'
    };

    res.status(201).json(response);
  });

  updateAboutIntroData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const errors = await AboutIntroModel.validateAboutIntroData(req.body);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const updatedAboutIntro = await AboutIntroModel.updateAboutIntro(parseInt(id), req.body);
    
    if (!updatedAboutIntro) {
      throw createError('About intro data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedAboutIntro,
      message: 'About intro data updated successfully'
    };

    res.json(response);
  });

  deleteAboutIntroData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const deleted = await AboutIntroModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('About intro data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'About intro data deleted successfully'
    };

    res.json(response);
  });

  // VISION MISSION SECTION ENDPOINTS
  getVisionMissionData = asyncHandler(async (req: Request, res: Response) => {
    const visionMissionData = await VisionMissionModel.getActiveVisionMission();
    
    const response: ApiResponse<any> = {
      success: true,
      data: visionMissionData
    };

    res.json(response);
  });

  createVisionMissionData = asyncHandler(async (req: Request, res: Response) => {
    const { visionMission, missionItems, coreValues } = req.body;
    
    const errors = await VisionMissionModel.validateVisionMissionData(visionMission);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const createdVisionMission = await VisionMissionModel.createVisionMissionWithItems(
      visionMission,
      missionItems || [],
      coreValues || []
    );
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdVisionMission,
      message: 'Vision mission data created successfully'
    };

    res.status(201).json(response);
  });

  updateVisionMissionData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { visionMission, missionItems, coreValues } = req.body;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const errors = await VisionMissionModel.validateVisionMissionData(visionMission);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    const updatedVisionMission = await VisionMissionModel.updateVisionMissionWithItems(
      parseInt(id),
      visionMission,
      missionItems,
      coreValues
    );
    
    if (!updatedVisionMission) {
      throw createError('Vision mission data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedVisionMission,
      message: 'Vision mission data updated successfully'
    };

    res.json(response);
  });

  deleteVisionMissionData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const deleted = await VisionMissionModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('Vision mission data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'Vision mission data deleted successfully'
    };

    res.json(response);
  });

  // COMMITMENTS SECTION ENDPOINTS
  getCommitmentsData = asyncHandler(async (req: Request, res: Response) => {
    const commitmentsData = await CommitmentsModel.getActiveCommitments();
    
    const response: ApiResponse<any> = {
      success: true,
      data: commitmentsData
    };

    res.json(response);
  });

  createCommitmentsData = asyncHandler(async (req: Request, res: Response) => {
    const { commitments, commitmentItems } = req.body;
    
    const errors = await CommitmentsModel.validateCommitmentsData(commitments);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    if (commitmentItems && commitmentItems.length > 0) {
      for (const item of commitmentItems) {
        const itemErrors = await CommitmentsModel.validateCommitmentItemData(item);
        if (itemErrors.length > 0) {
          throw createError(`Item validation errors: ${itemErrors.join(', ')}`, 400);
        }
      }
    }
    
    const createdCommitments = await CommitmentsModel.createCommitmentsWithItems(
      commitments,
      commitmentItems || []
    );
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdCommitments,
      message: 'Commitments data created successfully'
    };

    res.status(201).json(response);
  });

  updateCommitmentsData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { commitments, commitmentItems } = req.body;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const errors = await CommitmentsModel.validateCommitmentsData(commitments);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    if (commitmentItems && commitmentItems.length > 0) {
      for (const item of commitmentItems) {
        const itemErrors = await CommitmentsModel.validateCommitmentItemData(item);
        if (itemErrors.length > 0) {
          throw createError(`Item validation errors: ${itemErrors.join(', ')}`, 400);
        }
      }
    }
    
    const updatedCommitments = await CommitmentsModel.updateCommitmentsWithItems(
      parseInt(id),
      commitments,
      commitmentItems
    );
    
    if (!updatedCommitments) {
      throw createError('Commitments data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedCommitments,
      message: 'Commitments data updated successfully'
    };

    res.json(response);
  });

  deleteCommitmentsData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const deleted = await CommitmentsModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('Commitments data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'Commitments data deleted successfully'
    };

    res.json(response);
  });

  // TEAM SECTION ENDPOINTS
  getTeamData = asyncHandler(async (req: Request, res: Response) => {
    const teamData = await TeamModel.getActiveTeam();
    
    const response: ApiResponse<any> = {
      success: true,
      data: teamData
    };

    res.json(response);
  });

  createTeamData = asyncHandler(async (req: Request, res: Response) => {
    const { team, boardDirectors, teamMembers } = req.body;
    
    const errors = await TeamModel.validateTeamData(team);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    if (boardDirectors && boardDirectors.length > 0) {
      for (const director of boardDirectors) {
        const directorErrors = await TeamModel.validateTeamMemberData(director);
        if (directorErrors.length > 0) {
          throw createError(`Board director validation errors: ${directorErrors.join(', ')}`, 400);
        }
      }
    }
    
    if (teamMembers && teamMembers.length > 0) {
      for (const member of teamMembers) {
        const memberErrors = await TeamModel.validateTeamMemberData(member);
        if (memberErrors.length > 0) {
          throw createError(`Team member validation errors: ${memberErrors.join(', ')}`, 400);
        }
      }
    }
    
    const createdTeam = await TeamModel.createTeamWithMembers(
      team,
      boardDirectors || [],
      teamMembers || []
    );
    
    const response: ApiResponse<any> = {
      success: true,
      data: createdTeam,
      message: 'Team data created successfully'
    };

    res.status(201).json(response);
  });

  updateTeamData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { team, boardDirectors, teamMembers } = req.body;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const errors = await TeamModel.validateTeamData(team);
    if (errors.length > 0) {
      throw createError(`Validation errors: ${errors.join(', ')}`, 400);
    }
    
    if (boardDirectors && boardDirectors.length > 0) {
      for (const director of boardDirectors) {
        const directorErrors = await TeamModel.validateTeamMemberData(director);
        if (directorErrors.length > 0) {
          throw createError(`Board director validation errors: ${directorErrors.join(', ')}`, 400);
        }
      }
    }
    
    if (teamMembers && teamMembers.length > 0) {
      for (const member of teamMembers) {
        const memberErrors = await TeamModel.validateTeamMemberData(member);
        if (memberErrors.length > 0) {
          throw createError(`Team member validation errors: ${memberErrors.join(', ')}`, 400);
        }
      }
    }
    
    const updatedTeam = await TeamModel.updateTeamWithMembers(
      parseInt(id),
      team,
      boardDirectors,
      teamMembers
    );
    
    if (!updatedTeam) {
      throw createError('Team data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      data: updatedTeam,
      message: 'Team data updated successfully'
    };

    res.json(response);
  });

  deleteTeamData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      throw createError('ID parameter is required', 400);
    }
    
    const deleted = await TeamModel.delete(parseInt(id));
    
    if (!deleted) {
      throw createError('Team data not found', 404);
    }
    
    const response: ApiResponse<any> = {
      success: true,
      message: 'Team data deleted successfully'
    };

    res.json(response);
  });
}

export default new IntroPageController();