import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | TrueMargin",
  description:
    "Important disclaimer about calculator estimates and fee accuracy for TrueMargin (gettruemargin.com)."
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Disclaimer</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: March 1, 2026</p>

      <section className="mt-8 space-y-4">
        <p>
          TrueMargin provides calculators that generate estimates based on the inputs you provide and fee assumptions you select.
          These results are for informational purposes only.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Fees can change</h2>
        <p>
          Etsy fees, tax rules, payment processing rates, and offsite ad policies can change. Your actual fees may differ from the estimates.
          Always verify with your Etsy dashboard and current Etsy documentation.
        </p>

        <h2 className="mt-8 text-xl font-semibold">No financial, legal, or tax advice</h2>
        <p>
          TrueMargin is not a substitute for professional advice. For business, tax, or legal decisions, consult a qualified professional.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Limitation</h2>
        <p>
          You are responsible for your pricing decisions and outcomes. TrueMargin is not liable for losses, missed profits, or other damages
          resulting from reliance on calculator outputs.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p>
          Questions: <a className="underline" href="mailto:support@gettruemargin.com">support@gettruemargin.com</a>
        </p>
      </section>
    </main>
  );
}
