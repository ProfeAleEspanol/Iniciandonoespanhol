import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

const plans = [
  {
    name: "Trilha Essencial",
    price: "R$ 49/mes",
    accent: "bg-white",
    features: ["Aulas gravadas", "PDFs ludicos", "Mapa de progresso colorido"],
  },
  {
    name: "Trilha Plus",
    price: "R$ 99/mes",
    accent: "bg-[var(--color-sky-soft)]",
    features: ["Tudo do Essencial", "Encontros em grupo", "Desafios mensais divertidos"],
  },
  {
    name: "Familia em Aventura",
    price: "R$ 139/mes",
    accent: "bg-[var(--color-mint)]/80",
    features: ["Ate 3 perfis", "Relatorios simples", "Prioridade para duvidas"],
  },
];

export default function PlansPage() {
  return (
    <SiteShell ctaLabel="Entrar com nome" ctaHref="/login">
      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="rounded-[2.5rem] bg-white/90 p-8 shadow-[0_24px_60px_rgba(87,111,164,0.14)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Planos pensados para familias
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none text-[var(--color-ink)]">
            Escolha o ritmo ideal para continuar a jornada.
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-[var(--color-muted)]">
            A plataforma foi desenhada para crescer com a rotina da casa, sem perder o clima leve
            e divertido do aprendizado.
          </p>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-12 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`${plan.accent} rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(87,111,164,0.12)]`}
          >
            <h2 className="font-display text-3xl text-[var(--color-ink)]">{plan.name}</h2>
            <p className="mt-3 text-2xl font-black text-[var(--color-brand)]">{plan.price}</p>
            <ul className="mt-5 space-y-3 text-sm text-[var(--color-muted)]">
              {plan.features.map((feature) => (
                <li key={feature} className="rounded-[1.2rem] bg-white/80 px-4 py-3 font-semibold">
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              className="mt-6 inline-flex rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-black text-white"
            >
              Quero comecar
            </Link>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
