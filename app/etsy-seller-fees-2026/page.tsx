import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-seller-fees-2026";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Seller Fees 2026: Full Breakdown",
      description:
        "Complete breakdown of all Etsy seller fees in 2026: listing, transaction, payment processing, Offsite Ads, and regulatory fees. See what each fee costs and when it applies.",
      url: CANONICAL,
      isPartOf: {
        "@type": "WebSite",
        name: "TrueMargin",
        url: "https://gettruemargin.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What are all the fees Etsy charges sellers in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In 2026, Etsy charges sellers five types of fees: a $0.20 listing fee per item, a 6.5% transaction fee on the total order including shipping, a payment processing fee (around 3% + $0.25 for US sellers), an optional Offsite Ads fee of 12–15% on attributed sales, and a regulatory operating fee in some regions.",
          },
        },
        {
          "@type": "Question",
          name: "Did Etsy fees change in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Etsy's core fee structure has been stable since the 6.5% transaction fee was introduced in 2022. Payment processing rates can vary by region and Etsy can update them. Always verify current rates in your Etsy seller account.",
          },
        },
        {
          "@type": "Question",
          name: "How much does Etsy take in total?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most sellers see total Etsy fees between 10% and 15% of order value on a standard sale. The exact amount depends on order size, shipping charged, seller region, and whether Offsite Ads applies.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Seller Fees 2026: Full Breakdown";
  const description =
    "Complete breakdown of all Etsy seller fees in 2026: listing, transaction, payment processing, Offsite Ads, and regulatory fees. See what each fee costs and when it applies.";

  return {
    title,
    description,
    alternates: { canonical: CANONICAL },
    openGraph: {
      type: "article",
      url: CANONICAL,
      title,
      description,
      siteName: "TrueMargin",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />

      <main className="calculator-page-bg min-h-screen py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 text-[#EAF0FF] sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">Etsy Seller Fees 2026: Complete Breakdown</h1>
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9AA6BF] mb-2">Quick answer</p>
              <div className="border-l-4 border-emerald-500/60 pl-4 py-2 bg-white/5 text-[#D6DEEE] text-base">
                <p className="leading-7 text-[#9AA6BF]">In 2026, Etsy charges sellers a $0.20 listing fee, 6.5% transaction fee, ~3% + $0.25 payment processing fee, and an optional 12–15% Offsite Ads fee. Most sellers see total fees between 10% and 15% per order.</p>
              </div>
            </div>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">All Etsy Seller Fees in 2026</h2>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Listing fee:</strong> $0.20 per listing or renewal. Charged when you publish a new listing and again each time it renews after a sale or expiry.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Transaction fee:</strong> 6.5% of the total order value including any shipping charged to the buyer. Applied on every sale.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Payment processing fee:</strong> Varies by seller country. For most sellers (US, CA, AU) it's approximately 3% + $0.25 per order. UK sellers pay 4% + £0.20. Applied through Etsy Payments.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Offsite Ads fee:</strong> 12% of the order total if your shop made over $10,000 in the past year; 15% if under. Only charged when Etsy attributes the sale to an Offsite Ads click. Not applied to every order.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Regulatory operating fee:</strong> An additional percentage applied in certain regions including the UK, France, and select others. Check your Etsy account to see if this applies to your shop.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Which Fees Apply to Every Sale</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Three fees apply as a baseline on every Etsy order: the listing fee ($0.20), the transaction fee (6.5%), and the payment processing fee (~3% + fixed). These are unavoidable for any seller using Etsy Payments.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                The Offsite Ads fee and regulatory operating fee are conditional. They only apply when specific criteria are met. Offsite Ads is triggered by ad attribution; regulatory fees depend on your shop's country and Etsy's regional fee policies.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Which Fees Apply to Shipping</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Both the transaction fee and the payment processing fee apply to <strong>shipping charged to the buyer</strong>, not just the item subtotal. This is one of the most commonly missed details in Etsy fee calculations.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                If you sell a $40 item and charge $6 shipping, Etsy calculates the 6.5% transaction fee and the 3% processing component on $46, not $40. On a $6 shipping charge, that adds roughly $0.55 in fees that many sellers don't account for.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Total Fee Examples by Order Value</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Combined baseline fees (listing + transaction + processing) for US sellers, item price only, no shipping charged. Offsite Ads column shows the additional fee if applicable.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$20 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Baseline fees: <strong>~$2.35</strong><br />
                    With Offsite Ads (15%): <strong>~$5.35</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$35 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Baseline fees: <strong>~$3.78</strong><br />
                    With Offsite Ads (15%): <strong>~$9.03</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$50 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Baseline fees: <strong>~$5.20</strong><br />
                    With Offsite Ads (12%): <strong>~$11.20</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$100 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Baseline fees: <strong>~$9.95</strong><br />
                    With Offsite Ads (12%): <strong>~$21.95</strong>
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What Changed From 2025 to 2026</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Etsy's core fee structure has been stable since the 6.5% transaction fee was introduced in April 2022. The listing fee ($0.20), transaction rate (6.5%), and Offsite Ads rates (12%/15%) have not changed.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Regional payment processing fees can be updated independently by Etsy and may differ from historical rates. Always verify the current processing fee rate for your country directly in your Etsy seller account. These are listed under your payment settings.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>
              <h3 className="text-lg font-semibold text-[#EAF0FF]">What are all the fees Etsy charges sellers in 2026?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Five fee types: (1) $0.20 listing fee per item, (2) 6.5% transaction fee on total order including shipping, (3) payment processing fee of ~3% + $0.25 for US sellers, (4) optional 12–15% Offsite Ads fee on attributed sales, and (5) regulatory operating fee in select regions.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Did Etsy fees change in 2026?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                The core fee structure has been stable since the 2022 transaction fee increase to 6.5%. Processing fees vary by region and can be updated by Etsy at any time. Check your seller account for the most current rates applicable to your shop.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">How much does Etsy take in total?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Most sellers see total Etsy fees between 10% and 15% of order value on a standard sale without Offsite Ads. If Offsite Ads applies, total fees can exceed 20% of the order value. The exact amount depends on order size, shipping charged, seller region, and ad attribution.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Calculate your exact fees for any order</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Use these free calculators to go from fee ranges to exact numbers based on your actual listing and seller region.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/etsy-fee-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Fee Calculator
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Estimate Etsy fees for one order</span>
                </Link>
                <Link
                  href="/etsy-profit-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Profit Calculator
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">See what you actually keep</span>
                </Link>
                <Link
                  href="/etsy-break-even-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Break-even Calculator
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Find your minimum safe price</span>
                </Link>
                <Link
                  href="/etsy-pricing-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Pricing Calculator
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Set your Etsy price to hit your target margin</span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
