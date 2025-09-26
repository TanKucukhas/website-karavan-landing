interface Metric { value: string | number; label: string; hint?: string }

interface MetricsSectionProps {
  headline?: string;
  currentMetrics: Metric[];
  targetMetrics: Metric[];
}

export default function MetricsSection({ headline, currentMetrics, targetMetrics }: MetricsSectionProps) {
  const Card = ({ m }: { m: Metric }) => (
    <div className="rounded-xl border border-neutralLight bg-white p-4 text-center shadow-sm">
      <div className="text-3xl font-extrabold text-neutralDark">{m.value}</div>
      <div className="text-sm text-gray-700">{m.label}</div>
      {m.hint && <div className="text-xs text-gray-500 mt-1">{m.hint}</div>}
    </div>
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {headline && <h3 className="text-3xl font-heading font-bold text-neutralDark mb-6">{headline}</h3>}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {currentMetrics.map((m, i) => <Card key={i} m={m} />)}
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {targetMetrics.map((m, i) => <Card key={i} m={m} />)}
        </div>
      </div>
    </section>
  );
}


