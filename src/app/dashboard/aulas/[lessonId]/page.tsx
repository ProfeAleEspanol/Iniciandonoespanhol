import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SetupNotice } from "@/components/setup-notice";
import { allLessons, getLessonById } from "@/lib/course-data";
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

  const lessonIndex = allLessons.findIndex((item) => item.id === lesson.id);
  const previousLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[var(--color-surface)] px-4 py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-brand)]">
              {lesson.moduleTitle}
            </p>
            <h1 className="mt-2 text-4xl font-black text-[var(--color-ink)]">{lesson.title}</h1>
            <p className="mt-2 max-w-3xl text-sm text-[var(--color-muted)]">{lesson.moduleSummary}</p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-bold"
          >
            Voltar ao dashboard
          </Link>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl bg-white p-5 shadow-sm md:col-span-2">
            <p className="text-sm font-black uppercase tracking-wide text-[var(--color-brand)]">
              Objetivo da aula
            </p>
            <p className="mt-3 text-lg text-[var(--color-ink)]">{lesson.objective}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[var(--color-surface)] p-4">
                <h2 className="text-lg font-black">Aquecimento</h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{lesson.hook}</p>
              </div>
              <div className="rounded-2xl bg-[var(--color-surface)] p-4">
                <h2 className="text-lg font-black">Pratica guiada</h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{lesson.practice}</p>
              </div>
            </div>
          </article>

          <aside className="rounded-3xl bg-[var(--color-ink)] p-5 text-white shadow-sm">
            <p className="text-sm font-black uppercase tracking-wide text-white/70">Atividade principal</p>
            <p className="mt-3 text-lg font-bold">{lesson.activity}</p>
            <p className="mt-5 text-sm text-white/80">Missao em casa</p>
            <p className="mt-2 text-sm text-white">{lesson.homeMission}</p>
          </aside>
        </section>

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
