"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = void 0;
const database_1 = __importDefault(require("../config/database"));
const BaseModel_1 = require("./BaseModel");
class TeamModel extends BaseModel_1.BaseModel {
    constructor() {
        super('team_data');
        this.boardDirectorsModel = new BaseModel_1.BaseModel('board_directors');
        this.teamMembersModel = new BaseModel_1.BaseModel('team_members');
    }
    async getActiveTeam() {
        const [result, boardDirectors, teamMembers] = await Promise.all([
            this.findOneByCondition({ is_active: true }),
            (0, database_1.default)('board_directors')
                .where({ is_active: true })
                .whereExists(function () {
                this.select('*')
                    .from('team_data')
                    .whereRaw('team_data.id = board_directors.team_id')
                    .where('team_data.is_active', true);
            })
                .orderBy('display_order', 'asc')
                .select('id', 'name', 'title', 'image_url', 'display_order'),
            (0, database_1.default)('team_members')
                .where({ is_active: true })
                .whereExists(function () {
                this.select('*')
                    .from('team_data')
                    .whereRaw('team_data.id = team_members.team_id')
                    .where('team_data.is_active', true);
            })
                .orderBy('display_order', 'asc')
                .select('id', 'name', 'title', 'image_url', 'display_order')
        ]);
        if (!result)
            return null;
        return {
            id: result.id,
            content: {
                heading: result.heading,
                description: result.description
            },
            boardDirectors: boardDirectors.map((director) => ({
                id: director.id,
                name: director.name,
                title: director.title,
                image: director.image_url,
                displayOrder: director.display_order
            })),
            teamMembers: teamMembers.map((member) => ({
                id: member.id,
                name: member.name,
                title: member.title,
                image: member.image_url,
                displayOrder: member.display_order
            })),
            isActive: result.is_active,
            createdAt: result.created_at,
            updatedAt: result.updated_at
        };
    }
    async createTeamWithMembers(data, boardDirectors = [], teamMembers = []) {
        const trx = await database_1.default.transaction();
        try {
            await trx(this.tableName)
                .where({ is_active: true })
                .update({ is_active: false });
            const insertData = {
                heading: data.content.heading,
                description: data.content.description,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            };
            const [teamId] = await trx(this.tableName).insert(insertData);
            if (boardDirectors.length > 0) {
                const boardDirectorsData = boardDirectors.map((director, index) => ({
                    team_id: teamId,
                    name: director.name,
                    title: director.title,
                    image_url: director.image,
                    display_order: director.displayOrder || index,
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }));
                await trx('board_directors').insert(boardDirectorsData);
            }
            if (teamMembers.length > 0) {
                const teamMembersData = teamMembers.map((member, index) => ({
                    team_id: teamId,
                    name: member.name,
                    title: member.title,
                    image_url: member.image,
                    display_order: member.displayOrder || index,
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }));
                await trx('team_members').insert(teamMembersData);
            }
            await trx.commit();
            return {
                id: teamId,
                ...data,
                isActive: true
            };
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async updateTeamWithMembers(id, data, boardDirectors, teamMembers) {
        const trx = await database_1.default.transaction();
        try {
            const updateData = {
                updated_at: new Date()
            };
            if (data.content?.heading !== undefined)
                updateData.heading = data.content.heading;
            if (data.content?.description !== undefined)
                updateData.description = data.content.description;
            if (data.isActive !== undefined)
                updateData.is_active = data.isActive;
            const updated = await trx(this.tableName)
                .where({ id })
                .update(updateData);
            if (!updated) {
                await trx.rollback();
                return null;
            }
            if (boardDirectors !== undefined) {
                await trx('board_directors')
                    .where({ team_id: id })
                    .update({ is_active: false });
                if (boardDirectors.length > 0) {
                    const boardDirectorsData = boardDirectors.map((director, index) => ({
                        team_id: id,
                        name: director.name,
                        title: director.title,
                        image_url: director.image,
                        display_order: director.displayOrder || index,
                        is_active: true,
                        created_at: new Date(),
                        updated_at: new Date()
                    }));
                    await trx('board_directors').insert(boardDirectorsData);
                }
            }
            if (teamMembers !== undefined) {
                await trx('team_members')
                    .where({ team_id: id })
                    .update({ is_active: false });
                if (teamMembers.length > 0) {
                    const teamMembersData = teamMembers.map((member, index) => ({
                        team_id: id,
                        name: member.name,
                        title: member.title,
                        image_url: member.image,
                        display_order: member.displayOrder || index,
                        is_active: true,
                        created_at: new Date(),
                        updated_at: new Date()
                    }));
                    await trx('team_members').insert(teamMembersData);
                }
            }
            await trx.commit();
            return await this.getActiveTeam();
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async validateTeamData(data) {
        const errors = [];
        if (!data.content || typeof data.content !== 'object') {
            errors.push('Content is required and must be an object');
        }
        else {
            if (!data.content.heading || typeof data.content.heading !== 'string') {
                errors.push('Content heading is required and must be a string');
            }
            if (!data.content.description || typeof data.content.description !== 'string') {
                errors.push('Content description is required and must be a string');
            }
        }
        return errors;
    }
    async validateTeamMemberData(data) {
        const errors = [];
        if (!data.name || typeof data.name !== 'string') {
            errors.push('Name is required and must be a string');
        }
        if (!data.title || typeof data.title !== 'string') {
            errors.push('Title is required and must be a string');
        }
        if (!data.image || typeof data.image !== 'string') {
            errors.push('Image is required and must be a string');
        }
        return errors;
    }
}
exports.TeamModel = TeamModel;
exports.default = new TeamModel();
//# sourceMappingURL=TeamModel.js.map