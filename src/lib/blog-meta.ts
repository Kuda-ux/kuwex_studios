// =====================================================
// Blog Post Metadata — single source of truth
// Used by both the post layout (SEO/OG/JSON-LD) and the
// Dashboard → Social Share helper page.
//
// SEO strategy per post:
//  - description: 150-160 chars, primary keyword in first 60
//  - keywords: 15-20 mix of primary, local (Harare/Bulawayo/
//    Zimbabwe), long-tail, question-based, commercial intent
//  - dateModified: refreshed regularly for Google freshness signal
// =====================================================

export interface BlogPostMeta {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  ogImage?: string;        // JPEG/PNG absolute URL override for OG/Twitter/JSON-LD (WebP not reliable on WhatsApp)
  author: string;
  date: string;            // datePublished (YYYY-MM-DD)
  dateModified: string;    // freshness signal
  category?: string;
  shareSummary: string;    // 1-line hook for WhatsApp / social posts
}

// Today's date used as freshness signal for all posts.
// Update periodically (or replace with per-post real edit dates).
const FRESHNESS_DATE = "2026-05-18";

export const blogPostsMeta: Record<string, BlogPostMeta> = {
  "econet-cassava-cloud-computing-factory-zimbabwe-gpu": {
    title: "Zimbabwe Just Got Its Own AI Cloud Factory — Inside the Econet & Cassava GPU Launch | KuWeX Studios",
    description:
      "Econet AI, Cassava, Nvidia & Microsoft just launched Southern Africa's first GPU cloud. What it means for Zimbabwean developers, SMEs & startups.",
    keywords: [
      "Cassava AI Factory", "Econet AI cloud Zimbabwe", "GPU cloud Africa",
      "Nvidia Cassava Zimbabwe", "Microsoft Cassava AI", "AI infrastructure Zimbabwe",
      "cloud computing Zimbabwe", "Zimbabwe data center", "African cloud Africa",
      "AI compute Africa", "Cassava Technologies Nvidia", "Strive Masiyiwa AI",
      "AI Zimbabwe 2026", "GPU rental Zimbabwe", "AI model training Africa",
      "Zimbabwe AI startup", "Southern Africa AI", "AI sovereignty Africa",
    ],
    image: "/blog/econet-ai-launch-mavetera.jpg",
    ogImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-05-12",
    dateModified: FRESHNESS_DATE,
    category: "AI & Tech",
    shareSummary: "Zimbabwe finally has its own GPU cloud. Here's what Econet, Cassava & Nvidia just unlocked for every local developer and SME.",
  },
  "whatsapp-ai-commerce-fintech-revolution-africa-zimbabwe": {
    title: "WhatsApp Is Quietly Becoming Africa's Operating System for Commerce | KuWeX Studios",
    description:
      "AI chatbots inside WhatsApp are onboarding rural Zimbabweans in 90 seconds and cutting bank costs by 70%. Why your SME must move now.",
    keywords: [
      "WhatsApp Business Zimbabwe", "WhatsApp AI chatbot Africa",
      "WhatsApp commerce Zimbabwe", "AI fintech Africa", "KYC automation WhatsApp",
      "rural banking Zimbabwe", "WhatsApp banking Africa", "financial inclusion Zimbabwe",
      "WhatsApp Business API Zimbabwe", "AI commerce Africa", "WhatsApp payments Zimbabwe",
      "Zimbabwe digital banking", "WhatsApp marketing Zimbabwe", "AI customer service Zimbabwe",
      "Steward Bank WhatsApp", "ZWG WhatsApp payments", "SME WhatsApp Zimbabwe",
    ],
    image: "/blog/whatsapp-business-ai-commerce.webp",
    ogImage: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Weston",
    date: "2026-05-10",
    dateModified: FRESHNESS_DATE,
    category: "Fintech & AI",
    shareSummary: "Forget apps. WhatsApp is becoming the operating system of African commerce — and most Zimbabwean businesses are sleeping on it.",
  },
  "chatcash-basa-ai-zimbabwe-virtual-assistants-sme": {
    title: "Meet ChatCash & Basa AI: The Zimbabwean Startups Building AI for African SMEs | KuWeX Studios",
    description:
      "ChatCash and Basa AI are local startups giving Zimbabwean SMEs affordable, multilingual virtual assistants. Here's how they work — and how to use them.",
    keywords: [
      "ChatCash Zimbabwe", "Basa AI Zimbabwe", "AI for SMEs Zimbabwe",
      "Zimbabwean AI startup", "virtual assistant Zimbabwe", "AI chatbot Zimbabwe",
      "Shona AI assistant", "Ndebele AI", "small business AI Zimbabwe",
      "African AI startup 2026", "AI customer support Africa",
      "AI business plan generator Zimbabwe", "fiscal compliance AI Zimbabwe",
      "ZIMRA compliance AI", "AI tools small business Africa",
      "automation Zimbabwe SME", "AI assistant Harare",
    ],
    image: "/blog/ai-summit-africa-zimbabwe.jpg",
    ogImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Weston",
    date: "2026-05-08",
    dateModified: FRESHNESS_DATE,
    category: "AI & SMEs",
    shareSummary: "ChatCash and Basa AI are quietly solving what Silicon Valley couldn't — AI that actually works for African small businesses.",
  },
  "cassava-nvidia-ai-datacenter-africa-strive-masiyiwa": {
    title: "Strive Masiyiwa's Billion-Dollar AI Bet: Inside the Cassava-Nvidia African Datacenter Rollout | KuWeX Studios",
    description:
      "Cassava Technologies and Nvidia are wiring Africa with GPU datacenters from Cape Town to Cairo. Why Africa is about to become AI's cheapest training ground.",
    keywords: [
      "Strive Masiyiwa Cassava", "Cassava Technologies AI", "Nvidia Africa datacenter",
      "AI datacenter Zimbabwe", "African AI infrastructure", "SADC AI investment",
      "East Africa AI datacenter", "Cassava Nvidia partnership", "AI Africa 2026",
      "GPU datacenter Africa", "Liquid Intelligent Technologies AI",
      "African tech billionaire", "AI sovereignty Africa", "Zimbabwe AI investment",
      "Pan African AI", "Africa AI compute", "Masiyiwa Nvidia deal",
    ],
    image: "/blog/strive-masiyiwa-jensen-huang-nvidia.png",
    ogImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-05-05",
    dateModified: FRESHNESS_DATE,
    category: "AI Infrastructure",
    shareSummary: "The richest Black man you've barely heard of is racing Nvidia to wire Africa with AI datacenters. The reason will shock you.",
  },
  "agentic-ai-africa-digital-economy-governance-laws": {
    title: "The Next AI Wave Isn't ChatGPT — It's 'Agentic AI'. And Africa's Governments Are Already Writing the Rules | KuWeX Studios",
    description:
      "Forget chatbots. Agentic AI takes actions for you — and Nigeria & South Africa already have laws ready. What Zimbabwean businesses must do next.",
    keywords: [
      "agentic AI Africa", "agentic AI Zimbabwe", "Nigeria digital economy bill",
      "South Africa AI law", "AI governance Africa", "AI regulation Zimbabwe",
      "POPIA AI", "AI policy Africa", "autonomous AI agents", "AI agents business",
      "AI compliance Africa", "AI data privacy Zimbabwe", "AI ethics Africa",
      "Nigeria AI law 2026", "AI regulation SADC", "AI act Africa",
      "AI for business Zimbabwe", "agentic AI use cases",
    ],
    image: "/blog/zimbabwe-ai-flag-future.png",
    ogImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-05-02",
    dateModified: FRESHNESS_DATE,
    category: "AI & Policy",
    shareSummary: "Forget ChatGPT. The real AI disruption is 'agentic AI' — and Nigeria and South Africa are already writing the rules. Zimbabwe must catch up.",
  },
  "econet-ai-launch-zimbabwe-new-era-artificial-intelligence": {
    title: "Econet Launches AI in Zimbabwe — A New Era Begins | KuWeX Studios",
    description:
      "Econet AI is here. Inside the launch with Minister Mavetera, the 4 pillars, NDS2 alignment, and exactly how Zimbabwe SMEs & youth must respond now.",
    keywords: [
      "Econet AI Zimbabwe", "Econet AI launch 2026", "Econet Wireless AI",
      "Tatenda Mavetera AI", "Zimbabwe National AI Strategy", "AI Zimbabwe 2026",
      "NDS2 Zimbabwe AI", "artificial intelligence Zimbabwe", "AI for SMEs Zimbabwe",
      "Econet AI Harare", "AI Africa 2026", "Zimbabwe digital economy",
      "AI Bulawayo", "AI strategy Africa", "Zimbabwe Vision 2030 AI",
      "AI jobs Zimbabwe", "AI training Zimbabwe", "AI use cases Africa",
    ],
    image: "/blog/econet-ai-launch-mavetera.jpg",
    ogImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-04-17",
    dateModified: FRESHNESS_DATE,
    category: "AI & Tech",
    shareSummary: "Econet has just launched AI in Zimbabwe — and it changes everything for business owners. Here's what every CEO needs to know now.",
  },
  "how-much-does-website-cost-zimbabwe-2026": {
    title: "How Much Does a Website Cost in Zimbabwe? (2026 Pricing Guide) | KuWeX Studios",
    description:
      "Real 2026 website prices in Zimbabwe: basic $499, business $999, e-commerce $2,499+. Every cost factor broken down + free quote inside.",
    keywords: [
      "website cost Zimbabwe", "how much does a website cost in Zimbabwe",
      "website design price Harare", "web design pricing Zimbabwe 2026",
      "cheap website Zimbabwe", "ecommerce website cost Zimbabwe",
      "business website price Harare", "web designer near me Zimbabwe",
      "website pricing Bulawayo", "web design quote Zimbabwe",
      "affordable website Zimbabwe", "small business website price",
      "web design packages Zimbabwe", "custom website cost Zimbabwe",
      "professional website Zimbabwe price", "web design cost 2026",
      "ZW domain website cost",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-04-08",
    dateModified: FRESHNESS_DATE,
    category: "Web Design",
    shareSummary: "Wondering what a website actually costs in Zimbabwe in 2026? Real prices, no jargon — read before you pay any agency.",
  },
  "seo-guide-zimbabwe-small-businesses": {
    title: "SEO Guide for Zimbabwe Small Businesses: Rank #1 on Google (2026) | KuWeX Studios",
    description:
      "Rank #1 on Google in Zimbabwe: step-by-step SEO for SMEs. Google Business Profile, keyword research, on-page SEO & link building — start today.",
    keywords: [
      "SEO Zimbabwe", "SEO guide Zimbabwe", "local SEO Harare",
      "SEO for small businesses Zimbabwe", "Google Business Profile Zimbabwe",
      "SEO services Harare", "rank on Google Zimbabwe", "keyword research Zimbabwe",
      "SEO Bulawayo", "on-page SEO Zimbabwe", "free SEO guide Zimbabwe",
      "SEO agency Zimbabwe", "SEO 2026", "organic traffic Zimbabwe",
      "Google ranking Harare", "link building Zimbabwe", "SEO checklist Zimbabwe",
      "small business SEO Africa",
    ],
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-04-02",
    dateModified: FRESHNESS_DATE,
    category: "SEO",
    shareSummary: "The exact SEO playbook small Zimbabwean businesses are using to rank #1 on Google in 2026. Free, step-by-step.",
  },
  "google-ads-zimbabwe-beginners-guide": {
    title: "Google Ads Zimbabwe: Complete Beginner's Guide (2026) | KuWeX Studios",
    description:
      "Run profitable Google Ads in Zimbabwe: real budgets, keyword targeting, ad copy, ROI tracking. Beginner-friendly 2026 PPC guide for Harare businesses.",
    keywords: [
      "Google Ads Zimbabwe", "Google Ads guide Zimbabwe", "PPC Zimbabwe",
      "Google Ads cost Zimbabwe", "Google Ads Harare", "Google Ads beginner guide",
      "paid ads Zimbabwe", "Google Ads agency Harare", "PPC for SMEs Zimbabwe",
      "Google Ads 2026", "ad budget Zimbabwe", "Google Ads Bulawayo",
      "Google Ads ROI Zimbabwe", "AdWords Zimbabwe", "search ads Zimbabwe",
      "Google Ads training Harare", "PPC strategy Zimbabwe",
    ],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-03-25",
    dateModified: FRESHNESS_DATE,
    category: "Google Ads",
    shareSummary: "Want customers calling your business this week? Here's the complete 2026 Google Ads playbook for Zimbabwe — built for beginners.",
  },
  "best-social-media-platforms-zimbabwe-businesses": {
    title: "Best Social Media Platforms for Zimbabwe Businesses (2026) | KuWeX Studios",
    description:
      "Facebook, Instagram, TikTok, LinkedIn or WhatsApp Business? Compare reach, demographics & ROI of every platform for Zimbabwe businesses in 2026.",
    keywords: [
      "social media marketing Zimbabwe", "best social media Zimbabwe businesses",
      "Facebook marketing Zimbabwe", "Instagram marketing Harare",
      "TikTok Zimbabwe business", "WhatsApp Business Zimbabwe", "LinkedIn Zimbabwe",
      "social media strategy Zimbabwe", "social media manager Harare",
      "social media platforms Africa 2026", "social media ROI Zimbabwe",
      "content marketing Zimbabwe", "social media agency Bulawayo",
      "WhatsApp Channel Zimbabwe", "Meta ads Zimbabwe", "TikTok ads Zimbabwe",
      "social media growth Zimbabwe",
    ],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Weston",
    date: "2026-03-18",
    dateModified: FRESHNESS_DATE,
    category: "Social Media",
    shareSummary: "Stop wasting money on the wrong platform. The 2026 ROI comparison every Zimbabwean business owner needs to read.",
  },
  "web-design-trends-zimbabwe-2026": {
    title: "10 Web Design Trends Zimbabwe Businesses Must Adopt in 2026 | KuWeX Studios",
    description:
      "10 web design trends Zimbabwe businesses must adopt in 2026: dark mode, AI personalization, motion UI, micro-interactions. Stay modern, win clients.",
    keywords: [
      "web design trends 2026", "web design Zimbabwe 2026",
      "modern website design Harare", "dark mode website", "AI website Zimbabwe",
      "motion UI design", "web design agency Zimbabwe", "website redesign Harare",
      "UX trends Zimbabwe", "micro-interactions web design", "Next.js Zimbabwe",
      "modern web design Africa", "website inspiration Zimbabwe",
      "conversion design Zimbabwe", "glassmorphism web", "parallax design Zimbabwe",
      "web design Bulawayo",
    ],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Weston",
    date: "2026-03-10",
    dateModified: FRESHNESS_DATE,
    category: "Web Design",
    shareSummary: "Is your website still stuck in 2022? Here are the 10 design moves Zimbabwe's leading brands are making in 2026.",
  },
  "google-ads-vs-seo-zimbabwe": {
    title: "Google Ads vs SEO: Which is Better for Zimbabwe SMEs? | KuWeX Studios",
    description:
      "Google Ads vs SEO for Zimbabwe SMEs: real costs, timelines, ROI compared. When to use each (and the winning combo) for fastest 2026 growth.",
    keywords: [
      "Google Ads vs SEO Zimbabwe", "PPC vs SEO", "SEO vs Google Ads cost",
      "paid vs organic Zimbabwe", "digital marketing Zimbabwe", "SEO cost Zimbabwe",
      "Google Ads ROI", "SEO ROI Zimbabwe", "marketing strategy Zimbabwe SME",
      "Google Ads agency Harare", "SEO agency Bulawayo",
      "digital marketing comparison", "lead generation Zimbabwe",
      "search marketing Zimbabwe", "marketing budget Zimbabwe",
      "growth marketing Africa", "marketing channels 2026",
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-03-03",
    dateModified: FRESHNESS_DATE,
    category: "Marketing Strategy",
    shareSummary: "Should you spend on Google Ads or SEO this quarter? Real numbers, real answers for Zimbabwe SMEs.",
  },
  "branding-mistakes-zimbabwe-businesses": {
    title: "7 Branding Mistakes Zimbabwe Businesses Make (And How to Fix Them) | KuWeX Studios",
    description:
      "7 branding mistakes costing Zimbabwe businesses customers — inconsistent logos, weak positioning, copying competitors. Fix yours today.",
    keywords: [
      "branding Zimbabwe", "branding mistakes", "branding agency Zimbabwe",
      "logo design Zimbabwe", "brand identity Harare", "brand consistency",
      "brand strategy Zimbabwe SME", "rebranding Zimbabwe",
      "brand positioning Zimbabwe", "visual identity Harare",
      "brand guidelines Zimbabwe", "branding for startups Zimbabwe",
      "brand audit Zimbabwe", "design agency Bulawayo", "brand naming Zimbabwe",
      "corporate branding Africa", "branding 2026",
    ],
    image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Weston",
    date: "2026-02-24",
    dateModified: FRESHNESS_DATE,
    category: "Branding",
    shareSummary: "Most Zimbabwean businesses are losing customers to one of these 7 branding mistakes. Are you?",
  },
  "zimbabwe-ai-economy-business-lead-or-left-behind": {
    title: "Zimbabwe AI Economy: Lead or Be Left Behind | KuWeX Studios",
    description:
      "Zimbabwe's National AI Strategy 2026-2030 is here. What it means for your business — and the 5 steps every CEO must take this quarter to lead.",
    keywords: [
      "Zimbabwe AI strategy", "AI economy Zimbabwe", "AI Zimbabwe 2026",
      "digital transformation Zimbabwe", "AI policy Zimbabwe",
      "Fourth Industrial Revolution Zimbabwe", "AI for business Zimbabwe",
      "AI Africa 2026", "Zimbabwe AI law", "AI adoption Harare",
      "AI consulting Zimbabwe", "machine learning Zimbabwe", "AI training Zimbabwe",
      "AI investment Zimbabwe", "AI startups Zimbabwe", "Zimbabwe Vision 2030 AI",
      "AI jobs Zimbabwe",
    ],
    image: "/blog/zimbabwe-ai-flag-future.png",
    ogImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-04-14",
    dateModified: FRESHNESS_DATE,
    category: "AI & Tech",
    shareSummary: "Zimbabwe's AI economy is here. Read this before your competitors do — the 5 moves every business must make right now.",
  },
  "why-every-zimbabwean-sme-needs-digital-presence-2026": {
    title: "Why Every Zimbabwean SME Needs Digital Presence 2026 | KuWeX Studios",
    description:
      "8.4M Zimbabweans are online. 76% Google before buying. If your SME isn't visible online, you're invisible — here's the 90-day fix plan.",
    keywords: [
      "digital presence Zimbabwe SME", "SME digital marketing Zimbabwe",
      "online business Zimbabwe", "get online Zimbabwe",
      "digital marketing Harare", "Zimbabwe business online",
      "ecommerce Zimbabwe", "SEO for SMEs Zimbabwe", "digital strategy Zimbabwe",
      "website for small business Zimbabwe", "Google My Business Zimbabwe",
      "online visibility Harare", "ZW domain registration",
      "digital agency Bulawayo", "online growth Zimbabwe",
      "SME online sales", "2026 digital trends Zimbabwe",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-04-12",
    dateModified: FRESHNESS_DATE,
    category: "Digital Marketing",
    shareSummary: "If your business isn't online in 2026 — does it even exist? The 90-day plan to fix it.",
  },
  "hustle-to-brand-zimbabwean-startups-trust-online": {
    title: "From Hustle to Brand: Build Trust Online | KuWeX Studios",
    description:
      "Hustle doesn't scale — trust does. The exact framework Zimbabwean startups use to transform side-hustles into trusted online brands customers buy from.",
    keywords: [
      "Zimbabwe startup branding", "build online trust Zimbabwe",
      "brand building Zimbabwe", "startup digital presence Harare",
      "online credibility Zimbabwe", "startup marketing Zimbabwe",
      "Zimbabwe entrepreneur", "side hustle to business Zimbabwe",
      "brand trust Africa", "startup branding 2026", "e-commerce trust Zimbabwe",
      "customer trust online", "social proof Zimbabwe",
      "startup branding Bulawayo", "Zimbabwe small business growth",
      "startup founder Zimbabwe", "brand authority Zimbabwe",
    ],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Weston",
    date: "2026-04-10",
    dateModified: FRESHNESS_DATE,
    category: "Branding",
    shareSummary: "Hustle gets you started. Trust gets you paid. The framework every Zimbabwean startup founder needs.",
  },
  "new-zimbabwean-customer-checks-google-first": {
    title: "Zimbabwean Customers Check Google First | KuWeX Studios",
    description:
      "93% of buying journeys start on Google. Is your Zimbabwe business showing up? The exact playbook to dominate page 1 in Harare & Bulawayo this year.",
    keywords: [
      "Google Business Profile Zimbabwe", "SEO Zimbabwe business",
      "Google ranking Zimbabwe", "local SEO Harare",
      "Zimbabwe customer behaviour online", "Google search Zimbabwe",
      "SEO Bulawayo", "online reviews Zimbabwe", "Google Maps Zimbabwe",
      "business listing Harare", "customer journey Zimbabwe",
      "search intent Zimbabwe", "Zimbabwe consumer 2026", "Google Zimbabwe",
      "search marketing Harare", "ZW SEO services", "digital visibility Zimbabwe",
    ],
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-04-08",
    dateModified: FRESHNESS_DATE,
    category: "SEO",
    shareSummary: "9 out of 10 Zimbabwean customers Google you before they call. Are you showing up — or hiding?",
  },
  "zimbabwe-national-ai-strategy-ngos-corporates-government": {
    title: "Zimbabwe AI Strategy: NGOs, Corporates & Government | KuWeX Studios",
    description:
      "Zimbabwe's National AI Strategy 2026-2030 explained for NGOs, corporates & government. Practical 90-day AI roadmap for every sector.",
    keywords: [
      "Zimbabwe National AI Strategy", "AI for NGOs Zimbabwe",
      "AI corporate Zimbabwe", "e-governance Zimbabwe", "AI policy Zimbabwe",
      "AI public sector Zimbabwe", "NGO digital Zimbabwe",
      "AI implementation Africa", "AI roadmap Zimbabwe", "government AI Zimbabwe",
      "AI compliance Zimbabwe", "AI risk management", "AI ethics Africa",
      "AI Zimbabwe 2026", "AI development Africa", "AI consulting Harare",
      "AI white paper Zimbabwe",
    ],
    image: "/blog/ai-summit-africa-zimbabwe.jpg",
    ogImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-04-05",
    dateModified: FRESHNESS_DATE,
    category: "AI & Policy",
    shareSummary: "Zimbabwe's National AI Strategy translated into a real 90-day plan — for NGOs, corporates, and government.",
  },
  "digital-skills-national-power-upskill-team-zimbabwe": {
    title: "Digital Skills Zimbabwe: Upskill Your Team Now | KuWeX Studios",
    description:
      "Zimbabwe's ICT policy demands digital literacy by 2027. Digitally-skilled teams are 23% more productive. Upskill your workforce with this 8-week plan.",
    keywords: [
      "digital skills Zimbabwe", "upskill team Zimbabwe",
      "digital literacy Zimbabwe", "ICT policy Zimbabwe workforce",
      "employee training Harare", "corporate training Zimbabwe",
      "digital training Bulawayo", "online courses Zimbabwe",
      "tech skills Africa", "workforce development Zimbabwe",
      "Zimbabwe IT training", "computer literacy Zimbabwe",
      "digital transformation team", "HR digital Zimbabwe",
      "productivity training Zimbabwe", "digital workforce 2026",
      "reskilling Zimbabwe",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Weston",
    date: "2026-04-02",
    dateModified: FRESHNESS_DATE,
    category: "Training & HR",
    shareSummary: "Digitally-skilled teams ship 23% more work. The 8-week upskilling plan for Zimbabwean teams.",
  },
  "cybersecurity-data-privacy-trust-zimbabwe-digital-economy": {
    title: "Cybersecurity & Data Privacy Zimbabwe | KuWeX Studios",
    description:
      "Cyberattacks in Africa up 37%. Only 14% of Zimbabwe SMEs have a security policy. Protect your business under Zimbabwe's Data Protection Act.",
    keywords: [
      "cybersecurity Zimbabwe", "data privacy Zimbabwe",
      "Data Protection Act Zimbabwe", "cyber security Harare",
      "website security Zimbabwe", "business cybersecurity", "GDPR Africa",
      "data breach Zimbabwe", "SSL Zimbabwe", "ransomware Africa",
      "phishing Zimbabwe", "IT security Bulawayo", "two-factor authentication",
      "password manager Zimbabwe", "cybersecurity audit Zimbabwe",
      "POPIA Zimbabwe", "cyber insurance Africa",
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-03-28",
    dateModified: FRESHNESS_DATE,
    category: "Cybersecurity",
    shareSummary: "Most Zimbabwean SMEs are one click away from disaster. The non-technical cybersecurity guide every owner needs.",
  },
  "world-class-website-zimbabwean-businesses-compete-globally": {
    title: "World-Class Website for Zimbabwe Business | KuWeX Studios",
    description:
      "International clients won't trust a low-end site. Build a world-class website (Next.js, Core Web Vitals, conversion design) and compete globally.",
    keywords: [
      "world class website Zimbabwe", "web design Zimbabwe global",
      "international business website Harare", "Next.js web design Zimbabwe",
      "global website Zimbabwe", "premium web design Zimbabwe",
      "enterprise website Zimbabwe", "Core Web Vitals Zimbabwe",
      "fast website Zimbabwe", "web performance Africa",
      "conversion website design", "modern website Harare",
      "web design Bulawayo", "ecommerce global Zimbabwe",
      "Zimbabwe export marketing", "B2B website Zimbabwe",
      "international SEO Zimbabwe",
    ],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Weston",
    date: "2026-03-22",
    dateModified: FRESHNESS_DATE,
    category: "Web Design",
    shareSummary: "Your website is your first impression with international clients. Here's how to make it world-class.",
  },
  "rise-of-smart-zimbabwe-preparing-businesses-digital-economy": {
    title: "Smart Zimbabwe: Prepare Your Business | KuWeX Studios",
    description:
      "Smart cities, smart agriculture, smart governance — Zimbabwe's digital economy is moving fast. The complete readiness checklist for your business.",
    keywords: [
      "Smart Zimbabwe", "digital economy Zimbabwe",
      "Zimbabwe digital transformation", "smart city Harare",
      "Zimbabwe Vision 2030 digital", "IoT Zimbabwe", "smart agriculture Zimbabwe",
      "e-governance Zimbabwe", "NDS2 Zimbabwe", "4IR Zimbabwe",
      "fintech Zimbabwe", "smart business Zimbabwe",
      "digital infrastructure Africa", "digital readiness Zimbabwe",
      "smart manufacturing Zimbabwe", "Harare smart city", "digital Zimbabwe 2030",
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Kuda",
    date: "2026-03-16",
    dateModified: FRESHNESS_DATE,
    category: "Digital Transformation",
    shareSummary: "Smart Zimbabwe is happening — fast. The readiness checklist every business owner needs this quarter.",
  },
  "zimbabwe-future-belongs-visible-businesses-online-growth": {
    title: "Visible Businesses Win: Online Growth Zimbabwe | KuWeX Studios",
    description:
      "Visibility is the new currency. The exact growth-machine framework Zimbabwe business owners use to generate predictable leads every single month.",
    keywords: [
      "online growth Zimbabwe", "digital visibility Zimbabwe",
      "lead generation Zimbabwe", "growth marketing Zimbabwe",
      "SEO leads Zimbabwe", "online marketing Zimbabwe SME",
      "content marketing Zimbabwe", "inbound marketing Harare",
      "growth machine Zimbabwe", "predictable leads Zimbabwe",
      "sales funnel Zimbabwe", "online sales Bulawayo",
      "digital marketing agency Zimbabwe", "marketing automation Zimbabwe",
      "conversion rate Zimbabwe", "Zimbabwe SME growth",
      "business growth Africa 2026",
    ],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop&fm=jpg&q=85",
    author: "Weston",
    date: "2026-03-10",
    dateModified: FRESHNESS_DATE,
    category: "Growth",
    shareSummary: "Visibility is the new currency. The framework Zimbabwean owners use to make leads predictable every month.",
  },
};

export const blogSlugs = Object.keys(blogPostsMeta);
