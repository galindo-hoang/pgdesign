import React, { useState, useRef, useEffect } from "react";
import "./FloatingActionButton.css";

const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 40, y: 100 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleCall = () => {
    window.open("tel:+84123456789", "_self");
  };

  const handleZalo = () => {
    window.open("https://zalo.me/84123456789", "_blank");
  };

  const handleMessage = () => {
    window.open("sms:+84123456789", "_self");
  };

  const handleFacebook = () => {
    window.open("https://m.me/pgdesign", "_blank");
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsExpanded(false);
    
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = window.innerWidth - (e.clientX - dragOffset.x) - 60;
    const newY = window.innerHeight - (e.clientY - dragOffset.y) - 60;
    
    // Keep button within screen bounds
    const boundedX = Math.max(15, Math.min(newX, window.innerWidth - 75));
    const boundedY = Math.max(15, Math.min(newY, window.innerHeight - 75));
    
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsExpanded(false);
    
    const touch = e.touches[0];
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const newX = window.innerWidth - (touch.clientX - dragOffset.x) - 60;
    const newY = window.innerHeight - (touch.clientY - dragOffset.y) - 60;
    
    // Keep button within screen bounds
    const boundedX = Math.max(15, Math.min(newX, window.innerWidth - 75));
    const boundedY = Math.max(15, Math.min(newY, window.innerHeight - 75));
    
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  const handleMouseEnter = () => {
    if (!isDragging) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsExpanded(false);
    }
  };

  return (
    <div 
      ref={buttonRef}
      className={`floating-action-button ${isExpanded ? 'expanded' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        right: `${position.x}px`,
        bottom: `${position.y}px`
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Sub buttons */}
      <button className="fab-sub-button fab-call" onClick={handleCall} title="Gọi điện">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </button>

      <button className="fab-sub-button fab-zalo" onClick={handleZalo} title="Zalo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      </button>

      <button className="fab-sub-button fab-message" onClick={handleMessage} title="Tin nhắn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      </button>

      <button className="fab-sub-button fab-facebook" onClick={handleFacebook} title="Facebook">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>

      {/* Main button */}
      <button className="fab-main-button">
        <svg 
          className="fab-icon" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        <svg 
          className="fab-close-icon" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  );
};

export default FloatingActionButton; 