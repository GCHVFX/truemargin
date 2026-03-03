'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string>('')

  const startCheckout = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data?.url) {
        setError(data?.message || 'Stripe is not ready yet.')
        return
      }

      window.location.href = data.url
    } catch {
      setError('Stripe is not ready yet.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">TrueMargin Pro</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Stripe wiring is in progress. This page is ready for Checkout.
            </p>
          </div>
          <Button variant="secondary" onClick={() => router.push('/')}>
            Back
          </Button>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-foreground">
            {error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>Core Etsy fee calculation</li>
              <li>Shareable URLs</li>
              <li>Basic fee breakdown</li>
            </ul>
            <Button variant="secondary" className="w-full" disabled>
              Current plan
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>Promoted listings % included in profit</li>
              <li>Regulatory fee: custom mode</li>
              <li>Target profit reverse calculator</li>
            </ul>

            <div className="rounded-lg border p-3 text-sm text-muted-foreground">
              To enable Checkout: set env vars and install Stripe package.
            </div>

            <Button className="w-full" onClick={startCheckout} disabled={loading}>
              {loading ? 'Starting checkout…' : 'Upgrade with Stripe'}
            </Button>
          </CardContent>
        </Card>

        <div className="text-xs text-muted-foreground">
          Next: add entitlement unlock after successful checkout.
        </div>
      </div>
    </main>
  )
}
