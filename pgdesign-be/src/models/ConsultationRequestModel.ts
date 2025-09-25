import db from '../config/database';
import { BaseModel } from './BaseModel';

export interface ConsultationRequest {
  id?: number;
  full_name: string;
  phone_number: string;
  email: string;
  address: string;
  project_type: string;
  investment_level: string;
  specific_request?: string;
  status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
  admin_notes?: string;
  contacted_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface ConsultationRequestListItem {
  id: number;
  full_name: string;
  phone_number: string;
  email: string;
  project_type: string;
  investment_level: string;
  status: string;
  created_at: Date;
}

export interface ConsultationRequestFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'full_name' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface ConsultationRequestsResponse {
  data: ConsultationRequestListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class ConsultationRequestModel extends BaseModel {
  constructor() {
    super('consultation_requests');
  }

  /**
   * Create a new consultation request
   */
  async createConsultationRequest(data: Omit<ConsultationRequest, 'id' | 'created_at' | 'updated_at'>): Promise<ConsultationRequest> {
    try {
      const [id] = await db(this.tableName).insert({
        full_name: data.full_name,
        phone_number: data.phone_number,
        email: data.email,
        address: data.address,
        project_type: data.project_type,
        investment_level: data.investment_level,
        specific_request: data.specific_request,
        status: data.status || 'pending',
        admin_notes: data.admin_notes,
        contacted_at: data.contacted_at
      });

      const created = await db(this.tableName).where('id', id).first();
      return created;
    } catch (error) {
      console.error('Error creating consultation request:', error);
      throw new Error('Failed to create consultation request');
    }
  }

  /**
   * Get consultation requests with pagination and filters
   */
  async getConsultationRequests(filters: ConsultationRequestFilters = {}): Promise<ConsultationRequestsResponse> {
    try {
      const {
        status,
        search,
        page = 1,
        limit = 20,
        sortBy = 'created_at',
        sortOrder = 'desc'
      } = filters;

      console.log('Getting consultation requests with filters:', filters);

      // Start with simple query first
      let dataQuery = db(this.tableName)
        .select([
          'id',
          'full_name',
          'phone_number', 
          'email',
          'project_type',
          'investment_level',
          'status',
          'created_at'
        ]);

      let countQuery = db(this.tableName);

      // Apply filters to both queries
      if (status && status !== 'all') {
        dataQuery = dataQuery.where('status', status);
        countQuery = countQuery.where('status', status);
      }

      if (search) {
        const searchFilter = function(this: any) {
          this.where('full_name', 'like', `%${search}%`)
            .orWhere('email', 'like', `%${search}%`)
            .orWhere('phone_number', 'like', `%${search}%`)
            .orWhere('project_type', 'like', `%${search}%`);
        };
        dataQuery = dataQuery.where(searchFilter);
        countQuery = countQuery.where(searchFilter);
      }

      // Get total count
      const countResult = await countQuery.count('* as total').first();
      const total = countResult ? parseInt(String(countResult.total)) : 0;

      console.log('Total count:', total);

      // Get data with pagination
      const data = await dataQuery
        .orderBy(sortBy, sortOrder)
        .offset((page - 1) * limit)
        .limit(limit);

      console.log('Query result data length:', data.length);
      console.log('First record:', data[0]);

      const totalPages = Math.ceil(total / limit);

      return {
        data,
        total,
        page,
        limit,
        totalPages
      };
    } catch (error) {
      console.error('Error fetching consultation requests:', error);
      console.error('Stack trace:', error);
      throw new Error(`Failed to fetch consultation requests: ${error}`);
    }
  }

  /**
   * Get a single consultation request by ID
   */
  async getConsultationRequestById(id: number): Promise<ConsultationRequest | null> {
    try {
      const request = await db(this.tableName).where('id', id).first();
      return request || null;
    } catch (error) {
      console.error('Error fetching consultation request:', error);
      throw new Error('Failed to fetch consultation request');
    }
  }

  /**
   * Update consultation request
   */
  async updateConsultationRequest(id: number, data: Partial<ConsultationRequest>): Promise<ConsultationRequest | null> {
    try {
      // Remove fields that shouldn't be updated directly
      const { id: _, created_at, updated_at, ...updateData } = data;

      await db(this.tableName)
        .where('id', id)
        .update({
          ...updateData,
          updated_at: new Date()
        });

      return await this.getConsultationRequestById(id);
    } catch (error) {
      console.error('Error updating consultation request:', error);
      throw new Error('Failed to update consultation request');
    }
  }

  /**
   * Update consultation request status
   */
  async updateStatus(id: number, status: ConsultationRequest['status'], adminNotes?: string): Promise<ConsultationRequest | null> {
    try {
      const updateData: any = {
        status,
        updated_at: new Date()
      };

      // Set contacted_at when status changes to contacted
      if (status === 'contacted') {
        updateData.contacted_at = new Date();
      }

      if (adminNotes !== undefined) {
        updateData.admin_notes = adminNotes;
      }

      await db(this.tableName)
        .where('id', id)
        .update(updateData);

      return await this.getConsultationRequestById(id);
    } catch (error) {
      console.error('Error updating consultation request status:', error);
      throw new Error('Failed to update consultation request status');
    }
  }

  /**
   * Delete consultation request
   */
  async deleteConsultationRequest(id: number): Promise<boolean> {
    try {
      const deleted = await db(this.tableName).where('id', id).del();
      return deleted > 0;
    } catch (error) {
      console.error('Error deleting consultation request:', error);
      throw new Error('Failed to delete consultation request');
    }
  }

  /**
   * Get consultation request statistics
   */
  async getStatistics(): Promise<{
    total: number;
    pending: number;
    contacted: number;
    in_progress: number;
    completed: number;
    cancelled: number;
  }> {
    try {
      const stats = await db(this.tableName)
        .select('status')
        .count('* as count')
        .groupBy('status');

      const result = {
        total: 0,
        pending: 0,
        contacted: 0,
        in_progress: 0,
        completed: 0,
        cancelled: 0
      };

      stats.forEach((stat: any) => {
        result[stat.status as keyof typeof result] = parseInt(stat.count);
        result.total += parseInt(stat.count);
      });

      return result;
    } catch (error) {
      console.error('Error fetching consultation request statistics:', error);
      throw new Error('Failed to fetch consultation request statistics');
    }
  }

  /**
   * Get recent consultation requests
   */
  async getRecentRequests(limit: number = 10): Promise<ConsultationRequestListItem[]> {
    try {
      const requests = await db(this.tableName)
        .select([
          'id',
          'full_name',
          'phone_number',
          'email',
          'project_type',
          'investment_level',
          'status',
          'created_at'
        ])
        .orderBy('created_at', 'desc')
        .limit(limit);

      return requests;
    } catch (error) {
      console.error('Error fetching recent consultation requests:', error);
      throw new Error('Failed to fetch recent consultation requests');
    }
  }
}

export default new ConsultationRequestModel();
