// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // General app styles, if any
import Navbar from "./components/Headerbar/Navbar";
import Footer from "./components/Footerbar/FooterNav";
import ProjectPage from "./pages/projectPage/ProjectPage";
import IntroPage from "./pages/introPage/IntroPage";
import HomePage from "./pages/homePage/HomePage";
import ProjectCategoryPage from "./pages/ProjectCategoryPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/contactPage/ContactPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:categoryId" element={<ProjectCategoryPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
