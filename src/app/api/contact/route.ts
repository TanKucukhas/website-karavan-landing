import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, honeypot, source } = await request.json()

    // Bot detection
    if (honeypot) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 403 })
    }
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Brevo configuration
    const apiKey = process.env.BREVO_API_KEY || ''
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'info@karavan.net'
    const senderName = process.env.BREVO_SENDER_NAME || 'Karavan Team'
    const toEmail = process.env.CONTACT_TO_EMAIL || 'info@karavan.net'
    const toName = process.env.CONTACT_TO_NAME || 'Karavan Team'

    if (!apiKey) {
      console.log('Contact form submission (no Brevo API key):', {
        name,
        email,
        subject,
        message,
        source: source || 'unknown',
        timestamp: new Date().toISOString()
      })
      return NextResponse.json({ 
        success: true, 
        message: 'Form submitted (Brevo API key not configured)' 
      })
    }

    const emailData = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: toEmail, name: toName }],
      replyTo: { email, name },
      subject: `Contact Form: ${subject}`,
      htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Source:</strong> ${source || 'contact-form'}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, '<br>')}</p>
      `,
      textContent: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    }

    console.log('Sending email via Brevo...', { toEmail, senderEmail })

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify(emailData),
    })

    if (!brevoRes.ok) {
      const errText = await brevoRes.text()
      console.error('Brevo error:', errText)
      return NextResponse.json({ error: 'Email provider error', details: errText }, { status: 502 })
    }

    const brevoResult = await brevoRes.json()
    console.log('Brevo response:', brevoResult)

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully via Brevo' 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
