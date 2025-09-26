import HeroSection from '@/components/HeroSection'
import ChallengesSection from '@/components/ChallengesSection'
import FeaturesSection from '@/components/FeaturesSection'
import MetricsSection from '@/components/MetricsSection'
import CategoriesSection from '@/components/CategoriesSection'
import SolutionsPartnersSection from '@/components/SolutionsPartnersSection'
import TrustedPartnersSection from '@/components/TrustedPartnersSection'
import InnovationSection from '@/components/InnovationSection'
import SalesModelsSection from '@/components/SalesModelsSection'
import TeamSection from '@/components/TeamSection'
import CTABanner from '@/components/CTABanner'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ChallengesSection />
      <FeaturesSection />
      <MetricsSection />
      <CategoriesSection />
      <SolutionsPartnersSection />
      <TrustedPartnersSection />
      <InnovationSection />
      <SalesModelsSection />
      <TeamSection />
      <CTABanner />
    </main>
  )
}

