import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { modules } from "@/lib/course-data";

export default function Home() {
  return (
    <SiteShell ctaLabel="Comecar teste" ctaHref="/planos">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#ffd8a8,_transparent_45%),radial-gradient(circle_at_bottom_right,_#a8ddff,_transparent_40%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--color-brand)]">
              Espanhol para criancas 4-10 anos
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Plataforma online da Profe Ale
            </h1>
            <p className="max-w-xl text-lg text-[var(--color-muted)]">
              Aulas curtas, rotina ludica e progresso visivel para familias.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/planos"
                className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold text-white"
              >
                Assinar
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-bold"
              >
                Ver plataforma
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-xl">
            <p className="text-sm font-bold text-[var(--color-brand)]">Trilha inicial</p>
            <h2 className="mt-2 text-2xl font-black">3 modulos prontos no MVP</h2>
            <ul className="mt-4 space-y-3">
              {modules.map((module) => (
                <li key={module.id} className="rounded-2xl bg-[var(--color-surface)] p-4">
                  <p className="font-bold">{module.title}</p>
                  <p className="text-sm text-[var(--color-muted)]">{module.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-black">Como funciona</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <h3 className="font-bold">1. Aula curta</h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Videos de 10-20 minutos para manter foco da crianca.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <h3 className="font-bold">2. Atividade pratica</h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Jogos, desafios e material imprimivel por modulo.
            </p>
          </article>
          <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <h3 className="font-bold">3. Painel da familia</h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Acompanhamento de progresso e rotina semanal.
            </p>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
