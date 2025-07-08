import { BaseModel } from './BaseModel';
import { CommitmentsData, CommitmentItem } from '../types/introPageTypes';
export declare class CommitmentsModel extends BaseModel {
    private commitmentItemsModel;
    constructor();
    getActiveCommitments(): Promise<CommitmentsData | null>;
    createCommitmentsWithItems(data: CommitmentsData, commitmentItems?: CommitmentItem[]): Promise<CommitmentsData>;
    updateCommitmentsWithItems(id: number, data: Partial<CommitmentsData>, commitmentItems?: CommitmentItem[]): Promise<CommitmentsData | null>;
    validateCommitmentsData(data: any): Promise<string[]>;
    validateCommitmentItemData(data: any): Promise<string[]>;
}
declare const _default: CommitmentsModel;
export default _default;
//# sourceMappingURL=CommitmentsModel.d.ts.map