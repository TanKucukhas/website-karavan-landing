"use client";

// Light version without emojis
import Image from 'next/image'
import teamData from '../../public/images/team/team.json'
import CountUp from '@/components/CountUp'

export default function TeamSection() {
  const expertise = [
    {
      title: 'Trade & Finance',
      description: 'Deep expertise in international trade, finance, and cross-border payments with 20+ years combined experience.'
    },
    {
      title: 'Logistics & Supply Chain',
      description: 'Comprehensive knowledge of logistics, customs, and supply chain management across Central Asia.'
    },
    {
      title: 'Technology & Innovation',
      description: 'Cutting-edge technology solutions with AI, blockchain, and modern web technologies.'
    }
  ];

  const teamStats = [
    { number: '10+', label: 'Team Members' },
    { number: '50+', label: 'Years Experience' },
    { number: '5', label: 'Countries Covered' },
    { number: '100%', label: 'Bilingual Team' }
  ];

  return (
    <section className="lt-section">
      <div className="lt-container">
        <div className="text-center mb-14">
          <h2 className="lt-heading mb-4">Team & Expertise</h2>
          <p className="lt-subtext">Our diverse team brings together deep expertise in trade, logistics, and technology to build the future of B2B commerce.</p>
        </div>

        {/* Expertise Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {expertise.map((area, index) => (
            <div key={index} className="lt-card p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-5">{area.description}</p>
              <span className="lt-badge">Core Expertise</span>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="lt-card p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Team in Numbers</h3>
            <p className="text-gray-700">Diverse expertise driving innovation</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => {
              const m = stat.number.match(/^([0-9]+(?:\.[0-9]+)?)(.*)$/)
              const num = m ? parseFloat(m[1]) : 0
              const suffix = m ? m[2] : ''
              const decimals = m && m[1].includes('.') ? 1 : undefined
              return (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-brand-600 mb-1"><CountUp end={num} decimals={decimals as any} suffix={suffix} /></div>
                  <div className="text-gray-700 text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Leadership Team (from JSON) */}
        <div className="text-center mb-8 animate-on-scroll">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Core Leadership</h3>
          <p className="text-gray-700">Experienced leaders with proven track records in international trade and technology</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {teamData.slice(0,4).map((member: { name: string; title: string; linkedin: string; image: string }, idx: number) => (
            <div
              key={idx}
              className="text-center animate-on-scroll"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100 ring-1 ring-gray-200 relative z-0">
                <Image src={`/images/team/${member.image}`} alt={member.name} width={128} height={128} className="w-32 h-32 object-cover object-top" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{member.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{member.title}</p>
              {member.linkedin && (
                <a href={member.linkedin} className="text-brand-600 text-sm" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              )}
            </div>
          ))}
        </div>

        {/* Advisors & Specialists */}
        {teamData.length > 4 && (
          <>
            <div className="text-center mt-12 mb-6">
              <h4 className="text-lg font-semibold text-gray-900">Advisors & Specialists</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {teamData.slice(4,12).map((member: { name: string; title: string; linkedin: string; image: string }, idx: number) => (
                <div key={idx} className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 bg-gray-100 ring-1 ring-gray-200">
                    <Image src={`/images/team/${member.image}`} alt={member.name} width={96} height={96} className="w-24 h-24 object-cover object-top" />
                  </div>
                  <h5 className="font-medium text-gray-900 text-sm">{member.name}</h5>
                  <p className="text-xs text-gray-600">{member.title}</p>
                </div>
              ))}
            </div>
            {/* See full team link removed per request */}
          </>
        )}

        {/* Company Values */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-8">
          <div className="lt-card p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-1.5">Global Perspective</h4>
            <p className="text-gray-700 text-sm">Understanding of international markets and cultural nuances</p>
          </div>
          <div className="lt-card p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-1.5">Innovation First</h4>
            <p className="text-gray-700 text-sm">Cutting-edge technology solutions for modern trade challenges</p>
          </div>
          <div className="lt-card p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-1.5">Partnership Focus</h4>
            <p className="text-gray-700 text-sm">Building strong relationships with all stakeholders</p>
          </div>
        </div>
      </div>
    </section>
  );
}
