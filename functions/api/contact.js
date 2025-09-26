export const onRequestPost = async ({ request, env }) => {
  try {
    const { name, company, email, role, category, country, gdpr, honeypot } = await request.json();

    // Bot detection
    if (honeypot) {
      return new Response(JSON.stringify({ error: 'Bot detected' }), { 
        status: 403, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Validation
    if (!name || !company || !email || !role || !category || !country || !gdpr) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // HubSpot API integration
    const hubspotApiKey = env.HUBSPOT_API_KEY;
    const hubspotPortalId = env.HUBSPOT_PORTAL_ID;
    const hubspotFormId = env.HUBSPOT_FORM_ID;

    if (!hubspotApiKey || !hubspotPortalId || !hubspotFormId) {
      return new Response(JSON.stringify({ error: 'HubSpot configuration missing' }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Split name into first and last name
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // HubSpot form submission
    const formData = {
      fields: [
        { name: 'firstname', value: firstName },
        { name: 'lastname', value: lastName },
        { name: 'company', value: company },
        { name: 'email', value: email },
        { name: 'role', value: role },
        { name: 'industry', value: category },
        { name: 'country', value: country }
      ],
      context: {
        hutk: '', // HubSpot tracking cookie
        pageUri: request.headers.get('referer') || 'https://karavan.com',
        pageName: 'Karavan Landing Page'
      }
    };

    const hubspotResponse = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!hubspotResponse.ok) {
      const errorText = await hubspotResponse.text();
      console.error('HubSpot API error:', errorText);
      return new Response(JSON.stringify({ 
        error: 'Failed to submit to HubSpot', 
        details: errorText 
      }), { 
        status: 502, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Optional: Send confirmation email via Brevo
    if (env.BREVO_API_KEY && env.BREVO_SENDER_EMAIL) {
      try {
        const emailData = {
          sender: { 
            name: 'Karavan Team', 
            email: env.BREVO_SENDER_EMAIL 
          },
          to: [{ email, name }],
          subject: 'Welcome to Karavan - Thank you for your interest!',
          htmlContent: `
            <h2>Welcome to Karavan!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for your interest in Karavan, the B2B marketplace for Turkic trade.</p>
            <p>We'll be in touch soon with updates about our platform launch.</p>
            <p>Best regards,<br>The Karavan Team</p>
          `,
          textContent: `Welcome to Karavan! Thank you for your interest. We'll be in touch soon.`
        };

        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'api-key': env.BREVO_API_KEY 
          },
          body: JSON.stringify(emailData)
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the request if email fails
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you! We\'ll reach out soon.' 
    }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process request' 
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
};
