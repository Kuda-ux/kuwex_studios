import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'kuwexstudios2026indexnow';
const SITE_URL = 'https://kuwexstudios.co.zw';

// All public URLs that should be indexed
const ALL_URLS = [
  '/',
  '/services',
  '/services/web-design',
  '/services/seo-services',
  '/services/social-media-marketing',
  '/services/google-ads',
  '/services/branding',
  '/locations/harare',
  '/locations/bulawayo',
  '/locations/zimbabwe',
  '/about',
  '/contact',
  '/blog',
  '/faq',
  '/careers',
  '/privacy',
  '/terms',
  '/cookies',
  '/help',
  // Blog posts
  '/blog/econet-ai-launch-zimbabwe-new-era-artificial-intelligence',
  '/blog/zimbabwe-ai-economy-business-lead-or-left-behind',
  '/blog/why-every-zimbabwean-sme-needs-digital-presence-2026',
  '/blog/hustle-to-brand-zimbabwean-startups-trust-online',
  '/blog/new-zimbabwean-customer-checks-google-first',
  '/blog/zimbabwe-national-ai-strategy-ngos-corporates-government',
  '/blog/digital-skills-national-power-upskill-team-zimbabwe',
  '/blog/cybersecurity-data-privacy-trust-zimbabwe-digital-economy',
  '/blog/world-class-website-zimbabwean-businesses-compete-globally',
  '/blog/rise-of-smart-zimbabwe-preparing-businesses-digital-economy',
  '/blog/zimbabwe-future-belongs-visible-businesses-online-growth',
  '/blog/how-much-does-website-cost-zimbabwe-2026',
  '/blog/seo-guide-zimbabwe-small-businesses',
  '/blog/google-ads-zimbabwe-beginners-guide',
  '/blog/best-social-media-platforms-zimbabwe-businesses',
  '/blog/web-design-trends-zimbabwe-2026',
  '/blog/google-ads-vs-seo-zimbabwe',
  '/blog/branding-mistakes-zimbabwe-businesses',
];

// Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver)
async function submitToIndexNow(urls: string[]) {
  const fullUrls = urls.map(u => `${SITE_URL}${u}`);

  const payload = {
    host: 'kuwexstudios.co.zw',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: fullUrls,
  };

  const engines = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  const results = await Promise.allSettled(
    engines.map(engine =>
      fetch(engine, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      })
    )
  );

  return results.map((r, i) => ({
    engine: engines[i],
    status: r.status === 'fulfilled' ? r.value.status : 'failed',
    ok: r.status === 'fulfilled' ? r.value.ok : false,
  }));
}

// Submit to Google via ping (sitemap notification)
async function pingGoogle() {
  const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap.xml`);
  try {
    const res = await fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`);
    return { engine: 'Google Ping', status: res.status, ok: res.ok };
  } catch {
    return { engine: 'Google Ping', status: 'failed', ok: false };
  }
}

// GET: Submit all URLs for indexing
export async function GET(request: NextRequest) {
  // Simple auth check - require a secret param to prevent abuse
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== 'kuwex2026push') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [indexNowResults, googleResult] = await Promise.all([
      submitToIndexNow(ALL_URLS),
      pingGoogle(),
    ]);

    return NextResponse.json({
      success: true,
      message: `Submitted ${ALL_URLS.length} URLs for indexing`,
      timestamp: new Date().toISOString(),
      results: {
        indexNow: indexNowResults,
        google: googleResult,
      },
      urls: ALL_URLS.map(u => `${SITE_URL}${u}`),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit URLs', details: String(error) },
      { status: 500 }
    );
  }
}

// POST: Submit specific URLs for indexing (for new content)
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== 'kuwex2026push') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const urls: string[] = body.urls || [];

    if (urls.length === 0) {
      return NextResponse.json({ error: 'No URLs provided' }, { status: 400 });
    }

    const [indexNowResults, googleResult] = await Promise.all([
      submitToIndexNow(urls),
      pingGoogle(),
    ]);

    return NextResponse.json({
      success: true,
      message: `Submitted ${urls.length} URLs for indexing`,
      results: {
        indexNow: indexNowResults,
        google: googleResult,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit URLs', details: String(error) },
      { status: 500 }
    );
  }
}
