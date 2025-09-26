import { LinkedinLogoIcon, InstagramLogoIcon, YoutubeLogoIcon, FacebookLogoIcon } from './Icons';
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-heading font-bold mb-4">Karavan</h3>
            <p className="text-neutralGray mb-6 max-w-md">
              B2B marketplace with escrow, logistics and verified suppliers for the Turkic World.
            </p>
            <div className="space-y-2 text-sm text-neutralGray">
              <p>Karavan Inc.</p>
              <p>Registered in Turkey</p>
              <p>Tax ID: 1234567890</p>
              <p>contact@karavan.com</p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="/gdpr" className="hover:text-white transition-colors">GDPR Compliance</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/status" className="hover:text-white transition-colors">System Status</a></li>
              <li><a href="/security" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutralGray pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutralGray text-sm">
              © {currentYear} Karavan Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://www.linkedin.com/company/karavanofficial" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <LinkedinLogoIcon className="w-5 h-5" size={20} weight="fill" />
              </a>
              <a href="https://instagram.com/karavanconnect" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <InstagramLogoIcon className="w-5 h-5" size={20} weight="fill" />
              </a>
              <a href="https://www.youtube.com/@KaravanGlobal" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <YoutubeLogoIcon className="w-5 h-5" size={20} weight="fill" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61581111225391" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FacebookLogoIcon className="w-5 h-5" size={20} weight="fill" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}