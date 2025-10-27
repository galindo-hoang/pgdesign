import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { getAllBlogPosts, deleteBlogPost, BlogPost } from '../services/blogService';

const BlogAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      
      try {
        const result = await getAllBlogPosts();
        
        if (result.success && result.data) {
          setPosts(result.data);
        } else {
          console.error('Failed to fetch blog posts:', result.error);
          alert('Failed to load blog posts');
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        alert('Error loading blog posts');
      } finally {
        setLoading(false);
      }
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

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const result = await deleteBlogPost(id);
        
        if (result.success) {
          setPosts(posts.filter(post => post.id !== id));
          alert('Post deleted successfully');
        } else {
          console.error('Failed to delete post:', result.error);
          alert('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post');
      }
    }
  };

  const handleToggleFeatured = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, featured: !post.featured } : post
    ));
  };

  const handleCreatePost = () => {
    navigate('/blog/create');
  };

  const handleEditPost = (id: string) => {
    navigate(`/blog/edit/${id}`);
  };

  const handleViewPost = (id: string) => {
    // Navigate to the public blog post view
    window.open(`/blog/${id}`, '_blank');
  };

  if (loading) {
    return (
      <div className="blog-admin">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-admin">
      <div className="blog-header">
        <div className="header-left">
          <h1>Blog Management</h1>
          <p>Manage your blog posts and content</p>
        </div>
        <div className="header-actions">
          <button 
            className="create-btn primary"
            onClick={handleCreatePost}
          >
            <Plus />
            Create Post
          </button>
        </div>
      </div>

      <div className="blog-filters">
        <div className="search-box">
          <Search />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <Filter />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="blog-content">
        <div className="table-content">
          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <p>No posts found</p>
              <button 
                className="create-btn secondary"
                onClick={handleCreatePost}
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
                      <button 
                        className="post-btn"
                        onClick={() => handleEditPost(post.id)}
                      >
                        <Edit />
                        Edit
                      </button>
                      <button 
                        className="post-btn"
                        onClick={() => handleViewPost(post.id)}
                      >
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
    </div>
  );
};

export default BlogAdmin; 