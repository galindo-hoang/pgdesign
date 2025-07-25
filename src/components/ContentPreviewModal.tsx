import React, { useEffect } from 'react';
import './ContentPreviewModal.css';

interface ContentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title?: string;
  onSubmit?: () => void;
  submitButtonText?: string;
  showSubmitButton?: boolean;
}

const ContentPreviewModal: React.FC<ContentPreviewModalProps> = ({
  isOpen,
  onClose,
  content,
  title = "Content Preview",
  onSubmit,
  submitButtonText = "Submit Content",
  showSubmitButton = true
}) => {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside modal to close
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="preview-modal-overlay" onClick={handleOverlayClick}>
      <div className="preview-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button 
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          <div 
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button 
            className="modal-button modal-button-secondary"
            onClick={onClose}
          >
            Close
          </button>
          {showSubmitButton && onSubmit && (
            <button 
              className="modal-button modal-button-primary"
              onClick={onSubmit}
            >
              {submitButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentPreviewModal; 