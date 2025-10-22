'use client';

import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

interface ScrollDepthTrackerProps {
  /** Page identifier for tracking */
  pageId?: string;
  /** Custom scroll thresholds (default: [25, 50, 75, 100]) */
  thresholds?: number[];
  /** Debounce delay in ms (default: 100) */
  debounceMs?: number;
}

export default function ScrollDepthTracker({ 
  pageId = 'homepage',
  thresholds = [25, 50, 75, 100],
  debounceMs = 100 
}: ScrollDepthTrackerProps) {
  const trackedDepths = useRef<Set<number>>(new Set());
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Clear existing timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      // Debounce scroll events
      debounceTimeout.current = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

        // Check each threshold
        thresholds.forEach(threshold => {
          if (scrollPercentage >= threshold && !trackedDepths.current.has(threshold)) {
            trackedDepths.current.add(threshold);
            
            // Track scroll depth event
            analytics.scrollDepth(threshold);
            
            // Also track with page context
            analytics.track('scroll_depth', {
              page_id: pageId,
              depth_percentage: threshold,
              event_category: 'engagement',
              event_label: `scroll_${threshold}%`,
              value: threshold,
            });

            // Development logging
            if (process.env.NODE_ENV !== 'production') {
              console.log(`📊 Scroll Depth: ${threshold}% on ${pageId}`);
            }
          }
        });
      }, debounceMs);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [pageId, thresholds, debounceMs]);

  // Reset tracking on page change
  useEffect(() => {
    trackedDepths.current.clear();
  }, [pageId]);

  return null; // This component doesn't render anything
}
