"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { FunButton } from "@/components/fun-button";
import { allLessons, getLessonById } from "@/lib/course-data";
import { readCompletedLessonIds, saveCompletedLessonIds } from "@/lib/student-store";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useStudentSession } from "@/components/student-session";

export function LessonPageClient({ lessonId }: { lessonId: string }) {
  const router = useRouter();
  const { isReady, studentName } = useStudentSession();
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());
  const needsStudentName = !isSupabaseConfigured();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (needsStudentName && !studentName) {
      router.replace("/login");
      return;
    }

    startTransition(() => {
      setCompletedLessonIds(readCompletedLessonIds());
    });
  }, [isReady, needsStudentName, router, studentName]);

  const lesson = getLessonById(lessonId);

  if (!lesson) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-5xl items-center justify-center px-4 py-10">
        <EmptyState
          title="Esta aula ainda nao chegou ao mapa"
          description="Escolha outra aula no dashboard e seguimos por la."
        />
      </div>
    );
  }

  if (!isReady || (needsStudentName && !studentName)) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-5xl items-center justify-center px-4 py-10">
        <EmptyState
          title="Carregando sua proxima aventura"
          description="Estamos abrindo os materiais da aula para voce."
        />
      </div>
    );
  }

  const currentLesson = lesson;
  const lessonIndex = allLessons.findIndex((item) => item.id === currentLesson.id);
  const previousLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;
  const isCompleted = completedLessonIds.has(currentLesson.id);

  function handleToggleComplete() {
    const nextCompletedLessonIds = new Set(completedLessonIds);

    if (isCompleted) {
      nextCompletedLessonIds.delete(currentLesson.id);
    } else {
      nextCompletedLessonIds.add(currentLesson.id);
    }

    saveCompletedLessonIds(nextCompletedLessonIds);
    setCompletedLessonIds(nextCompletedLessonIds);
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
      <section className="relative overflow-hidden rounded-[2.4rem] bg-[linear-gradient(135deg,#fff2a7,#dff4ff_48%,#e8dbff)] p-8 shadow-[0_26px_70px_rgba(87,111,164,0.18)]">
        <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/35 blur-2xl" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {lesson.moduleTitle}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-[var(--color-ink)] md:text-5xl">
              {currentLesson.title}
            </h1>
            <p className="mt-3 text-base text-[var(--color-ink)]/75">{currentLesson.moduleSummary}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <FunButton href="/dashboard" variant="secondary">
              Voltar ao mapa
            </FunButton>
            <FunButton onClick={handleToggleComplete}>
              {isCompleted ? "Marcar como pendente" : "Concluir aula"}
            </FunButton>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.5fr_0.9fr]">
        <article className="rounded-[2rem] bg-white p-6 shadow-[0_22px_55px_rgba(87,111,164,0.12)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Objetivo da aula
          </p>
          <p className="mt-3 text-lg text-[var(--color-ink)]">{currentLesson.objective}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.6rem] bg-[var(--color-sky-soft)] p-5">
              <h2 className="text-xl font-black text-[var(--color-ink)]">Aquecimento</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{currentLesson.hook}</p>
            </div>
            <div className="rounded-[1.6rem] bg-[var(--color-surface-highlight)] p-5">
              <h2 className="text-xl font-black text-[var(--color-ink)]">Pratica guiada</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{currentLesson.practice}</p>
            </div>
          </div>

          {currentLesson.material?.length ? (
            <div className="mt-6 rounded-[1.8rem] border border-[var(--color-border)] p-5">
              <h2 className="text-xl font-black text-[var(--color-ink)]">Video e materiais da aula</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {currentLesson.material.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[1.5rem] bg-[var(--color-lilac)] p-4 transition hover:-translate-y-0.5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {item.type === "video" ? "Video" : "Material"}
                    </p>
                    <p className="mt-2 text-lg font-black text-[var(--color-ink)]">{item.label}</p>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      Abrir em uma nova aba para estudar com calma.
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </article>

        <aside className="flex flex-col gap-4">
          <div className="rounded-[2rem] bg-[var(--color-ink)] p-6 text-white shadow-[0_22px_55px_rgba(38,65,95,0.22)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Missao da aula</p>
            <p className="mt-3 text-lg font-bold">{currentLesson.activity}</p>
            <p className="mt-5 text-sm text-white/80">Missao em casa</p>
            <p className="mt-2 text-sm text-white">{currentLesson.homeMission}</p>
          </div>

          {currentLesson.vocab?.length ? (
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_45px_rgba(87,111,164,0.12)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-brand)]">
                Palavras-chave
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {currentLesson.vocab.map((word) => (
                  <span
                    key={word}
                    className="rounded-full bg-[var(--color-mint)] px-4 py-2 text-sm font-black text-[var(--color-ink)]"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </section>

      {currentLesson.steps?.length ? (
        <section className="rounded-[2rem] bg-white p-6 shadow-[0_18px_45px_rgba(87,111,164,0.12)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Como fazer esta aula
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {currentLesson.steps.map((step, index) => (
              <div key={step} className="rounded-[1.4rem] bg-[var(--color-surface-highlight)] p-4">
                <p className="text-sm font-black text-[var(--color-ink)]">Passo {index + 1}</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{step}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2">
        {previousLesson ? (
          <Link
            href={`/dashboard/aulas/${previousLesson.id}`}
            className="rounded-[1.8rem] bg-white p-5 shadow-[0_16px_35px_rgba(87,111,164,0.1)]"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Aula anterior
            </p>
            <p className="mt-2 text-xl font-black text-[var(--color-ink)]">{previousLesson.title}</p>
          </Link>
        ) : (
          <EmptyState
            title="Voce comecou daqui"
            description="Esta e a primeira parada do mapa. Aproveite para explorar com calma."
          />
        )}

        {nextLesson ? (
          <Link
            href={`/dashboard/aulas/${nextLesson.id}`}
            className="rounded-[1.8rem] bg-white p-5 shadow-[0_16px_35px_rgba(87,111,164,0.1)]"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Proxima aula
            </p>
            <p className="mt-2 text-xl font-black text-[var(--color-ink)]">{nextLesson.title}</p>
          </Link>
        ) : (
          <EmptyState
            title="Fim da trilha por enquanto"
            description="Muito bem. Voce chegou ate a ultima aula cadastrada."
          />
        )}
      </section>
    </div>
  );
}
