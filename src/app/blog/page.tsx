import { getDb, ensureSchema } from "@/lib/turso";
import BlogListingClient, { type PostCard } from "./BlogListingClient";

export const revalidate = 300;

const staticPosts: PostCard[] = [
  { slug: "every-sector-zimbabwe-needs-digital-transformation", title: "Every Sector in Zimbabwe Needs Digital Transformation — Not Just Tech Companies", excerpt: "Schools, clinics, lodges, retailers, churches, NGOs — every sector in Zimbabwe is losing time and money to paper systems. Here's the sector-by-sector digital fix.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", author: "Kuda", date: "May 29, 2026", readTime: "11 min read", category: "Digital Transformation" },
  { slug: "social-media-alone-not-digital-strategy-zimbabwe", title: "Social Media Alone Is Not a Digital Strategy — Zimbabwe Businesses, Take Note", excerpt: "Posting on Facebook every day is not a strategy. A real digital ecosystem connects your website, WhatsApp, SEO, Google profile, and analytics into one growth system.", image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop", author: "Weston", date: "May 27, 2026", readTime: "10 min read", category: "Digital Strategy" },
  { slug: "econet-ai-launch-zimbabwe-new-era-artificial-intelligence", title: "Econet Launches AI in Zimbabwe — And Nothing Will Ever Be the Same Again", excerpt: "Econet Wireless has officially launched Econet AI, marking a defining moment in Zimbabwe's technological history.", image: "/blog/econet-ai-launch-mavetera.jpg", author: "Kuda", date: "April 17, 2026", readTime: "16 min read", category: "AI & Digital Transformation" },
  { slug: "econet-cassava-cloud-computing-factory-zimbabwe-gpu", title: "Zimbabwe Just Got Its Own AI Cloud Factory — Inside the Econet & Cassava GPU Launch", excerpt: "Econet AI, Cassava Technologies, Nvidia and Microsoft just flipped the switch on Southern Africa's first GPU cloud platform.", image: "/blog/econet-ai-launch-mavetera.jpg", author: "Kuda", date: "May 12, 2026", readTime: "9 min read", category: "AI & Tech" },
  { slug: "whatsapp-ai-commerce-fintech-revolution-africa-zimbabwe", title: "WhatsApp Is Quietly Becoming Africa's Operating System for Commerce", excerpt: "AI chatbots inside WhatsApp are onboarding rural Zimbabweans in 90 seconds and cutting bank costs by 70%. Why your SME must move now.", image: "/blog/whatsapp-business-ai-commerce.webp", author: "Weston", date: "May 10, 2026", readTime: "9 min read", category: "Fintech & AI" },
  { slug: "chatcash-basa-ai-zimbabwe-virtual-assistants-sme", title: "Meet ChatCash & Basa AI: Zimbabwean Startups Building AI for African SMEs", excerpt: "Two local startups are quietly solving what Silicon Valley still can't — affordable, multilingual virtual assistants built for African small business.", image: "/blog/ai-summit-africa-zimbabwe.jpg", author: "Weston", date: "May 8, 2026", readTime: "8 min read", category: "AI & SMEs" },
  { slug: "cassava-nvidia-ai-datacenter-africa-strive-masiyiwa", title: "Strive Masiyiwa's Billion-Dollar AI Bet: Cassava-Nvidia African Datacenter Rollout", excerpt: "Cassava Technologies and Nvidia are wiring Africa with GPU datacenters from Cape Town to Cairo. Why Africa is about to become AI's cheapest training ground.", image: "/blog/strive-masiyiwa-jensen-huang-nvidia.png", author: "Kuda", date: "May 5, 2026", readTime: "9 min read", category: "AI Infrastructure" },
  { slug: "agentic-ai-africa-digital-economy-governance-laws", title: "The Next AI Wave Is Agentic AI. And Africa's Governments Are Writing the Rules", excerpt: "Forget chatbots. Agentic AI takes actions for you — and Nigeria and South Africa already have laws ready. What Zimbabwean businesses must do next.", image: "/blog/zimbabwe-ai-flag-future.png", author: "Kuda", date: "May 2, 2026", readTime: "10 min read", category: "AI & Policy" },
  { slug: "zimbabwe-ai-economy-business-lead-or-left-behind", title: "Zimbabwe Is Entering the AI Economy: Will Your Business Lead or Be Left Behind?", excerpt: "The Zimbabwe National AI Strategy is here. Artificial intelligence is no longer a Western luxury — it is becoming the backbone of Zimbabwe's economic future.", image: "/blog/zimbabwe-ai-flag-future.png", author: "Kuda", date: "April 14, 2026", readTime: "14 min read", category: "AI & Digital Transformation" },
  { slug: "why-every-zimbabwean-sme-needs-digital-presence-2026", title: "Why Every Zimbabwean SME Needs a Serious Digital Presence in 2026", excerpt: "The market has shifted. Your customers search Google before they visit your shop. If you're invisible online, you're invisible — period.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop", author: "Kuda", date: "April 12, 2026", readTime: "12 min read", category: "Digital Strategy" },
  { slug: "hustle-to-brand-zimbabwean-startups-trust-online", title: "From Hustle to Brand: How Zimbabwean Startups Can Build Trust Online Faster", excerpt: "You have the hustle. But trust is what converts browsers into buyers. Here's how Zimbabwean startups can build credibility online — fast.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop", author: "Weston", date: "April 10, 2026", readTime: "11 min read", category: "Branding" },
  { slug: "new-zimbabwean-customer-checks-google-first", title: "The New Zimbabwean Customer Checks Google First — Is Your Business Ready?", excerpt: "Before they call, before they visit, before they buy — they Google you. What are they finding? The answer determines your revenue.", image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&h=400&fit=crop", author: "Kuda", date: "April 8, 2026", readTime: "10 min read", category: "SEO" },
  { slug: "zimbabwe-national-ai-strategy-ngos-corporates-government", title: "What the Zimbabwe National AI Strategy Means for NGOs, Corporates, and Government", excerpt: "The government has spoken. AI is national priority. Here's what every sector must do to align with Zimbabwe's AI vision.", image: "/blog/ai-summit-africa-zimbabwe.jpg", author: "Kuda", date: "April 5, 2026", readTime: "13 min read", category: "AI & Digital Transformation" },
  { slug: "digital-skills-national-power-upskill-team-zimbabwe", title: "Digital Skills Are Becoming National Power: Why Your Team Must Upskill Now", excerpt: "Zimbabwe's ICT policy demands a digitally literate workforce by 2027. Companies that invest in digital skills now will dominate.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop", author: "Weston", date: "April 2, 2026", readTime: "10 min read", category: "Digital Strategy" },
  { slug: "cybersecurity-data-privacy-trust-zimbabwe-digital-economy", title: "Cybersecurity, Data Privacy, and Trust in Zimbabwe's Digital Economy", excerpt: "Data breaches destroy trust instantly. As Zimbabwe goes digital, cybersecurity is not IT's problem — it's the CEO's problem.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop", author: "Kuda", date: "March 28, 2026", readTime: "12 min read", category: "Cybersecurity" },
  { slug: "world-class-website-zimbabwean-businesses-compete-globally", title: "How a World-Class Website Can Help Zimbabwean Businesses Compete Globally", excerpt: "Your website is your 24/7 salesperson. In a global economy, a mediocre website doesn't just look bad — it costs you international clients.", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop", author: "Weston", date: "March 22, 2026", readTime: "11 min read", category: "Web Design" },
  { slug: "rise-of-smart-zimbabwe-preparing-businesses-digital-economy", title: "The Rise of Smart Zimbabwe: Preparing Businesses for a Digital Economy", excerpt: "Smart cities. Smart agriculture. Smart governance. Zimbabwe's digital transformation is accelerating. Is your business keeping pace?", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop", author: "Kuda", date: "March 16, 2026", readTime: "13 min read", category: "AI & Digital Transformation" },
  { slug: "zimbabwe-future-belongs-visible-businesses-online-growth", title: "Zimbabwe's Future Belongs to Visible Businesses: Build Your Online Growth Machine", excerpt: "Visibility is the new currency. In Zimbabwe's fast-moving economy, the businesses that get seen are the businesses that win.", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop", author: "Weston", date: "March 10, 2026", readTime: "12 min read", category: "Digital Strategy" },
  { slug: "how-much-does-website-cost-zimbabwe-2026", title: "How Much Does a Website Cost in Zimbabwe? (2026 Complete Guide)", excerpt: "A detailed pricing breakdown for website design in Zimbabwe — from simple business sites to full e-commerce platforms.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop", author: "Kuda", date: "March 5, 2026", readTime: "12 min read", category: "Web Design" },
  { slug: "seo-guide-zimbabwe-small-businesses", title: "SEO Guide for Zimbabwe Small Businesses: Rank #1 on Google in 2026", excerpt: "A step-by-step local SEO guide for SMEs in Harare and beyond.", image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=600&h=400&fit=crop", author: "Kuda", date: "February 28, 2026", readTime: "15 min read", category: "SEO" },
  { slug: "google-ads-zimbabwe-beginners-guide", title: "Google Ads Zimbabwe: The Complete Beginner's Guide for 2026", excerpt: "How to set up, manage, and optimize Google Ads campaigns for Zimbabwe businesses.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop", author: "Kuda", date: "February 22, 2026", readTime: "14 min read", category: "Google Ads" },
];

async function fetchDynamicPosts(): Promise<PostCard[]> {
  try {
    await ensureSchema();
    const db = getDb();
    const result = await db.execute(
      "SELECT slug, title, excerpt, image, author, post_date, read_time, category FROM blog_posts WHERE status = 'published' ORDER BY post_date DESC"
    );
    return result.rows.map(r => ({
      slug: String(r.slug ?? ''),
      title: String(r.title ?? ''),
      excerpt: String(r.excerpt ?? ''),
      image: String(r.image ?? ''),
      author: String(r.author ?? 'Kuda'),
      date: (() => {
        try {
          return new Date(String(r.post_date ?? '')).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          });
        } catch { return String(r.post_date ?? ''); }
      })(),
      readTime: String(r.read_time ?? '5 min read'),
      category: String(r.category ?? ''),
    }));
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const dynamicPosts = await fetchDynamicPosts();
  const dynamicSlugs = new Set(dynamicPosts.map(p => p.slug));
  const filteredStatic = staticPosts.filter(p => !dynamicSlugs.has(p.slug));
  const allPosts = [...dynamicPosts, ...filteredStatic];
  return <BlogListingClient allPosts={allPosts} />;
}
