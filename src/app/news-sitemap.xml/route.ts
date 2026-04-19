// Google News sitemap - only articles published in last 48 hours qualify
// but we include 30 days to maximize coverage for news aggregators

const SITE_URL = 'https://kuwexstudios.co.zw';

interface NewsPost {
  slug: string;
  title: string;
  date: string; // ISO date
  keywords: string;
}

const newsPosts: NewsPost[] = [
  {
    slug: 'econet-ai-launch-zimbabwe-new-era-artificial-intelligence',
    title: 'Econet Launches AI in Zimbabwe — And Nothing Will Ever Be the Same Again',
    date: '2026-04-17T07:00:00+02:00',
    keywords: 'Econet AI, Zimbabwe AI, Tatenda Mavetera, artificial intelligence Africa, NDS2, digital transformation',
  },
  {
    slug: 'zimbabwe-ai-economy-business-lead-or-left-behind',
    title: 'Zimbabwe Is Entering the AI Economy: Will Your Business Lead or Be Left Behind?',
    date: '2026-04-14T09:00:00+02:00',
    keywords: 'Zimbabwe AI, National AI Strategy, AI economy, business transformation',
  },
  {
    slug: 'why-every-zimbabwean-sme-needs-digital-presence-2026',
    title: 'Why Every Zimbabwean SME Needs a Serious Digital Presence in 2026',
    date: '2026-04-12T09:00:00+02:00',
    keywords: 'Zimbabwe SME, digital presence, small business Zimbabwe',
  },
  {
    slug: 'hustle-to-brand-zimbabwean-startups-trust-online',
    title: 'From Hustle to Brand: How Zimbabwean Startups Can Build Trust Online Faster',
    date: '2026-04-10T09:00:00+02:00',
    keywords: 'Zimbabwe startups, branding, online trust',
  },
  {
    slug: 'new-zimbabwean-customer-checks-google-first',
    title: 'The New Zimbabwean Customer Checks Google First — Is Your Business Ready?',
    date: '2026-04-08T09:00:00+02:00',
    keywords: 'Google search Zimbabwe, local SEO, customer behavior',
  },
  {
    slug: 'zimbabwe-national-ai-strategy-ngos-corporates-government',
    title: 'What the Zimbabwe National AI Strategy Means for NGOs, Corporates, and Government',
    date: '2026-04-05T09:00:00+02:00',
    keywords: 'Zimbabwe AI Strategy, NGOs, government AI, corporate AI',
  },
];

export async function GET() {
  const newsItems = newsPosts
    .map(
      (post) => `
    <url>
      <loc>${SITE_URL}/blog/${post.slug}</loc>
      <news:news>
        <news:publication>
          <news:name>KuWeX Studios</news:name>
          <news:language>en</news:language>
        </news:publication>
        <news:publication_date>${post.date}</news:publication_date>
        <news:title><![CDATA[${post.title}]]></news:title>
        <news:keywords><![CDATA[${post.keywords}]]></news:keywords>
      </news:news>
    </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${newsItems}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
}
