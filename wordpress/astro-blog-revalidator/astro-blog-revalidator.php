<?php
/*
Plugin Name: Astro Blog Revalidator
Plugin URI: https://github.com/muhmd-nouman/withastro-astro-new
Description: Automatically revalidates Astro blog pages when posts are updated or created
Version: 1.0
Author: Muhammad Nouman
*/

if (!defined('ABSPATH')) exit;

class AstroBlogRevalidator {
    private $vercel_deploy_hook;
    private $api_url;
    private $revalidate_token;

    public function __construct() {
        // Get settings from WordPress options
        $this->vercel_deploy_hook = get_option('astro_vercel_deploy_hook');
        $this->api_url = get_option('astro_api_url');
        $this->revalidate_token = get_option('astro_revalidate_token');

        // Register activation hook
        register_activation_hook(__FILE__, array($this, 'activate_plugin'));

        // Add settings page
        add_action('admin_menu', array($this, 'add_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));

        // Add revalidation hooks
        add_action('save_post', array($this, 'handle_post_update'), 10, 3);
        add_action('post_updated', array($this, 'handle_post_update'), 10, 3);
        add_action('delete_post', array($this, 'handle_post_delete'));
        
        // Add manual revalidation button
        add_action('admin_bar_menu', array($this, 'add_revalidate_button'), 100);
        add_action('wp_ajax_manual_revalidate', array($this, 'handle_manual_revalidation'));
    }

    public function activate_plugin() {
        // Add default options
        add_option('astro_vercel_deploy_hook', '');
        add_option('astro_api_url', '');
        add_option('astro_revalidate_token', '');
    }

    public function add_settings_page() {
        add_options_page(
            'Astro Revalidator Settings',
            'Astro Revalidator',
            'manage_options',
            'astro-revalidator',
            array($this, 'render_settings_page')
        );
    }

    public function register_settings() {
        register_setting('astro-revalidator-settings', 'astro_vercel_deploy_hook');
        register_setting('astro-revalidator-settings', 'astro_api_url');
        register_setting('astro-revalidator-settings', 'astro_revalidate_token');
    }

    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h2>Astro Revalidator Settings</h2>
            <form method="post" action="options.php">
                <?php settings_fields('astro-revalidator-settings'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">Vercel Deploy Hook URL</th>
                        <td>
                            <input type="text" name="astro_vercel_deploy_hook" 
                                value="<?php echo esc_attr(get_option('astro_vercel_deploy_hook')); ?>" 
                                class="regular-text"
                                placeholder="https://api.vercel.com/v1/integrations/deploy/..."
                            />
                            <p class="description">Your Vercel project's deploy hook URL</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">API URL</th>
                        <td>
                            <input type="text" name="astro_api_url" 
                                value="<?php echo esc_attr(get_option('astro_api_url')); ?>" 
                                class="regular-text"
                                placeholder="https://your-site.vercel.app/api/revalidate"
                            />
                            <p class="description">Your Astro site's revalidation API endpoint</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Revalidation Token</th>
                        <td>
                            <input type="password" name="astro_revalidate_token" 
                                value="<?php echo esc_attr(get_option('astro_revalidate_token')); ?>" 
                                class="regular-text"
                            />
                            <p class="description">Secret token for revalidation authentication</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }

    public function handle_post_update($post_id, $post = null, $update = null) {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
        if (wp_is_post_revision($post_id)) return;
        if (get_post_type($post_id) !== 'post') return;

        $this->trigger_revalidation($post_id);
    }

    public function handle_post_delete($post_id) {
        if (get_post_type($post_id) !== 'post') return;
        $this->trigger_revalidation($post_id);
    }

    public function add_revalidate_button($admin_bar) {
        if (!current_user_can('manage_options')) return;

        $admin_bar->add_node(array(
            'id'    => 'revalidate-astro',
            'title' => 'Revalidate Astro Blog',
            'href'  => '#',
            'meta'  => array(
                'onclick' => 'return revalidateAstro();'
            )
        ));

        add_action('admin_footer', array($this, 'add_revalidate_script'));
    }

    public function add_revalidate_script() {
        ?>
        <script type="text/javascript">
        function revalidateAstro() {
            if (!confirm('Are you sure you want to revalidate the entire blog?')) return false;
            
            jQuery.post(ajaxurl, {
                action: 'manual_revalidate',
                nonce: '<?php echo wp_create_nonce('revalidate_astro'); ?>'
            }, function(response) {
                alert(response.success ? 'Revalidation triggered successfully!' : 'Revalidation failed. Please check your settings.');
            });
            return false;
        }
        </script>
        <?php
    }

    public function handle_manual_revalidation() {
        check_ajax_referer('revalidate_astro', 'nonce');
        if (!current_user_can('manage_options')) {
            wp_send_json_error('Unauthorized');
            return;
        }

        $this->trigger_revalidation();
        wp_send_json_success();
    }

    private function trigger_revalidation($post_id = null) {
        // Trigger Vercel deployment if hook is set
        if (!empty($this->vercel_deploy_hook)) {
            wp_remote_post($this->vercel_deploy_hook);
        }

        // Call revalidation API if URL is set
        if (!empty($this->api_url) && !empty($this->revalidate_token)) {
            $response = wp_remote_post($this->api_url, array(
                'headers' => array(
                    'Authorization' => 'Bearer ' . $this->revalidate_token,
                    'Content-Type' => 'application/json'
                ),
                'body' => json_encode(array(
                    'post_id' => $post_id,
                    'secret' => $this->revalidate_token
                ))
            ));

            // Log any errors
            if (is_wp_error($response)) {
                error_log('Astro revalidation failed: ' . $response->get_error_message());
            }
        }
    }
}

// Initialize the plugin
new AstroBlogRevalidator();