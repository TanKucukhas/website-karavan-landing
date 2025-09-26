import BarChart from './ui/BarChart';

interface MarketSizeDatum { label: string; value: number; color?: string }

interface MarketSizeSectionProps {
  headline: string;
  description?: string;
  data: MarketSizeDatum[]; // expect TAM, SAM, SOM
}

export default function MarketSizeSection({ headline, description, data }: MarketSizeSectionProps) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-3xl font-heading font-bold text-neutralDark mb-4">{headline}</h3>
            {description && <p className="text-gray-700 mb-6 max-w-xl">{description}</p>}
            <BarChart data={data} max={max} />
          </div>
          <div className="text-gray-700 max-w-xl">
            <p>
              Our addressable markets are prioritized based on corridor demand and buyer readiness. Figures are indicative for go-to-market planning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


