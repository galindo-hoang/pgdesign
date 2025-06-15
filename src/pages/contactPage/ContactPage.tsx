import React from "react";
import "./ContactPage.css";
import Navbar from "../../components/Headerbar/Navbar";
import Footer from "../../components/Footerbar/FooterNav";
import ConsultationFormSection from "../../components/ConsultationFormSection";
import MapSection from "../../components/MapSection";

const ContactPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <ConsultationFormSection />
      <MapSection />
      <Footer />
    </div>
  );
};

export default ContactPage;
