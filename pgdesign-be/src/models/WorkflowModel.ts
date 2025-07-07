import db from '../config/database';
import { BaseModel } from './BaseModel';
import { WorkflowData, WorkflowTab } from '../types/homePageTypes';

export class WorkflowModel extends BaseModel {
  private workflowTabsModel: BaseModel;

  constructor() {
    super('workflow_data');
    this.workflowTabsModel = new BaseModel('workflow_tabs');
  }

  async getWorkflowWithTabs(): Promise<{ main: WorkflowData, tabs: WorkflowTab[] } | null> {
    const main = await this.findOneByCondition({ is_active: true });
    if (!main) {
      return null;
    }

    const tabs = await db('workflow_tabs')
      .select('*')
      .where({ workflow_id: main.id, is_active: true })
      .orderBy('display_order', 'asc');

    return {
      main,
      tabs
    };
  }

  async createWorkflowWithTabs(workflowData: Partial<WorkflowData>, tabs: Partial<WorkflowTab>[]): Promise<{ main: WorkflowData, tabs: WorkflowTab[] }> {
    const main = await this.create(workflowData);
    
    const createdTabs = [];
    for (let i = 0; i < tabs.length; i++) {
      const tab = await this.workflowTabsModel.create({
        ...tabs[i],
        workflow_id: main.id,
        display_order: i
      });
      createdTabs.push(tab);
    }

    return {
      main,
      tabs: createdTabs
    };
  }

  async updateWorkflowWithTabs(workflowId: number, workflowData: Partial<WorkflowData>, tabs?: Partial<WorkflowTab>[]): Promise<{ main: WorkflowData, tabs: WorkflowTab[] } | null> {
    const updatedMain = await this.update(workflowId, workflowData);
    if (!updatedMain) {
      return null;
    }

    if (tabs) {
      // Deactivate existing tabs
      await db('workflow_tabs')
        .where({ workflow_id: workflowId })
        .update({ is_active: false, updated_at: new Date() });

      // Create new tabs
      for (let i = 0; i < tabs.length; i++) {
        await this.workflowTabsModel.create({
          ...tabs[i],
          workflow_id: workflowId,
          display_order: i
        });
      }
    }

    return await this.getWorkflowWithTabs();
  }

  async validateWorkflowData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    }
    
    return errors;
  }

  async validateWorkflowTabData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
    if (!data.tab_id || typeof data.tab_id !== 'string' || data.tab_id.trim().length === 0) {
      errors.push('Tab ID is required and must be a non-empty string');
    }
    
    if (!data.icon_url || typeof data.icon_url !== 'string' || data.icon_url.trim().length === 0) {
      errors.push('Icon URL is required and must be a non-empty string');
    }
    
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    }
    
    if (!data.diagram_url || typeof data.diagram_url !== 'string' || data.diagram_url.trim().length === 0) {
      errors.push('Diagram URL is required and must be a non-empty string');
    }
    
    return errors;
  }
}

export default new WorkflowModel(); 