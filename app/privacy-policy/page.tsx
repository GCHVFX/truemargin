import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TrueMargin",
  description:
    "Privacy Policy for TrueMargin (gettruemargin.com) explaining what data we collect and how it is used."
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: March 1, 2026</p>

      <section className="mt-8 space-y-4">
        <p>
          TrueMargin (“we”, “us”) operates gettruemargin.com. This Privacy Policy explains what information we
          collect, why we collect it, and your choices.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Information we collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Calculator inputs:</strong> The numbers you enter are processed in your browser to show results. We do not
            intentionally store your calculator inputs on our servers.
          </li>
          <li>
            <strong>Email (optional):</strong> If you join a waitlist or request updates, we collect your email address to contact you.
          </li>
          <li>
            <strong>Basic usage data (optional analytics):</strong> We may use privacy-friendly analytics to understand which pages are used.
            This may include device and approximate location data (city-level), but not your calculator inputs.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">How we use information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and improve the calculators and site performance.</li>
          <li>To send product updates if you opt in by providing your email.</li>
          <li>To prevent abuse and keep the service reliable.</li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">Cookies</h2>
        <p>
          We may use cookies for essential site functionality and, if enabled, analytics. You can control cookies through your browser settings.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Sharing</h2>
        <p>
          We do not sell your personal information. We may share information with service providers that help us run the site (for example,
          email delivery or analytics), only as needed to provide the service.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Data retention</h2>
        <p>
          If you provide an email, we keep it until you unsubscribe or request deletion. We do not retain calculator inputs as a matter of design.
        </p>

        <h2 className="mt-8 text-xl font-semibold">Your choices</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You can unsubscribe from emails at any time using the link in the email.</li>
          <li>You can request deletion of your email by contacting us.</li>
          <li>You can disable cookies in your browser.</li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold">Contact</h2>
        <p>
          For privacy requests, contact: <a className="underline" href="mailto:support@gettruemargin.com">support@gettruemargin.com</a>
        </p>
      </section>
    </main>
  );
}
