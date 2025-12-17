import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kuwexstudios.com'
  
  // Base routes
  const routes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/blog',
    '/careers',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // We can add dynamic routes here later (e.g. from Supabase for blog posts)

  return routes
}
