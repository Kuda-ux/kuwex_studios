// Google News sitemap - only articles published in last 48 hours qualify
// but we include 30 days to maximize coverage for news aggregators

import { getDb, ensureSchema } from '@/lib/turso';

const SITE_URL = 'https://kuwexstudios.co.zw';

async function getDynamicNewsPosts(): Promise<NewsPost[]> {
  try {
    await ensureSchema();
    const db = getDb();
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const result = await db.execute({
      sql: `SELECT slug, title, post_date, keywords FROM blog_posts WHERE status = 'published' AND post_date >= ? ORDER BY post_date DESC LIMIT 50`,
      args: [cutoff],
    });
    return result.rows.map((r) => {
      let kw = '';
      try { kw = (JSON.parse(r.keywords as string) as string[]).join(', '); } catch { kw = String(r.keywords ?? ''); }
      return { slug: String(r.slug), title: String(r.title), date: String(r.post_date), keywords: kw };
    });
  } catch {
    return [];
  }
}

interface NewsPost {
  slug: string;
  title: string;
  date: string; // ISO date
  keywords: string;
}

const newsPosts: NewsPost[] = [
  // May 2026 — Africa AI series (newest first)
  {
    slug: 'econet-cassava-cloud-computing-factory-zimbabwe-gpu',
    title: 'Zimbabwe Just Got Its Own AI Cloud Factory — Inside the Econet & Cassava GPU Launch',
    date: '2026-05-12T08:00:00+02:00',
    keywords: 'Econet AI, Cassava Technologies, Nvidia, Microsoft, GPU cloud, Zimbabwe AI, Cassava AI Factory, African cloud infrastructure',
  },
  {
    slug: 'whatsapp-ai-commerce-fintech-revolution-africa-zimbabwe',
    title: 'WhatsApp Is Quietly Becoming Africa\'s Operating System for Commerce',
    date: '2026-05-10T08:00:00+02:00',
    keywords: 'WhatsApp Business, AI commerce, fintech Africa, KYC automation, rural banking Zimbabwe, WhatsApp chatbot, financial inclusion',
  },
  {
    slug: 'chatcash-basa-ai-zimbabwe-virtual-assistants-sme',
    title: 'Meet ChatCash & Basa AI: The Zimbabwean Startups Building AI for African SMEs',
    date: '2026-05-08T08:00:00+02:00',
    keywords: 'ChatCash, Basa AI, Zimbabwe AI startup, virtual assistant Africa, SME AI, Shona AI, multilingual chatbot',
  },
  {
    slug: 'cassava-nvidia-ai-datacenter-africa-strive-masiyiwa',
    title: 'Strive Masiyiwa\'s Billion-Dollar AI Bet: Inside the Cassava–Nvidia African Datacenter Rollout',
    date: '2026-05-05T08:00:00+02:00',
    keywords: 'Strive Masiyiwa, Cassava Technologies, Nvidia, AI datacenter Africa, SADC AI, Pan-African AI infrastructure',
  },
  {
    slug: 'agentic-ai-africa-digital-economy-governance-laws',
    title: 'The Next AI Wave Isn\'t ChatGPT — It\'s Agentic AI. And Africa\'s Governments Are Already Writing the Rules',
    date: '2026-05-02T08:00:00+02:00',
    keywords: 'agentic AI, Nigeria Digital Economy Bill, South Africa POPIA, AI regulation Africa, AI governance Zimbabwe, AI agents business',
  },
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
  const dynamic = await getDynamicNewsPosts();
  const staticSlugs = new Set(newsPosts.map((p) => p.slug));
  const merged = [...dynamic.filter((p) => !staticSlugs.has(p.slug)), ...newsPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const newsItems = merged
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
