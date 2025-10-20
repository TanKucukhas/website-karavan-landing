// Contact information configuration
// This is the single source of truth for all contact details used across the site

export const contactConfig = {
  address: {
    main: {
      street: 'İçerenköy Mh. Karaman Çiftlik Yolu Cd.',
      building: 'N:47 Kar Plaza E Blok Kat:8',
      district: 'Ataşehir',
      city: 'İstanbul',
      postalCode: '34572',
      country: 'Türkiye',
    },
    branch: {
      company: 'Karavan Digital Corp',
      street: '32 Hillcrest Rd',
      city: 'Warren, NJ 07059',
      country: 'United States',
    },
  },
  email: {
    primary: 'info@karavan.net',
  },
  phone: {
    primary: '',
  },
} as const;

