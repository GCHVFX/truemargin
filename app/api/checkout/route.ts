import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!secretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY not configured" },
        { status: 500 }
      );
    }

    if (!priceId) {
      return NextResponse.json(
        { error: "STRIPE_PRICE_ID not configured" },
        { status: 500 }
      );
    }

    // IMPORTANT: initialise Stripe inside the handler
    const stripe = new Stripe(secretKey, {
      apiVersion: "2026-02-25.clover",
    });

    // Use request origin so this works in production automatically
    const origin =
      req.headers.get("origin") ||
      `https://${req.headers.get("host")}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/pricing/success`,
      cancel_url: `${origin}/pricing/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Checkout failed" },
      { status: 500 }
    );
  }
}