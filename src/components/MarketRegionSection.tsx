export default function MarketRegionSection() {
  const dataTiles = [
    {
      title: "Total Addressable Exporters",
      value: "2,500+",
      description: "Verified suppliers across Turkic States",
      color: "bg-primary"
    },
    // Remove unproven metric tile
    {
      title: "Languages Supported",
      value: "6",
      description: "Turkish, Kazakh, Uzbek, Azerbaijani, Kyrgyz, Turkmen",
      color: "bg-supportive"
    },
    {
      title: "Pilot Cohorts",
      value: "150+",
      description: "Suppliers onboarded, 500+ RFQs processed",
      color: "bg-secondaryAccent"
    }
  ];

  const turkicStates = [
    { name: "Turkey", flag: "🇹🇷", population: "84M", status: 'core' },
    { name: "Uzbekistan", flag: "🇺🇿", population: "35M", status: 'core' },
    { name: "Kazakhstan", flag: "🇰🇿", population: "19M", status: 'expanding' },
    { name: "Azerbaijan", flag: "🇦🇿", population: "10M", status: 'expanding' },
    { name: "Kyrgyzstan", flag: "🇰🇬", population: "7M", status: 'expanding' },
    { name: "Turkmenistan", flag: "🇹🇲", population: "6M", status: 'expanding' }
  ];

  return (
    <section id="regions" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutralDark mb-6 leading-tight">
            Secure B2B Trade in Turkey and Uzbekistan
          </h2>
          <p className="text-xl text-neutralGray max-w-3xl mx-auto">
            Launching first in TR & UZ. Expanding to KZ, AZ, KG, TM.
          </p>
        </div>

        {/* Data Tiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {dataTiles.map((tile, index) => (
            <div key={index} className="bg-neutralLight rounded-xl p-6 text-center min-h-[200px] flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className={`w-16 h-16 ${tile.color} rounded-lg flex items-center justify-center text-white mx-auto mb-4 overflow-hidden`}>
                <span className="text-xl font-bold leading-tight truncate max-w-full px-1">{tile.value}</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-neutralDark mb-2 leading-tight break-words">
                  {tile.title}
                </h3>
                <p className="text-neutralGray text-sm leading-relaxed break-words">
                  {tile.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Countries List */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-heading font-bold text-neutralDark mb-8 text-center">
            Our Core Markets
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
            {turkicStates.map((state, index) => (
              <div key={index} className={`bg-white border ${state.status === 'core' ? 'border-primary' : 'border-neutralLight'} rounded-lg p-5 text-center hover:shadow-md transition-all duration-300 ${state.status === 'core' ? '' : 'opacity-70'}`}>
                <div className="text-3xl w-10 h-10 mx-auto mb-2 flex items-center justify-center">{state.flag}</div>
                <h4 className="font-medium text-neutralDark text-sm mb-1">{state.name}</h4>
                <p className="text-neutralGray text-xs flex items-center justify-center gap-2">
                  {state.population} Population
                  {state.status === 'expanding' && (
                    <span className="inline-block text-[10px] px-2 py-0.5 bg-neutralLight rounded-full">Expanding</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}