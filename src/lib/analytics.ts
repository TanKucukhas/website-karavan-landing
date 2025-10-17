// Enhanced Analytics tracking for Karavan landing page
// Focus: Lead generation, conversion tracking, and funnel analysis

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Form types for tracking
export type FormType = 'contact' | 'early_access_hero' | 'early_access_cta' | 'early_access_challenges';
export type UserRole = 'buyer' | 'seller' | 'unknown';
export type LeadQuality = 'hot' | 'warm' | 'cold';

// UTM parameters interface
interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

// Get UTM parameters from URL
function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
  };
}

// Get session data
function getSessionData() {
  if (typeof window === 'undefined') return {};
  
  return {
    page_path: window.location.pathname,
    page_url: window.location.href,
    page_title: document.title,
    referrer: document.referrer || 'direct',
    language: navigator.language,
  };
}

// Enhanced track function with automatic UTM and session enrichment
export function track(eventName: string, parameters?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    const enrichedParams = {
      ...parameters,
      ...getUTMParams(),
      ...getSessionData(),
      timestamp: new Date().toISOString(),
    };
    
    window.gtag('event', eventName, enrichedParams);
  }
  
  // Also log to console for development
  if (process.env.NODE_ENV !== 'production') {
    console.log('📊 Analytics Event:', eventName, parameters ?? null);
  }
}

// Set user properties for better segmentation
export function setUserProperties(properties: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
}

// Enhanced form tracking
export const formTracking = {
  // Form start - when user interacts with first field
  start: (formType: FormType, role?: UserRole) => {
    track('form_start', {
      form_type: formType,
      user_role: role || 'unknown',
      event_category: 'lead_generation',
      event_label: `${formType}_started`,
    });
  },

  // Form field interaction
  fieldFocus: (formType: FormType, fieldName: string) => {
    track('form_field_focus', {
      form_type: formType,
      field_name: fieldName,
      event_category: 'lead_generation',
    });
  },

  // Form validation error
  error: (formType: FormType, fieldName: string, errorMessage: string) => {
    track('form_error', {
      form_type: formType,
      field_name: fieldName,
      error_message: errorMessage,
      event_category: 'lead_generation',
      event_label: `${formType}_error`,
    });
  },

  // Form abandonment - user leaves without submitting
  abandon: (formType: FormType, filledFields: string[], role?: UserRole) => {
    track('form_abandon', {
      form_type: formType,
      user_role: role || 'unknown',
      filled_fields: filledFields.join(','),
      filled_fields_count: filledFields.length,
      event_category: 'lead_generation',
      event_label: `${formType}_abandoned`,
      value: filledFields.length, // Use field count as value for funnel analysis
    });
  },

  // Form submit attempt
  submitAttempt: (formType: FormType, role?: UserRole) => {
    track('form_submit_attempt', {
      form_type: formType,
      user_role: role || 'unknown',
      event_category: 'lead_generation',
      event_label: `${formType}_submit_attempt`,
    });
  },

  // Successful form submission (CONVERSION EVENT)
  submitSuccess: (formType: FormType, role?: UserRole, additionalData?: Record<string, unknown>) => {
    // Main conversion event
    track('lead_generated', {
      form_type: formType,
      user_role: role || 'unknown',
      event_category: 'conversion',
      event_label: `${formType}_success`,
      value: 1, // Each lead has value of 1
      ...additionalData,
    });

    // Specific form type conversion for granular tracking
    const conversionEventName = formType === 'contact' ? 'contact_submit' : 'early_access_submit';
    track(conversionEventName, {
      form_type: formType,
      user_role: role || 'unknown',
      event_category: 'conversion',
      value: 1,
      ...additionalData,
    });

    // Set user property for lead status
    setUserProperties({
      lead_status: 'converted',
      lead_type: formType,
      lead_role: role || 'unknown',
    });
  },

  // Form submission error
  submitError: (formType: FormType, errorMessage: string, role?: UserRole) => {
    track('form_submit_error', {
      form_type: formType,
      user_role: role || 'unknown',
      error_message: errorMessage,
      event_category: 'lead_generation',
      event_label: `${formType}_submit_error`,
    });
  },
};

// Lead quality scoring based on user behavior
export const leadQuality = {
  // Calculate and track lead quality
  assess: (formType: FormType, data: {
    hasCompany?: boolean;
    hasPhone?: boolean;
    hasMessage?: boolean;
    messageLength?: number;
    timeOnPage?: number;
    pagesVisited?: number;
  }) => {
    let score = 0;
    let quality: LeadQuality = 'cold';

    // Scoring logic
    if (data.hasCompany) score += 20;
    if (data.hasPhone) score += 15;
    if (data.hasMessage) score += 10;
    if (data.messageLength && data.messageLength > 50) score += 15;
    if (data.timeOnPage && data.timeOnPage > 60) score += 20;
    if (data.pagesVisited && data.pagesVisited > 2) score += 20;

    // Quality classification
    if (score >= 60) quality = 'hot';
    else if (score >= 30) quality = 'warm';
    else quality = 'cold';

    track('lead_quality_assessed', {
      form_type: formType,
      lead_quality: quality,
      quality_score: score,
      event_category: 'lead_generation',
      value: score,
    });

    return { quality, score };
  },
};

// Specific event tracking functions (legacy + new)
export const analytics = {
  // Form events (legacy - keeping for backward compatibility)
  heroFormStart: (role: string) => formTracking.start('early_access_hero', role as UserRole),
  heroFormSubmit: (role: string) => formTracking.submitSuccess('early_access_hero', role as UserRole),
  midFormSubmit: () => formTracking.submitSuccess('early_access_challenges'),
  
  // Map events
  mapNodeClick: (region: string) => track('map_node_click', { 
    region,
    event_category: 'engagement',
    event_label: 'map_interaction',
  }),
  mapArcView: () => track('map_arc_view', {
    event_category: 'engagement',
    event_label: 'map_animation',
  }),
  
  // Role change
  roleChange: (role: string) => {
    track('role_change', { 
      role,
      event_category: 'engagement',
      event_label: 'user_preference',
    });
    setUserProperties({ preferred_role: role });
  },
  
  languageChange: (code: string) => {
    track('language_change', { 
      code,
      event_category: 'engagement',
      event_label: 'language_preference',
    });
    setUserProperties({ preferred_language: code });
  },
  
  // CTA clicks
  ctaClick: (location: string, role?: string) => track('cta_click', { 
    location, 
    role,
    event_category: 'engagement',
    event_label: `cta_${location}`,
  }),

  // Scroll depth tracking
  scrollDepth: (depth: number) => track('scroll_depth', {
    depth_percentage: depth,
    event_category: 'engagement',
    value: depth,
  }),

  // Time on page tracking
  timeOnPage: (seconds: number) => track('time_on_page', {
    time_seconds: seconds,
    event_category: 'engagement',
    value: seconds,
  }),
};
