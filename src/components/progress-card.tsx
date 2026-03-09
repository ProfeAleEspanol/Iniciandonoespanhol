export function ProgressCard({
  label,
  value,
  description,
  tone = "sky",
}: {
  label: string;
  value: string;
  description: string;
  tone?: "sky" | "mint" | "sun";
}) {
  const toneClasses = {
    sky: "bg-[var(--color-sky-soft)]",
    mint: "bg-[var(--color-mint)]/70",
    sun: "bg-[var(--color-sun)]/70",
  };

  return (
    <article className={`rounded-[1.8rem] ${toneClasses[tone]} p-5 shadow-[0_16px_38px_rgba(87,111,164,0.12)]`}>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-muted)]">{label}</p>
      <p className="mt-3 font-display text-4xl text-[var(--color-ink)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">{description}</p>
    </article>
  );
}
