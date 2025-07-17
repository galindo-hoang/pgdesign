"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisionMissionModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const BaseModel_1 = require("./BaseModel");
class VisionMissionModel extends BaseModel_1.BaseModel {
    constructor() {
        super('vision_mission_data');
        this.missionItemsModel = new BaseModel_1.BaseModel('mission_items');
        this.coreValuesModel = new BaseModel_1.BaseModel('core_values');
    }
    async getActiveVisionMission() {
        const [result, missionItems, coreValues] = await Promise.all([
            this.findOneByCondition({ is_active: true }),
            (0, database_1.default)('mission_items')
                .where({ is_active: true })
                .whereExists(function () {
                this.select('*')
                    .from('vision_mission_data')
                    .whereRaw('vision_mission_data.id = mission_items.vision_mission_id')
                    .where('vision_mission_data.is_active', true);
            })
                .orderBy('display_order', 'asc')
                .select('item_text'),
            (0, database_1.default)('core_values')
                .where({ is_active: true })
                .whereExists(function () {
                this.select('*')
                    .from('vision_mission_data')
                    .whereRaw('vision_mission_data.id = core_values.vision_mission_id')
                    .where('vision_mission_data.is_active', true);
            })
                .orderBy('display_order', 'asc')
                .select('id', 'title', 'description', 'display_order')
        ]);
        if (!result)
            return null;
        return {
            id: result.id,
            image: result.image_url,
            vision: {
                title: result.vision_title,
                paragraphs: [result.vision_paragraph_1, result.vision_paragraph_2]
            },
            mission: {
                title: result.mission_title,
                items: missionItems.map((item) => item.item_text)
            },
            coreValues: {
                title: result.core_values_title,
                values: coreValues.map((value) => ({
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
    async createVisionMissionWithItems(data, missionItems = [], coreValues = []) {
        const trx = await database_1.default.transaction();
        try {
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
                id: visionMissionId,
                ...data,
                isActive: true
            };
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async updateVisionMissionWithItems(id, data, missionItems, coreValues) {
        const trx = await database_1.default.transaction();
        try {
            const updateData = {
                updated_at: new Date()
            };
            if (data.image !== undefined)
                updateData.image_url = data.image;
            if (data.vision?.title !== undefined)
                updateData.vision_title = data.vision.title;
            if (data.vision?.paragraphs) {
                updateData.vision_paragraph_1 = data.vision.paragraphs[0] || '';
                updateData.vision_paragraph_2 = data.vision.paragraphs[1] || '';
            }
            if (data.mission?.title !== undefined)
                updateData.mission_title = data.mission.title;
            if (data.coreValues?.title !== undefined)
                updateData.core_values_title = data.coreValues.title;
            if (data.isActive !== undefined)
                updateData.is_active = data.isActive;
            const updated = await trx(this.tableName)
                .where({ id })
                .update(updateData);
            if (!updated) {
                await trx.rollback();
                return null;
            }
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
            const result = await this.getActiveVisionMission();
            return result;
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async validateVisionMissionData(data) {
        const errors = [];
        if (!data.image || typeof data.image !== 'string') {
            errors.push('Image is required and must be a string');
        }
        if (!data.vision || typeof data.vision !== 'object') {
            errors.push('Vision is required and must be an object');
        }
        else {
            if (!data.vision.title || typeof data.vision.title !== 'string') {
                errors.push('Vision title is required and must be a string');
            }
            if (!data.vision.paragraphs || !Array.isArray(data.vision.paragraphs) || data.vision.paragraphs.length < 2) {
                errors.push('Vision paragraphs must be an array with at least 2 items');
            }
        }
        if (!data.mission || typeof data.mission !== 'object') {
            errors.push('Mission is required and must be an object');
        }
        else {
            if (!data.mission.title || typeof data.mission.title !== 'string') {
                errors.push('Mission title is required and must be a string');
            }
        }
        if (!data.coreValues || typeof data.coreValues !== 'object') {
            errors.push('Core values is required and must be an object');
        }
        else {
            if (!data.coreValues.title || typeof data.coreValues.title !== 'string') {
                errors.push('Core values title is required and must be a string');
            }
        }
        return errors;
    }
}
exports.VisionMissionModel = VisionMissionModel;
exports.default = new VisionMissionModel();
//# sourceMappingURL=VisionMissionModel.js.map