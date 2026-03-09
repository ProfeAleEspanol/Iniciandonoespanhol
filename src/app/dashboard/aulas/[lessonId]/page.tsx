import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SetupNotice } from "@/components/setup-notice";
import { allLessons, getLessonById } from "@/lib/course-data";
import { getCompletedLessonIds, saveCompletedLessonIds } from "@/lib/progress";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type LessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-surface)] px-4 py-10">
        <SetupNotice
          title="Aula indisponivel no momento"
          description="Conclua a configuracao do Supabase para liberar o acesso as aulas da plataforma."
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

  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  const currentLesson = lesson;

  const lessonIndex = allLessons.findIndex((item) => item.id === currentLesson.id);
  const previousLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;
  const completedLessonIds = await getCompletedLessonIds();
  const isCompleted = completedLessonIds.has(currentLesson.id);

  async function markLessonAsCompleted() {
    "use server";

    const nextCompletedLessonIds = await getCompletedLessonIds();
    nextCompletedLessonIds.add(currentLesson.id);
    await saveCompletedLessonIds(nextCompletedLessonIds);
    redirect(`/dashboard/aulas/${currentLesson.id}`);
  }

  async function markLessonAsPending() {
    "use server";

    const nextCompletedLessonIds = await getCompletedLessonIds();
    nextCompletedLessonIds.delete(currentLesson.id);
    await saveCompletedLessonIds(nextCompletedLessonIds);
    redirect(`/dashboard/aulas/${currentLesson.id}`);
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)] px-4 py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-brand)]">
              {lesson.moduleTitle}
            </p>
            <h1 className="mt-2 text-4xl font-black text-[var(--color-ink)]">{currentLesson.title}</h1>
            <p className="mt-2 max-w-3xl text-sm text-[var(--color-muted)]">{currentLesson.moduleSummary}</p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-bold"
          >
            Voltar ao dashboard
          </Link>
        </div>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[var(--color-brand)]">
                Status da aula
              </p>
              <p className="mt-2 text-lg font-bold text-[var(--color-ink)]">
                {isCompleted ? "Aula concluida" : "Aula ainda em andamento"}
              </p>
            </div>
            <form action={isCompleted ? markLessonAsPending : markLessonAsCompleted}>
              <button
                type="submit"
                className="rounded-full bg-[var(--color-brand)] px-5 py-2 text-sm font-bold text-white"
              >
                {isCompleted ? "Marcar como pendente" : "Marcar como concluida"}
              </button>
            </form>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl bg-white p-5 shadow-sm md:col-span-2">
            <p className="text-sm font-black uppercase tracking-wide text-[var(--color-brand)]">
              Objetivo da aula
            </p>
            <p className="mt-3 text-lg text-[var(--color-ink)]">{currentLesson.objective}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[var(--color-surface)] p-4">
                <h2 className="text-lg font-black">Aquecimento</h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{currentLesson.hook}</p>
              </div>
              <div className="rounded-2xl bg-[var(--color-surface)] p-4">
                <h2 className="text-lg font-black">Pratica guiada</h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{currentLesson.practice}</p>
              </div>
            </div>

            {currentLesson.steps?.length ? (
              <div className="mt-6 rounded-2xl border border-[var(--color-border)] p-4">
                <h2 className="text-lg font-black">Como fazer esta aula</h2>
                <ol className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
                  {currentLesson.steps.map((step, index) => (
                    <li key={step}>
                      <strong className="text-[var(--color-ink)]">{index + 1}.</strong> {step}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </article>

          <aside className="rounded-3xl bg-[var(--color-ink)] p-5 text-white shadow-sm">
            <p className="text-sm font-black uppercase tracking-wide text-white/70">Atividade principal</p>
            <p className="mt-3 text-lg font-bold">{currentLesson.activity}</p>
            <p className="mt-5 text-sm text-white/80">Missao em casa</p>
            <p className="mt-2 text-sm text-white">{currentLesson.homeMission}</p>
            {currentLesson.vocab?.length ? (
              <div className="mt-5">
                <p className="text-sm text-white/80">Palavras-chave</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {currentLesson.vocab.map((word) => (
                    <span key={word} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </section>

        {currentLesson.material?.length ? (
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-wide text-[var(--color-brand)]">
              Materiais da aula
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {currentLesson.material.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-[var(--color-border)] p-4 transition hover:bg-[var(--color-surface)]"
                >
                  <p className="text-xs font-black uppercase tracking-wide text-[var(--color-muted)]">
                    {item.type === "video" ? "Video" : "PDF"}
                  </p>
                  <p className="mt-2 font-bold text-[var(--color-ink)]">{item.label}</p>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    Abrir material em uma nova aba.
                  </p>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-wide text-[var(--color-brand)]">
            Sequencia da jornada
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {previousLesson ? (
              <Link
                href={`/dashboard/aulas/${previousLesson.id}`}
                className="rounded-2xl border border-[var(--color-border)] p-4 transition hover:bg-[var(--color-surface)]"
              >
                <p className="text-xs font-black uppercase tracking-wide text-[var(--color-muted)]">
                  Aula anterior
                </p>
                <p className="mt-2 font-bold">{previousLesson.title}</p>
              </Link>
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
                Esta e a primeira aula da trilha.
              </div>
            )}

            {nextLesson ? (
              <Link
                href={`/dashboard/aulas/${nextLesson.id}`}
                className="rounded-2xl border border-[var(--color-border)] p-4 transition hover:bg-[var(--color-surface)]"
              >
                <p className="text-xs font-black uppercase tracking-wide text-[var(--color-muted)]">
                  Proxima aula
                </p>
                <p className="mt-2 font-bold">{nextLesson.title}</p>
              </Link>
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--color-border)] p-4 text-sm text-[var(--color-muted)]">
                Esta e a ultima aula cadastrada ate agora.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
