import { MetadataRoute } from 'next'

const BASE_URL = 'https://kuwexstudios.co.zw'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Major search engines — explicit allow for crawl-priority signal
            { userAgent: 'Googlebot', allow: '/', disallow: ['/dashboard/', '/api/'] },
            { userAgent: 'Bingbot', allow: '/', disallow: ['/dashboard/', '/api/'] },
            { userAgent: 'DuckDuckBot', allow: '/', disallow: ['/dashboard/', '/api/'] },
            // AI / Answer engines (AEO)
            { userAgent: 'GPTBot', allow: '/', disallow: ['/dashboard/', '/api/'] },
            { userAgent: 'ClaudeBot', allow: '/', disallow: ['/dashboard/', '/api/'] },
            { userAgent: 'PerplexityBot', allow: '/', disallow: ['/dashboard/', '/api/'] },
            // Catch-all
            { userAgent: '*', allow: '/', disallow: ['/dashboard/', '/api/'] },
        ],
        sitemap: [
            `${BASE_URL}/sitemap.xml`,
            `${BASE_URL}/news-sitemap.xml`,
        ],
    }
}
