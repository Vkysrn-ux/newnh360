# Email Setup Instructions for Cortez

Since Vercel's Edge Runtime doesn't support traditional SMTP (nodemailer), we need to use web-based email services. Here are the recommended options:

## Option 1: Resend (Recommended)

Resend is designed for Vercel and works perfectly with Edge Runtime.

### Setup Steps:
1. Go to [resend.com](https://resend.com)
2. Create a free account (100 emails/day free)
3. Verify your domain or use their test domain
4. Get your API key from the dashboard
5. Add to Vercel environment variables:
   \`\`\`
   RESEND_API_KEY=re_your_api_key_here
   \`\`\`

### Benefits:
- ✅ Works with Vercel Edge Runtime
- ✅ Professional email delivery
- ✅ Good deliverability rates
- ✅ Free tier available

## Option 2: EmailJS

EmailJS works entirely in the browser and is perfect for client-side email sending.

### Setup Steps:
1. Go to [emailjs.com](https://emailjs.com)
2. Create account and email service
3. Create email templates
4. Get your public key
5. Add to environment variables:
   \`\`\`
   EMAILJS_PUBLIC_KEY=your_public_key_here
   \`\`\`

## Option 3: Webhook Services

Use Zapier, Make.com, or similar services to handle email sending.

### Setup Steps:
1. Create a webhook in Zapier/Make.com
2. Connect it to your email service (Gmail, Outlook, etc.)
3. Add webhook URL to environment variables:
   \`\`\`
   EMAIL_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-id/
   \`\`\`

## Option 4: Vercel Functions with Node.js Runtime

If you need traditional SMTP, you can use Vercel Functions with Node.js runtime instead of Edge Runtime.

### Setup Steps:
1. Create a separate API route with Node.js runtime
2. Use nodemailer in that route
3. Configure SMTP settings

## Current Fallback

The current implementation will:
1. Try Resend API first
2. Fall back to EmailJS
3. Fall back to webhook
4. Finally, open email client with pre-filled content

This ensures emails are sent even if some services are not configured.
