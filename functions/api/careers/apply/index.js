const nodemailer = require('nodemailer')

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Parse JSON body
    const body = JSON.parse(event.body)
    const { formData, cvFile } = body

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'jobId', 'experience']
    for (const field of requiredFields) {
      if (!formData[field]) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ error: `Missing required field: ${field}` })
        }
      }
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Prepare email content
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

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CAREERS_EMAIL || process.env.EMAIL_USER,
      subject: emailSubject,
      html: emailHtml,
      attachments: cvFile ? [{
        filename: cvFile.name,
        content: cvFile.content,
        contentType: cvFile.type
      }] : []
    }

    // Send email
    await transporter.sendMail(mailOptions)

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

    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Application Received - Karavan',
      html: confirmationHtml
    }

    await transporter.sendMail(confirmationMailOptions)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Application submitted successfully' 
      })
    }

  } catch (error) {
    console.error('Application submission error:', error)
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Failed to submit application' 
      })
    }
  }
}
