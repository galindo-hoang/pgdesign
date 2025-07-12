import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  MoreVertical,
  Calendar,
  User
} from 'lucide-react';
import './BlogAdmin.css';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'published' | 'draft' | 'archived';
  publishDate: string;
  views: number;
  featured: boolean;
}

const BlogAdmin: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Thiết kế nội thất phòng khách hiện đại',
          content: 'Xu hướng thiết kế nội thất phòng khách hiện đại với những gam màu tươi sáng...',
          author: 'Admin',
          status: 'published',
          publishDate: '2024-01-15',
          views: 1250,
          featured: true
        },
        {
          id: '2',
          title: 'Bí quyết chọn màu sắc cho không gian sống',
          content: 'Màu sắc đóng vai trò quan trọng trong việc tạo nên cảm xúc và không khí...',
          author: 'Admin',
          status: 'published',
          publishDate: '2024-01-10',
          views: 890,
          featured: false
        },
        {
          id: '3',
          title: 'Thiết kế phòng ngủ master sang trọng',
          content: 'Phòng ngủ master cần được thiết kế với sự chú ý đặc biệt đến không gian...',
          author: 'Admin',
          status: 'draft',
          publishDate: '2024-01-20',
          views: 0,
          featured: false
        },
        {
          id: '4',
          title: 'Xu hướng thiết kế bếp năm 2024',
          content: 'Những xu hướng mới nhất trong thiết kế bếp với công nghệ thông minh...',
          author: 'Admin',
          status: 'published',
          publishDate: '2024-01-05',
          views: 2100,
          featured: true
        }
      ];
      
      setPosts(mockPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      published: { text: 'Published', class: 'status-published' },
      draft: { text: 'Draft', class: 'status-draft' },
      archived: { text: 'Archived', class: 'status-archived' }
    };
    return badges[status as keyof typeof badges] || badges.draft;
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handleToggleFeatured = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, featured: !post.featured } : post
    ));
  };

  if (loading) {
    return (
      <div className="blog-admin">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-admin">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Blog Management</h1>
          <p>Create and manage your blog content</p>
        </div>
        <button 
          className="create-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus />
          Create Post
        </button>
      </div>

      {/* Filters and Search */}
      <div className="admin-controls">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <Filter className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number">{posts.length}</div>
          <div className="stat-label">Total Posts</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{posts.filter(p => p.status === 'published').length}</div>
          <div className="stat-label">Published</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{posts.filter(p => p.status === 'draft').length}</div>
          <div className="stat-label">Drafts</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{posts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}</div>
          <div className="stat-label">Total Views</div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="posts-table">
        <div className="table-header">
          <h3>All Posts ({filteredPosts.length})</h3>
        </div>
        
        <div className="table-content">
          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <p>No posts found</p>
              <button 
                className="create-btn secondary"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus />
                Create your first post
              </button>
            </div>
          ) : (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <div key={post.id} className="post-card">
                  {post.featured && (
                    <div className="featured-badge">Featured</div>
                  )}
                  
                  <div className="post-header">
                    <h4 className="post-title">{post.title}</h4>
                    <div className="post-actions">
                      <button className="action-btn">
                        <MoreVertical />
                      </button>
                    </div>
                  </div>

                  <p className="post-excerpt">
                    {post.content.substring(0, 100)}...
                  </p>

                  <div className="post-meta">
                    <div className="meta-item">
                      <User />
                      <span>{post.author}</span>
                    </div>
                    <div className="meta-item">
                      <Calendar />
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                      <Eye />
                      <span>{post.views.toLocaleString()} views</span>
                    </div>
                  </div>

                  <div className="post-status">
                    <span className={`status-badge ${getStatusBadge(post.status).class}`}>
                      {getStatusBadge(post.status).text}
                    </span>
                  </div>

                  <div className="post-footer">
                    <div className="post-btn-group">
                      <button 
                        className="post-btn secondary"
                        onClick={() => handleToggleFeatured(post.id)}
                      >
                        {post.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button className="post-btn">
                        <Edit />
                        Edit
                      </button>
                      <button className="post-btn">
                        <Eye />
                        View
                      </button>
                      <button 
                        className="post-btn danger"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Post</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Blog post creation form would go here...</p>
              <p>This would include fields for title, content, author, status, etc.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button className="btn primary">
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogAdmin; 