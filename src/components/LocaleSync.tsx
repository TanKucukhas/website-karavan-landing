'use client';

import { useEffect } from 'react';

/**
 * Syncs the HTML lang attribute with the current locale
 * This ensures proper accessibility and internationalization
 */
export default function LocaleSync({ locale }: { locale: string }) {
  useEffect(() => {
    // Update HTML lang attribute to match the current locale
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}

