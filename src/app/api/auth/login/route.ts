import { NextRequest, NextResponse } from 'next/server';
import { signToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/auth';

// In-memory brute-force protection (resets on cold start — fine for Vercel serverless)
const attempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const now = Date.now();
  const record = attempts.get(ip);

  if (record && record.lockedUntil > now) {
    const mins = Math.ceil((record.lockedUntil - now) / 60000);
    return NextResponse.json(
      { error: `Too many failed attempts. Try again in ${mins} minute(s).` },
      { status: 429 }
    );
  }

  let email: string;
  let password: string;
  try {
    const body = await request.json();
    email = (body.email || '').toLowerCase().trim();
    password = body.password || '';
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@kuwexstudios.co.zw').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || '';

  const valid =
    email === adminEmail &&
    adminPassword.length > 0 &&
    password === adminPassword;

  if (!valid) {
    const r = attempts.get(ip) ?? { count: 0, lockedUntil: 0 };
    r.count += 1;
    if (r.count >= MAX_ATTEMPTS) {
      r.lockedUntil = now + LOCKOUT_MS;
      r.count = 0;
    }
    attempts.set(ip, r);
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  attempts.delete(ip);

  const token = await signToken({ email: adminEmail, role: 'admin' });

  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
  return res;
}
