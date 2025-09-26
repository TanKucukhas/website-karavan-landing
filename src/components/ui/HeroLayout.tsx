import React from 'react';

interface HeroLayoutProps {
  left: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export default function HeroLayout({ left, right, className }: HeroLayoutProps) {
  return (
    <section className={`py-20 ${className ?? ''}`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 max-w-xl">{left}</div>
          {right && (
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutralLight relative overflow-hidden lg:ml-8">
              {right}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
