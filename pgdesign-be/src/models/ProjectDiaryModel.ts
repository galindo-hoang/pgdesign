import db from '../config/database';
import { BaseModel } from './BaseModel';
import { ProjectDiaryData, ProjectDiaryImage } from '../types/homePageTypes';

export class ProjectDiaryModel extends BaseModel {
  private projectDiaryImagesModel: BaseModel;

  constructor() {
    super('project_diary_data');
    this.projectDiaryImagesModel = new BaseModel('project_diary_images');
  }

  async getProjectDiaryWithImages(): Promise<{ main: ProjectDiaryData, images: ProjectDiaryImage[] } | null> {
    const main = await this.findOneByCondition({ is_active: true });
    if (!main) {
      return null;
    }

    const images = await db('project_diary_images')
      .select('*')
      .where({ project_diary_id: main.id, is_active: true })
      .orderBy('display_order', 'asc');

    return {
      main,
      images
    };
  }

  async createProjectDiaryWithImages(diaryData: Partial<ProjectDiaryData>, images: Partial<ProjectDiaryImage>[]): Promise<{ main: ProjectDiaryData, images: ProjectDiaryImage[] }> {
    const main = await this.create(diaryData);
    
    const createdImages = [];
    for (let i = 0; i < images.length; i++) {
      const image = await this.projectDiaryImagesModel.create({
        ...images[i],
        project_diary_id: main.id,
        display_order: i
      });
      createdImages.push(image);
    }

    return {
      main,
      images: createdImages
    };
  }

  async updateProjectDiaryWithImages(diaryId: number, diaryData: Partial<ProjectDiaryData>, images?: Partial<ProjectDiaryImage>[]): Promise<{ main: ProjectDiaryData, images: ProjectDiaryImage[] } | null> {
    const updatedMain = await this.update(diaryId, diaryData);
    if (!updatedMain) {
      return null;
    }

    if (images) {
      // Deactivate existing images
      await db('project_diary_images')
        .where({ project_diary_id: diaryId })
        .update({ is_active: false, updated_at: new Date() });

      // Create new images
      for (let i = 0; i < images.length; i++) {
        await this.projectDiaryImagesModel.create({
          ...images[i],
          project_diary_id: diaryId,
          display_order: i
        });
      }
    }

    return await this.getProjectDiaryWithImages();
  }

  async validateProjectDiaryData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    }
    
    return errors;
  }

  async validateProjectDiaryImageData(data: any): Promise<string[]> {
    const errors: string[] = [];
    
    if (!data.image_url || typeof data.image_url !== 'string' || data.image_url.trim().length === 0) {
      errors.push('Image URL is required and must be a non-empty string');
    }
    
    if (!data.image_alt || typeof data.image_alt !== 'string' || data.image_alt.trim().length === 0) {
      errors.push('Image alt text is required and must be a non-empty string');
    }
    
    return errors;
  }
}

export default new ProjectDiaryModel(); 