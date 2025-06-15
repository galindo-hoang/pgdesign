import React from "react";
import "./ContactPage.css";
import ConsultationFormSection from "../../components/ConsultationFormSection";
import MapSection from "../../components/MapSection";

const ContactPage: React.FC = () => {
  return (
    <div>
      <ConsultationFormSection />
      <MapSection />
    </div>
  );
};

export default ContactPage;
