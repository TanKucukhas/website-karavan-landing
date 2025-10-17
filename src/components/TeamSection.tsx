"use client";

// Light version without emojis
import teamData from '../../public/images/team/team.json'
import { useTranslations } from 'next-intl'

export default function TeamSection() {
  const t = useTranslations('team')
  const expertise = [
    {
      title: t('expertise.tradeFinance.title'),
      description: t('expertise.tradeFinance.description')
    },
    {
      title: t('expertise.logisticsSupply.title'),
      description: t('expertise.logisticsSupply.description')
    },
    {
      title: t('expertise.technologyInnovation.title'),
      description: t('expertise.technologyInnovation.description')
    }
  ];

  return (
    <section className="lt-section">
      <div className="lt-container">
        <div className="text-center mb-14">
          <h2 className="lt-heading mb-4">{t('heading')}</h2>
          <p className="lt-subtext">{t('subheading')}</p>
        </div>

        {/* Expertise Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {expertise.map((area, index) => (
            <div key={index} className="lt-card p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-5">{area.description}</p>
              <span className="lt-badge">{t('expertise.badge')}</span>
            </div>
          ))}
        </div>

        {/* Leadership Team (from JSON) */}
        <div className="text-center mb-8 animate-on-scroll">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('leadership.heading')}</h3>
          <p className="text-gray-700">{t('leadership.subheading')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {teamData.slice(0,4).map((member: { name: string; title: string; linkedin: string; image: string }, idx: number) => (
            <div
              key={idx}
              className="text-center animate-on-scroll"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100 ring-1 ring-gray-200 relative z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`/images/team/optimized/${member.image.replace('.webp', '-128w.webp')}`} 
                  alt={member.name} 
                  width="128" 
                  height="128" 
                  className="object-cover object-top w-full h-full" 
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{member.name}</h4>
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={`/images/team/optimized/${member.image.replace('.webp', '-96w.webp')}`} 
                      alt={member.name} 
                      width="96" 
                      height="96" 
                      className="object-cover object-top w-full h-full" 
                      loading="lazy"
                      decoding="async"
                    />
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
            <h4 className="text-lg font-semibold text-gray-900 mb-1.5">{t('values.globalPerspective.title')}</h4>
            <p className="text-gray-700 text-sm">{t('values.globalPerspective.description')}</p>
          </div>
          <div className="lt-card p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-1.5">{t('values.innovationFirst.title')}</h4>
            <p className="text-gray-700 text-sm">{t('values.innovationFirst.description')}</p>
          </div>
          <div className="lt-card p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-1.5">{t('values.partnershipFocus.title')}</h4>
            <p className="text-gray-700 text-sm">{t('values.partnershipFocus.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
