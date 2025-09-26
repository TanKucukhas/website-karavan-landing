import Card from './ui/Card';

interface ProblemItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface ProblemCardsSectionProps {
  problems: ProblemItem[];
}

export default function ProblemCardsSection({ problems }: ProblemCardsSectionProps) {
  return (
    <section className="py-24 bg-neutralLight">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((p, i) => (
            <div key={i} className="transform transition-transform duration-300 hover:-translate-y-1">
              <Card
                icon={p.icon}
                title={p.title}
                text={p.description}
                className="h-full shadow-sm rounded-xl p-6 gap-3"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


