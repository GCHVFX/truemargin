import Link from 'next/link'
import { Check } from 'lucide-react'
import { Logo } from '@/components/Logo'

export default function PricingSuccessPage() {
  return (
    <main className="calculator-page-bg min-h-screen text-[#EAF0FF] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        <Link href="/" className="inline-flex items-center gap-2 text-[#9AA6BF] hover:text-[#EAF0FF] transition-colors mb-10">
          <Logo className="h-[22px] w-[22px]" />
          <span className="font-medium text-sm">TrueMargin</span>
        </Link>

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#6EE7B7]/30 bg-[#6EE7B7]/10">
          <Check className="h-8 w-8 text-[#6EE7B7]" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight mb-3">
          You're in. Welcome to Pro.
        </h1>
        <p className="text-[#9AA6BF] text-sm leading-relaxed mb-2">
          Your Founder Pricing is locked in at $9/month forever.
        </p>
        <p className="text-[#9AA6BF] text-sm leading-relaxed mb-8">
          Pro features are in active development. You'll get early access as they ship — we'll email you when each one is ready.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 mb-8 text-left space-y-2.5">
          <p className="text-xs font-medium text-[#9AA6BF] uppercase tracking-wide mb-3">What's coming your way</p>
          {[
            'Scenario comparison — 3 pricing scenarios side by side',
            'SKU saving — save products you calculate regularly',
            'Price increase simulator',
            'CSV import for bulk calculations',
            'Etsy vs Amazon vs eBay profit comparison',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-sm text-[#D6DEEE]">
              <div className="h-1.5 w-1.5 rounded-full bg-[#6EE7B7]/60 shrink-0 mt-1.5" />
              {item}
            </div>
          ))}
        </div>

        <Link
          href="/etsy-profit-calculator"
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#EAF0FF] text-[#070B14] text-sm font-semibold hover:bg-white transition-colors"
        >
          Back to the calculator
        </Link>
        <p className="mt-3 text-xs text-[#9AA6BF]">
          Questions? <a href="mailto:support@gettruemargin.com" className="underline hover:text-[#EAF0FF]">support@gettruemargin.com</a>
        </p>

      </div>
    </main>
  )
}
