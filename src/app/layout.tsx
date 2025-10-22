export const metadata = {
  title: 'Karavan - B2B Export Platform',
  description: 'Karavan is a B2B export platform connecting Turkish exporters with international buyers across Central Asia and Eastern Europe.',
  keywords: 'B2B export, Turkish exporters, Central Asia trade, Eastern Europe trade, international business, trade platform, export platform, Karavan',
  authors: [{ name: 'Karavan Digital Inc.' }],
  creator: 'Karavan Digital Inc.',
  publisher: 'Karavan Digital Inc.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://karavan.net',
    siteName: 'Karavan',
    title: 'Karavan - B2B Export Platform',
    description: 'Karavan is a B2B export platform connecting Turkish exporters with international buyers across Central Asia and Eastern Europe.',
    images: [
      {
        url: 'https://karavan.net/images/logo/karavan-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Karavan B2B Export Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karavan - B2B Export Platform',
    description: 'Karavan is a B2B export platform connecting Turkish exporters with international buyers across Central Asia and Eastern Europe.',
    images: ['https://karavan.net/images/logo/karavan-logo.svg'],
  },
  alternates: {
    canonical: 'https://karavan.net',
    languages: {
      'en': 'https://karavan.net/en',
      'tr': 'https://karavan.net/tr',
      'ru': 'https://karavan.net/ru',
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff'
}

import './globals.css'
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Critical resource hints - DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        {/* Note: Removed world-50m.json preload as it's only needed on desktop and loaded conditionally */}
        {/* Font preconnect removed - no custom fonts used, relying on system fonts */}
        {/* PWA Manifest - Lazy loaded to reduce critical path */}
        <Script id="load-manifest" strategy="afterInteractive">
          {`
            const link = document.createElement('link');
            link.rel = 'manifest';
            link.href = '/site.webmanifest';
            document.head.appendChild(link);
          `}
        </Script>
        {/* Google Analytics (GA4) - Ultra-lazy loaded for optimal performance */}
        {/* Only load after idle time or after 5 seconds */}
        <Script id="ga4-loader" strategy="afterInteractive">
          {`
            (function() {
              const loadGA = function() {
                if (window.gaLoaded) return;
                window.gaLoaded = true;
                
                // Load GA4 script
                const script = document.createElement('script');
                script.async = true;
                script.src = 'https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-V6W1545BEF'}';
                document.head.appendChild(script);
                
                // Initialize dataLayer
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-V6W1545BEF'}', {
                  send_page_view: false,
                  debug_mode: ${process.env.NODE_ENV !== 'production'}
                });
              };
              
              // Load on idle or after 5 seconds, whichever comes first
              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadGA, { timeout: 5000 });
              } else {
                setTimeout(loadGA, 5000);
              }
              
              // Also load on first user interaction
              const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
              const loadOnce = function() {
                loadGA();
                events.forEach(e => document.removeEventListener(e, loadOnce));
              };
              events.forEach(e => document.addEventListener(e, loadOnce, { once: true, passive: true }));
            })();
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
