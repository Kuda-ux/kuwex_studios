/**
 * Zimbabwe Tender Web Scraper
 * Scrapes real tender data from Zimbabwe tender portals
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import { RawTender, filterAndRankTenders, MatchedTender } from './tender-agent';

// User agent to mimic browser requests
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Request timeout
const TIMEOUT = 15000;

// Axios instance with default config
const httpClient = axios.create({
  timeout: TIMEOUT,
  headers: {
    'User-Agent': USER_AGENT,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
  }
});

interface ScraperResult {
  success: boolean;
  source: string;
  tenders: RawTender[];
  error?: string;
  scrapedAt: string;
}

/**
 * Scrape tenders from ZimbabweTenders.com
 */
async function scrapeZimbabweTenders(): Promise<ScraperResult> {
  const source = 'zimbabwetenders';
  const baseUrl = 'https://www.zimbabwetenders.com';
  
  try {
    // Try to fetch the main tenders page
    const response = await httpClient.get(baseUrl);
    const $ = cheerio.load(response.data);
    
    const tenders: RawTender[] = [];
    
    // Common selectors for tender listings (adjust based on actual site structure)
    // These selectors are examples - actual selectors depend on the site's HTML
    $('article, .tender-item, .listing-item, .tender, [class*="tender"]').each((index, element) => {
      try {
        const $el = $(element);
        
        // Extract tender details
        const title = $el.find('h2, h3, .title, .tender-title, a[href*="tender"]').first().text().trim();
        const description = $el.find('p, .description, .excerpt, .summary').first().text().trim();
        const organization = $el.find('.organization, .company, .client, .publisher').first().text().trim() || 'Zimbabwe Government';
        const deadline = $el.find('.deadline, .closing-date, .due-date, [class*="date"]').first().text().trim();
        const category = $el.find('.category, .sector, .type').first().text().trim() || 'General';
        const link = $el.find('a').first().attr('href');
        
        if (title && title.length > 10) {
          tenders.push({
            id: `ZT-${Date.now()}-${index}`,
            title,
            description: description || title,
            organization,
            deadline: parseDate(deadline) || getFutureDate(30),
            category: categorizeByTitle(title),
            sourceId: source,
            sourceUrl: link ? (link.startsWith('http') ? link : `${baseUrl}${link}`) : baseUrl,
            location: 'Zimbabwe',
            requirements: []
          });
        }
      } catch (err) {
        // Skip malformed entries
      }
    });
    
    return {
      success: true,
      source,
      tenders,
      scrapedAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      source,
      tenders: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      scrapedAt: new Date().toISOString()
    };
  }
}

/**
 * Scrape tenders from TendersOnTime Zimbabwe section
 */
async function scrapeTendersOnTime(): Promise<ScraperResult> {
  const source = 'tendersontime';
  const baseUrl = 'https://www.tendersontime.com/zimbabwe-tenders/';
  
  try {
    const response = await httpClient.get(baseUrl);
    const $ = cheerio.load(response.data);
    
    const tenders: RawTender[] = [];
    
    // Parse tender listings
    $('table tr, .tender-row, article, .listing').each((index, element) => {
      try {
        const $el = $(element);
        
        const title = $el.find('td:first-child a, .title, h3, h4').first().text().trim();
        const organization = $el.find('td:nth-child(2), .organization, .client').first().text().trim();
        const deadline = $el.find('td:nth-child(3), .deadline, .date').first().text().trim();
        const link = $el.find('a').first().attr('href');
        
        if (title && title.length > 10 && !title.toLowerCase().includes('title')) {
          tenders.push({
            id: `TOT-${Date.now()}-${index}`,
            title,
            description: title,
            organization: organization || 'Zimbabwe Organization',
            deadline: parseDate(deadline) || getFutureDate(30),
            category: categorizeByTitle(title),
            sourceId: source,
            sourceUrl: link ? (link.startsWith('http') ? link : `https://www.tendersontime.com${link}`) : baseUrl,
            location: 'Zimbabwe',
            requirements: []
          });
        }
      } catch (err) {
        // Skip malformed entries
      }
    });
    
    return {
      success: true,
      source,
      tenders,
      scrapedAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      source,
      tenders: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      scrapedAt: new Date().toISOString()
    };
  }
}

/**
 * Scrape tenders from GlobalTenders Zimbabwe section
 */
async function scrapeGlobalTenders(): Promise<ScraperResult> {
  const source = 'globaltenders';
  const baseUrl = 'https://www.globaltenders.com/zw/zimbabwe-tenders';
  
  try {
    const response = await httpClient.get(baseUrl);
    const $ = cheerio.load(response.data);
    
    const tenders: RawTender[] = [];
    
    // Parse tender listings
    $('.tender-item, .listing, article, tr[class*="tender"]').each((index, element) => {
      try {
        const $el = $(element);
        
        const title = $el.find('.title, h3, h4, td:first-child a').first().text().trim();
        const organization = $el.find('.organization, .client, td:nth-child(2)').first().text().trim();
        const deadline = $el.find('.deadline, .date, td:nth-child(3)').first().text().trim();
        const value = $el.find('.value, .amount, td:nth-child(4)').first().text().trim();
        const link = $el.find('a').first().attr('href');
        
        if (title && title.length > 10) {
          tenders.push({
            id: `GT-${Date.now()}-${index}`,
            title,
            description: title,
            organization: organization || 'Zimbabwe Organization',
            value: parseValue(value),
            deadline: parseDate(deadline) || getFutureDate(30),
            category: categorizeByTitle(title),
            sourceId: source,
            sourceUrl: link ? (link.startsWith('http') ? link : `https://www.globaltenders.com${link}`) : baseUrl,
            location: 'Zimbabwe',
            requirements: []
          });
        }
      } catch (err) {
        // Skip malformed entries
      }
    });
    
    return {
      success: true,
      source,
      tenders,
      scrapedAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      source,
      tenders: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      scrapedAt: new Date().toISOString()
    };
  }
}

/**
 * Scrape tenders from BidDetail Zimbabwe section
 */
async function scrapeBidDetail(): Promise<ScraperResult> {
  const source = 'biddetail';
  const baseUrl = 'https://www.biddetail.com/zimbabwe-tenders';
  
  try {
    const response = await httpClient.get(baseUrl);
    const $ = cheerio.load(response.data);
    
    const tenders: RawTender[] = [];
    
    // Parse tender listings
    $('.tender, .bid-item, article, .listing-row').each((index, element) => {
      try {
        const $el = $(element);
        
        const title = $el.find('.title, h3, h4, a').first().text().trim();
        const organization = $el.find('.organization, .agency, .client').first().text().trim();
        const deadline = $el.find('.deadline, .closing, .date').first().text().trim();
        const link = $el.find('a').first().attr('href');
        
        if (title && title.length > 10) {
          tenders.push({
            id: `BD-${Date.now()}-${index}`,
            title,
            description: title,
            organization: organization || 'Zimbabwe Organization',
            deadline: parseDate(deadline) || getFutureDate(30),
            category: categorizeByTitle(title),
            sourceId: source,
            sourceUrl: link ? (link.startsWith('http') ? link : `https://www.biddetail.com${link}`) : baseUrl,
            location: 'Zimbabwe',
            requirements: []
          });
        }
      } catch (err) {
        // Skip malformed entries
      }
    });
    
    return {
      success: true,
      source,
      tenders,
      scrapedAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      source,
      tenders: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      scrapedAt: new Date().toISOString()
    };
  }
}

/**
 * Parse various date formats to ISO string
 */
function parseDate(dateStr: string): string | null {
  if (!dateStr) return null;
  
  // Clean the string
  const cleaned = dateStr.replace(/[^\d\w\s\-\/]/g, '').trim();
  
  // Try various formats
  const formats = [
    /(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})/,  // DD/MM/YYYY or DD-MM-YYYY
    /(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/,  // YYYY-MM-DD
    /(\w+)\s+(\d{1,2}),?\s+(\d{4})/,        // Month DD, YYYY
    /(\d{1,2})\s+(\w+)\s+(\d{4})/,          // DD Month YYYY
  ];
  
  for (const format of formats) {
    const match = cleaned.match(format);
    if (match) {
      try {
        const date = new Date(cleaned);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      } catch {
        continue;
      }
    }
  }
  
  // Try direct parsing
  try {
    const date = new Date(cleaned);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
  } catch {
    // Fall through
  }
  
  return null;
}

/**
 * Parse value string to number
 */
function parseValue(valueStr: string): number | undefined {
  if (!valueStr) return undefined;
  
  // Remove currency symbols and commas
  const cleaned = valueStr.replace(/[^\d.]/g, '');
  const value = parseFloat(cleaned);
  
  return isNaN(value) ? undefined : value;
}

/**
 * Get a future date (for tenders without clear deadlines)
 */
function getFutureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

/**
 * Categorize tender by title keywords
 */
function categorizeByTitle(title: string): string {
  const titleLower = title.toLowerCase();
  
  const categories: Record<string, string[]> = {
    'Web Development': ['website', 'web', 'portal', 'online', 'e-commerce', 'ecommerce'],
    'Mobile Apps': ['mobile', 'app', 'android', 'ios', 'smartphone'],
    'Software Development': ['software', 'system', 'application', 'database', 'erp', 'crm'],
    'Digital Marketing': ['marketing', 'social media', 'seo', 'advertising', 'campaign'],
    'Branding': ['branding', 'logo', 'design', 'identity', 'creative'],
    'ICT Services': ['ict', 'it services', 'technology', 'computer', 'network'],
    'Video Production': ['video', 'film', 'production', 'multimedia', 'animation'],
    'Consultancy': ['consultancy', 'consulting', 'advisory', 'study'],
  };
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(kw => titleLower.includes(kw))) {
      return category;
    }
  }
  
  return 'General';
}

/**
 * Main function to scrape all sources
 */
export async function scrapeAllSources(): Promise<{
  tenders: RawTender[];
  results: ScraperResult[];
  totalScraped: number;
  successfulSources: number;
  failedSources: string[];
}> {
  // Run all scrapers in parallel
  const results = await Promise.all([
    scrapeZimbabweTenders(),
    scrapeTendersOnTime(),
    scrapeGlobalTenders(),
    scrapeBidDetail(),
  ]);
  
  // Combine all tenders
  const allTenders: RawTender[] = [];
  const failedSources: string[] = [];
  let successfulSources = 0;
  
  for (const result of results) {
    if (result.success) {
      allTenders.push(...result.tenders);
      successfulSources++;
    } else {
      failedSources.push(result.source);
    }
  }
  
  // Remove duplicates by title similarity
  const uniqueTenders = removeDuplicates(allTenders);
  
  return {
    tenders: uniqueTenders,
    results,
    totalScraped: uniqueTenders.length,
    successfulSources,
    failedSources
  };
}

/**
 * Remove duplicate tenders based on title similarity
 */
function removeDuplicates(tenders: RawTender[]): RawTender[] {
  const seen = new Map<string, RawTender>();
  
  for (const tender of tenders) {
    // Create a normalized key from title
    const key = tender.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 50);
    
    if (!seen.has(key)) {
      seen.set(key, tender);
    }
  }
  
  return Array.from(seen.values());
}

/**
 * Scrape and filter tenders for KuWeX
 */
export async function scrapeAndFilterForKuwex(): Promise<{
  matchedTenders: MatchedTender[];
  scrapeResults: ScraperResult[];
  stats: {
    totalScraped: number;
    matchedForKuwex: number;
    filteredOut: number;
    successfulSources: number;
    failedSources: string[];
  };
}> {
  const scrapeResult = await scrapeAllSources();
  
  // Filter and rank using the tender agent
  const matchedTenders = filterAndRankTenders(scrapeResult.tenders);
  
  return {
    matchedTenders,
    scrapeResults: scrapeResult.results,
    stats: {
      totalScraped: scrapeResult.totalScraped,
      matchedForKuwex: matchedTenders.length,
      filteredOut: scrapeResult.totalScraped - matchedTenders.length,
      successfulSources: scrapeResult.successfulSources,
      failedSources: scrapeResult.failedSources
    }
  };
}

// Export individual scrapers for testing
export {
  scrapeZimbabweTenders,
  scrapeTendersOnTime,
  scrapeGlobalTenders,
  scrapeBidDetail,
  parseDate,
  parseValue,
  categorizeByTitle
};
