import React from "react";
import { useNavigate } from "react-router-dom";
import "./SolutionSection.css";

interface SolutionItemData {
  id: number;
  imageUrl: string;
  category: string; // "Dịch vụ"
  title: string[]; // Changed from string to string[]
  link: string; // URL for "Xem chi tiết"
}

interface SolutionHeader {
  mainHeadline: string;
  subHeadline: string;
}

interface SolutionSectionProps {
  header: SolutionHeader;
  solutions: SolutionItemData[];
}

const SolutionSection: React.FC<SolutionSectionProps> = ({header,solutions}) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate('/service');
  };

  return (
    <section className="solutions-section">
      <h2 className="solutions-main-headline">{header.mainHeadline}</h2>
      <h3 className="solutions-sub-headline">{header.subHeadline}</h3>
      <div className="solutions-grid">
        {solutions.map((solution) => (
          <div key={solution.id} className="solution-card">
            {/* The image container with the curved top and now the overlaid text */}
            <div className="solution-image-container">
              <img
                src={solution.imageUrl}
                alt={solution.title.join(' ')}
                className="solution-image"
              />
              {/* Overlay for gradient/text readability */}
              <div className="image-overlay">
                <div className="solution-info">
                  <button 
                    onClick={handleDetailsClick} 
                    className="solution-details-link"
                  >
                    Xem chi tiết
                  </button>
                  <div className="solution-text-content">
                    <p className="solution-category">{solution.category}</p>
                    <h4 className="solution-title">
                      {solution.title.map((titleLine, index) => (
                        <React.Fragment key={index}>
                          {titleLine}
                          {index < solution.title.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h4>
                  </div>
                </div>
              </div>

              {/* solution info is now inside the image container */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SolutionSection;