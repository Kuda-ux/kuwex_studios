/**
 * AI-Powered Tender Scraper using OpenRouter gpt-oss-120b (FREE)
 * Uses browser automation + AI vision to intelligently extract tender data
 */

import puppeteer from 'puppeteer';
import OpenAI from 'openai';
import type { RawTender } from './tender-agent';

// Initialize OpenRouter client
const openrouter = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY || '',
    defaultHeaders: {
        'HTTP-Referer': 'https://kuwexstudios.com',
        'X-Title': 'Kuwex Studios Tender Scraper'
    }
});

const TENDER_SOURCES = [
    {
        id: 'zimbabwetenders',
        name: 'Zimbabwe Tenders',
        url: 'https://www.zimbabwetenders.com/',
        searchUrl: 'https://www.zimbabwetenders.com/search?q=web+development'
    },
    {
        id: 'tendersontime',
        name: 'Tenders On Time',
        url: 'https://www.tendersontime.com/zimbabwe-tenders/',
        searchUrl: 'https://www.tendersontime.com/zimbabwe-tenders/?search=digital'
    }
];

interface AIScrapedTender {
    title: string;
    organization: string;
    description: string;
    value?: string;
    currency?: string;
    deadline: string;
    publishedDate?: string;
    category?: string;
    location?: string;
}

/**
 * Use AI to extract tender data from a screenshot
 */
async function extractTendersWithAI(screenshot: string, sourceUrl: string): Promise<AIScrapedTender[]> {
    try {
        const response = await openrouter.chat.completions.create({
            model: 'openai/gpt-oss-120b:free',
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: `You are a tender data extraction AI. Analyze this screenshot of a tender website and extract ALL visible tender listings.

For each tender, extract:
- title (the tender name/title)
- organization (who posted it)
- description (brief summary)
- value (budget amount if visible)
- currency (USD, ZWL, etc)
- deadline (submission deadline date)
- publishedDate (when posted, if visible)  
- category (e.g., "Web Development", "Marketing", "IT Services")
- location (Zimbabwe city/region if mentioned)

Focus on tenders related to: Web Development, Digital Marketing, Branding, Apps, Software, IT Services.

Return ONLY a valid JSON array of tender objects. No markdown, no code blocks, just raw JSON.

Example format:
[
  {
    "title": "Development of E-Government Portal",
    "organization": "Ministry of ICT",
    "description": "Design and development of web portal for citizen services",
    "value": "280000",
    "currency": "USD",
    "deadline": "2026-01-31",
    "publishedDate": "2024-12-17",
    "category": "Web Development",
    "location": "Harare"
  }
]`
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: `data:image/png;base64,${screenshot}`
                            }
                        }
                    ]
                }
            ],
            response_format: { type: 'json_object' },
            max_tokens: 4000
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
            console.error('❌ No content from AI');
            return [];
        }

        // Parse AI response 
        let parsedData: any;
        try {
            parsedData = JSON.parse(content);
        } catch (e) {
            console.error('❌ Failed to parse AI response as JSON:', content);
            return [];
        }

        // Handle both array and object with tenders array
        const tenders: AIScrapedTender[] = Array.isArray(parsedData) ? parsedData : parsedData.tenders || [];

        console.log(`✅ AI extracted ${tenders.length} tenders from ${sourceUrl}`);
        return tenders;

    } catch (error: any) {
        console.error(`❌ AI extraction failed for ${sourceUrl}:`, error.message);
        return [];
    }
}

/**
 * Scrape a single source using AI-powered vision
 */
async function scrapeSourceWithAI(source: typeof TENDER_SOURCES[0]): Promise<RawTender[]> {
    let browser;

    try {
        console.log(`🤖 AI scraping ${source.name}...`);

        // Launch headless browser
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Set viewport
        await page.setViewport({ width: 1920, height: 1080 });

        // Navigate to search page
        await page.goto(source.searchUrl || source.url, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Wait a bit for dynamic content
        await page.waitForTimeout(3000);

        // Take screenshot
        const screenshot = await page.screenshot({
            encoding: 'base64',
            fullPage: false // Just visible area
        });

        await browser.close();

        // Extract tenders using AI
        const aiTenders = await extractTendersWithAI(screenshot as string, source.url);

        // Convert to RawTender format
        const rawTenders: RawTender[] = aiTenders.map((t, index) => ({
            id: `${source.id}-ai-${Date.now()}-${index}`,
            title: t.title,
            description: t.description,
            organization: t.organization,
            value: t.value ? parseFloat(t.value.replace(/[^0-9.]/g, '')) : undefined,
            currency: t.currency || 'USD',
            deadline: t.deadline,
            publishedDate: t.publishedDate || new Date().toISOString().split('T')[0],
            category: t.category,
            sourceId: source.id,
            sourceUrl: source.url,
            location: t.location || 'Zimbabwe'
        }));

        return rawTenders;

    } catch (error: any) {
        console.error(`❌ Failed to scrape ${source.name}:`, error.message);
        if (browser) await browser.close();
        return [];
    }
}

/**
 * Scrape all sources using AI
 */
export async function scrapeAllSourcesWithAI(): Promise<RawTender[]> {
    console.log('🚀 Starting AI-powered tender scraping...');

    const results = await Promise.all(
        TENDER_SOURCES.map(source => scrapeSourceWithAI(source))
    );

    const allTenders = results.flat();
    console.log(`✅ AI scraping complete: ${allTenders.length} total tenders found`);

    return allTenders;
}

/**
 * Main export: Scrape and filter for Kuwex using AI
 */
export async function scrapeAndFilterWithAI() {
    try {
        // Scrape using AI
        const rawTenders = await scrapeAllSourcesWithAI();

        if (rawTenders.length === 0) {
            return {
                tenders: [],
                stats: {
                    totalScraped: 0,
                    matched: 0,
                    sources: 0
                }
            };
        }

        // Import filtering logic
        const { filterAndRankTenders } = await import('./tender-agent');
        const matchedTenders = filterAndRankTenders(rawTenders);

        return {
            tenders: matchedTenders,
            stats: {
                totalScraped: rawTenders.length,
                matched: matchedTenders.length,
                sources: new Set(rawTenders.map(t => t.sourceId)).size
            }
        };

    } catch (error: any) {
        console.error('❌ AI scraper error:', error);
        throw error;
    }
}
