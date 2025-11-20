/**
 * About Page
 * Company information, team, and media kit
 * Design inspired by Stripe's About Stripe page
 */

import { companyInfo } from "@/lib/newsroom/dummyData";
import qrContacts from "@/data/qr-contacts.json";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  // Group team members by department
  const founders = qrContacts.filter(m => m.department === "Founders");
  const executives = qrContacts.filter(m => m.department === "Executive Leadership");
  const productOps = qrContacts.filter(m => m.department === "Product, Operations & Partnerships");
  const specialists = qrContacts.filter(m => m.department === "Specialists");
  const advisory = qrContacts.filter(m => m.department === "Advisory");

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        {/* Header with accent line */}
        <div className="mb-16">
          <div className="h-1 w-24 bg-brand-600 mb-8"></div>
          <h1 className="text-4xl lg:text-5xl font-bold text-ink mb-8 max-w-3xl">
            About Karavan
          </h1>
        </div>

        {/* Introduction Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Description */}
            <div>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                {companyInfo.description}
              </p>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                  <strong className="text-gray-700">Main Address:</strong><br />
                  İçerenköy Mh. Karaman Çiftlik Yolu Cd. N:47<br />
                  Kar Plaza E Blok Kat:8<br />
                  Ataşehir, İstanbul 34752 Türkiye
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">Founded:</strong> {companyInfo.founded}
                </p>
              </div>
            </div>

            {/* Right: Logo */}
            <div className="flex items-center justify-center p-12 lg:p-16">
              <div className="w-full max-w-md">
                <Image
                  src="/karvan-press-kit/karavan-logo-brand-blue.png"
                  alt="Karavan Logo"
                  width={400}
                  height={115}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20 border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-bold text-ink mb-6">
            {companyInfo.mission}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
            By unifying trust, logistics, finance, and payments in a single ecosystem, Karavan reduces friction, eliminates risk, and unlocks new market access for businesses across Türkiye and Central Asia.
          </p>
        </section>

        {/* What Karavan Does */}
        <section className="mb-20 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold text-ink mb-8">What Karavan Does</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Karavan connects verified exporters and buyers with a fully integrated trade infrastructure:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Verified Suppliers & KYB/KYC",
              "Secure Payments & Insurance",
              "End-to-end Logistics & Customs",
              "Trade Finance & Credit Facilities",
              "Multi-language Support",
              "Market Expansion Tools"
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="w-5 h-5 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-6">
            From textiles to machinery and agricultural goods, Karavan supports every part of the B2B export workflow.
          </p>
        </section>

        {/* Fast Facts */}
        <section className="mb-20 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold text-ink mb-4">Fast facts</h2>
          <p className="text-sm text-gray-500 mb-8">Current pilot operations metrics</p>
          <div className="grid md:grid-cols-5 gap-8">
            {companyInfo.stats.map((stat, index) => (
              <div key={index}>
                <p className="text-3xl font-bold text-ink mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Section */}
        <section className="border-t border-gray-200 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-ink">Leadership</h2>
          </div>

          {/* All team members in one horizontal scroll */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
              {[...founders, ...executives, ...productOps, ...specialists, ...advisory].map((member) => (
                <div key={member.slug} className="flex-shrink-0 snap-start">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-[3/4] w-56 bg-gray-100 overflow-hidden">
                      {member.avatarUrl ? (
                        <Image
                          src={member.avatarUrl}
                          alt={member.displayName}
                          width={224}
                          height={298}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200">
                          <span className="text-5xl font-bold text-brand-600">
                            {member.firstName[0]}{member.lastName[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-white">
                      <h4 className="font-semibold text-ink text-sm mb-1">
                        {member.displayName}
                      </h4>
                      <p className="text-xs text-gray-600">{member.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Assets */}
        <section className="mb-20 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold text-ink mb-4">Media assets</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Download official Karavan branding materials, including logo variations, platform badges, executive team photos, and product presentations. All downloadable materials follow Karavan&apos;s{" "}
            <Link href="/legal/terms-of-service" className="text-brand-600 hover:underline">
              Marks Usage Policy
            </Link>.
          </p>

          {/* Press Kit Section */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-ink mb-6">Karavan Press Kit</h3>
            <p className="text-sm text-gray-600 mb-6">
              Includes logos in SVG + PNG formats (standard, 4x, and high-resolution), symbol-only icons, README with usage guidelines, and brand color palette.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Brand Blue Logo */}
              <div className="border border-gray-200 rounded-lg p-8">
                <div className="flex items-center justify-center h-20 mb-4">
                  <Image
                    src="/karvan-press-kit/karavan-logo-brand-blue.png"
                    alt="Karavan Logo - Brand Blue"
                    width={160}
                    height={46}
                  />
                </div>
                <p className="text-xs text-gray-600 text-center font-medium">Brand Blue</p>
                <p className="text-xs text-gray-500 text-center mt-1">Light backgrounds</p>
              </div>

              {/* White Logo on Dark */}
              <div className="bg-ink rounded-lg p-8">
                <div className="flex items-center justify-center h-20 mb-4">
                  <Image
                    src="/karvan-press-kit/karavan-logo-white.png"
                    alt="Karavan Logo - White"
                    width={160}
                    height={46}
                  />
                </div>
                <p className="text-xs text-gray-300 text-center font-medium">White</p>
                <p className="text-xs text-gray-400 text-center mt-1">Dark backgrounds</p>
              </div>

              {/* Symbol Only */}
              <div className="bg-brand-600 rounded-lg p-8">
                <div className="flex items-center justify-center h-20 mb-4">
                  <Image
                    src="/karvan-press-kit/karavan-symbol-white.png"
                    alt="Karavan Symbol - White"
                    width={40}
                    height={40}
                  />
                </div>
                <p className="text-xs text-white/90 text-center font-medium">Symbol Only</p>
                <p className="text-xs text-white/70 text-center mt-1">App icons, favicons</p>
              </div>
            </div>

            {/* Available Formats Grid */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h4 className="text-sm font-semibold text-ink mb-4">Available Formats</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900 mb-2">Full Logo</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• SVG (vector, scalable)</li>
                    <li>• PNG Standard Resolution</li>
                    <li>• PNG 4x Resolution</li>
                    <li>• PNG High-Resolution (print)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-2">Symbol Only</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• PNG Brand Blue</li>
                    <li>• PNG White</li>
                  </ul>
                </div>
              </div>
            </div>

            <a
              href="/karavan-press-kit.zip"
              download
              className="inline-flex items-center px-6 py-3 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Press Kit (ZIP)
            </a>
          </div>

          {/* Media Gallery */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-ink mb-6">Media gallery</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-ink mb-2">Leadership Photos</p>
                <p className="text-sm text-gray-600 mb-3">
                  Download headshots of founders, executives, and department leads.
                </p>
                <Link href="#" className="text-sm text-brand-600 hover:underline">
                  Download Photos & Bios →
                </Link>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink mb-2">Team Photos</p>
                <p className="text-sm text-gray-600 mb-3">
                  High-resolution team photos for press, partnerships, and publications.
                </p>
                <Link href="#" className="text-sm text-brand-600 hover:underline">
                  Download Photos & Bios →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="border-t border-gray-200 pt-12">
          <div className="max-w-3xl">
            <h3 className="text-lg font-semibold text-ink mb-4">Press & Partnerships</h3>
            <p className="text-gray-600">
              For media inquiries, interviews, partnership discussions, or regional collaborations:{" "}
              <Link href="mailto:info@karavan.net" className="text-brand-600 hover:underline font-semibold">
                info@karavan.net
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
