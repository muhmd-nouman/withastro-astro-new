import { clearCache } from '../../lib/wordpress.js';

export const prerender = false;

export async function POST({ request }) {
  try {
    const signature = request.headers.get('x-webhook-signature');
    const webhookSecret = import.meta.env.WEBHOOK_SECRET;
    
    if (!webhookSecret || signature !== webhookSecret) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { action, post } = body;

    // Clear relevant cache based on action
    switch (action) {
      case 'post_updated':
      case 'post_published':
      case 'post_deleted':
        clearCache(`post_${post.slug}`);
        clearCache(); // Clear all posts cache
        break;
      case 'category_updated':
      case 'category_created':
      case 'category_deleted':
        clearCache('categories');
        clearCache(); // Clear all cache as categories affect posts
        break;
      default:
        clearCache(); // Clear all cache for unknown actions
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}