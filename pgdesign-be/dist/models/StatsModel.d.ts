import { BaseModel } from './BaseModel.js';
import { StatsData } from '../types/homePageTypes.js';
export declare class StatsModel extends BaseModel {
    private statsItemsModel;
    constructor();
    getStatsWithItems(): Promise<StatsData | null>;
    createStatsWithItems(headerData: any, itemsData: any[]): Promise<StatsData>;
    updateStatsWithItems(headerId: number, headerData: any, itemsData?: any[]): Promise<StatsData | null>;
    validateStatsHeaderData(data: any): Promise<string[]>;
    validateStatsItemData(data: any): Promise<string[]>;
}
declare const _default: StatsModel;
export default _default;
//# sourceMappingURL=StatsModel.d.ts.map