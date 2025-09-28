import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      role, 
      country, 
      source, 
      pageUri, 
      pageName, 
      utm, 
      hutk, 
      lang, 
      honeypot 
    } = await request.json()

    // Bot detection
    if (honeypot) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 403 })
    }

    // Validation
    if (!email || !role) {
      return NextResponse.json({ error: 'Email and role are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // 1) Google Script Integration (if configured)
    let googleScriptSuccess = false
    if (process.env.APPSCRIPT_WEBAPP_URL && process.env.APPSCRIPT_SHARED_SECRET) {
      try {
        const googleScriptUrl = process.env.APPSCRIPT_WEBAPP_URL
        
        console.log('Google Script: Attempting to log to sheets...', { url: googleScriptUrl })
        
        const googleScriptRes = await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: process.env.APPSCRIPT_SHARED_SECRET,
            email,
            role,
            country,
            company: '', // Add company field if needed
            source,
            pageUri,
            pageName,
            utm,
            hutk,
            lang,
            timestamp: new Date().toISOString()
          })
        })
        
        if (googleScriptRes.ok) {
          const responseText = await googleScriptRes.text()
          console.log('Google Script response:', responseText)
          
          // Check if the response indicates success
          try {
            const responseData = JSON.parse(responseText)
            if (responseData.ok === true) {
              googleScriptSuccess = true
              console.log('Google Script: Successfully logged to sheets')
            } else {
              console.error('Google Script: Failed to log to sheets', { error: responseData.error })
            }
          } catch (parseError) {
            console.error('Google Script: Invalid JSON response', { response: responseText })
          }
        } else {
          const errorText = await googleScriptRes.text()
          console.error('Google Script error:', { status: googleScriptRes.status, error: errorText })
        }
      } catch (error) {
        console.error('Google Script request failed:', error)
      }
    } else {
      console.log('Google Script: Not configured (APPSCRIPT_WEBAPP_URL or APPSCRIPT_SHARED_SECRET missing)')
    }

    // 2) Brevo Notification Email (if configured)
    let brevoSuccess = false
    if (process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL && process.env.CONTACT_TO_EMAIL) {
      try {
        const toName = process.env.CONTACT_TO_NAME || 'Karavan Team'
        const senderName = process.env.BREVO_SENDER_NAME || 'Karavan'
        const subject = 'New Early Access Lead'
        
        const htmlContent = `
          <h3>New Early Access Lead</h3>
          <p><b>Email:</b> ${email}</p>
          <p><b>Role:</b> ${role}</p>
          <p><b>Country:</b> ${country || 'Not specified'}</p>
          <p><b>Source:</b> ${source || 'Not specified'}</p>
          <p><b>Page:</b> ${pageName || 'Not specified'}<br>${pageUri || 'Not specified'}</p>
          <p><b>Language:</b> ${lang || 'Not specified'}</p>
          <p><b>Timestamp:</b> ${new Date().toLocaleString()}</p>
        `
        
        const emailData = {
          sender: { name: senderName, email: process.env.BREVO_SENDER_EMAIL },
          to: [{ email: process.env.CONTACT_TO_EMAIL, name: toName }],
          subject,
          htmlContent,
          textContent: `New Early Access Lead\nEmail: ${email}\nRole: ${role}\nCountry: ${country || 'Not specified'}\nSource: ${source || 'Not specified'}\nPage: ${pageName || 'Not specified'}\nURL: ${pageUri || 'Not specified'}\nLanguage: ${lang || 'Not specified'}\nTimestamp: ${new Date().toLocaleString()}`
        }

        console.log('Sending Brevo notification...', { toEmail: process.env.CONTACT_TO_EMAIL, senderEmail: process.env.BREVO_SENDER_EMAIL })

        const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
          body: JSON.stringify(emailData)
        })

        if (brevoRes.ok) {
          brevoSuccess = true
          const brevoResult = await brevoRes.json()
          console.log('Brevo notification sent:', brevoResult)
        } else {
          const errorText = await brevoRes.text()
          console.error('Brevo notification error:', errorText)
        }
      } catch (error) {
        console.error('Brevo notification request failed:', error)
      }
    } else {
      console.log('Brevo notification: Not configured (BREVO_API_KEY, BREVO_SENDER_EMAIL, or CONTACT_TO_EMAIL missing)')
    }

    // Return success if at least one method worked
    const hasAnyMethod = googleScriptSuccess || brevoSuccess
    const hasAnyConfiguration = process.env.APPSCRIPT_WEBAPP_URL || process.env.BREVO_API_KEY

    if (hasAnyMethod) {
      return NextResponse.json({ 
        success: true, 
        message: 'Early access request submitted successfully',
        details: {
          googleScript: googleScriptSuccess,
          brevoNotification: brevoSuccess,
          configured: true
        }
      })
    } else if (!hasAnyConfiguration) {
      return NextResponse.json({ 
        success: true, 
        message: 'Early access request submitted (no integrations configured)',
        details: {
          googleScript: false,
          brevoNotification: false,
          configured: false
        }
      })
    } else {
      return NextResponse.json({ 
        error: 'Failed to process early access request' 
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Early access form error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
