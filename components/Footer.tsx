import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#070b14] py-5">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-sm text-[#9AA6BF]">
        <Link href="/privacy-policy" className="hover:text-[#EAF0FF] hover:underline">
          Privacy Policy
        </Link>
        <span aria-hidden className="text-white/20">|</span>
        <Link href="/terms" className="hover:text-[#EAF0FF] hover:underline">
          Terms
        </Link>
        <span aria-hidden className="text-white/20">|</span>
        <Link href="/disclaimer" className="hover:text-[#EAF0FF] hover:underline">
          Disclaimer
        </Link>
      </div>
    </footer>
  );
}
