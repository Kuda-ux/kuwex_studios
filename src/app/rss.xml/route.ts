const blogPosts = [
  { slug: "zimbabwe-ai-economy-business-lead-or-left-behind", title: "Zimbabwe Is Entering the AI Economy: Will Your Business Lead or Be Left Behind?", excerpt: "The Zimbabwe National AI Strategy (2026-2030) is here. AI is becoming the backbone of Zimbabwe's economic future.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop", author: "Kuda", date: "April 14, 2026", category: "AI & Digital Transformation" },
  { slug: "why-every-zimbabwean-sme-needs-digital-presence-2026", title: "Why Every Zimbabwean SME Needs a Serious Digital Presence in 2026", excerpt: "The market has shifted. Your customers search Google before they visit your shop.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop", author: "Kuda", date: "April 12, 2026", category: "Digital Strategy" },
  { slug: "hustle-to-brand-zimbabwean-startups-trust-online", title: "From Hustle to Brand: How Zimbabwean Startups Can Build Trust Online Faster", excerpt: "You have the hustle. But trust is what converts browsers into buyers.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=630&fit=crop", author: "Weston", date: "April 10, 2026", category: "Branding" },
  { slug: "new-zimbabwean-customer-checks-google-first", title: "The New Zimbabwean Customer Checks Google First — Is Your Business Ready?", excerpt: "Before they call, before they visit, before they buy — they Google you.", image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&h=630&fit=crop", author: "Kuda", date: "April 8, 2026", category: "SEO" },
  { slug: "zimbabwe-national-ai-strategy-ngos-corporates-government", title: "What the Zimbabwe National AI Strategy Means for NGOs, Corporates, and Government", excerpt: "The government has spoken. AI is national priority.", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop", author: "Kuda", date: "April 5, 2026", category: "AI & Digital Transformation" },
  { slug: "digital-skills-national-power-upskill-team-zimbabwe", title: "Digital Skills Are Becoming National Power: Why Your Team Must Upskill Now", excerpt: "Zimbabwe's ICT policy demands a digitally literate workforce by 2027.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop", author: "Weston", date: "April 2, 2026", category: "Digital Strategy" },
  { slug: "cybersecurity-data-privacy-trust-zimbabwe-digital-economy", title: "Cybersecurity, Data Privacy, and Trust in Zimbabwe's Digital Economy", excerpt: "Data breaches destroy trust instantly. As Zimbabwe goes digital, cybersecurity is everyone's problem.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&h=630&fit=crop", author: "Kuda", date: "March 28, 2026", category: "Cybersecurity" },
  { slug: "world-class-website-zimbabwean-businesses-compete-globally", title: "How a World-Class Website Can Help Zimbabwean Businesses Compete Globally", excerpt: "Your website is your 24/7 salesperson. A mediocre website costs you international clients.", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=630&fit=crop", author: "Weston", date: "March 22, 2026", category: "Web Design" },
  { slug: "rise-of-smart-zimbabwe-preparing-businesses-digital-economy", title: "The Rise of Smart Zimbabwe: Preparing Businesses for a Digital Economy", excerpt: "Smart cities. Smart agriculture. Smart governance. Zimbabwe's digital transformation is accelerating.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop", author: "Kuda", date: "March 16, 2026", category: "AI & Digital Transformation" },
  { slug: "zimbabwe-future-belongs-visible-businesses-online-growth", title: "Zimbabwe's Future Belongs to Visible Businesses: Build Your Online Growth Machine", excerpt: "Visibility is the new currency. The businesses that get seen are the businesses that win.", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop", author: "Weston", date: "March 10, 2026", category: "Digital Strategy" },
  { slug: "how-much-does-website-cost-zimbabwe-2026", title: "How Much Does a Website Cost in Zimbabwe? (2026 Complete Guide)", excerpt: "A detailed pricing breakdown for website design in Zimbabwe.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop", author: "Kuda", date: "March 5, 2026", category: "Web Design" },
  { slug: "seo-guide-zimbabwe-small-businesses", title: "SEO Guide for Zimbabwe Small Businesses: Rank #1 on Google in 2026", excerpt: "A step-by-step local SEO guide for SMEs in Harare and beyond.", image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&h=630&fit=crop", author: "Kuda", date: "February 28, 2026", category: "SEO" },
  { slug: "google-ads-zimbabwe-beginners-guide", title: "Google Ads Zimbabwe: The Complete Beginner's Guide for 2026", excerpt: "How to set up, manage, and optimize Google Ads campaigns for Zimbabwe businesses.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=630&fit=crop", author: "Kuda", date: "February 22, 2026", category: "Google Ads" },
  { slug: "best-social-media-platforms-zimbabwe-businesses", title: "Best Social Media Platforms for Zimbabwe Businesses in 2026", excerpt: "Facebook, Instagram, LinkedIn, TikTok, or WhatsApp? We compare each platform.", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop", author: "Weston", date: "February 15, 2026", category: "Social Media" },
  { slug: "web-design-trends-zimbabwe-2026", title: "10 Web Design Trends Zimbabwe Businesses Must Adopt in 2026", excerpt: "The design trends shaping Zimbabwe's digital landscape this year.", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=630&fit=crop", author: "Weston", date: "February 8, 2026", category: "Web Design" },
  { slug: "google-ads-vs-seo-zimbabwe", title: "Google Ads vs SEO: Which is Better for Zimbabwe SMEs?", excerpt: "A data-driven comparison of paid search vs organic SEO for Zimbabwean businesses.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop", author: "Kuda", date: "February 1, 2026", category: "Digital Marketing" },
  { slug: "branding-mistakes-zimbabwe-businesses", title: "7 Branding Mistakes Zimbabwe Businesses Make (And How to Fix Them)", excerpt: "Common branding pitfalls that cost Zimbabwean businesses customers and credibility.", image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=1200&h=630&fit=crop", author: "Weston", date: "January 25, 2026", category: "Branding" },
];

export async function GET() {
  const baseUrl = 'https://kuwexstudios.co.zw';
  
  const rssItems = blogPosts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      <author>info@kuwexstudios.co.zw (${post.author})</author>
      <enclosure url="${post.image}" type="image/jpeg" length="0" />
    </item>
  `).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>KuWeX Studios Blog - Zimbabwe Digital Marketing &amp; Tech News</title>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Latest insights on digital marketing, web design, SEO, AI, and technology trends in Zimbabwe. Expert advice from KuWeX Studios - Zimbabwe's leading digital agency.</description>
    <language>en-ZW</language>
    <copyright>Copyright ${new Date().getFullYear()} KuWeX Studios. All rights reserved.</copyright>
    <managingEditor>info@kuwexstudios.co.zw (KuWeX Studios Editorial Team)</managingEditor>
    <webMaster>info@kuwexstudios.co.zw (KuWeX Studios)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <category>Technology</category>
    <category>Digital Marketing</category>
    <category>Web Design</category>
    <category>Zimbabwe Business</category>
    <category>AI &amp; Innovation</category>
    <image>
      <url>${baseUrl}/logo.jpg</url>
      <title>KuWeX Studios</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
