'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on newsroom pages (newsroom has its own footer)
  if (pathname?.includes('/newsroom')) {
    return null;
  }

  return <Footer />;
}
