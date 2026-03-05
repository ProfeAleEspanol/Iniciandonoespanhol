import { SiteShell } from "@/components/site-shell";

const plans = [
  {
    name: "Kids Essencial",
    price: "R$ 49/mes",
    features: ["Trilha gravada", "Atividades PDF", "Painel de progresso"],
  },
  {
    name: "Kids Plus",
    price: "R$ 99/mes",
    features: ["Tudo do Essencial", "Aulas ao vivo em grupo", "Desafios mensais"],
  },
  {
    name: "Familia",
    price: "R$ 139/mes",
    features: ["Ate 3 criancas", "Relatorio por perfil", "Prioridade no suporte"],
  },
];

export default function PlansPage() {
  return (
    <SiteShell ctaLabel="Comecar agora" ctaHref="/dashboard">
      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-black md:text-5xl">Planos da plataforma</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          Modelo de assinatura para familias e crescimento por recorrencia.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
              <h2 className="text-2xl font-black">{plan.name}</h2>
              <p className="mt-2 text-lg font-bold text-[var(--color-brand)]">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
                {plan.features.map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-6 w-full rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-bold text-white"
              >
                Assinar
              </button>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
