import { BaseModel } from './BaseModel';
import { TeamData, TeamMember } from '../types/introPageTypes';
export declare class TeamModel extends BaseModel {
    private boardDirectorsModel;
    private teamMembersModel;
    constructor();
    getActiveTeam(): Promise<TeamData | null>;
    createTeamWithMembers(data: TeamData, boardDirectors?: TeamMember[], teamMembers?: TeamMember[]): Promise<TeamData>;
    updateTeamWithMembers(id: number, data: Partial<TeamData>, boardDirectors?: TeamMember[], teamMembers?: TeamMember[]): Promise<TeamData | null>;
    validateTeamData(data: any): Promise<string[]>;
    validateTeamMemberData(data: any): Promise<string[]>;
}
declare const _default: TeamModel;
export default _default;
//# sourceMappingURL=TeamModel.d.ts.map