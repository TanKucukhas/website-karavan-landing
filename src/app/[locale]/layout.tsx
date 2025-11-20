import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import HeaderWithCTA from '@/components/twplus/HeaderWithCTA';
import GlobalBackground from '@/components/GlobalBackground';
import ConditionalFooter from '@/components/ConditionalFooter';
import Analytics from '@/components/Analytics';
import LocaleSync from '@/components/LocaleSync';
import { Suspense } from 'react';

// Force static generation for all locale pages
export const dynamic = 'force-static'

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleSync locale={locale} />
      <GlobalBackground />
      <HeaderWithCTA />
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
      <div className="pt-16">{children}</div>
      <ConditionalFooter />
    </NextIntlClientProvider>
  );
}

