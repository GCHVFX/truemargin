'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { REGION_PRESETS } from '@/lib/fees'
import { calculateOrder, calculateTargetMarginItemPrice } from '@/lib/feeEngine'

const fmt$ = (n: number) => `$${n.toFixed(2)}`
const fmtPct = (n: number) => `${(n * 100).toFixed(1)}%`

function safeFloat(s: string): number {
  const v = parseFloat(s)
  return Number.isFinite(v) && v >= 0 ? v : 0
}

export function OffsiteAdsCalculator() {
  const [annualRevenue, setAnnualRevenue] = React.useState('')
  const [avgSalePrice, setAvgSalePrice] = React.useState('')
  const [avgShippingCharged, setAvgShippingCharged] = React.useState('')
  const [avgCogs, setAvgCogs] = React.useState('')

  const revenue = safeFloat(annualRevenue)
  const salePrice = safeFloat(avgSalePrice)
  const shipping = safeFloat(avgShippingCharged)
  const cogs = safeFloat(avgCogs)

  const THRESHOLD = 10000
  const dollarsToThreshold = Math.max(0, THRESHOLD - revenue)
  const pctToThreshold = Math.min(100, (revenue / THRESHOLD) * 100)
  const isEnrolled = revenue >= THRESHOLD
  const applicableRate = isEnrolled ? 0.12 : 0.15

  const preset = REGION_PRESETS.US

  const baseInputs = {
    ...preset,
    currency: 'USD' as const,
    itemPrice: salePrice,
    shippingCharged: shipping,
    cogsPerUnit: cogs,
    quantity: 1,
    yourShippingCost: 0,
    highVolumeOffsiteAds: false,
  }

  const withoutAdsInputs = { ...baseInputs, includeOffsiteAds: false }
  const withAdsInputs = {
    ...baseInputs,
    includeOffsiteAds: true,
    offsiteAdsPct: applicableRate,
  }

  const resultWithout = salePrice > 0 ? calculateOrder(withoutAdsInputs) : null
  const resultWith = salePrice > 0 ? calculateOrder(withAdsInputs) : null

  const profitWithout = resultWithout?.netProfit ?? null
  const profitWith = resultWith?.netProfit ?? null
  const marginWithout = resultWithout?.marginPct ?? null
  const marginWith = resultWith?.marginPct ?? null

  const profitImpact =
    profitWithout !== null && profitWith !== null ? profitWithout - profitWith : null

  const adsFeePerOrder = salePrice > 0 ? (salePrice + shipping) * applicableRate : null

  const recoveryPrice =
    salePrice > 0 && marginWithout !== null
      ? calculateTargetMarginItemPrice(withAdsInputs, marginWithout)
      : null
  const priceIncreaseNeeded =
    recoveryPrice !== null ? recoveryPrice - salePrice : null

  // Badge colour
  const badgeClass =
    revenue <= 0
      ? ''
      : revenue < 8000
      ? 'bg-emerald-500/15 text-[#6EE7B7] border border-emerald-500/30'
      : revenue < THRESHOLD
      ? 'bg-amber-500/15 text-[#F4A261] border border-amber-500/30'
      : 'bg-red-500/15 text-[#EF4444] border border-red-500/30'

  const badgeLabel =
    revenue <= 0
      ? ''
      : revenue < 8000
      ? 'Safe: Optional'
      : revenue < THRESHOLD
      ? 'Getting Close'
      : 'Enrolled: Mandatory'

  const barColor =
    revenue < 8000
      ? 'bg-emerald-500'
      : revenue < THRESHOLD
      ? 'bg-amber-500'
      : 'bg-red-500'

  const profitColor = (p: number | null) => {
    if (p === null) return 'text-[#EAF0FF]'
    if (p > 0) return 'text-[#6EE7B7]'
    if (p < 0) return 'text-[#EF4444]'
    return 'text-[#9AA6BF]'
  }

  return (
    <div className="space-y-5">
      {/* SECTION 1 — Inputs */}
      <Card className="border border-white/10 bg-white/5 text-[#EAF0FF]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-[#EAF0FF]">Your Etsy Sales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="annual-revenue" className="text-sm text-[#D6DEEE]">
                Estimated Etsy revenue this year so far ($)
              </Label>
              <Input
                id="annual-revenue"
                type="number"
                min="0"
                placeholder="e.g. 7500"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(e.target.value)}
                className="border-white/15 bg-white/5 text-[#EAF0FF] placeholder:text-[#9AA6BF] focus-visible:ring-[#6EE7B7]/40"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="avg-sale-price" className="text-sm text-[#D6DEEE]">
                Average item sale price ($)
              </Label>
              <Input
                id="avg-sale-price"
                type="number"
                min="0"
                placeholder="e.g. 35"
                value={avgSalePrice}
                onChange={(e) => setAvgSalePrice(e.target.value)}
                className="border-white/15 bg-white/5 text-[#EAF0FF] placeholder:text-[#9AA6BF] focus-visible:ring-[#6EE7B7]/40"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="avg-shipping" className="text-sm text-[#D6DEEE]">
                Average shipping you charge buyer ($)
              </Label>
              <Input
                id="avg-shipping"
                type="number"
                min="0"
                placeholder="0"
                value={avgShippingCharged}
                onChange={(e) => setAvgShippingCharged(e.target.value)}
                className="border-white/15 bg-white/5 text-[#EAF0FF] placeholder:text-[#9AA6BF] focus-visible:ring-[#6EE7B7]/40"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="avg-cogs" className="text-sm text-[#D6DEEE]">
                Average cost of goods per order ($)
              </Label>
              <Input
                id="avg-cogs"
                type="number"
                min="0"
                placeholder="0"
                value={avgCogs}
                onChange={(e) => setAvgCogs(e.target.value)}
                className="border-white/15 bg-white/5 text-[#EAF0FF] placeholder:text-[#9AA6BF] focus-visible:ring-[#6EE7B7]/40"
              />
            </div>
          </div>
          <p className="text-xs text-[#9AA6BF]">
            Using US seller fee rates. Offsite Ads rate: 15% under $10K/year, 12% over $10K (mandatory).
          </p>
        </CardContent>
      </Card>

      {/* SECTION 2 — Threshold Status */}
      {revenue > 0 && (
        <Card className="border border-white/10 bg-white/5 text-[#EAF0FF]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <CardTitle className="text-lg font-semibold text-[#EAF0FF]">Offsite Ads Threshold</CardTitle>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
                {badgeLabel}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${barColor}`}
                style={{ width: `${pctToThreshold}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#9AA6BF]">$0</span>
              <span className="font-medium text-[#EAF0FF]">{fmt$(revenue)} of $10,000</span>
              <span className="text-[#9AA6BF]">$10,000</span>
            </div>
            {!isEnrolled ? (
              <p className="text-sm text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">{fmt$(dollarsToThreshold)}</span> to mandatory enrollment.
                Currently paying{' '}
                <span className="font-semibold text-[#F4A261]">15%</span> on attributed Offsite Ads sales (optional).
              </p>
            ) : (
              <p className="text-sm text-[#EF4444]">
                You are enrolled. The <span className="font-semibold">12%</span> Offsite Ads fee is mandatory and cannot be turned off.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* SECTION 3 — Per Order Impact */}
      {salePrice > 0 && (
        <Card className="border border-white/10 bg-white/5 text-[#EAF0FF]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-[#EAF0FF]">Per Order Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#10182A]/60 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#9AA6BF]">Without Offsite Ads</p>
                <p className={`mt-2 text-3xl font-semibold ${profitColor(profitWithout)}`}>
                  {profitWithout !== null ? fmt$(profitWithout) : '—'}
                </p>
                <p className="mt-1 text-sm text-[#9AA6BF]">
                  Net profit · Margin{' '}
                  <span className="font-medium text-[#EAF0FF]">
                    {marginWithout !== null ? fmtPct(marginWithout) : '—'}
                  </span>
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#10182A]/60 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#9AA6BF]">
                  With Offsite Ads ({isEnrolled ? '12% mandatory' : '15% optional'})
                </p>
                <p className={`mt-2 text-3xl font-semibold ${profitColor(profitWith)}`}>
                  {profitWith !== null ? fmt$(profitWith) : '—'}
                </p>
                <p className="mt-1 text-sm text-[#9AA6BF]">
                  Net profit · Margin{' '}
                  <span className="font-medium text-[#EAF0FF]">
                    {marginWith !== null ? fmtPct(marginWith) : '—'}
                  </span>
                </p>
                <p className="mt-1 text-xs text-[#9AA6BF]">
                  Ads fee this order:{' '}
                  <span className="font-medium text-[#EAF0FF]">
                    {adsFeePerOrder !== null ? fmt$(adsFeePerOrder) : '—'}
                  </span>
                </p>
              </div>
            </div>

            {profitImpact !== null && (
              <div
                className={`rounded-lg border px-4 py-3 text-sm font-medium ${
                  profitImpact > 3
                    ? 'border-red-500/30 bg-red-500/10 text-[#EF4444]'
                    : profitImpact > 1
                    ? 'border-amber-500/30 bg-amber-500/10 text-[#F4A261]'
                    : 'border-white/10 bg-white/5 text-[#9AA6BF]'
                }`}
              >
                Offsite Ads costs you{' '}
                <span className="font-semibold">{fmt$(profitImpact)}</span> per order on average.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* SECTION 4 — Recovery Price */}
      {salePrice > 0 && (
        <Card className="border border-white/10 bg-white/5 text-[#EAF0FF]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-[#EAF0FF]">Price to Recover Margin</CardTitle>
          </CardHeader>
          <CardContent className="-mt-4">
            {profitImpact !== null && profitImpact < 0.5 ? (
              <p className="text-sm text-[#6EE7B7]">
                Low impact. Your margins can likely absorb Offsite Ads without a price change.
              </p>
            ) : recoveryPrice !== null && priceIncreaseNeeded !== null ? (
              <p className="text-sm leading-7 text-[#9AA6BF]">
                To maintain your current margin after Offsite Ads enrollment, you would need to raise your average price
                from{' '}
                <span className="font-semibold text-[#EAF0FF]">{fmt$(salePrice)}</span> to{' '}
                <span className="font-semibold text-[#EAF0FF]">{fmt$(recoveryPrice)}</span>,
                an increase of{' '}
                <span className="font-semibold text-[#F4A261]">{fmt$(priceIncreaseNeeded)}</span> per item.
              </p>
            ) : (
              <p className="text-sm text-[#9AA6BF]">
                Enter your average sale price above to see the price adjustment needed.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
