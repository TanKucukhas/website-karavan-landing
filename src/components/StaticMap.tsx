'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
      return 'Karavan Trade Map - Mobile View';
    } else if (isTablet) {
      return 'Karavan Trade Map - Tablet View';
    } else {
      return 'Karavan Trade Map - Desktop View';
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[400px] overflow-hidden max-w-[100vw] ${className}`}>
      <Image
        src={getImageSrc()}
        alt={getImageAlt()}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
      />
    </div>
  );
}

