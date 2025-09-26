import { Container } from '@/components/salient/Container'
import { Logo } from '@/components/salient/Logo'

const navigation = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'Guides', href: '/guides' },
    { name: 'API Reference', href: '/api' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

export function Footer() {
  return (
    <footer className="mt-32 border-t border-slate-200">
      <Container>
        <div className="flex flex-col items-baseline space-y-6 py-10 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6 sm:py-16">
          <Logo />
          <p className="text-sm text-slate-600">
            © 2024 Karavan. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col space-y-6 border-t border-slate-200 py-10 sm:flex-row sm:space-y-0 sm:space-x-8">
          {Object.entries(navigation).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-slate-900 capitalize">
                {category}
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-slate-900"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  )
}