'use client'

import * as React from 'react'
import Link from 'next/link'
import { Check, Zap, ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import WaitlistForm from '@/components/WaitlistForm'

const FREE_FEATURES = [
  'Etsy profit calculator (unlimited)',
  'Full fee breakdown per order',
  'Offsite Ads toggle',
  'Break-even calculator',
  'Pricing calculator',
  'Currency support (USD + CAD)',
  'Screenshot export',
]

const PRO_FEATURES = [
  {
    label: 'Scenario comparison',
    desc: 'Run 3 pricing scenarios side by side to find the best margin',
  },
  {
    label: 'SKU saving',
    desc: 'Save products you calculate regularly — no re-entering every time',
  },
  {
    label: 'Price increase simulator',
    desc: 'See the exact margin impact of raising your price by any amount',
  },
  {
    label: 'Shipping cost optimizer',
    desc: 'Compare charging shipping separately vs rolling it into item price',
  },
  {
    label: 'CSV import',
    desc: 'Bulk calculate your entire catalogue at once',
  },
  {
    label: 'Offsite Ads threshold tracker',
    desc: 'Get alerted before you hit $10K mandatory Offsite Ads enrollment',
  },
  {
    label: 'Break-even quantity',
    desc: 'How many units at this price before you cover fixed costs',
  },
  {
    label: 'Export to PDF',
    desc: 'Clean one-page profit report for your records or accountant',
  },
  {
    label: 'Tax mode',
    desc: 'Factor in income tax to see true after-tax profit per order',
  },
]

const COMING_SOON = [
  'Etsy vs Amazon vs eBay profit comparison',
  'Amazon FBA fee calculator',
  'eBay final value fee calculator',
  'Profit history and margin trends',
]

const FOUNDER_SPOTS_REMAINING = 50

export default function PricingPage() {

  return (
    <main className="calculator-page-bg min-h-screen text-[#EAF0FF]">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">

        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#9AA6BF] hover:text-[#EAF0FF] transition-colors">
            <Logo className="h-[22px] w-[22px]" />
            <span className="font-medium text-sm">TrueMargin</span>
          </Link>
          <Link
            href="/etsy-profit-calculator"
            className="flex items-center gap-1.5 text-sm text-[#9AA6BF] hover:text-[#EAF0FF] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to calculator
          </Link>
        </div>

        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#6EE7B7]/30 bg-[#6EE7B7]/10 px-4 py-1.5 text-xs font-medium text-[#6EE7B7]">
            <Zap className="h-3 w-3" />
            Founder Pricing — {FOUNDER_SPOTS_REMAINING} spots remaining
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple, honest pricing
          </h1>
          <p className="mt-3 text-base text-[#9AA6BF] max-w-xl mx-auto">
            The calculator is free forever. Pro is for sellers who want to go deeper on pricing decisions.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 mb-10">

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
            <div className="mb-1 text-sm font-medium text-[#9AA6BF] uppercase tracking-wide">Free</div>
            <div className="flex items-baseline gap-1 mt-2 mb-1">
              <span className="text-4xl font-semibold">$0</span>
            </div>
            <p className="text-sm text-[#9AA6BF] mb-6">Forever. No credit card.</p>
            <ul className="space-y-3 mb-6">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#D6DEEE]">
                  <Check className="h-4 w-4 text-[#9AA6BF] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant="ghost"
              className="w-full border border-white/10 text-[#9AA6BF] hover:text-[#EAF0FF] hover:bg-white/5"
              asChild
            >
              <Link href="/etsy-profit-calculator">Use for free</Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-[#6EE7B7]/30 bg-[#6EE7B7]/[0.06] p-6 sm:p-7 relative">
            <div className="absolute -top-3 left-6">
              <span className="rounded-full bg-[#6EE7B7] px-3 py-1 text-[11px] font-semibold text-[#070B14] uppercase tracking-wide">
                Founder Pricing
              </span>
            </div>

            <div className="mb-1 text-sm font-medium text-[#6EE7B7] uppercase tracking-wide">Pro</div>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="text-4xl font-semibold">$9</span>
              <span className="text-[#9AA6BF] text-sm">/month</span>
              <span className="ml-2 text-xs text-[#9AA6BF] line-through">$15</span>
            </div>
            <p className="text-xs text-[#6EE7B7]/80 mt-1 mb-6">
              Locked in forever for early supporters. Price increases when spots fill.
            </p>

            <ul className="space-y-3 mb-6">
              {PRO_FEATURES.map((f) => (
                <li key={f.label} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-[#6EE7B7] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-[#EAF0FF]">{f.label}</span>
                    <span className="text-xs text-[#9AA6BF] ml-1.5">{f.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mb-2">
              <p className="text-sm font-medium text-[#EAF0FF] mb-1">
                Lock in $9/month founder pricing
              </p>
              <p className="text-xs text-[#9AA6BF] mb-3">
                Join the waitlist. We'll email you the moment Pro launches — your rate is locked in from today.
              </p>
              <WaitlistForm variant="pricing" inputId="pricing-waitlist-email" />
            </div>
            <p className="mt-2.5 text-center text-xs text-[#9AA6BF]">
              No spam. Unsubscribe any time.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-[#6EE7B7]" />
            <span className="text-sm font-medium text-[#EAF0FF]">Coming to Pro</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-[#9AA6BF] uppercase tracking-wide">
              Roadmap
            </span>
          </div>
          <p className="text-sm text-[#9AA6BF] mb-4">
            Pro pricing locks in access to everything on the roadmap, including cross-platform tools as they launch.
          </p>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {COMING_SOON.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[#D6DEEE]">
                <div className="h-1.5 w-1.5 rounded-full bg-[#6EE7B7]/60 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 space-y-3">
          {[
            {
              q: 'Is the free calculator really free forever?',
              a: 'Yes. The calculator has always been free and always will be. No trial period, no feature limits on the core tool.',
            },
            {
              q: 'What happens to my price when Founder spots run out?',
              a: 'Your $9/month rate is locked in permanently. New users after the Founder period will pay the standard $15/month rate.',
            },
            {
              q: 'When will the Pro features be available?',
              a: 'Scenario comparison and SKU saving are in active development. Founder members get early access as features ship.',
            },
            {
              q: 'Do I get the cross-platform calculators when they launch?',
              a: 'Yes. Pro covers everything on the roadmap including Amazon, eBay, and cross-platform comparison tools.',
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-white/10 bg-white/[0.03]"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-[#EAF0FF] hover:bg-white/5 transition rounded-xl">
                {item.q}
                <span className="ml-4 text-[#9AA6BF] text-lg leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-[#9AA6BF] leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>

      </div>
    </main>
  )
}
