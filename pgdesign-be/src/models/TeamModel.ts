import db from '../config/database';
import { BaseModel } from './BaseModel';
import { TeamData, TeamMember } from '../types/introPageTypes';

export class TeamModel extends BaseModel {
  private boardDirectorsModel: BaseModel;
  private teamMembersModel: BaseModel;

  constructor() {
    super('team_data');
    this.boardDirectorsModel = new BaseModel('board_directors');
    this.teamMembersModel = new BaseModel('team_members');
  }

  async getActiveTeam(): Promise<TeamData | null> {
    const result = await this.findOneByCondition({ is_active: true });

    if (!result) return null;

    // Get board directors
    const boardDirectors = await db('board_directors')
      .where({ 
        team_id: result.id,
        is_active: true 
      })
      .orderBy('display_order', 'asc')
      .select('id', 'name', 'title', 'image_url', 'display_order');

    // Get team members
    const teamMembers = await db('team_members')
      .where({ 
        team_id: result.id,
        is_active: true 
      })
      .orderBy('display_order', 'asc')
      .select('id', 'name', 'title', 'image_url', 'display_order');

    return {
      id: result.id,
      content: {
        heading: result.heading,
        description: result.description
      },
      boardDirectors: boardDirectors.map((director: any) => ({
        id: director.id,
        name: director.name,
        title: director.title,
        image: director.image_url,
        displayOrder: director.display_order
      })),
      teamMembers: teamMembers.map((member: any) => ({
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

  async createTeamWithMembers(
    data: TeamData,
    boardDirectors: TeamMember[] = [],
    teamMembers: TeamMember[] = []
  ): Promise<TeamData> {
    const trx = await db.transaction();

    try {
      // First deactivate existing active team
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

      // Insert board directors
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

      // Insert team members
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
        id: teamId as number,
        ...data,
        isActive: true
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async updateTeamWithMembers(
    id: number,
    data: Partial<TeamData>,
    boardDirectors?: TeamMember[],
    teamMembers?: TeamMember[]
  ): Promise<TeamData | null> {
    const trx = await db.transaction();

    try {
      const updateData: any = {
        updated_at: new Date()
      };

      if (data.content?.heading !== undefined) updateData.heading = data.content.heading;
      if (data.content?.description !== undefined) updateData.description = data.content.description;
      if (data.isActive !== undefined) updateData.is_active = data.isActive;

      const updated = await trx(this.tableName)
        .where({ id })
        .update(updateData);

      if (!updated) {
        await trx.rollback();
        return null;
      }

      // Update board directors if provided
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

      // Update team members if provided
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
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async validateTeamData(data: any): Promise<string[]> {
    const errors: string[] = [];

    if (!data.content || typeof data.content !== 'object') {
      errors.push('Content is required and must be an object');
    } else {
      if (!data.content.heading || typeof data.content.heading !== 'string') {
        errors.push('Content heading is required and must be a string');
      }
      if (!data.content.description || typeof data.content.description !== 'string') {
        errors.push('Content description is required and must be a string');
      }
    }

    return errors;
  }

  async validateTeamMemberData(data: any): Promise<string[]> {
    const errors: string[] = [];

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

export default new TeamModel(); 