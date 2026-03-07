import Image from "next/image";

type LogoVariant = "icon" | "full";

export function Logo({
  className = "logo",
  variant = "icon",
  priority = false,
}: {
  className?: string;
  variant?: LogoVariant;
  priority?: boolean;
}) {
  const isFull = variant === "full";

  return (
    <Image
      src={isFull ? "/logo.png" : "/logo-icon.png"}
      alt="True Margin logo"
      width={isFull ? 160 : 34}
      height={isFull ? 34 : 34}
      className={className}
      priority={priority}
    />
  );
}
