// src/components/ImageSlider.tsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./ImageSliderSection.css";

// Define an interface for each slide's data
interface SlideData {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  size: string;
}

// Props for the ImageSlider component
interface ImageSliderProps {
  slides: SlideData[];
}

const ImageSliderSection: React.FC<ImageSliderProps> = ({ slides }) => {
  const sliderRef = useRef<Slider>(null);
  const navigate = useNavigate(); 
  
  if (!slides || slides.length === 0) {
    return (
      <div className="image-slider-container">
        <p>No slides available</p>
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
     centerPadding: "120px", // Space around the center slide (adjust as needed)
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
           centerPadding: "40px",
           dots: false,
           arrows: false,
         },
       },
       {
         breakpoint: 480, // Mobile phones
         settings: {
           slidesToShow: 3,
           slidesToScroll: 1,
           centerPadding: "20px",
           dots: false,
           arrows: false,
         },
       },
     ],
  };

  // Click handler for each slide
  const handleSlideClick = (slide: SlideData) => {
    // Navigate to project detail page using the slide's ID
    navigate(`/project-detail/${slide.id}`);
  };

  return (
    <div className="image-slider-container">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
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
