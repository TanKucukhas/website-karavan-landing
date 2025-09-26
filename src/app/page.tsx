import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ChallengesSection from '@/components/ChallengesSection';
import FeaturesSection from '@/components/FeaturesSection';
import MetricsSection from '@/components/MetricsSection';
import CategoriesSection from '@/components/CategoriesSection';
import SolutionsPartnersSection from '@/components/SolutionsPartnersSection';
import InnovationSection from '@/components/InnovationSection';
import SalesModelsSection from '@/components/SalesModelsSection';
import TeamSection from '@/components/TeamSection';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main>
        <HeroSection />
        <ChallengesSection />
        <FeaturesSection />
        <MetricsSection />
        <CategoriesSection />
        <SolutionsPartnersSection />
        <InnovationSection />
        <SalesModelsSection />
        <TeamSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}