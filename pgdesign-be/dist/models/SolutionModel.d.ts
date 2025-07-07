import { BaseModel } from './BaseModel';
import { SolutionData, SolutionHeader, SolutionItem } from '../types/homePageTypes';
export declare class SolutionModel extends BaseModel {
    private solutionItemsModel;
    constructor();
    getSolutionWithItems(): Promise<SolutionData | null>;
    createSolutionWithItems(headerData: Partial<SolutionHeader>, items: Partial<SolutionItem>[]): Promise<SolutionData>;
    updateSolutionWithItems(headerId: number, headerData: Partial<SolutionHeader>, items?: Partial<SolutionItem>[]): Promise<SolutionData | null>;
    validateSolutionHeaderData(data: any): Promise<string[]>;
    validateSolutionItemData(data: any): Promise<string[]>;
}
declare const _default: SolutionModel;
export default _default;
//# sourceMappingURL=SolutionModel.d.ts.map