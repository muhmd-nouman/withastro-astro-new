import { clearCache } from '../../lib/wordpress.js';

export const prerender = false;

export async function POST({ request }) {
  try {
    const authHeader = request.headers.get('authorization');
    const webhookSecret = import.meta.env.WEBHOOK_SECRET;
    
    if (!authHeader || authHeader !== `Bearer ${webhookSecret}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { paths } = body;

    if (paths && Array.isArray(paths)) {
      paths.forEach(path => clearCache(path));
    } else {
      clearCache(); // Clear all cache
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Revalidate error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal Server Error' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}