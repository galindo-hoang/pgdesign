// src/components/WorkProcessSection.tsx
import React from "react";
import "./WorkProcessSection.css";

// Import SVG components
// Make sure these paths are correct for your project structure
import { ReactComponent as DesignProcessIcon } from "../assets/icons/design-process-icon.svg"; // Your design icon SVG
import { ReactComponent as ConstructionProcessIcon } from "../assets/icons/construction-process-icon.svg"; // Your construction icon SVG
import { ReactComponent as WorkProcessFlowDiagram } from "../assets/icons/work-process-flow-diagram.svg"; // Your main flow diagram SVG

const WorkProcessSection: React.FC = () => {
  return (
    <section className="work-process-section">
      <h2 className="wp-main-headline">QUY TRÌNH LÀM VIỆC</h2>

      <div className="wp-tabs">
        <div className="wp-tab active">
          <DesignProcessIcon className="wp-tab-icon" />
          QUY TRÌNH THIẾT KẾ
        </div>
        <div className="wp-tab">
          <ConstructionProcessIcon className="wp-tab-icon" />
          QUY TRÌNH THI CÔNG
        </div>
      </div>

      <div className="wp-flow-diagram-container">
        {/* Render the full SVG flowchart diagram here */}
        <WorkProcessFlowDiagram className="wp-flow-diagram" />
      </div>
    </section>
  );
};

export default WorkProcessSection;
