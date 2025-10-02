<?php
/**
 * Plugin Name: Astro Headless Integration
 * Plugin URI: https://invisiblesymbol.com
 * Description: Enables headless WordPress integration with Astro frontend. Provides webhook notifications for real-time updates.
 * Version: 1.0.0
 * Author: Invisible Symbol
 * Author URI: https://invisiblesymbol.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: astro-headless
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('ASTRO_HEADLESS_VERSION', '1.0.0');
define('ASTRO_HEADLESS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('ASTRO_HEADLESS_PLUGIN_URL', plugin_dir_url(__FILE__));

class Astro_Headless_Integration {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        // Initialize plugin
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        
        // Hook into post save/update/delete
        add_action('save_post', array($this, 'trigger_webhook'), 10, 3);
        add_action('delete_post', array($this, 'trigger_webhook_on_delete'), 10, 2);
        add_action('transition_post_status', array($this, 'trigger_webhook_on_status_change'), 10, 3);
        
        // Add CORS headers for REST API
        add_action('rest_api_init', array($this, 'add_cors_headers'));
        
        // Add custom REST API endpoints
        add_action('rest_api_init', array($this, 'register_custom_endpoints'));
    }
    
    public function init() {
        // Enable featured images for posts
        add_theme_support('post-thumbnails');
        
        // Enable excerpt for pages
        add_post_type_support('page', 'excerpt');
    }
    
    public function add_admin_menu() {
        add_options_page(
            'Astro Headless Settings',
            'Astro Headless',
            'manage_options',
            'astro-headless-settings',
            array($this, 'render_settings_page')
        );
    }
    
    public function register_settings() {
        register_setting('astro_headless_settings', 'astro_headless_webhook_url');
        register_setting('astro_headless_settings', 'astro_headless_webhook_secret');
        register_setting('astro_headless_settings', 'astro_headless_frontend_url');
        register_setting('astro_headless_settings', 'astro_headless_enable_cors');
    }
    
    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1>Astro Headless Integration Settings</h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('astro_headless_settings');
                do_settings_sections('astro_headless_settings');
                ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="astro_headless_frontend_url">Frontend URL</label>
                        </th>
                        <td>
                            <input type="url" 
                                   id="astro_headless_frontend_url" 
                                   name="astro_headless_frontend_url" 
                                   value="<?php echo esc_attr(get_option('astro_headless_frontend_url')); ?>" 
                                   class="regular-text" 
                                   placeholder="https://invisiblesymbol.com">
                            <p class="description">Your Astro frontend URL (e.g., https://invisiblesymbol.com)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="astro_headless_webhook_url">Webhook URL</label>
                        </th>
                        <td>
                            <input type="url" 
                                   id="astro_headless_webhook_url" 
                                   name="astro_headless_webhook_url" 
                                   value="<?php echo esc_attr(get_option('astro_headless_webhook_url')); ?>" 
                                   class="regular-text" 
                                   placeholder="https://api.vercel.com/v1/integrations/deploy/...">
                            <p class="description">Vercel Deploy Hook URL for automatic rebuilds (optional for ISR)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="astro_headless_webhook_secret">Webhook Secret</label>
                        </th>
                        <td>
                            <input type="text" 
                                   id="astro_headless_webhook_secret" 
                                   name="astro_headless_webhook_secret" 
                                   value="<?php echo esc_attr(get_option('astro_headless_webhook_secret')); ?>" 
                                   class="regular-text">
                            <p class="description">Optional secret key for webhook authentication</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="astro_headless_enable_cors">Enable CORS</label>
                        </th>
                        <td>
                            <input type="checkbox" 
                                   id="astro_headless_enable_cors" 
                                   name="astro_headless_enable_cors" 
                                   value="1" 
                                   <?php checked(1, get_option('astro_headless_enable_cors'), true); ?>>
                            <p class="description">Enable CORS headers for REST API requests from your frontend</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
            
            <hr>
            
            <h2>Test Webhook</h2>
            <p>Click the button below to test your webhook configuration:</p>
            <button type="button" class="button button-secondary" id="test-webhook">Test Webhook</button>
            <div id="webhook-test-result" style="margin-top: 10px;"></div>
            
            <script>
            jQuery(document).ready(function($) {
                $('#test-webhook').on('click', function() {
                    var button = $(this);
                    var resultDiv = $('#webhook-test-result');
                    
                    button.prop('disabled', true).text('Testing...');
                    resultDiv.html('');
                    
                    $.ajax({
                        url: ajaxurl,
                        type: 'POST',
                        data: {
                            action: 'test_astro_webhook',
                            nonce: '<?php echo wp_create_nonce('test_webhook'); ?>'
                        },
                        success: function(response) {
                            if (response.success) {
                                resultDiv.html('<div class="notice notice-success"><p>' + response.data.message + '</p></div>');
                            } else {
                                resultDiv.html('<div class="notice notice-error"><p>' + response.data.message + '</p></div>');
                            }
                        },
                        error: function() {
                            resultDiv.html('<div class="notice notice-error"><p>Failed to test webhook</p></div>');
                        },
                        complete: function() {
                            button.prop('disabled', false).text('Test Webhook');
                        }
                    });
                });
            });
            </script>
        </div>
        <?php
    }
    
    public function add_cors_headers() {
        if (!get_option('astro_headless_enable_cors')) {
            return;
        }
        
        $frontend_url = get_option('astro_headless_frontend_url');
        
        if ($frontend_url) {
            header("Access-Control-Allow-Origin: " . $frontend_url);
        } else {
            header("Access-Control-Allow-Origin: *");
        }
        
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Credentials: true");
    }
    
    public function trigger_webhook($post_id, $post, $update) {
        // Don't trigger for autosaves or revisions
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        
        if (wp_is_post_revision($post_id)) {
            return;
        }
        
        // Only trigger for published posts
        if ($post->post_status !== 'publish') {
            return;
        }
        
        // Only trigger for posts (not pages or other post types)
        if ($post->post_type !== 'post') {
            return;
        }
        
        $this->send_webhook_notification(array(
            'event' => $update ? 'post_updated' : 'post_created',
            'post_id' => $post_id,
            'post_slug' => $post->post_name,
            'post_title' => $post->post_title,
            'post_type' => $post->post_type,
            'timestamp' => current_time('mysql')
        ));
    }
    
    public function trigger_webhook_on_delete($post_id, $post) {
        if ($post->post_type !== 'post') {
            return;
        }
        
        $this->send_webhook_notification(array(
            'event' => 'post_deleted',
            'post_id' => $post_id,
            'post_slug' => $post->post_name,
            'post_title' => $post->post_title,
            'post_type' => $post->post_type,
            'timestamp' => current_time('mysql')
        ));
    }
    
    public function trigger_webhook_on_status_change($new_status, $old_status, $post) {
        if ($post->post_type !== 'post') {
            return;
        }
        
        // Trigger when post is published or unpublished
        if ($new_status === 'publish' && $old_status !== 'publish') {
            $this->send_webhook_notification(array(
                'event' => 'post_published',
                'post_id' => $post->ID,
                'post_slug' => $post->post_name,
                'post_title' => $post->post_title,
                'post_type' => $post->post_type,
                'timestamp' => current_time('mysql')
            ));
        } elseif ($old_status === 'publish' && $new_status !== 'publish') {
            $this->send_webhook_notification(array(
                'event' => 'post_unpublished',
                'post_id' => $post->ID,
                'post_slug' => $post->post_name,
                'post_title' => $post->post_title,
                'post_type' => $post->post_type,
                'timestamp' => current_time('mysql')
            ));
        }
    }
    
    private function send_webhook_notification($data) {
        $webhook_url = get_option('astro_headless_webhook_url');
        
        if (empty($webhook_url)) {
            return;
        }
        
        $secret = get_option('astro_headless_webhook_secret');
        
        $headers = array(
            'Content-Type' => 'application/json'
        );
        
        if (!empty($secret)) {
            $headers['X-Webhook-Secret'] = $secret;
        }
        
        $response = wp_remote_post($webhook_url, array(
            'headers' => $headers,
            'body' => json_encode($data),
            'timeout' => 15
        ));
        
        // Log the response for debugging
        if (is_wp_error($response)) {
            error_log('Astro Headless Webhook Error: ' . $response->get_error_message());
        }
    }
    
    public function register_custom_endpoints() {
        // Endpoint to get recent posts with full data
        register_rest_route('astro/v1', '/recent-posts', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_recent_posts'),
            'permission_callback' => '__return_true'
        ));
        
        // Endpoint to clear cache (can be called from frontend)
        register_rest_route('astro/v1', '/clear-cache', array(
            'methods' => 'POST',
            'callback' => array($this, 'clear_cache'),
            'permission_callback' => array($this, 'verify_webhook_secret')
        ));
    }
    
    public function get_recent_posts($request) {
        $posts = get_posts(array(
            'numberposts' => 10,
            'post_status' => 'publish'
        ));
        
        return rest_ensure_response($posts);
    }
    
    public function clear_cache($request) {
        // This can be used to trigger cache clearing on your Astro site
        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Cache clear signal sent'
        ));
    }
    
    public function verify_webhook_secret($request) {
        $secret = get_option('astro_headless_webhook_secret');
        
        if (empty($secret)) {
            return true; // No secret set, allow all requests
        }
        
        $provided_secret = $request->get_header('X-Webhook-Secret');
        
        return $secret === $provided_secret;
    }
}

// Initialize the plugin
Astro_Headless_Integration::get_instance();

// AJAX handler for testing webhook
add_action('wp_ajax_test_astro_webhook', 'astro_test_webhook_handler');

function astro_test_webhook_handler() {
    check_ajax_referer('test_webhook', 'nonce');
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Unauthorized'));
        return;
    }
    
    $webhook_url = get_option('astro_headless_webhook_url');
    
    if (empty($webhook_url)) {
        wp_send_json_error(array('message' => 'No webhook URL configured'));
        return;
    }
    
    $secret = get_option('astro_headless_webhook_secret');
    
    $headers = array(
        'Content-Type' => 'application/json'
    );
    
    if (!empty($secret)) {
        $headers['X-Webhook-Secret'] = $secret;
    }
    
    $response = wp_remote_post($webhook_url, array(
        'headers' => $headers,
        'body' => json_encode(array(
            'event' => 'test',
            'message' => 'This is a test webhook from Astro Headless Integration',
            'timestamp' => current_time('mysql')
        )),
        'timeout' => 15
    ));
    
    if (is_wp_error($response)) {
        wp_send_json_error(array('message' => 'Webhook failed: ' . $response->get_error_message()));
    } else {
        $status_code = wp_remote_retrieve_response_code($response);
        if ($status_code >= 200 && $status_code < 300) {
            wp_send_json_success(array('message' => 'Webhook test successful! Status: ' . $status_code));
        } else {
            wp_send_json_error(array('message' => 'Webhook returned status: ' . $status_code));
        }
    }
}
