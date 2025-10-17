'use client';

import { useState, useEffect } from 'react';

interface StaticMapProps {
  className?: string;
}

export default function StaticMap({ className = '' }: StaticMapProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Device-specific image selection
  const getImageSrc = () => {
    if (isMobile) {
      return '/map/map-static-mobile.webp';
    } else if (isTablet) {
      return '/map/map-static-tablet.webp';
    } else {
      return '/map/map-static-tablet.webp'; // Desktop için tablet versiyonu
    }
  };

  const getImageAlt = () => {
    if (isMobile) {
      return 'Trade routes map on mobile';
    } else if (isTablet) {
      return 'Trade routes map on tablet';
    } else {
      return 'Trade routes map';
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[400px] overflow-hidden max-w-[100vw] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getImageSrc()}
        alt={getImageAlt()}
        className="object-cover absolute inset-0 w-full h-full"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}

