import { Request, Response } from "express";
import { asyncHandler, createError } from "../middleware/errorHandler";
import {
  ApiResponse,
  ProfilePageData,
  CapabilitiesData,
  ConstructionProcessData,
  TechnicalAdvantagesData,
} from "../types/profilePageTypes";
import ProfileCapabilitiesModel from "../models/ProfileCapabilitiesModel";
import ProfileConstructionProcessModel from "../models/ProfileConstructionProcessModel";
import ProfileTechnicalAdvantagesModel from "../models/ProfileTechnicalAdvantagesModel";

export class ProfilePageController {
  getProfilePageData = asyncHandler(async (req: Request, res: Response) => {
    const [capabilities, constructionProcess, technicalAdvantages] =
      await Promise.all([
        ProfileCapabilitiesModel.getActive(),
        ProfileConstructionProcessModel.getActive(),
        ProfileTechnicalAdvantagesModel.getActive(),
      ]);

    const data: ProfilePageData = {
      capabilities,
      constructionProcess,
      technicalAdvantages,
    };

    const response: ApiResponse<ProfilePageData> = {
      success: true,
      data,
    };

    res.json(response);
  });

  getCapabilities = asyncHandler(async (req: Request, res: Response) => {
    const data = await ProfileCapabilitiesModel.getActive();
    const response: ApiResponse<CapabilitiesData> = { success: true, data };
    res.json(response);
  });

  updateCapabilities = asyncHandler(async (req: Request, res: Response) => {
    const updated = await ProfileCapabilitiesModel.upsert(
      req.body as CapabilitiesData
    );
    const response: ApiResponse<CapabilitiesData> = {
      success: true,
      data: updated,
      message: "Capabilities updated successfully",
    };
    res.json(response);
  });

  getConstructionProcess = asyncHandler(async (req: Request, res: Response) => {
    const data = await ProfileConstructionProcessModel.getActive();
    const response: ApiResponse<ConstructionProcessData> = {
      success: true,
      data,
    };
    res.json(response);
  });

  updateConstructionProcess = asyncHandler(
    async (req: Request, res: Response) => {
      const updated = await ProfileConstructionProcessModel.replaceAll(
        req.body as ConstructionProcessData
      );
      const response: ApiResponse<ConstructionProcessData> = {
        success: true,
        data: updated,
        message: "Construction process updated successfully",
      };
      res.json(response);
    }
  );

  getTechnicalAdvantages = asyncHandler(async (req: Request, res: Response) => {
    const data = await ProfileTechnicalAdvantagesModel.getActive();
    const response: ApiResponse<TechnicalAdvantagesData> = {
      success: true,
      data,
    };
    res.json(response);
  });

  updateTechnicalAdvantages = asyncHandler(
    async (req: Request, res: Response) => {
      const updated = await ProfileTechnicalAdvantagesModel.replaceAll(
        req.body as TechnicalAdvantagesData
      );
      const response: ApiResponse<TechnicalAdvantagesData> = {
        success: true,
        data: updated,
        message: "Technical advantages updated successfully",
      };
      res.json(response);
    }
  );
}

export default new ProfilePageController();
