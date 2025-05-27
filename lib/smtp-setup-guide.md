# SMTP Email Setup Guide for Cortez

## 📧 Email Configuration Steps

### 1. Gmail SMTP Setup (Recommended)

#### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Security → 2-Step Verification
3. Turn on 2-Step Verification

#### Step 2: Generate App Password
1. Go to Google Account → Security
2. 2-Step Verification → App passwords
3. Select "Mail" and "Other (Custom name)"
4. Enter "Cortez Website" as the name
5. Copy the generated 16-character password

#### Step 3: Update Configuration
In `lib/email-config.ts`, update:
\`\`\`typescript
smtp: {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "sales@britexcbe.com", // Your Gmail address
    pass: "your-16-char-app-password", // The app password from step 2
  },
}
\`\`\`

### 2. Alternative SMTP Providers

#### Option A: Outlook/Hotmail
\`\`\`typescript
smtp: {
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "your-email@outlook.com",
    pass: "your-password",
  },
}
\`\`\`

#### Option B: Yahoo Mail
\`\`\`typescript
smtp: {
  host: "smtp.mail.yahoo.com",
  port: 587,
  secure: false,
  auth: {
    user: "your-email@yahoo.com",
    pass: "your-app-password", // Generate app password in Yahoo settings
  },
}
\`\`\`

#### Option C: Custom Domain/Hosting Provider
\`\`\`typescript
smtp: {
  host: "mail.yourdomain.com", // Your hosting provider's SMTP server
  port: 587, // or 465 for SSL
  secure: false, // true for port 465
  auth: {
    user: "sales@britexcbe.com",
    pass: "your-email-password",
  },
}
\`\`\`

### 3. Environment Variables (Recommended for Security)

Create a `.env.local` file:
\`\`\`env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=sales@britexcbe.com
SMTP_PASS=your-app-password
\`\`\`

Then update `lib/email-config.ts`:
\`\`\`typescript
smtp: {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "sales@britexcbe.com",
    pass: process.env.SMTP_PASS || "your-password",
  },
}
\`\`\`

### 4. Testing the Setup

1. Install nodemailer: `npm install nodemailer @types/nodemailer`
2. Update the SMTP configuration
3. Place a test order
4. Check the console for success/error messages
5. Verify emails are received in the specified inboxes

### 5. Troubleshooting

#### Common Issues:
- **Authentication Error**: Check username/password and app password
- **Connection Timeout**: Verify SMTP host and port
- **SSL/TLS Error**: Try different port (587 vs 465) and secure setting
- **Blocked by Provider**: Some hosting providers block SMTP, contact support

#### Testing Commands:
\`\`\`bash
# Install dependencies
npm install nodemailer @types/nodemailer

# Test SMTP connection
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: 'your-email', pass: 'your-app-password' }
});
transporter.verify().then(console.log).catch(console.error);
"
\`\`\`

### 6. Security Best Practices

1. ✅ Use app passwords instead of account passwords
2. ✅ Store credentials in environment variables
3. ✅ Enable 2FA on email accounts
4. ✅ Use STARTTLS (port 587) instead of SSL (port 465) when possible
5. ✅ Regularly rotate app passwords
6. ✅ Monitor email sending logs

### 7. Production Deployment

For production, consider:
- **SendGrid**: Professional email service with high deliverability
- **AWS SES**: Amazon's email service, cost-effective for high volume
- **Mailgun**: Developer-friendly email API
- **Postmark**: Transactional email specialist

These services offer better deliverability, analytics, and reliability than SMTP.
