<?php
/**
 * Plugin Name: Astro Webhook Integration
 * Description: Sends webhooks to Astro site when content changes
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class AstroWebhookIntegration {
    private $webhook_url;
    private $webhook_secret;

    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('admin_init', array($this, 'admin_init'));
        
        $this->webhook_url = get_option('astro_webhook_url', '');
        $this->webhook_secret = get_option('astro_webhook_secret', '');
        
        if ($this->webhook_url && $this->webhook_secret) {
            $this->setup_hooks();
        }
    }

    public function init() {
        // Plugin initialization
    }

    private function setup_hooks() {
        add_action('wp_after_insert_post', array($this, 'post_updated'), 10, 4);
        add_action('before_delete_post', array($this, 'post_deleted'));
        add_action('created_category', array($this, 'category_created'));
        add_action('edited_category', array($this, 'category_updated'));
        add_action('delete_category', array($this, 'category_deleted'));
    }

    public function post_updated($post_id, $post, $update, $post_before) {
        if ($post->post_status !== 'publish' || $post->post_type !== 'post') {
            return;
        }

        $action = $update ? 'post_updated' : 'post_published';
        $this->send_webhook($action, array('post' => array(
            'id' => $post_id,
            'slug' => $post->post_name,
            'title' => $post->post_title,
            'status' => $post->post_status
        )));
    }

    public function post_deleted($post_id) {
        $post = get_post($post_id);
        if ($post && $post->post_type === 'post') {
            $this->send_webhook('post_deleted', array('post' => array(
                'id' => $post_id,
                'slug' => $post->post_name
            )));
        }
    }

    public function category_created($term_id) {
        $this->send_webhook('category_created', array('category' => array('id' => $term_id)));
    }

    public function category_updated($term_id) {
        $this->send_webhook('category_updated', array('category' => array('id' => $term_id)));
    }

    public function category_deleted($term_id) {
        $this->send_webhook('category_deleted', array('category' => array('id' => $term_id)));
    }

    private function send_webhook($action, $data) {
        if (empty($this->webhook_url) || empty($this->webhook_secret)) {
            return;
        }

        $payload = array_merge(array('action' => $action), $data);

        wp_remote_post($this->webhook_url, array(
            'headers' => array(
                'Content-Type' => 'application/json',
                'X-Webhook-Signature' => $this->webhook_secret
            ),
            'body' => json_encode($payload),
            'timeout' => 15
        ));
    }

    public function admin_menu() {
        add_options_page(
            'Astro Webhook Settings',
            'Astro Webhook',
            'manage_options',
            'astro-webhook',
            array($this, 'admin_page')
        );
    }

    public function admin_init() {
        register_setting('astro_webhook_settings', 'astro_webhook_url');
        register_setting('astro_webhook_settings', 'astro_webhook_secret');
    }

    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>Astro Webhook Settings</h1>
            <form method="post" action="options.php">
                <?php settings_fields('astro_webhook_settings'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">Webhook URL</th>
                        <td>
                            <input type="url" name="astro_webhook_url" value="<?php echo esc_attr($this->webhook_url); ?>" class="regular-text" />
                            <p class="description">Your Astro site webhook URL (e.g., https://yoursite.com/api/webhook)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Webhook Secret</th>
                        <td>
                            <input type="text" name="astro_webhook_secret" value="<?php echo esc_attr($this->webhook_secret); ?>" class="regular-text" />
                            <p class="description">Secret key for webhook authentication</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}

new AstroWebhookIntegration();
?>