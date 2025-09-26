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
    <section className="py-16 bg-neutralLight">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <div key={i} className="transform transition-transform duration-300 hover:scale-[1.02]">
              <Card
                icon={p.icon}
                title={p.title}
                text={p.description}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


