"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => searchParams.get("next") ?? "/dashboard", [searchParams]);

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const supabase = createClient();

  async function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(nextPath);
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Conta criada. Verifique seu email para confirmar o cadastro.");
      }
    } catch (error) {
      const fallback = "Nao foi possivel autenticar. Revise email e senha.";
      setMessage(error instanceof Error ? error.message : fallback);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-sm text-[var(--color-muted)]">Acesso da familia</p>
        <h1 className="text-3xl font-black">Entrar na plataforma</h1>
      </div>

      <div className="mb-4 flex rounded-full bg-[var(--color-surface)] p-1">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`w-1/2 rounded-full px-4 py-2 text-sm font-bold ${
            mode === "signin" ? "bg-[var(--color-brand)] text-white" : "text-[var(--color-muted)]"
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`w-1/2 rounded-full px-4 py-2 text-sm font-bold ${
            mode === "signup" ? "bg-[var(--color-brand)] text-white" : "text-[var(--color-muted)]"
          }`}
        >
          Criar conta
        </button>
      </div>

      <form className="space-y-3" onSubmit={handleAuth}>
        <label className="block text-sm font-semibold">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-border)] px-3 py-2 outline-none focus:border-[var(--color-brand)]"
            placeholder="familia@email.com"
          />
        </label>

        <label className="block text-sm font-semibold">
          Senha
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--color-border)] px-3 py-2 outline-none focus:border-[var(--color-brand)]"
            placeholder="Minimo 6 caracteres"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          {isLoading ? "Processando..." : mode === "signin" ? "Entrar" : "Criar conta"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm text-[var(--color-muted)]">{message}</p> : null}
    </div>
  );
}
