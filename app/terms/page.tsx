import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | TrueMargin",
  description:
    "Terms of Use for TrueMargin (gettruemargin.com), including acceptable use and limitation of liability."
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of Use</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: March 1, 2026</p>

      <section className="mt-8 space-y-4">
        <p>
          By accessing or using TrueMargin (gettruemargin.com), you agree to these Terms of Use. If you do not agree,
          do not use the site.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Use of the service</h2>
        <p>
          TrueMargin provides calculators and informational content to help you estimate Etsy-related fees, profit, and break-even pricing.
          You are responsible for how you use the results.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Acceptable use</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Do not attempt to disrupt, scrape excessively, or reverse engineer the service.</li>
          <li>Do not use the service for unlawful activity.</li>
          <li>Do not bypass rate limits or security controls.</li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">Intellectual property</h2>
        <p>
          The site, calculators, and content are owned by TrueMargin or its licensors and are protected by applicable intellectual property laws.
          You may not copy or redistribute the calculators or content without permission.
        </p>

        <h2 className="mt-8 text-xl font-semibold">No warranties</h2>
        <p>
          The service is provided “as is” without warranties of any kind. We do not guarantee accuracy, availability, or fitness for a particular purpose.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, TrueMargin will not be liable for any indirect, incidental, special, consequential, or punitive damages,
          or any loss of profits or revenues, arising from your use of the service.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Changes</h2>
        <p>
          We may update these terms from time to time. The “Last updated” date will change when we do.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p>
          Questions about these terms: <a className="underline" href="mailto:support@gettruemargin.com">support@gettruemargin.com</a>
        </p>
      </section>
    </main>
  );
}
