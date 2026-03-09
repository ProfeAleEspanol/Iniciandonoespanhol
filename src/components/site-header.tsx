"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FunButton } from "@/components/fun-button";
import { useStudentSession } from "@/components/student-session";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/metodologia", label: "Metodologia" },
  { href: "/planos", label: "Planos" },
  { href: "/dashboard", label: "Mapa de aulas" },
];

export function SiteHeader({ ctaLabel, ctaHref }: { ctaLabel: string; ctaHref: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { studentName, clearStudentSession } = useStudentSession();

  function handleChangeName() {
    clearStudentSession();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-[rgba(255,252,246,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-[1.4rem] bg-[var(--color-brand)] text-lg font-black text-white shadow-[0_14px_28px_rgba(255,126,103,0.28)]">
            PA
          </span>
          <div>
            <p className="font-display text-2xl leading-none text-[var(--color-ink)]">Profe Ale</p>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Espanhol com alegria
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-white text-[var(--color-ink)] shadow-[0_10px_20px_rgba(87,111,164,0.12)]"
                    : "text-[var(--color-muted)] hover:bg-white/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-wrap items-center justify-end gap-3">
          {studentName ? (
            <>
              <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[var(--color-ink)] shadow-[0_10px_20px_rgba(87,111,164,0.12)]">
                Ola, {studentName}
              </div>
              <button
                type="button"
                onClick={handleChangeName}
                className="rounded-full bg-[var(--color-lilac)] px-4 py-2 text-sm font-bold text-[var(--color-ink)]"
              >
                Trocar nome
              </button>
            </>
          ) : (
            <FunButton href={ctaHref}>{ctaLabel}</FunButton>
          )}
        </div>
      </div>
    </header>
  );
}
