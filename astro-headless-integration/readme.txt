=== Astro Headless Integration ===
Contributors: invisiblesymbol
Tags: headless, astro, rest-api, webhook, jamstack
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Enables seamless headless WordPress integration with Astro frontend, providing webhook notifications for real-time updates.

== Description ==

Astro Headless Integration is a WordPress plugin designed to work with Astro-based frontends. It provides:

* Automatic webhook notifications when posts are created, updated, or deleted
* CORS configuration for REST API access
* Custom REST API endpoints for enhanced functionality
* Easy configuration through WordPress admin panel
* Support for Vercel deploy hooks for automatic rebuilds

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/astro-headless-integration` directory
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Go to Settings > Astro Headless to configure the plugin
4. Enter your frontend URL and webhook URL (optional)
5. Enable CORS if needed for your frontend

== Frequently Asked Questions ==

= Do I need a webhook URL? =

No, the webhook URL is optional. If you're using Astro's server-side rendering (SSR) or on-demand ISR, you don't need webhooks. The plugin will still enable CORS and provide enhanced REST API functionality.

= How do I get a Vercel deploy hook? =

1. Go to your Vercel project settings
2. Navigate to Git > Deploy Hooks
3. Create a new deploy hook
4. Copy the URL and paste it in the plugin settings

= Does this work with other hosting providers? =

Yes! While the plugin mentions Vercel, it works with any hosting provider that supports webhooks or deploy hooks.

== Changelog ==

= 1.0.0 =
* Initial release
* Webhook notifications for post changes
* CORS support
* Custom REST API endpoints
* Admin configuration panel
