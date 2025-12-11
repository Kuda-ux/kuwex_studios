import { NextRequest, NextResponse } from 'next/server';

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are an AI business assistant for KuWeX Studios, a creative digital agency based in Zimbabwe. Your role is to help analyze business data and provide actionable insights.

You have access to the following business context:
- KuWeX Studios offers: Web Development, Mobile Apps, Branding & Design, Digital Marketing, and Consultancy services
- Target market: Businesses in Zimbabwe and Southern Africa
- Business model: Project-based work with some retainer clients

When providing insights:
1. Be specific and actionable
2. Reference actual data when available
3. Suggest concrete next steps
4. Consider the Zimbabwe business context
5. Focus on growth opportunities and risk mitigation

Keep responses concise but comprehensive. Use bullet points for clarity.`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface BusinessContext {
  revenue?: number;
  projects?: number;
  leads?: number;
  clients?: number;
  invoices?: { paid: number; pending: number; overdue: number };
  tenders?: { active: number; won: number };
}

// Generate AI response using OpenAI API
async function generateAIResponse(messages: Message[], context?: BusinessContext): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    // Fallback to intelligent mock responses if no API key
    return generateMockResponse(messages[messages.length - 1]?.content || '', context);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API error');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    return generateMockResponse(messages[messages.length - 1]?.content || '', context);
  }
}

// Intelligent mock responses when API key is not available
function generateMockResponse(userMessage: string, context?: BusinessContext): string {
  const lowerMessage = userMessage.toLowerCase();

  // Revenue related queries
  if (lowerMessage.includes('revenue') || lowerMessage.includes('income') || lowerMessage.includes('money')) {
    return `## Revenue Analysis

Based on your current data:

**Key Observations:**
- Your revenue stream shows healthy diversification across services
- Web Development projects typically yield the highest margins (65-75%)
- Consider focusing on recurring revenue through maintenance contracts

**Recommendations:**
1. **Upsell Maintenance Packages** - Offer existing clients monthly support packages ($200-500/month)
2. **Bundle Services** - Combine web development with digital marketing for higher-value projects
3. **Target Government Tenders** - Zimbabwe government ICT spending is increasing

**Action Items:**
- Review pricing for web development services
- Create 3 service bundle packages
- Identify 5 potential upsell opportunities this week`;
  }

  // Lead/Client related queries
  if (lowerMessage.includes('lead') || lowerMessage.includes('client') || lowerMessage.includes('customer')) {
    return `## Lead & Client Analysis

**Current Status:**
- Lead conversion rate is crucial for growth
- Focus on quality over quantity

**Insights:**
1. **High-Value Leads** - Prioritize leads from referrals (2x higher conversion rate)
2. **Follow-up Timing** - Leads contacted within 24 hours are 7x more likely to convert
3. **Industry Focus** - Financial services and healthcare sectors show strong demand

**Recommended Actions:**
- Implement a 24-hour lead response policy
- Create industry-specific case studies
- Set up automated lead nurturing emails
- Schedule monthly check-ins with inactive clients`;
  }

  // Project related queries
  if (lowerMessage.includes('project') || lowerMessage.includes('deadline') || lowerMessage.includes('delivery')) {
    return `## Project Performance Analysis

**Key Metrics:**
- On-time delivery builds reputation and referrals
- Scope creep is the #1 cause of project delays

**Recommendations:**
1. **Buffer Time** - Add 20% buffer to all project timelines
2. **Milestone Payments** - Structure payments around deliverables
3. **Weekly Updates** - Send clients weekly progress reports

**Risk Mitigation:**
- Document all scope changes in writing
- Use project management tools for tracking
- Hold weekly internal project reviews`;
  }

  // Tender related queries
  if (lowerMessage.includes('tender') || lowerMessage.includes('bid') || lowerMessage.includes('government')) {
    return `## Tender Strategy Analysis

**Zimbabwe Tender Landscape:**
- Government ICT spending is increasing
- PRAZ registration is essential for public tenders
- Local content requirements favor Zimbabwean companies

**High-Opportunity Sectors:**
1. **E-Government** - Digital transformation initiatives
2. **Healthcare IT** - Hospital management systems
3. **Education Tech** - Learning management systems
4. **Financial Services** - Mobile banking solutions

**Action Plan:**
- Ensure PRAZ registration is current
- Build relationships with procurement officers
- Partner with larger firms for mega-projects
- Focus on tenders with 60+ day deadlines`;
  }

  // Invoice/Payment related queries
  if (lowerMessage.includes('invoice') || lowerMessage.includes('payment') || lowerMessage.includes('overdue')) {
    return `## Invoice & Payment Analysis

**Best Practices:**
1. **Payment Terms** - 50% upfront, 50% on delivery for new clients
2. **Early Payment Discount** - Offer 5% discount for payment within 7 days
3. **Automated Reminders** - Send reminders at 7, 3, and 1 day before due date

**Overdue Invoice Strategy:**
- Day 1-7: Friendly email reminder
- Day 8-14: Phone call follow-up
- Day 15-30: Formal letter
- Day 30+: Consider payment plan or collection

**Cash Flow Tips:**
- Invoice immediately upon milestone completion
- Require deposits for all new projects
- Review payment terms quarterly`;
  }

  // Marketing related queries
  if (lowerMessage.includes('marketing') || lowerMessage.includes('social') || lowerMessage.includes('promotion')) {
    return `## Marketing Strategy Insights

**Digital Presence:**
- LinkedIn is most effective for B2B in Zimbabwe
- Case studies drive 3x more inquiries than generic content
- Video content has highest engagement rates

**Recommended Channels:**
1. **LinkedIn** - Share project showcases, industry insights
2. **WhatsApp Business** - Direct client communication
3. **Google My Business** - Local SEO optimization
4. **Email Marketing** - Monthly newsletter to past clients

**Content Strategy:**
- Post 3-4 times per week on LinkedIn
- Create 1 case study per month
- Share client testimonials regularly
- Engage with industry conversations`;
  }

  // Default comprehensive response
  return `## Business Intelligence Summary

I'm here to help you make data-driven decisions for KuWeX Studios. Here's what I can analyze:

**Available Insights:**
- 📊 **Revenue Analysis** - Trends, forecasts, and optimization
- 👥 **Client & Lead Management** - Conversion rates, retention strategies
- 📁 **Project Performance** - Delivery metrics, resource allocation
- 📋 **Tender Opportunities** - Zimbabwe market analysis, bid strategies
- 💰 **Financial Health** - Invoice tracking, cash flow optimization
- 📱 **Marketing Effectiveness** - Channel performance, content strategy

**Quick Actions:**
- Ask about specific metrics or trends
- Request recommendations for growth
- Get insights on Zimbabwe market opportunities
- Analyze tender success strategies

**Example Questions:**
- "How can I improve lead conversion?"
- "What tenders should I focus on?"
- "How do I reduce overdue invoices?"
- "What marketing channels work best?"

What would you like to explore?`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, context } = body as { messages: Message[]; context?: BusinessContext };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { success: false, error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const response = await generateAIResponse(messages, context);

    return NextResponse.json({
      success: true,
      message: {
        role: 'assistant',
        content: response,
      },
    });
  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
