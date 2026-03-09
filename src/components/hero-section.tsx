import { FunButton } from "@/components/fun-button";

const highlights = [
  "Videos curtos e leves",
  "PDFs e desafios ludicos",
  "Mapa de progresso facil de acompanhar",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[2.6rem] bg-[linear-gradient(135deg,#fff4a8,#b5ecff_48%,#c7f9dd)] p-8 shadow-[0_30px_90px_rgba(87,111,164,0.2)] md:p-10">
          <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-white/40 blur-2xl" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[var(--color-brand)]/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--color-ink)] shadow-[0_10px_20px_rgba(87,111,164,0.1)]">
              Espanhol divertido para criancas e jovens
            </span>
            <h1 className="mt-5 font-display text-5xl leading-none text-[var(--color-ink)] md:text-7xl">
              Descobrir espanhol pode ser leve, bonito e cheio de conquista.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-[var(--color-ink)]/75">
              A Profe Ale transforma cada aula em uma pequena aventura com voz, imagens,
              materiais coloridos e um mapa de progresso que convida a continuar.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <FunButton href="/login">Comecar agora</FunButton>
              <FunButton href="/dashboard" variant="secondary">
                Ver mapa de aulas
              </FunButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-[var(--color-ink)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_55px_rgba(87,111,164,0.14)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Como a jornada acontece
            </p>
            <div className="mt-4 space-y-4">
              {[
                "Explorar uma aula curta e acolhedora",
                "Abrir o video, o PDF e a atividade da vez",
                "Marcar a conquista e seguir para a proxima",
              ].map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-sky-soft)] font-black text-[var(--color-ink)]">
                    {index + 1}
                  </span>
                  <p className="pt-2 text-sm font-semibold text-[var(--color-muted)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-[var(--color-lilac)] p-6 shadow-[0_18px_40px_rgba(87,111,164,0.12)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Clima do projeto
            </p>
            <p className="mt-3 font-display text-3xl text-[var(--color-ink)]">
              Acolhedor, colorido e feito para aprender com curiosidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
