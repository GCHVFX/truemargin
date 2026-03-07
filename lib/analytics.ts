/**
 * Shared analytics tracking helper.
 * Use setAnalyticsHandler() to connect to GA4 or another provider.
 * Safe to call before handler is set; never throws.
 */

export type AnalyticsHandler = (
  event: string,
  properties?: Record<string, unknown>
) => void;

let handler: AnalyticsHandler | null = null;

/** Connect analytics. Call from app init (e.g. _app or layout) when ready. */
export function setAnalyticsHandler(fn: AnalyticsHandler): void {
  handler = fn;
}

/** Track an event. No-op if handler not set; swallows errors. */
export function track(
  event: string,
  properties?: Record<string, unknown>
): void {
  try {
    if (handler) {
      handler(event, properties);
    }
  } catch {
    // Never break UI
  }
}
