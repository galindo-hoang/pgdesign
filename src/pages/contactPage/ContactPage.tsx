import React from "react";
import "./ContactPage.css";
import ConsultationFormSection from "../../components/ConsultationFormSection";
import MapSection from "../../components/MapSection";

const ContactPage: React.FC = () => {
  const formDataProps = {
    title: "ĐĂNG KÝ TƯ VẤN",
    projectTypes: [
      "-- Chọn loại công trình --",
      "Nhà Phố - Căn hộ",
      "Nhà hàng - Khách sạn",
      "Quán Cafe",
      "Văn phòng",
      "Khác",
    ],
    minInvestment: 100,
    maxInvestment: 10000,
    stepInvestment: 100
  }
  return (
    <div>
      <ConsultationFormSection formData = {formDataProps}/>
      <MapSection />
    </div>
  );
};

export default ContactPage;
