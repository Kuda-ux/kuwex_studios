import { NextRequest, NextResponse } from 'next/server';
import { getDb, ensureSchema } from '@/lib/turso';

export const dynamic = 'force-dynamic';

// GET /api/smileandpay/status?ref=KWX-123 — return current status of a payment by orderReference
export async function GET(req: NextRequest) {
  try {
    const ref = req.nextUrl.searchParams.get('ref');
    if (!ref) return NextResponse.json({ error: 'Missing ref' }, { status: 400 });

    await ensureSchema();
    const db = getDb();

    const result = await db.execute({
      sql: 'SELECT invoice_number, amount, paid_amount, status, project_name, client_name, updated_at FROM invoices WHERE invoice_number = ? LIMIT 1',
      args: [ref],
    });

    if (!result.rows.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const row = result.rows[0] as Record<string, unknown>;
    return NextResponse.json({
      reference: row.invoice_number,
      amount: Number(row.amount) || 0,
      paid_amount: Number(row.paid_amount) || 0,
      status: row.status,
      service: row.project_name,
      customer: row.client_name,
      updated_at: row.updated_at,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Status lookup failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
