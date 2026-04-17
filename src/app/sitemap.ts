import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kuwexstudios.co.zw'
  const now = new Date().toISOString()
  
  const routes: MetadataRoute.Sitemap = [
    // ============================================
    // HOMEPAGE - highest priority
    // ============================================
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    
    // ============================================
    // SERVICE PAGES - money pages (highest commercial intent)
    // ============================================
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/web-design`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/seo-services`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/social-media-marketing`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/google-ads`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/branding`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    
    // ============================================
    // LOCATION PAGES - critical for local SEO
    // ============================================
    { url: `${baseUrl}/locations/harare`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/locations/bulawayo`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/locations/zimbabwe`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    
    // ============================================
    // CORE PAGES - trust & engagement pages
    // ============================================
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    
    // ============================================
    // BLOG POSTS - Latest / trending (highest priority)
    // ============================================
    { url: `${baseUrl}/blog/econet-ai-launch-zimbabwe-new-era-artificial-intelligence`, lastModified: '2026-04-17', changeFrequency: 'monthly', priority: 0.9 },
    
    // Blog posts - Zimbabwe digital transformation series
    { url: `${baseUrl}/blog/zimbabwe-ai-economy-business-lead-or-left-behind`, lastModified: '2026-04-14', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/why-every-zimbabwean-sme-needs-digital-presence-2026`, lastModified: '2026-04-12', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/hustle-to-brand-zimbabwean-startups-trust-online`, lastModified: '2026-04-10', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/new-zimbabwean-customer-checks-google-first`, lastModified: '2026-04-08', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/zimbabwe-national-ai-strategy-ngos-corporates-government`, lastModified: '2026-04-05', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/digital-skills-national-power-upskill-team-zimbabwe`, lastModified: '2026-04-02', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/cybersecurity-data-privacy-trust-zimbabwe-digital-economy`, lastModified: '2026-03-28', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/world-class-website-zimbabwean-businesses-compete-globally`, lastModified: '2026-03-22', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/rise-of-smart-zimbabwe-preparing-businesses-digital-economy`, lastModified: '2026-03-16', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/zimbabwe-future-belongs-visible-businesses-online-growth`, lastModified: '2026-03-10', changeFrequency: 'monthly', priority: 0.8 },

    // Blog posts - Evergreen guides
    { url: `${baseUrl}/blog/how-much-does-website-cost-zimbabwe-2026`, lastModified: '2026-03-05', changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog/seo-guide-zimbabwe-small-businesses`, lastModified: '2026-02-28', changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog/google-ads-zimbabwe-beginners-guide`, lastModified: '2026-02-22', changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog/best-social-media-platforms-zimbabwe-businesses`, lastModified: '2026-02-15', changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog/web-design-trends-zimbabwe-2026`, lastModified: '2026-02-08', changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog/google-ads-vs-seo-zimbabwe`, lastModified: '2026-02-01', changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/blog/branding-mistakes-zimbabwe-businesses`, lastModified: '2026-01-25', changeFrequency: 'monthly', priority: 0.75 },

    // ============================================
    // LEGAL & SUPPORT PAGES
    // ============================================
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/help`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  return routes
}
