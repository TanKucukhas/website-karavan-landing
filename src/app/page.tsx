'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Client-side redirect to detect and use browser locale
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Get browser language
    const browserLang = navigator.language.split('-')[0];
    
    // Supported locales
    const supportedLocales = ['en', 'tr', 'ru'];
    const defaultLocale = 'en';
    
    // Choose locale: browser lang if supported, otherwise default
    const locale = supportedLocales.includes(browserLang) ? browserLang : defaultLocale;
    
    // Redirect to locale
    router.replace(`/${locale}/`);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
    </div>
  );
}
