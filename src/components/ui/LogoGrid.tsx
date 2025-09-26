import Image from 'next/image';
import React from 'react';

interface LogoItem {
  src: string;
  alt: string;
  href?: string;
}

interface LogoGridProps {
  logos: LogoItem[];
  columns?: 3 | 4 | 5 | 6;
}

export default function LogoGrid({ logos, columns = 5 }: LogoGridProps) {
  const gridCols = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }[columns];

  return (
    <div className={`grid ${gridCols} gap-6 items-center`}> 
      {logos.map((logo, idx) => {
        const img = (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={60}
            className="mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        );
        return (
          <div key={idx} className="flex items-center justify-center">
            {logo.href ? (
              <a href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={logo.alt}>
                {img}
              </a>
            ) : (
              img
            )}
          </div>
        );
      })}
    </div>
  );
}


