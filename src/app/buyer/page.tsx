import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Source Verified Suppliers in Turkey & Uzbekistan | B2B Marketplace with Escrow & Logistics",
  description: "Find verified wholesale suppliers in Turkey, Uzbekistan, and Central Asia. Secure B2B trade with escrow payments, integrated logistics, and customs support.",
};

export default function BuyerPage() {
  return (
    <main className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-neutralDark mb-6">
        Verified Wholesale Suppliers from the Turkic States
      </h1>
      <p className="text-neutralGray text-lg max-w-3xl mb-8">
        Discover wholesale suppliers and exporters in Turkey and Uzbekistan. Secure your sourcing with escrow payments, integrated logistics, and customs support.
      </p>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-semibold text-neutralDark">Why Buyers Choose Verified Suppliers on Karavan</h2>
        <ul className="list-disc pl-6 text-neutralGray">
          <li>Escrow payments and SLA-backed delivery</li>
          <li>Logistics and customs handling across Central Asia</li>
          <li>Verified exporters and supplier checks where available</li>
        </ul>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-semibold text-neutralDark">Top Industries: Textiles, Agriculture, Machinery, Chemicals</h2>
        <p className="text-neutralGray">Wholesale suppliers and exporters ready for cross-border B2B sourcing.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-neutralDark">Secure B2B Trade in Turkey and Uzbekistan</h2>
        <p className="text-neutralGray">Start sourcing with verified suppliers and managed logistics and customs.</p>
      </section>
    </main>
  );
}


