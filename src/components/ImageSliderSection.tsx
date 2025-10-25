// src/components/ImageSlider.tsx
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./ImageSliderSection.css";
import { ImageSlideData } from "../types/homePageTypes";
import { getHomepageProjects } from "../services/homepageProjectService";

// Props for the ImageSlider component (now optional since we fetch data internally)
interface ImageSliderProps {
  slides?: ImageSlideData[]; // Optional for backward compatibility
}

const ImageSliderSection: React.FC<ImageSliderProps> = ({ slides: propSlides }) => {
  const sliderRef = useRef<Slider>(null);
  const navigate = useNavigate();
  const [slides, setSlides] = useState<ImageSlideData[]>(propSlides || []);
  const [loading, setLoading] = useState(!propSlides);
  const [error, setError] = useState<string | null>(null);

  // Fetch homepage projects if no slides provided
  useEffect(() => {
    if (!propSlides) {
      const fetchHomepageProjects = async () => {
        try {
          setLoading(true);
          const homepageProjects = await getHomepageProjects();
          console.log('zoe: homepageProjects', homepageProjects);
          setSlides(homepageProjects);
          setError(null);
        } catch (err) {
          console.error('Failed to fetch homepage projects:', err);
          setError('Failed to load projects');
          setSlides([]);
        } finally {
          setLoading(false);
        }
      };

      fetchHomepageProjects();
    }
  }, [propSlides]);

  console.log(`ImageSlider: ${JSON.stringify(slides)}`);
  
  if (loading) {
    return (
      <div className="image-slider-container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="image-slider-container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }
  
  if (!slides || slides.length === 0) {
    return (
      <div className="image-slider-container">
        <p>No projects available</p>
      </div>
    );
  }

     const settings = {
     dots: false, // Show navigation dots
     infinite: true, // Loop the slider
     speed: 500, // Transition speed in ms
     slidesToShow: 3, // How many slides are visible at once (adjust for your layout)
     slidesToScroll: 1, // How many slides to scroll at a time
     centerMode: true, // This is key for the "partially visible" effect
     centerPadding: "70px", // Space around the center slide (adjust as needed)
     autoplay: true, // Disable auto-scroll
     autoplaySpeed: 1500, // Time between slides (not used when autoplay is false)
     arrows: false, // Hide default arrows (you can add custom ones if needed)
     swipe: true, // <--- Ensure this is true (it's default true)
     draggable: true, // <--- Ensure this is true (it's default true for desktop)
     touchMove: true, // <--- Ensure this is true (it's default true for mobile)
         responsive: [
       {
         breakpoint: 1024, // Tablets
         settings: {
           slidesToShow: 3,
           slidesToScroll: 1,
           centerPadding: "60px",
         },
       },
       {
         breakpoint: 768, // Smaller tablets / large phones
         settings: {
           slidesToShow: 3,
           slidesToScroll: 1,
           centerPadding: "20px",
           dots: false,
           arrows: false,
         },
       },
       {
         breakpoint: 480, // Mobile phones
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
           centerPadding: "0px",
           dots: false,
           arrows: false,
         },
       },
     ],
  };

  // Click handler for each slide
  const handleSlideClick = (slide: ImageSlideData) => {
    // Navigate to project detail page using the slide's ID
    navigate(`/project-detail/${slide.projectId}`);
  };

  return (
    <div className="image-slider-container">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div
            key={`${slide.id}#${slide.projectId}`}
            className="slide-card-wrapper"
            onClick={() => handleSlideClick(slide)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSlideClick(slide);
              }
            }}
          >
            <div className="slide-card">
              <div className="slide-image-container">
                <img src={slide.imageUrl} alt={slide.title} className="slide-image" />
              </div>
              <div className="slide-info">
                <h4 className="slide-title">{slide.title}</h4>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <p className="slide-size">{slide.size}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSliderSection;
