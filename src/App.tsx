// src/App.tsx
import React from "react";
import "./App.css"; // General app styles, if any
import Navbar from "./components/Headerbar/Navbar";
import Footer from "./components/Footerbar/FooterNav";
import ProjectPage from "./pages/projectPage/ProjectPage";
import IntroPage from "./pages/introPage/IntroPage";
import HomePage from "./pages/homePage/HomePage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      {/* <HomePage/> */}
      <ProjectPage />
      <Footer />
    </div>
  );
};

export default App;
