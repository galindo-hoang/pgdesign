import React from "react";
import "./ProjectDiarySection.css";
import Masonry from "react-masonry-css";

interface DiaryImage {
  src: string;
  alt: string;
  className?: string; // Optional for specific grid spanning
}

interface ProjectDiarySectionProps {
  title: string;
  images: DiaryImage[];
}

const ProjectDiarySection: React.FC<ProjectDiarySectionProps> = ({title,images}) => {
  // Define breakpoints for responsive columns
  const breakpointColumnsObj = {
    default: 3, // Default to 3 columns
    1024: 2, // 2 columns on screens <= 1024px
    768: 1, // 1 column on screens <= 768px
  };

  return (
    <section className="project-diary-section">
      <h2 className="pd-main-headline">{title}</h2>
      <div className="pd-masonry-wrapper">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="pd-masonry-grid"
          columnClassName="pd-masonry-grid_column"
        >
          {images.map((image, index) => (
            <div key={index} className="pd-grid-item">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default ProjectDiarySection;
