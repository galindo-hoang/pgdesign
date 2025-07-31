import React, { useState, useEffect } from 'react';
import CapabilitiesSection from '../../components/CapabilitiesSection';
import ConstructionProcessSection from '../../components/ConstructionProcessSection';
import TechnicalAdvantagesSection from '../../components/TechnicalAdvantagesSection';
import ConsultationFormSection from '../../components/ConsultationFormSection';
import { ProfilePageData } from '../../types/profilePageTypes';
import { fetchProfilePageData, checkProfileApiHealth } from '../../services/profilePageService';

const ProfilePage = () => {
  const [profilePageData, setProfilePageData] = useState<ProfilePageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<{ isHealthy: boolean; message: string } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check API health first
        const healthStatus = await checkProfileApiHealth();
        setApiStatus(healthStatus);
        
        // Fetch all profile page data
        const data = await fetchProfilePageData();
        setProfilePageData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile page data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="profile-page">
        <div className="loading">
          <div>Loading profile page data...</div>
          {apiStatus && (
            <div style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
              API Status: {apiStatus.message}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error || !profilePageData) {
    return (
      <div className="profile-page">
        <div className="error">
          <div>Error loading profile page data: {error}</div>
          {apiStatus && (
            <div style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
              API Status: {apiStatus.message}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <CapabilitiesSection data={profilePageData.capabilities} />
      <ConstructionProcessSection data={profilePageData.constructionProcess} />
      <TechnicalAdvantagesSection data={profilePageData.technicalAdvantages} />
      <ConsultationFormSection/>
    </div>
  );
};

export default ProfilePage;
