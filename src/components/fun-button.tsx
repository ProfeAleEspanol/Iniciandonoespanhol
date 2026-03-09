import Link from "next/link";
import { ReactNode } from "react";

type FunButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

function getButtonClasses(variant: NonNullable<FunButtonProps["variant"]>) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold transition duration-200 hover:-translate-y-0.5";

  if (variant === "secondary") {
    return `${baseClasses} border border-[var(--color-border-strong)] bg-white text-[var(--color-ink)] shadow-[0_12px_30px_rgba(58,91,140,0.12)]`;
  }

  if (variant === "ghost") {
    return `${baseClasses} bg-[var(--color-sky-soft)] text-[var(--color-ink)]`;
  }

  return `${baseClasses} bg-[var(--color-brand)] text-white shadow-[0_14px_30px_rgba(255,126,103,0.28)]`;
}

export function FunButton({
  children,
  href,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
}: FunButtonProps) {
  const classes = `${getButtonClasses(variant)} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
