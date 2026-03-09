import { LessonPageClient } from "@/components/lesson-page-client";
import { SiteShell } from "@/components/site-shell";

type LessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  return (
    <SiteShell ctaLabel="Voltar ao mapa" ctaHref="/dashboard">
      <LessonPageClient lessonId={lessonId} />
    </SiteShell>
  );
}
