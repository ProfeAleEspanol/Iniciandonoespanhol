type SetupNoticeProps = {
  title: string;
  description: string;
};

export function SetupNotice({ title, description }: SetupNoticeProps) {
  return (
    <div className="w-full max-w-2xl rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-[var(--color-brand)]">
        Configuracao pendente
      </p>
      <h1 className="mt-2 text-3xl font-black">{title}</h1>
      <p className="mt-3 text-sm text-[var(--color-muted)]">{description}</p>
      <div className="mt-5 rounded-2xl bg-[var(--color-surface)] p-4 text-sm text-[var(--color-muted)]">
        Defina `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` em `.env.local`
        para habilitar login e area interna.
      </div>
    </div>
  );
}
