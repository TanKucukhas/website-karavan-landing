'use client';

import TradeMap from './trade-map/TradeMap';
import { NODES, ARCS } from './trade-map/TradeMap.data';
import EmailCaptureInline from './EmailCaptureInline';
import CTAButton from './CTAButton';
import { track } from '@/lib/analytics';
import { prefersReducedMotion } from '@/lib/a11y';

export default function HeroWithInteractiveMap() {
  const handleNodeClick = (node: { id: string; name: string; href?: string }) => {
    track('map_click', { id: node.id, name: node.name });
    // Navigate to region page
    if (node.href) {
      window.location.href = node.href;
    }
  };

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
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-16">
        <div className="max-w-2xl rounded-2xl bg-white/80 backdrop-blur-md p-8 text-gray-900 shadow-lg">
          <h1 className="text-4xl/tight font-semibold">
            Secure B2B trade across the Turkic States
          </h1>
          <p className="mt-3 text-base text-gray-700">
            Launching first in Türkiye & Uzbekistan. Escrow payments, integrated logistics and customs, finance options.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <EmailCaptureInline defaultRole="seller" />
            <CTAButton variant="outline" href="/buyer">I&apos;m a Buyer</CTAButton>
          </div>

          <p className="mt-2 text-xs text-gray-600">
            No membership or transaction fees. Pay only for services you use.
          </p>
        </div>
      </div>
    </section>
  );
}
