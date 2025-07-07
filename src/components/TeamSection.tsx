// src/components/TeamSection.js
import React from "react";
import "./TeamSection.css"; // Import the CSS file

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
}

interface TeamSectionContent {
  heading: string;
  description: string;
}

interface TeamSectionProps {
  content: TeamSectionContent;
  boardDirectors: TeamMember[];
  teamMembers: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({
  content,
  boardDirectors,
  teamMembers
}) => {

  return (
    <section className="pg-team-section">
      <div className="pg-team-content">
        <div className="pg-team-intro-wrapper">
          <div className="pg-teavi-heading">{content.heading}</div>
          <p className="pg-team-intro-text">
            {content.description}
          </p>
        </div>
        <div className="pg-member-container">
          <div className="pg-board-grid">
            {boardDirectors.map((member) => (
            <div className="team-member-card" key={member.id}>
              <div className="member-image-container">
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-image"
                />
              </div>
              <p className="member-name">{member.name}</p>
              <p className="member-title">{member.title}</p>
            </div>
          ))}
          </div>
          <div className="pg-member-grid">
          {teamMembers.map((member) => (
            <div className="team-member-card" key={member.id}>
              <div className="member-image-container">
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-image"
                />
              </div>
              <p className="member-name">{member.name}</p>
              <p className="member-title">{member.title}</p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
