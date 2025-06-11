// src/components/ProjectDiarySection.tsx
import React from "react";
import "./ProjectDiarySection.css";

// Import your images. Replace with actual paths to your images.
// For demonstration, I'll use placeholder names.
import image1 from "../assets/images/diary-image-1.jpg"; // Top left, people with bags
import image2 from "../assets/images/diary-image-2.jpg"; // Top middle, people looking at a room
import image3 from "../assets/images/diary-image-3.jpg"; // Top right, construction workers
import image4 from "../assets/images/diary-image-4.jpg"; // Middle left, kitchen
import image5 from "../assets/images/diary-image-5.jpg"; // Middle middle, person on tablet
import image6 from "../assets/images/diary-image-6.jpg"; // Middle right, living room
import image7 from "../assets/images/diary-image-7.jpg"; // Bottom left, people in front of house
import image8 from "../assets/images/diary-image-8.jpg"; // Bottom right, worker installing window

interface DiaryImage {
  src: string;
  alt: string;
  className?: string; // Optional for specific grid spanning
}

const diaryImages: DiaryImage[] = [
  { src: image1, alt: "People presenting something at a table" },
  { src: image2, alt: "People inspecting a room in construction" },
  { src: image3, alt: "Construction workers reviewing plans" },
  { src: image4, alt: "Stylish kitchen interior" },
  { src: image5, alt: "Person using a tablet at a desk" },
  { src: image6, alt: "Modern living room interior" },
  { src: image7, alt: "Team standing in front of a house design" },
  { src: image8, alt: "Worker installing a window" },
];

const ProjectDiarySection: React.FC = () => {
  return (
    <section className="project-diary-section">
      <h2 className="pd-main-headline">NHẬT KÝ HÀNH TRÌNH</h2>
      <div className="pd-image-grid">
        {diaryImages.map((image, index) => (
          <div key={index} className={`pd-grid-item pd-grid-item-${index + 1}`}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectDiarySection;
