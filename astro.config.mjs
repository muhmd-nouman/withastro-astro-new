// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    // site: 'https://withastro-astro-new.vercel.app',
    integrations: [mdx(), sitemap(), react()],
    site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
    output: 'server',
      adapter: vercel({
        isr: {
            expiration: 60, // Cache for 60 seconds
            bypassToken: process.env.VERCEL_BYPASS_TOKEN,
        },
    }),
    vite: {
        define: {
        __WP_API_URL__: JSON.stringify(process.env.PUBLIC_WP_API_URL),
        __WP_GRAPHQL_URL__: JSON.stringify(process.env.PUBLIC_WP_GRAPHQL_URL),
        },

      plugins: [tailwindcss()]
    }
});