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
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    autoplaySpeed: 3000, // Speed of autoplay
    autoplay: true, // Auto-play the slider
    arrows: false, // Hide default arrows
    swipe: true,
    draggable: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // 2 slides on tablet screens
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // 1 slide on mobile screens
          slidesToScroll: 1,
          initialSlide: 0, // Start from the first slide
          dots: true,
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
