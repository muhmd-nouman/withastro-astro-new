import type { APIRoute } from 'astro';
import { createServer } from '@astrojs/node';

const server = await createServer();

export const all: APIRoute = async (context) => {
  return await server.fetch(context.request);
}