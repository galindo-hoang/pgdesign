import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import AdminLayout from './components/Layout/AdminLayout';
import LoginPage from './pages/LoginPage';

// Pages
import Dashboard from './pages/Dashboard';
import BlogAdmin from './pages/BlogAdmin';
import BlogPostEditor from './pages/BlogPostEditor';
import HomepageAdmin from './pages/HomepageAdmin';
import IntroAdmin from './pages/IntroAdmin';
import ProjectAdmin from './pages/ProjectAdmin';
import ProjectDetailAdmin from './pages/ProjectDetailAdmin';
import ProjectDetailEditor from './pages/ProjectDetailEditor';
import AboutProjectAdmin from './pages/AboutProjectAdmin';
import ServiceAdmin from './pages/ServiceAdmin';
import ConsultationAdmin from './pages/ConsultationAdmin';
import AnalyticsPage from './pages/AnalyticsPage';

// Auth context
import { AuthProvider, useAuth } from './hooks/useAuth';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
      } />
      
      <Route path="/" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="blog" element={<BlogAdmin />} />
        <Route path="blog/create" element={<BlogPostEditor />} />
        <Route path="blog/edit/:id" element={<BlogPostEditor />} />
        <Route path="homepage" element={<HomepageAdmin />} />
        <Route path="intro" element={<IntroAdmin />} />
        <Route path="projects" element={<ProjectAdmin />} />
        <Route path="project-details" element={<ProjectDetailAdmin />} />
        <Route path="project-details/add" element={<ProjectDetailEditor mode="add" />} />
        <Route path="project-details/edit/:projectId" element={<ProjectDetailEditor mode="edit" />} />
        <Route path="about-project" element={<AboutProjectAdmin />} />
        <Route path="services" element={<ServiceAdmin />} />
        <Route path="consultations" element={<ConsultationAdmin />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
