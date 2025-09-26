interface SalesModel { id: string; title: string; description: string; image?: string }

interface SalesModelsSectionProps {
  models: SalesModel[]; // expect 5
}

export default function SalesModelsSection({ models }: SalesModelsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="hidden lg:grid grid-cols-5 gap-4">
          {models.map(m => (
            <article key={m.id} className="border border-neutralLight rounded-xl p-4 bg-neutralLight hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-neutralDark mb-2">{m.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{m.description}</p>
            </article>
          ))}
        </div>
        <div className="lg:hidden overflow-x-auto">
          <div className="grid grid-flow-col auto-cols-[80%] gap-4">
            {models.map(m => (
              <article key={m.id} className="border border-neutralLight rounded-xl p-4 bg-neutralLight min-h-[160px]">
                <h4 className="font-semibold text-neutralDark mb-2">{m.title}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{m.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


