import React, { useState, useRef, useEffect, useCallback } from "react";
import "./FloatingActionButton.css";
import { ReactComponent as ZaloIcon } from "../assets/icons/icons8-zalo.svg";

const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  // Helper function to open external links safely
  const openLink = (url: string, target: '_blank' | '_self' = '_blank') => {
    if (target === '_blank') {
      // Try to open in new tab
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        // If popup blocked, create temporary link and click it
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      window.location.href = url;
    }
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = 'tel:0822059091';
  };

  const handleZalo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openLink('https://zalo.me/0822059091', '_blank');
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = 'mailto:info@pgdesign.com';
  };

  const handleFacebook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openLink('https://www.facebook.com/thietkethicongnoithatPG', '_blank');
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only prevent drag if clicking on sub-buttons (allow drag on main button)
    const target = e.target as HTMLElement;
    if (target.closest('.fab-sub-button')) {
      return;
    }
    
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      const boundedX = Math.max(15, Math.min(newX, window.innerWidth - 75));
      const boundedY = Math.max(15, Math.min(newY, window.innerHeight - 75));
      
      // Convert from left/top to right/bottom for positioning
      const rightPos = window.innerWidth - boundedX - 60; // 60 = button width
      const bottomPos = window.innerHeight - boundedY - 60;
      
      setPosition({ x: Math.max(20, rightPos), y: Math.max(20, bottomPos) });
    }
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      // Don't auto-expand after drag
      setIsExpanded(false);
    }
  }, [isDragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only prevent drag if touching sub-buttons (allow drag on main button)
    const target = e.target as HTMLElement;
    if (target.closest('.fab-sub-button')) {
      return;
    }
    
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.x;
      const newY = touch.clientY - dragOffset.y;
      
      const boundedX = Math.max(15, Math.min(newX, window.innerWidth - 75));
      const boundedY = Math.max(15, Math.min(newY, window.innerHeight - 75));
      
      // Convert from left/top to right/bottom for positioning
      const rightPos = window.innerWidth - boundedX - 60;
      const bottomPos = window.innerHeight - boundedY - 60;
      
      setPosition({ x: Math.max(20, rightPos), y: Math.max(20, bottomPos) });
    }
  }, [isDragging, dragOffset]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      // Don't auto-expand after drag
      setIsExpanded(false);
    }
  }, [isDragging]);

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
  }, [isDragging, dragOffset, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

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

  // Handle click outside to close
  const handleClickOutside = useCallback((e: MouseEvent) => {
    // Don't close if clicking on a sub-button
    const target = e.target as HTMLElement;
    if (target.closest('.fab-sub-button')) {
      return;
    }
    if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
      setIsExpanded(false);
    }
  }, []);

  // Add click outside listener when expanded
  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isExpanded, handleClickOutside]);

  // Toggle expanded state on main button click
  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDragging) {
      setIsExpanded(!isExpanded);
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
      <button 
        className="fab-sub-button fab-call" 
        onClick={handleCall}
        onMouseDown={(e) => e.stopPropagation()}
        title="Gọi điện"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </button>

      <button 
        className="fab-sub-button fab-zalo" 
        onClick={handleZalo}
        onMouseDown={(e) => e.stopPropagation()}
        title="Zalo"
      >
        <ZaloIcon />
      </button>

      <button 
        className="fab-sub-button fab-message" 
        onClick={handleMessage}
        onMouseDown={(e) => e.stopPropagation()}
        title="Email"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </button>

      <button 
        className="fab-sub-button fab-facebook" 
        onClick={handleFacebook}
        onMouseDown={(e) => e.stopPropagation()}
        title="Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>

      {/* Main button */}
      <button className="fab-main-button" onClick={toggleExpanded}>
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