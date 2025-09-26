import { TextileIcon, AgricultureIcon, MachineryIcon, ConstructionIcon, TechnologyIcon, LogisticsIcon, PlusIcon } from './Icons';

export default function CategoriesSection() {
  const categories = [
    {
      name: "Textile & Apparel",
      icon: TextileIcon,
      description: "Fashion, textiles, and clothing"
    },
    {
      name: "Agriculture & Food",
      icon: AgricultureIcon,
      description: "Fresh produce, processed foods"
    },
    {
      name: "Machinery & Industrial",
      icon: MachineryIcon,
      description: "Equipment, tools, machinery"
    },
    {
      name: "Construction Materials",
      icon: ConstructionIcon,
      description: "Building materials, supplies"
    },
    {
      name: "Technology & Electronics",
      icon: TechnologyIcon,
      description: "Electronics, components, tech"
    },
    {
      name: "Logistics & Services",
      icon: LogisticsIcon,
      description: "Transport, warehousing, services"
    }
  ];

  return (
    <section id="categories" className="py-20 bg-neutralLight">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutralDark mb-6 leading-tight">
            Diverse Marketplace Categories
          </h2>
          <p className="text-xl text-neutralGray max-w-3xl mx-auto">
            From traditional industries to modern technology, we support businesses across all sectors.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <div className="w-14 h-14 rounded-lg bg-gray-100 text-blue-600 flex items-center justify-center p-4">
                    <IconComponent />
                  </div>
                </div>
                <h3 className="font-semibold text-neutralDark mb-2 text-sm">
                  {category.name}
                </h3>
                <p className="text-xs text-neutralGray">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Request Category */}
        <div className="text-center">
          <div className="bg-white rounded-xl p-6 max-w-xl mx-auto border border-neutralLight hover:border-primary transition-colors duration-300">
            <div className="text-neutralGray mb-4">
              <PlusIcon className="w-12 h-12 mx-auto" size={48} />
            </div>
            <h3 className="font-semibold text-neutralDark mb-2">
              Request a Category
            </h3>
            <p className="text-neutralGray text-sm mb-4">
              Don&apos;t see your industry? We&apos;re constantly expanding our coverage.
            </p>
            <form className="flex items-center justify-center gap-2">
              <input type="text" placeholder="Category name" className="px-3 py-2 border border-neutralGray rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent w-48" />
              <input type="email" placeholder="Your email" className="px-3 py-2 border border-neutralGray rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent w-56" />
              <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300">Send</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}