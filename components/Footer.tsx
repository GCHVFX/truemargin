import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-6">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-sm text-muted-foreground">
        <Link href="/privacy-policy" className="hover:text-foreground hover:underline">
          Privacy Policy
        </Link>
        <span aria-hidden>|</span>
        <Link href="/terms" className="hover:text-foreground hover:underline">
          Terms
        </Link>
        <span aria-hidden>|</span>
        <Link href="/disclaimer" className="hover:text-foreground hover:underline">
          Disclaimer
        </Link>
      </div>
    </footer>
  );
}
