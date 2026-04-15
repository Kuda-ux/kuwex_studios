import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kuwexstudios.co.zw'
  
  const routes: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    
    // Service pages - high priority (money pages)
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services/web-design`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/seo-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/social-media-marketing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/google-ads`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/services/branding`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    
    // Location pages - high priority for local SEO
    { url: `${baseUrl}/locations/harare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/locations/bulawayo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/locations/zimbabwe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    
    // Core pages
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    
    // Blog posts - Zimbabwe digital transformation series (high priority thought leadership)
    { url: `${baseUrl}/blog/zimbabwe-ai-economy-business-lead-or-left-behind`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/why-every-zimbabwean-sme-needs-digital-presence-2026`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/hustle-to-brand-zimbabwean-startups-trust-online`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/new-zimbabwean-customer-checks-google-first`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/zimbabwe-national-ai-strategy-ngos-corporates-government`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/digital-skills-national-power-upskill-team-zimbabwe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/cybersecurity-data-privacy-trust-zimbabwe-digital-economy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/world-class-website-zimbabwean-businesses-compete-globally`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/rise-of-smart-zimbabwe-preparing-businesses-digital-economy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/zimbabwe-future-belongs-visible-businesses-online-growth`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

    // Blog posts - Evergreen guides
    { url: `${baseUrl}/blog/how-much-does-website-cost-zimbabwe-2026`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/seo-guide-zimbabwe-small-businesses`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/google-ads-zimbabwe-beginners-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/best-social-media-platforms-zimbabwe-businesses`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/web-design-trends-zimbabwe-2026`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/google-ads-vs-seo-zimbabwe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/branding-mistakes-zimbabwe-businesses`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Legal pages
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/help`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  return routes
}
