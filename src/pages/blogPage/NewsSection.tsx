import React, { useState } from 'react';
import BlogNewsCard from './BlogNewsCard';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  viewCount: number;
  hashtags: string[];
  publishDate: string;
  slug?: string;
}

interface NewsSectionProps {
  news: NewsItem[];
  title?: string;
  subtitle?: string;
  loading?: boolean;
  onNewsClick?: (id: string) => void;
  className?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  news,
  title = "Tin Tức Mới Nhất",
  subtitle = "Khám phá những bài viết mới nhất từ PG Design",
  loading = false,
  onNewsClick,
  className = ''
}) => {
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);

  // Get all unique hashtags from news
  const allHashtags = Array.from(
    new Set(news.flatMap(item => item.hashtags))
  ).sort();

  // Filter news by selected hashtag
  const filteredNews = selectedHashtag 
    ? news.filter(item => item.hashtags.includes(selectedHashtag))
    : news;

  const handleHashtagClick = (hashtag: string) => {
    setSelectedHashtag(selectedHashtag === hashtag ? null : hashtag);
  };

  const handleNewsClick = (id: string) => {
    if (onNewsClick) {
      onNewsClick(id);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className={`news-section ${className}`}>
        <div className="news-container">
          <div className="news-header">
            <h2 className="news-main-title">{title}</h2>
            <p className="news-subtitle">{subtitle}</p>
          </div>
          
          <div className="news-loading">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="news-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!news || news.length === 0) {
    return (
      <section className={`news-section ${className}`}>
        <div className="news-container">
          <div className="news-header">
            <h2 className="news-main-title">{title}</h2>
            <p className="news-subtitle">{subtitle}</p>
          </div>
          
          <div className="news-empty">
            <div className="news-empty-icon">📰</div>
            <h3 className="news-empty-title">Chưa có tin tức nào</h3>
            <p className="news-empty-text">
              Hiện tại chưa có bài viết nào được đăng. Hãy quay lại sau!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`news-section ${className}`}>
      <div className="news-container">
        <div className="news-header">
          <h2 className="news-main-title">{title}</h2>
          <p className="news-subtitle">{subtitle}</p>
        </div>

        {/* Hashtag Filter */}
        {/* {allHashtags.length > 0 && (
          <div className="news-hashtags" style={{ 
            justifyContent: 'center', 
            marginBottom: '30px',
            padding: '0 20px'
          }}>
            <span 
              className={`hashtag ${!selectedHashtag ? 'active' : ''}`}
              onClick={() => setSelectedHashtag(null)}
              style={{ cursor: 'pointer' }}
            >
              Tất cả
            </span>
            {allHashtags.map((hashtag) => (
              <span
                key={hashtag}
                className={`hashtag ${selectedHashtag === hashtag ? 'active' : ''}`}
                onClick={() => handleHashtagClick(hashtag)}
                style={{ cursor: 'pointer' }}
              >
                #{hashtag}
              </span>
            ))}
          </div>
        )} */}

        {/* News Grid */}
        <div className="news-grid">
          {filteredNews.map((item) => (
            <BlogNewsCard
              key={item.id}
              id={item.id}
              title={item.title}
              excerpt={item.excerpt}
              thumbnail={item.thumbnail}
              viewCount={item.viewCount}
              hashtags={item.hashtags}
              publishDate={item.publishDate}
              slug={item.slug}
              onClick={handleNewsClick}
            />
          ))}
        </div>

        {/* Filter Info */}
        {selectedHashtag && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '20px',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            Hiển thị {filteredNews.length} bài viết với hashtag #{selectedHashtag}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection; 