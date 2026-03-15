import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
import { WelcomeCard } from "@/components/welcome-card";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function LoginPage() {
  const isConfigured = isSupabaseConfigured();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-[var(--color-sun)]/80 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-36 w-36 rounded-full bg-[var(--color-sky-soft)] blur-3xl" />
      {isConfigured ? (
        <Suspense fallback={<div className="h-[30rem] w-full max-w-md rounded-3xl bg-white/80" />}>
          <AuthForm />
        </Suspense>
      ) : (
        <WelcomeCard />
      )}
    </div>
  );
}
