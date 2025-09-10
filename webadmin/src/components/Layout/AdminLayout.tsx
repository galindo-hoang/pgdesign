import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './AdminLayout.css';

// Icons
import { 
  Home, 
  BarChart3, 
  FileText, 
  Image, 
  User, 
  Folder, 
  Settings, 
  Grid3X3, 
  Mail,
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';

interface MenuItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: '/',
    icon: <Home />,
    description: 'Overview and statistics'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    path: '/analytics',
    icon: <BarChart3 />,
    description: 'Visitor analytics and charts'
  },
  {
    id: 'blog',
    title: 'Blog Management',
    path: '/blog',
    icon: <FileText />,
    description: 'Manage blog posts and content'
  },
  {
    id: 'homepage',
    title: 'Homepage',
    path: '/homepage',
    icon: <Home />,
    description: 'Homepage content management'
  },
  {
    id: 'intro',
    title: 'Intro Page',
    path: '/intro',
    icon: <User />,
    description: 'About us and intro content'
  },
  {
    id: 'projects',
    title: 'Projects',
    path: '/projects',
    icon: <Folder />,
    description: 'Project portfolio management'
  },
  {
    id: 'project-details',
    title: 'Project Details',
    path: '/project-details',
    icon: <Image />,
    description: 'Detailed project information'
  },
  {
    id: 'services',
    title: 'Services',
    path: '/services',
    icon: <Grid3X3 />,
    description: 'Service offerings management'
  },
  {
    id: 'consultations',
    title: 'Consultations',
    path: '/consultations',
    icon: <Mail />,
    description: 'Customer consultation requests'
  }
];

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActiveMenuItem = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <img 
              src="http://localhost:9000/pgdesign-assets/logo/pg-design-logo.svg" 
              alt="PG Design" 
              className="logo-img"
            />
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${isActiveMenuItem(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              title={!sidebarOpen ? item.title : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && (
                <div className="nav-content">
                  <span className="nav-title">{item.title}</span>
                  <span className="nav-description">{item.description}</span>
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button 
            className="nav-item logout-btn" 
            onClick={handleLogout}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <span className="nav-icon"><LogOut /></span>
            {sidebarOpen && <span className="nav-title">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Header */}
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="sidebar-toggle"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>
            
            <div className="search-box">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-input"
              />
            </div>
          </div>

          <div className="header-right">
            <button className="header-btn">
              <Bell />
              <span className="notification-badge">3</span>
            </button>
            
            <button className="header-btn">
              <Settings />
            </button>

            <div className="user-menu">
              <div className="user-avatar">
                <span>{user?.username.charAt(0).toUpperCase()}</span>
              </div>
              <div className="user-info">
                <span className="user-name">{user?.username}</span>
                <span className="user-role">{user?.role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout; 