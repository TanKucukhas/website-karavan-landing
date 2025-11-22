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
    category: "launch",
    date: "2025-11-12",
    images: {
      header: "/images/newsroom/karavan-partners-tdt-tashkent-forum/header.webp",
    },
    featured: true,
    translations: {
      en: {
        slug: "karavan-partners-tdt-tashkent-forum",
        title: "Karavan Partners with TDT at International Multimodal Transport Forum in Tashkent",
        summary: "At the Turkic States Organization (TDT) International Multimodal Transport Forum held in Tashkent, Karavan signed a strategic cooperation agreement with TDT member logistic centres and the Turkish Trade & Industry Chambers Union (TCCI), positioning itself for expanded B2B opportunities across the Central Asian-Eurasian logistics corridor.",
        content: `In Tashkent, Uzbekistan, the TDT International Multimodal Transport Forum brought together senior transport ministers, logistics firm executives and infrastructure financiers from member states. The event was hosted by Uzbekistan's Minister of Transport, Ilham Mahkamov, and attended by TDT Secretary-General Kubanıçbek Ömüraliyev and TDT Elders Council Chair Binali Yıldırım.

During his address, Mahkamov emphasised the growing geopolitical significance of the TDT member states as "a major transit node between east–west and north–south" and underlined the region's multimodal transport potential. Meanwhile, Yıldırım called out tariff barriers, routing inefficiencies and non-tariff costs as major bottlenecks to scaling the Orta Koridor (Middle Corridor) and Zengezur Corridor transport routes.

In a key move, Karavan – as one of the Turkish firm participants – signed a cooperative memorandum with TDT Logistics Centres and the TCCI to jointly develop logistics infrastructure, multimodal freight operations and cross-border transport solutions. Karavan Founder & Chairman İslam Şakbandarov stated: "This forum underlines our commitment to leverage Karavan's regional footprint and the Orta Koridor's untapped potential for scalable logistics ecosystems."

Looking ahead, the forum participants identified an ambitious shift: raising annual freight volumes from under 5 million tons today to as high as 20 million tons within the next five years for the corridor region.

---

**"Transport is no longer just transit – it's the growth engine for trade between east and west."** — Binali Yıldırım`,
        author: "Karavan Team",
        tags: ["partnership", "TDT", "logistics", "Central Asia"],
      },
      tr: {
        slug: "ozbekistan-tdt-uluslararasi-cok-modlu-tasimacilik-forumu",
        title: "Özbekistan'da TDT Uluslararası Çok Modlu Taşımacılık Forumu Düzenlendi",
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
        author: "Karavan Ekibi",
        tags: ["işbirliği", "TDT", "lojistik", "Orta Asya", "Türkiye"],
      },
      ru: {
        slug: "uzbekistan-tdt-mezhdunarodnyj-multimodalnyj-transportnyj-forum",
        title: "В Узбекистане состоялся Международный мультимодальный транспортный форум ОТГ",
        summary: "В столице Узбекистана Ташкенте Международный мультимодальный транспортный форум Организации тюркских государств (ОТГ) стал платформой для обсуждения важных инициатив в области транспорта.",
        content: `**Ташкент, Узбекистан – 12 ноября 2025 года** – В столице Узбекистана Ташкенте состоялся Международный мультимодальный транспортный форум Организации тюркских государств (ОТГ). ОТГ предпринимает важные шаги и обеспечивает сотрудничество для развития транспорта в Ташкенте.

## Заявления министра транспорта Узбекистана

Министр транспорта Узбекистана Ильхам Махкамов, принимавший форум, обратил внимание на растущее политическое и экономическое влияние ОТГ, подчеркнув, что страны-члены организации обладают большим потенциалом. Махкамов подчеркнул растущее геополитическое значение стран-членов ОТГ как «важного транзитного узла между востоком и западом, севером и югом» и выделил мультимодальный транспортный потенциал региона.

## Торговые пути обретают новые очертания

Председатель Совета старейшин ОТГ Бинали Йылдырым в своём вступительном слове отметил, что торговые пути обретают новые очертания, а цепочка поставок «Восток-Запад» формируется заново. Он выразил уверенность в высоком транспортном потенциале Среднего коридора и Зангезурского коридора.

Йылдырым указал на тарифные барьеры, неэффективность маршрутов и нетарифные затраты как на серьёзные препятствия масштабированию Среднего коридора и Зангезурского коридора.

## Транспортные инвестиции Турции

Заместитель министра транспорта и инфраструктуры Дурмуш Юнювар, рассказывая о влиянии транспортных и инфраструктурных инвестиций Турции на региональную логистику, отметил, что глобальная торговля обретает новые формы и предпринимаются стратегические шаги для транспорта тюркского мира.

## Подписаны соглашения о стратегическом сотрудничестве

Компания Karavan B2B, участвовавшая на форуме, подписала соглашения о стратегическом сотрудничестве с Логистическими центрами ОТГ и Альянсом грузоперевозчиков, а также Союзом торговых и промышленных палат Турции (TCCI).

В заявлении, сделанном основателем и председателем Karavan Исламом Шакбандаровым, подчёркивалось, что форум предоставляет важную возможность для развития тюркского мира: «Этот форум подчёркивает нашу приверженность использованию регионального присутствия Karavan и неиспользованного потенциала Среднего коридора для масштабируемых логистических экосистем».

## Видение будущего

Участники форума наметили амбициозные изменения на будущее: увеличить годовой объём грузов для региона коридора с нынешних менее 5 миллионов тонн до 20 миллионов тонн в течение следующих пяти лет.

Решения, принятые на форуме, и подписанные соглашения направлены на усиление логистической интеграции между тюркскими государствами и превращение Среднего коридора в производственную и логистическую экосистему.

---

**«Транспорт — это уже не просто транзит, это двигатель роста торговли между востоком и западом».** — Бинали Йылдырым`,
        author: "Команда Karavan",
        tags: ["сотрудничество", "ОТГ", "логистика", "Центральная Азия", "Турция"],
      },
    },
  },
  {
    id: "2",
    category: "insight",
    date: "2025-11-12",
    images: {
      header: "/images/newsroom/tdt-forum-orta-koridor-growth/header.webp",
    },
    featured: false,
    translations: {
      en: {
        slug: "tdt-forum-orta-koridor-growth",
        title: "TDT Forum Spotlights Orta Koridor's Growth as Trade Dynamics Shift",
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
        author: "Industry Analysis",
        tags: ["Orta Koridor", "trade", "logistics", "TDT"],
      },
      tr: {
        slug: "tdt-forumu-orta-koridor-buyume",
        title: "TDT Forumu, Ticaret Dinamikleri Değişirken Orta Koridor'un Büyümesini Vurguladı",
        summary: "Özbekistan'daki TDT Çok Modlu Taşımacılık Forumu'nda, bölgesel ulaşım liderleri pandemi sonrası değişen ticaret akışı dinamiklerini analiz etti ve Orta Koridor'un yükselen rolünü ve Türk dünyası devletleri arasında navlun ölçeklendirmek için tarife reformu ihtiyacını vurguladı.",
        content: `Taşkent'te düzenlenen forum, Türk devletleri bölgesinden ulaştırma bakanları, altyapı yatırımcıları ve lojistik operatörlerini bir araya getirdi. Temalar arasında: Orta Koridor ve Zengezur Koridoru'nun jeopolitik baskılar altında yeniden şekillenen tedarik zincirleri nedeniyle Avrasya yük taşımacılığının "yükselen yıldızları" haline nasıl geldiği yer aldı.

TDT Aksakallar Konseyi Başkanı Binali Yıldırım, Türk devletleri arasındaki toplam ticaret hacminin 1 trilyon USD'yi aşmasına rağmen, bölge içi ticaretin yaklaşık 60-70 milyar USD civarında takılı kaldığını vurguladı - bu açık kısmen yetersiz lojistik entegrasyon ve yüksek ulaşım maliyetlerinden kaynaklanıyor.

## Temel Eylem Alanları

Katılımcılar birkaç temel eylem alanı belirledi:

- **Navlun tarifelerini uyumlaştırın** ve tarife dışı ulaşım maliyetlerini azaltın
- **Demiryolu, karayolu ve deniz yollarını** birleştiren entegre çok modlu koridorlar geliştirin
- **Orta Asya ulaşım merkezlerine** Türk ve uluslararası özel sektör yatırımı sağlayın
- **Orta Koridor'u** sadece transit olarak değil, üretime olanak sağlayan bir lojistik ekosistem olarak konumlandırın

Forum ayrıca lojistik firmaları ve sanayi dernekleri ile koridor kapasitesini yılda <5 milyon tondan beş yıl içinde ~20 milyon tona çıkarmak için mutabakat zabıtları kaydetti. Gözlemciler bunun kısa vadede demiryolu-karayolu terminallerine, sorunsuz gümrük protokollerine ve dijital navlun platformlarına yatırım gerektireceğini belirtti.`,
        author: "Sektör Analizi",
        tags: ["Orta Koridor", "ticaret", "lojistik", "TDT"],
      },
      ru: {
        slug: "forum-otg-rost-srednego-koridora",
        title: "Форум ОТГ подчеркнул рост Среднего коридора на фоне изменения торговой динамики",
        summary: "На мультимодальном транспортном форуме ОТГ в Узбекистане региональные лидеры в сфере транспорта проанализировали изменение динамики торговых потоков после пандемии, подчеркнув растущую роль Среднего коридора и необходимость тарифной реформы для масштабирования грузоперевозок между государствами тюркского мира.",
        content: `Проведённый в Ташкенте форум собрал министров транспорта, инфраструктурных инвесторов и логистических операторов из региона тюркских государств. Среди тем: как Средний коридор и Зангезурский коридор становятся «восходящими звёздами» евразийских грузоперевозок по мере реформирования цепочек поставок под геополитическим давлением.

Председатель Совета старейшин ОТГ Бинали Йылдырым подчеркнул, что хотя общий объём торговли между тюркскими государствами превышает 1 триллион долларов США, внутрирегиональная торговля остаётся на уровне около 60-70 миллиардов долларов США — разрыв, обусловленный отчасти недостаточной логистической интеграцией и высокими транспортными расходами.

## Ключевые области действий

Участники определили несколько ключевых областей действий:

- **Гармонизация грузовых тарифов** и снижение нетарифных транспортных издержек
- **Развитие интегрированных мультимодальных коридоров**, сочетающих железнодорожные, автомобильные и морские маршруты
- **Мобилизация турецких и международных частных инвестиций** в транспортные узлы Центральной Азии
- **Позиционирование Среднего коридора** не просто как транзита, а как производственно-ориентированной логистической экосистемы

На форуме также были зафиксированы меморандумы о взаимопонимании с логистическими компаниями и отраслевыми ассоциациями для увеличения пропускной способности коридора с менее 5 миллионов тонн в год до примерно 20 миллионов тонн в течение пяти лет. Наблюдатели отметили, что это потребует краткосрочных инвестиций в железнодорожно-автомобильные терминалы, бесшовные таможенные протоколы и цифровые грузовые платформы.`,
        author: "Отраслевой анализ",
        tags: ["Средний коридор", "торговля", "логистика", "ОТГ"],
      },
    },
  },
  {
    id: "3",
    category: "company",
    date: "2025-10-29",
    images: {
      header: "/images/newsroom/karavan-advances-iso-certification-turkiye/header.webp",
    },
    featured: false,
    translations: {
      en: {
        slug: "karavan-advances-iso-certification-turkiye",
        title: "Karavan Advances ISO Certification in Türkiye, Underscoring Focus on Quality and Security",
        summary: "Karavan has successfully advanced its ISO certification process in Türkiye, marking a key milestone in the company's ongoing commitment to quality management, information security, and operational excellence.",
        content: `**İstanbul, Türkiye – October 29, 2025** – Karavan has successfully advanced its ISO certification process in Türkiye, marking a key milestone in the company's ongoing commitment to quality management, information security, and operational excellence.

The company rapidly coordinated internal teams and partners to compile and submit all required corporate and operational documentation, enabling the certification process to move forward within a notably short timeframe. This swift progress reflects Karavan's readiness to align with internationally recognized standards and its structured approach to governance and compliance.

In parallel with the ISO efforts, Karavan is strengthening its cybersecurity posture by increasing collaboration with specialized experts and formalizing responsibilities for cybersecurity oversight across the organization. These initiatives aim to further protect stakeholders, systems, and data in an increasingly complex digital landscape.

Together, the ISO certification work and cybersecurity initiatives reinforce Karavan's position as a trusted global B2B marketplace for the Turkic world and beyond, offering partners and customers enhanced assurance around quality, reliability, and security.

---

**About ISO Certification**

ISO (International Organization for Standardization) certifications provide independent verification that an organization meets globally recognized standards for quality management, information security, and operational processes. For B2B platforms operating across multiple jurisdictions, ISO certification demonstrates commitment to consistent, reliable service delivery and data protection.`,
        author: "Karavan Team",
        tags: ["ISO", "certification", "security", "compliance", "cybersecurity"],
      },
      tr: {
        slug: "karavan-turkiye-iso-sertifikasyonu-kalite-guvenlik",
        title: "Karavan Türkiye'de ISO Sertifikasyonunda İlerledi, Kalite ve Güvenlik Odağını Vurguladı",
        summary: "Karavan, Türkiye'deki ISO sertifikasyon sürecinde başarıyla ilerledi ve kalite yönetimi, bilgi güvenliği ve operasyonel mükemmeliyete olan bağlılığında önemli bir dönüm noktasına işaret etti.",
        content: `**İstanbul, Türkiye – 29 Ekim 2025** – Karavan, Türkiye'deki ISO sertifikasyon sürecinde başarıyla ilerledi ve kalite yönetimi, bilgi güvenliği ve operasyonel mükemmeliyete olan bağlılığında önemli bir dönüm noktasına işaret etti.

Şirket, gerekli tüm kurumsal ve operasyonel belgeleri derlemek ve sunmak için dahili ekipleri ve ortakları hızla koordine etti ve sertifikasyon sürecinin önemli ölçüde kısa bir zaman diliminde ilerlemesini sağladı. Bu hızlı ilerleme, Karavan'ın uluslararası kabul görmüş standartlarla uyumlu hale gelme hazırlığını ve yönetişim ve uyumluluğa yapılandırılmış yaklaşımını yansıtıyor.

ISO çabalarına paralel olarak Karavan, uzmanlaşmış uzmanlarla işbirliğini artırarak ve organizasyon genelinde siber güvenlik gözetimi sorumluluklarını resmileştirerek siber güvenlik duruşunu güçlendiriyor. Bu girişimler, giderek karmaşıklaşan dijital ortamda paydaşları, sistemleri ve verileri daha fazla korumayı amaçlıyor.

ISO sertifikasyon çalışması ve siber güvenlik girişimleri birlikte, Karavan'ın Türk dünyası ve ötesinde güvenilir bir küresel B2B pazaryeri olarak konumunu güçlendirerek ortaklara ve müşterilere kalite, güvenilirlik ve güvenlik konusunda gelişmiş güvence sunuyor.

---

**ISO Sertifikasyonu Hakkında**

ISO (Uluslararası Standardizasyon Örgütü) sertifikaları, bir kuruluşun kalite yönetimi, bilgi güvenliği ve operasyonel süreçler için küresel olarak tanınan standartları karşıladığını bağımsız olarak doğrular. Birden fazla yargı bölgesinde faaliyet gösteren B2B platformları için ISO sertifikasyonu, tutarlı, güvenilir hizmet sunumu ve veri korumaya olan bağlılığı gösterir.`,
        author: "Karavan Ekibi",
        tags: ["ISO", "sertifikasyon", "güvenlik", "uyumluluk", "siber güvenlik"],
      },
      ru: {
        slug: "karavan-iso-sertifikatsiya-turtsiya-kachestvo-bezopasnost",
        title: "Karavan продвинулась в получении сертификации ISO в Турции, подчеркнув фокус на качестве и безопасности",
        summary: "Karavan успешно продвинулась в процессе сертификации ISO в Турции, что стало ключевой вехой в постоянной приверженности компании управлению качеством, информационной безопасности и операционному совершенству.",
        content: `**Стамбул, Турция – 29 октября 2025 года** – Karavan успешно продвинулась в процессе сертификации ISO в Турции, что стало ключевой вехой в постоянной приверженности компании управлению качеством, информационной безопасности и операционному совершенству.

Компания быстро скоординировала внутренние команды и партнёров для сбора и подачи всей необходимой корпоративной и операционной документации, что позволило процессу сертификации продвинуться в заметно короткие сроки. Этот быстрый прогресс отражает готовность Karavan соответствовать международно признанным стандартам и её структурированный подход к управлению и соблюдению требований.

Параллельно с усилиями по ISO Karavan укрепляет свою позицию в области кибербезопасности, усиливая сотрудничество со специализированными экспертами и формализуя ответственность за надзор за кибербезопасностью по всей организации. Эти инициативы направлены на дальнейшую защиту заинтересованных сторон, систем и данных во всё более сложном цифровом ландшафте.

Вместе работа по сертификации ISO и инициативы в области кибербезопасности укрепляют позицию Karavan как доверенной глобальной B2B-площадки для тюркского мира и за его пределами, предлагая партнёрам и клиентам повышенные гарантии в отношении качества, надёжности и безопасности.

---

**О сертификации ISO**

Сертификаты ISO (Международной организации по стандартизации) обеспечивают независимую проверку того, что организация соответствует глобально признанным стандартам управления качеством, информационной безопасности и операционных процессов. Для B2B-платформ, работающих в нескольких юрисдикциях, сертификация ISO демонстрирует приверженность последовательному, надёжному предоставлению услуг и защите данных.`,
        author: "Команда Karavan",
        tags: ["ISO", "сертификация", "безопасность", "соответствие", "кибербезопасность"],
      },
    },
  },
];

export const dummyStories: StoryItem[] = [
  {
    id: "2",
    clientName: "UstaLegal",
    date: "2025-09-20",
    sector: "Legal Services",
    featured: true,
    metrics: [
      { label: "Organic traffic growth", value: "+156%" },
      { label: "Consultation bookings", value: "2x" },
      { label: "Top 3 rankings", value: "47 keywords" },
      { label: "CAC reduction", value: "-42%" },
    ],
    translations: {
      en: {
        slug: "ustalegal-local-leads",
        title: "UstaLegal scales high-intent local leads with content-first strategy",
        summary: "SEO, landing pages, and a clear intake flow doubled consult bookings in 6 months.",
        heroMetric: "2x qualified leads",
        problem: "UstaLegal, a platform connecting clients with local attorneys, struggled with visibility in local search. They had great service but couldn't compete with established firms. Their website traffic was minimal and consultation bookings were inconsistent.",
        approach: "We developed a comprehensive local SEO strategy combined with high-quality content for each practice area. Every city and practice area got its own optimized landing page with local keywords, attorney bios, and client testimonials. We also implemented structured data and improved the consultation booking flow.",
        outcome: "Within 6 months, organic traffic grew 156%, consultation bookings doubled, and UstaLegal ranked in the top 3 for 47 high-value local keywords. The content continues to drive leads with minimal ongoing investment.",
        tags: ["legal", "SEO", "local", "content"],
      },
    },
  },
  {
    id: "3",
    clientName: "Confidential FinTech Startup",
    date: "2025-08-10",
    sector: "Financial Technology",
    featured: false,
    metrics: [
      { label: "Seed funding raised", value: "$2M" },
      { label: "Time to launch", value: "12 weeks" },
      { label: "Current customers", value: "500+" },
      { label: "Investor demo success", value: "100%" },
    ],
    translations: {
      en: {
        slug: "fintech-startup-mvp-launch",
        title: "From concept to funded: Shipping an MVP that raised $2M seed round",
        summary: "A scrappy FinTech team needed a market-ready product in 12 weeks. We delivered an MVP that helped them close their seed round.",
        heroMetric: "$2M raised",
        problem: "A pre-seed FinTech startup had strong investor interest but needed a working product to demonstrate traction. They had 12 weeks before their next investor meeting and a complex vision for automated expense management.",
        approach: "We ran a 2-day product sprint to identify the absolute core features. Then we built an MVP focused on one killer use case: automated receipt processing for small businesses. Clean design, rock-solid core functionality, zero bloat.",
        outcome: "The MVP launched on time and was used to demonstrate product-market fit during investor meetings. The startup closed a $2M seed round and has since grown to 500+ paying customers.",
        tags: ["fintech", "MVP", "startup", "fundraising"],
      },
    },
  },
  {
    id: "4",
    clientName: "RetailFlow",
    date: "2025-07-25",
    sector: "E-commerce",
    featured: false,
    metrics: [
      { label: "Revenue per session", value: "+23%" },
      { label: "Mobile conversion", value: "+41%" },
      { label: "Page load time", value: "1.1s" },
      { label: "Deployment uptime", value: "100%" },
    ],
    translations: {
      en: {
        slug: "ecommerce-platform-redesign",
        title: "Modernizing a legacy e-commerce platform without disrupting sales",
        summary: "A complete platform redesign that maintained 100% uptime and increased revenue per session by 23%.",
        heroMetric: "+23% revenue per session",
        problem: "RetailFlow's 8-year-old platform was showing its age. Slow load times, dated design, and poor mobile experience were hurting conversions. But with $10M+ in annual revenue, they couldn't afford downtime or customer confusion during a redesign.",
        approach: "We implemented a phased rollout strategy, redesigning section by section with A/B testing at each stage. We modernized the tech stack (React, Next.js) while keeping the backend stable. Mobile-first design with performance optimization as a core requirement.",
        outcome: "Zero downtime during the 4-month transition. Revenue per session increased 23%, mobile conversion improved 41%, and page load times dropped from 4.2s to 1.1s. The new platform now handles 3x the traffic of the old one.",
        tags: ["e-commerce", "redesign", "performance", "React"],
      },
    },
  },
  {
    id: "5",
    clientName: "Global Tech Corp",
    date: "2025-06-15",
    sector: "Enterprise Software",
    featured: false,
    metrics: [
      { label: "Active users", value: "200+" },
      { label: "Development speed", value: "+40%" },
      { label: "Adoption rate", value: "94%" },
      { label: "Component library", value: "180+ components" },
    ],
    translations: {
      en: {
        slug: "enterprise-design-system",
        title: "Building a design system used by 200+ designers across 15 product teams",
        summary: "Creating consistency and velocity for a massive organization with fragmented design practices.",
        heroMetric: "200+ users",
        problem: "A Fortune 500 tech company had 15 product teams, each building their own components and styles. This led to inconsistent user experiences, duplicated effort, and slow product development. Leadership wanted a unified design system but previous attempts had failed.",
        approach: "We started with an audit of existing patterns, then built a core component library based on actual usage (not theoretical perfection). We created clear governance, comprehensive documentation, and a feedback loop. Most importantly, we embedded our team with product teams to drive adoption.",
        outcome: "The design system is now used by 200+ designers and developers. Product teams report 40% faster development cycles, and user testing shows significantly improved UX consistency. The system has become a competitive advantage.",
        tags: ["enterprise", "design system", "scaling", "governance"],
      },
    },
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
