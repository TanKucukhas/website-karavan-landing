export default function PartnershipsSection() {
  const metrics = [
    { value: '2.5M', label: 'Companies' },
    { value: '6', label: 'Chambers Engaged' },
  ]

  const partners = ['TCCI', 'TOBB', 'Chambers', 'Navlungo', 'Stripe', 'PayPorter']

  return (
    <section className="py-20 bg-gray-50" id="partnerships">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Partnerships</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Highlighting chambers and partners enabling trusted cross-border trade.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 space-y-3">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-3xl font-bold text-primary-600">{m.value}</div>
                <div className="text-gray-600">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {partners.map((p, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center border border-gray-200">
                <div className="text-lg font-semibold text-gray-900">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


