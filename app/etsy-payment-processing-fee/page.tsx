import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-payment-processing-fee";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Payment Processing Fee Explained (2026)",
      description:
        "Etsy's payment processing fee is a percentage plus a fixed amount per transaction. See the rates by country and how it affects your take-home per sale.",
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
          name: "What is Etsy's payment processing fee?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Etsy's payment processing fee is a percentage of the order total plus a fixed amount per transaction, charged for processing payment through Etsy Payments. For US sellers it's 3% + $0.25 per order.",
          },
        },
        {
          "@type": "Question",
          name: "Is the processing fee the same in all countries?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The payment processing fee varies by seller region. US and Canadian sellers pay 3% + $0.25, UK sellers pay 4% + £0.20, and Australian sellers pay 3% + $0.25. Etsy can update regional rates, so verify current rates in your Etsy seller account.",
          },
        },
        {
          "@type": "Question",
          name: "Can I avoid the Etsy payment processing fee?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In most countries where Etsy Payments is available, it is required to accept payments. Since the processing fee is charged through Etsy Payments, sellers in those regions cannot opt out of this fee.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Payment Processing Fee Explained (2026)";
  const description =
    "Etsy's payment processing fee is a percentage plus a fixed amount per transaction. See the rates by country and how it affects your take-home per sale.";

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
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">Etsy Payment Processing Fee Explained</h1>
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9AA6BF] mb-2">Quick answer</p>
              <div className="border-l-4 border-emerald-500/60 pl-4 py-2 bg-white/5 text-[#D6DEEE] text-base">
                <p className="leading-7 text-[#9AA6BF]">Etsy charges a payment processing fee on every Etsy Payments transaction. For US sellers it's 3% + $0.25 per order. The percentage applies to the full order amount including shipping.</p>
              </div>
            </div>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What the Payment Processing Fee Is</h2>
              <p className="leading-7 text-[#9AA6BF]">
                The Etsy payment processing fee is charged for handling payment through Etsy Payments. It is separate from the transaction fee and has two components: a <strong>percentage of the order total</strong> and a <strong>fixed amount per order</strong>.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Unlike the 6.5% transaction fee, the processing fee structure — percentage plus fixed — means the effective rate is higher on small orders where the fixed $0.25 component represents a larger share of the total.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Rates by Region</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Etsy's payment processing fee varies by seller country. Below are common rates — always verify current rates in your Etsy seller account, as Etsy can update them.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">United States</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">3% + $0.25 per order</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">Canada</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">3% + $0.25 per order</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">United Kingdom</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">4% + £0.20 per order</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">Australia</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">3% + $0.25 per order</p>
                </div>
              </div>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What It Applies To</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Like the transaction fee, Etsy's payment processing fee applies to the <strong>full order value including shipping charged to the buyer</strong>. If your item is $30 and you charge $5 shipping, the 3% component is calculated on $35.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                The fixed $0.25 is charged once per order regardless of order value — making it proportionally more impactful on low-priced items.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Real Examples: Processing Fee for US Sellers (3% + $0.25)</h2>
              <p className="leading-7 text-[#9AA6BF]">
                These examples show the processing fee on the item price only, with no shipping charged.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$15 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Processing fee: <strong>$0.70</strong> (3% of $15 + $0.25)
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$25 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Processing fee: <strong>$1.00</strong> (3% of $25 + $0.25)
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$50 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Processing fee: <strong>$1.75</strong> (3% of $50 + $0.25)
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$100 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Processing fee: <strong>$3.25</strong> (3% of $100 + $0.25)
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">How It Stacks With Other Fees</h2>
              <p className="leading-7 text-[#9AA6BF]">
                The payment processing fee is one of three baseline fees on every Etsy order. Combined, they form the floor cost for every sale:
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Listing fee:</strong> $0.20 fixed per transaction.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Transaction fee:</strong> 6.5% of total order value including shipping.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Payment processing fee:</strong> ~3% + $0.25 for US sellers, on the full order value.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                On a $25 US sale with no shipping, those three fees alone total around $2.83 — about 11.3% of revenue. Offsite Ads, where applicable, add further on top.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>
              <h3 className="text-lg font-semibold text-[#EAF0FF]">What is Etsy's payment processing fee?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                It's a per-order fee for processing payment through Etsy Payments, structured as a percentage of the order total plus a fixed amount. For US sellers, that's 3% + $0.25. It applies on every transaction and is separate from the 6.5% transaction fee.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Is the processing fee the same in all countries?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                No. Rates vary by seller region. UK sellers pay 4% + £0.20, which is a higher percentage than the US rate. Etsy can update regional processing fees, so always verify the current rate for your country in your seller account settings.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Can I avoid the Etsy payment processing fee?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                In most countries where Etsy Payments is available, it's required for accepting payments. Since the processing fee is part of Etsy Payments, sellers in those regions cannot opt out. Check your country's Etsy Payments eligibility if you're unsure whether it applies to you.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">See all fees together in one calculation</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Use these free calculators to see the processing fee alongside transaction fees, listing fees, and your actual costs.
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
