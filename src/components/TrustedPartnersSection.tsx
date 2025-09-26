import Image from 'next/image'

export default function TrustedPartnersSection() {
  const partners = require('../../public/images/solution-partners/partners.json')
  return (
    <section className="py-20 bg-white" id="partners">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted Partners</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">An ecosystem of payment, logistics and compliance partners.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((p: any, idx: number) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="flex items-center justify-center">
                <Image src={p.logo} alt={p.name} width={140} height={40} className="h-10 w-auto object-contain" />
              </div>
              {p.description && (
                <div className="mt-2 text-xs text-gray-500">{p.description}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          <div className="bg-primary-600 rounded-xl p-6 text-white text-center">
            <div className="text-3xl font-bold">2.5M</div>
            <div className="text-primary-100">Companies Connected</div>
          </div>
          <div className="bg-primary-600 rounded-xl p-6 text-white text-center">
            <div className="text-3xl font-bold">6</div>
            <div className="text-primary-100">Chambers Engaged</div>
          </div>
        </div>
      </div>
    </section>
  )
}


