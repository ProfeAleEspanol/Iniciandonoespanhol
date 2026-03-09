import { SiteShell } from "@/components/site-shell";

const pillars = [
  {
    title: "Pequenas descobertas",
    description: "Cada encontro apresenta palavras novas com apoio visual, voz e situacoes simples do cotidiano.",
  },
  {
    title: "Pratica com movimento",
    description: "A crianca aprende repetindo, apontando, falando e interagindo com materiais leves.",
  },
  {
    title: "Conquista visivel",
    description: "O progresso aparece no mapa de aulas para criar motivacao e senso de avancar.",
  },
];

export default function MethodologyPage() {
  return (
    <SiteShell ctaLabel="Ir para o mapa" ctaHref="/dashboard">
      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="rounded-[2.5rem] bg-[linear-gradient(135deg,#fff2a7,#dff4ff_50%,#caf5df)] p-8 shadow-[0_28px_70px_rgba(87,111,164,0.16)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Metodologia Profe Ale
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none text-[var(--color-ink)]">
            Aprender espanhol com leveza, curiosidade e rotina possivel.
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-[var(--color-ink)]/75">
            A proposta junta video curto, material visual e uma missao simples para que estudar
            pareca algo acolhedor, e nao cansativo.
          </p>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-12 md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <article
            key={pillar.title}
            className={`rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(87,111,164,0.12)] ${
              index === 0 ? "bg-white" : index === 1 ? "bg-[var(--color-sky-soft)]" : "bg-[var(--color-lilac)]"
            }`}
          >
            <h2 className="font-display text-3xl text-[var(--color-ink)]">{pillar.title}</h2>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{pillar.description}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
