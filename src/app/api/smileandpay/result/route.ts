import { NextRequest, NextResponse } from 'next/server';
import { getDb, ensureSchema, nowIso } from '@/lib/turso';
import { SmilePayWebhookPayload, mapSmilePayStatus } from '@/lib/smileandpay';

export const dynamic = 'force-dynamic';

// Smile & Pay webhook — server-to-server POST with JSON payload
export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as SmilePayWebhookPayload;

    const orderReference = data.orderReference;
    if (!orderReference) {
      console.warn('[smileandpay result] missing orderReference in webhook');
      return NextResponse.json({ message: 'OK' }, { status: 200 });
    }

    await ensureSchema();
    const db = getDb();

    // Look up the draft invoice by orderReference (stored as invoice_number)
    const found = await db.execute({
      sql: 'SELECT id, amount, paid_amount FROM invoices WHERE invoice_number = ? LIMIT 1',
      args: [orderReference],
    });

    if (!found.rows.length) {
      console.warn('[smileandpay result] no invoice for orderReference', orderReference);
      // Still return 200 so Smile&Pay does not keep retrying
      return NextResponse.json({ message: 'OK' }, { status: 200 });
    }

    const row = found.rows[0] as Record<string, unknown>;
    const invoiceId = row.id as string;
    const invoiceAmount = Number(row.amount) || 0;
    const webhookAmount = Number(data.amount) || invoiceAmount;
    const mapped = mapSmilePayStatus(data.status);

    let newStatus: 'paid' | 'sent' | 'partial' | 'draft' | 'overdue' = 'draft';
    let paidAmount = 0;

    if (mapped === 'paid') {
      newStatus = 'paid';
      paidAmount = invoiceAmount > 0 ? invoiceAmount : webhookAmount;
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

    console.log(
      `[smileandpay result] ${orderReference} → ${data.status} → invoice ${newStatus}`
    );

    // Smile & Pay expects HTTP 200 acknowledgement
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Webhook processing failed';
    console.error('[smileandpay result]', msg);
    // Return 200 anyway to prevent infinite retries from the gateway
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  }
}
