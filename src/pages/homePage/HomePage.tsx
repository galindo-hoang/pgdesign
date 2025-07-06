import React, { useRef, useEffect, useState } from "react";
import "./HomePage.css";
import thumbIntro from "../../assets/images/thumb-intro.jpg";
import thumbIntro1 from "../../assets/images/diary-image-1.jpg";
import thumbIntro2 from "../../assets/images/diary-image-2.jpg";
import thumbIntro3 from "../../assets/images/diary-image-3.jpg";
import AboutSection from "../../components/AboutSection";
import ImageSliderSection from "../../components/ImageSliderSection";
import StatsSection from "../../components/StatsSection";
import SolutionSection from "../../components/SolutionSection";
import WorkflowSection from "../../components/WorkProcessSection";
import ProjectDiarySection from "../../components/ProjectDiarySection";
import TestimonialSliderSection from "../../components/TestimonialSliderSection";
import ConsultationFormSection from "../../components/ConsultationFormSection";

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageAnimating, setIsImageAnimating] = useState(false);

  const heroImages = [
    thumbIntro, 
    thumbIntro1, 
    thumbIntro2, 
    thumbIntro3, 
    thumbIntro, 
  ];

  useEffect(() => {
    if (!isHeroVisible) return;

    const imageChangeInterval = setInterval(() => {
      setIsImageAnimating(true);
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % heroImages.length
        );
        setIsImageAnimating(false);
      }, 300); 
    }, 4000);

    return () => clearInterval(imageChangeInterval);
  }, [isHeroVisible, heroImages.length]);

  useEffect(() => {
    const immediateTimer = setTimeout(() => {
      console.log('Hero - Immediate animation trigger'); 
      setIsHeroVisible(true);
    }, 500);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Hero - Intersection triggered:', entry.isIntersecting);
          if (entry.isIntersecting && !isHeroVisible) {
            console.log('Hero - Starting zoom animation');
            clearTimeout(immediateTimer); 
            setIsHeroVisible(true);
          }
        });
      },
      {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      clearTimeout(immediateTimer);
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      observer.disconnect();
    };
  }, [isHeroVisible]);

  return (
    <div className="home-page">
      <section ref={heroRef} className="hero-section">
        <div className={`hero-image-container ${isHeroVisible ? 'zoom-in-hero' : ''}`}>
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`PG Design - Kiến tạo không gian ${index + 1}`}
              className={`hero-image ${
                index === currentImageIndex ? 'active' : ''
              } ${isImageAnimating && index === currentImageIndex ? 'animating' : ''}`}
              style={{
                opacity: index === currentImageIndex ? 1 : 0,
                zIndex: index === currentImageIndex ? 2 : 1
              }}
            />
          ))}
          

        </div>
      </section>

      <main className="main-content">
          <AboutSection />
          <ImageSliderSection slides={[]} />
          <StatsSection />
          <SolutionSection />
          <WorkflowSection />
          <ProjectDiarySection />
          <TestimonialSliderSection />
          <ConsultationFormSection />
      </main>
    </div>
  );
};

export default HomePage;
