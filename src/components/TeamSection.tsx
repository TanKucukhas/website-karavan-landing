import Emoji from '@/components/Emoji'
import Image from 'next/image'

export default function TeamSection() {
  const expertise = [
    {
      icon: <Emoji symbol="💼" label="Briefcase" size={28} />, 
      title: 'Trade & Finance',
      description: 'Deep expertise in international trade, finance, and cross-border payments with 20+ years combined experience.',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      icon: <Emoji symbol="🚚" label="Logistics" size={28} />, 
      title: 'Logistics & Supply Chain',
      description: 'Comprehensive knowledge of logistics, customs, and supply chain management across Central Asia.',
      color: 'bg-green-100 text-green-800'
    },
    {
      icon: <Emoji symbol="💻" label="Tech" size={28} />, 
      title: 'Technology & Innovation',
      description: 'Cutting-edge technology solutions with AI, blockchain, and modern web technologies.',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const teamStats = [
    { number: '10+', label: 'Team Members' },
    { number: '50+', label: 'Years Experience' },
    { number: '5', label: 'Countries Covered' },
    { number: '100%', label: 'Bilingual Team' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Team & Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team brings together deep expertise in trade, logistics, 
            and technology to build the future of B2B commerce.
          </p>
        </div>

        {/* Expertise Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {expertise.map((area, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-5xl mb-6">{area.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {area.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {area.description}
              </p>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${area.color}`}>
                Core Expertise
              </span>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-16">
          <div className="text-center text-white mb-8">
            <h3 className="text-2xl font-bold mb-2">Our Team in Numbers</h3>
            <p className="text-blue-100">Diverse expertise driving innovation</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team (from JSON) */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Leadership Team</h3>
            <p className="text-gray-600">Experienced leaders with proven track records in international trade and technology</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {require('../../public/images/team/team.json').map((member: any, idx: number) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100 ring-1 ring-gray-200 relative z-0">
                  <Image src={`/images/team/${member.image}`} alt={member.name} width={112} height={112} className="w-28 h-28 object-cover object-top" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{member.title}</p>
                {member.linkedin && (
                  <a href={member.linkedin} className="text-primary-600 text-sm" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Company Values */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4"><Emoji symbol="🌍" label="Globe" size={28} /></div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Global Perspective</h4>
            <p className="text-gray-600 text-sm">
              Understanding of international markets and cultural nuances
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4"><Emoji symbol="🚀" label="Rocket" size={28} /></div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Innovation First</h4>
            <p className="text-gray-600 text-sm">
              Cutting-edge technology solutions for modern trade challenges
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4"><Emoji symbol="🤝" label="Handshake" size={28} /></div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Partnership Focus</h4>
            <p className="text-gray-600 text-sm">
              Building strong relationships with all stakeholders
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
