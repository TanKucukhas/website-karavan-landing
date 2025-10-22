'use client';

import { useEffect, useRef, useState } from 'react';
import { analytics } from '@/lib/analytics';

interface PageSessionTrackerProps {
  /** Page identifier for tracking */
  pageId?: string;
  /** Time milestones to track (default: [15, 30, 60, 120] seconds) */
  timeMilestones?: number[];
  /** Track tab visibility changes (default: true) */
  trackVisibility?: boolean;
  /** Track engagement time vs total time (default: true) */
  trackEngagement?: boolean;
}

export default function PageSessionTracker({ 
  pageId = 'homepage',
  timeMilestones = [15, 30, 60, 120],
  trackVisibility = true,
  trackEngagement = true
}: PageSessionTrackerProps) {
  const startTime = useRef<number>(Date.now());
  const lastActiveTime = useRef<number>(Date.now());
  const totalTime = useRef<number>(0);
  const engagementTime = useRef<number>(0);
  const isVisible = useRef<boolean>(true);
  const trackedMilestones = useRef<Set<number>>(new Set());
  const [sessionId] = useState<string>(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // Track time milestones
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeOnPage = Math.floor((currentTime - startTime.current) / 1000);
      
      // Update total time
      totalTime.current = timeOnPage;
      
      // Update engagement time if page is visible
      if (isVisible.current) {
        const timeSinceLastActive = Math.floor((currentTime - lastActiveTime.current) / 1000);
        if (timeSinceLastActive <= 5) { // Consider active if last activity within 5 seconds
          engagementTime.current += 1;
        }
      }

      // Check milestones
      timeMilestones.forEach(milestone => {
        if (timeOnPage >= milestone && !trackedMilestones.current.has(milestone)) {
          trackedMilestones.current.add(milestone);
          
          // Track time milestone
          analytics.timeOnPage(milestone);
          
          // Track with page context
          analytics.track('time_on_page', {
            page_id: pageId,
            session_id: sessionId,
            time_seconds: milestone,
            engagement_time: trackEngagement ? engagementTime.current : undefined,
            engagement_ratio: trackEngagement ? Math.round((engagementTime.current / timeOnPage) * 100) : undefined,
            event_category: 'engagement',
            event_label: `time_${milestone}s`,
            value: milestone,
          });

          // Development logging
          if (process.env.NODE_ENV !== 'production') {
            console.log(`📊 Time on Page: ${milestone}s on ${pageId} (engagement: ${engagementTime.current}s)`);
          }
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [pageId, timeMilestones, sessionId, trackEngagement]);

  // Track user activity
  useEffect(() => {
    const updateLastActive = () => {
      lastActiveTime.current = Date.now();
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateLastActive, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateLastActive);
      });
    };
  }, []);

  // Track page visibility
  useEffect(() => {
    if (!trackVisibility) return;

    const handleVisibilityChange = () => {
      const wasVisible = isVisible.current;
      isVisible.current = !document.hidden;

      if (wasVisible && !isVisible.current) {
        // Page became hidden
        analytics.track('page_hidden', {
          page_id: pageId,
          session_id: sessionId,
          time_on_page: totalTime.current,
          engagement_time: engagementTime.current,
          event_category: 'engagement',
        });
      } else if (!wasVisible && isVisible.current) {
        // Page became visible
        analytics.track('page_visible', {
          page_id: pageId,
          session_id: sessionId,
          time_on_page: totalTime.current,
          engagement_time: engagementTime.current,
          event_category: 'engagement',
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [pageId, sessionId, trackVisibility]);

  // Track page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const finalTime = Math.floor((Date.now() - startTime.current) / 1000);
      
      // Track session end
      analytics.track('session_end', {
        page_id: pageId,
        session_id: sessionId,
        total_time: finalTime,
        engagement_time: engagementTime.current,
        engagement_ratio: Math.round((engagementTime.current / finalTime) * 100),
        bounce: finalTime < 5, // Consider bounce if less than 5 seconds
        event_category: 'engagement',
        value: finalTime,
      });

      // Development logging
      if (process.env.NODE_ENV !== 'production') {
        console.log(`📊 Session End: ${finalTime}s total, ${engagementTime.current}s engagement on ${pageId}`);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pageId, sessionId]);

  // Track session start
  useEffect(() => {
    analytics.track('session_start', {
      page_id: pageId,
      session_id: sessionId,
      event_category: 'engagement',
    });

    // Development logging
    if (process.env.NODE_ENV !== 'production') {
      console.log(`📊 Session Start: ${sessionId} on ${pageId}`);
    }
  }, [pageId, sessionId]);

  return null; // This component doesn't render anything
}
