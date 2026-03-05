import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-6">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm text-muted-foreground">
        <a
          href="mailto:hello@gettruemargin.com"
          className="hover:text-foreground hover:underline"
        >
          hello@gettruemargin.com
        </a>
        <Link href="/privacy-policy" className="hover:text-foreground hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-foreground hover:underline">
          Terms
        </Link>
        <Link href="/disclaimer" className="hover:text-foreground hover:underline">
          Disclaimer
        </Link>
      </div>
    </footer>
  );
}
