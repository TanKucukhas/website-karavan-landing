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
    <section className="relative min-h-[92vh] overflow-hidden bg-brand-bg text-brand-ink">
      {/* Map background */}
      <div className="absolute inset-0">
        <TradeMap
          nodes={NODES}
          arcs={ARCS}
          animated={!prefersReducedMotion()}
          showGraticule
          className="h-full w-full"
          onNodeClick={handleNodeClick}
        />
      </div>

      {/* Dark scrim for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/40 via-brand-bg/40 to-brand-bg/70 pointer-events-none" />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-32 pb-20">
        <div className="max-w-sm w-[46vw] sm:max-w-lg lg:max-w-xl">
          <div className="rounded-3xl bg-white/95 backdrop-blur-md shadow-xl ring-1 ring-black/5 p-6 sm:p-8 text-gray-900">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Secure B2B trade across the{' '}
                <span className="text-brand-600">Turkic States</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Launching first in Türkiye & Uzbekistan. Escrow payments, integrated logistics and customs, finance options.
              </p>
            </div>

            <div className="space-y-4">
              <EmailCaptureInline defaultRole="seller" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
