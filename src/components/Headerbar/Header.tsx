import React from "react";
import "./Header.css"; // Import your CSS file for styling

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  // If you had a dynamic logo source:
  // logoSrc?: string;
  // If you had dynamic navigation links:
  // navLinks?: NavLink[];
}

const Header: React.FC<HeaderProps> = () => {
  // Example of static navigation links, could be props if dynamic
  const navLinks: NavLink[] = [
    { label: "Giới thiệu", href: "#gioithieu" },
    { label: "Dịch vụ", href: "#dichvu" },
    { label: "Dự án", href: "#duan" },
    { label: "Liên hệ", href: "#lienhe" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <div className="header">
      <div className="logo-container">
        {/* Replace with your actual logo image or text */}
        {/* If logoSrc was a prop: <img src={logoSrc || "/path/to/default/logo.png"} alt="Company Logo" className="logo" /> */}
        <img src="/path/to/your/logo.png" alt="Company Logo" className="logo" />
        {/* Or if it's text: */}
        {/* <span className="logo-text">PG ARCHITECTURE <br/> CONSTRUCTION <br/> & INTERIOR</span> */}
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          {navLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
