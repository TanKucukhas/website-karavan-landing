import { Button } from '@/components/catalyst/button'
import { Container } from '@/components/salient/Container'

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    href: '/register',
    priceMonthly: 'Free',
    description: 'Perfect for small businesses getting started with cross-border trade.',
    features: [
      'Up to 5 listings',
      'Basic verification',
      'Standard support',
      'Basic analytics',
    ],
    featured: false,
  },
  {
    name: 'Professional',
    id: 'tier-professional',
    href: '/register',
    priceMonthly: '$99',
    description: 'Advanced features for growing businesses with higher transaction volumes.',
    features: [
      'Unlimited listings',
      'Advanced verification',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'API access',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '/contact',
    priceMonthly: 'Custom',
    description: 'Tailored solutions for large enterprises with complex trade requirements.',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'White-label solution',
      'Advanced compliance tools',
      '24/7 phone support',
    ],
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" aria-label="Pricing" className="py-20 sm:py-32 bg-slate-50">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Choose the plan that works best for your business needs.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl border p-8 ${
                tier.featured
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <h3 className={`text-lg font-semibold ${tier.featured ? 'text-white' : 'text-slate-900'}`}>
                {tier.name}
              </h3>
              <p className={`mt-4 text-sm ${tier.featured ? 'text-blue-100' : 'text-slate-600'}`}>
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className={`text-4xl font-bold ${tier.featured ? 'text-white' : 'text-slate-900'}`}>
                  {tier.priceMonthly}
                </span>
                {tier.priceMonthly !== 'Free' && tier.priceMonthly !== 'Custom' && (
                  <span className={`text-sm ${tier.featured ? 'text-blue-100' : 'text-slate-600'}`}>
                    /month
                  </span>
                )}
              </p>
              <Button
                href={tier.href}
                color={tier.featured ? 'white' : 'blue'}
                outline={!tier.featured}
                className="mt-6 w-full"
              >
                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
              <ul
                role="list"
                className={`mt-8 space-y-3 text-sm ${
                  tier.featured ? 'text-blue-100' : 'text-slate-600'
                }`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <svg
                      className={`h-6 w-5 flex-none ${
                        tier.featured ? 'text-white' : 'text-blue-600'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}