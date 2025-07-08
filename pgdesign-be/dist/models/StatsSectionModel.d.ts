import { BaseModel } from './BaseModel';
import { StatsSectionData, StatsItem } from '../types/projectPageTypes';
export declare class StatsSectionModel extends BaseModel {
    private statsItemsModel;
    constructor();
    getActiveStatsSection(): Promise<StatsSectionData | null>;
    createStatsSectionWithItems(data: StatsSectionData, statsItems?: StatsItem[]): Promise<StatsSectionData>;
    updateStatsSectionWithItems(id: number, data: Partial<StatsSectionData>, statsItems?: StatsItem[]): Promise<StatsSectionData | null>;
    validateStatsSectionData(data: any): Promise<string[]>;
    validateStatsItemData(data: any): Promise<string[]>;
}
declare const _default: StatsSectionModel;
export default _default;
//# sourceMappingURL=StatsSectionModel.d.ts.map