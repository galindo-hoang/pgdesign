import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Eye, 
  FileText, 
  Folder, 
  TrendingUp,
  Calendar,
  Clock,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import './Dashboard.css';

interface DashboardStats {
  visitors: {
    total: number;
    today: number;
    growth: number;
  };
  content: {
    blogPosts: number;
    projects: number;
    services: number;
    consultations: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: string;
  }>;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStats: DashboardStats = {
        visitors: {
          total: 15847,
          today: 234,
          growth: 12.5
        },
        content: {
          blogPosts: 8,
          projects: 45,
          services: 6,
          consultations: 23
        },
        recentActivity: [
          {
            id: '1',
            type: 'consultation',
            message: 'New consultation request from Nguyễn Văn A',
            timestamp: '2 minutes ago'
          },
          {
            id: '2',
            type: 'project',
            message: 'Project "Nhà phố Q7" was updated',
            timestamp: '1 hour ago'
          },
          {
            id: '3',
            type: 'blog',
            message: 'New blog post published',
            timestamp: '3 hours ago'
          },
          {
            id: '4',
            type: 'visitor',
            message: '50 new visitors in the last hour',
            timestamp: '1 hour ago'
          }
        ]
      };
      
      setStats(mockStats);
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    {
      title: 'Create Blog Post',
      description: 'Add new content to your blog',
      icon: <FileText />,
      color: '#3b82f6',
      action: () => navigate('/blog')
    },
    {
      title: 'Add Project',
      description: 'Showcase new project work',
      icon: <Folder />,
      color: '#10b981',
      action: () => navigate('/projects')
    },
    {
      title: 'View Analytics',
      description: 'Check detailed analytics',
      icon: <TrendingUp />,
      color: '#8b5cf6',
      action: () => navigate('/analytics')
    },
    {
      title: 'Manage Services',
      description: 'Update service offerings',
      icon: <Activity />,
      color: '#f59e0b',
      action: () => navigate('/services')
    }
  ];

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="dashboard">
        <div className="dashboard-error">
          <p>Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your website.</p>
        </div>
        <div className="dashboard-date">
          <Calendar />
          <span>{new Date().toLocaleDateString('vi-VN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <Users />
          </div>
          <div className="stat-content">
            <h3>Total Visitors</h3>
            <div className="stat-number">{stats.visitors.total.toLocaleString()}</div>
            <div className="stat-growth positive">
              <TrendingUp />
              <span>+{stats.visitors.growth}% this month</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Eye />
          </div>
          <div className="stat-content">
            <h3>Today's Visitors</h3>
            <div className="stat-number">{stats.visitors.today}</div>
            <div className="stat-meta">
              <Clock />
              <span>Updated 5 minutes ago</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FileText />
          </div>
          <div className="stat-content">
            <h3>Blog Posts</h3>
            <div className="stat-number">{stats.content.blogPosts}</div>
            <div className="stat-meta">
              <span>Published articles</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Folder />
          </div>
          <div className="stat-content">
            <h3>Projects</h3>
            <div className="stat-number">{stats.content.projects}</div>
            <div className="stat-meta">
              <span>Portfolio items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-main">
        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-card"
                onClick={action.action}
                style={{ '--accent-color': action.color } as React.CSSProperties}
              >
                <div className="action-icon">
                  {action.icon}
                </div>
                <div className="action-content">
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                </div>
                <ArrowUpRight className="action-arrow" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'consultation' && <Users />}
                  {activity.type === 'project' && <Folder />}
                  {activity.type === 'blog' && <FileText />}
                  {activity.type === 'visitor' && <Eye />}
                </div>
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span className="activity-time">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Overview */}
      <div className="content-overview">
        <h2>Content Overview</h2>
        <div className="content-stats">
          <div className="content-stat">
            <div className="content-stat-header">
              <FileText />
              <span>Blog Management</span>
            </div>
            <div className="content-stat-number">{stats.content.blogPosts}</div>
            <button onClick={() => navigate('/blog')} className="content-stat-action">
              Manage Posts
            </button>
          </div>

          <div className="content-stat">
            <div className="content-stat-header">
              <Folder />
              <span>Projects</span>
            </div>
            <div className="content-stat-number">{stats.content.projects}</div>
            <button onClick={() => navigate('/projects')} className="content-stat-action">
              View Projects
            </button>
          </div>

          <div className="content-stat">
            <div className="content-stat-header">
              <Activity />
              <span>Services</span>
            </div>
            <div className="content-stat-number">{stats.content.services}</div>
            <button onClick={() => navigate('/services')} className="content-stat-action">
              Manage Services
            </button>
          </div>

          <div className="content-stat">
            <div className="content-stat-header">
              <Users />
              <span>Consultations</span>
            </div>
            <div className="content-stat-number">{stats.content.consultations}</div>
            <button onClick={() => navigate('/consultations')} className="content-stat-action">
              View Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 