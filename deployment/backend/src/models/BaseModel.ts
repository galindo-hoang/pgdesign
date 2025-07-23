import db from '../config/database';

export class BaseModel {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findAll(): Promise<any[]> {
    return await db(this.tableName).select('*').where('is_active', true);
  }

  async findById(id: number): Promise<any | null> {
    const result = await db(this.tableName).select('*').where({ id, is_active: true }).first();
    return result || null;
  }

  async create(data: any): Promise<any> {
    const [id] = await db(this.tableName).insert({
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    if (!id) {
      throw new Error('Failed to create record');
    }
    
    return await this.findById(id);
  }

  async update(id: number, data: any): Promise<any | null> {
    const existingRecord = await this.findById(id);
    if (!existingRecord) {
      return null;
    }

    await db(this.tableName).where({ id }).update({
      ...data,
      updated_at: new Date()
    });
    
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await db(this.tableName).where({ id }).update({
      is_active: false,
      updated_at: new Date()
    });
    return result > 0;
  }

  async hardDelete(id: number): Promise<boolean> {
    const result = await db(this.tableName).where({ id }).del();
    return result > 0;
  }

  async findByCondition(condition: any): Promise<any[]> {
    return await db(this.tableName).select('*').where(condition).where('is_active', true);
  }

  async findOneByCondition(condition: any): Promise<any | null> {
    const result = await db(this.tableName).select('*').where(condition).where('is_active', true).first();
    return result || null;
  }

  async count(condition: any = {}): Promise<number> {
    const result = await db(this.tableName).count('* as count').where(condition).where('is_active', true).first();
    return result ? parseInt(result.count as string) : 0;
  }

  async paginate(page: number = 1, limit: number = 10, condition: any = {}): Promise<{ data: any[], pagination: any }> {
    const offset = (page - 1) * limit;
    
    const [data, totalCount] = await Promise.all([
      db(this.tableName)
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