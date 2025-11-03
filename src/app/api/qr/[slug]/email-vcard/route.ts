import { NextRequest, NextResponse } from 'next/server'
import qrContactsData from '@/data/qr-contacts.json'
import { QRContact } from '@/lib/vcard'

// This route only works in development mode
// In production, Cloudflare Pages Functions handle this
// File: functions/api/qr/[slug]/email-vcard.js

const contacts = qrContactsData as QRContact[]

function getContactBySlug(slug: string): QRContact | undefined {
  return contacts.find((contact) => contact.slug === slug)
}

/**
 * Generate vCard content
 */
function generateVCard(contact: QRContact): string {
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

function escapeVCard(value: string): string {
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
function generateEmailTemplates(contact: QRContact, marketingConsent: boolean) {
  const baseUrl = 'https://karavan.net'
  const downloadUrl = `${baseUrl}/qr/${contact.slug}`
  
  // Export for use in error handling
  return { htmlContent: generateHtmlContent(contact, marketingConsent, downloadUrl), textContent: generateTextContent(contact, marketingConsent, downloadUrl), downloadUrl }
}

function generateHtmlContent(contact: QRContact, marketingConsent: boolean, downloadUrl: string) {

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
    <a href="${downloadUrl}" style="color: #3069B4; text-decoration: none; font-size: 14px; margin-top: 10px; display: inline-block;">
      Download vCard
    </a>
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

  return htmlContent
}

function generateTextContent(contact: QRContact, marketingConsent: boolean, downloadUrl: string) {
  return `
Save to contacts: ${contact.displayName}, ${contact.title}

Here's the contact card for ${contact.displayName} at Karavan.

Tap Save to add it to your phone. The .vcf file is attached, and there's a download link below.

Download: ${downloadUrl}

---

You received this because you requested a contact card at karavan.net.

Karavan.net
For support, contact: info@karavan.net
  `.trim()
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { email, marketingConsent = false, honeypot } = await request.json()

    // Bot detection
    if (honeypot) {
      return NextResponse.json(
        { error: 'Bot detected' },
        { status: 403 }
      )
    }

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const contact = getContactBySlug(slug)

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      )
    }

    // Generate vCard
    const vcardContent = generateVCard(contact)
    const filename = `${contact.firstName}_${contact.lastName}.vcf`

    // Brevo config from environment
    const apiKey = process.env.BREVO_API_KEY || ''
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'cards@karavan.net'
    const senderName = process.env.BREVO_SENDER_NAME || 'Karavan Contact Cards'

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Email templates
    const emailSubject = `Your Karavan contact card for ${contact.displayName}`
    const { htmlContent, textContent, downloadUrl } = generateEmailTemplates(contact, marketingConsent)

    // Convert vCard to base64 for attachment
    // Note: Brevo may not support .vcf directly, using text/plain as fallback
    const vcardBase64 = Buffer.from(vcardContent).toString('base64')

    // Send email with vCard attachment
    // Try with text/plain contentType since Brevo may not support vCard format directly
    const emailData: {
      sender: { name: string; email: string }
      to: Array<{ email: string; name: string }>
      subject: string
      htmlContent: string
      textContent: string
      attachment?: Array<{ name: string; content: string; contentType: string }>
    } = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: email.trim(), name: email.trim().split('@')[0] }],
      subject: emailSubject,
      htmlContent,
      textContent,
      attachment: [
        {
          name: filename,
          content: vcardBase64,
          contentType: 'text/vcard',
        },
      ],
      headers: {
        'X-Category': 'vcard',
        'X-Contact-Slug': slug,
      },
    }

    // If Brevo still doesn't accept it, try without attachment and include download link in email
    // For now, we'll try the attachment first

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
      
      // Check if it's a vCard format error
      const errorData = JSON.parse(errText || '{}')
      if (errorData.message && errorData.message.includes('vcf') || errorData.message && errorData.message.includes('Unsupported file format')) {
        // Retry without attachment, include download link in email instead
        console.log('Retrying email without attachment, adding download link...')
        const emailDataWithoutAttachment = {
          sender: { name: senderName, email: senderEmail },
          to: [{ email: email.trim(), name: email.trim().split('@')[0] }],
          subject: emailSubject,
          htmlContent: htmlContent.replace(
            'Download vCard',
            `<a href="${downloadUrl}" download="${filename}" style="color: #3069B4; text-decoration: none; font-size: 14px; margin-top: 10px; display: inline-block;">Download vCard (.vcf)</a>`
          ),
          textContent: textContent + `\n\nDownload vCard: ${downloadUrl}`,
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
          return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 502 }
          )
        }

        const retryResult = await retryRes.json()
        return NextResponse.json({
          success: true,
          message: 'Email sent successfully (download link included)',
          messageId: retryResult.messageId,
        })
      }
      
      // Check for rate limit errors
      if (brevoRes.status === 429) {
        return NextResponse.json(
          { error: 'Try again in a minute' },
          { status: 429 }
        )
      }

      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 502 }
      )
    }

    const brevoResult = await brevoRes.json()

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: brevoResult.messageId,
    })
  } catch (error) {
    console.error('Email vCard error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

