'use client'

import dynamic from 'next/dynamic'

// Import Hero directly for instant LCP - no loading spinner
import HeroWithInteractiveMap from '@/components/HeroWithInteractiveMap'

const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'), { loading: () => <div className="lt-container py-16"><div className="h-24 w-full rounded-xl bg-gray-100 animate-pulse" /></div> })
const MetricsSection = dynamic(() => import('@/components/MetricsSection'), { ssr: false, loading: () => <div className="lt-container py-16"><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Array.from({length:4}).map((_,i)=>(<div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />))}</div></div> })
const CategoriesSection = dynamic(() => import('@/components/CategoriesSection'), { loading: () => <div className="lt-container py-16"><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{Array.from({length:6}).map((_,i)=>(<div key={i} className="h-40 rounded-xl bg-gray-100 animate-pulse" />))}</div></div> })
const SolutionsPartnersSection = dynamic(() => import('@/components/SolutionsPartnersSection'), { ssr: false, loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> })
const RegionsSection = dynamic(() => import('@/components/RegionsSection'), { ssr: false, loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> })
const TrustedPartnersSection = dynamic(() => import('@/components/TrustedPartnersSection'), { ssr: false, loading: () => <div className="lt-container py-16"><div className="h-16 rounded-xl bg-gray-100 animate-pulse" /></div> })
const InnovationSection = dynamic(() => import('@/components/InnovationSection'), { ssr: false, loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> })
const SalesModelsSection = dynamic(() => import('@/components/SalesModelsSection'), { ssr: false, loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> })
const TeamSection = dynamic(() => import('@/components/TeamSection'), { ssr: false, loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> })
const CTABanner = dynamic(() => import('@/components/CTABanner'), { 
  ssr: false,
  loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> 
})

export default function HomePageClient() {
  return (
    <main className="min-h-screen bg-white text-[color:var(--ink)] overflow-x-hidden">
      <HeroWithInteractiveMap />
      <FeaturesSection />
      <MetricsSection />
      <CategoriesSection />
      <RegionsSection />
      <SolutionsPartnersSection />
      <TrustedPartnersSection />
      <InnovationSection />
      <SalesModelsSection />
      <TeamSection />
      <CTABanner />
    </main>
  )
}

