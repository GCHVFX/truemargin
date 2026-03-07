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
          <div className="mt-3 space-y-3">
            {seoContent.faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-sm font-medium text-[#EAF0FF]">{f.q}</p>
                <p className="mt-1.5 text-sm text-[#9AA6BF] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
