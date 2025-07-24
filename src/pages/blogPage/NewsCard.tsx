import React from 'react';

interface NewsCardProps {
  type: 'announcement' | 'job' | 'holiday' | 'image';
  title: string;
  mainText: string;
  details?: string;
  contact?: {
    phone?: string;
    email?: string;
    websites?: string[];
  };
  date: string;
  summary?: {
    title: string;
    text: string;
    views: number;
  };
  imageUrl?: string;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  type,
  title,
  mainText,
  details,
  contact,
  date,
  summary,
  imageUrl,
  className = ''
}) => {
  const renderContactInfo = () => {
    if (!contact) return null;

    return (
      <div className="card-contact">
        {contact.phone && (
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span>{contact.phone}</span>
          </div>
        )}
        {contact.email && (
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <span>{contact.email}</span>
          </div>
        )}
        {contact.websites && contact.websites.length > 0 && (
          <div className="contact-item">
            <span className="contact-icon">🌐</span>
            <span>{contact.websites.join(' | ')}</span>
          </div>
        )}
      </div>
    );
  };

  const renderSummary = () => {
    if (!summary) return null;

    return (
      <div className="card-summary">
        <div className="summary-title">{summary.title}</div>
        <div className="summary-text">{summary.text}</div>
        <div className="summary-views">
          <span className="views-icon">👁️</span>
          <span>{summary.views} lượt xem</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`news-card ${type} ${className}`}>
      {/* Holiday Flag for holiday cards */}
      {type === 'holiday' && (
        <div className="holiday-flag">
          <span className="flag-star">⭐</span>
        </div>
      )}

      {/* Card Header with Logo */}
      <div className="card-header">
        <div className="card-logo">
          <div className="logo-icon">T&T</div>
          <div className="logo-text">T&T CORPORATION</div>
        </div>
        <div className="card-tagline">ONE STOP SHOP PRINTING SOLUTION</div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        {imageUrl && type === 'image' && (
          <img src={imageUrl} alt={title} className="card-image" />
        )}
        
        <div className="card-title">{title}</div>
        <div className="card-main-text">{mainText}</div>
        
        {details && <div className="card-details">{details}</div>}
        
        {renderContactInfo()}
      </div>

      {/* Card Footer */}
      <div className="card-footer">
        <div className="card-date">
          <span className="date-icon">📅</span>
          <span>{date}</span>
        </div>
      </div>

      {/* Card Summary */}
      {renderSummary()}
    </div>
  );
};

export default NewsCard; 