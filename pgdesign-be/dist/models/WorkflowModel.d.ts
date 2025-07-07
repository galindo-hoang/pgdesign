import { BaseModel } from './BaseModel';
import { WorkflowData, WorkflowTab } from '../types/homePageTypes';
export declare class WorkflowModel extends BaseModel {
    private workflowTabsModel;
    constructor();
    getWorkflowWithTabs(): Promise<{
        main: WorkflowData;
        tabs: WorkflowTab[];
    } | null>;
    createWorkflowWithTabs(workflowData: Partial<WorkflowData>, tabs: Partial<WorkflowTab>[]): Promise<{
        main: WorkflowData;
        tabs: WorkflowTab[];
    }>;
    updateWorkflowWithTabs(workflowId: number, workflowData: Partial<WorkflowData>, tabs?: Partial<WorkflowTab>[]): Promise<{
        main: WorkflowData;
        tabs: WorkflowTab[];
    } | null>;
    validateWorkflowData(data: any): Promise<string[]>;
    validateWorkflowTabData(data: any): Promise<string[]>;
}
declare const _default: WorkflowModel;
export default _default;
//# sourceMappingURL=WorkflowModel.d.ts.map