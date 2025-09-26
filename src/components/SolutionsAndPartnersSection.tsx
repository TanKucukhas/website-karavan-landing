import LogoGrid from './ui/LogoGrid';

interface Solution { title: string; description: string }
interface Partner { logo: string; label: string; href?: string }

interface SolutionsAndPartnersSectionProps {
  solutions: Solution[];
  partners: Partner[];
}

export default function SolutionsAndPartnersSection({ solutions, partners }: SolutionsAndPartnersSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {solutions.map((s, i) => (
              <div key={i} className="bg-neutralLight rounded-xl p-6 border border-neutralLight">
                <h3 className="text-lg font-semibold text-neutralDark mb-1">{s.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
          <div>
            <LogoGrid logos={partners.map(p => ({ src: p.logo, alt: p.label, href: p.href }))} columns={3} />
          </div>
        </div>
      </div>
    </section>
  );
}


