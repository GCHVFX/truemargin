"use client";

export type SeoContent = {
  heading: string;
  intro: string;
  includes: string[];
  howTo: string[];
  faqs: Array<{ q: string; a: string }>;
  supportBlock?: {
    heading: string;
    paragraphs: string[];
  };
};

export function CalculatorSeoSection({ seoContent }: { seoContent: SeoContent }) {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-8 pb-12">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-[#EAF0FF]">{seoContent.heading}</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#9AA6BF] leading-relaxed">{seoContent.intro}</p>
        </div>

        {seoContent.supportBlock && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-medium text-[#EAF0FF]">{seoContent.supportBlock.heading}</h3>
            <div className="mt-3 space-y-2 text-sm text-[#9AA6BF] leading-relaxed">
              {seoContent.supportBlock.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-medium text-[#EAF0FF]">What this calculator includes</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-[#9AA6BF] leading-relaxed">
              {seoContent.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-medium text-[#EAF0FF]">How to use it</h3>
            <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-sm text-[#9AA6BF] leading-relaxed">
              {seoContent.howTo.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-[#EAF0FF]">FAQ</h3>
          <div className="mt-3 space-y-2">
            {seoContent.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-white/10 bg-white/5"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-sm font-medium text-[#EAF0FF] list-none">
                  {f.q}
                  <span className="shrink-0 text-[#9AA6BF] transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm text-[#9AA6BF] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
