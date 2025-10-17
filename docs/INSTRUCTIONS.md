# Project Setup Guide (Next.js + Cloudflare Pages + Pages Functions + Brevo)

This document describes how to set up this project from scratch, including Next.js config, static export, Cloudflare Pages hosting with Pages Functions for the Contact API, and Brevo email configuration.

## 1) Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+
- A Cloudflare account with Pages enabled
- A Brevo (ex-Sendinblue) account with API key and verified sender

## 2) Clone & Install
```bash
git clone <your-repo-url>
cd <project>
npm ci
```

## 3) Next.js Configuration (Static Export)
- File: `next.config.js`
- Required settings:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // static export
  trailingSlash: true,     // ensures trailing slashes for routing
  images: {
    unoptimized: true,     // compatible with static export / CDN
  },
  // Optional: keep if you need GLSL loaders
  ...(process.env.NODE_ENV !== 'development' && {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(glsl|vert|frag)$/,
        use: 'raw-loader',
      });
      return config;
    },
  }),
};
module.exports = nextConfig;
```

Notes:
- Put all static assets into `public/` root (e.g., `/homeimage.png`, `/favicon.ico`, `/site.webmanifest`).
- Use root-absolute paths in code: `/homeimage.png`, `/step1-scan.png`, etc.
- You can use `<img>` for static export; `<Image>` from `next/image` requires extra care.

## 4) Contact API via Cloudflare Pages Functions
Static export cannot run Next.js API routes, so we implement the contact endpoint using Cloudflare Pages Functions.

### Directory structure
```
functions/
  api/
    contact.js        // POST handler
    contact/index.js  // re-export to support trailing slash `/api/contact/`
```

### functions/api/contact.js (example)
```js
export const onRequestPost = async ({ request, env }) => {
  try {
    const { name, email, subject, message, honeypot, captcha } = await request.json();

    if (honeypot) {
      return new Response(JSON.stringify({ error: 'Bot detected' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }
    if (!name || !email || !subject || !message || typeof captcha === 'undefined') {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Brevo config from env
    const apiKey = env.BREVO_API_KEY || '';
    const senderEmail = env.BREVO_SENDER_EMAIL || 'info@scanrapp.com';
    const senderName = env.BREVO_SENDER_NAME || 'Scanr Team';
    const toEmail = env.CONTACT_TO_EMAIL || 'you@example.com';
    const toName = env.CONTACT_TO_NAME || 'Recipient';

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
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to process request' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
```

### functions/api/contact/index.js
```js
export { onRequestPost } from '../contact.js';
```

### Frontend form (fetch)
- Use trailing slash to avoid redirect/404 on Pages: `fetch('/api/contact/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })`
- Include `honeypot` and a simple math `captcha` in formData to block bots.

## 5) Brevo Configuration
- Create API Key: Brevo Dashboard → SMTP & API → Create API Key (Transactional v3)
- Verify Sender: Brevo → Senders & Domains → add/verify sender email (and optionally set up SPF/DKIM DNS)
- Required environment variables in Cloudflare Pages:
  - `BREVO_API_KEY`
  - `BREVO_SENDER_EMAIL` (verified sender)
  - `BREVO_SENDER_NAME`
  - `CONTACT_TO_EMAIL` (recipient)
  - `CONTACT_TO_NAME` (recipient name)

## 6) Cloudflare Pages Settings
- Project → Settings → Functions:
  - Enable Functions: ON
  - Functions directory: `functions`
- Project → Settings → Build & Deploy:
  - Framework preset: None (Static site)
  - Build command: `npm run build`
  - Build output directory: `out`
- Project → Settings → Environment variables:
  - Add the Brevo variables above (Production/Preview as needed)
- (Optional) Caching → Purge Everything after deploy

## 7) Build & Deploy
- Local build:
```bash
npm run build
# Static output in ./out
```
- Push to repository and trigger Pages deploy.
- Verify endpoints and assets:
  - Static: `https://<your-domain>/site.webmanifest`, images like `/homeimage.png`
  - API: `curl -i -X POST https://<your-domain>/api/contact/ -H 'Content-Type: application/json' -d '{"name":"A","email":"a@b.com","subject":"S","message":"M","honeypot":"","captcha":"5"}'`

## 8) Common Issues
- 404 on `/api/contact/`: Functions disabled or wrong Functions directory.
- 500 from API: Missing/invalid Brevo env variables.
- 404 for images/manifest: Files not under `public/` root or wrong paths.
- 308/404 on API without slash: Use trailing slash `/api/contact/` or add `functions/api/contact/index.js`.

---
This guide reflects the working configuration used in this project (static export + Cloudflare Pages Functions + Brevo).
