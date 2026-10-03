// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import schemaGraph from '@unschema-graph/astro';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jhdx.dev',
  output: 'static',
  integrations: [
    mdx(),
    sitemap(),
    schemaGraph({
      onError: process.env.NODE_ENV === 'production' ? 'throw' : 'warn',
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          defaultHandler(warning);
        },
      },
    },
  },
});
