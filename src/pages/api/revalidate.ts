import type { APIRoute } from 'astro';

const HEADLESS_SECRET = import.meta.env.HEADLESS_SECRET;
const VERCEL_BYPASS_TOKEN = import.meta.env.VERCEL_BYPASS_TOKEN;
const SITE_URL = import.meta.env.PUBLIC_SITE_URL;

if (!HEADLESS_SECRET) {
  console.error('HEADLESS_SECRET environment variable is required');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verify secret key
    const authHeader = request.headers.get('Authorization');
    const secretFromHeader = request.headers.get('X-Headless-Secret-Key');
    
    const providedSecret = authHeader?.replace('Bearer ', '') || secretFromHeader;
    
    if (!providedSecret || providedSecret !== HEADLESS_SECRET) {
      console.warn('Unauthorized revalidation attempt:', {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent'),
        timestamp: new Date().toISOString()
      });
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Unauthorized: Invalid or missing secret key' 
        }), 
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse request body
    let body;
    try {
      const bodyText = await request.text();
      body = bodyText ? JSON.parse(bodyText) : {};
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid JSON in request body' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { 
      paths = [], 
      tags = [], 
      post_slug, 
      action = 'update'
    } = body;

    // Build paths to revalidate
    const pathsToRevalidate = [...paths];
    
    if (post_slug) {
      pathsToRevalidate.push(`/blog/${post_slug}`);
    }
    
    // Always revalidate blog index
    if (!pathsToRevalidate.includes('/blog')) {
      pathsToRevalidate.push('/blog');
    }

    // Trigger ISR revalidation using Vercel's bypass token
    const revalidationResults = [];
    
    if (VERCEL_BYPASS_TOKEN && SITE_URL) {
      for (const path of pathsToRevalidate) {
        try {
          const revalidateUrl = `${SITE_URL}${path}?__vercel_bypass=${VERCEL_BYPASS_TOKEN}`;
          const response = await fetch(revalidateUrl, { 
            method: 'HEAD',
            headers: {
              'User-Agent': 'Astro-Revalidation/1.0'
            }
          });
          
          revalidationResults.push({
            path,
            success: response.ok,
            status: response.status
          });
        } catch (error) {
          revalidationResults.push({
            path,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    }

    // Log successful revalidation
    console.log('Revalidation triggered:', {
      action,
      post_slug,
      paths: pathsToRevalidate,
      tags,
      timestamp: new Date().toISOString(),
      results: revalidationResults
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Revalidation triggered successfully',
        revalidated: true,
        timestamp: Date.now(),
        paths: pathsToRevalidate,
        tags,
        results: revalidationResults
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Revalidation error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error during revalidation',
        error: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Also support PUT for backward compatibility
export const PUT: APIRoute = POST;
