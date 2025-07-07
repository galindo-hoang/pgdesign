import React, { useState, useEffect } from "react";
import "./IntroPage.css";
import AboutIntroSection from "../../components/AboutIntroSection";
import VisionMissionSection from "../../components/VisionMissionSection";
import CommitmentsSection from "../../components/CommitmentsSection";
import TeamSection from "../../components/TeamSection";
import LoadingSpinner from "../../components/LoadingSpinner";

// Import intro page service and types
import { fetchIntroPageData } from "../../services/introPageService";
import {
  IntroPageData,
  AboutIntroData,
  VisionMissionData,
  CommitmentsData,
  TeamData
} from "../../types/introPageTypes";

const IntroPage: React.FC = () => {
  const [introPageData, setIntroPageData] = useState<IntroPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIntroPageData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchIntroPageData();
        setIntroPageData(data);
      } catch (err: any) {
        console.error('Error loading intro page data:', err);
        setError(err.message || 'Failed to load intro page data');
      } finally {
        setLoading(false);
      }
    };

    loadIntroPageData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Page</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (!introPageData) {
    return (
      <div className="error-container">
        <h2>No Data Available</h2>
        <p>Unable to load intro page content.</p>
      </div>
    );
  }

  // Convert API data to component props format
  const aboutIntroData = {
    brandTitle: introPageData.aboutIntro.brandTitle,
    brandSubtitle: introPageData.aboutIntro.brandSubtitle,
    identity: introPageData.aboutIntro.identity,
    descriptions: introPageData.aboutIntro.descriptions,
    backgroundImage: introPageData.aboutIntro.backgroundImage
  };

  const visionMissionData = {
    image: introPageData.visionMission.image,
    vision: {
      title: introPageData.visionMission.vision.title,
      paragraphs: introPageData.visionMission.vision.paragraphs
    },
    mission: {
      title: introPageData.visionMission.mission.title,
      items: introPageData.visionMission.mission.items
    },
    coreValues: {
      title: introPageData.visionMission.coreValues.title,
      values: introPageData.visionMission.coreValues.values
    }
  };

  const commitmentsData = {
    title: introPageData.commitments.title,
    commitments: introPageData.commitments.commitments.map(commitment => ({
      // icon: () => <img src={commitment.iconUrl} alt={commitment.iconName} />,
      icon: commitment.iconUrl,
      title: commitment.title,
      description: commitment.description
    }))
  };

  const teamData = {
    content: {
      heading: introPageData.team.content.heading,
      description: introPageData.team.content.description
    },
    boardDirectors: introPageData.team.boardDirectors.map(director => ({
      id: director.id || 0,
      name: director.name,
      title: director.title,
      image: director.image
    })),
    teamMembers: introPageData.team.teamMembers.map(member => ({
      id: member.id || 0,
      name: member.name,
      title: member.title,
      image: member.image
    }))
  };

  return (
    <div className="IntroPageContainter">
      <AboutIntroSection content={aboutIntroData} />
      <VisionMissionSection content={visionMissionData} />
      <CommitmentsSection title={commitmentsData.title} commitments={commitmentsData.commitments} />
      <TeamSection 
        content={teamData.content} 
        boardDirectors={teamData.boardDirectors} 
        teamMembers={teamData.teamMembers} 
      />
    </div>
  );
};

export default IntroPage;
