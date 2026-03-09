import { StudentNameForm } from "@/components/student-name-form";

export function WelcomeCard() {
  return (
    <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_30px_80px_rgba(87,111,164,0.18)] backdrop-blur">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--color-sun)]/70 blur-2xl" />
      <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-[var(--color-mint)]/60 blur-2xl" />
      <div className="relative space-y-5">
        <span className="inline-flex rounded-full bg-[var(--color-lilac)] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--color-ink)]">
          Vamos aprender brincando?
        </span>
        <div>
          <h1 className="font-display text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
            Sua proxima aventura em espanhol comeca aqui.
          </h1>
          <p className="mt-3 text-lg text-[var(--color-muted)]">
            Digite seu nome, entre no mapa de aulas e siga no seu ritmo com videos,
            desafios e materiais divertidos.
          </p>
        </div>
        <StudentNameForm />
      </div>
    </div>
  );
}
