import Link from "next/link";

export function LessonCard({
  href,
  title,
  objective,
  activity,
  status,
}: {
  href: string;
  title: string;
  objective: string;
  activity: string;
  status: "done" | "next" | "available";
}) {
  const statusMap = {
    done: {
      label: "Concluida",
      badgeClass: "bg-[var(--color-mint)]/80 text-[var(--color-ink)]",
      cta: "Revisar",
    },
    next: {
      label: "Proxima",
      badgeClass: "bg-[var(--color-sun)] text-[var(--color-ink)]",
      cta: "Comecar",
    },
    available: {
      label: "Disponivel",
      badgeClass: "bg-[var(--color-lilac)] text-[var(--color-ink)]",
      cta: "Abrir",
    },
  };

  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between rounded-[1.6rem] border border-white/70 bg-white p-5 shadow-[0_16px_38px_rgba(87,111,164,0.12)] transition hover:-translate-y-1"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-black text-[var(--color-ink)]">{title}</h3>
          <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${statusMap[status].badgeClass}`}>
            {statusMap[status].label}
          </span>
        </div>
        <p className="mt-3 text-sm text-[var(--color-muted)]">{objective}</p>
        <p className="mt-3 rounded-[1.2rem] bg-[var(--color-surface-highlight)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)]">
          {activity}
        </p>
      </div>
      <span className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-[var(--color-brand)]">
        {statusMap[status].cta}
      </span>
    </Link>
  );
}
