import Link from "next/link";
import type { CalculatorContentKey } from "@/lib/calculatorContent";
import { getSeoContent } from "@/lib/calculatorContent";
import { getEtsyCalculatorLogicContent } from "@/lib/etsyCalculatorLogicContent";

/** FAQ content matching the FAQPage JSON-LD in each calculator page.tsx */
const FAQ_JSONLD_MATCH: Record<CalculatorContentKey, Array<{ q: string; a: string }>> = {
  profit: [
    { q: "What does this Etsy profit calculator include?", a: "It estimates net profit and margin after common Etsy fees: listing, transaction, payment processing, optional offsite ads, and country-specific taxes where applicable." },
    { q: "Does it account for shipping and cost of goods?", a: "Yes. You can include shipping charged to the buyer and your cost of goods so the result reflects what you keep per order." },
    { q: "Can I see how much Etsy takes per sale?", a: "Yes. The calculator shows an itemized breakdown so you can see each fee and the total impact on profit." },
    { q: "Is the calculator free to use?", a: "Yes. You can run unlimited single calculations with full fee transparency." },
  ],
  fee: [
    { q: "What fees does this Etsy fee calculator include?", a: "It estimates listing, transaction, and payment processing fees, plus optional Offsite Ads when enabled. Presets vary by seller region." },
    { q: "Do Etsy fees apply to shipping?", a: "Often, yes. This calculator applies fees to the combined revenue (item subtotal plus shipping charged) where applicable." },
    { q: "Is this an exact match to my Etsy statement?", a: "No. It's an estimate for planning and pricing. Your final statement can differ based on taxes, shop settings, and promotions." },
  ],
  "break-even": [
    { q: "What is break-even price?", a: "It's the minimum price per unit required to make $0 profit after fees and costs, based on the inputs you provide." },
    { q: "Does break-even include shipping?", a: "Yes. The calculator considers shipping charged and your shipping cost, and models fees on the combined revenue where applicable." },
    { q: "Can I use this for multi-quantity orders?", a: "Yes. Set Quantity to match the order and enter cost of goods per unit. Results are per order, with break-even shown per unit." },
  ],
  pricing: [
    { q: "How is the recommended Etsy price calculated?", a: "The calculator solves for the sale price needed to hit your target margin after Etsy fees, cost of goods, and shipping cost." },
    { q: "Does this include Etsy payment processing and listing fees?", a: "Yes. It includes listing, transaction, payment processing, and optional Offsite Ads based on your selected seller region preset." },
    { q: "What if I turn on Offsite Ads?", a: "When Offsite Ads is enabled, the fee is included in the pricing math, which usually raises the recommended Etsy price required for your margin target." },
  ],
};

/**
 * Server-rendered SEO and supporting copy for Etsy calculator routes.
 * Keeps FAQs and long-form text in the HTML document without client hydration.
 */
export function EtsyCalculatorStaticContent({ contentKey }: { contentKey: CalculatorContentKey }) {
  const seo = getSeoContent(contentKey);
  const logic = getEtsyCalculatorLogicContent(contentKey);

  return (
    <div className="calculator-page-bg">
      <section className="mx-auto max-w-5xl px-4 pt-8 pb-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">{seo.heading}</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#D6DEEE]">{seo.intro}</p>
          </div>

          {seo.supportBlock && (
            <div className="rounded-xl border border-white/15 bg-white/[0.07] p-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">{seo.supportBlock.heading}</h3>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-[#D6DEEE]">
                {seo.supportBlock.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/15 bg-white/[0.07] p-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">What this calculator includes</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#D6DEEE]">
                {seo.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/[0.07] p-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">How to use it</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-[#D6DEEE]">
                {seo.howTo.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14">
        <div className="space-y-6">
          <div className="rounded-xl border border-white/15 bg-white/[0.07] p-6 sm:p-7">
            <h2 className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">{logic.heading}</h2>
            <p className="mt-4 text-base leading-8 text-[#D6DEEE]">{logic.intro}</p>

            <div className="mt-5 rounded-lg border border-white/15 bg-[#0F172A]/80 px-5 py-4">
              {logic.formulaLines.map((line) => (
                <p key={line} className="text-base md:text-lg font-medium leading-relaxed text-[#EAF0FF]">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/[0.07] p-6 sm:p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#10182A]/60 p-5">
                <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">What this calculator uses</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#D6DEEE]">
                  {logic.uses.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#10182A]/60 p-5">
                <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">{logic.exampleTitle}</h3>
                {logic.exampleBlocks.map((block, i) => (
                  <p key={i} className="mt-3 text-base leading-relaxed text-[#D6DEEE]">
                    {block.map((line, lineIdx) => (
                      <span key={`${i}-${lineIdx}`}>
                        {line}
                        {lineIdx < block.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/[0.07] p-6 sm:p-7">
            <h3 className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">Related Etsy Calculators</h3>
            <p className="mt-4 text-base leading-relaxed text-[#D6DEEE]">{logic.relatedIntro}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {logic.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg md:text-xl font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
                >
                  {item.title}
                  <span className="mt-1 block text-base leading-relaxed font-normal text-[#D6DEEE]">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/[0.07] p-6 sm:p-7">
            <h3 className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">Related Etsy Guides</h3>
            <p className="mt-4 text-base leading-relaxed text-[#D6DEEE]">
              Prefer a quick explanation before you run numbers? These guides break down how Etsy fees work and what
              sellers usually miss.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/how-much-does-etsy-take"
                className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg md:text-xl font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
              >
                How Much Does Etsy Take Per Sale?
                <span className="mt-1 block text-base leading-relaxed font-normal text-[#D6DEEE]">
                  Get a direct answer with practical fee ranges and examples.
                </span>
              </Link>
              <Link
                href="/etsy-fees-explained"
                className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg md:text-xl font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
              >
                Etsy Fees Explained (Full 2026 Breakdown)
                <span className="mt-1 block text-base leading-relaxed font-normal text-[#D6DEEE]">
                  Understand each Etsy fee type and how it affects take-home profit.
                </span>
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/[0.07] p-6 sm:p-7" aria-labelledby="etsy-calculator-faq-heading">
            <h2 id="etsy-calculator-faq-heading" className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">
              Frequently asked questions
            </h2>
            <div className="mt-4 space-y-3">
              {FAQ_JSONLD_MATCH[contentKey].map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-white/10 bg-[#10182A]/60 overflow-hidden"
                >
                  <summary className="cursor-pointer px-5 py-4 text-lg md:text-xl font-semibold text-[#EAF0FF] transition hover:bg-white/5">
                    {f.q}
                  </summary>
                  <div className="border-t border-white/10 px-5 py-4">
                    <p className="text-base leading-relaxed text-[#D6DEEE]">{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
