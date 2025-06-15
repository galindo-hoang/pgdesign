// src/App.tsx
import React from "react";
import "./App.css"; // General app styles, if any
import Navbar from "./components/Headerbar/Navbar";
import Footer from "./components/Footerbar/FooterNav";
import ProjectPage from "./pages/projectPage/ProjectPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <ProjectPage />
      <Footer />
    </div>
  );
};

export default App;
