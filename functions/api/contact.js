export const onRequestPost = async ({ request, env }) => {
  try {
    const { name, email, subject, message, honeypot } = await request.json();

    // Bot detection
    if (honeypot) {
      return new Response(JSON.stringify({ error: 'Bot detected' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Brevo config from env
    const apiKey = env.BREVO_API_KEY || '';
    const senderEmail = env.BREVO_SENDER_EMAIL || 'info@karavan.net';
    const senderName = env.BREVO_SENDER_NAME || 'Karavan Team';
    const toEmail = env.CONTACT_TO_EMAIL || 'info@karavan.net';
    const toName = env.CONTACT_TO_NAME || 'Karavan Team';

    const emailData = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: toEmail, name: toName }],
      replyTo: { email, name },
      subject: `Contact Form: ${subject}`,
      htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, '<br>')}</p>
      `,
      textContent: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify(emailData),
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      return new Response(JSON.stringify({ error: 'Email provider error', details: errText }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to process request' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
