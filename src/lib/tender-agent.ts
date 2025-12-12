/**
 * KuWeX Tender Agent System
 * Automatically fetches and matches tenders from Zimbabwe sources
 * based on KuWeX's service offerings
 */

// KuWeX Service Profile - What we offer and keywords to match
export const KUWEX_PROFILE = {
  company: "KuWeX Studios",
  location: "Zimbabwe",
  services: [
    {
      name: "Web Development",
      keywords: [
        "website", "web development", "web design", "web application", 
        "portal", "e-commerce", "online platform", "web portal",
        "content management", "CMS", "wordpress", "react", "nextjs",
        "frontend", "backend", "full stack", "web-based system",
        "online system", "internet", "intranet", "web hosting"
      ],
      weight: 1.0
    },
    {
      name: "Mobile App Development", 
      keywords: [
        "mobile app", "mobile application", "android", "ios", "app development",
        "smartphone", "tablet", "mobile platform", "native app", "hybrid app",
        "flutter", "react native", "mobile solution"
      ],
      weight: 1.0
    },
    {
      name: "Branding & Design",
      keywords: [
        "branding", "brand identity", "logo design", "corporate identity",
        "visual identity", "graphic design", "brand strategy", "rebranding",
        "brand guidelines", "design services", "creative design", "artwork",
        "brand development", "marketing materials", "print design"
      ],
      weight: 0.9
    },
    {
      name: "Digital Marketing",
      keywords: [
        "digital marketing", "social media", "online marketing", "SEO",
        "search engine", "content marketing", "email marketing", "PPC",
        "advertising", "marketing campaign", "digital strategy", "analytics",
        "google ads", "facebook", "instagram", "linkedin", "twitter",
        "social media management", "influencer", "digital advertising"
      ],
      weight: 0.9
    },
    {
      name: "UI/UX Design",
      keywords: [
        "UI design", "UX design", "user interface", "user experience",
        "wireframe", "prototype", "usability", "interaction design",
        "design system", "figma", "adobe xd", "sketch"
      ],
      weight: 0.85
    },
    {
      name: "Software Development",
      keywords: [
        "software development", "system development", "application development",
        "custom software", "enterprise software", "database", "API",
        "integration", "automation", "ERP", "CRM", "management system",
        "information system", "MIS", "digital solution", "IT solution"
      ],
      weight: 0.95
    },
    {
      name: "Video & Multimedia",
      keywords: [
        "video production", "animation", "multimedia", "video editing",
        "motion graphics", "explainer video", "corporate video", "documentary",
        "promotional video", "2D animation", "3D animation"
      ],
      weight: 0.8
    }
  ],
  // Negative keywords - tenders we should NOT match (be specific to avoid false positives)
  excludeKeywords: [
    "construction works", "building construction", "civil works", "road construction", "bridge construction",
    "medical supplies", "pharmaceuticals", "drug supply", "medicine supply",
    "food supplies", "catering services", "furniture supply", "vehicle supply", "transport services",
    "security guards", "cleaning services", "office supplies",
    "agricultural equipment", "farming equipment", "mining equipment", "drilling equipment", "plumbing works",
    "electrical installation", "HVAC installation", "air conditioning installation"
  ],
  // Preferred organizations/sectors
  preferredSectors: [
    "Ministry of ICT", "Ministry of Information", "Government", "Parastatal",
    "NGO", "Bank", "Insurance", "Telecommunications", "Education",
    "Health", "Tourism", "Trade", "Finance", "Technology"
  ]
};

// Tender source configurations
export const TENDER_SOURCES = [
  {
    id: "zimbabwetenders",
    name: "ZimbabweTenders",
    url: "https://www.zimbabwetenders.com/",
    type: "aggregator",
    searchUrl: "https://www.zimbabwetenders.com/search?q=",
    categories: ["IT", "Web", "Software", "Digital", "Marketing"]
  },
  {
    id: "praz",
    name: "PRAZ eGP System",
    url: "https://egp.praz.org.zw/",
    type: "government",
    description: "Official Zimbabwe Government Procurement Portal",
    requiresRegistration: true
  },
  {
    id: "tendersontime",
    name: "TendersOnTime",
    url: "https://www.tendersontime.com/zimbabwe-tenders/",
    type: "aggregator",
    searchUrl: "https://www.tendersontime.com/zimbabwe-tenders/?search="
  },
  {
    id: "globaltenders",
    name: "GlobalTenders",
    url: "https://www.globaltenders.com/zw/zimbabwe-web-design-tenders",
    type: "aggregator"
  },
  {
    id: "biddetail",
    name: "BidDetail",
    url: "https://www.biddetail.com/zimbabwe-tenders/",
    type: "aggregator"
  }
];

export interface RawTender {
  id: string;
  title: string;
  description: string;
  organization: string;
  value?: number;
  currency?: string;
  deadline: string;
  publishedDate?: string;
  category?: string;
  sourceId: string;
  sourceUrl: string;
  requirements?: string[];
  location?: string;
}

export interface MatchedTender extends RawTender {
  matchScore: number;
  matchedServices: string[];
  matchedKeywords: string[];
  relevanceReason: string;
  priority: "high" | "medium" | "low";
}

/**
 * Calculate match score for a tender against KuWeX profile
 */
export function calculateMatchScore(tender: RawTender): MatchedTender | null {
  const text = `${tender.title} ${tender.description} ${tender.category || ""} ${tender.requirements?.join(" ") || ""}`.toLowerCase();
  
  // Check for exclude keywords first
  for (const excludeWord of KUWEX_PROFILE.excludeKeywords) {
    if (text.includes(excludeWord.toLowerCase())) {
      return null; // Skip this tender
    }
  }
  
  let totalScore = 0;
  const matchedServices: string[] = [];
  const matchedKeywords: string[] = [];
  
  // Check each service category
  for (const service of KUWEX_PROFILE.services) {
    let serviceMatches = 0;
    const serviceMatchedKeywords: string[] = [];
    
    for (const keyword of service.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        serviceMatches++;
        serviceMatchedKeywords.push(keyword);
      }
    }
    
    if (serviceMatches > 0) {
      // Score based on number of keyword matches and service weight
      const serviceScore = (serviceMatches / service.keywords.length) * 100 * service.weight;
      totalScore += serviceScore;
      matchedServices.push(service.name);
      matchedKeywords.push(...serviceMatchedKeywords);
    }
  }
  
  // Bonus for preferred sectors
  for (const sector of KUWEX_PROFILE.preferredSectors) {
    if (text.includes(sector.toLowerCase()) || tender.organization.toLowerCase().includes(sector.toLowerCase())) {
      totalScore += 10;
    }
  }
  
  // Normalize score to 0-100
  const normalizedScore = Math.min(100, Math.round(totalScore / KUWEX_PROFILE.services.length));
  
  // Only return tenders with score >= 20 (lowered threshold for more results)
  if (normalizedScore < 20 || matchedServices.length === 0) {
    return null;
  }
  
  // Determine priority
  let priority: "high" | "medium" | "low" = "low";
  if (normalizedScore >= 80) priority = "high";
  else if (normalizedScore >= 50) priority = "medium";
  
  // Generate relevance reason
  const relevanceReason = `Matches ${matchedServices.join(", ")} services with keywords: ${matchedKeywords.slice(0, 5).join(", ")}${matchedKeywords.length > 5 ? "..." : ""}`;
  
  return {
    ...tender,
    matchScore: normalizedScore,
    matchedServices,
    matchedKeywords,
    relevanceReason,
    priority
  };
}

/**
 * Filter and rank tenders for KuWeX
 */
export function filterAndRankTenders(tenders: RawTender[]): MatchedTender[] {
  const matchedTenders: MatchedTender[] = [];
  
  for (const tender of tenders) {
    const matched = calculateMatchScore(tender);
    if (matched) {
      matchedTenders.push(matched);
    }
  }
  
  // Sort by match score (highest first), then by deadline (soonest first)
  return matchedTenders.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });
}

/**
 * Generate search queries for tender sources based on KuWeX services
 */
export function generateSearchQueries(): string[] {
  const queries: string[] = [];
  
  // Primary search terms
  queries.push(
    "website development",
    "web design",
    "mobile app development",
    "digital marketing",
    "branding",
    "software development",
    "IT services",
    "graphic design",
    "social media management",
    "e-commerce",
    "online platform",
    "system development"
  );
  
  return queries;
}

/**
 * Check if a tender deadline is still valid (not expired)
 */
export function isDeadlineValid(deadline: string): boolean {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return deadlineDate >= today;
}

/**
 * Get days until deadline
 */
export function getDaysUntilDeadline(deadline: string): number {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format tender value with currency
 */
export function formatTenderValue(value?: number, currency: string = "USD"): string {
  if (!value) return "Not specified";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}
