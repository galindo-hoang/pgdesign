import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css"; // General app styles, if any
import Navbar from "./components/Headerbar/Navbar";
import Footer from "./components/Footerbar/FooterNav";
import ProjectPage from "./pages/projectPage/ProjectPage";
import IntroPage from "./pages/introPage/IntroPage";
import HomePage from "./pages/homePage/HomePage";
import ProjectCategoryPage from "./pages/ProjectCategoryPage";
import BlogPage from "./pages/blogPage/BlogPage";
import ContactPage from "./pages/contactPage/ContactPage";
import ProjectDetailPage from "./pages/projectDetailPage/ProjectDetailPage";
import BlogDetailPage from "./pages/blogDetailPage/BlogDetailPage";
import ServicePage from "./pages/servicePage/ServicePage";
import FloatingActionButton from "./components/FloatingActionButton";
import ProfilePage from "./pages/profilePage/profilePage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/service" element={<ServicePage/>}/>
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/projects/:categoryId" element={<ProjectCategoryPage />} />
          <Route path="/project-detail/:projectId" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Routes>
        <Footer />
        <FloatingActionButton />
      </div>
    </BrowserRouter>
  );
};

export default App;
