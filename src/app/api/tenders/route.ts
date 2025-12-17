import { NextResponse } from 'next/server';
import {
  KUWEX_PROFILE,
  TENDER_SOURCES,
  filterAndRankTenders,
  isDeadlineValid,
  getDaysUntilDeadline,
  type RawTender,
  type MatchedTender
} from '@/lib/tender-agent';

// Try to import scraper - will fail gracefully if dependencies not installed
let scrapeAndFilterForKuwex: typeof import('@/lib/tender-scraper').scrapeAndFilterForKuwex | null = null;
let scrapeAndFilterWithAI: typeof import('@/lib/ai-tender-scraper').scrapeAndFilterWithAI | null = null;

try {
  // Dynamic import to handle missing dependencies gracefully
  const scraperModule = require('@/lib/tender-scraper');
  const aiScraperModule = require('@/lib/ai-tender-scraper');
  scrapeAndFilterForKuwex = scraperModule.scrapeAndFilterForKuwex;
  scrapeAndFilterWithAI = aiScraperModule.scrapeAndFilterWithAI;
} catch (e) {
  console.log('Scraper dependencies not installed, using sample data');
}

// Extended tender interface for API response
interface TenderResponse extends MatchedTender {
  daysUntilDeadline: number;
  isUrgent: boolean;
  formattedValue: string;
}

/**
 * Simulated tender data from Zimbabwe sources
 * In production, this would be replaced with actual web scraping or API calls
 * to the tender portals. For now, we simulate realistic tender data.
 */
const fetchRawTendersFromSources = async (): Promise<RawTender[]> => {
  // Simulated raw tenders from various Zimbabwe sources
  // These include BOTH relevant and irrelevant tenders to demonstrate filtering
  const allTenders: RawTender[] = [
    // ===== RELEVANT TENDERS (Should match KuWeX) =====
    {
      id: 'PRAZ-2024-ICT-001',
      title: 'Development of E-Government Portal for Citizen Services',
      description: 'Design, development, and deployment of a comprehensive e-government web portal for citizen services including online applications, payments, document verification, and service tracking. The portal should be mobile-responsive and integrate with existing government systems.',
      organization: 'Ministry of ICT, Postal and Courier Services',
      value: 280000,
      currency: 'USD',
      deadline: '2026-01-31',
      publishedDate: '2024-12-05',
      category: 'Web Development',
      sourceId: 'praz',
      sourceUrl: 'https://egp.praz.org.zw/',
      requirements: ['Web Development Portfolio', 'Security Certification', 'Government Project Experience', 'Valid Tax Clearance'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'ZT-2024-DM-002',
      title: 'Digital Marketing Campaign for Tourism Promotion',
      description: 'Comprehensive digital marketing campaign to promote Zimbabwe as a premier tourist destination. Services include social media management, content creation, SEO optimization, Google Ads management, influencer partnerships, and analytics reporting.',
      organization: 'Zimbabwe Tourism Authority',
      value: 65000,
      currency: 'USD',
      deadline: '2026-01-20',
      publishedDate: '2024-12-08',
      category: 'Digital Marketing',
      sourceId: 'zimbabwetenders',
      sourceUrl: 'https://www.zimbabwetenders.com/',
      requirements: ['Marketing Agency Registration', 'Tourism Portfolio', 'Social Media Expertise'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'PRAZ-2024-MOB-003',
      title: 'Mobile Banking Application Development',
      description: 'Development of a secure mobile banking application for financial inclusion initiatives. The app should support USSD fallback, mobile money integration, biometric authentication, and work offline in low-connectivity areas.',
      organization: 'Reserve Bank of Zimbabwe',
      value: 200000,
      currency: 'USD',
      deadline: '2026-02-15',
      publishedDate: '2024-12-12',
      category: 'Mobile Apps',
      sourceId: 'praz',
      sourceUrl: 'https://egp.praz.org.zw/',
      requirements: ['Financial Sector Experience', 'PCI-DSS Compliance', 'Mobile Development Portfolio', 'Android & iOS Experience'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'ZT-2024-BR-004',
      title: 'Corporate Rebranding and Visual Identity Design',
      description: 'Complete corporate rebranding project including logo redesign, brand guidelines development, stationery design, marketing collateral, and brand strategy documentation for the newly restructured agency.',
      organization: 'Zimbabwe Investment and Development Agency',
      value: 45000,
      currency: 'USD',
      deadline: '2026-01-25',
      publishedDate: '2024-12-03',
      category: 'Branding',
      sourceId: 'zimbabwetenders',
      sourceUrl: 'https://www.zimbabwetenders.com/',
      requirements: ['Design Portfolio', 'Branding Experience', 'Print Production Capability'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'PRAZ-2024-SW-005',
      title: 'Hospital Management Information System Development',
      description: 'Development and implementation of an integrated hospital management information system for public hospitals. Modules include patient records, billing, pharmacy management, laboratory information system, and reporting dashboard.',
      organization: 'Ministry of Health and Child Care',
      value: 350000,
      currency: 'USD',
      deadline: '2026-03-15',
      publishedDate: '2024-12-10',
      category: 'Software Development',
      sourceId: 'praz',
      sourceUrl: 'https://egp.praz.org.zw/',
      requirements: ['Healthcare IT Experience', 'ISO Certification', 'Data Security Compliance', 'HL7/FHIR Knowledge'],
      location: 'Nationwide'
    },
    {
      id: 'BD-2024-SM-006',
      title: 'Social Media Management and Content Creation',
      description: 'Comprehensive social media management services including daily content creation, community management, paid advertising campaigns, influencer coordination, and monthly analytics reporting across Facebook, Twitter, Instagram, and LinkedIn.',
      organization: 'Ministry of Youth, Sport, Arts and Recreation',
      value: 36000,
      currency: 'USD',
      deadline: '2026-01-18',
      publishedDate: '2024-12-16',
      category: 'Digital Marketing',
      sourceId: 'biddetail',
      sourceUrl: 'https://www.biddetail.com/zimbabwe-tenders/social-media-tenders',
      requirements: ['Social Media Portfolio', 'Government Communication Experience', 'Content Creation Capability'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'GT-2024-WEB-007',
      title: 'E-Commerce Platform for Agricultural Products',
      description: 'Development of an e-commerce web platform connecting farmers directly with buyers. Features include product listings, payment gateway integration, logistics tracking, mobile app companion, and farmer dashboard.',
      organization: 'Agricultural Marketing Authority',
      value: 120000,
      currency: 'USD',
      deadline: '2026-02-01',
      publishedDate: '2024-12-11',
      category: 'Web Development',
      sourceId: 'globaltenders',
      sourceUrl: 'https://www.globaltenders.com/zw/zimbabwe-web-design-tenders',
      requirements: ['E-commerce Experience', 'Payment Gateway Integration', 'Mobile App Development'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'TOT-2024-LMS-008',
      title: 'Learning Management System Implementation',
      description: 'Implementation of a comprehensive learning management system for distance education. Features include video conferencing integration, assignment submission, automated grading, student progress tracking, and mobile access.',
      organization: 'Zimbabwe Open University',
      value: 95000,
      currency: 'USD',
      deadline: '2026-01-30',
      publishedDate: '2024-12-07',
      category: 'Software Development',
      sourceId: 'tendersontime',
      sourceUrl: 'https://www.tendersontime.com/zimbabwe-tenders/',
      requirements: ['LMS Implementation Experience', 'Higher Education Portfolio', 'Technical Support Capability'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'PRAZ-2024-VID-009',
      title: 'Video Production for Public Health Campaign',
      description: 'Production of educational videos for public health awareness campaigns. Services include scripting, filming, editing, motion graphics, voiceover, and distribution strategy across TV, social media, and community screenings.',
      organization: 'Ministry of Health and Child Care',
      value: 28000,
      currency: 'USD',
      deadline: '2026-01-22',
      publishedDate: '2024-12-09',
      category: 'Video Production',
      sourceId: 'praz',
      sourceUrl: 'https://egp.praz.org.zw/',
      requirements: ['Video Production Portfolio', 'Broadcasting Equipment', 'Health Communication Experience'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'ZT-2024-UX-010',
      title: 'UI/UX Design for Banking Mobile App',
      description: 'User interface and user experience design services for a new retail banking mobile application. Deliverables include user research, wireframes, high-fidelity prototypes in Figma, usability testing, and design system documentation.',
      organization: 'CBZ Bank',
      value: 55000,
      currency: 'USD',
      deadline: '2026-02-10',
      publishedDate: '2024-12-14',
      category: 'UI/UX Design',
      sourceId: 'zimbabwetenders',
      sourceUrl: 'https://www.zimbabwetenders.com/',
      requirements: ['UI/UX Portfolio', 'Banking App Experience', 'Figma Expertise', 'User Research Skills'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'PRAZ-2024-CRM-011',
      title: 'Customer Relationship Management System',
      description: 'Development of a custom CRM system for managing citizen interactions. Features include case management, automated workflows, reporting dashboard, integration with existing systems, and mobile access for field officers.',
      organization: 'City of Harare',
      value: 85000,
      currency: 'USD',
      deadline: '2026-02-28',
      publishedDate: '2024-12-13',
      category: 'Software Development',
      sourceId: 'praz',
      sourceUrl: 'https://egp.praz.org.zw/',
      requirements: ['CRM Development Experience', 'Government Project Portfolio', 'API Integration Skills'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'ZT-2024-SEO-012',
      title: 'SEO and Content Marketing Services',
      description: 'Search engine optimization and content marketing services for corporate website. Services include technical SEO audit, keyword research, content strategy, blog writing, link building, and monthly performance reporting.',
      organization: 'NetOne Cellular',
      value: 42000,
      currency: 'USD',
      deadline: '2026-01-28',
      publishedDate: '2024-12-17',
      category: 'Digital Marketing',
      sourceId: 'zimbabwetenders',
      sourceUrl: 'https://www.zimbabwetenders.com/',
      requirements: ['SEO Portfolio', 'Content Marketing Experience', 'Analytics Certification'],
      location: 'Harare, Zimbabwe'
    },

    // ===== IRRELEVANT TENDERS (Should be filtered out) =====
    {
      id: 'PRAZ-2024-CON-101',
      title: 'Construction of Rural Health Clinics',
      description: 'Construction of 15 rural health clinics across Mashonaland provinces. Works include site preparation, building construction, electrical installation, plumbing, and finishing works.',
      organization: 'Ministry of Health and Child Care',
      value: 2500000,
      currency: 'USD',
      deadline: '2026-04-30',
      publishedDate: '2024-12-01',
      category: 'Construction',
      sourceId: 'praz',
      sourceUrl: 'https://egp.praz.org.zw/',
      requirements: ['Construction License', 'CIFOZ Registration', 'Previous Building Experience'],
      location: 'Mashonaland'
    },
    {
      id: 'PRAZ-2024-MED-102',
      title: 'Supply of Medical Equipment and Pharmaceuticals',
      description: 'Supply and delivery of medical equipment, drugs, and pharmaceutical supplies to district hospitals. Items include diagnostic equipment, surgical instruments, and essential medicines.',
      organization: 'NatPharm',
      value: 1800000,
      currency: 'USD',
      deadline: '2026-02-15',
      publishedDate: '2024-12-05',
      category: 'Medical Supplies',
      sourceId: 'praz',
      sourceUrl: 'https://egp.praz.org.zw/',
      requirements: ['Pharmaceutical License', 'MCAZ Registration', 'Cold Chain Capability'],
      location: 'Nationwide'
    },
    {
      id: 'ZT-2024-VEH-103',
      title: 'Supply of Motor Vehicles for Government Fleet',
      description: 'Supply and delivery of 50 4x4 vehicles for government departments. Vehicles must be new, with full warranty and after-sales service support.',
      organization: 'Ministry of Transport',
      value: 3000000,
      currency: 'USD',
      deadline: '2026-03-01',
      publishedDate: '2024-12-10',
      category: 'Vehicles',
      sourceId: 'zimbabwetenders',
      sourceUrl: 'https://www.zimbabwetenders.com/',
      requirements: ['Vehicle Dealership License', 'Import Permit', 'Service Center'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'PRAZ-2024-AGR-104',
      title: 'Supply of Agricultural Inputs and Fertilizers',
      description: 'Supply and distribution of agricultural inputs including seeds, fertilizers, and farming chemicals for the upcoming farming season.',
      organization: 'Ministry of Agriculture',
      value: 5000000,
      currency: 'USD',
      deadline: '2026-01-15',
      publishedDate: '2024-12-08',
      category: 'Agricultural Supplies',
      sourceId: 'praz',
      sourceUrl: 'https://egp.praz.org.zw/',
      requirements: ['Agricultural Supplier License', 'Warehouse Facilities', 'Distribution Network'],
      location: 'Nationwide'
    },
    {
      id: 'ZT-2024-SEC-105',
      title: 'Provision of Security Guard Services',
      description: 'Provision of 24-hour security guard services for government buildings. Services include access control, patrol, and incident response.',
      organization: 'Ministry of Finance',
      value: 450000,
      currency: 'USD',
      deadline: '2026-02-20',
      publishedDate: '2024-12-12',
      category: 'Security Services',
      sourceId: 'zimbabwetenders',
      sourceUrl: 'https://www.zimbabwetenders.com/',
      requirements: ['Security Company License', 'PSC Registration', 'Trained Personnel'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'PRAZ-2024-FUR-106',
      title: 'Supply of Office Furniture and Equipment',
      description: 'Supply and delivery of office furniture including desks, chairs, filing cabinets, and conference room furniture for new government offices.',
      organization: 'Public Service Commission',
      value: 320000,
      currency: 'USD',
      deadline: '2026-01-25',
      publishedDate: '2024-12-15',
      category: 'Furniture',
      sourceId: 'praz',
      sourceUrl: 'https://egp.praz.org.zw/',
      requirements: ['Furniture Supplier License', 'Showroom', 'Delivery Capability'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'ZT-2024-CAT-107',
      title: 'Catering Services for Government Events',
      description: 'Provision of catering services for government conferences, workshops, and official events throughout the year.',
      organization: 'Office of the President and Cabinet',
      value: 180000,
      currency: 'USD',
      deadline: '2026-01-20',
      publishedDate: '2024-12-11',
      category: 'Catering',
      sourceId: 'zimbabwetenders',
      sourceUrl: 'https://www.zimbabwetenders.com/',
      requirements: ['Catering License', 'Health Certificate', 'Event Experience'],
      location: 'Harare, Zimbabwe'
    },
    {
      id: 'PRAZ-2024-CLN-108',
      title: 'Cleaning Services for Government Buildings',
      description: 'Provision of daily cleaning services for government office buildings including floor cleaning, window washing, and waste management.',
      organization: 'Ministry of Local Government',
      value: 95000,
      currency: 'USD',
      deadline: '2026-02-05',
      publishedDate: '2024-12-14',
      category: 'Cleaning Services',
      sourceId: 'praz',
      sourceUrl: 'https://egp.praz.org.zw/',
      requirements: ['Cleaning Company Registration', 'Equipment', 'Trained Staff'],
      location: 'Harare, Zimbabwe'
    }
  ];

  return allTenders;
};

/**
 * Format currency value
 */
const formatValue = (value?: number, currency: string = 'USD'): string => {
  if (!value) return 'Not specified';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * GET /api/tenders
 * Fetches tenders from Zimbabwe sources and filters them for KuWeX relevance
 * Uses real web scraping if dependencies are installed, otherwise falls back to sample data
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const useLive = searchParams.get('live') === 'true'; // Force live scraping
    const minScore = parseInt(searchParams.get('minScore') || '0'); // Default to 0 to show all matched tenders
    const priority = searchParams.get('priority'); // high, medium, low

    let rawTenders: RawTender[] = [];
    let matchedTenders: MatchedTender[] = [];
    let scrapeInfo: {
      mode: 'live' | 'sample';
      successfulSources?: number;
      failedSources?: string[];
    } = { mode: 'sample' };

    // Try to use live scraper if available and requested
    if (useLive) {
      try {
        console.log('Attempting live scrape from Zimbabwe tender sources...');
        let scrapeResult;

        // Try AI scraper first if available
        if (scrapeAndFilterWithAI) {
          console.log('Using AI-powered scraper...');
          try {
            scrapeResult = await scrapeAndFilterWithAI();
          } catch (err) {
            console.error('AI scraper failed, falling back to legacy scraper', err);
          }
        }

        // Fallback to legacy scraper if AI failed or not available, but legacy is
        if (!scrapeResult && scrapeAndFilterForKuwex) {
          console.log('Using legacy scraper...');
          scrapeResult = await scrapeAndFilterForKuwex();
        }

        // Check if we got results from either scraper
        let foundTenders = false;

        // Cast to any to handle different return types safely
        const result = scrapeResult as any;

        if (result) {
          if (result.tenders && result.tenders.length > 0) {
            matchedTenders = result.tenders;
            foundTenders = true;
          } else if (result.matchedTenders && result.matchedTenders.length > 0) {
            matchedTenders = result.matchedTenders;
            foundTenders = true;
          }
        }

        if (foundTenders && result) {
          rawTenders = []; // Not needed when using scraper directly

          // normalize stats
          const successfulSources = result.stats?.successfulSources || result.stats?.sources || 0;
          const failedSources = result.stats?.failedSources || [];

          scrapeInfo = {
            mode: 'live',
            successfulSources,
            failedSources
          };
          console.log(`Live scrape successful: ${matchedTenders!.length} tenders matched`);
        } else {
          // Fall back to sample data if scraping returned no results
          console.log('Live scrape returned no results, falling back to sample data');
          rawTenders = await fetchRawTendersFromSources();
          const validTenders = rawTenders.filter(t => isDeadlineValid(t.deadline));
          matchedTenders = filterAndRankTenders(validTenders);
        }
      } catch (scrapeError) {
        console.error('Live scrape failed, using sample data:', scrapeError);
        rawTenders = await fetchRawTendersFromSources();
        const validTenders = rawTenders.filter(t => isDeadlineValid(t.deadline));
        matchedTenders = filterAndRankTenders(validTenders);
      }
    } else {
      // Use sample data
      rawTenders = await fetchRawTendersFromSources();
      const validTenders = rawTenders.filter(t => isDeadlineValid(t.deadline));
      matchedTenders = filterAndRankTenders(validTenders);
    }

    // Apply additional filters
    let filteredTenders = matchedTenders.filter(t => t.matchScore >= minScore);

    if (priority) {
      filteredTenders = filteredTenders.filter(t => t.priority === priority);
    }

    // Enhance with additional computed fields
    const enhancedTenders: TenderResponse[] = filteredTenders.map(tender => ({
      ...tender,
      daysUntilDeadline: getDaysUntilDeadline(tender.deadline),
      isUrgent: getDaysUntilDeadline(tender.deadline) <= 14,
      formattedValue: formatValue(tender.value, tender.currency)
    }));

    // Calculate statistics
    const totalFetched = scrapeInfo.mode === 'live' ? matchedTenders.length : rawTenders.length;
    const stats = {
      totalFetched,
      validTenders: matchedTenders.length,
      matchedForKuwex: matchedTenders.length,
      filteredOut: scrapeInfo.mode === 'live' ? 0 : (rawTenders.length - matchedTenders.length),
      highPriority: matchedTenders.filter(t => t.priority === 'high').length,
      mediumPriority: matchedTenders.filter(t => t.priority === 'medium').length,
      lowPriority: matchedTenders.filter(t => t.priority === 'low').length,
      urgentDeadlines: enhancedTenders.filter(t => t.isUrgent).length,
      totalValue: matchedTenders.reduce((sum, t) => sum + (t.value || 0), 0)
    };

    return NextResponse.json({
      success: true,
      data: enhancedTenders,
      stats,
      scrapeInfo,
      sources: TENDER_SOURCES,
      profile: {
        company: KUWEX_PROFILE.company,
        services: KUWEX_PROFILE.services.map(s => s.name)
      },
      lastUpdated: new Date().toISOString(),
      message: scrapeInfo.mode === 'live'
        ? `Live scraped ${enhancedTenders.length} tenders matching KuWeX services from ${scrapeInfo.successfulSources} sources`
        : `Found ${enhancedTenders.length} tenders matching KuWeX services (sample data - add ?live=true for real scraping)`
    });
  } catch (error) {
    console.error('Error fetching tenders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch and filter tenders' },
      { status: 500 }
    );
  }
}

