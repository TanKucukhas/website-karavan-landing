import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formData, cvFile } = body

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'jobId', 'experience']
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Brevo configuration
    const apiKey = process.env.BREVO_API_KEY
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'info@karavan.net'
    const senderName = process.env.BREVO_SENDER_NAME || 'Karavan Team'
    // TEST: All emails go to tankucukhas@gmail.com
    const careersEmail = 'tankucukhas@gmail.com'
    const careersName = 'Test User'

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Prepare email content for HR team
    const emailSubject = `New Job Application: ${formData.jobTitle} - ${formData.firstName} ${formData.lastName}`
    
    const emailHtml = `
      <h2>New Job Application</h2>
      <h3>Position: ${formData.jobTitle}</h3>
      
      <h4>Personal Information:</h4>
      <ul>
        <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Phone:</strong> ${formData.phone || 'Not provided'}</li>
        <li><strong>LinkedIn:</strong> ${formData.linkedinUrl || 'Not provided'}</li>
      </ul>
      
      <h4>Experience:</h4>
      <p>${formData.experience}</p>
      
      ${formData.coverLetter ? `
      <h4>Cover Letter:</h4>
      <p>${formData.coverLetter}</p>
      ` : ''}
      
      ${formData.availability ? `
      <h4>Availability:</h4>
      <p>${formData.availability}</p>
      ` : ''}
      
      ${cvFile ? `<p><strong>CV attached:</strong> ${cvFile.name}</p>` : ''}
      
      <hr>
      <p><em>This application was submitted through the Karavan careers page.</em></p>
    `

    // Send notification email to HR team
    const hrEmailData = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: careersEmail, name: careersName }],
      replyTo: { email: formData.email, name: `${formData.firstName} ${formData.lastName}` },
      subject: emailSubject,
      htmlContent: emailHtml,
      textContent: `New Job Application\nPosition: ${formData.jobTitle}\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nLinkedIn: ${formData.linkedinUrl || 'Not provided'}\nExperience: ${formData.experience}\nCover Letter: ${formData.coverLetter || 'Not provided'}\nAvailability: ${formData.availability || 'Not provided'}\nCV: ${cvFile ? cvFile.name : 'Not provided'}`,
      attachment: cvFile ? [{
        name: cvFile.name,
        content: cvFile.content,
        type: cvFile.type
      }] : []
    }

    // Debug: Log attachment info
    if (cvFile) {
      console.log('CV File Info:', {
        name: cvFile.name,
        type: cvFile.type,
        contentLength: cvFile.content?.length,
        hasContent: !!cvFile.content,
        contentPreview: cvFile.content?.substring(0, 50) + '...',
        attachmentObject: {
          name: cvFile.name,
          content: cvFile.content?.substring(0, 100) + '...',
          type: cvFile.type
        }
      })
      
      // Test different attachment formats
      console.log('Testing different attachment formats:')
      console.log('Format 1 (current):', [{
        name: cvFile.name,
        content: cvFile.content,
        type: cvFile.type
      }])
      
      console.log('Format 2 (alternative):', {
        name: cvFile.name,
        content: cvFile.content,
        type: cvFile.type
      })
    }

    const hrResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'api-key': apiKey 
      },
      body: JSON.stringify(hrEmailData)
    })

    if (!hrResponse.ok) {
      const errorText = await hrResponse.text()
      console.error('Brevo HR email error:', errorText)
      console.error('Brevo response status:', hrResponse.status)
      console.error('Brevo response headers:', Object.fromEntries(hrResponse.headers.entries()))
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 }
      )
    } else {
      const responseData = await hrResponse.json()
      console.log('Brevo HR email sent successfully:', responseData)
      console.log('Email data sent to Brevo:', JSON.stringify(hrEmailData, null, 2))
      console.log('Attachments sent:', hrEmailData.attachment)
      console.log('Attachment details:', hrEmailData.attachment?.map(att => ({
        name: att.name,
        type: att.type,
        contentLength: att.content?.length,
        contentStart: att.content?.substring(0, 20)
      })))
    }

    // Send confirmation email to applicant
    const confirmationHtml = `
      <h2>Thank you for your application!</h2>
      <p>Dear ${formData.firstName},</p>
      
      <p>We have received your application for the <strong>${formData.jobTitle}</strong> position at Karavan.</p>
      
      <p>Our team will review your application and get back to you within 5-7 business days.</p>
      
      <p>If you have any questions, please don't hesitate to contact us.</p>
      
      <p>Best regards,<br>
      The Karavan Team</p>
    `

    const confirmationEmailData = {
      sender: { name: senderName, email: senderEmail },
      // TEST: Send confirmation to test email instead of applicant
      to: [{ email: 'tankucukhas@gmail.com', name: `Test - ${formData.firstName} ${formData.lastName}` }],
      subject: `TEST - Application Received - ${formData.firstName} ${formData.lastName}`,
      htmlContent: confirmationHtml,
      textContent: `TEST EMAIL - Thank you for your application!\n\nDear ${formData.firstName},\n\nWe have received your application for the ${formData.jobTitle} position at Karavan.\n\nOur team will review your application and get back to you within 5-7 business days.\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nThe Karavan Team`
    }

    const confirmationResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'api-key': apiKey 
      },
      body: JSON.stringify(confirmationEmailData)
    })

    if (!confirmationResponse.ok) {
      const errorText = await confirmationResponse.text()
      console.error('Brevo confirmation email error:', errorText)
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully' 
    })

  } catch (error) {
    console.error('Application submission error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to submit application' 
      },
      { status: 500 }
    )
  }
}
