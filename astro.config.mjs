// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    site: 'https://withastro-astro-new.vercel.app',
    integrations: [mdx(), sitemap(), react()],
    output: 'server',
    adapter: vercel({
        webAnalytics: {
            enabled: true,
        },
    }),
    vite: {
      define: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      },

      plugins: [tailwindcss()]
    }
});