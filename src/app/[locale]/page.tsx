import dynamic from 'next/dynamic'

const HeroWithInteractiveMap = dynamic(() => import('@/components/HeroWithInteractiveMap'), { 
  loading: () => <div className="min-h-screen bg-brand-bg flex items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-600 border-t-white" /></div> 
})

const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'), { loading: () => <div className="lt-container py-16"><div className="h-24 w-full rounded-xl bg-gray-100 animate-pulse" /></div> })
const MetricsSection = dynamic(() => import('@/components/MetricsSection'), { loading: () => <div className="lt-container py-16"><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Array.from({length:4}).map((_,i)=>(<div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />))}</div></div> })
const CategoriesSection = dynamic(() => import('@/components/CategoriesSection'), { loading: () => <div className="lt-container py-16"><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{Array.from({length:6}).map((_,i)=>(<div key={i} className="h-40 rounded-xl bg-gray-100 animate-pulse" />))}</div></div> })
const SolutionsPartnersSection = dynamic(() => import('@/components/SolutionsPartnersSection'), { loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> })
const RegionsSection = dynamic(() => import('@/components/RegionsSection'), { loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> })
const TrustedPartnersSection = dynamic(() => import('@/components/TrustedPartnersSection'), { loading: () => <div className="lt-container py-16"><div className="h-16 rounded-xl bg-gray-100 animate-pulse" /></div> })
const InnovationSection = dynamic(() => import('@/components/InnovationSection'), { loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> })
const SalesModelsSection = dynamic(() => import('@/components/SalesModelsSection'), { loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> })
const TeamSection = dynamic(() => import('@/components/TeamSection'), { loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> })
const CTABanner = dynamic(() => import('@/components/CTABanner'), { loading: () => <div className="lt-container py-16"><div className="h-24 rounded-xl bg-gray-100 animate-pulse" /></div> })

export default function Home() {
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

