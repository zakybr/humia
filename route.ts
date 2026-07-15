import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";

// Node runtime (Stripe SDK is not Edge-compatible).
export const runtime = "nodejs";

const MIN_NZD = 2;
const MAX_NZD = 50000;

function siteUrl(request: NextRequest): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.nextUrl.origin ??
    "http://localhost:3000"
  );
}

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Donations are not yet configured. Please check back soon." },
      { status: 503 },
    );
  }

  let amount = 0;
  try {
    const body = await request.json();
    amount = Number(body?.amount);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!Number.isFinite(amount) || amount < MIN_NZD || amount > MAX_NZD) {
    return NextResponse.json(
      { error: `Please enter an amount between $${MIN_NZD} and $${MAX_NZD}.` },
      { status: 400 },
    );
  }

  try {
    const stripe = new Stripe(secret);
    const base = siteUrl(request);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "nzd",
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: "Donation to HUMIA",
              description: "Dompet Dhuafa. Supporting the community and those in need.",
            },
          },
        },
      ],
      success_url: `${base}/donate/success`,
      cancel_url: `${base}/donate/cancelled`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Could not start checkout. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong starting your donation. Please try again." },
      { status: 502 },
    );
  }
}
