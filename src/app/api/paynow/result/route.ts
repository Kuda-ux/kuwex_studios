import { NextRequest, NextResponse } from 'next/server';
import { getDb, ensureSchema, nowIso } from '@/lib/turso';
import { paynowVerifyHash, mapPaynowStatus } from '@/lib/paynow';

export const dynamic = 'force-dynamic';

// Paynow IPN — server-to-server POST with URL-encoded form data
export async function POST(req: NextRequest) {
  try {
    const text = await req.text();
    const data = Object.fromEntries(new URLSearchParams(text)) as Record<string, string>;

    if (!paynowVerifyHash(data)) {
      console.warn('[paynow result] hash verification failed', { reference: data.reference });
      return new NextResponse('Invalid hash', { status: 400 });
    }

    const reference = data.reference;
    if (!reference) return new NextResponse('Missing reference', { status: 400 });

    await ensureSchema();
    const db = getDb();

    // Look up the draft invoice by reference (stored as invoice_number)
    const found = await db.execute({
      sql: 'SELECT id, amount, paid_amount FROM invoices WHERE invoice_number = ? LIMIT 1',
      args: [reference],
    });
    if (!found.rows.length) {
      console.warn('[paynow result] no invoice for reference', reference);
      return new NextResponse('Unknown reference', { status: 404 });
    }

    const row = found.rows[0] as Record<string, unknown>;
    const invoiceId = row.id as string;
    const invoiceAmount = Number(row.amount) || 0;
    const paidAmountFromPaynow = Number(data.amount) || invoiceAmount;
    const mapped = mapPaynowStatus(data.status);

    let newStatus: 'paid' | 'sent' | 'partial' | 'draft' | 'overdue' = 'draft';
    let paidAmount = 0;
    if (mapped === 'paid') {
      newStatus = 'paid';
      paidAmount = invoiceAmount > 0 ? invoiceAmount : paidAmountFromPaynow;
    } else if (mapped === 'pending') {
      newStatus = 'sent';
      paidAmount = 0;
    } else if (mapped === 'cancelled' || mapped === 'failed') {
      newStatus = 'draft';
      paidAmount = 0;
    } else {
      newStatus = 'sent';
    }

    await db.execute({
      sql: 'UPDATE invoices SET status = ?, paid_amount = ?, updated_at = ? WHERE id = ?',
      args: [newStatus, paidAmount, nowIso(), invoiceId],
    });

    // Paynow expects a plain text 200 OK response
    return new NextResponse('OK', { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Result processing failed';
    console.error('[paynow result]', msg);
    return new NextResponse('Error', { status: 500 });
  }
}
