import React from 'react';

interface BlogNewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  viewCount: number;
  hashtags: string[];
  publishDate: string;
  slug?: string;
  className?: string;
  onClick?: (id: string) => void;
}

const BlogNewsCard: React.FC<BlogNewsCardProps> = ({
  id,
  title,
  excerpt,
  thumbnail,
  viewCount,
  hashtags,
  publishDate,
  slug,
  className = '',
  onClick
}) => {
  // Truncate excerpt to first 30 words
  const truncateExcerpt = (text: string, wordLimit: number = 30) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  // Format view count
  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div className={`news-card ${className}`} onClick={handleCardClick}>
      {/* Thumbnail */}
      <div className="news-image-container">
        <img 
          src={thumbnail} 
          alt={title}
          className="news-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            // Prevent infinite loop by checking if already using placeholder
            if (!target.src.includes('data:image/svg+xml')) {
              // Use data URL SVG placeholder instead of non-existent file
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwTDEzMCA4MEwxNzAgODBMMTUwIDEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iMTUwIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2QjcyODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+TmV3cyBJbWFnZTwvdGV4dD4KPC9zdmc+';
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="news-content">
        <h3 className="news-title">{title}</h3>
        <p className="news-excerpt">{truncateExcerpt(excerpt)}</p>
        
        {/* Hashtags */}
        {/* {hashtags && hashtags.length > 0 && (
          <div className="news-hashtags">
            {hashtags.slice(0, 3).map((tag, index) => (
              <span key={index} className="hashtag">
                #{tag}
              </span>
            ))}
            {hashtags.length > 3 && (
              <span className="hashtag">+{hashtags.length - 3}</span>
            )}
          </div>
        )} */}
      </div>

      {/* Footer */}
      <div className="news-footer">
        <div className="news-meta">
          <div className="news-views">
            <span className="views-icon">👁️</span>
            <span>{formatViewCount(viewCount)} lượt xem</span>
          </div>
          <div className="news-date">
            {formatDate(publishDate)}
          </div>
        </div>
        
        <a href={`/blog/${slug || id}`} className="news-read-more">
          Đọc thêm
        </a>
      </div>
    </div>
  );
};

export default BlogNewsCard; 