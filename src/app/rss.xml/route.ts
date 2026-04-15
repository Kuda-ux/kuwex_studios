import { blogPosts } from '@/app/blog/page';

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
      <enclosure url="${post.image}" type="image/jpeg" />
    </item>
  `).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
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
