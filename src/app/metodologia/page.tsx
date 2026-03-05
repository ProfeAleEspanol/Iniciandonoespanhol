import { SiteShell } from "@/components/site-shell";

const pillars = [
  {
    title: "Repeticao inteligente",
    description: "A crianca revisa vocabulario em ciclos curtos para consolidar memoria.",
  },
  {
    title: "Aprendizagem ativa",
    description: "Cada aula termina com uma atividade pratica e um desafio semanal.",
  },
  {
    title: "Participacao da familia",
    description: "Pais acompanham progresso com sugestoes simples de rotina em casa.",
  },
];

export default function MethodologyPage() {
  return (
    <SiteShell ctaLabel="Ver planos" ctaHref="/planos">
      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-brand)]">
          Metodologia Profe Ale
        </p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">
          Ensino online infantil com estrutura clara e ludica
        </h1>
        <p className="mt-4 max-w-3xl text-[var(--color-muted)]">
          O curso combina video, atividade e reforco em ciclos semanais para criar
          consistencia sem cansar a crianca.
        </p>
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-14 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <h2 className="text-xl font-black">{pillar.title}</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{pillar.description}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
