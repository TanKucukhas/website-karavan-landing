import { Container } from '@/components/salient/Container'

const features = [
  {
    name: 'Trust & Verification',
    description: 'Comprehensive supplier verification with business credentials, certifications, and trade history tracking.',
    icon: '🛡️',
  },
  {
    name: 'Secure Payments',
    description: 'Escrow-based payment system with automated dispute resolution and multi-currency support.',
    icon: '💳',
  },
  {
    name: 'Logistics Coordination',
    description: 'End-to-end logistics management with real-time tracking and customs clearance support.',
    icon: '🚚',
  },
  {
    name: 'Customs & Compliance',
    description: 'Automated documentation and compliance management for seamless cross-border trade.',
    icon: '📋',
  },
  {
    name: 'Insurance Coverage',
    description: 'Comprehensive trade insurance covering goods in transit and transaction protection.',
    icon: '🔒',
  },
  {
    name: 'Trade Finance',
    description: 'Integrated financing solutions including letters of credit and trade credit facilities.',
    icon: '💰',
  },
]

export function SecondaryFeatures() {
  return (
    <section
      id="secondary-features"
      aria-label="Features for building a website"
      className="py-20 sm:py-32 bg-slate-50"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Integrated Solutions & Partners
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            We&apos;ve built a comprehensive ecosystem of solutions and partnerships 
            to make Turkey-Central Asia trade seamless and secure.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li key={feature.name} className="flex gap-x-4 bg-white p-6 rounded-lg shadow-sm">
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