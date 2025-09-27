import Image from 'next/image'
import partnersData from '../../public/images/solution-partners/partners.json'

export default function TrustedPartnersSection() {
  const partners = partnersData
  return (
    <section className="lt-section" id="partners">
      <div className="lt-container">
        <div className="text-center mb-12">
          <h2 className="lt-heading mb-4">Trusted Partners</h2>
          <p className="lt-subtext">Backed by trusted global partners across payments, logistics and compliance.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-8 items-center">
          {partners.map((p: { name: string; logo: string; description: string }, idx: number) => {
            const isTcci = p.name?.toLowerCase?.() === 'tcci';
            const width = isTcci ? 200 : 140;
            const height = isTcci ? 70 : 40;
            const hClass = isTcci ? 'h-16' : 'h-12';
            return (
              <div key={idx} className="text-center">
                <Image 
                  src={p.logo} 
                  alt={p.name} 
                  width={width} 
                  height={height} 
                  className={`${hClass} w-auto object-contain mx-auto grayscale hover:grayscale-0 transition-all duration-300`} 
                />
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          <div className="lt-card p-6 text-center">
            <div className="text-3xl font-bold text-brand-600">2.5M</div>
            <div className="text-gray-700">Companies Connected</div>
          </div>
          <div className="lt-card p-6 text-center">
            <div className="text-3xl font-bold text-brand-600">6</div>
            <div className="text-gray-700">Chambers Engaged</div>
          </div>
        </div>
      </div>
    </section>
  )
}
