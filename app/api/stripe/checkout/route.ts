import { NextResponse } from 'next/server'

// Minimal Stripe Checkout session creator.
// Requires env vars:
// - STRIPE_SECRET_KEY
// - STRIPE_PRICE_ID
// - NEXT_PUBLIC_APP_URL (e.g. http://localhost:3000 or https://gettruemargin.com)
//
// Also requires installing stripe:
//   npm i stripe
//
// If Stripe isn't configured yet, this returns 501 with a clear message.

export async function POST() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const priceId = process.env.STRIPE_PRICE_ID
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!secretKey || !priceId || !appUrl) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Stripe is not configured. Set STRIPE_SECRET_KEY, STRIPE_PRICE_ID, and NEXT_PUBLIC_APP_URL.',
      },
      { status: 501 },
    )
  }

  // Dynamic import so dev can run without Stripe installed until ready.
  let Stripe: any
  try {
    Stripe = (await import('stripe')).default
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Stripe package not installed. Run: npm i stripe',
      },
      { status: 501 },
    )
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: '2024-06-20',
  })

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing/cancel`,
    // Later: customer_email, metadata, allow_promotion_codes, etc.
  })

  return NextResponse.json({ ok: true, url: session.url })
}
