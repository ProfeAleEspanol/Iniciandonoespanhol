import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

const learningSteps = [
  {
    title: "Descobrir",
    description: "A crianca aprende palavras novas com historias, musicas e personagens.",
  },
  {
    title: "Brincar",
    description: "Cada aula vira jogo com desafios curtos para praticar sem cansar.",
  },
  {
    title: "Celebrar",
    description: "A familia acompanha as conquistas e comemora cada avanco.",
  },
];

const projectHighlights = [
  "Aulas curtas para manter atencao de criancas de 4 a 10 anos",
  "Metodologia afetiva com repeticao inteligente e rotina leve",
  "Atividades criativas para usar no celular, tablet ou computador",
  "Progresso visivel para responsaveis acompanharem juntos",
];

export default function Home() {
  return (
    <SiteShell ctaLabel="Ver atividades" ctaHref="/metodologia">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#ffe082,transparent_35%),radial-gradient(circle_at_80%_15%,#8de6ff,transparent_35%),radial-gradient(circle_at_70%_80%,#ffb48a,transparent_30%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[var(--color-brand)] shadow">
              Plataforma infantil de espanhol
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Um projeto divertido para aprender espanhol brincando
            </h1>
            <p className="max-w-xl text-lg text-[var(--color-muted)]">
              A Profe Ale e uma plataforma educativa feita para criancas, com aulas leves,
              atividades criativas e acompanhamento para toda a familia participar.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/metodologia"
                className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold text-white shadow transition hover:brightness-110"
              >
                Conhecer metodologia
              </Link>
              <Link
                href="/planos"
                className="rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-bold"
              >
                Ver planos
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-[var(--color-border)] bg-white/95 p-6 shadow-xl">
            <p className="text-sm font-black uppercase tracking-wide text-[var(--color-brand)]">
              O que este projeto oferece
            </p>
            <ul className="mt-4 space-y-3">
              {projectHighlights.map((highlight) => (
                <li key={highlight} className="rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm font-semibold">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-black md:text-4xl">Como funciona a jornada</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {learningSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border-2 border-[var(--color-border)] bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-wide text-[var(--color-brand)]">
                Etapa {index + 1}
              </p>
              <h3 className="mt-2 text-2xl font-black">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="rounded-[2rem] border-2 border-[var(--color-border)] bg-white p-8 text-center shadow-lg">
          <h2 className="text-3xl font-black">Sem senha, sem barreiras para comecar</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--color-muted)]">
            Esta pagina inicial foi pensada para apresentar o projeto de forma simples.
            Criancas e responsaveis conseguem entender a proposta rapidamente e seguir para as
            atividades em poucos cliques.
          </p>
          <Link
            href="/metodologia"
            className="mt-6 inline-flex rounded-full bg-[var(--color-brand)] px-7 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            Explorar agora
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}

