// Google Analytics helpers

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Track spreadsheet purchase click
export const trackSpreadsheetClick = () => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "spreadsheet_click", {
      event_category: "conversion",
      event_label: "spreadsheet_purchase",
      value: 1,
    });
  }
};

// Track generic event helper (optional for future use)
export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};
