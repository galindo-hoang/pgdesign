// src/components/Navbar/Navbar.tsx
import React, { useState, useEffect } from "react"; // Import useState and useEffect
import "./Navbar.css";
import { ReactComponent as PGLogo } from "../../assets/logo/pg-design-logo.svg"; // Import SVG as ReactComponent
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false); // State to track scroll position
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        // Adjust this value (e.g., 50px) based on when you want it to become transparent
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const hanldeNavHome = () => {
    navigate("/")
  }

  return (
    <nav className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-logo-container" onClick={hanldeNavHome}>
        <PGLogo className="navbar-logo" /> {/* Use PGLogo as a component */}
      </div>
      <ul className="navbar-links">
        <li className={`navbar-item ${scrolled ? "scrolled" : ""}`}>
          <a href="/intro">Giới thiệu</a>
        </li>
        <li className={`navbar-item ${scrolled ? "scrolled" : ""}`}>
          <a href="/service">Dịch vụ</a>
        </li>
        <li className={`navbar-item ${scrolled ? "scrolled" : ""}`}>
          <a href="/profile">Hồ sơ</a>
        </li>
        <li className={`navbar-item ${scrolled ? "scrolled" : ""}`}>
          <a href="/project">Dự án</a>
        </li>
        <li className={`navbar-item ${scrolled ? "scrolled" : ""}`}>
          <a href="/contact">Liên hệ</a>
        </li>
        <li className={`navbar-item ${scrolled ? "scrolled" : ""}`}>
          <a href="/blog">Blog</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
