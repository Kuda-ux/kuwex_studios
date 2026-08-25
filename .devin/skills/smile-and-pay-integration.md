---
description: Integrate or modify the Smile & Pay (ZB Bank) payment flow
---

## When to use

Use this skill when adding, fixing, or extending the Smile & Pay standard checkout, webhook, status polling, or cancel flow in the KuWeX Studios app.

## Key files

- `src/lib/smileandpay.ts` — server-side helper
- `src/app/api/smileandpay/initiate/route.ts`
- `src/app/api/smileandpay/result/route.ts`
- `src/app/api/smileandpay/status/route.ts`
- `src/app/pay/page.tsx` — public payment form

## Environment variables

- `SMILEANDPAY_API_KEY`
- `SMILEANDPAY_API_SECRET`
- `SMILEANDPAY_ENV` = `sandbox` (default) or `production`

## Base URLs

- **Sandbox:** `https://zbnet.zb.co.zw/wallet_sandbox_api/payments-gateway`
- **Production:** `https://zbnet.zb.co.zw/wallet_gateway/payments-gateway`

## Standard checkout

1. Build a POST body to `{baseUrl}/payments/initiate-transaction`.
2. Required fields:
   - `orderReference` — our invoice/order number, e.g. `KWX-...`
   - `amount`
   - `currencyCode` — `"840"` USD (default) or `"924"` ZWG
   - `itemName`
   - `itemDescription`
   - `returnUrl` — customer return page (`/pay/return?ref=...`)
   - `resultUrl` — webhook endpoint (`/api/smileandpay/result`)
3. Optional API fields:
   - `paymentMethod` — `WALLETPLUS`, `ECOCASH`, `INNBUCKS`, `CARD`, `OMARI`, `ONEMONEY` (not currently passed by `smilePayInitiate`)
   - `firstName`, `lastName`, `email`, `mobilePhoneNumber`
4. On success (`responseCode === "00"`) the API returns `paymentUrl` + `transactionReference`.
5. Redirect the customer to `paymentUrl`.

## Webhook

- Smile & Pay POSTs JSON to `resultUrl`.
- Key payload fields:
  - `merchantId`
  - `reference` — Smile & Pay `transactionReference`
  - `orderReference` — our order id
  - `itemName`, `amount`, `currency`, `currencyCode`
  - `paymentOption`
  - `status` — e.g. `"PAID"`
  - `createdDate`
  - `clientFee`, `merchantFee`
  - `mobileNumber`
- Return HTTP 200 immediately, even on errors, to avoid retries.
- Map `status` using `mapSmilePayStatus()` in `src/lib/smileandpay.ts`.
- Update the `invoices` table by `invoice_number = orderReference`.

## Status check

- GET `{baseUrl}/payments/transaction/{orderReference}/status/check`
- Use `smilePayCheckStatus()` helper.

## Cancel

- POST `{baseUrl}/payments/cancel/{orderReference}`
- Use `smilePayCancel()` helper.

## Response codes

- `00` — Success
- `01` — Pending
- `02` — Failed
- `03` — Insufficient funds
- `06` — Duplicate
- `07` — Timeout
- `08` — Canceled

## Notes

- `smilePayInitiate()` currently does **not** send the `paymentMethod` field. If you need to force a specific wallet or method, extend `SmilePayInitiateInput` and the body in `src/lib/smileandpay.ts`.
- The public `/pay` page currently hard-codes Smile & Pay. If adding Paynow as a selectable option, update both the UI and the initiate call.
