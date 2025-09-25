import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign,
  Building,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import consultationService from '../services/consultationService';
import {
  ConsultationRequest,
  ConsultationRequestListItem,
  ConsultationRequestsResponse,
  ConsultationRequestFilters,
  ConsultationStats,
  statusLabels,
  statusColors
} from '../types/consultation';
import './ConsultationAdmin.css';

const ConsultationAdmin: React.FC = () => {
  const [requests, setRequests] = useState<ConsultationRequestListItem[]>([]);
  const [stats, setStats] = useState<ConsultationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState<{
    status: ConsultationRequest['status'];
    adminNotes: string;
  }>({ status: 'pending', adminNotes: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination and filters
  const [filters, setFilters] = useState<ConsultationRequestFilters>({
    page: 1,
    limit: 20,
    sortBy: 'created_at',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1
  });

  useEffect(() => {
    console.log('Component mounted or filters changed:', filters);
    loadConsultationRequests();
    loadStatistics();
  }, [JSON.stringify(filters)]); // Use JSON.stringify to avoid object reference issues

  const loadConsultationRequests = async () => {
    try {
      setLoading(true);
      console.log('Loading consultation requests with filters:', filters);
      const response: ConsultationRequestsResponse = await consultationService.getConsultationRequests(filters);
      console.log('API Response:', response);
      setRequests(response.data);
      setPagination({
        total: response.total,
        totalPages: response.totalPages,
        currentPage: response.page
      });
      setError(null);
      console.log('Requests updated:', response.data.length, 'items');
    } catch (err) {
      console.error('Error loading consultation requests:', err);
      setError(err instanceof Error ? err.message : 'Failed to load consultation requests');
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const statsData = await consultationService.getConsultationRequestStatistics();
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load statistics:', err);
    }
  };

  // Debounced search with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== (filters.search || '')) {
        console.log('Search term changed:', searchTerm);
        setFilters(prev => ({
          ...prev,
          search: searchTerm.trim() || undefined,
          page: 1
        }));
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]); // Only depend on searchTerm

  const handleSearchInput = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearch = (searchTerm: string) => {
    console.log('Search term changed:', searchTerm);
    setFilters(prev => ({
      ...prev,
      search: searchTerm.trim() || undefined,
      page: 1
    }));
  };

  const handleStatusFilter = (status: string) => {
    console.log('Status filter changed:', status);
    setFilters(prev => ({
      ...prev,
      status: status === 'all' ? undefined : status,
      page: 1
    }));
  };

  const handleSort = (sortBy: ConsultationRequestFilters['sortBy']) => {
    console.log('Sort changed:', sortBy);
    const newOrder = filters.sortBy === sortBy && filters.sortOrder === 'desc' ? 'asc' : 'desc';
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder: newOrder
    }));
  };

  const clearFilters = () => {
    console.log('Clearing all filters');
    setFilters({
      page: 1,
      limit: 20,
      sortBy: 'created_at',
      sortOrder: 'desc'
    });
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleViewRequest = async (id: number) => {
    try {
      const request = await consultationService.getConsultationRequestById(id);
      setSelectedRequest(request);
      setShowDetailModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load request details');
    }
  };

  const handleUpdateStatus = async (id: number) => {
    try {
      const request = await consultationService.getConsultationRequestById(id);
      setSelectedRequest(request);
      setStatusUpdate({
        status: request.status,
        adminNotes: request.admin_notes || ''
      });
      setShowStatusModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load request details');
    }
  };

  const handleSubmitStatusUpdate = async () => {
    if (!selectedRequest) return;

    try {
      await consultationService.updateConsultationRequestStatus(
        selectedRequest.id,
        statusUpdate.status,
        statusUpdate.adminNotes
      );
      setShowStatusModal(false);
      loadConsultationRequests();
      loadStatistics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const handleDeleteRequest = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa yêu cầu này?')) return;

    try {
      await consultationService.deleteConsultationRequest(id);
      loadConsultationRequests();
      loadStatistics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete request');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const getStatusBadge = (status: string) => {
    const label = statusLabels[status as keyof typeof statusLabels] || status;
    const color = statusColors[status as keyof typeof statusColors] || '#6b7280';
    
    return (
      <span 
        className="status-badge" 
        style={{ backgroundColor: color }}
      >
        {label}
      </span>
    );
  };

  if (loading && requests.length === 0) {
    return (
      <div className="consultation-admin">
        <div className="loading-container">
          <RefreshCw className="loading-spinner" />
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="consultation-admin">
      {/* <div className="consultation-header">
        <div className="header-content">
          <h1>Quản lý yêu cầu tư vấn</h1>
          <p>Theo dõi và xử lý các yêu cầu tư vấn từ khách hàng</p>
        </div>
        <div className="header-actions">
          <button onClick={loadConsultationRequests} className="refresh-btn">
            <RefreshCw size={16} />
            Làm mới
          </button>
          <button className="export-btn">
            <Download size={16} />
            Xuất Excel
          </button>
        </div>
      </div> */}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Statistics */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Tổng yêu cầu</div>
          </div>
          <div className="stat-card pending">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Chờ xử lý</div>
          </div>
          <div className="stat-card contacted">
            <div className="stat-value">{stats.contacted}</div>
            <div className="stat-label">Đã liên hệ</div>
          </div>
          <div className="stat-card in-progress">
            <div className="stat-value">{stats.in_progress}</div>
            <div className="stat-label">Đang xử lý</div>
          </div>
          <div className="stat-card completed">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Hoàn thành</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchTerm}
              onChange={(e) => handleSearchInput(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => {
                  setSearchTerm('');
                  handleSearch('');
                }}
                title="Xóa tìm kiếm"
              >
                ×
              </button>
            )}
          </div>
          
          <button 
            className="clear-filters-btn"
            onClick={clearFilters}
            title="Xóa tất cả bộ lọc"
          >
            <Filter size={16} />
            Xóa bộ lọc
          </button>
        </div>
        
        <div className="filter-buttons">
          <div className="filter-group">
            <span className="filter-label">Trạng thái:</span>
            <button 
              className={!filters.status ? 'active' : ''}
              onClick={() => handleStatusFilter('all')}
            >
              Tất cả ({stats?.total || 0})
            </button>
            {Object.entries(statusLabels).map(([status, label]) => (
              <button
                key={status}
                className={filters.status === status ? 'active' : ''}
                onClick={() => handleStatusFilter(status)}
              >
                {label} ({stats?.[status as keyof ConsultationStats] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="requests-table-container">
        <table className="requests-table">
          <thead>
            <tr>
              <th 
                className={`sortable ${filters.sortBy === 'created_at' ? 'active' : ''}`}
                onClick={() => handleSort('created_at')}
              >
                <div className="th-content">
                  <span>Ngày tạo</span>
                  <span className={`sort-icon ${filters.sortBy === 'created_at' ? filters.sortOrder : ''}`}>
                    {filters.sortBy === 'created_at' ? 
                      (filters.sortOrder === 'desc' ? '↓' : '↑') : 
                      '↕'
                    }
                  </span>
                </div>
              </th>
              <th 
                className={`sortable ${filters.sortBy === 'full_name' ? 'active' : ''}`}
                onClick={() => handleSort('full_name')}
              >
                <div className="th-content">
                  <span>Khách hàng</span>
                  <span className={`sort-icon ${filters.sortBy === 'full_name' ? filters.sortOrder : ''}`}>
                    {filters.sortBy === 'full_name' ? 
                      (filters.sortOrder === 'desc' ? '↓' : '↑') : 
                      '↕'
                    }
                  </span>
                </div>
              </th>
              <th>Liên hệ</th>
              <th>Dự án</th>
              <th>Đầu tư</th>
              <th 
                className={`sortable ${filters.sortBy === 'status' ? 'active' : ''}`}
                onClick={() => handleSort('status')}
              >
                <div className="th-content">
                  <span>Trạng thái</span>
                  <span className={`sort-icon ${filters.sortBy === 'status' ? filters.sortOrder : ''}`}>
                    {filters.sortBy === 'status' ? 
                      (filters.sortOrder === 'desc' ? '↓' : '↑') : 
                      '↕'
                    }
                  </span>
                </div>
              </th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{formatDate(request.created_at)}</td>
                <td>
                  <div className="customer-info">
                    <div className="customer-name">{request.full_name}</div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div className="contact-item">
                      <Phone size={14} />
                      {request.phone_number}
                    </div>
                    <div className="contact-item">
                      <Mail size={14} />
                      {request.email}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="project-info">
                    <Building size={14} />
                    {request.project_type}
                  </div>
                </td>
                <td>
                  <div className="investment-info">
                    <DollarSign size={14} />
                    {request.investment_level}
                  </div>
                </td>
                <td>{getStatusBadge(request.status)}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => handleViewRequest(request.id)}
                      className="action-btn view"
                      title="Xem chi tiết"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(request.id)}
                      className="action-btn edit"
                      title="Cập nhật trạng thái"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteRequest(request.id)}
                      className="action-btn delete"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && !loading && (
          <div className="empty-state">
            {filters.search || filters.status ? (
              <div>
                <p>Không tìm thấy yêu cầu tư vấn nào phù hợp với bộ lọc</p>
                <button 
                  onClick={clearFilters}
                  className="clear-filters-link"
                >
                  Xóa bộ lọc để xem tất cả
                </button>
              </div>
            ) : (
              <p>Không có yêu cầu tư vấn nào</p>
            )}
          </div>
        )}

        {loading && requests.length > 0 && (
          <div className="loading-overlay">
            <RefreshCw className="loading-spinner" size={20} />
            <span>Đang cập nhật...</span>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage <= 1}
            className="pagination-btn"
          >
            <ChevronLeft size={16} />
          </button>
          
          <span className="pagination-info">
            Trang {pagination.currentPage} / {pagination.totalPages} 
            ({pagination.total} yêu cầu)
          </span>
          
          <button 
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages}
            className="pagination-btn"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi tiết yêu cầu tư vấn #{selectedRequest.id}</h3>
              <button onClick={() => setShowDetailModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-section">
                  <h4>Thông tin khách hàng</h4>
                  <div className="detail-item">
                    <strong>Họ tên:</strong> {selectedRequest.full_name}
                  </div>
                  <div className="detail-item">
                    <Phone size={16} />
                    <strong>SĐT:</strong> {selectedRequest.phone_number}
                  </div>
                  <div className="detail-item">
                    <Mail size={16} />
                    <strong>Email:</strong> {selectedRequest.email}
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <strong>Địa chỉ:</strong> {selectedRequest.address}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Thông tin dự án</h4>
                  <div className="detail-item">
                    <Building size={16} />
                    <strong>Loại công trình:</strong> {selectedRequest.project_type}
                  </div>
                  <div className="detail-item">
                    <DollarSign size={16} />
                    <strong>Mức đầu tư:</strong> {selectedRequest.investment_level}
                  </div>
                  {selectedRequest.specific_request && (
                    <div className="detail-item">
                      <strong>Yêu cầu cụ thể:</strong>
                      <p className="specific-request">{selectedRequest.specific_request}</p>
                    </div>
                  )}
                </div>

                <div className="detail-section">
                  <h4>Trạng thái xử lý</h4>
                  <div className="detail-item">
                    <strong>Trạng thái:</strong> {getStatusBadge(selectedRequest.status)}
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <strong>Ngày tạo:</strong> {formatDate(selectedRequest.created_at)}
                  </div>
                  {selectedRequest.contacted_at && (
                    <div className="detail-item">
                      <Calendar size={16} />
                      <strong>Ngày liên hệ:</strong> {formatDate(selectedRequest.contacted_at)}
                    </div>
                  )}
                  {selectedRequest.admin_notes && (
                    <div className="detail-item">
                      <strong>Ghi chú admin:</strong>
                      <p className="admin-notes">{selectedRequest.admin_notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedRequest && (
        <div className="modal-overlay" onClick={() => setShowStatusModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Cập nhật trạng thái yêu cầu #{selectedRequest.id}</h3>
              <button onClick={() => setShowStatusModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Trạng thái:</label>
                <select
                  value={statusUpdate.status}
                  onChange={(e) => setStatusUpdate(prev => ({
                    ...prev,
                    status: e.target.value as ConsultationRequest['status']
                  }))}
                >
                  {Object.entries(statusLabels).map(([status, label]) => (
                    <option key={status} value={status}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Ghi chú admin:</label>
                <textarea
                  value={statusUpdate.adminNotes}
                  onChange={(e) => setStatusUpdate(prev => ({
                    ...prev,
                    adminNotes: e.target.value
                  }))}
                  placeholder="Nhập ghi chú về quá trình xử lý..."
                  rows={4}
                />
              </div>
              <div className="modal-actions">
                <button onClick={() => setShowStatusModal(false)} className="cancel-btn">
                  Hủy
                </button>
                <button onClick={handleSubmitStatusUpdate} className="save-btn">
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationAdmin;