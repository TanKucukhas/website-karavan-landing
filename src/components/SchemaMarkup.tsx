export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Karavan",
    "description": "B2B marketplace with escrow, logistics and verified suppliers for the Turkic World",
    "url": "https://karavan.net",
    "logo": "https://karavan.net/logo.png",
    "sameAs": [
      "https://www.linkedin.com/company/karavanofficial",
      "https://instagram.com/karavanconnect",
      "https://www.youtube.com/@KaravanGlobal",
      "https://www.facebook.com/profile.php?id=61581111225391"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@karavan.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Turkish", "Kazakh", "Uzbek", "Azerbaijani", "Kyrgyz", "Turkmen"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR",
      "addressLocality": "Istanbul"
    },
    "foundingDate": "2024",
    "industry": "B2B Marketplace",
    "numberOfEmployees": "10-50",
    "areaServed": ["Turkey", "Kazakhstan", "Uzbekistan", "Azerbaijan", "Kyrgyzstan", "Turkmenistan"]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Karavan",
    "url": "https://karavan.net",
    "description": "B2B marketplace with escrow, logistics and verified suppliers for the Turkic World",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://karavan.net/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does escrow work on Karavan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Funds are held in escrow until delivery is confirmed. This protects both buyers and sellers from payment disputes and delivery issues."
        }
      },
      {
        "@type": "Question",
        "name": "What logistics services do you provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide door-to-door shipping, customs clearance, HS code assistance, and export paperwork handling across Turkic States."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any fees for using Karavan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "During our private beta, there are no fees. We're focused on building the best platform for B2B trade in the Turkic World."
        }
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Karavan B2B Marketplace",
    "description": "Secure B2B trade with escrow, logistics, customs and finance in the Turkic States.",
    "brand": {
      "@type": "Brand",
      "name": "Karavan"
    },
    "areaServed": ["Turkey", "Uzbekistan", "Central Asia"],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/PreOrder"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}