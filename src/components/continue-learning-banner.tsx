import { FunButton } from "@/components/fun-button";

export function ContinueLearningBanner({
  studentName,
  lessonTitle,
  lessonObjective,
  href,
}: {
  studentName: string;
  lessonTitle: string;
  lessonObjective: string;
  href: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-[2.2rem] bg-[linear-gradient(135deg,#6ec8ff,#8ef1d6_55%,#fff2a7)] p-6 shadow-[0_26px_70px_rgba(87,111,164,0.18)] md:p-8">
      <div className="absolute right-6 top-6 hidden h-28 w-28 rounded-full bg-white/35 blur-2xl md:block" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--color-ink)]/70">
            Sua proxima aventura em espanhol
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
            Muito bem, {studentName}. Vamos continuar?
          </h1>
          <p className="mt-3 text-lg text-[var(--color-ink)]/80">{lessonTitle}</p>
          <p className="mt-2 max-w-xl text-sm text-[var(--color-ink)]/70">{lessonObjective}</p>
        </div>
        <FunButton href={href} className="min-w-48 bg-[var(--color-ink)] shadow-none">
          Continuar
        </FunButton>
      </div>
    </section>
  );
}
