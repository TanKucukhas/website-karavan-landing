/**
 * QR Contact Cards - Analytics tracking
 * Tracks QR scans, CTA clicks, copy actions, and time to action
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Track QR scan event
 * Fires when page loads with ?src=qr query parameter
 */
export function trackQRScan(slug: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'qr_scan', {
      event_category: 'qr_contact',
      event_label: slug,
      slug,
      value: 1,
    });
  }
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('📊 QR Scan:', slug);
  }
}

/**
 * Track CTA click (call, email, vcard download, linkedin, email_vcard)
 */
export function trackCTAClick(action: 'call' | 'email' | 'vcard' | 'linkedin' | 'email_vcard', slug: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'qr_contact',
      event_label: action,
      action,
      slug,
      value: 1,
    });
  }
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('📊 CTA Click:', action, slug);
  }
}

/**
 * Track field copy action (phone number or email)
 */
export function trackCopyField(field: 'phone' | 'email', slug: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'copy_field', {
      event_category: 'qr_contact',
      event_label: field,
      field,
      slug,
      value: 1,
    });
  }
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('📊 Copy Field:', field, slug);
  }
}

/**
 * Track time to action (from page load to first action)
 */
export function trackTimeToAction(milliseconds: number, slug: string, action: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'time_to_action', {
      event_category: 'qr_contact',
      event_label: action,
      time_ms: milliseconds,
      action,
      slug,
      value: milliseconds,
    });
  }
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('📊 Time to Action:', milliseconds, 'ms', action, slug);
  }
}

/**
 * Initialize time tracking
 * Returns a function to stop tracking and record time
 */
export function initTimeTracking(): () => number {
  const startTime = typeof window !== 'undefined' ? Date.now() : 0;
  
  return () => {
    return typeof window !== 'undefined' ? Date.now() - startTime : 0;
  };
}

/**
 * Track email vCard form submission
 */
export function trackEmailVCardSubmit(slug: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'vcard_email_submit', {
      event_category: 'qr_contact',
      event_label: slug,
      slug,
      value: 1,
    });
  }
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('📊 Email vCard Submit:', slug);
  }
}

/**
 * Track email sent successfully
 */
export function trackEmailSent(slug: string, messageId?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'vcard_email_sent', {
      event_category: 'qr_contact',
      event_label: slug,
      slug,
      message_id: messageId,
      value: 1,
    });
  }
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('📊 Email Sent:', slug, messageId);
  }
}

