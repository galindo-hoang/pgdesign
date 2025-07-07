// src/components/TestimonialSliderSection.tsx
import React from "react";
import Slider from "react-slick"; // Import Slider
import "./TestimonialSliderSection.css"; // New CSS file for this component

// Assuming AvatarCircleSVG is already defined and imported in your project setup.
// If not, you'll need to import it or replace with another icon/image.
import { ReactComponent as AvatarCircleSVG } from "../assets/icons/avatar-customer-icon.svg"; // Adjust path if needed

interface Testimonial {
  name: string;
  project: string;
  text: string;
}

interface TestimonialHeader {
  mainHeadline: string;
  subHeadline: string;
}

interface TestimonialSliderSectionProps {
  header: TestimonialHeader;
  testimonials: Testimonial[];
}

const TestimonialSliderSection: React.FC<TestimonialSliderSectionProps> = ({ header,testimonials }) => {
  const settings = {
    dots: false, // Show navigation dots
    infinite: true, // Loop the slider
    speed: 500, // Transition speed
    slidesToShow: 3, // Show 3 slides at a time
    centerMode: true,
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Auto-play the slider
    autoplaySpeed: 2000, // Speed of autoplay
    arrows: false, // Hide default arrows, we'll create custom ones if needed
    swipe: true, // <--- Ensure this is true (it's default true)
    draggable: true, // <--- Ensure this is true (it's default true for desktop)
    touchMove: true, // <--- Ensure this is true (it's default true for mobile)
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

  return (
    <section className="testimonial-slider-section">
      <h2 className="ts-main-headline">{header.mainHeadline}</h2>
      <p className="ts-sub-headline">{header.subHeadline}</p>

      <div className="ts-slider-container">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            // No 'active' class here, as slick handles current slide.
            // You can add logic to highlight the *center* slide if slidesToShow is odd.
            <div key={index} className="ts-slide-item">
              <div className="ts-card">
                {" "}
                {/* Keep the card styling for individual items */}
                <AvatarCircleSVG className="ts-avatar-svg" />
                <h3 className="ts-client-name">{testimonial.name}</h3>
                <p className="ts-project-details">{testimonial.project}</p>
                <div className="ts-card-divider" />
                <p className="ts-testimonial-text">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSliderSection;
