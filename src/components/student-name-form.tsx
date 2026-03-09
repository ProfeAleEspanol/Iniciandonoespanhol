"use client";

import { FormEvent, startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FunButton } from "@/components/fun-button";
import { useStudentSession } from "@/components/student-session";

type StudentNameFormProps = {
  redirectTo?: string;
};

export function StudentNameForm({ redirectTo = "/dashboard" }: StudentNameFormProps) {
  const router = useRouter();
  const { isReady, studentName, setStudentName } = useStudentSession();
  const [name, setName] = useState("");

  useEffect(() => {
    if (isReady && studentName) {
      startTransition(() => {
        setName(studentName);
      });
    }
  }, [isReady, studentName]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    setStudentName(name);
    router.push(redirectTo);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-left text-sm font-bold text-[var(--color-muted)]">
        Como podemos te chamar?
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ex.: Sofia"
          className="mt-2 w-full rounded-[1.5rem] border border-[var(--color-border-strong)] bg-white px-5 py-4 text-base font-bold text-[var(--color-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)]"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <FunButton type="submit" className="min-w-44">
          Entrar na aventura
        </FunButton>
        {studentName ? (
          <FunButton href={redirectTo} variant="secondary" className="min-w-40">
            Continuar como {studentName}
          </FunButton>
        ) : null}
      </div>
    </form>
  );
}
