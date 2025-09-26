'use client';

import { UsersIcon } from './Icons';
import Image from 'next/image';
import imagesData from '../../public/images/visuals/images.json';

export default function TrustSection() {
  const teamCredentials = [
    {
      title: "Trade & Finance Expertise",
      description: "Former executives from major trade finance institutions. 15+ years in cross-border payments and risk management.",
      credentials: "Ex-Citi Trade Finance, Ex-HSBC Global Trade"
    },
    {
      title: "Logistics & Supply Chain",
      description: "Built logistics networks across Central Asia. Former DHL, FedEx operations leads with deep customs expertise.",
      credentials: "Ex-DHL Operations, Ex-FedEx Customs"
    },
    {
      title: "Technology & Platform",
      description: "Scaled B2B marketplaces to $100M+ GMV. Built payment infrastructure for 50+ countries.",
      credentials: "Ex-Alibaba B2B, Ex-Stripe International"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutralDark mb-6 leading-tight">
            Built by Trade, Fintech, and Logistics Folks
          </h2>
          <p className="text-xl text-neutralGray max-w-3xl mx-auto">
            Our team combines deep expertise in international trade, technology, and regional markets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {teamCredentials.map((member, index) => (
            <div key={index} className="text-center p-6 bg-neutralLight rounded-xl relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-5">
                <Image
                  src={`/images/visuals/${imagesData[3].file}`}
                  alt={imagesData[3].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-800">
                  <UsersIcon />
                </div>
                <h3 className="text-xl font-heading font-bold text-neutralDark mb-2">
                  {member.title}
                </h3>
                <p className="text-primary font-semibold mb-3 text-base">
                  {member.credentials}
                </p>
                <p className="text-neutralGray text-base leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Early Access CTA */}
        <div className="bg-gradient-to-r from-primary to-supportive rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-heading font-bold mb-4">
            Join the Early Access Program
          </h3>
          <p className="text-white/80 text-sm mb-6 max-w-2xl mx-auto">No fees, no spam.</p>
          <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-md font-semibold text-lg transition-all duration-300">
            Get Early Access
          </button>
        </div>
      </div>
    </section>
  );
}