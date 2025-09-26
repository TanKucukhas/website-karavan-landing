export function track(event: string, payload?: Record<string, unknown>) {
  // Hook GA4/HubSpot/Meta here
  if (typeof window !== 'undefined') {
    // @ts-expect-error - dataLayer is a global variable
    window.dataLayer = window.dataLayer || [];
    // @ts-expect-error - dataLayer is a global variable
    window.dataLayer.push({ event, ...payload });
  }
}
