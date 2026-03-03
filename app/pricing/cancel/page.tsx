import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PricingCancelPage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Checkout cancelled</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              No worries. You can upgrade any time.
            </p>
            <Button asChild variant="secondary">
              <Link href="/pricing">Back to pricing</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
