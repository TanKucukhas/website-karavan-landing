'use client';

import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

interface SectionVisibilityTrackerProps {
  /** Page identifier for tracking */
  pageId?: string;
  /** Minimum time in viewport to track engagement (default: 2 seconds) */
  minEngagementTime?: number;
  /** Intersection observer threshold (default: 0.1 = 10% visible) */
  threshold?: number;
  /** Track time spent in each section (default: true) */
  trackEngagement?: boolean;
}

interface SectionData {
  id: string;
  startTime: number | null;
  totalTime: number;
  hasBeenViewed: boolean;
}

export default function SectionVisibilityTracker({ 
  pageId = 'homepage',
  minEngagementTime = 2000,
  threshold = 0.1,
  trackEngagement = true
}: SectionVisibilityTrackerProps) {
  const sections = useRef<Map<string, SectionData>>(new Map());
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Define sections to track (based on common section IDs)
    const sectionSelectors = [
      '#hero', '#features', '#metrics', '#categories', '#regions', 
      '#solutions', '#partners', '#innovation', '#sales-models', 
      '#team', '#cta', '#contact'
    ];

    // Create intersection observer
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id || entry.target.className;
          const isIntersecting = entry.isIntersecting;
          const intersectionRatio = entry.intersectionRatio;

          // Get or create section data
          if (!sections.current.has(sectionId)) {
            sections.current.set(sectionId, {
              id: sectionId,
              startTime: null,
              totalTime: 0,
              hasBeenViewed: false,
            });
          }

          const sectionData = sections.current.get(sectionId)!;

          if (isIntersecting && intersectionRatio >= threshold) {
            // Section entered viewport
            if (!sectionData.hasBeenViewed) {
              sectionData.hasBeenViewed = true;
              sectionData.startTime = Date.now();

              // Track section view
              analytics.sectionView(sectionId);
              
              // Track with page context
              analytics.track('section_view', {
                page_id: pageId,
                section_id: sectionId,
                event_category: 'engagement',
                event_label: `section_${sectionId}`,
              });

              // Development logging
              if (process.env.NODE_ENV !== 'production') {
                console.log(`📊 Section View: ${sectionId} on ${pageId}`);
              }
            }
          } else if (!isIntersecting && sectionData.startTime) {
            // Section left viewport - track engagement time
            if (trackEngagement) {
              const timeInView = Date.now() - sectionData.startTime;
              sectionData.totalTime += timeInView;
              sectionData.startTime = null;

              // Only track if minimum engagement time was met
              if (timeInView >= minEngagementTime) {
                analytics.sectionEngagement(sectionId, Math.floor(timeInView / 1000));
                
                // Track with page context
                analytics.track('section_engagement', {
                  page_id: pageId,
                  section_id: sectionId,
                  time_in_view: Math.floor(timeInView / 1000),
                  total_time_in_section: Math.floor(sectionData.totalTime / 1000),
                  event_category: 'engagement',
                  value: Math.floor(timeInView / 1000),
                });

                // Development logging
                if (process.env.NODE_ENV !== 'production') {
                  console.log(`📊 Section Engagement: ${sectionId} for ${Math.floor(timeInView / 1000)}s on ${pageId}`);
                }
              }
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px', // Trigger when 10% of section is visible
      }
    );

    // Observe all sections
    sectionSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (observer.current) {
          observer.current.observe(element);
        }
      });
    });

    // Also observe elements with data-section attribute
    const customSections = document.querySelectorAll('[data-section]');
    customSections.forEach(element => {
      if (observer.current) {
        observer.current.observe(element);
      }
    });

    // Cleanup
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [pageId, threshold, minEngagementTime, trackEngagement]);

  // Track final engagement times on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      sections.current.forEach((sectionData, sectionId) => {
        if (sectionData.startTime) {
          // Section is still in view, add final time
          const finalTime = Date.now() - sectionData.startTime;
          sectionData.totalTime += finalTime;
        }

        // Track total engagement if significant
        if (sectionData.totalTime >= minEngagementTime) {
          analytics.track('section_total_engagement', {
            page_id: pageId,
            section_id: sectionId,
            total_time: Math.floor(sectionData.totalTime / 1000),
            event_category: 'engagement',
            value: Math.floor(sectionData.totalTime / 1000),
          });
        }
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pageId, minEngagementTime]);

  return null; // This component doesn't render anything
}
