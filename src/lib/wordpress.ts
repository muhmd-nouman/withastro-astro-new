// WordPress API Configuration
const WP_API_URL = import.meta.env.PUBLIC_WP_API_URL;
const WP_USER = import.meta.env.WP_USER;
const WP_APP_PASS = import.meta.env.WP_APP_PASS;
const WP_BASIC_AUTH_USER = import.meta.env.WP_BASIC_AUTH_USER;
const WP_BASIC_AUTH_PASS = import.meta.env.WP_BASIC_AUTH_PASS;

if (!WP_API_URL) {
  throw new Error('PUBLIC_WP_API_URL environment variable is required');
}

export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
        sizes: Record<string, {
          source_url: string;
          width: number;
          height: number;
        }>;
      };
    }>;
    author?: Array<{
      id: number;
      name: string;
      description: string;
      avatar_urls: Record<string, string>;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

// Create fetch headers with authentication
function createHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'User-Agent': 'Astro-WordPress-Client/1.0',
  };

  // Add basic auth if configured
  if (WP_BASIC_AUTH_USER && WP_BASIC_AUTH_PASS) {
    headers['Authorization'] = `Basic ${btoa(`${WP_BASIC_AUTH_USER}:${WP_BASIC_AUTH_PASS}`)}`;
  }

  return headers;
}

// Enhanced fetch with retry logic and better error handling
async function wpFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const maxRetries = 3;
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...createHeaders(),
          ...options.headers,
        },
        // Add timeout
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (response.ok) {
        return response;
      }

      // Handle specific HTTP errors
      if (response.status === 404) {
        throw new Error(`Resource not found: ${url}`);
      }
      if (response.status === 401 || response.status === 403) {
        throw new Error(`Authentication failed: ${response.statusText}`);
      }
      if (response.status >= 500) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on authentication or not found errors
      if (error instanceof Error && 
          (error.message.includes('Authentication failed') || 
           error.message.includes('Resource not found'))) {
        throw error;
      }

      // Wait before retry (exponential backoff)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }

  throw lastError!;
}

// Fetch all posts with embedded media and author
export async function getAllPosts(page = 1, perPage = 20): Promise<{
  posts: WordPressPost[];
  totalPages: number;
  totalPosts: number;
}> {
  try {
    const response = await wpFetch(
      `${WP_API_URL}/posts?_embed&per_page=${perPage}&page=${page}&status=publish&orderby=date&order=desc`
    );
    
    const posts = await response.json();
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    
    return {
      posts,
      totalPages,
      totalPosts,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
      totalPages: 0,
      totalPosts: 0,
    };
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    // Sanitize slug to prevent injection
    const sanitizedSlug = encodeURIComponent(slug.replace(/[^a-zA-Z0-9-_]/g, ''));
    
    const response = await wpFetch(
      `${WP_API_URL}/posts?slug=${sanitizedSlug}&_embed&status=publish`
    );
    
    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Get all post slugs for static path generation
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const response = await wpFetch(
      `${WP_API_URL}/posts?per_page=100&status=publish&_fields=slug`
    );
    
    const posts = await response.json();
    return posts.map((post: { slug: string }) => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

// Trigger revalidation for a specific post
export async function revalidatePost(slug: string): Promise<boolean> {
  try {
    const siteUrl = import.meta.env.PUBLIC_SITE_URL;
    const bypassToken = import.meta.env.VERCEL_BYPASS_TOKEN;
    
    if (!siteUrl || !bypassToken) {
      console.warn('Site URL or bypass token not configured for revalidation');
      return false;
    }

    const paths = [`/blog/${slug}`, '/blog'];
    
    for (const path of paths) {
      const revalidateUrl = `${siteUrl}${path}?__vercel_bypass=${bypassToken}`;
      await fetch(revalidateUrl, { method: 'HEAD' });
    }
    
    return true;
  } catch (error) {
    console.error('Error revalidating post:', error);
    return false;
  }
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get relative time (e.g., "2 hours ago")
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return formatDate(dateString);
}

// Sanitize HTML content
export function sanitizeContent(html: string): string {
  // Basic HTML sanitization - in production, consider using a proper library like DOMPurify
  return html
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}