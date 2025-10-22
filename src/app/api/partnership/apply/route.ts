import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      companyName,
      contactPerson,
      email,
      phone,
      website,
      partnershipType,
      businessDescription,
      experience,
      targetMarkets,
      additionalInfo
    } = body

    // Validate required fields
    if (!companyName || !contactPerson || !email || !phone || !partnershipType || !businessDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const apiKey = process.env.BREVO_API_KEY
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'info@karavan.net'
    const senderName = process.env.BREVO_SENDER_NAME || 'Karavan Team'

    if (!apiKey) {
      console.error('BREVO_API_KEY is not set')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // TEST: All emails go to tankucukhas@gmail.com
    const partnershipEmail = 'tankucukhas@gmail.com'
    const partnershipName = 'Partnership Team'

    // Create email content
    const emailSubject = `New Partnership Application - ${companyName}`
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          New Partnership Application
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Company Information</h3>
          <p><strong>Company Name:</strong> ${companyName}</p>
          <p><strong>Contact Person:</strong> ${contactPerson}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${website ? `<p><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></p>` : ''}
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Partnership Details</h3>
          <p><strong>Partnership Type:</strong> ${partnershipType}</p>
          <p><strong>Business Description:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6;">
            ${businessDescription}
          </p>
        </div>

        ${experience ? `
        <div style="background-color: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Relevant Experience</h3>
          <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #eab308;">
            ${experience}
          </p>
        </div>
        ` : ''}

        ${targetMarkets ? `
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Target Markets</h3>
          <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #22c55e;">
            ${targetMarkets}
          </p>
        </div>
        ` : ''}

        ${additionalInfo ? `
        <div style="background-color: #fdf2f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Additional Information</h3>
          <p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #ec4899;">
            ${additionalInfo}
          </p>
        </div>
        ` : ''}

        <div style="background-color: #1f2937; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            This partnership application was submitted through the Karavan website.
          </p>
        </div>
      </div>
    `

    const emailText = `
New Partnership Application

Company Information:
- Company Name: ${companyName}
- Contact Person: ${contactPerson}
- Email: ${email}
- Phone: ${phone}
${website ? `- Website: ${website}` : ''}

Partnership Details:
- Partnership Type: ${partnershipType}
- Business Description: ${businessDescription}

${experience ? `Relevant Experience: ${experience}` : ''}
${targetMarkets ? `Target Markets: ${targetMarkets}` : ''}
${additionalInfo ? `Additional Information: ${additionalInfo}` : ''}

This partnership application was submitted through the Karavan website.
    `

    // Send email to partnership team
    const partnershipEmailData = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: partnershipEmail, name: partnershipName }],
      replyTo: { email: email, name: `${contactPerson} (${companyName})` },
      subject: emailSubject,
      htmlContent: emailHtml,
      textContent: emailText
    }

    const partnershipResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(partnershipEmailData)
    })

    if (!partnershipResponse.ok) {
      const errorText = await partnershipResponse.text()
      console.error('Brevo partnership email error:', errorText)
      return NextResponse.json(
        { error: 'Failed to send partnership notification email' },
        { status: 500 }
      )
    }

    // Send confirmation email to applicant
    const confirmationSubject = 'Partnership Application Received - Karavan'
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          Partnership Application Received
        </h2>
        
        <p>Dear ${contactPerson},</p>
        
        <p>Thank you for your interest in partnering with Karavan. We have received your partnership application and will review it carefully.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Application Summary</h3>
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Partnership Type:</strong> ${partnershipType}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p>We will review your application and get back to you within 2-3 business days. If you have any questions in the meantime, please don't hesitate to contact us.</p>
        
        <div style="background-color: #1f2937; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            Best regards,<br>
            The Karavan Partnership Team
          </p>
        </div>
      </div>
    `

    const confirmationText = `
Dear ${contactPerson},

Thank you for your interest in partnering with Karavan. We have received your partnership application and will review it carefully.

Application Summary:
- Company: ${companyName}
- Partnership Type: ${partnershipType}
- Submitted: ${new Date().toLocaleDateString()}

We will review your application and get back to you within 2-3 business days. If you have any questions in the meantime, please don't hesitate to contact us.

Best regards,
The Karavan Partnership Team
    `

    const confirmationEmailData = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: email, name: contactPerson }],
      subject: confirmationSubject,
      htmlContent: confirmationHtml,
      textContent: confirmationText
    }

    const confirmationResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(confirmationEmailData)
    })

    if (!confirmationResponse.ok) {
      console.error('Failed to send confirmation email, but partnership email was sent successfully')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Partnership application submitted successfully' 
    })

  } catch (error) {
    console.error('Partnership application error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
