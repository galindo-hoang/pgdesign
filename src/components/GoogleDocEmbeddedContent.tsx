import React from 'react';
import './GoogleDocEmbeddedContent.css';

interface GoogleDocEmbeddedContentProps {
  title: string;
  embeddedContent?: string;
  isGoogleDoc?: boolean;
  contentLink?: string;
  imageLink?: string;
  className?: string;
}

const GoogleDocEmbeddedContent: React.FC<GoogleDocEmbeddedContentProps> = ({
  title,
  embeddedContent,
  isGoogleDoc,
  contentLink,
  imageLink,
  className = ''
}) => {
  const handleExternalLink = () => {
    if (contentLink) {
      window.open(contentLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`google-doc-embedded-container ${className}`}>
      <div className="google-doc-header">
        <h3 className="google-doc-title">{title}</h3>
        {isGoogleDoc && contentLink && (
          <button 
            className="google-doc-external-link"
            onClick={handleExternalLink}
            title="Open in Google Docs"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
            Open in Docs
          </button>
        )}
      </div>

      {imageLink && (
        <div className="google-doc-image">
          <img 
            src={imageLink} 
            alt={title}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="google-doc-content-wrapper">
        {isGoogleDoc && embeddedContent ? (
          <div 
            className="google-doc-embedded"
            dangerouslySetInnerHTML={{ __html: embeddedContent }}
          />
        ) : (
          <div className="google-doc-fallback">
            <p>Content not available as embedded Google Doc.</p>
            {contentLink && (
              <button 
                className="google-doc-view-original"
                onClick={handleExternalLink}
              >
                View Original Content
              </button>
            )}
          </div>
        )}
      </div>

      {isGoogleDoc && (
        <div className="google-doc-footer">
          <span className="google-doc-badge">
            📄 Google Doc
          </span>
        </div>
      )}
    </div>
  );
};

export default GoogleDocEmbeddedContent; 