import HeroInvestor from '@/sections/HeroInvestor'
import SolutionsWithMap from '@/sections/SolutionsWithMap'
import MetricsCountries from '@/sections/MetricsCountries'
import CaseStudiesFlow from '@/sections/CaseStudiesFlow'
import FooterCtaGlobe from '@/sections/FooterCtaGlobe'
import SectionBackdrop from '@/components/SectionBackdrop'
import AmbientLight from '@/components/AmbientLight'
import AuroraConic from '@/components/animations/AuroraConic'
import NoiseGrain from '@/components/animations/NoiseGrain'
import ParallaxBlobs from '@/components/animations/ParallaxBlobs'
import WavesRibbon from '@/components/animations/WavesRibbon'
import HexGridPulse from '@/components/animations/HexGridPulse'
import StarfieldCanvas from '@/components/animations/StarfieldCanvas'
import SineWaves from '@/components/animations/SineWaves'
import OrbitRings from '@/components/animations/OrbitRings'
import MatrixRain from '@/components/animations/MatrixRain'

export const metadata = {
  title: 'Effects Test • Karavan',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function EffectsTestPage() {
  return (
    <main className="min-h-screen bg-white text-[color:var(--ink)]">
      {/* 1) HERO: Grid + Radar */}
      <HeroInvestor />

      {/* 2) SOLUTIONS: SVG Arc Network */}
      <SolutionsWithMap />

      {/* 3) METRICS: Country Fill Gradients */}
      <MetricsCountries />

      {/* 4) Backdrop demo: Stripes (front) */}
      <section className="relative py-16">
        <SectionBackdrop variant="stripes" front />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="lt-card p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Backdrop Demo: Stripes</h3>
            <p className="text-gray-700">Diagonal animated stripes overlay — test visibility.</p>
          </div>
        </div>
      </section>

      {/* 5) Backdrop demo: Dots (front) */}
      <section className="relative py-16">
        <SectionBackdrop variant="dots" front />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="lt-card p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Backdrop Demo: Dots</h3>
            <p className="text-gray-700">Radial animated dots overlay — test visibility.</p>
          </div>
        </div>
      </section>

      {/* 6) CASE STUDIES: Particles (desktop only) */}
      <CaseStudiesFlow />

      {/* 7) AmbientLight demo (now behind content) */}
      <section className="relative py-16">
        <AmbientLight />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="lt-card p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">AmbientLight Demo</h3>
            <p className="text-gray-700">Brand glow blobs — test visibility (front).</p>
          </div>
        </div>
      </section>

      {/* 8) Aurora Conic demo */}
      <section className="relative py-16">
        <AuroraConic front />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="lt-card p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aurora Conic</h3>
            <p className="text-gray-700">Conic-gradient blobs rotating slowly.</p>
          </div>
        </div>
      </section>

      {/* 9) Noise Grain demo */}
      <section className="relative py-16">
        <NoiseGrain front />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="lt-card p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Noise Grain</h3>
            <p className="text-gray-700">Subtle film grain flicker overlay.</p>
          </div>
        </div>
      </section>

      {/* 10) Parallax Blobs demo */}
      <section className="relative py-16">
        <ParallaxBlobs front />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="lt-card p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Parallax Blobs</h3>
            <p className="text-gray-700">Scroll-linked subtle parallax blobs.</p>
          </div>
        </div>
      </section>

      {/* 11) Waves Ribbon demo */}
      <section className="relative py-16">
        <WavesRibbon front />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="lt-card p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Waves Ribbon</h3>
            <p className="text-gray-700">Layered wave ribbons drifting horizontally.</p>
          </div>
        </div>
      </section>

      {/* 12) Hex Grid Pulse demo */}
        <section className="relative py-16">
          <HexGridPulse front />
          <div className="relative z-10 container mx-auto px-4 lg:px-8">
            <div className="lt-card p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hex Grid Pulse</h3>
              <p className="text-gray-700">Pulsing hex grid with staggered delays.</p>
            </div>
          </div>
        </section>

      {/* 13) StarfieldCanvas */}
      <section className="relative py-16">
        <StarfieldCanvas />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="lt-card p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Starfield</h3>
            <p className="text-gray-700">Canvas-based starfield drifting right.</p>
          </div>
        </div>
      </section>

      {/* 14) SineWaves */}
      <section className="relative py-16">
        <SineWaves />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="lt-card p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sine Waves</h3>
            <p className="text-gray-700">Layered sine waves panning left.</p>
          </div>
        </div>
      </section>

      {/* 15) OrbitRings */}
      <section className="relative py-16">
        <OrbitRings />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="lt-card p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Orbit Rings</h3>
            <p className="text-gray-700">Rotating concentric orbit rings.</p>
          </div>
        </div>
      </section>

      {/* 16) MatrixRain */}
      <section className="relative py-16">
        <MatrixRain />
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="lt-card p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Matrix Rain</h3>
            <p className="text-gray-700">Falling katakana streams.</p>
          </div>
        </div>
      </section>

      {/* 8) FOOTER CTA: Globe (placeholder until lottie-react added) */}
      <FooterCtaGlobe />
    </main>
  );
}
