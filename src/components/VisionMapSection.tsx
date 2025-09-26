'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Feature, FeatureCollection, Point } from 'geojson';
import CTAButton from './ui/CTAButton';

interface Region {
  code: string; // ISO code
  name: string;
  status: 'launching' | 'expanding' | 'exploring';
  slug: string;
  categories?: string[];
  corridors?: string[];
  lat?: number;
  lng?: number;
}

interface CTA { label: string; href: string }

interface VisionMapSectionProps {
  regions: Region[];
  headline: string;
  subheadline?: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
}

export default function VisionMapSection({ regions, headline, subheadline, ctaPrimary, ctaSecondary }: VisionMapSectionProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import('maplibre-gl').Map | null>(null);
  const [hover, setHover] = useState<{ x: number; y: number; text: string } | null>(null);

  useEffect(() => {
    let map: import('maplibre-gl').Map | null = null;
    (async () => {
      const maplibre = (await import('maplibre-gl')).default;
      if (!mapContainer.current || mapRef.current) return;
      map = new maplibre.Map({
        container: mapContainer.current,
        style: 'https://demotiles.maplibre.org/style.json',
        center: [60, 35],
        zoom: 2.6,
      });

      map.addControl(new maplibre.NavigationControl({ showCompass: false }), 'top-right');

      map.on('load', () => {
        const m = mapRef.current ?? map;
        if (!m) return;
        type RegionFeatureProps = { code: string; name: string; status: Region['status']; slug: string; categories: string };
        const features: Feature<Point, RegionFeatureProps>[] = regions
          .filter(r => typeof r.lng === 'number' && typeof r.lat === 'number')
          .map(r => ({
            type: 'Feature' as const,
            properties: { code: r.code, name: r.name, status: r.status, slug: r.slug, categories: (r.categories ?? []).join(', ') },
            geometry: { type: 'Point', coordinates: [r.lng as number, r.lat as number] }
          }));

        const collection: FeatureCollection<Point, RegionFeatureProps> = { type: 'FeatureCollection', features };
        m.addSource('regions', { type: 'geojson', data: collection });
        m.addLayer({
          id: 'regions-layer',
          type: 'circle',
          source: 'regions',
          paint: {
            'circle-radius': 6,
            'circle-color': [
              'match', ['get', 'status'],
              'launching', '#0ea5e9',
              'expanding', '#f59e0b',
              'exploring', '#94a3b8',
              /* other */ '#94a3b8'
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffffff'
          }
        });

        m.on('mousemove', 'regions-layer', (e: import('maplibre-gl').MapLayerMouseEvent) => {
          const f = e.features?.[0] as unknown as { properties: Record<string, unknown> } | undefined;
          if (!f) return setHover(null);
          const name = String(f.properties.name ?? '');
          const cats = String(f.properties.categories ?? '');
          setHover({ x: e.point.x, y: e.point.y, text: `${name}${cats ? ` • ${cats}` : ''}` });
          m.getCanvas().style.cursor = 'pointer';
        });
        m.on('mouseleave', 'regions-layer', () => {
          setHover(null);
          m.getCanvas().style.cursor = '';
        });
        m.on('click', 'regions-layer', (e: import('maplibre-gl').MapLayerMouseEvent) => {
          const f = e.features?.[0] as unknown as { properties?: { slug?: string } } | undefined;
          const slug = f?.properties?.slug;
          if (slug) window.location.href = `/regions/${slug}`;
        });
      });
      mapRef.current = map;
    })();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [regions]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="relative">
            <div ref={mapContainer} className="w-full h-[420px] rounded-xl overflow-hidden border border-neutralLight" />
            {hover && (
              <div
                className="pointer-events-none absolute bg-black/80 text-white text-xs px-2 py-1 rounded"
                style={{ left: hover.x + 10, top: hover.y + 10 }}
              >
                {hover.text}
              </div>
            )}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-md text-xs p-2 border border-neutralLight">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-sky-500"/> Launching</span>
                <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-amber-500"/> Expanding</span>
                <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-slate-400"/> Exploring</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6 max-w-xl">
            <h2 className="text-4xl font-heading font-extrabold text-neutralDark">{headline}</h2>
            {subheadline && <p className="text-gray-700 text-lg leading-relaxed">{subheadline}</p>}
            <div className="flex gap-3">
              {ctaPrimary && <CTAButton label={ctaPrimary.label} href={ctaPrimary.href} variant="primary" />}
              {ctaSecondary && <CTAButton label={ctaSecondary.label} href={ctaSecondary.href} variant="outline" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


