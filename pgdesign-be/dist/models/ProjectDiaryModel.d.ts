import { BaseModel } from './BaseModel';
import { ProjectDiaryData, ProjectDiaryImage } from '../types/homePageTypes';
export declare class ProjectDiaryModel extends BaseModel {
    private projectDiaryImagesModel;
    constructor();
    getProjectDiaryWithImages(): Promise<{
        main: ProjectDiaryData;
        images: ProjectDiaryImage[];
    } | null>;
    createProjectDiaryWithImages(diaryData: Partial<ProjectDiaryData>, images: Partial<ProjectDiaryImage>[]): Promise<{
        main: ProjectDiaryData;
        images: ProjectDiaryImage[];
    }>;
    updateProjectDiaryWithImages(diaryId: number, diaryData: Partial<ProjectDiaryData>, images?: Partial<ProjectDiaryImage>[]): Promise<{
        main: ProjectDiaryData;
        images: ProjectDiaryImage[];
    } | null>;
    validateProjectDiaryData(data: any): Promise<string[]>;
    validateProjectDiaryImageData(data: any): Promise<string[]>;
}
declare const _default: ProjectDiaryModel;
export default _default;
//# sourceMappingURL=ProjectDiaryModel.d.ts.map