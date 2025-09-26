import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sell Internationally with Karavan | Secure B2B Marketplace for Exporters",
  description: "Expand your exports to verified buyers in Turkey, Uzbekistan, and Central Asia. Secure payments with escrow, customs & logistics handled, plus trade finance support.",
};

export default function SellerPage() {
  return (
    <main className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-neutralDark mb-6">
        Expand Your Business Across Borders with Verified Buyers
      </h1>
      <p className="text-neutralGray text-lg max-w-3xl mb-8">
        Reach international buyers and sell cross-border safely with escrow, logistics, and customs support. Access trade finance options for qualified exporters.
      </p>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-semibold text-neutralDark">Why Sellers Trust Karavan to Reach New Buyers</h2>
        <ul className="list-disc pl-6 text-neutralGray">
          <li>Verified buyers and KYB/KYC checks where available</li>
          <li>Escrow for sellers and on-time settlement</li>
          <li>Trade finance support for exporters</li>
        </ul>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-semibold text-neutralDark">Sell with Confidence: Escrow, Customs, Logistics</h2>
        <p className="text-neutralGray">Focus on your products while we handle cross-border complexity.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-neutralDark">Access Verified Buyers in Central Asia and Beyond</h2>
        <p className="text-neutralGray">Turkey, Uzbekistan, and expanding corridors across the region.</p>
      </section>
    </main>
  );
}


