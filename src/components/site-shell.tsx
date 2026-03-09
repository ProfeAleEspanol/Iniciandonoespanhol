import { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({
  children,
  ctaLabel = "Comecar",
  ctaHref = "/login",
}: {
  children: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader ctaLabel={ctaLabel} ctaHref={ctaHref} />
      <main className="pb-16">{children}</main>
      <footer className="px-4 pb-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-[2rem] border border-white/70 bg-white/80 px-6 py-6 text-sm text-[var(--color-muted)] shadow-[0_16px_40px_rgba(87,111,164,0.08)] md:flex-row md:items-center md:justify-between">
          <p>Plataforma alegre para aprender espanhol com autonomia, leveza e curiosidade.</p>
          <p className="font-bold text-[var(--color-ink)]">Profe Ale</p>
        </div>
      </footer>
    </div>
  );
}
