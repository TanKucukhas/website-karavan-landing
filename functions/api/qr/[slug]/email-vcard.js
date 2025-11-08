import CONTACTS from '../../../data/qr-contacts.js'

export const onRequestPost = async ({ request, env, params }) => {
  try {
    const { slug } = await params
    const { email, marketingConsent = false, honeypot } = await request.json()

    // Bot detection
    if (honeypot) {
      return new Response(
        JSON.stringify({ error: 'Bot detected' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Validate email
    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Load contact data from bundled JSON
    if (!CONTACTS.length) {
      console.error('Contacts data bundle missing')
      return new Response(
        JSON.stringify({ error: 'Contact data not available' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const contacts = CONTACTS
    const contact = contacts.find((c) => c.slug === slug)

    if (!contact) {
      return new Response(
        JSON.stringify({ error: 'Contact not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Rate limiting (basic implementation)
    // Note: For production, use Cloudflare KV or Durable Objects for distributed rate limiting
    // For now, we'll rely on Brevo's rate limiting and return appropriate errors
    // Reserved for future rate limiting:
    // const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown'
    // const hashIP = (ip) => {
    //   let hash = 0
    //   for (let i = 0; i < ip.length; i++) {
    //     const char = ip.charCodeAt(i)
    //     hash = ((hash << 5) - hash) + char
    //     hash = hash & hash // Convert to 32bit integer
    //   }
    //   return Math.abs(hash).toString(36)
    // }
    // const ipHash = hashIP(clientIP)

    // Generate vCard
    const vcardContent = generateVCard(contact)
    const filename = `${contact.firstName}_${contact.lastName}.vcf`

    // Brevo config
    const apiKey = env.BREVO_API_KEY || ''
    const senderEmail = env.BREVO_SENDER_EMAIL || 'cards@karavan.net'
    const senderName = env.BREVO_SENDER_NAME || 'Karavan Contact Cards'

    // Email templates
    const emailSubject = `Your Karavan contact card for ${contact.displayName}`
    const { htmlContent, textContent, downloadUrl } = generateEmailTemplates(contact, marketingConsent)

    // Convert vCard to base64 for attachment
    // In Cloudflare Workers, we use btoa instead of Buffer
    const vcardBase64 = stringToBase64(vcardContent)

    if (!apiKey) {
      console.error('BREVO_API_KEY missing from environment')
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Send email with vCard attachment
    // Note: Brevo may not support .vcf format directly
    // Try without contentType first, if it fails we'll include download link in email body
    const emailData = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: email.trim(), name: email.trim().split('@')[0] }],
      subject: emailSubject,
      htmlContent,
      textContent,
      attachment: [
        {
          name: filename,
          content: vcardBase64,
        },
      ],
      headers: {
        'X-Category': 'vcard',
        'X-Contact-Slug': slug,
      },
    }

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(emailData),
    })

    if (!brevoRes.ok) {
      const errText = await brevoRes.text()
      console.error('Brevo email error:', errText)

      let parsedError
      try {
        parsedError = JSON.parse(errText || '{}')
      } catch {
        parsedError = null
      }

      const unsupportedFormat =
        parsedError &&
        typeof parsedError.message === 'string' &&
        (parsedError.message.includes('vcf') ||
          parsedError.message.includes('Unsupported file format'))

      if (unsupportedFormat) {
        console.log('Retrying email without attachment, adding download link...')

        const { htmlContent: fallbackHtml } = generateEmailTemplates(contact, marketingConsent, {
          includeDownloadAttribute: true,
          filename,
        })

        const emailDataWithoutAttachment = {
          sender: { name: senderName, email: senderEmail },
          to: [{ email: email.trim(), name: email.trim().split('@')[0] }],
          subject: emailSubject,
          htmlContent: fallbackHtml,
          textContent: `${textContent}\n\nDownload vCard: ${downloadUrl}`,
          headers: {
            'X-Category': 'vcard',
            'X-Contact-Slug': slug,
          },
        }

        const retryRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
          },
          body: JSON.stringify(emailDataWithoutAttachment),
        })

        if (!retryRes.ok) {
          const retryErrText = await retryRes.text()
          console.error('Brevo retry error:', retryErrText)
          return new Response(
            JSON.stringify({
              error: 'Failed to send email',
              details: retryErrText || null,
              status: retryRes.status,
            }),
            { status: 502, headers: { 'Content-Type': 'application/json' } }
          )
        }

        const retryResult = await retryRes.json()

        return new Response(
          JSON.stringify({
            success: true,
            message: 'Email sent successfully (download link included)',
            messageId: retryResult.messageId,
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      }

      // Check for rate limit errors
      if (brevoRes.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Try again in a minute' }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({
          error: 'Failed to send email',
          details: errText || null,
          status: brevoRes.status,
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const brevoResult = await brevoRes.json()

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        messageId: brevoResult.messageId,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Email vCard error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

/**
 * Generate vCard content
 */
function generateVCard(contact) {
  const lines = []
  
  lines.push('BEGIN:VCARD')
  lines.push('VERSION:3.0')
  lines.push('')
  lines.push(`N;CHARSET=UTF-8:${escapeVCard(contact.lastName)};${escapeVCard(contact.firstName)};;;`)
  lines.push(`FN;CHARSET=UTF-8:${escapeVCard(contact.displayName)}`)
  lines.push(`ORG;CHARSET=UTF-8:${escapeVCard(contact.company)}`)
  lines.push(`TITLE;CHARSET=UTF-8:${escapeVCard(contact.title)}`)
  lines.push(`TEL;TYPE=CELL,voice:${contact.mobileE164}`)
  
  if (contact.secondaryPhoneE164) {
    lines.push(`TEL;TYPE=CELL,voice:${contact.secondaryPhoneE164}`)
  }
  
  if (contact.whatsappE164) {
    lines.push(`TEL;TYPE=CELL,voice,whatsapp:${contact.whatsappE164}`)
  }
  
  lines.push(`EMAIL;TYPE=PREF,INTERNET:${contact.email}`)
  lines.push(`URL:${contact.website}`)
  
  if (contact.avatarUrl) {
    const photoUrl = contact.avatarUrl.startsWith('http')
      ? contact.avatarUrl
      : `https://karavan.net${contact.avatarUrl}`
    lines.push(`PHOTO;VALUE=URI:${photoUrl}`)
  }
  
  if (contact.summary) {
    lines.push(`NOTE;CHARSET=UTF-8:${escapeVCard(contact.summary)}`)
  }
  
  lines.push('END:VCARD')
  
  return lines.join('\r\n')
}

function escapeVCard(value) {
  if (!value) return ''
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '')
}

/**
 * Generate email templates
 */
function generateEmailTemplates(contact, marketingConsent, options = {}) {
  const { includeDownloadAttribute = false, filename } = options
  const baseUrl = 'https://karavan.net'
  const downloadUrl = `${baseUrl}/qr/${contact.slug}`

  const downloadLinkLabel = includeDownloadAttribute ? 'Download vCard (.vcf)' : 'Download vCard'
  const downloadLinkAttributes = includeDownloadAttribute && filename
    ? `href="${downloadUrl}" download="${filename}" style="color: #3069B4; text-decoration: none; font-size: 14px; margin-top: 10px; display: inline-block;"`
    : `href="${downloadUrl}" style="color: #3069B4; text-decoration: none; font-size: 14px; margin-top: 10px; display: inline-block;"`

  const downloadLinkHtml = `<a ${downloadLinkAttributes}>
      ${downloadLinkLabel}
    </a>`

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #3069B4; margin: 0 0 10px 0;">Karavan</h1>
  </div>
  
  <h2 style="color: #1C1C1C; margin-top: 0;">Save to contacts: ${contact.displayName}, ${contact.title}</h2>
  
  <p>Here's the contact card for <strong>${contact.displayName}</strong> at Karavan.</p>
  
  <p>Tap <strong>Save</strong> to add it to your phone. The .vcf file is attached, and there's a download link below.</p>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="${downloadUrl}" style="display: inline-block; background-color: #3069B4; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 10px;">
      Save Contact
    </a>
    <br>
    ${downloadLinkHtml}
  </div>
  
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
  
  <p style="font-size: 12px; color: #6b7280; margin: 0;">
    You received this because you requested a contact card at karavan.net.
    ${marketingConsent ? '<br><a href="#" style="color: #3069B4;">Manage preferences</a>' : ''}
  </p>
  
  <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">
    Karavan.net<br>
    For support, contact: info@karavan.net
  </p>
</body>
</html>
  `.trim()

  const textContent = `
Save to contacts: ${contact.displayName}, ${contact.title}

Here's the contact card for ${contact.displayName} at Karavan.

Tap Save to add it to your phone. The .vcf file is attached, and there's a download link below.

Download: ${downloadUrl}

---

You received this because you requested a contact card at karavan.net.

Karavan.net
For support, contact: info@karavan.net
  `.trim()

  return { htmlContent, textContent, downloadUrl }
}

function stringToBase64(value) {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(value)

  let binary = ''
  const chunkSize = 0x8000

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize)
    binary += String.fromCharCode(...chunk)
  }

  return btoa(binary)
}

