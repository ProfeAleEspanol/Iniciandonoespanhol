import { FunButton } from "@/components/fun-button";
import { HeroSection } from "@/components/hero-section";
import { SiteShell } from "@/components/site-shell";

const learningMoments = [
  {
    title: "Descobrir com curiosidade",
    description: "Cada aula mistura voz, imagem e brincadeiras para o espanhol fazer sentido logo no comeco.",
  },
  {
    title: "Praticar com leveza",
    description: "Os desafios sao curtos, visuais e acolhedores para manter a vontade de continuar.",
  },
  {
    title: "Celebrar cada conquista",
    description: "O mapa de progresso mostra o caminho percorrido e deixa cada avanco visivel.",
  },
];

const benefits = [
  {
    title: "Aulas com cara de descoberta",
    description: "Nada de clima corporativo. Aqui a experiencia parece um caderno de aventuras.",
  },
  {
    title: "Materiais prontos para usar",
    description: "Video, PDF e missao da aula aparecem no mesmo lugar, sem confusao.",
  },
  {
    title: "Entrada simples com nome",
    description: "Sem senha, sem email e sem burocracia para a crianca comecar a estudar.",
  },
];

export default function Home() {
  return (
    <SiteShell ctaLabel="Comecar" ctaHref="/login">
      <HeroSection />
      <section className="mx-auto mt-12 grid w-full max-w-6xl gap-4 px-4 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <article
            key={benefit.title}
            className={`rounded-[2rem] p-6 shadow-[0_22px_50px_rgba(87,111,164,0.12)] ${
              index === 0 ? "bg-white" : index === 1 ? "bg-[var(--color-sky-soft)]" : "bg-[var(--color-mint)]/80"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Beneficio
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-ink)]">{benefit.title}</h2>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{benefit.description}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto mt-14 w-full max-w-6xl px-4">
        <div className="rounded-[2.5rem] bg-white/90 p-8 shadow-[0_28px_70px_rgba(87,111,164,0.12)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-brand)]">
                Como funciona
              </p>
              <h2 className="mt-3 font-display text-4xl text-[var(--color-ink)]">
                Uma experiencia simples, calorosa e cheia de pequenas conquistas.
              </h2>
            </div>
            <FunButton href="/login" variant="secondary">
              Escolher por onde comecar
            </FunButton>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {learningMoments.map((step, index) => (
              <article key={step.title} className="rounded-[1.8rem] bg-[var(--color-surface-highlight)] p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white font-display text-2xl text-[var(--color-brand)] shadow-[0_12px_24px_rgba(87,111,164,0.12)]">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-2xl font-black text-[var(--color-ink)]">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
