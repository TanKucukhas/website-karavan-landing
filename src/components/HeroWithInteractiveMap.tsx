'use client';

import { useEffect } from 'react';
import TradeMap from './trade-map/TradeMap';
import { NODES, ARCS } from './trade-map/TradeMap.data';
import EmailCaptureInline from './EmailCaptureInline';
import CTAButton from './CTAButton';
import { analytics } from '@/lib/analytics';
import { prefersReducedMotion } from '@/lib/a11y';

export default function HeroWithInteractiveMap() {
  const handleNodeClick = (node: { id: string; name: string; href?: string }) => {
    analytics.mapNodeClick(node.name);
    // Show country name
    alert(`Selected: ${node.name}`);
    // Navigate to region page
    if (node.href) {
      window.location.href = node.href;
    }
  };

  // Track map arc view on mount
  useEffect(() => {
    analytics.mapArcView();
  }, []);

  return (
    <section className="relative min-h-screen bg-brand-bg text-brand-ink">
      {/* Mobile: Stacked Layout (<768px) */}
      <div className="md:hidden">
        {/* Map - Top Half */}
        <div className="h-[50vh] relative">
          <TradeMap
            nodes={NODES}
            arcs={ARCS}
            animated={!prefersReducedMotion()}
            showGraticule
            className="h-full w-full"
            onNodeClick={handleNodeClick}
            debug={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/40 via-brand-bg/40 to-brand-bg/70 pointer-events-none" />
        </div>

        {/* Form - Bottom Half */}
        <div className="h-[50vh] bg-white/95 backdrop-blur-md pt-8 pb-6 px-8 flex flex-col justify-start">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              Secure B2B trade across the{' '}
              <span className="text-brand-600">Turkic States</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Launching first in Türkiye & Uzbekistan.<br />
              Escrow payments, logistics, customs, and finance options.
            </p>
          </div>

          <EmailCaptureInline defaultRole="seller" />
        </div>
      </div>

      {/* Tablet: Centered Layout (768px-1024px) */}
      <div className="hidden md:block lg:hidden">
        {/* Map background */}
        <div className="absolute inset-0">
          <TradeMap
            nodes={NODES}
            arcs={ARCS}
            animated={!prefersReducedMotion()}
            showGraticule
            className="h-full w-full"
            onNodeClick={handleNodeClick}
            debug={false}
          />
        </div>

        {/* Dark scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/40 via-brand-bg/40 to-brand-bg/70 pointer-events-none" />

        {/* Centered form */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="max-w-md w-full">
            <div className="rounded-2xl bg-white/95 backdrop-blur-md shadow-xl ring-1 ring-black/5 p-6 text-gray-900">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                  Secure B2B trade across the{' '}
                  <span className="text-brand-600">Turkic States</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Launching first in Türkiye & Uzbekistan. Escrow payments, integrated logistics and customs, finance options.
                </p>
              </div>

              <EmailCaptureInline defaultRole="seller" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Floating Card Layout (>1024px) */}
      <div className="hidden lg:block">
        {/* Map background */}
        <div className="absolute inset-0">
          <TradeMap
            nodes={NODES}
            arcs={ARCS}
            animated={!prefersReducedMotion()}
            showGraticule
            className="h-full w-full"
            onNodeClick={handleNodeClick}
            debug={false}
          />
        </div>

        {/* Dark scrim for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/40 via-brand-bg/40 to-brand-bg/70 pointer-events-none" />

        {/* Floating form card */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20">
          <div className="max-w-lg">
            <div className="rounded-2xl bg-white/95 backdrop-blur-md shadow-xl ring-1 ring-black/5 p-8 text-gray-900">
              <div className="mb-6">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Secure B2B trade across the{' '}
                  <span className="text-brand-600">Turkic States</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Launching first in Türkiye & Uzbekistan. Escrow payments, integrated logistics and customs, finance options.
                </p>
              </div>

              <EmailCaptureInline defaultRole="seller" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
