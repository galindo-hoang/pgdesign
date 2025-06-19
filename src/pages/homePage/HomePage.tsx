import React from "react";
import "./HomePage.css";
import thumbIntro from "../../assets/images/thumb-intro.jpg";
import AboutSection from "../../components/AboutSection";
import ImageSliderSection from "../../components/ImageSliderSection";
import StatsSection from "../../components/StatsSection";
import ServicesSection from "../../components/ServicesSection";
import WorkflowSection from "../../components/WorkProcessSection";
import ProjectDiarySection from "../../components/ProjectDiarySection";
import TestimonialSliderSection from "../../components/TestimonialSliderSection";
import ConsultationFormSection from "../../components/ConsultationFormSection";
import SectionDiagnostic from "../../components/SectionDiagnostic";

// Error boundary component to catch rendering errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; sectionName: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; sectionName: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in ${this.props.sectionName}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#f8f9fa', margin: '10px 0' }}>
          <h3>Error loading {this.props.sectionName}</h3>
          <p>This section failed to load. Check the console for details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const HomePage: React.FC = () => {
  console.log("HomePage component mounting...");

  return (
    <div className="home-page">
      <SectionDiagnostic />
      
      {/* Hero/Intro Section */}
      <section className="hero-section">
        <div className="hero-image-container">
          <img src={thumbIntro} alt="PG Design - Kiến tạo không gian" className="hero-image" />
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="main-content">
        <ErrorBoundary sectionName="AboutSection">
          <AboutSection />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="ImageSliderSection">
          <ImageSliderSection slides={[]} />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="StatsSection">
          <StatsSection />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="ServicesSection">
          <ServicesSection />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="WorkflowSection">
          <WorkflowSection />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="ProjectDiarySection">
          <ProjectDiarySection />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="TestimonialSliderSection">
          <TestimonialSliderSection />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="ConsultationFormSection">
          <ConsultationFormSection />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default HomePage;
