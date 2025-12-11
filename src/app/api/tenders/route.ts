import { NextResponse } from 'next/server';

// Zimbabwe Tender Sources - Official Portals
const TENDER_SOURCES = {
  primary: [
    {
      name: 'ZimbabweTenders',
      url: 'https://www.zimbabwetenders.com/',
      description: 'Major local tender aggregator with real-time government and private tenders',
      requiresLogin: false,
    },
    {
      name: 'PRAZ eGP System',
      url: 'https://egp.praz.org.zw/',
      loginUrl: 'https://egp.praz.org.zw/Indexes/login',
      description: 'Official government e-procurement portal - register as supplier for full access',
      requiresLogin: true,
    },
  ],
  aggregators: [
    {
      name: 'TendersOnTime',
      url: 'https://www.tendersontime.com/zimbabwe-tenders/',
      description: 'Global tender aggregator with Zimbabwe RFPs, RFQs, and procurement notices',
      requiresLogin: false,
    },
    {
      name: 'GlobalTenders',
      url: 'https://www.globaltenders.com/zw/zimbabwe-web-design-tenders',
      description: 'Web design, intranet systems, and IT services tenders',
      requiresLogin: false,
    },
    {
      name: 'BidDetail',
      url: 'https://www.biddetail.com/zimbabwe-tenders/social-media-tenders',
      description: 'Social media and digital marketing tender notices',
      requiresLogin: true,
    },
  ],
  keywords: [
    'digital marketing',
    'website development',
    'app developers',
    'social media management',
    'ICT services',
    'web design',
    'software development',
  ],
};

interface ScrapedTender {
  id: string;
  title: string;
  organization: string;
  value: number | null;
  deadline: string;
  category: string;
  description: string;
  source: string;
  sourceUrl: string;
  publishedDate: string;
  location: string;
  requirements: string[];
}

// Sample tender data - These represent the TYPE of tenders available on Zimbabwe portals
// For REAL tenders, users should visit the actual portals listed in TENDER_SOURCES
// Note: Real-time scraping would require authentication and may violate terms of service
const getZimbabweTenders = async (): Promise<ScrapedTender[]> => {
  // Sample tender data representing opportunities typically found on Zimbabwe tender boards
  const tenders: ScrapedTender[] = [
    {
      id: 'ZIM-2024-001',
      title: 'Supply and Installation of ICT Equipment for Government Offices',
      organization: 'Ministry of Information Communication Technology',
      value: 150000,
      deadline: '2025-01-15',
      category: 'ICT & Technology',
      description: 'Supply, delivery, and installation of computers, servers, networking equipment, and related ICT infrastructure for government offices across Zimbabwe.',
      source: 'PRAZ eGP',
      sourceUrl: 'https://egp.praz.org.zw/',
      publishedDate: '2024-12-01',
      location: 'Harare',
      requirements: ['Valid Tax Clearance', 'Company Registration', 'ICT Certification', 'Previous Government Experience'],
    },
    {
      id: 'ZIM-2024-002',
      title: 'Development of E-Government Portal',
      organization: 'Ministry of Local Government',
      value: 280000,
      deadline: '2025-01-31',
      category: 'Web Development',
      description: 'Design, development, and deployment of a comprehensive e-government portal for citizen services including online applications, payments, and document verification.',
      source: 'ZimbabweTenders',
      sourceUrl: 'https://www.zimbabwetenders.com/',
      publishedDate: '2024-12-05',
      location: 'Nationwide',
      requirements: ['Web Development Portfolio', 'Security Certification', 'Government Project Experience'],
    },
    {
      id: 'ZIM-2024-003',
      title: 'Digital Marketing Campaign for Tourism Promotion',
      organization: 'Zimbabwe Tourism Authority',
      value: 45000,
      deadline: '2025-01-20',
      category: 'Digital Marketing',
      description: 'Comprehensive digital marketing campaign to promote Zimbabwe as a tourist destination, including social media management, content creation, and online advertising.',
      source: 'BidDetail',
      sourceUrl: 'https://www.biddetail.com/zimbabwe-tenders/social-media-tenders',
      publishedDate: '2024-12-08',
      location: 'Harare',
      requirements: ['Marketing Agency Registration', 'Tourism Portfolio', 'Social Media Expertise'],
    },
    {
      id: 'ZIM-2024-004',
      title: 'Hospital Management Information System',
      organization: 'Ministry of Health and Child Care',
      value: 320000,
      deadline: '2025-02-28',
      category: 'Software Development',
      description: 'Development and implementation of an integrated hospital management information system for public hospitals including patient records, billing, pharmacy, and laboratory modules.',
      source: 'PRAZ eGP',
      sourceUrl: 'https://egp.praz.org.zw/',
      publishedDate: '2024-12-10',
      location: 'Nationwide',
      requirements: ['Healthcare IT Experience', 'ISO Certification', 'Data Security Compliance'],
    },
    {
      id: 'ZIM-2024-005',
      title: 'Mobile Banking Application Development',
      organization: 'Reserve Bank of Zimbabwe',
      value: 200000,
      deadline: '2025-02-15',
      category: 'Mobile Apps',
      description: 'Development of a secure mobile banking application for financial inclusion initiatives, supporting USSD, mobile money integration, and biometric authentication.',
      source: 'PRAZ eGP',
      sourceUrl: 'https://egp.praz.org.zw/',
      publishedDate: '2024-12-12',
      location: 'Harare',
      requirements: ['Financial Sector Experience', 'PCI-DSS Compliance', 'Mobile Development Portfolio'],
    },
    {
      id: 'ZIM-2024-006',
      title: 'Corporate Branding and Identity Design',
      organization: 'Zimbabwe Investment and Development Agency',
      value: 35000,
      deadline: '2025-01-10',
      category: 'Branding & Design',
      description: 'Complete corporate rebranding including logo design, brand guidelines, stationery, and marketing collateral for the newly formed investment agency.',
      source: 'ZimbabweTenders',
      sourceUrl: 'https://www.zimbabwetenders.com/',
      publishedDate: '2024-12-03',
      location: 'Harare',
      requirements: ['Design Portfolio', 'Branding Experience', 'Print Production Capability'],
    },
    {
      id: 'ZIM-2024-007',
      title: 'School Management System for Primary Schools',
      organization: 'Ministry of Primary and Secondary Education',
      value: 180000,
      deadline: '2025-03-15',
      category: 'Software Development',
      description: 'Development of a cloud-based school management system for primary schools including student enrollment, attendance tracking, grade management, and parent communication.',
      source: 'PRAZ eGP',
      sourceUrl: 'https://egp.praz.org.zw/',
      publishedDate: '2024-12-15',
      location: 'Nationwide',
      requirements: ['Education Sector Experience', 'Cloud Infrastructure', 'Training Capability'],
    },
    {
      id: 'ZIM-2024-008',
      title: 'Agricultural E-Commerce Platform',
      organization: 'Agricultural Marketing Authority',
      value: 95000,
      deadline: '2025-02-01',
      category: 'Web Development',
      description: 'Development of an e-commerce platform connecting farmers directly with buyers, including mobile app, payment integration, and logistics management.',
      source: 'GlobalTenders',
      sourceUrl: 'https://www.globaltenders.com/zw/zimbabwe-web-design-tenders',
      publishedDate: '2024-12-11',
      location: 'Harare',
      requirements: ['E-commerce Experience', 'Payment Gateway Integration', 'Agricultural Sector Knowledge'],
    },
    {
      id: 'ZIM-2024-009',
      title: 'Video Production for Public Awareness Campaign',
      organization: 'Ministry of Health and Child Care',
      value: 25000,
      deadline: '2025-01-25',
      category: 'Media Production',
      description: 'Production of educational videos for public health awareness campaigns including scripting, filming, editing, and distribution across multiple platforms.',
      source: 'ZimbabweTenders',
      sourceUrl: 'https://www.zimbabwetenders.com/',
      publishedDate: '2024-12-09',
      location: 'Harare',
      requirements: ['Video Production Portfolio', 'Broadcasting Equipment', 'Health Communication Experience'],
    },
    {
      id: 'ZIM-2024-010',
      title: 'Cybersecurity Assessment and Implementation',
      organization: 'Postal and Telecommunications Regulatory Authority',
      value: 120000,
      deadline: '2025-02-20',
      category: 'ICT & Technology',
      description: 'Comprehensive cybersecurity assessment of critical infrastructure and implementation of security measures including penetration testing, security audits, and staff training.',
      source: 'PRAZ eGP',
      sourceUrl: 'https://egp.praz.org.zw/',
      publishedDate: '2024-12-14',
      location: 'Harare',
      requirements: ['Cybersecurity Certification', 'Government Clearance', 'Incident Response Capability'],
    },
    {
      id: 'ZIM-2024-011',
      title: 'University Learning Management System',
      organization: 'Zimbabwe Open University',
      value: 85000,
      deadline: '2025-01-30',
      category: 'Software Development',
      description: 'Implementation of a comprehensive learning management system for distance education including video conferencing, assignment submission, and automated grading.',
      source: 'TendersOnTime',
      sourceUrl: 'https://www.tendersontime.com/zimbabwe-tenders/',
      publishedDate: '2024-12-07',
      location: 'Harare',
      requirements: ['LMS Implementation Experience', 'Higher Education Portfolio', 'Technical Support Capability'],
    },
    {
      id: 'ZIM-2024-012',
      title: 'Smart City Infrastructure Consulting',
      organization: 'City of Harare',
      value: 75000,
      deadline: '2025-03-01',
      category: 'Consultancy',
      description: 'Consulting services for smart city infrastructure planning including IoT implementation, traffic management systems, and digital citizen services.',
      source: 'PRAZ eGP',
      sourceUrl: 'https://egp.praz.org.zw/',
      publishedDate: '2024-12-13',
      location: 'Harare',
      requirements: ['Smart City Experience', 'Urban Planning Knowledge', 'IoT Expertise'],
    },
    {
      id: 'ZIM-2024-013',
      title: 'Social Media Management for Government Ministry',
      organization: 'Ministry of Youth, Sport, Arts and Recreation',
      value: 28000,
      deadline: '2025-01-18',
      category: 'Digital Marketing',
      description: 'Comprehensive social media management including content creation, community management, and analytics reporting for ministry communication channels.',
      source: 'BidDetail',
      sourceUrl: 'https://www.biddetail.com/zimbabwe-tenders/social-media-tenders',
      publishedDate: '2024-12-16',
      location: 'Harare',
      requirements: ['Social Media Portfolio', 'Government Communication Experience', 'Content Creation Capability'],
    },
    {
      id: 'ZIM-2024-014',
      title: 'Website Development Consultancy',
      organization: 'Zimbabwe Investment and Development Agency',
      value: 42000,
      deadline: '2025-02-10',
      category: 'Web Development',
      description: 'Design and development of a modern, responsive website with investor portal, project database, and multilingual support.',
      source: 'ZimbabweTenders',
      sourceUrl: 'https://www.zimbabwetenders.com/',
      publishedDate: '2024-12-17',
      location: 'Harare',
      requirements: ['Web Development Portfolio', 'CMS Experience', 'Multilingual Website Experience'],
    },
  ];

  return tenders;
};

// Calculate match score based on company capabilities
const calculateMatchScore = (tender: ScrapedTender): number => {
  const companyCapabilities = [
    'Web Development',
    'Mobile Apps',
    'Branding & Design',
    'Digital Marketing',
    'Software Development',
    'ICT & Technology',
  ];

  let score = 50; // Base score

  // Category match
  if (companyCapabilities.includes(tender.category)) {
    score += 30;
  }

  // Value range preference (mid-range projects)
  if (tender.value && tender.value >= 30000 && tender.value <= 200000) {
    score += 10;
  }

  // Deadline feasibility (more than 30 days)
  const daysUntilDeadline = Math.ceil(
    (new Date(tender.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (daysUntilDeadline > 30) {
    score += 10;
  }

  // Add some randomness for variety
  score += Math.floor(Math.random() * 10) - 5;

  return Math.min(100, Math.max(0, score));
};

export async function GET() {
  try {
    const tenders = await getZimbabweTenders();
    
    // Add match scores
    const tendersWithScores = tenders.map(tender => ({
      ...tender,
      matchScore: calculateMatchScore(tender),
    }));

    // Sort by match score
    tendersWithScores.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      success: true,
      data: tendersWithScores,
      sources: TENDER_SOURCES,
      lastUpdated: new Date().toISOString(),
      totalCount: tendersWithScores.length,
    });
  } catch (error) {
    console.error('Error fetching tenders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tenders' },
      { status: 500 }
    );
  }
}
