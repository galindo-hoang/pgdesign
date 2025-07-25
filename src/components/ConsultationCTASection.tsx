import React from "react";
import "./ConsultationCTASection.css";

interface ConsultationCTASectionProps {
  title?: string;
  description?: string;
  features?: string[];
  buttonText?: string;
  imageUrl?: string;
  onConsultationClick?: () => void;
}

const ConsultationCTASection: React.FC<ConsultationCTASectionProps> = ({
  title = "NHẬN TƯ VẤN THIẾT KẾ NỘI THẤT",
  description = "Bạn đang muốn thiết kế không gian sống đẹp và hiện đại? Hãy liên hệ với PG Design để được tư vấn miễn phí và nhận báo giá chi tiết.",
  features = [
    "Tư vấn thiết kế miễn phí",
    "Báo giá chi tiết và minh bạch",
    "Đội ngũ thiết kế chuyên nghiệp",
    "Hỗ trợ thi công và giám sát"
  ],
  buttonText = "ĐĂNG KÝ TƯ VẤN NGAY",
  imageUrl = "/src/assets/images/diary-image-1.png",
  onConsultationClick
}) => {
  const handleClick = () => {
    if (onConsultationClick) {
      onConsultationClick();
    } else {
      // Default behavior
      console.log("Consultation requested");
    }
  };

  return (
    <section className="consultation-cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">
            {title}
          </h2>
          <p className="cta-description">
            {description}
          </p>
          <div className="cta-features">
            {features.map((feature, index) => (
              <div key={index} className="cta-feature">
                <span className="feature-icon">✓</span>
                <span className="feature-text">{feature}</span>
              </div>
            ))}
          </div>
          <button className="cta-button" onClick={handleClick}>
            {buttonText}
          </button>
        </div>
        <div className="cta-image">
          <img 
            src={imageUrl} 
            alt="Interior Design Consultation" 
            className="consultation-image"
          />
        </div>
      </div>
    </section>
  );
};

export default ConsultationCTASection; 