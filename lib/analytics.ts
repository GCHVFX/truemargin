export type AnalyticsEvent =
  | { name: 'toggle_advanced'; props: { open: boolean } }
  | { name: 'toggle_breakdown'; props: { open: boolean } }
  | { name: 'change_currency'; props: { currency: 'USD' | 'CAD' } }
  | { name: 'toggle_offsite_ads'; props: { on: boolean } }
  | { name: 'change_offsite_tier'; props: { tier: '12' | '15' } }
  | { name: 'change_regulatory_mode'; props: { mode: 'off' | 'preset' | 'custom' } }
  | { name: 'upgrade_modal'; props: { open: boolean; source: 'promoted' | 'regulatory_custom' | 'header' } }

// If you ever need to silence logs, set this to false.
const DEV_LOG = true

export function track(event: AnalyticsEvent) {
  // MVP: dev-only console logging.
  // Use console.log so it shows up under Default levels.
  if (DEV_LOG && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[analytics]', event.name, event.props)
  }

  // Later: wire to PostHog / Plausible / GA / Segment, etc.
}
