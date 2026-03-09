export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-[var(--color-border-strong)] bg-white/80 p-8 text-center shadow-[0_18px_40px_rgba(87,111,164,0.1)]">
      <p className="font-display text-3xl text-[var(--color-ink)]">{title}</p>
      <p className="mt-3 text-sm text-[var(--color-muted)]">{description}</p>
    </div>
  );
}
