"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntroPageController = void 0;
const errorHandler_1 = require("../middleware/errorHandler");
const AboutIntroModel_1 = __importDefault(require("../models/AboutIntroModel"));
const VisionMissionModel_1 = __importDefault(require("../models/VisionMissionModel"));
const CommitmentsModel_1 = __importDefault(require("../models/CommitmentsModel"));
const TeamModel_1 = __importDefault(require("../models/TeamModel"));
class IntroPageController {
    constructor() {
        this.getIntroPageData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const [aboutIntro, visionMission, commitments, team] = await Promise.all([
                AboutIntroModel_1.default.getActiveAboutIntro(),
                VisionMissionModel_1.default.getActiveVisionMission(),
                CommitmentsModel_1.default.getActiveCommitments(),
                TeamModel_1.default.getActiveTeam()
            ]);
            const response = {
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
        this.getAboutIntroData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const aboutIntroData = await AboutIntroModel_1.default.getActiveAboutIntro();
            const response = {
                success: true,
                data: aboutIntroData
            };
            res.json(response);
        });
        this.createAboutIntroData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const errors = await AboutIntroModel_1.default.validateAboutIntroData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const createdAboutIntro = await AboutIntroModel_1.default.createOrUpdateAboutIntro(req.body);
            const response = {
                success: true,
                data: createdAboutIntro,
                message: 'About intro data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateAboutIntroData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const errors = await AboutIntroModel_1.default.validateAboutIntroData(req.body);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const updatedAboutIntro = await AboutIntroModel_1.default.updateAboutIntro(parseInt(id), req.body);
            if (!updatedAboutIntro) {
                throw (0, errorHandler_1.createError)('About intro data not found', 404);
            }
            const response = {
                success: true,
                data: updatedAboutIntro,
                message: 'About intro data updated successfully'
            };
            res.json(response);
        });
        this.deleteAboutIntroData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await AboutIntroModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('About intro data not found', 404);
            }
            const response = {
                success: true,
                message: 'About intro data deleted successfully'
            };
            res.json(response);
        });
        this.getVisionMissionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const visionMissionData = await VisionMissionModel_1.default.getActiveVisionMission();
            const response = {
                success: true,
                data: visionMissionData
            };
            res.json(response);
        });
        this.createVisionMissionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { visionMission, missionItems, coreValues } = req.body;
            const errors = await VisionMissionModel_1.default.validateVisionMissionData(visionMission);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const createdVisionMission = await VisionMissionModel_1.default.createVisionMissionWithItems(visionMission, missionItems || [], coreValues || []);
            const response = {
                success: true,
                data: createdVisionMission,
                message: 'Vision mission data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateVisionMissionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const { visionMission, missionItems, coreValues } = req.body;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const errors = await VisionMissionModel_1.default.validateVisionMissionData(visionMission);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            const updatedVisionMission = await VisionMissionModel_1.default.updateVisionMissionWithItems(parseInt(id), visionMission, missionItems, coreValues);
            if (!updatedVisionMission) {
                throw (0, errorHandler_1.createError)('Vision mission data not found', 404);
            }
            const response = {
                success: true,
                data: updatedVisionMission,
                message: 'Vision mission data updated successfully'
            };
            res.json(response);
        });
        this.deleteVisionMissionData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await VisionMissionModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('Vision mission data not found', 404);
            }
            const response = {
                success: true,
                message: 'Vision mission data deleted successfully'
            };
            res.json(response);
        });
        this.getCommitmentsData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const commitmentsData = await CommitmentsModel_1.default.getActiveCommitments();
            const response = {
                success: true,
                data: commitmentsData
            };
            res.json(response);
        });
        this.createCommitmentsData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { commitments, commitmentItems } = req.body;
            const errors = await CommitmentsModel_1.default.validateCommitmentsData(commitments);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            if (commitmentItems && commitmentItems.length > 0) {
                for (const item of commitmentItems) {
                    const itemErrors = await CommitmentsModel_1.default.validateCommitmentItemData(item);
                    if (itemErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Item validation errors: ${itemErrors.join(', ')}`, 400);
                    }
                }
            }
            const createdCommitments = await CommitmentsModel_1.default.createCommitmentsWithItems(commitments, commitmentItems || []);
            const response = {
                success: true,
                data: createdCommitments,
                message: 'Commitments data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateCommitmentsData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const { commitments, commitmentItems } = req.body;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const errors = await CommitmentsModel_1.default.validateCommitmentsData(commitments);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            if (commitmentItems && commitmentItems.length > 0) {
                for (const item of commitmentItems) {
                    const itemErrors = await CommitmentsModel_1.default.validateCommitmentItemData(item);
                    if (itemErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Item validation errors: ${itemErrors.join(', ')}`, 400);
                    }
                }
            }
            const updatedCommitments = await CommitmentsModel_1.default.updateCommitmentsWithItems(parseInt(id), commitments, commitmentItems);
            if (!updatedCommitments) {
                throw (0, errorHandler_1.createError)('Commitments data not found', 404);
            }
            const response = {
                success: true,
                data: updatedCommitments,
                message: 'Commitments data updated successfully'
            };
            res.json(response);
        });
        this.deleteCommitmentsData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await CommitmentsModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('Commitments data not found', 404);
            }
            const response = {
                success: true,
                message: 'Commitments data deleted successfully'
            };
            res.json(response);
        });
        this.getTeamData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const teamData = await TeamModel_1.default.getActiveTeam();
            const response = {
                success: true,
                data: teamData
            };
            res.json(response);
        });
        this.createTeamData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { team, boardDirectors, teamMembers } = req.body;
            const errors = await TeamModel_1.default.validateTeamData(team);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            if (boardDirectors && boardDirectors.length > 0) {
                for (const director of boardDirectors) {
                    const directorErrors = await TeamModel_1.default.validateTeamMemberData(director);
                    if (directorErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Board director validation errors: ${directorErrors.join(', ')}`, 400);
                    }
                }
            }
            if (teamMembers && teamMembers.length > 0) {
                for (const member of teamMembers) {
                    const memberErrors = await TeamModel_1.default.validateTeamMemberData(member);
                    if (memberErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Team member validation errors: ${memberErrors.join(', ')}`, 400);
                    }
                }
            }
            const createdTeam = await TeamModel_1.default.createTeamWithMembers(team, boardDirectors || [], teamMembers || []);
            const response = {
                success: true,
                data: createdTeam,
                message: 'Team data created successfully'
            };
            res.status(201).json(response);
        });
        this.updateTeamData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const { team, boardDirectors, teamMembers } = req.body;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const errors = await TeamModel_1.default.validateTeamData(team);
            if (errors.length > 0) {
                throw (0, errorHandler_1.createError)(`Validation errors: ${errors.join(', ')}`, 400);
            }
            if (boardDirectors && boardDirectors.length > 0) {
                for (const director of boardDirectors) {
                    const directorErrors = await TeamModel_1.default.validateTeamMemberData(director);
                    if (directorErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Board director validation errors: ${directorErrors.join(', ')}`, 400);
                    }
                }
            }
            if (teamMembers && teamMembers.length > 0) {
                for (const member of teamMembers) {
                    const memberErrors = await TeamModel_1.default.validateTeamMemberData(member);
                    if (memberErrors.length > 0) {
                        throw (0, errorHandler_1.createError)(`Team member validation errors: ${memberErrors.join(', ')}`, 400);
                    }
                }
            }
            const updatedTeam = await TeamModel_1.default.updateTeamWithMembers(parseInt(id), team, boardDirectors, teamMembers);
            if (!updatedTeam) {
                throw (0, errorHandler_1.createError)('Team data not found', 404);
            }
            const response = {
                success: true,
                data: updatedTeam,
                message: 'Team data updated successfully'
            };
            res.json(response);
        });
        this.deleteTeamData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            if (!id) {
                throw (0, errorHandler_1.createError)('ID parameter is required', 400);
            }
            const deleted = await TeamModel_1.default.delete(parseInt(id));
            if (!deleted) {
                throw (0, errorHandler_1.createError)('Team data not found', 404);
            }
            const response = {
                success: true,
                message: 'Team data deleted successfully'
            };
            res.json(response);
        });
    }
}
exports.IntroPageController = IntroPageController;
exports.default = new IntroPageController();
//# sourceMappingURL=IntroPageController.js.map