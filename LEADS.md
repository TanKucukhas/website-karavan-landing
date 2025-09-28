# Lead Collection — Karavan Landing

This document explains how early‑access leads are collected, stored, and notified.

- Destination Sheet: https://docs.google.com/spreadsheets/d/1XU6s-kzgkhOEW_dNX4BZnaPy2HHRI-vkPwnh7FvwK1U/edit?gid=0#gid=0

## Flow
- Users submit any on‑site form:
  - `src/components/HeroSection.tsx`
  - `src/components/CTABanner.tsx`
  - `src/components/EmailCaptureInline.tsx`
- All forms POST to the API endpoint:
  - `functions/api/contact.js`
- The API:
  - Validates email and role; blocks bots via honeypot
  - Sends JSON to the Google Apps Script Web App (saves to Google Sheets)
  - Sends an internal notification email via Brevo

## Environment Variables
Configure in Cloudflare Pages → Project → Settings → Environment variables (also mirrored locally in `.env.local`).

- `APPSCRIPT_WEBAPP_URL`: Apps Script Web App “exec” URL
- `APPSCRIPT_SHARED_SECRET`: Shared secret checked by the Apps Script
- `BREVO_API_KEY`: Brevo (Sendinblue) API key
- `BREVO_SENDER_EMAIL`: Sender email for notifications (e.g., info@karavan.net)
- `BREVO_SENDER_NAME`: Sender name (e.g., Karavan Team)
- `CONTACT_TO_EMAIL`: Recipient for internal lead notifications
- `CONTACT_TO_NAME`: Recipient name (display only)

## Apps Script (Sheets)
- Bound to the Google Sheet above. Deployed as a Web App:
  - Execute as: Me
  - Who has access: Anyone with the link (or domain)
- Expects JSON:
```
{
  "secret": "<APPSCRIPT_SHARED_SECRET>",
  "email": "user@example.com",
  "role": "buyer|seller",
  "country": "TR|US|…",
  "company": "…",
  "source": "hero|cta-banner|inline",
  "pageUri": "https://…",
  "pageName": "…",
  "utm": { "utm_source": "…", "utm_medium": "…", "utm_campaign": "…", "utm_term": "…", "utm_content": "…" },
  "hutk": "hubspotutk cookie (optional)",
  "lang": "en|tr|…"
}
```

## Testing
- Local: 
  - Start dev: `npm run dev` (static export; API runs on Cloudflare Pages in prod)
  - API test against Apps Script directly, for example:
```
curl -sS \
  -H "Content-Type: application/json" \
  --location --post302 \
  --request POST \
  --data '{
    "secret":"supersecret123",
    "email":"real.user@example.com",
    "role":"buyer",
    "country":"US",
    "company":"Acme Corp",
    "source":"landing_page",
    "pageUri":"https://karavan.net/early-access",
    "pageName":"Early Access",
    "utm":{"utm_source":"ads","utm_medium":"cpc","utm_campaign":"launch"},
    "hutk":"hubspot_cookie_value",
    "lang":"en"
  }' \
  "$APPSCRIPT_WEBAPP_URL"
```
- Production:
  - Submit any site form and verify the row appears in the Sheet and a Brevo email arrives.

## Troubleshooting
- No rows in Google Sheets:
  - Check `APPSCRIPT_WEBAPP_URL` & `APPSCRIPT_SHARED_SECRET`
  - Verify Apps Script deployment (latest version, access level)
  - Review Cloudflare Pages logs for `functions/api/contact.js`
- No email received:
  - Verify `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `CONTACT_TO_EMAIL`
  - Check Brevo dashboard for delivery/errors
- 403 unauthorized from Apps Script:
  - Shared secret mismatch

## Notes
- We store only essential lead fields to maximize conversion.
- Add columns in the Sheet as needed; the Apps Script appends in a fixed order (see Script headers).

