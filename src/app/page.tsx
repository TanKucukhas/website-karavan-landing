import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
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
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <MarketRegionSection />
      <CategoriesSection />
      <TrustSection />
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-neutralGray">
          Are you a seller? <a className="text-primary underline" href="/seller">Learn how to export with Karavan</a>.
          {' '}Looking for suppliers? <a className="text-primary underline" href="/buyer">Find verified exporters here</a>.
        </p>
      </div>
      <Footer />
    </div>
  );
}
