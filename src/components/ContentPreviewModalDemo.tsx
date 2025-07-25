import React, { useState } from 'react';
import ContentPreviewModal from './ContentPreviewModal';

const ContentPreviewModalDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demoContent, setDemoContent] = useState(`
    <h1>Demo Content Preview</h1>
    <p>This is a demonstration of the <strong>ContentPreviewModal</strong> component.</p>
    <h2>Features</h2>
    <ul>
      <li>Full-screen modal overlay</li>
      <li>Responsive design</li>
      <li>Keyboard support (Escape to close)</li>
      <li>Click outside to close</li>
      <li>Customizable title and buttons</li>
    </ul>
    <blockquote>
      This modal can be used anywhere in the application to preview content!
    </blockquote>
    <p>You can customize the title, submit button text, and even hide the submit button if needed.</p>
  `);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    console.log('Content submitted from demo!');
    alert('Content submitted successfully!');
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>ContentPreviewModal Demo</h2>
      <p>Click the button below to see the modal in action:</p>
      
      <button 
        onClick={handleOpenModal}
        style={{
          padding: '12px 24px',
          backgroundColor: '#0078d4',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '500'
        }}
      >
        Open Preview Modal
      </button>

      <ContentPreviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={demoContent}
        title="Demo Content Preview"
        onSubmit={handleSubmit}
        submitButtonText="Submit Demo Content"
        showSubmitButton={true}
      />
    </div>
  );
};

export default ContentPreviewModalDemo; 