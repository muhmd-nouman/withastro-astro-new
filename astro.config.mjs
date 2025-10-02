// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://invisiblesymbol.com',
	integrations: [mdx(), sitemap(), tailwind(), react()],
	adapter: node({
		mode: 'standalone'
	}),
	output: 'server',
	server: {
		port: 4321,
		host: true
	},
	vite: {
		define: {
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}
	}
});
