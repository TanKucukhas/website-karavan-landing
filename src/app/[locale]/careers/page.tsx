import { routing } from '@/i18n/routing'
import CareersPageClient from '@/components/CareersPageClient'

// Force static generation
export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default function Careers() {
  return <CareersPageClient />
}
