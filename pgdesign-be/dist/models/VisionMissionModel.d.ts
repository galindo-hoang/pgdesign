import { BaseModel } from './BaseModel';
import { VisionMissionData, CoreValue } from '../types/introPageTypes';
export declare class VisionMissionModel extends BaseModel {
    private missionItemsModel;
    private coreValuesModel;
    constructor();
    getActiveVisionMission(): Promise<VisionMissionData | null>;
    createVisionMissionWithItems(data: VisionMissionData, missionItems?: string[], coreValues?: CoreValue[]): Promise<VisionMissionData>;
    updateVisionMissionWithItems(id: number, data: Partial<VisionMissionData>, missionItems?: string[], coreValues?: CoreValue[]): Promise<VisionMissionData | null>;
    validateVisionMissionData(data: any): Promise<string[]>;
}
declare const _default: VisionMissionModel;
export default _default;
//# sourceMappingURL=VisionMissionModel.d.ts.map