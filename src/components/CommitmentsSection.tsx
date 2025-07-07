import React, { useRef, useEffect, useState } from "react";
import "./CommitmentsSection.css"; // Import the CSS file

interface CommitmentItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface CommitmentsSectionProps {
  title: string;
  commitments: CommitmentItem[];
}

const CommitmentsSection: React.FC<CommitmentsSectionProps> = ({title,commitments}) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((item, index) => {
      if (item) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleItems(prev => {
                  const newSet = new Set(Array.from(prev));
                  newSet.add(index);
                  return newSet;
                });
                observer.disconnect(); // Stop observing once animated
              }
            });
          },
          {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px',
          }
        );

        observer.observe(item);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section className="pg-commitments-section">
      <div className="pg-commitments-heading">{title}</div>
      <div className="pg-commitments-grid">
        {commitments.map((commitment, index) => {
          const IconComponent = commitment.icon;
          const isVisible = visibleItems.has(index);
          
          return (
            <div 
              key={index}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              className="commitment-item"
            >
              <div className="commitment-header">
                <div className={`commitment-icon ${isVisible ? 'animate-icon' : ''}`}>
                  <IconComponent />
                </div>
                <h3 className="commitment-title">{commitment.title}</h3>
              </div>
              <p className="commitment-description">
                {commitment.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CommitmentsSection;
