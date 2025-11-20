/**
 * Dummy Data for Newsroom Development
 *
 * TODO: Replace with real data source once API endpoints are wired.
 * These dummy items are used during development to test layouts and functionality.
 */

import { NewsItem, StoryItem, CompanyInfo } from "./types";

export const dummyNews: NewsItem[] = [
  {
    id: "1",
    slug: "karavan-partners-tdt-tashkent-forum",
    title: "Karavan Partners with TDT at International Multimodal Transport Forum in Tashkent",
    category: "launch",
    date: "2025-11-12",
    summary: "At the Turkic States Organization (TDT) International Multimodal Transport Forum held in Tashkent, Karavan signed a strategic cooperation agreement with TDT member logistic centres and the Turkish Trade & Industry Chambers Union (TCCI), positioning itself for expanded B2B opportunities across the Central Asian-Eurasian logistics corridor.",
    content: `In Tashkent, Uzbekistan, the TDT International Multimodal Transport Forum brought together senior transport ministers, logistics firm executives and infrastructure financiers from member states. The event was hosted by Uzbekistan's Minister of Transport, Ilham Mahkamov, and attended by TDT Secretary-General Kubanıçbek Ömüraliyev and TDT Elders Council Chair Binali Yıldırım.

During his address, Mahkamov emphasised the growing geopolitical significance of the TDT member states as "a major transit node between east–west and north–south" and underlined the region's multimodal transport potential. Meanwhile, Yıldırım called out tariff barriers, routing inefficiencies and non-tariff costs as major bottlenecks to scaling the Orta Koridor (Middle Corridor) and Zengezur Corridor transport routes.

In a key move, Karavan – as one of the Turkish firm participants – signed a cooperative memorandum with TDT Logistics Centres and the TCCI to jointly develop logistics infrastructure, multimodal freight operations and cross-border transport solutions. Karavan Founder & Chairman İslam Şakbandarov stated: "This forum underlines our commitment to leverage Karavan's regional footprint and the Orta Koridor's untapped potential for scalable logistics ecosystems."

Looking ahead, the forum participants identified an ambitious shift: raising annual freight volumes from under 5 million tons today to as high as 20 million tons within the next five years for the corridor region.

---

**"Transport is no longer just transit – it's the growth engine for trade between east and west."** — Binali Yıldırım`,
    thumbnailUrl: "/images/newsroom/tdt-forum-main-hq.jpg",
    featured: true,
    author: "Karavan Team",
    tags: ["partnership", "TDT", "logistics", "Central Asia"],
  },
  {
    id: "1b",
    slug: "ozbekistan-tdt-uluslararasi-cok-modlu-tasimacilik-forumu",
    title: "Özbekistan'da TDT Uluslararası Çok Modlu Taşımacılık Forumu Düzenlendi",
    category: "launch",
    date: "2025-11-12",
    summary: "Özbekistan'ın başkenti Taşkent'te, Türk Devletleri Teşkilatı (TDT) bünyesinde gerçekleştirilen Uluslararası Çok Modlu Taşımacılık Forumu, ulaşım alanında önemli girişimlerin tartışıldığı bir platform oldu.",
    content: `**Taşkent, Özbekistan – 12 Kasım 2025** – Özbekistan'ın başkenti Taşkent'te Türk Devletleri Teşkilatı (TDT) Uluslararası Çok Modlu Taşımacılık Forumu yapıldı. TDT, Taşkent'te taşımacılığı geliştirmek için önemli adımlar atıyor ve işbirlikleri sağlıyor.

## Özbekistan Ulaştırma Bakanı'nın Açıklamaları

Foruma ev sahipliği yapan Özbekistan Ulaştırma Bakanı İlham Mahkamov, TDT'nin artan siyasi ve ekonomik etkisine dikkat çekerek, örgüt üyesi ülkelerin büyük bir potansiyele sahip olduğunu vurguladı. Mahkamov, TDT üyesi ülkelerin "doğu-batı ve kuzey-güney arasında önemli bir transit düğümü" olarak büyüyen jeopolitik önemini vurguladı ve bölgenin çok modlu taşımacılık potansiyelinin altını çizdi.

## Ticaret Yolları Yeniden Şekilleniyor

TDT Aksakallar Konseyi Başkanı Binali Yıldırım, açılış konuşmasında, ticaret yollarının yeniden şekil aldığına ve Doğu-Batı tedarik zincirinin yeniden oluştuğuna değindi. Orta Koridor ve Zengezur Koridoru'nun taşıma potansiyelinin yüksek olduğunu ifade etti.

Yıldırım, tarife engellerini, rota verimsizliklerini ve tarife dışı maliyetleri Orta Koridor (Orta Koridor) ve Zengezur Koridor ulaşım yollarının ölçeklendirilmesinde büyük engeller olarak işaret etti.

## Türkiye'nin Ulaşım Yatırımları

Ulaştırma ve Altyapı Bakan Yardımcısı Durmuş Ünüvar, Türkiye'nin ulaştırma ve altyapı yatırımlarının bölgesel lojistik üzerindeki etkilerini aktarırken, küresel ticaretin yeniden şekillendiğini ve Türk dünyasının ulaşımı için stratejik adımlar atıldığını belirtti.

## Stratejik İşbirliği Anlaşmaları İmzalandı

Foruma katılan Karavan B2B şirketi, TDT Lojistik Merkezleri ve Kargo Taşıyıcıları İttifakı ile Türk Ticaret ve Sanayi Odaları Birliği (TCCI) ile stratejik işbirliği anlaşmaları imzaladı.

Karavan Kurucu Başkanı İslam Şakbandarov tarafından yapılan açıklamada, forumun Türk dünyası için önemli bir gelişim fırsatı sunduğu vurgulandı: "Bu forum, Karavan'ın bölgesel varlığını ve Orta Koridor'un ölçeklenebilir lojistik ekosistemler için kullanılmayan potansiyelini kullanma taahhüdümüzü vurgulamaktadır."

## Gelecek Vizyonu

Forum katılımcıları ileriye dönük olarak iddialı bir değişim belirlediler: koridor bölgesi için yıllık yük hacmini bugünkü 5 milyon tonun altından önümüzdeki beş yıl içinde 20 milyon tona kadar çıkarmak.

Forumda alınan kararlar ve imzalanan anlaşmalar ile, Türk devletleri arasındaki lojistik entegrasyonunun artması ve Orta Koridor'un bir üretim ve lojistik ekosistemine dönüşmesi hedefleniyor.

---

**"Ulaşım artık sadece transit değil – doğu ile batı arasındaki ticaretin büyüme motorudur."** — Binali Yıldırım`,
    thumbnailUrl: "/images/newsroom/tdt-forum-main-hq.jpg",
    featured: false,
    author: "Karavan Ekibi",
    tags: ["işbirliği", "TDT", "lojistik", "Orta Asya", "Türkiye"],
  },
  {
    id: "2",
    slug: "tdt-forum-orta-koridor-growth",
    title: "TDT Forum Spotlights Orta Koridor's Growth as Trade Dynamics Shift",
    category: "insight",
    date: "2025-11-12",
    summary: "At the TDT Multimodal Transport Forum in Uzbekistan, regional transport leaders analysed the changing trade-flow dynamics post-pandemic, emphasising the Orta Koridor's emerging role and the need for tariff reform to scale freight between Turkish-world states.",
    content: `Held in Tashkent, the forum assembled transport ministers, infrastructure investors and logistics operators from across the Turkic states region. Among the themes: how the Orta Koridor and Zengezur Corridor are becoming "rising stars" of Eurasian freight as supply-chains reshape under geopolitical pressures.

TDT Elders Council Chair Binali Yıldırım emphasised that although the total trade volume among Turkic states exceeds 1 trillion USD, intra-regional trade remains stuck at around 60–70 billion USD – a gap driven in part by insufficient logistics integration and high transportation costs.

## Key Action Areas

Participants identified several key action-areas:

- **Harmonise freight tariffs** and reduce non-tariff transport costs
- **Develop integrated multimodal corridors** combining rail, road and sea routes
- **Mobilise Turkish and international private-sector investment** in Central Asian transport hubs
- **Position the Orta Koridor** not just as transit, but as a production-enabled logistics ecosystem

The forum also recorded MoUs with logistics firms and industry associations to accelerate corridor capacity from <5 million tonnes a year to ~20 million tonnes within five years. Observers noted this would require near-term investments in rail-road terminals, seamless customs protocols and digital freight platforms.`,
    thumbnailUrl: "/images/newsroom/tdt-forum-02-hq.jpg",
    featured: false,
    author: "Industry Analysis",
    tags: ["Orta Koridor", "trade", "logistics", "TDT"],
  },
  {
    id: "3",
    slug: "karavan-advances-iso-certification-turkiye",
    title: "Karavan Advances ISO Certification in Türkiye, Underscoring Focus on Quality and Security",
    category: "company",
    date: "2025-10-29",
    summary: "Karavan has successfully advanced its ISO certification process in Türkiye, marking a key milestone in the company's ongoing commitment to quality management, information security, and operational excellence.",
    content: `**İstanbul, Türkiye – October 29, 2025** – Karavan has successfully advanced its ISO certification process in Türkiye, marking a key milestone in the company's ongoing commitment to quality management, information security, and operational excellence.

The company rapidly coordinated internal teams and partners to compile and submit all required corporate and operational documentation, enabling the certification process to move forward within a notably short timeframe. This swift progress reflects Karavan's readiness to align with internationally recognized standards and its structured approach to governance and compliance.

In parallel with the ISO efforts, Karavan is strengthening its cybersecurity posture by increasing collaboration with specialized experts and formalizing responsibilities for cybersecurity oversight across the organization. These initiatives aim to further protect stakeholders, systems, and data in an increasingly complex digital landscape.

Together, the ISO certification work and cybersecurity initiatives reinforce Karavan's position as a trusted global B2B marketplace for the Turkic world and beyond, offering partners and customers enhanced assurance around quality, reliability, and security.

---

**About ISO Certification**

ISO (International Organization for Standardization) certifications provide independent verification that an organization meets globally recognized standards for quality management, information security, and operational processes. For B2B platforms operating across multiple jurisdictions, ISO certification demonstrates commitment to consistent, reliable service delivery and data protection.`,
    featured: false,
    author: "Karavan Team",
    tags: ["ISO", "certification", "security", "compliance", "cybersecurity"],
  },
  {
    id: "6",
    slug: "q4-product-updates",
    title: "Q4 Product Updates: Mobile SDK, API v3, and Enhanced Security",
    category: "update",
    date: "2025-10-28",
    summary: "A roundup of our latest product improvements and new features shipping this quarter.",
    content: `As we close out the year, we're shipping some of our most requested features.

## What's New

### Mobile SDK v2.0
Complete rewrite with improved performance and smaller bundle size.

### API v3
New RESTful endpoints with better error handling and documentation.

### Enhanced Security
SOC 2 Type II certification and advanced encryption options.

## Coming Soon

Watch for our advanced workflow automation features launching in Q1 2026.`,
    featured: false,
    author: "Engineering Team",
    tags: ["updates", "SDK", "API", "security"],
  },
];

export const dummyStories: StoryItem[] = [
  {
    id: "2",
    slug: "ustalegal-local-leads",
    title: "UstaLegal scales high-intent local leads with content-first strategy",
    clientName: "UstaLegal",
    date: "2025-09-20",
    sector: "Legal Services",
    summary: "SEO, landing pages, and a clear intake flow doubled consult bookings in 6 months.",
    heroMetric: "2x qualified leads",
    problem: "UstaLegal, a platform connecting clients with local attorneys, struggled with visibility in local search. They had great service but couldn't compete with established firms. Their website traffic was minimal and consultation bookings were inconsistent.",
    approach: "We developed a comprehensive local SEO strategy combined with high-quality content for each practice area. Every city and practice area got its own optimized landing page with local keywords, attorney bios, and client testimonials. We also implemented structured data and improved the consultation booking flow.",
    outcome: "Within 6 months, organic traffic grew 156%, consultation bookings doubled, and UstaLegal ranked in the top 3 for 47 high-value local keywords. The content continues to drive leads with minimal ongoing investment.",
    metrics: [
      { label: "Organic traffic growth", value: "+156%" },
      { label: "Consultation bookings", value: "2x" },
      { label: "Top 3 rankings", value: "47 keywords" },
      { label: "CAC reduction", value: "-42%" },
    ],
    featured: true,
    tags: ["legal", "SEO", "local", "content"],
  },
  {
    id: "3",
    slug: "fintech-startup-mvp-launch",
    title: "From concept to funded: Shipping an MVP that raised $2M seed round",
    clientName: "Confidential FinTech Startup",
    date: "2025-08-10",
    sector: "Financial Technology",
    summary: "A scrappy FinTech team needed a market-ready product in 12 weeks. We delivered an MVP that helped them close their seed round.",
    heroMetric: "$2M raised",
    problem: "A pre-seed FinTech startup had strong investor interest but needed a working product to demonstrate traction. They had 12 weeks before their next investor meeting and a complex vision for automated expense management.",
    approach: "We ran a 2-day product sprint to identify the absolute core features. Then we built an MVP focused on one killer use case: automated receipt processing for small businesses. Clean design, rock-solid core functionality, zero bloat.",
    outcome: "The MVP launched on time and was used to demonstrate product-market fit during investor meetings. The startup closed a $2M seed round and has since grown to 500+ paying customers.",
    metrics: [
      { label: "Seed funding raised", value: "$2M" },
      { label: "Time to launch", value: "12 weeks" },
      { label: "Current customers", value: "500+" },
      { label: "Investor demo success", value: "100%" },
    ],
    featured: false,
    tags: ["fintech", "MVP", "startup", "fundraising"],
  },
  {
    id: "4",
    slug: "ecommerce-platform-redesign",
    title: "Modernizing a legacy e-commerce platform without disrupting sales",
    clientName: "RetailFlow",
    date: "2025-07-25",
    sector: "E-commerce",
    summary: "A complete platform redesign that maintained 100% uptime and increased revenue per session by 23%.",
    heroMetric: "+23% revenue per session",
    problem: "RetailFlow's 8-year-old platform was showing its age. Slow load times, dated design, and poor mobile experience were hurting conversions. But with $10M+ in annual revenue, they couldn't afford downtime or customer confusion during a redesign.",
    approach: "We implemented a phased rollout strategy, redesigning section by section with A/B testing at each stage. We modernized the tech stack (React, Next.js) while keeping the backend stable. Mobile-first design with performance optimization as a core requirement.",
    outcome: "Zero downtime during the 4-month transition. Revenue per session increased 23%, mobile conversion improved 41%, and page load times dropped from 4.2s to 1.1s. The new platform now handles 3x the traffic of the old one.",
    metrics: [
      { label: "Revenue per session", value: "+23%" },
      { label: "Mobile conversion", value: "+41%" },
      { label: "Page load time", value: "1.1s" },
      { label: "Deployment uptime", value: "100%" },
    ],
    featured: false,
    tags: ["e-commerce", "redesign", "performance", "React"],
  },
  {
    id: "5",
    slug: "enterprise-design-system",
    title: "Building a design system used by 200+ designers across 15 product teams",
    clientName: "Global Tech Corp",
    date: "2025-06-15",
    sector: "Enterprise Software",
    summary: "Creating consistency and velocity for a massive organization with fragmented design practices.",
    heroMetric: "200+ users",
    problem: "A Fortune 500 tech company had 15 product teams, each building their own components and styles. This led to inconsistent user experiences, duplicated effort, and slow product development. Leadership wanted a unified design system but previous attempts had failed.",
    approach: "We started with an audit of existing patterns, then built a core component library based on actual usage (not theoretical perfection). We created clear governance, comprehensive documentation, and a feedback loop. Most importantly, we embedded our team with product teams to drive adoption.",
    outcome: "The design system is now used by 200+ designers and developers. Product teams report 40% faster development cycles, and user testing shows significantly improved UX consistency. The system has become a competitive advantage.",
    metrics: [
      { label: "Active users", value: "200+" },
      { label: "Development speed", value: "+40%" },
      { label: "Adoption rate", value: "94%" },
      { label: "Component library", value: "180+ components" },
    ],
    featured: false,
    tags: ["enterprise", "design system", "scaling", "governance"],
  },
];

export const companyInfo: CompanyInfo = {
  name: "Karavan",
  tagline: "Simplifying cross-border B2B trade",
  mission: "Our mission is to simplify and accelerate cross-border B2B trade.",
  description: "Karavan is a cross-border B2B trade platform built to simplify and secure trade between Türkiye, the Turkic States, and Central Asia. We enable verified suppliers, buyers, logistics providers, and financial institutions to transact with trust through integrated payments, insurance, logistics coordination, financing, and compliance automation.",
  founded: "2020",
  stats: [
    { label: "Verified suppliers (pilot stage)", value: "50+" },
    { label: "Team members & specialists", value: "20+" },
    { label: "Core markets supported", value: "8" },
    { label: "Languages supported", value: "3" },
    { label: "Avg. Türkiye→Central Asia delivery", value: "7–14 days" },
  ],
};
