import Link from "next/link";
import type { CalculatorContentKey } from "@/lib/calculatorContent";
import { getSeoContent } from "@/lib/calculatorContent";
import { getEtsyCalculatorLogicContent } from "@/lib/etsyCalculatorLogicContent";

/**
 * Server-rendered SEO and supporting copy for Etsy calculator routes.
 * Keeps FAQs and long-form text in the HTML document without client hydration.
 */
export function EtsyCalculatorStaticContent({ contentKey }: { contentKey: CalculatorContentKey }) {
  const seo = getSeoContent(contentKey);
  const logic = getEtsyCalculatorLogicContent(contentKey);

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-8 pb-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">{seo.heading}</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#D6DEEE]">{seo.intro}</p>
          </div>

          {seo.supportBlock && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">{seo.supportBlock.heading}</h3>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-[#D6DEEE]">
                {seo.supportBlock.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">What this calculator includes</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#D6DEEE]">
                {seo.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
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

      <section className="mx-auto max-w-5xl px-4 pb-12" aria-labelledby="etsy-calculator-faq-heading">
        <h2 id="etsy-calculator-faq-heading" className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">
          FAQ
        </h2>
        <div className="mt-3 space-y-3">
          {seo.faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-lg md:text-xl font-semibold text-[#EAF0FF]">{f.q}</p>
              <p className="mt-2 text-base leading-relaxed text-[#D6DEEE]">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14">
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
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

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
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

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
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

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
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
        </div>
      </section>
    </>
  );
}
