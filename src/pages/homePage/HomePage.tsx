import React, { useRef, useEffect, useState, useCallback } from "react";
import "./HomePage.css";
import AboutSection from "../../components/AboutSection";
import ImageSliderSection from "../../components/ImageSliderSection";
import StatsSection from "../../components/StatsSection";
import SolutionSection from "../../components/SolutionSection";
import WorkflowSection from "../../components/WorkProcessSection";
import ProjectDiarySection from "../../components/ProjectDiarySection";
import TestimonialSliderSection from "../../components/TestimonialSliderSection";
import ConsultationFormSection from "../../components/ConsultationFormSection";
import LoadingSpinner from "../../components/LoadingSpinner";

// Import types
import { HomePageData } from "../../types/homePageTypes";

// Import service
import { fetchHomePageData } from "../../services/homePageService";

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Data fetching states
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch data on component mount
  useEffect(() => {
    const loadHomePageData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching homepage data...');
        
        const data = await fetchHomePageData();
        setHomePageData(data);
        console.log('Homepage data loaded successfully');
        
      } catch (error) {
        console.error('Failed to load homepage data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load page data');
      } finally {
        setIsLoading(false);
      }
    };

    loadHomePageData();
  }, [retryCount]);

  // Preload hero images to prevent white flash
  useEffect(() => {
    if (homePageData?.hero.images) {
      homePageData.hero.images.forEach((imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
      });
    }
  }, [homePageData?.hero.images]);

  // Hero image carousel effect with smooth crossfade
  useEffect(() => {
    if (!isHeroVisible || !homePageData?.hero.images) return;

    const imageChangeInterval = setInterval(() => {
      if (isTransitioning) return; // Prevent overlapping transitions
      
      setIsTransitioning(true);
      setPreviousImageIndex(currentImageIndex);
      
      // Start fade out of current image
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % homePageData.hero.images.length
        );
        
        // Complete transition after fade completes
        setTimeout(() => {
          setIsTransitioning(false);
        }, 2000); // Match CSS transition duration
      }, 1000); // Half of transition time for smooth crossfade
    }, 8000); // Increased to 8 seconds for longer display time

    return () => clearInterval(imageChangeInterval);
  }, [isHeroVisible, homePageData?.hero.images, currentImageIndex, isTransitioning]);

  // Hero section visibility observer
  useEffect(() => {
    const currentHeroRef = heroRef.current;
    
    // Immediate fallback timer
    const immediateTimer = setTimeout(() => {
      if (!isHeroVisible) {
        console.log('Hero - Fallback animation trigger');
        setIsHeroVisible(true);
      }
    }, 1000);

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

    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }

    return () => {
      clearTimeout(immediateTimer);
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
      observer.disconnect();
    };
  }, [isHeroVisible]);

  // Retry function for failed requests (memoized to prevent unnecessary re-renders)
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="page-loading-overlay">
        <LoadingSpinner 
          size="large" 
          text="Đang tải dữ liệu trang chủ..." 
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="home-page">
        <div className="loading-error">
          <h3>Không thể tải dữ liệu</h3>
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // No data state (shouldn't happen with proper error handling)
  if (!homePageData) {
    return (
      <div className="home-page">
        <div className="loading-error">
          <h3>Không có dữ liệu</h3>
          <p>Dữ liệu trang chủ không khả dụng.</p>
          <button onClick={handleRetry} className="retry-button">
            Tải lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <section ref={heroRef} className="hero-section">
        <div className={`hero-image-container ${isHeroVisible ? 'zoom-in-hero' : ''}`}>
          {homePageData.hero.images.map((image, index) => {
            const isCurrent = index === currentImageIndex;
            const isPrevious = index === previousImageIndex;
            const shouldShow = isCurrent || (isPrevious && isTransitioning);
            
            return (
              <img
                key={index}
                src={image}
                alt={`PG Design - Kiến tạo không gian ${index + 1}`}
                className={`hero-image ${
                  isCurrent ? 'active' : ''
                } ${isPrevious && isTransitioning ? 'fading-out' : ''}`}
                style={{
                  opacity: shouldShow ? 1 : 0,
                  zIndex: isCurrent ? 2 : isPrevious && isTransitioning ? 1 : 0,
                  backgroundColor: '#000'
                }}
              />
            );
          })}
        </div>
      </section>

      <main className="main-content">
        <AboutSection 
          headline={homePageData.about.headline}
          subHeadline={homePageData.about.subHeadline}
          description={homePageData.about.description}
        />
        
        <ImageSliderSection slides={homePageData.imageSlider} />
        
        <StatsSection 
          stateHeader={homePageData.stats.header} 
          stateItems={homePageData.stats.items}
        />


        <ProjectDiarySection 
          title={homePageData.projectDiary.title} 
          images={homePageData.projectDiary.images} 
        />
        
        
        <SolutionSection 
          header={homePageData.solution.header} 
          solutions={homePageData.solution.solutions} 
        />
        
        <WorkflowSection 
          title={homePageData.workflow.title} 
          workflows={homePageData.workflow.workflows} 
        />
        
        <TestimonialSliderSection 
          header={homePageData.testimonials.header} 
          testimonials={homePageData.testimonials.testimonials} 
        />
        
        <ConsultationFormSection/>
      </main>
    </div>
  );
};

export default HomePage;
