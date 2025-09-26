import { WarningIcon, ShieldIcon } from './Icons';

export default function ProblemSolutionSection() {
  const problemSolutions = [
    {
      problem: "Trust & Payment Risks",
      solution: "Escrow & KYC",
      description: "SLA-backed delivery with licensed partners. Funds held until acceptance."
    },
    {
      problem: "Cross-border Payments",
      solution: "Multi-rail Settlement",
      description: "Local rails, FX rates, and compliance workflows for cross-border trade."
    },
    {
      problem: "Logistics Complexity",
      solution: "Carrier & Customs Partners",
      description: "Door-to-door logistics, HS code help, and customs documentation support."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutralDark mb-6 leading-tight">
            From Challenges to Confident Trade
          </h2>
          <p className="text-xl text-neutralGray max-w-3xl mx-auto">
            How Karavan Removes Friction
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {problemSolutions.map((item, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-6 items-center p-6 bg-neutralLight rounded-xl">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-blue-600">
                      <WarningIcon />
                    </div>
                    <h3 className="text-lg font-semibold text-neutralDark">{item.problem}</h3>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-neutralGray">→</div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-gray-800">
                        <ShieldIcon />
                      </div>
                      <h4 className="text-lg font-semibold text-primary">{item.solution}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-neutralGray italic">
              Backed by partners in TR & UZ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}