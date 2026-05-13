// =====================================================
// Paynow (Zimbabwe) — Server-side integration helper
// Web flow: redirect customer to Paynow, IPN updates DB.
// Do NOT import from client components.
// =====================================================
import crypto from 'crypto';

const INITIATE_URL = 'https://www.paynow.co.zw/interface/initiatetransaction';

function getCreds() {
  const id = process.env.PAYNOW_INTEGRATION_ID;
  const key = process.env.PAYNOW_INTEGRATION_KEY;
  if (!id || !key) {
    throw new Error(
      'Paynow not configured. Set PAYNOW_INTEGRATION_ID and PAYNOW_INTEGRATION_KEY in environment variables.'
    );
  }
  return { id, key };
}

// Paynow hash = SHA-512( concat(all field values in insertion order) + integration_key ), uppercase hex.
function computeHash(values: string[], key: string): string {
  const concat = values.join('') + key;
  return crypto.createHash('sha512').update(concat, 'utf8').digest('hex').toUpperCase();
}

export interface PaynowInitiateInput {
  reference: string;
  amount: number;
  email: string;
  description: string;
  returnUrl: string;
  resultUrl: string;
}

export interface PaynowInitiateResult {
  browserUrl: string;
  pollUrl: string;
}

export async function paynowInitiate(input: PaynowInitiateInput): Promise<PaynowInitiateResult> {
  const { id, key } = getCreds();

  // IMPORTANT: insertion order matters — both for sending and for hashing.
  const fields: Record<string, string> = {
    id,
    reference: input.reference,
    amount: input.amount.toFixed(2),
    additionalinfo: input.description,
    returnurl: input.returnUrl,
    resulturl: input.resultUrl,
    authemail: input.email,
    status: 'Message',
  };
  fields.hash = computeHash(Object.values(fields), key);

  const body = new URLSearchParams(fields).toString();

  const res = await fetch(INITIATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    cache: 'no-store',
  });

  const text = await res.text();
  const data = Object.fromEntries(new URLSearchParams(text)) as Record<string, string>;

  const status = (data.status || '').toLowerCase();
  if (status !== 'ok') {
    throw new Error(data.error || `Paynow initiate failed: ${data.status || 'unknown'}`);
  }

  if (!data.browserurl || !data.pollurl) {
    throw new Error('Paynow response missing browserurl/pollurl');
  }

  return { browserUrl: data.browserurl, pollUrl: data.pollurl };
}

// Verify hash on Paynow IPN result POST or poll response.
// `data` is the parsed URL-encoded payload.
export function paynowVerifyHash(data: Record<string, string>): boolean {
  const { key } = getCreds();
  const incoming = data.hash;
  if (!incoming) return false;
  // Re-hash all fields except `hash`, in original insertion order.
  const values: string[] = [];
  for (const [k, v] of Object.entries(data)) {
    if (k === 'hash') continue;
    values.push(v);
  }
  const computed = computeHash(values, key);
  return computed === incoming;
}

export async function paynowPoll(pollUrl: string): Promise<Record<string, string>> {
  const res = await fetch(pollUrl, { cache: 'no-store' });
  const text = await res.text();
  return Object.fromEntries(new URLSearchParams(text)) as Record<string, string>;
}

// Paynow status string -> our invoice status
export function mapPaynowStatus(s: string | undefined): 'paid' | 'pending' | 'cancelled' | 'failed' | 'unknown' {
  const v = (s || '').toLowerCase();
  if (v === 'paid' || v === 'awaiting delivery' || v === 'delivered') return 'paid';
  if (v === 'sent' || v === 'created') return 'pending';
  if (v === 'cancelled') return 'cancelled';
  if (v === 'failed' || v === 'disputed' || v === 'refunded') return 'failed';
  return 'unknown';
}
