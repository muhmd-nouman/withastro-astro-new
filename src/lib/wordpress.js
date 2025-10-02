import NodeCache from 'node-cache';

const WP_API_URL = import.meta.env.WORDPRESS_API_URL;
const WP_USERNAME = import.meta.env.WORDPRESS_USERNAME;
const WP_APP_PASSWORD = import.meta.env.WORDPRESS_APP_PASSWORD;

// Cache for 5 minutes
const cache = new NodeCache({ stdTTL: 300 });

function getAuthHeaders() {
  if (WP_USERNAME && WP_APP_PASSWORD) {
    const credentials = btoa(`${WP_USERNAME}:${WP_APP_PASSWORD}`);
    return {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    };
  }
  return { 'Content-Type': 'application/json' };
}

async function fetchWithCache(url, cacheKey) {
  const cached = cache.get(cacheKey);
  if (cached) return cached;
  
  const response = await fetch(url, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  
  const data = await response.json();
  cache.set(cacheKey, data);
  return data;
}

export async function getAllPosts(page = 1, perPage = 10) {
  const cacheKey = `posts_${page}_${perPage}`;
  return fetchWithCache(
    `${WP_API_URL}/wp/v2/posts?page=${page}&per_page=${perPage}&_embed&status=publish`,
    cacheKey
  );
}

export async function getPost(slug) {
  const cacheKey = `post_${slug}`;
  const posts = await fetchWithCache(
    `${WP_API_URL}/wp/v2/posts?slug=${slug}&_embed&status=publish`,
    cacheKey
  );
  return posts[0];
}

export async function getPostsByCategory(categoryId, page = 1, perPage = 10) {
  const cacheKey = `posts_cat_${categoryId}_${page}_${perPage}`;
  return fetchWithCache(
    `${WP_API_URL}/wp/v2/posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_embed&status=publish`,
    cacheKey
  );
}

export async function getCategories() {
  return fetchWithCache(`${WP_API_URL}/wp/v2/categories`, 'categories');
}

export async function getCategory(slug) {
  const cacheKey = `category_${slug}`;
  const categories = await fetchWithCache(
    `${WP_API_URL}/wp/v2/categories?slug=${slug}`,
    cacheKey
  );
  return categories[0];
}

export async function getAuthor(id) {
  const cacheKey = `author_${id}`;
  return fetchWithCache(`${WP_API_URL}/wp/v2/users/${id}`, cacheKey);
}

export async function getPostsByAuthor(authorId, page = 1, perPage = 10) {
  const cacheKey = `posts_author_${authorId}_${page}_${perPage}`;
  return fetchWithCache(
    `${WP_API_URL}/wp/v2/posts?author=${authorId}&page=${page}&per_page=${perPage}&_embed&status=publish`,
    cacheKey
  );
}

export function clearCache(key) {
  if (key) {
    cache.del(key);
  } else {
    cache.flushAll();
  }
}

export function formatWordPressPost(post) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
    date: new Date(post.date),
    modified: new Date(post.modified),
    author: post._embedded?.author?.[0] || null,
    categories: post._embedded?.['wp:term']?.[0] || [],
    tags: post._embedded?.['wp:term']?.[1] || [],
    featuredImage: post._embedded?.['wp:featuredmedia']?.[0] || null,
    link: post.link
  };
}