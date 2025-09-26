import Image from 'next/image';
import CTAButton from './ui/CTAButton';

interface Metric { label: string; value: string }

interface PartnershipSectionProps {
  partnerName: string;
  logo: string; // public path
  metrics: Metric[];
  statusBadge?: 'Active' | 'MoU' | 'Pilot';
  cta?: { label: string; href: string };
}

export default function PartnershipSection({ partnerName, logo, metrics, statusBadge, cta }: PartnershipSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: logo/photo */}
          <div className="bg-neutralLight rounded-xl p-8 border border-neutralLight">
            <div className="w-full h-40 relative">
              <Image src={logo} alt={`${partnerName} logo`} fill className="object-contain" />
            </div>
          </div>
          {/* Right: content */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-heading font-bold text-neutralDark">{partnerName}</h3>
              {statusBadge && (
                <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">{statusBadge}</span>
              )}
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {metrics.slice(0, 3).map((m, i) => (
                <li key={i} className="bg-white rounded-lg p-4 border border-neutralLight">
                  <div className="text-xl font-bold text-neutralDark">{m.value}</div>
                  <div className="text-sm text-gray-700">{m.label}</div>
                </li>
              ))}
            </ul>
            {cta && <CTAButton label={cta.label} href={cta.href} variant="outline" />}
          </div>
        </div>
      </div>
    </section>
  );
}


