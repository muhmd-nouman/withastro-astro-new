# Deployment Guide

## WordPress Setup

1. **Install the Webhook Plugin**
   - Upload `astro-headless-integration/astro-webhook.php` to your WordPress plugins directory
   - Activate the plugin in WordPress admin
   - Go to Settings > Astro Webhook and configure:
     - Webhook URL: `https://your-astro-site.com/api/webhook`
     - Webhook Secret: Use the same value as `WEBHOOK_SECRET` in your environment

2. **Create WordPress App Password**
   - Go to Users > Your Profile in WordPress admin
   - Scroll to "Application Passwords"
   - Create a new app password for "Astro Integration"
   - Use this as `WORDPRESS_APP_PASSWORD`

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json
WORDPRESS_USERNAME=your_wp_username
WORDPRESS_APP_PASSWORD=your_generated_app_password
WEBHOOK_SECRET=generate_a_secure_random_string
SITE_URL=https://your-astro-site.com
NODE_ENV=production
```

## Netlify Deployment

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

## Vercel Deployment

1. Connect your repository to Vercel
2. Vercel will auto-detect Astro settings
3. Add environment variables in Vercel dashboard
4. Deploy!

## Security Features

- ✅ Webhook signature verification
- ✅ WordPress App Password authentication
- ✅ Security headers configured
- ✅ Environment variable protection
- ✅ HTTPS enforcement

## Real-time Updates

The webhook system ensures:
- New posts appear immediately
- Updated posts refresh cache
- Deleted posts are removed
- Category changes trigger updates
- No full site rebuilds needed