"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const database_js_1 = __importDefault(require("../config/database.js"));
class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }
    async findAll() {
        return await (0, database_js_1.default)(this.tableName).select('*').where('is_active', true);
    }
    async findById(id) {
        const result = await (0, database_js_1.default)(this.tableName).select('*').where({ id, is_active: true }).first();
        return result || null;
    }
    async create(data) {
        const [id] = await (0, database_js_1.default)(this.tableName).insert({
            ...data,
            created_at: new Date(),
            updated_at: new Date()
        });
        if (!id) {
            throw new Error('Failed to create record');
        }
        return await this.findById(id);
    }
    async update(id, data) {
        const existingRecord = await this.findById(id);
        if (!existingRecord) {
            return null;
        }
        await (0, database_js_1.default)(this.tableName).where({ id }).update({
            ...data,
            updated_at: new Date()
        });
        return await this.findById(id);
    }
    async delete(id) {
        const result = await (0, database_js_1.default)(this.tableName).where({ id }).update({
            is_active: false,
            updated_at: new Date()
        });
        return result > 0;
    }
    async hardDelete(id) {
        const result = await (0, database_js_1.default)(this.tableName).where({ id }).del();
        return result > 0;
    }
    async findByCondition(condition) {
        return await (0, database_js_1.default)(this.tableName).select('*').where(condition).where('is_active', true);
    }
    async findOneByCondition(condition) {
        const result = await (0, database_js_1.default)(this.tableName).select('*').where(condition).where('is_active', true).first();
        return result || null;
    }
    async count(condition = {}) {
        const result = await (0, database_js_1.default)(this.tableName).count('* as count').where(condition).where('is_active', true).first();
        return result ? parseInt(result.count) : 0;
    }
    async paginate(page = 1, limit = 10, condition = {}) {
        const offset = (page - 1) * limit;
        const [data, totalCount] = await Promise.all([
            (0, database_js_1.default)(this.tableName)
                .select('*')
                .where(condition)
                .where('is_active', true)
                .limit(limit)
                .offset(offset),
            this.count(condition)
        ]);
        const totalPages = Math.ceil(totalCount / limit);
        return {
            data,
            pagination: {
                current_page: page,
                per_page: limit,
                total: totalCount,
                total_pages: totalPages
            }
        };
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map