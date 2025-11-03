/**
 * vCard generation utility
 * Generates vCard 3.0 format with CRLF line endings
 */

export interface QRContact {
  slug: string
  firstName: string
  lastName: string
  displayName: string
  title: string
  department: string
  mobileE164: string
  mobileDisplay: string
  email: string
  company: string
  website: string
  summary: string
  location: string
  avatarUrl: string
  whatsappE164?: string
  whatsappDisplay?: string
  secondaryPhoneE164?: string
  secondaryPhoneDisplay?: string
  languages?: string[]
  social: {
    linkedin: string
    x: string
    whatsapp: string
    wechat: string
    telegram: string
  }
  qrPayloadUrl: string
}

/**
 * Generate vCard 3.0 content from contact data
 * Uses URL-based photo reference (not embedded base64) for smaller file size
 */
export function generateVCard(contact: QRContact): string {
  const lines: string[] = []
  
  // vCard header
  lines.push('BEGIN:VCARD')
  lines.push('VERSION:3.0')
  lines.push('')
  
  // Name (N field: LastName;FirstName;MiddleName;Prefix;Suffix)
  // vCard format: N;CHARSET=UTF-8:LastName;FirstName;;;
  lines.push(`N;CHARSET=UTF-8:${escapeVCardValue(contact.lastName)};${escapeVCardValue(contact.firstName)};;;`)
  
  // Full name (FN field)
  lines.push(`FN;CHARSET=UTF-8:${escapeVCardValue(contact.displayName)}`)
  
  // Organization
  lines.push(`ORG;CHARSET=UTF-8:${escapeVCardValue(contact.company)}`)
  
  // Title
  lines.push(`TITLE;CHARSET=UTF-8:${escapeVCardValue(contact.title)}`)
  
  // Phone (CELL type)
  lines.push(`TEL;TYPE=CELL,voice:${contact.mobileE164}`)
  
  // Secondary phone if available
  if (contact.secondaryPhoneE164) {
    lines.push(`TEL;TYPE=CELL,voice:${contact.secondaryPhoneE164}`)
  }
  
  // WhatsApp if available
  if (contact.whatsappE164) {
    lines.push(`TEL;TYPE=CELL,voice,whatsapp:${contact.whatsappE164}`)
  }
  
  // Email (INTERNET type, PREF for preferred)
  lines.push(`EMAIL;TYPE=PREF,INTERNET:${contact.email}`)
  
  // Website URL
  lines.push(`URL:${contact.website}`)
  
  // Photo as URL (not embedded base64 for smaller file size)
  if (contact.avatarUrl) {
    const photoUrl = contact.avatarUrl.startsWith('http')
      ? contact.avatarUrl
      : `https://karavan.net${contact.avatarUrl}`
    lines.push(`PHOTO;VALUE=URI:${photoUrl}`)
  }
  
  // Summary/Note
  if (contact.summary) {
    lines.push(`NOTE;CHARSET=UTF-8:${escapeVCardValue(contact.summary)}`)
  }
  
  // vCard footer
  lines.push('END:VCARD')
  
  // Join with CRLF line endings (required by vCard spec)
  return lines.join('\r\n')
}

/**
 * Escape special characters in vCard values
 * vCard spec requires escaping commas, semicolons, newlines, and backslashes
 */
function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')  // Escape backslashes first
    .replace(/,/g, '\\,')     // Escape commas
    .replace(/;/g, '\\;')     // Escape semicolons
    .replace(/\n/g, '\\n')   // Escape newlines
    .replace(/\r/g, '')      // Remove carriage returns (we'll add CRLF at join)
}

/**
 * Generate filename for vCard download
 */
export function getVCardFilename(contact: QRContact): string {
  // Remove Turkish characters and special chars for filename
  const firstName = contact.firstName
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/İ/g, 'I')
    .replace(/Ğ/g, 'G')
    .replace(/Ü/g, 'U')
    .replace(/Ş/g, 'S')
    .replace(/Ö/g, 'O')
    .replace(/Ç/g, 'C')
  
  const lastName = contact.lastName
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/İ/g, 'I')
    .replace(/Ğ/g, 'G')
    .replace(/Ü/g, 'U')
    .replace(/Ş/g, 'S')
    .replace(/Ö/g, 'O')
    .replace(/Ç/g, 'C')
  
  return `${firstName}_${lastName}.vcf`
}

