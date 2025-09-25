export interface ConsultationRequest {
  id: number;
  full_name: string;
  phone_number: string;
  email: string;
  address: string;
  project_type: string;
  investment_level: string;
  specific_request?: string;
  status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
  admin_notes?: string;
  contacted_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface ConsultationRequestListItem {
  id: number;
  full_name: string;
  phone_number: string;
  email: string;
  project_type: string;
  investment_level: string;
  status: string;
  created_at: string;
}

export interface ConsultationRequestsResponse {
  data: ConsultationRequestListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ConsultationRequestFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'full_name' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface ConsultationRequestUpdate {
  status?: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
  adminNotes?: string;
}

export interface ConsultationStats {
  total: number;
  pending: number;
  contacted: number;
  in_progress: number;
  completed: number;
  cancelled: number;
}

export const statusLabels = {
  pending: 'Chờ xử lý',
  contacted: 'Đã liên hệ',
  in_progress: 'Đang xử lý',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy'
};

export const statusColors = {
  pending: '#fbbf24',
  contacted: '#3b82f6',
  in_progress: '#8b5cf6',
  completed: '#10b981',
  cancelled: '#ef4444'
};
