"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContinueLearningBanner } from "@/components/continue-learning-banner";
import { EmptyState } from "@/components/empty-state";
import { ModuleCard } from "@/components/module-card";
import { ProgressCard } from "@/components/progress-card";
import { allLessons, modules } from "@/lib/course-data";
import { readCompletedLessonIds } from "@/lib/student-store";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useStudentSession } from "@/components/student-session";

function completionPercent(total: number, done: number) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

export function DashboardClient() {
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

  if (!isReady || (needsStudentName && !studentName)) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-4 py-10">
        <EmptyState
          title="Preparando seu mapa de aventuras"
          description="Estamos organizando suas aulas para voce entrar com calma."
        />
      </div>
    );
  }

  const completedLessons = completedLessonIds.size;
  const totalLessons = allLessons.length;
  const progress = completionPercent(totalLessons, completedLessons);
  const nextLesson = allLessons.find((lesson) => !completedLessonIds.has(lesson.id)) ?? allLessons[0];
  const displayName = studentName || "explorador";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <ContinueLearningBanner
        studentName={displayName}
        lessonTitle={nextLesson.title}
        lessonObjective={nextLesson.objective}
        href={`/dashboard/aulas/${nextLesson.id}`}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <ProgressCard
          label="Seu progresso"
          value={`${progress}%`}
          description="Cada aula concluida colore mais o seu caminho."
          tone="sun"
        />
        <ProgressCard
          label="Aulas prontas"
          value={`${totalLessons}`}
          description="Escolha por onde comecar ou siga a proxima aventura recomendada."
          tone="sky"
        />
        <ProgressCard
          label="Conquistas"
          value={`${completedLessons}`}
          description="Voce pode revisar qualquer aula quando quiser."
          tone="mint"
        />
      </section>

      <section className="flex flex-col gap-5">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            summary={module.summary}
            lessons={module.lessons}
            completedLessonIds={completedLessonIds}
            nextLessonId={
              module.lessons.find((lesson) => !completedLessonIds.has(lesson.id))?.id ?? module.lessons[0].id
            }
          />
        ))}
      </section>
    </div>
  );
}
