import CategoriesSection from '@/components/CategoriesSection'
import CTABanner from '@/components/CTABanner'

export default function BuyerPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-hero">
        <div className="container-custom section-padding text-center">
          <p className="text-sm font-medium text-primary-600">For Buyers</p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl text-[color:var(--ink)]">
            Find Verified <span className="text-gradient">Suppliers</span>
          </h1>
          <p className="mt-6 max-w-2xl text-gray-600 mx-auto">
            Access vetted Turkish suppliers across priority categories with escrow payments and logistics support.
          </p>
        </div>
      </section>

      <CategoriesSection />
      <CTABanner />
    </main>
  )
}


