<?php
/**
 * Uninstall script for Astro Headless Integration
 */

// Exit if accessed directly or not uninstalling
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Delete plugin options
delete_option('astro_headless_webhook_url');
delete_option('astro_headless_webhook_secret');
delete_option('astro_headless_frontend_url');
delete_option('astro_headless_enable_cors');
