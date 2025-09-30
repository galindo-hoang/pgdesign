import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Home, 
  TreePine, 
  Store,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { deleteProject } from '../services/projectDetailAdminService';

import './ProjectDetailAdmin.css';

// Types
interface ProjectDetail {
  id: number;
  projectId: string;
  title: string;
  clientName: string;
  area: string;
  constructionDate: string;
  address: string;
  description: string;
  category: string;
  projectCategoryId: number;
  style: string;
  thumbnailImage?: string;
  thumbnailImageBlob?: string;
  projectImages: string[];
  projectImagesBlob?: string[];
  projectStatus: string;
  completionDate: string;
  architectName: string;
  contractorName: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  isOnHomePage: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProjectCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

const ProjectDetailAdmin: React.FC = () => {
  const navigate = useNavigate();
  
  // State management
  const [selectedCategory, setSelectedCategory] = useState<string>('appartment');
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const projectsPerPage = 10;

  // Project categories configuration
  const projectCategories: ProjectCategory[] = [
    {
      id: 'appartment',
      title: 'APARTMENT',
      icon: <Building2 className="category-icon" />,
      count: 0,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'house-normal',
      title: 'HOUSE NORMAL',
      icon: <Home className="category-icon" />,
      count: 0,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'village',
      title: 'VILLA',
      icon: <TreePine className="category-icon" />,
      count: 0,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'house-business',
      title: 'COMMERCIAL',
      icon: <Store className="category-icon" />,
      count: 0,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  // Load projects data
  const loadProjects = useCallback(async (category: string = selectedCategory) => {
    setLoading(true);
    try {
      console.log(`Loading projects for category: ${category}`);
      const response = await fetch(`http://localhost:3002/api/v1/projectdetail/category/${category}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.success && data.data) {
        setProjects(data.data);
        setFilteredProjects(data.data);
        calculateTotalPages(data.data.length);
        console.log(`Loaded ${data.data.length} projects`);
      } else {
        console.warn('API returned unsuccessful response or no data');
        setProjects([]);
        setFilteredProjects([]);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
      setFilteredProjects([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  // Calculate total pages
  const calculateTotalPages = (totalItems: number) => {
    setTotalPages(Math.ceil(totalItems / projectsPerPage));
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSearchTerm('');
    loadProjects(categoryId);
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    
    if (!term.trim()) {
      setFilteredProjects(projects);
      calculateTotalPages(projects.length);
      return;
    }

    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(term.toLowerCase()) ||
      project.clientName.toLowerCase().includes(term.toLowerCase()) ||
      project.address.toLowerCase().includes(term.toLowerCase()) ||
      project.projectId.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredProjects(filtered);
    calculateTotalPages(filtered.length);
  };

  // Get current page projects
  const getCurrentPageProjects = () => {
    if (!filteredProjects || filteredProjects.length === 0) {
      return [];
    }
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // CRUD operations
  const handleAddProject = () => {
    navigate('/project-details/add');
  };

  const handleEditProject = (project: ProjectDetail) => {
    navigate(`/project-details/edit/${project.projectId}`);
  };

  const handleDeleteProject = async (project: ProjectDetail) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa dự án "${project.title}"?`)) {
      try {
        await deleteProject(project.projectId);
        console.log('Project deleted successfully:', project.projectId);
        // Reload projects after deletion
        loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert(`Lỗi xóa dự án: ${error}`);
      }
    }
  };

  const handleViewProject = (project: ProjectDetail) => {
    // Open preview dialog or navigate to project detail view
    window.open(`http://localhost:3000/project-detail/${project.projectId}`, '_blank');
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Get thumbnail image
  const getThumbnailImage = (project: ProjectDetail) => {
    return project.thumbnailImageBlob || project.thumbnailImage || '/default-project.png';
  };

  // Initialize component
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Get pagination range
  const getPaginationRange = () => {
    const range = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    return range;
  };

  return (
    <div className="project-detail-admin">
      {/* Header */}
      <div className="admin-header">
        <h1>Project Detail Management</h1>
        <p className="subtitle">Manage detailed project information and specifications</p>
      </div>

      {/* Category Navigation */}
      <div className="category-navbar-container">
        <h2 className="category-navbar-title">Project Categories</h2>
        <div className="category-navbar">
          {projectCategories.map((category) => (
            <div
              key={category.id}
              className={`category-nav-item ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="category-nav-icon">
                {category.icon}
              </div>
              <div className="category-nav-content">
                <h3 className="category-nav-title">{category.title}</h3>
                <p className="category-nav-count">
                  {selectedCategory === category.id ? (filteredProjects?.length || 0) : 0} projects
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="projects-section">
        {/* Projects Header */}
        <div className="projects-header">
          <h2 className="projects-title">
            {projectCategories.find(cat => cat.id === selectedCategory)?.title} Projects
          </h2>
          <div className="projects-actions">
            <div className="search-container">
              <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              <input
                type="text"
                placeholder="Search projects..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ paddingLeft: '40px' }}
              />
            </div>
            <button className="btn-add" onClick={handleAddProject}>
              <Plus size={18} />
              Add Project
            </button>
          </div>
        </div>

        {/* Projects Content */}
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="empty-state">
            <Building2 className="empty-state-icon" />
            <h3>No projects found</h3>
            <p>No projects available for this category. Start by adding a new project.</p>
          </div>
        ) : (
          <>
            {/* Projects Table */}
            <div className="projects-table-container">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Thumbnail</th>
                    <th>Project Info</th>
                    <th>Client</th>
                    <th>Area</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentPageProjects().map((project) => (
                    <tr key={project.id}>
                      <td>
                        <img
                          src={getThumbnailImage(project)}
                          alt={project.title}
                          className="project-thumbnail"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/default-project.png';
                          }}
                        />
                      </td>
                      <td>
                        <div className="project-title">{project.title}</div>
                        <div className="project-meta">ID: {project.projectId}</div>
                        <div className="project-meta">{project.style}</div>
                      </td>
                      <td>{project.clientName}</td>
                      <td>{project.area}</td>
                      <td>{project.address}</td>
                      <td>
                        <span className={`status-badge ${project.isActive ? 'status-active' : 'status-inactive'}`}>
                          {project.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{formatDate(project.constructionDate)}</td>
                      <td>
                        <div className="actions-cell">
                          <button
                            className="btn-icon btn-view"
                            onClick={() => handleViewProject(project)}
                            title="View Project"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="btn-icon btn-edit"
                            onClick={() => handleEditProject(project)}
                            title="Edit Project"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="btn-icon btn-delete"
                            onClick={() => handleDeleteProject(project)}
                            title="Delete Project"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {getPaginationRange().map((page) => (
                  <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
                
                <div className="pagination-info">
                  Page {currentPage} of {totalPages} ({filteredProjects.length} total projects)
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailAdmin; 