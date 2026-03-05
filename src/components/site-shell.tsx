import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/metodologia", label: "Metodologia" },
  { href: "/planos", label: "Planos" },
  { href: "/dashboard", label: "Plataforma" },
];

export function SiteShell({
  children,
  ctaLabel = "Entrar",
  ctaHref = "/login",
}: {
  children: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-lg font-black tracking-tight">
            Profe Ale
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[var(--color-brand)]">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={ctaHref}
            className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-bold text-white transition hover:brightness-110"
          >
            {ctaLabel}
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-[var(--color-muted)]">
          Plataforma infantil de espanhol. Marca Profe Ale.
        </div>
      </footer>
    </div>
  );
}
