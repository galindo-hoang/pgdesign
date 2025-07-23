import React from 'react';
import CapabilitiesSection from '../../components/CapabilitiesSection';
import ConstructionProcessSection from '../../components/ConstructionProcessSection';
import TechnicalAdvantagesSection from '../../components/TechnicalAdvantagesSection';
import ConsultationFormSection from '../../components/ConsultationFormSection';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <CapabilitiesSection />
      <ConstructionProcessSection />
      <TechnicalAdvantagesSection />
      <ConsultationFormSection formData={{}}/>
    </div>
  );
};

export default ProfilePage;
