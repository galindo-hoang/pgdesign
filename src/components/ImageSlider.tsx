// src/components/ImageSlider.tsx
import React, { useRef } from "react";
import Slider from "react-slick";
import "./ImageSlider.css"; // Custom CSS for styling cards and slider
import TmpImage from "../assets/images/thumb-home.png";

// Define an interface for each slide's data
interface SlideData {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  size: string; // e.g., "180m2"
}

// Props for the ImageSlider component
interface ImageSliderProps {
  slides: SlideData[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {

    slides = [
      {
        id: 1,
        imageUrl: "/assets/images/thumb-home.png", // Path to your image
        title: "NHÀ ANH TRẠCH",
        subtitle: "Thi công nội thất nhà phố",
        size: "180m2",
      },
      {
        id: 2,
        imageUrl: "/assets/images/thumb-home.png", // Path to your image
        title: "ANH MỸ - OPAL GARDEN",
        subtitle: "Thi công nội thất căn hộ",
        size: "180m2",
      },
      {
        id: 3,
        imageUrl: "/assets/images/thumb-home.png", // Path to your image
        title: "SKY LINKED VILLA",
        subtitle: "Thi công nội thất biệt thự",
        size: "180m2",
      },
      {
        id: 4,
        imageUrl: "/assets/images/thumb-home.png",
        title: "DỰ ÁN MỚI 1",
        subtitle: "Thi công nội thất chung cư",
        size: "120m2",
      },
      {
        id: 5,
        imageUrl: "/assets/images/thumb-home.png",
        title: "DỰ ÁN MỚI 2",
        subtitle: "Thi công nội thất văn phòng",
        size: "300m2",
      },
    ];
  const sliderRef = useRef<Slider>(null); // Specify type for Slider ref

  const settings = {
    dots: false, // Show navigation dots
    infinite: true, // Loop the slider
    speed: 500, // Transition speed in ms
    slidesToShow: 3, // How many slides are visible at once (adjust for your layout)
    slidesToScroll: 1, // How many slides to scroll at a time
    centerMode: true, // This is key for the "partially visible" effect
    centerPadding: "120px", // Space around the center slide (adjust as needed)
    autoplay: true, // Auto-scroll
    autoplaySpeed: 3000, // Time between slides
    arrows: false, // Hide default arrows (you can add custom ones if needed)
    swipe: true, // <--- Ensure this is true (it's default true)
    draggable: true, // <--- Ensure this is true (it's default true for desktop)
    touchMove: true, // <--- Ensure this is true (it's default true for mobile)
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768, // Smaller tablets / large phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "40px", // Adjust if you want smaller side peeks
          dots: true, // Keep dots for mobile
          arrows: false,
        },
      },
      {
        breakpoint: 480, // Mobile phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "60px", // Even smaller side peeks
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  // Click handler for each slide
  const handleSlideClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="image-slider-container">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="slide-card-wrapper"
            onClick={() => handleSlideClick(index)} // Add onClick handler
          >
            <div className="slide-card">
              <div className="slide-image-container">
                <img src={TmpImage} alt={slide.title} className="slide-image" />
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

export default ImageSlider;
