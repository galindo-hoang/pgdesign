"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitmentsModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const BaseModel_1 = require("./BaseModel");
class CommitmentsModel extends BaseModel_1.BaseModel {
    constructor() {
        super('commitments_data');
        this.commitmentItemsModel = new BaseModel_1.BaseModel('commitment_items');
    }
    async getActiveCommitments() {
        const [result, commitmentItems] = await Promise.all([
            this.findOneByCondition({ is_active: true }),
            (0, database_1.default)('commitment_items')
                .where({ is_active: true })
                .whereExists(function () {
                this.select('*')
                    .from('commitments_data')
                    .whereRaw('commitments_data.id = commitment_items.commitments_id')
                    .where('commitments_data.is_active', true);
            })
                .orderBy('display_order', 'asc')
                .select('id', 'icon_name', 'title', 'description', 'display_order')
        ]);
        if (!result)
            return null;
        return {
            id: result.id,
            title: result.title,
            commitments: commitmentItems.map((item) => ({
                id: item.id,
                iconName: item.icon_name,
                title: item.title,
                description: item.description,
                displayOrder: item.display_order
            })),
            isActive: result.is_active,
            createdAt: result.created_at,
            updatedAt: result.updated_at
        };
    }
    async createCommitmentsWithItems(data, commitmentItems = []) {
        const trx = await database_1.default.transaction();
        try {
            await trx(this.tableName)
                .where({ is_active: true })
                .update({ is_active: false });
            const insertData = {
                title: data.title,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            };
            const [commitmentsId] = await trx(this.tableName).insert(insertData);
            if (commitmentItems.length > 0) {
                const commitmentItemsData = commitmentItems.map((item, index) => ({
                    commitments_id: commitmentsId,
                    icon_name: item.iconName,
                    title: item.title,
                    description: item.description,
                    display_order: item.displayOrder || index,
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }));
                await trx('commitment_items').insert(commitmentItemsData);
            }
            await trx.commit();
            return {
                id: commitmentsId,
                ...data,
                isActive: true
            };
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async updateCommitmentsWithItems(id, data, commitmentItems) {
        const trx = await database_1.default.transaction();
        try {
            const updateData = {
                updated_at: new Date()
            };
            if (data.title !== undefined)
                updateData.title = data.title;
            if (data.isActive !== undefined)
                updateData.is_active = data.isActive;
            const updated = await trx(this.tableName)
                .where({ id })
                .update(updateData);
            if (!updated) {
                await trx.rollback();
                return null;
            }
            if (commitmentItems !== undefined) {
                await trx('commitment_items')
                    .where({ commitments_id: id })
                    .update({ is_active: false });
                if (commitmentItems.length > 0) {
                    const commitmentItemsData = commitmentItems.map((item, index) => ({
                        commitments_id: id,
                        icon_name: item.iconName,
                        title: item.title,
                        description: item.description,
                        display_order: item.displayOrder || index,
                        is_active: true,
                        created_at: new Date(),
                        updated_at: new Date()
                    }));
                    await trx('commitment_items').insert(commitmentItemsData);
                }
            }
            await trx.commit();
            return await this.getActiveCommitments();
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async validateCommitmentsData(data) {
        const errors = [];
        if (!data.title || typeof data.title !== 'string') {
            errors.push('Title is required and must be a string');
        }
        return errors;
    }
    async validateCommitmentItemData(data) {
        const errors = [];
        if (!data.iconName || typeof data.iconName !== 'string') {
            errors.push('Icon name is required and must be a string');
        }
        if (!data.title || typeof data.title !== 'string') {
            errors.push('Title is required and must be a string');
        }
        if (!data.description || typeof data.description !== 'string') {
            errors.push('Description is required and must be a string');
        }
        return errors;
    }
}
exports.CommitmentsModel = CommitmentsModel;
exports.default = new CommitmentsModel();
//# sourceMappingURL=CommitmentsModel.js.map