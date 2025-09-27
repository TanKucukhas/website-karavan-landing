import { Button } from '@/components/catalyst/button'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="lt-section animate-on-scroll scroll-mt-24">
      <div className="lt-container">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2">
            <h2 className="lt-heading mb-4">About Karavan</h2>
            {/* Brand mark before intro text */}
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex h-10 w-10 rounded-lg bg-brand-600 items-center justify-center">
                <Image alt="Karavan" src="/images/logo/karavan-logo-square.svg" width={24} height={24} />
              </span>
              <span className="text-sm font-semibold text-brand-600">Karavan</span>
            </div>
            <p className="lt-subtext mb-6">
              Karavan connects verified Turkish exporters with qualified buyers across Central Asia. We orchestrate trust, payments,
              logistics, and compliance end‑to‑end so businesses can trade confidently and at speed.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-800">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-600" /> Verified suppliers & audit trails</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-600" /> Escrow payments & dispute resolution</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-600" /> Door‑to‑door logistics coordination</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-600" /> Automated customs & compliance</li>
            </ul>
          </div>
          <div className="lg:col-span-1">
            <div className="lt-card p-6 text-center sticky top-24">
              <div className="font-semibold text-gray-900 mb-2">Join the Pilot</div>
              <p className="text-gray-700 mb-4">Be among the first to access our secure B2B trade platform.</p>
              <Button color="blue" className="w-full" href="#cta">Get Early Access</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
