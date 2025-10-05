import type { APIRoute } from 'astro';

const HEADLESS_SECRET = import.meta.env.HEADLESS_SECRET;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('Authorization');
    const secretFromHeader = request.headers.get('X-Headless-Secret-Key');
    
    const providedSecret = authHeader?.replace('Bearer ', '') || secretFromHeader;
    
    if (!providedSecret || providedSecret !== HEADLESS_SECRET) {
      return new Response(
        JSON.stringify({ success: false, message: 'Unauthorized' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse WordPress webhook payload
    const payload = await request.json();
    
    // Extract post information
    const { post, action = 'update' } = payload;
    
    if (!post) {
      return new Response(
        JSON.stringify({ success: false, message: 'No post data provided' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Only process published posts
    if (post.post_status !== 'publish' && action !== 'delete') {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Post not published, skipping revalidation' 
        }), 
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Trigger revalidation
    const revalidatePayload = {
      post_slug: post.post_name,
      action,
      paths: [`/blog/${post.post_name}`, '/blog'],
    };

    // Call internal revalidation endpoint
    const revalidateResponse = await fetch(
      `${new URL(request.url).origin}/api/revalidate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Headless-Secret-Key': HEADLESS_SECRET,
        },
        body: JSON.stringify(revalidatePayload),
      }
    );

    const revalidateResult = await revalidateResponse.json();

    console.log('WordPress webhook processed:', {
      action,
      post_id: post.ID,
      post_slug: post.post_name,
      post_title: post.post_title,
      timestamp: new Date().toISOString(),
      revalidation_result: revalidateResult
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Webhook processed successfully',
        post_slug: post.post_name,
        action,
        revalidation: revalidateResult
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Webhook processing failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};