// src/components/Footer.tsx
import React from "react";
import "./FooterNav.css";

// Assuming your SVG icons are in src/assets/icons/ and logo in src/assets/logo/
import Logo from "../../assets/logo/pg-design-logo.svg"; // Path to your logo SVG, now containing the tagline
import EmailIcon from "../../assets/icons/email-icon.svg"; // Path to your email icon SVG
import PhoneIcon from "../../assets/icons/phone-icon.svg"; // Path to your phone/hotline icon SVG
import LocationIcon from "../../assets/icons/location-icon.svg"; // Path to your location icon SVG
import FacebookIcon from "../../assets/icons/facebook-icon.svg"; // Path to Facebook icon SVG
import InstagramIcon from "../../assets/icons/instagram-icon.svg"; // Path to Instagram icon SVG
import TiktokIcon from "../../assets/icons/tiktok-icon.svg"; // Path to TikTok icon SVG
import YoutubeIcon from "../../assets/icons/youtube-icon.svg"; // Path to YouTube icon SVG

const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top-section">
        {/* Only the logo image is needed here, as the text is inside the SVG */}
        <img
          src={Logo}
          alt="PG Design Logo - Architecture Construction & Interior"
          className="footer-logo"
        />
      </div>

      <div className="footer-middle-section">
        <div className="footer-info-column">
          <img src={EmailIcon} alt="Email" className="info-icon" />
          <p className="info-title">EMAIL</p>
          <a href="mailto:info@pgdesign.vn" className="info-text">
            info@pgdesign.vn
          </a>
        </div>

        <div className="footer-info-column">
          <img src={PhoneIcon} alt="Hotline" className="info-icon" />
          <p className="info-title">HOTLINE</p>
          <span>
            <a href="tel:0978208351" className="info-text">
              0978 208 351
            </a>
            {"   --   "}
            <a href="tel:0822059091" className="info-text">
              0822 059 091
            </a>
          </span>
        </div>

        <div className="footer-info-column">
          <img src={LocationIcon} alt="Địa Chỉ" className="info-icon" />
          <p className="info-title">ĐỊA CHỈ</p>
          <p className="info-text">số 77, Đường D05, KĐT Vạn Phúc</p>
          <p className="info-text">P. Hiệp Bình Phước, TP. Thủ Đức</p>
        </div>

        <div className="footer-info-column">
          <img src={LocationIcon} alt="Xưởng Sản Xuất" className="info-icon" />
          <p className="info-title">XƯỞNG SẢN XUẤT</p>
          <p className="info-text">36/37/8/1 Đường số 4, P.Hiệp Bình Phước</p>
          <p className="info-text">TP.Thủ Đức, TP. Hồ Chí Minh.</p>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-social-section">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={FacebookIcon} alt="Facebook" className="social-icon" />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={InstagramIcon} alt="Instagram" className="social-icon" />
        </a>
        <a
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={TiktokIcon} alt="TikTok" className="social-icon" />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={YoutubeIcon} alt="YouTube" className="social-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
