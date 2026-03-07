import Image from "next/image";

export function Logo({ className = "logo" }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="True Margin logo"
      width={34}
      height={34}
      className={className}
      priority
    />
  );
}
