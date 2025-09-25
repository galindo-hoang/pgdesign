import { 
  ConsultationRequest, 
  ConsultationRequestsResponse, 
  ConsultationRequestFilters,
  ConsultationRequestUpdate,
  ConsultationStats,
  ConsultationRequestListItem
} from '../types/consultation';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/v1';

class ConsultationService {
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token');
    
    console.log('Making API call to:', `${API_BASE_URL}${url}`);
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: 'Network error' } }));
      throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async getConsultationRequests(filters: ConsultationRequestFilters = {}): Promise<ConsultationRequestsResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const url = `/consultation/requests${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.fetchWithAuth(url);
    return response.data;
  }

  async getConsultationRequestById(id: number): Promise<ConsultationRequest> {
    const response = await this.fetchWithAuth(`/consultation/requests/${id}`);
    return response.data;
  }

  async updateConsultationRequest(id: number, data: ConsultationRequestUpdate): Promise<ConsultationRequest> {
    const response = await this.fetchWithAuth(`/consultation/requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async updateConsultationRequestStatus(
    id: number, 
    status: ConsultationRequest['status'], 
    adminNotes?: string
  ): Promise<ConsultationRequest> {
    const response = await this.fetchWithAuth(`/consultation/requests/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, adminNotes }),
    });
    return response.data;
  }

  async deleteConsultationRequest(id: number): Promise<void> {
    await this.fetchWithAuth(`/consultation/requests/${id}`, {
      method: 'DELETE',
    });
  }

  async getConsultationRequestStatistics(): Promise<ConsultationStats> {
    const response = await this.fetchWithAuth('/consultation/requests/stats');
    return response.data;
  }

  async getRecentConsultationRequests(limit: number = 10): Promise<ConsultationRequestListItem[]> {
    const response = await this.fetchWithAuth(`/consultation/requests/recent?limit=${limit}`);
    return response.data;
  }
}

export default new ConsultationService();
