import { ShieldIcon, TruckIcon, StoreIcon, MoneyIcon, ArrowRightIcon } from './Icons';

export default function FeaturesSection() {
  const features = [
    {
      title: "Escrow & Dispute Handling",
      description: "Funds locked until delivery. ISO 27001 stack. 24–72h dispute SLA.",
      icon: ShieldIcon,
      color: "bg-primary"
    },
    {
      title: "Logistics & Customs",
      description: "Door-to-door quotes. HS code help. Export paperwork handled.",
      icon: TruckIcon,
      color: "bg-supportive"
    },
    {
      title: "Verified Suppliers",
      description: "KYC, trade history, and factory checks where available.",
      icon: StoreIcon,
      color: "bg-secondaryAccent"
    },
    {
      title: "Financing",
      description: "PO financing and insured invoices for qualified buyers.",
      icon: MoneyIcon,
      color: "bg-accent"
    }
  ];

  return (
    <section id="features" className="py-20 bg-neutralLight">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutralDark mb-6 leading-tight">
            Key Features of Karavan
          </h2>
          <p className="text-xl text-neutralGray max-w-3xl mx-auto">
            Secure B2B platform for cross-border trade with escrow, logistics and customs support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-primary/10 text-primary`}>
                  <IconComponent />
                </div>
                <h3 className="text-xl font-heading font-bold text-neutralDark mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <p className="text-neutralGray text-sm mt-2">
                  {index === 0 && '24–72h dispute SLA'}
                  {index === 1 && 'HS code help, e-CMR'}
                  {index === 2 && 'KYB/KYC verification'}
                  {index === 3 && 'PO financing for qualified buyers'}
                </p>
                <div className="mt-4">
                  <button className="text-primary hover:text-accent transition-colors duration-300 text-sm font-medium flex items-center">
                    Learn more
                    <ArrowRightIcon className="w-4 h-4 ml-1" size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}