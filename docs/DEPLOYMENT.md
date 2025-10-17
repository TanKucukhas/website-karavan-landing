# Karavan Landing Page - Deployment Guide

## Cloudflare Pages Deployment

### 1. Environment Variables

Aşağıdaki environment variables'ları Cloudflare Pages dashboard'da ayarlayın:

#### HubSpot Configuration
```
HUBSPOT_API_KEY=your_hubspot_api_key
HUBSPOT_PORTAL_ID=your_hubspot_portal_id
HUBSPOT_FORM_ID=your_hubspot_form_id
```

#### Brevo Email Configuration (Optional)
```
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_sender_email
BREVO_SENDER_NAME=Karavan Team
CONTACT_TO_EMAIL=info@karavan.com
CONTACT_TO_NAME=Karavan Team
```

### 2. Cloudflare Pages Settings

#### Build Settings
- **Framework preset**: None (Static site)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: `/` (project root)

#### Functions Settings
- **Functions directory**: `functions`
- **Enable Functions**: ON

### 3. HubSpot Setup

1. **HubSpot Account**: Create a HubSpot account
2. **Form Creation**: Create a form in HubSpot and get the Form ID
3. **API Key**: Generate API key from HubSpot Settings > Integrations > API key
4. **Portal ID**: Find your Portal ID in HubSpot Settings > Account Setup

### 4. Domain Configuration

1. **Custom Domain**: Add your domain in Cloudflare Pages
2. **SSL Certificate**: Automatically provided by Cloudflare
3. **DNS**: Point your domain to Cloudflare Pages

### 5. Testing

After deployment, test the following:

1. **Static Assets**: Verify images and CSS load correctly
2. **Form Submission**: Test the contact form
3. **API Endpoint**: Test `/api/contact/` endpoint
4. **HubSpot Integration**: Check if leads appear in HubSpot

### 6. Performance Optimization

- **Lighthouse Score**: Target 90+ score
- **Image Optimization**: Use Next.js Image component
- **Font Loading**: Self-hosted fonts (Inter, Manrope)
- **Caching**: Cloudflare CDN handles caching automatically

### 7. Security Headers

Security headers are configured in `_headers` file:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Content-Security-Policy: Configured for HubSpot integration

### 8. Monitoring

- **Analytics**: HubSpot tracking for form submissions
- **Error Monitoring**: Cloudflare Analytics
- **Performance**: Cloudflare Speed insights

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## File Structure

```
├── functions/
│   └── api/
│       ├── contact.js          # HubSpot form submission
│       └── contact/
│           └── index.js         # API route handler
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO
│   │   └── page.tsx            # Main landing page
│   ├── components/             # React components
│   └── lib/
│       └── hubspot.ts          # HubSpot integration
├── _headers                    # Security headers
├── _redirects                 # URL redirects
└── next.config.ts             # Next.js configuration
```

## Troubleshooting

### Common Issues

1. **Form not submitting**: Check HubSpot API credentials
2. **Build failures**: Ensure all environment variables are set
3. **Static export issues**: Verify `output: 'export'` in next.config.ts
4. **API 404**: Check Functions directory configuration

### Support

For technical support, contact the development team or check the project documentation.
