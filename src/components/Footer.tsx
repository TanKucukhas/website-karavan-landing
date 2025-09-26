import { LinkedinLogoIcon, InstagramLogoIcon, YoutubeLogoIcon, FacebookLogoIcon } from './Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-brand-ink">
      {/* Layer 1: Value + CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-2xl border border-neutralLight bg-brand-bg p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-[var(--text-h2)] leading-[var(--leading-h2)] font-bold mb-3">
              Secure cross-border B2B trade with escrow, logistics and finance.
            </h3>
            <p className="text-muted-ink">No membership or transaction fees. Pay only for services you use.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#contact" className="btn btn-primary">Get Early Access</a>
            <a href="/buyer" className="btn btn-ghost">I’m a Buyer</a>
          </div>
        </div>
      </div>

      {/* Layer 2: 4 columns + social */}
      <div className="border-t border-neutralLight">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-ink">
                <li><a href="#features" className="hover:text-brand-ink transition-colors">Features</a></li>
                <li><a href="/seller" className="hover:text-brand-ink transition-colors">For Sellers</a></li>
                <li><a href="/buyer" className="hover:text-brand-ink transition-colors">For Buyers</a></li>
                <li><a href="#categories" className="hover:text-brand-ink transition-colors">Categories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-ink">
                <li><a href="#solutions" className="hover:text-brand-ink transition-colors">Escrow Payments</a></li>
                <li><a href="#solutions" className="hover:text-brand-ink transition-colors">Logistics & Customs</a></li>
                <li><a href="#solutions" className="hover:text-brand-ink transition-colors">Verified Suppliers</a></li>
                <li><a href="#solutions" className="hover:text-brand-ink transition-colors">Trade Finance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-ink">
                <li><a href="/about" className="hover:text-brand-ink transition-colors">About</a></li>
                <li><a href="/contact" className="hover:text-brand-ink transition-colors">Contact</a></li>
                <li><a href="/regions" className="hover:text-brand-ink transition-colors">Regions</a></li>
                <li><a href="/status" className="hover:text-brand-ink transition-colors">System Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-ink">
                <li><a href="/privacy" className="hover:text-brand-ink transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-brand-ink transition-colors">Terms of Service</a></li>
                <li><a href="/cookies" className="hover:text-brand-ink transition-colors">Cookie Policy</a></li>
                <li><a href="/gdpr" className="hover:text-brand-ink transition-colors">GDPR / KVKK</a></li>
              </ul>
              <div className="flex gap-4 mt-6">
                <a href="https://www.linkedin.com/company/karavanofficial" target="_blank" rel="noopener noreferrer" className="text-muted-ink hover:text-brand-ink transition-colors">
                  <LinkedinLogoIcon className="w-5 h-5" size={20} weight="fill" />
                </a>
                <a href="https://instagram.com/karavanconnect" target="_blank" rel="noopener noreferrer" className="text-muted-ink hover:text-brand-ink transition-colors">
                  <InstagramLogoIcon className="w-5 h-5" size={20} weight="fill" />
                </a>
                <a href="https://www.youtube.com/@KaravanGlobal" target="_blank" rel="noopener noreferrer" className="text-muted-ink hover:text-brand-ink transition-colors">
                  <YoutubeLogoIcon className="w-5 h-5" size={20} weight="fill" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61581111225391" target="_blank" rel="noopener noreferrer" className="text-muted-ink hover:text-brand-ink transition-colors">
                  <FacebookLogoIcon className="w-5 h-5" size={20} weight="fill" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3: Copyright + GDPR + Language */}
      <div className="border-t border-neutralLight">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-ink">© {currentYear} Karavan Inc. All rights reserved.</p>
          <p className="text-sm text-muted-ink">We obtain explicit consent in compliance with KVKK/GDPR.</p>
          <label className="text-sm text-muted-ink inline-flex items-center gap-2">
            <span>Language</span>
            <select className="input sm:w-auto">
              <option>EN</option>
              <option>TR</option>
              <option>RU</option>
            </select>
          </label>
        </div>
      </div>
    </footer>
  );
}