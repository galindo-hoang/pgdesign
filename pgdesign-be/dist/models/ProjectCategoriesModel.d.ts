import { BaseModel } from './BaseModel';
import { ProjectCategoriesData, ProjectCategory } from '../types/projectPageTypes';
export declare class ProjectCategoriesModel extends BaseModel {
    private projectCategoriesItemsModel;
    constructor();
    getActiveProjectCategories(): Promise<ProjectCategoriesData | null>;
    createProjectCategoriesWithItems(data: ProjectCategoriesData, categories?: ProjectCategory[]): Promise<ProjectCategoriesData>;
    updateProjectCategoriesWithItems(id: number, data: Partial<ProjectCategoriesData>, categories?: ProjectCategory[]): Promise<ProjectCategoriesData | null>;
    validateProjectCategoriesData(data: any): Promise<string[]>;
    validateProjectCategoryData(data: any): Promise<string[]>;
    getProjectCategoryById(id: string): Promise<ProjectCategory | null>;
}
declare const _default: ProjectCategoriesModel;
export default _default;
//# sourceMappingURL=ProjectCategoriesModel.d.ts.map