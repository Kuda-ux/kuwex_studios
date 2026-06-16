import { NextRequest, NextResponse } from 'next/server';
import { getDb, ensureSchema, generateId, nowIso, serializeRow } from '@/lib/turso';
import { smilePayInitiate } from '@/lib/smileandpay';

export const dynamic = 'force-dynamic';

interface InitiatePayload {
  service: string;
  amount: number;
  email: string;
  name?: string;
  phone?: string;
  notes?: string;
}

function getBaseUrl(req: NextRequest): string {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as InitiatePayload;

    // ---- Validation ----
    const service = (body.service || '').toString().trim();
    const email = (body.email || '').toString().trim().toLowerCase();
    const name = (body.name || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const notes = (body.notes || '').toString().trim();
    const amount = Number(body.amount);

    if (!service) return NextResponse.json({ error: 'Service description is required' }, { status: 400 });
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    if (!Number.isFinite(amount) || amount < 1)
      return NextResponse.json({ error: 'Amount must be at least $1' }, { status: 400 });

    // ---- Create draft invoice in DB ----
    await ensureSchema();
    const db = getDb();
    const now = nowIso();
    const id = generateId();
    const orderReference = `KWX-${Date.now().toString().slice(-9)}`;
    const description = [service, notes].filter(Boolean).join(' — ');

    const invoiceRow = serializeRow('invoices', {
      id,
      invoice_number: orderReference,
      client_id: '',
      client_name: name || email,
      project_name: service,
      amount,
      paid_amount: 0,
      status: 'draft',
      due_date: now,
      items: [
        {
          id: generateId(),
          description,
          quantity: 1,
          rate: amount,
          amount,
        },
      ],
      created_at: now,
      updated_at: now,
    } as Record<string, unknown>);

    const cols = Object.keys(invoiceRow);
    const placeholders = cols.map(() => '?').join(', ');
    const vals = cols.map((c) => invoiceRow[c] as never);
    await db.execute({
      sql: `INSERT INTO invoices (${cols.join(', ')}) VALUES (${placeholders})`,
      args: vals,
    });

    // ---- Initiate Smile & Pay transaction ----
    const baseUrl = getBaseUrl(req);

    // Split name into first / last for Smile & Pay
    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0] || undefined;
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined;

    const result = await smilePayInitiate({
      orderReference,
      amount,
      currencyCode: '840', // USD
      itemName: service,
      itemDescription: description || service,
      returnUrl: `${baseUrl}/pay/return?ref=${encodeURIComponent(orderReference)}`,
      resultUrl: `${baseUrl}/api/smileandpay/result`,
      firstName,
      lastName,
      email,
      mobilePhoneNumber: phone || undefined,
    });

    return NextResponse.json({
      reference: orderReference,
      paymentUrl: result.paymentUrl,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Payment initiation failed';
    console.error('[smileandpay initiate]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
