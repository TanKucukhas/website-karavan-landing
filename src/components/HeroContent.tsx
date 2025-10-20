'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

// Lazy load only the email form
const EmailCaptureInline = dynamic(() => import('./EmailCaptureInline'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-24 bg-gray-100 animate-pulse rounded-xl" />
  )
});

interface HeroContentProps {
  variant: 'mobile' | 'tablet' | 'desktop';
}

export default function HeroContent({ variant }: HeroContentProps) {
  const tHero = useTranslations('hero');

  if (variant === 'mobile') {
    return (
      <div className="relative z-10 h-full grid place-items-center py-8">
        <div className="w-full px-4 sm:px-6">
          <div className="space-y-2 sm:space-y-4">
            <div>
              <h1 className="!text-3xl sm:!text-xl md:!text-2xl font-black text-white mb-1.5 sm:mb-2 drop-shadow-lg">
                {tHero('title')} <span className="text-blue-400">{tHero('titleHighlight')}</span> {tHero('titleEnd')}
              </h1>
              
              <div className="space-y-1 max-w-2xl">
                <p className="text-xs sm:text-sm text-blue-100 leading-tight font-medium drop-shadow-lg">
                  {tHero('subtitle')} <span className="font-bold text-orange-400">{tHero('subtitleHighlight')}</span>
                </p>
                <p className="text-xs text-blue-200/90 font-medium drop-shadow-lg">
                  {tHero('description')}
                </p>
              </div>
            </div>
            
            <div className="w-full max-w-md">
              <EmailCaptureInline defaultRole="seller" source="hero-interactive-map" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'tablet') {
    return (
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-lg w-full">
            <div className="rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 p-6 sm:p-8 text-gray-900">
              <div className="mb-8">
                <h1 className="!text-4xl sm:!text-5xl font-black text-gray-900 mb-6">
                  {tHero('title')} <span className="text-brand-600">{tHero('titleHighlight')}</span> {tHero('titleEnd')}
                </h1>
                
                <div className="space-y-4">
                  <p className="text-xl text-gray-700 leading-relaxed font-medium">
                    {tHero('subtitle')} <span className="font-bold text-coral-600">{tHero('subtitleHighlight')}</span>
                  </p>
                  <p className="text-base text-gray-600 font-medium">
                    {tHero('description')}
                  </p>
                </div>
              </div>
              
              <EmailCaptureInline defaultRole="seller" source="hero-interactive-map" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <div className="absolute top-32 z-30 w-full">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-lg lg:max-w-xl w-96 lg:w-[32rem]">
          <div className="rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 p-8 lg:p-10 text-gray-900 pointer-events-auto">
            <div className="mb-8">
              <h1 className="!text-4xl lg:!text-5xl xl:!text-5xl font-black text-gray-900 mb-6">
                {tHero('title')} <span className="text-brand-600">{tHero('titleHighlight')}</span> {tHero('titleEnd')}
              </h1>
              
              <div className="space-y-4">
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                  {tHero('subtitle')} <span className="font-bold text-coral-600">{tHero('subtitleHighlight')}</span>
                </p>
                <p className="text-base lg:text-lg text-gray-600 font-medium">
                  {tHero('description')}
                </p>
              </div>
            </div>
            
            <EmailCaptureInline defaultRole="seller" source="hero-interactive-map" />
          </div>
        </div>
      </div>
    </div>
  );
}

