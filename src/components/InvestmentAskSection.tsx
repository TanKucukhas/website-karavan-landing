import PieChart from './ui/PieChart';
import CTAButton from './ui/CTAButton';

interface Allocation { label: string; percent: number; color: string }

interface InvestmentAskSectionProps {
  headline: string;
  amount: number;
  allocation: Allocation[];
  bullets?: string[];
  cta: { label: string; href: string };
}

export default function InvestmentAskSection({ headline, amount, allocation, bullets = [], cta }: InvestmentAskSectionProps) {
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <h3 className="text-3xl font-heading font-bold text-neutralDark">{headline}</h3>
            <p className="text-xl font-extrabold text-neutralDark">Ask: {formatted}</p>
            <ul className="space-y-2 text-gray-700">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3"><span className="mt-1 inline-block w-2 h-2 bg-accent rounded-full" />{b}</li>
              ))}
            </ul>
            <CTAButton label={cta.label} href={cta.href} variant="primary" />
          </div>
          <div className="flex items-center justify-center">
            <PieChart data={allocation.map(a => ({ label: a.label, percent: a.percent, color: a.color }))} />
          </div>
        </div>
      </div>
    </section>
  );
}


