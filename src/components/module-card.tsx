import Link from "next/link";
import { LessonCard } from "@/components/lesson-card";

type ModuleLesson = {
  id: string;
  title: string;
  objective: string;
  activity: string;
};

export function ModuleCard({
  title,
  summary,
  lessons,
  completedLessonIds,
  nextLessonId,
}: {
  title: string;
  summary: string;
  lessons: ModuleLesson[];
  completedLessonIds: Set<string>;
  nextLessonId: string;
}) {
  const completedCount = lessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;

  return (
    <article className="rounded-[2rem] border border-white/70 bg-[rgba(255,255,255,0.88)] p-6 shadow-[0_24px_60px_rgba(87,111,164,0.14)] backdrop-blur">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-brand)]">Modulo</p>
          <h2 className="mt-2 font-display text-3xl text-[var(--color-ink)]">{title}</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{summary}</p>
        </div>
        <div className="rounded-[1.5rem] bg-[var(--color-sky-soft)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-muted)]">Progresso</p>
          <p className="mt-2 text-3xl font-black text-[var(--color-ink)]">
            {completedCount}/{lessons.length}
          </p>
          <Link
            href={`/dashboard/aulas/${nextLessonId}`}
            className="mt-3 inline-flex rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-black text-white"
          >
            {completedCount === lessons.length ? "Revisar" : "Continuar"}
          </Link>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            href={`/dashboard/aulas/${lesson.id}`}
            title={lesson.title}
            objective={lesson.objective}
            activity={lesson.activity}
            status={
              completedLessonIds.has(lesson.id) ? "done" : lesson.id === nextLessonId ? "next" : "available"
            }
          />
        ))}
      </div>
    </article>
  );
}
