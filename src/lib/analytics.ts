// Analytics tracking for Karavan landing page

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(eventName: string, parameters?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
  
  // Also log to console for development
  if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics Event:', eventName, parameters ?? null);
  }
}

// Specific event tracking functions
export const analytics = {
  // Form events
  heroFormStart: (role: string) => track('hero_form_start', { role }),
  heroFormSubmit: (role: string) => track('hero_form_submit', { role }),
  
  // Map events
  mapNodeClick: (region: string) => track('map_node_click', { region }),
  mapArcView: () => track('map_arc_view', {}),
  
  // Role change
  roleChange: (role: string) => track('role_change', { role }),
  
  // CTA clicks
  ctaClick: (location: string, role?: string) => track('cta_click', { location, role }),
};
