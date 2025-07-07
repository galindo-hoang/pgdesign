import db from '../config/database';
import { BaseModel } from './BaseModel';
import { VisionMissionData, CoreValue } from '../types/introPageTypes';

export class VisionMissionModel extends BaseModel {
  private missionItemsModel: BaseModel;
  private coreValuesModel: BaseModel;

  constructor() {
    super('vision_mission_data');
    this.missionItemsModel = new BaseModel('mission_items');
    this.coreValuesModel = new BaseModel('core_values');
  }

  async getActiveVisionMission(): Promise<VisionMissionData | null> {
    const result = await this.findOneByCondition({ is_active: true });

    if (!result) return null;

    // Get mission items
    const missionItems = await db('mission_items')
      .where({ 
        vision_mission_id: result.id,
        is_active: true 
      })
      .orderBy('display_order', 'asc')
      .select('item_text');

    // Get core values
    const coreValues = await db('core_values')
      .where({ 
        vision_mission_id: result.id,
        is_active: true 
      })
      .orderBy('display_order', 'asc')
      .select('id', 'title', 'description', 'display_order');

    return {
      id: result.id,
      image: result.image_url,
      vision: {
        title: result.vision_title,
        paragraphs: [result.vision_paragraph_1, result.vision_paragraph_2]
      },
      mission: {
        title: result.mission_title,
        items: missionItems.map((item: any) => item.item_text)
      },
      coreValues: {
        title: result.core_values_title,
        values: coreValues.map((value: any) => ({
          id: value.id,
          title: value.title,
          description: value.description,
          displayOrder: value.display_order
        }))
      },
      isActive: result.is_active,
      createdAt: result.created_at,
      updatedAt: result.updated_at
    };
  }

  async createVisionMissionWithItems(
    data: VisionMissionData,
    missionItems: string[] = [],
    coreValues: CoreValue[] = []
  ): Promise<VisionMissionData> {
    const trx = await db.transaction();

    try {
      // First deactivate existing active vision mission
      await trx(this.tableName)
        .where({ is_active: true })
        .update({ is_active: false });

      const insertData = {
        image_url: data.image,
        vision_title: data.vision.title,
        vision_paragraph_1: data.vision.paragraphs[0] || '',
        vision_paragraph_2: data.vision.paragraphs[1] || '',
        mission_title: data.mission.title,
        core_values_title: data.coreValues.title,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      };

      const [visionMissionId] = await trx(this.tableName).insert(insertData);

      // Insert mission items
      if (missionItems.length > 0) {
        const missionItemsData = missionItems.map((itemText, index) => ({
          vision_mission_id: visionMissionId,
          item_text: itemText,
          display_order: index,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }));

        await trx('mission_items').insert(missionItemsData);
      }

      // Insert core values
      if (coreValues.length > 0) {
        const coreValuesData = coreValues.map((value, index) => ({
          vision_mission_id: visionMissionId,
          title: value.title,
          description: value.description,
          display_order: value.displayOrder || index,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }));

        await trx('core_values').insert(coreValuesData);
      }

      await trx.commit();
      
      return {
        id: visionMissionId as number,
        ...data,
        isActive: true
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async updateVisionMissionWithItems(
    id: number,
    data: Partial<VisionMissionData>,
    missionItems?: string[],
    coreValues?: CoreValue[]
  ): Promise<VisionMissionData | null> {
    const trx = await db.transaction();

    try {
      const updateData: any = {
        updated_at: new Date()
      };

      if (data.image !== undefined) updateData.image_url = data.image;
      if (data.vision?.title !== undefined) updateData.vision_title = data.vision.title;
      if (data.vision?.paragraphs) {
        updateData.vision_paragraph_1 = data.vision.paragraphs[0] || '';
        updateData.vision_paragraph_2 = data.vision.paragraphs[1] || '';
      }
      if (data.mission?.title !== undefined) updateData.mission_title = data.mission.title;
      if (data.coreValues?.title !== undefined) updateData.core_values_title = data.coreValues.title;
      if (data.isActive !== undefined) updateData.is_active = data.isActive;

      const updated = await trx(this.tableName)
        .where({ id })
        .update(updateData);

      if (!updated) {
        await trx.rollback();
        return null;
      }

      // Update mission items if provided
      if (missionItems !== undefined) {
        await trx('mission_items')
          .where({ vision_mission_id: id })
          .update({ is_active: false });

        if (missionItems.length > 0) {
          const missionItemsData = missionItems.map((itemText, index) => ({
            vision_mission_id: id,
            item_text: itemText,
            display_order: index,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
          }));

          await trx('mission_items').insert(missionItemsData);
        }
      }

      // Update core values if provided
      if (coreValues !== undefined) {
        await trx('core_values')
          .where({ vision_mission_id: id })
          .update({ is_active: false });

        if (coreValues.length > 0) {
          const coreValuesData = coreValues.map((value, index) => ({
            vision_mission_id: id,
            title: value.title,
            description: value.description,
            display_order: value.displayOrder || index,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
          }));

          await trx('core_values').insert(coreValuesData);
        }
      }

      await trx.commit();
      
      // Return the updated data
      const result = await this.getActiveVisionMission();
      return result;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async validateVisionMissionData(data: any): Promise<string[]> {
    const errors: string[] = [];

    if (!data.image || typeof data.image !== 'string') {
      errors.push('Image is required and must be a string');
    }

    if (!data.vision || typeof data.vision !== 'object') {
      errors.push('Vision is required and must be an object');
    } else {
      if (!data.vision.title || typeof data.vision.title !== 'string') {
        errors.push('Vision title is required and must be a string');
      }
      if (!data.vision.paragraphs || !Array.isArray(data.vision.paragraphs) || data.vision.paragraphs.length < 2) {
        errors.push('Vision paragraphs must be an array with at least 2 items');
      }
    }

    if (!data.mission || typeof data.mission !== 'object') {
      errors.push('Mission is required and must be an object');
    } else {
      if (!data.mission.title || typeof data.mission.title !== 'string') {
        errors.push('Mission title is required and must be a string');
      }
    }

    if (!data.coreValues || typeof data.coreValues !== 'object') {
      errors.push('Core values is required and must be an object');
    } else {
      if (!data.coreValues.title || typeof data.coreValues.title !== 'string') {
        errors.push('Core values title is required and must be a string');
      }
    }

    return errors;
  }
}

export default new VisionMissionModel(); 