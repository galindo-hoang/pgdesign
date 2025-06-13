import React from "react";
import "./HeaderNav.css"; // Import your CSS file for styling
import { ReactComponent as MyIcon } from "../../assets/logo/pg-design-logo.svg";

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

const HeaderNav: React.FC<HeaderProps> = () => {
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
        <MyIcon
          className="logo"
          stroke="#2F674B"
          width="140px"
          height="100px"
        />
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

export default HeaderNav;
