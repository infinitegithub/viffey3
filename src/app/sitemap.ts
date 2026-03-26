import type { MetadataRoute } from 'next';

const locales = ['en', 'fr', 'ar'];
const baseUrl = 'https://viffey.com';
const routes = ['', '/about', '/services', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    }
  }

  return entries;
}