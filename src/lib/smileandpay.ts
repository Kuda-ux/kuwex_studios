// =====================================================
// Smile & Pay (ZB Bank) — Server-side integration helper
// Standard Checkout: redirect customer to ZB hosted page.
// Do NOT import from client components.
// =====================================================

// ---- Environment / base URL ----

function getBaseApiUrl(): string {
  const env = (process.env.SMILEANDPAY_ENV || 'sandbox').toLowerCase();
  if (env === 'production' || env === 'live') {
    return 'https://zbnet.zb.co.zw/wallet_gateway/payments-gateway';
  }
  return 'https://zbnet.zb.co.zw/wallet_sandbox_api/payments-gateway';
}

function getCreds(): { apiKey: string; apiSecret: string } {
  const apiKey = process.env.SMILEANDPAY_API_KEY;
  const apiSecret = process.env.SMILEANDPAY_API_SECRET;
  if (!apiKey || !apiSecret) {
    throw new Error(
      'Smile & Pay not configured. Set SMILEANDPAY_API_KEY and SMILEANDPAY_API_SECRET in environment variables.'
    );
  }
  return { apiKey, apiSecret };
}

function authHeaders(): Record<string, string> {
  const { apiKey, apiSecret } = getCreds();
  return {
    'x-api-key': apiKey,
    'x-api-secret': apiSecret,
    'Content-Type': 'application/json',
  };
}

// ---- Standard Checkout: Initiate ----

export interface SmilePayInitiateInput {
  orderReference: string;
  amount: number;
  currencyCode?: string; // "840" = USD (default), "924" = ZWG
  itemName: string;
  itemDescription: string;
  returnUrl: string;
  resultUrl: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobilePhoneNumber?: string;
}

export interface SmilePayInitiateResult {
  paymentUrl: string;
  transactionReference: string;
}

export async function smilePayInitiate(
  input: SmilePayInitiateInput
): Promise<SmilePayInitiateResult> {
  const url = `${getBaseApiUrl()}/payments/initiate-transaction`;

  const body: Record<string, unknown> = {
    orderReference: input.orderReference,
    amount: input.amount,
    currencyCode: input.currencyCode || '840', // USD
    itemName: input.itemName,
    itemDescription: input.itemDescription,
    returnUrl: input.returnUrl,
    resultUrl: input.resultUrl,
  };

  if (input.firstName) body.firstName = input.firstName;
  if (input.lastName) body.lastName = input.lastName;
  if (input.email) body.email = input.email;
  if (input.mobilePhoneNumber) body.mobilePhoneNumber = input.mobilePhoneNumber;

  const res = await fetch(url, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const data = await res.json();

  if (data.responseCode !== '00' || !data.paymentUrl) {
    throw new Error(
      data.responseMessage || `Smile & Pay initiation failed (code ${data.responseCode})`
    );
  }

  return {
    paymentUrl: data.paymentUrl,
    transactionReference: data.transactionReference,
  };
}

// ---- Check Status ----

export interface SmilePayStatusResult {
  orderReference: string;
  transactionReference: string;
  status: string;
  amount: number;
  currency: string;
  paymentOption: string;
  [key: string]: unknown;
}

export async function smilePayCheckStatus(
  orderReference: string
): Promise<SmilePayStatusResult> {
  const url = `${getBaseApiUrl()}/payments/transaction/${encodeURIComponent(
    orderReference
  )}/status/check`;

  const res = await fetch(url, {
    method: 'GET',
    headers: authHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Status check failed: HTTP ${res.status}`);
  }

  return res.json();
}

// ---- Cancel Payment ----

export async function smilePayCancel(orderReference: string): Promise<void> {
  const url = `${getBaseApiUrl()}/payments/cancel/${encodeURIComponent(orderReference)}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: authHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Cancel failed: HTTP ${res.status}`);
  }
}

// ---- Webhook payload type ----

export interface SmilePayWebhookPayload {
  merchantId: string;
  reference: string;            // transactionReference
  orderReference: string;       // our order id
  itemName: string;
  amount: number;
  currency: string;
  currencyCode: string;
  paymentOption: string;
  status: string;               // "PAID", "FAILED", "CANCELED", etc.
  createdDate: string;
  returnUrl: string;
  resultUrl: string;
  clientFee: number;
  merchantFee: number;
  mobileNumber: string;
}

// Map Smile&Pay status → our invoice status
export function mapSmilePayStatus(
  s: string | undefined
): 'paid' | 'pending' | 'cancelled' | 'failed' | 'unknown' {
  const v = (s || '').toUpperCase();
  if (v === 'PAID' || v === 'SUCCESS' || v === 'COMPLETED') return 'paid';
  if (v === 'PENDING' || v === 'AWAITING_PAYMENT') return 'pending';
  if (v === 'CANCELED' || v === 'CANCELLED') return 'cancelled';
  if (v === 'FAILED' || v === 'DECLINED' || v === 'INSUFFICIENT_FUNDS') return 'failed';
  return 'unknown';
}
