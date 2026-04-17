import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Known spam/malicious bot user agents
const BLOCKED_BOTS = [
  'AhrefsBot',
  'MJ12bot',
  'DotBot',
  'SemrushBot',
  'BLEXBot',
  'DataForSeoBot',
  'MegaIndex',
  'Majestic',
  'Netcraft',
  'ZoominfoBot',
  'Buck/',
  'SeznamBot',
  'CCBot',
  'Bytespider',
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Scrapy',
  'colly',
  'python-requests',
  'Go-http-client',
  'curl/',
  'wget/',
];

// Rate limiting map (in-memory, resets on deploy)
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // max requests per minute per IP

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  // --- BLOCK MALICIOUS BOTS ---
  const isBlockedBot = BLOCKED_BOTS.some(bot => 
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
  
  if (isBlockedBot) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // --- RATE LIMITING (protect against DDoS/spam) ---
  if (pathname.startsWith('/api/') || pathname.startsWith('/contact')) {
    const now = Date.now();
    const record = rateLimit.get(ip);
    
    if (record) {
      if (now - record.timestamp > RATE_LIMIT_WINDOW) {
        rateLimit.set(ip, { count: 1, timestamp: now });
      } else {
        record.count++;
        if (record.count > RATE_LIMIT_MAX) {
          return new NextResponse('Too Many Requests', { status: 429 });
        }
      }
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }

    // Clean up old entries periodically
    if (rateLimit.size > 10000) {
      const cutoff = now - RATE_LIMIT_WINDOW * 2;
      for (const [key, value] of rateLimit.entries()) {
        if (value.timestamp < cutoff) rateLimit.delete(key);
      }
    }
  }

  // --- BLOCK ACCESS TO SENSITIVE PATHS ---
  if (
    pathname.includes('.env') ||
    pathname.includes('.git') ||
    pathname.includes('wp-admin') ||
    pathname.includes('wp-login') ||
    pathname.includes('xmlrpc') ||
    pathname.includes('phpmyadmin') ||
    pathname.includes('.php') ||
    pathname.includes('wp-content') ||
    pathname.includes('wp-includes') ||
    pathname.includes('/admin') && !pathname.startsWith('/dashboard')
  ) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // --- SECURITY HEADERS ---
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // XSS Protection
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy (disable unnecessary browser features)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
  );
  
  // Strict Transport Security (HSTS) - force HTTPS
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com https://*.google.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://www.googletagmanager.com https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join('; ')
  );

  // --- CACHE HEADERS FOR STATIC ASSETS (speed up loading) ---
  if (
    pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|eot|css|js)$/)
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
