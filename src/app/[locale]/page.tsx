import { routing } from '@/i18n/routing'
import HomePageClient from '@/components/HomePageClient'

// Force static generation
export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default function Home() {
  return <HomePageClient />
}
