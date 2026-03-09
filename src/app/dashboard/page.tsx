import Link from "next/link";
import { modules } from "@/lib/course-data";
import { SetupNotice } from "@/components/setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function completionPercent(total: number, done: number) {
  return Math.round((done / total) * 100);
}

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

  const completedLessons = 2;
  const totalLessons = modules.reduce((acc, item) => acc + item.lessons.length, 0);
  const progress = completionPercent(totalLessons, completedLessons);

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
          <form action={signOut} className="mt-5">
            <button
              type="submit"
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[var(--color-ink)]"
            >
              Sair
            </button>
          </form>
        </header>

        <section className="grid gap-4">
          {modules.map((module) => (
            <article key={module.id} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <h2 className="text-2xl font-black">{module.title}</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{module.summary}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/dashboard/aulas/${lesson.id}`}
                    className="rounded-xl bg-[var(--color-surface)] p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <p className="font-bold">{lesson.title}</p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      <strong>Objetivo:</strong> {lesson.objective}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      <strong>Atividade:</strong> {lesson.activity}
                    </p>
                    <p className="mt-3 text-sm font-bold text-[var(--color-brand)]">Abrir aula</p>
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
