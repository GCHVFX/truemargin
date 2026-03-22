import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'

export default function PricingCancelPage() {
  return (
    <main className="calculator-page-bg min-h-screen text-[#EAF0FF] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        <Link href="/" className="inline-flex items-center gap-2 text-[#9AA6BF] hover:text-[#EAF0FF] transition-colors mb-10">
          <Logo className="h-[22px] w-[22px]" />
          <span className="font-medium text-sm">TrueMargin</span>
        </Link>

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <ArrowLeft className="h-7 w-7 text-[#9AA6BF]" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight mb-3">
          No worries
        </h1>
        <p className="text-[#9AA6BF] text-sm leading-relaxed mb-8">
          You haven't been charged. The free calculator is still yours to use whenever you need it.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/pricing"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#EAF0FF] text-[#070B14] text-sm font-semibold hover:bg-white transition-colors"
          >
            Back to pricing
          </Link>
          <Link
            href="/etsy-profit-calculator"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/10 text-[#9AA6BF] text-sm font-medium hover:text-[#EAF0FF] hover:bg-white/5 transition-colors"
          >
            Use the free calculator
          </Link>
        </div>

        <p className="mt-6 text-xs text-[#9AA6BF]">
          Founder Pricing ($9/month locked in forever) is only available while spots remain.
        </p>

      </div>
    </main>
  )
}
