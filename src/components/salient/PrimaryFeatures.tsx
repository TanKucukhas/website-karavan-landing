import { Container } from '@/components/salient/Container'

const features = [
  {
    name: 'Escrow & Dispute Handling',
    description: 'Secure payments held in escrow until delivery confirmation. Automated dispute resolution system.',
    icon: '🛡️',
  },
  {
    name: 'Logistics & Customs',
    description: 'End-to-end logistics coordination with customs clearance and documentation support.',
    icon: '🚚',
  },
  {
    name: 'Verified Suppliers',
    description: 'Comprehensive verification system with business credentials, certifications, and trade history.',
    icon: '✅',
  },
  {
    name: 'Financing & Insurance',
    description: 'Integrated trade finance solutions and comprehensive insurance coverage for all transactions.',
    icon: '💰',
  },
]

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for building a website"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Everything you need for cross-border trade
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Karavan provides integrated solutions that address every aspect of 
            international B2B trade between Turkey and Central Asia.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2"
        >
          {features.map((feature) => (
            <li key={feature.name} className="flex gap-x-4">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-blue-600">
                <span className="text-xl">{feature.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{feature.name}</h3>
                <p className="mt-2 text-slate-600">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}