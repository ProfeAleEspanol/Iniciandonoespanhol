import Link from "next/link";
import { allLessons, modules } from "@/lib/course-data";
import { SetupNotice } from "@/components/setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function completionPercent(total: number, done: number) {
  return Math.round((done / total) * 100);
}

const completedLessonIds = new Set(["m1-a1", "m1-a2"]);

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-surface)] px-4 py-10">
        <SetupNotice
          title="Painel indisponivel no momento"
          description="Conclua a configuracao do Supabase para liberar autenticacao, sessoes e acesso ao dashboard."
        />
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  async function signOut() {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  const completedLessons = completedLessonIds.size;
  const totalLessons = modules.reduce((acc, item) => acc + item.lessons.length, 0);
  const progress = completionPercent(totalLessons, completedLessons);
  const nextLesson = allLessons.find((lesson) => !completedLessonIds.has(lesson.id)) ?? allLessons[0];

  return (
    <div className="min-h-screen bg-[var(--color-surface)] px-4 py-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-6 rounded-3xl bg-[var(--color-ink)] p-6 text-white">
          <p className="text-sm text-white/80">Area da familia</p>
          <h1 className="mt-2 text-3xl font-black">Bem-vindo ao painel Profe Ale</h1>
          <p className="mt-1 text-sm text-white/80">{user.email}</p>
          <p className="mt-2 text-sm text-white/80">
            Progresso geral: {progress}% ({completedLessons}/{totalLessons} aulas)
          </p>
          <div className="mt-4 h-2 rounded-full bg-white/20">
            <div className="h-full rounded-full bg-[var(--color-brand)]" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/dashboard/aulas/${nextLesson.id}`}
              className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-bold text-white"
            >
              Continuar em {nextLesson.title}
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[var(--color-ink)]"
              >
                Sair
              </button>
            </form>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <p className="text-sm font-black uppercase tracking-wide text-[var(--color-brand)]">Proxima aula</p>
            <h2 className="mt-2 text-2xl font-black">{nextLesson.title}</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{nextLesson.objective}</p>
            <Link
              href={`/dashboard/aulas/${nextLesson.id}`}
              className="mt-4 inline-flex rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-bold text-white"
            >
              Abrir agora
            </Link>
          </article>

          <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <p className="text-sm font-black uppercase tracking-wide text-[var(--color-brand)]">Aulas concluidas</p>
            <p className="mt-2 text-4xl font-black">{completedLessons}</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Cada aula concluida libera uma visao mais clara da jornada da crianca.
            </p>
          </article>

          <article className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
            <p className="text-sm font-black uppercase tracking-wide text-[var(--color-brand)]">Mapa da trilha</p>
            <p className="mt-2 text-4xl font-black">{totalLessons}</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              O dashboard agora leva diretamente para cada aula cadastrada.
            </p>
          </article>
        </section>

        <section className="grid gap-4">
          {modules.map((module) => (
            <article key={module.id} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black">{module.title}</h2>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{module.summary}</p>
                </div>
                <div className="min-w-48 rounded-2xl bg-[var(--color-surface)] px-4 py-3">
                  <p className="text-xs font-black uppercase tracking-wide text-[var(--color-muted)]">
                    Progresso do modulo
                  </p>
                  <p className="mt-2 text-2xl font-black">
                    {module.lessons.filter((lesson) => completedLessonIds.has(lesson.id)).length}/{module.lessons.length}
                  </p>
                  <Link
                    href={`/dashboard/aulas/${
                      module.lessons.find((lesson) => !completedLessonIds.has(lesson.id))?.id ?? module.lessons[0].id
                    }`}
                    className="mt-3 inline-flex rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-bold text-white"
                  >
                    {module.lessons.every((lesson) => completedLessonIds.has(lesson.id))
                      ? "Revisar modulo"
                      : "Continuar modulo"}
                  </Link>
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/dashboard/aulas/${lesson.id}`}
                    className="rounded-xl bg-[var(--color-surface)] p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold">{lesson.title}</p>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-wide text-[var(--color-brand)]">
                        {completedLessonIds.has(lesson.id) ? "Concluida" : "Disponivel"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      <strong>Objetivo:</strong> {lesson.objective}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      <strong>Atividade:</strong> {lesson.activity}
                    </p>
                    <p className="mt-3 text-sm font-bold text-[var(--color-brand)]">
                      {completedLessonIds.has(lesson.id) ? "Revisar aula" : "Abrir aula"}
                    </p>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
