import Header from '@/components/Header';
import HeroWithInteractiveMap from '@/components/HeroWithInteractiveMap';
import ProblemSolutionSection from '@/components/ProblemSolutionSection';
import FeaturesSection from '@/components/FeaturesSection';
import MarketRegionSection from '@/components/MarketRegionSection';
import CategoriesSection from '@/components/CategoriesSection';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="block">
        <HeroWithInteractiveMap />
        <ProblemSolutionSection />
        <FeaturesSection />
        <MarketRegionSection />
        <CategoriesSection />
        <TrustSection />
        <section className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-ink">
            Are you a seller? <a className="text-brand-ink underline" href="/seller">Learn how to export with Karavan</a>.
            {' '}Looking for suppliers? <a className="text-brand-ink underline" href="/buyer">Find verified exporters here</a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
