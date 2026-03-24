import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-transaction-fee";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Transaction Fee Explained (2026)",
      description:
        "The Etsy transaction fee is 6.5% of the total order amount including shipping. See how it works, what it applies to, and how it affects your profit.",
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
          name: "What is the Etsy transaction fee?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Etsy transaction fee is 6.5% of the total order value, including both the item price and any shipping amount charged to the buyer.",
          },
        },
        {
          "@type": "Question",
          name: "Does the transaction fee apply to shipping?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The 6.5% transaction fee applies to the shipping amount charged to the buyer, not just the item subtotal. If you charge $5 for shipping, Etsy takes 6.5% of that too.",
          },
        },
        {
          "@type": "Question",
          name: "How does the transaction fee affect profit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The transaction fee scales directly with order value, so higher prices mean more dollars going to Etsy in transaction fees alone. On a $100 order, the transaction fee is $6.50 before listing and processing fees are added.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Transaction Fee Explained (2026)";
  const description =
    "The Etsy transaction fee is 6.5% of the total order amount including shipping. See how it works, what it applies to, and how it affects your profit.";

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
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">Etsy Transaction Fee Explained</h1>
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9AA6BF] mb-2">Quick answer</p>
              <div className="border-l-4 border-emerald-500/60 pl-4 py-2 bg-white/5 text-[#D6DEEE] text-base">
                <p className="leading-7 text-[#9AA6BF]">Etsy charges a 6.5% transaction fee on every sale. It applies to the item price plus any shipping you charge the buyer. On a $35 sale with $5 shipping, that's 6.5% of $40 — $2.60.</p>
              </div>
            </div>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What the Etsy Transaction Fee Is</h2>
              <p className="leading-7 text-[#9AA6BF]">
                The Etsy transaction fee is <strong>6.5% of the total order value</strong>, applied per transaction on every sale. It is one of the core fees every Etsy seller pays, regardless of seller region or account type.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Unlike the listing fee, which is a fixed $0.20, the transaction fee scales with order value. The more you charge, the more Etsy takes in transaction fees alone.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What It Applies To</h2>
              <p className="leading-7 text-[#9AA6BF]">
                The transaction fee applies to the <strong>item price plus the shipping amount charged to the buyer</strong> — not just the item subtotal. This catches many sellers off guard, especially those who charge separately for shipping.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                If you sell an item for $30 and charge $6 shipping, Etsy calculates 6.5% on $36, not $30. That means the transaction fee is $2.34 rather than $1.95 — a meaningful difference at scale.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Real Examples: Transaction Fee by Order Value</h2>
              <p className="leading-7 text-[#9AA6BF]">
                These examples use the 6.5% rate on the item price only, with no shipping charged. Your actual fee will be higher if you charge for shipping.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$15 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Transaction fee: <strong>$0.98</strong> (6.5% of $15)
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$25 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Transaction fee: <strong>$1.63</strong> (6.5% of $25)
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$50 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Transaction fee: <strong>$3.25</strong> (6.5% of $50)
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$100 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Transaction fee: <strong>$6.50</strong> (6.5% of $100)
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">How It Combines With Other Fees</h2>
              <p className="leading-7 text-[#9AA6BF]">
                The transaction fee is one layer of the total Etsy fee stack. On a typical order, sellers also pay:
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Listing fee:</strong> $0.20 per transaction, fixed regardless of order value.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Payment processing fee:</strong> Around 3% plus a fixed amount (varies by seller region). For US sellers, that's typically 3% + $0.25.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Offsite Ads fee:</strong> 12–15% on orders attributed to Etsy's offsite advertising, applied on top of all other fees.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                On a $50 order with no shipping charged, the transaction fee alone is $3.25 — but combined with listing and processing fees, the total fee bill typically reaches around $5.20 before any ad fees.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>
              <h3 className="text-lg font-semibold text-[#EAF0FF]">What is the Etsy transaction fee?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                The Etsy transaction fee is 6.5% of the total order value, including both the item price and any shipping amount charged to the buyer. It applies to every sale on the platform.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Does the transaction fee apply to shipping?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Yes. Etsy applies the 6.5% transaction fee to the shipping amount charged to the buyer, not just the item subtotal. If you charge $5 for shipping, Etsy takes 6.5% of that amount too — $0.33 in this case.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">How does the transaction fee affect profit?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                The transaction fee scales directly with order value, so higher prices mean more dollars out to Etsy in transaction fees alone. On a $100 order the transaction fee is $6.50, before listing and processing fees are added. Combined with other fees, the total can exceed 10% of revenue for most orders.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Calculate your exact fees and profit</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Use these free calculators to see the transaction fee in context with all other Etsy fees and your actual costs.
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
