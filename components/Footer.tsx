import Link from "next/link";

const FOOTER_LINK_CLASS = "hover:text-[#EAF0FF] hover:underline";
const FOOTER_SEPARATOR_CLASS = "text-white/20";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#070b14] py-5">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-sm text-[#9AA6BF]">
        <Link href="/privacy-policy" className={FOOTER_LINK_CLASS}>
          Privacy Policy
        </Link>
        <span aria-hidden="true" className={FOOTER_SEPARATOR_CLASS}>
          |
        </span>
        <Link href="/terms" className={FOOTER_LINK_CLASS}>
          Terms
        </Link>
        <span aria-hidden="true" className={FOOTER_SEPARATOR_CLASS}>
          |
        </span>
        <Link href="/disclaimer" className={FOOTER_LINK_CLASS}>
          Disclaimer
        </Link>
      </div>
    </footer>
  );
}
