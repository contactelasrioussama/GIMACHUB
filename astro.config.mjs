import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gimachub.com',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      // Include both EN and AR URLs; exclude 404 pages
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          ar: 'ar-SA',
        },
      },
      // Per-URL priority and frequency tuning
      serialize(item) {
        const url = item.url;
        // Homepage — highest priority, updated frequently
        if (url === 'https://gimachub.com/' || url === 'https://gimachub.com/ar/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Submit page — high priority during call-for-papers window
        else if (url.includes('/submit')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        // Key sections
        else if (
          url.includes('/venue') ||
          url.includes('/committee') ||
          url.includes('/publications')
        ) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Blog index
        else if (url.match(/\/blog\/?$/)) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        // Blog posts
        else if (url.includes('/blog/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        // Archive pages
        else if (url.includes('/past') || url.includes('/gallery')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        // Everything else
        else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
