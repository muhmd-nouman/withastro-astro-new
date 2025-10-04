import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const REVALIDATE_TOKEN = import.meta.env.REVALIDATE_TOKEN;
    
    // Verify authorization
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== REVALIDATE_TOKEN) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { post_id } = body;

    // Clear cache for specific routes
    // You can customize this based on your needs
    const routesToRevalidate = [
      '/',
      '/blog',
      post_id ? `/blog/${post_id}` : null
    ].filter(Boolean);

    // Trigger revalidation for each route
    await Promise.all(routesToRevalidate.map(async (route) => {
      try {
        await fetch(`${import.meta.env.SITE_URL}${route}`, {
          method: 'HEAD',
          headers: { 'Cache-Control': 'no-cache' }
        });
      } catch (error) {
        console.error(`Failed to revalidate ${route}:`, error);
      }
    }));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}