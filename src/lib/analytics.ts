// Analytics tracking for Karavan landing page

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function track(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
  
  // Also log to console for development
  console.log('Analytics Event:', eventName, parameters);
}

// Specific event tracking functions
export const analytics = {
  // Form events
  heroFormStart: (role: string) => track('hero_form_start', { role }),
  heroFormSubmit: (role: string) => track('hero_form_submit', { role }),
  
  // Map events
  mapNodeClick: (region: string) => track('map_node_click', { region }),
  mapArcView: () => track('map_arc_view'),
  
  // Role change
  roleChange: (role: string) => track('role_change', { role }),
  
  // CTA clicks
  ctaClick: (location: string, role?: string) => track('cta_click', { location, role }),
};