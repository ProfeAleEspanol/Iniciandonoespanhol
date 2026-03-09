import { DashboardClient } from "@/components/dashboard-client";
import { SiteShell } from "@/components/site-shell";

export default function DashboardPage() {
  return (
    <SiteShell ctaLabel="Trocar nome" ctaHref="/login">
      <DashboardClient />
    </SiteShell>
  );
}
