import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// Force static generation
export const dynamic = 'force-static';

// Server-side redirect to default locale
export default function RootPage() {
  // Redirect to default locale
  redirect(`/${routing.defaultLocale}/`);
}
