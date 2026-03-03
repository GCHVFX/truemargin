import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PricingSuccessPage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment complete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Stripe checkout returned successfully. Next step is to verify the session and unlock Pro.
            </p>
            <Button asChild>
              <Link href="/">Back to calculator</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
