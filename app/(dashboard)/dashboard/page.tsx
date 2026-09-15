import type { Metadata } from "next";
import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import { createGetDashboardSummary } from "@/domain/use-cases/get-dashboard-summary";
import { createSupabaseCampaignDailyRepository } from "@/infrastructure/repositories/supabase-campaign-daily-repository";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { ActiveCampaignsPanel } from "@/presentation/components/dashboard/active-campaigns-panel";
import { AlertsPanel } from "@/presentation/components/dashboard/alerts-panel";
import { MonthHero } from "@/presentation/components/dashboard/month-hero";
import { PortfolioStrip } from "@/presentation/components/dashboard/portfolio-strip";
import { formatRelativeTime } from "@/utils/format-relative-time";

export const metadata: Metadata = { title: "Dashboard · adsme" };

/**
 * Pantalla `B1 · Dashboard`, ordenada por importancia: arriba queda todo lo que
 * contesta «¿va bien el mes y qué se rompió?» —el dinero a la izquierda, lo que
 * exige una decisión a la derecha— y el detalle del portafolio se baja con
 * scroll. El título lo pone la topbar, así que empieza ya en el primer dato.
 */
export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const now = new Date();

  const summary = await createGetDashboardSummary(
    createSupabaseClientRepository(supabase),
    createSupabaseJobRepository(supabase),
    createSupabaseCampaignRepository(supabase),
    createSupabaseConnectionRepository(supabase),
    createSupabaseCampaignDailyRepository(supabase),
  )(now);

  const status = summary.lastSyncedAt
    ? `${DASHBOARD_COPY.synced} ${formatRelativeTime(summary.lastSyncedAt, now.toISOString())}`
    : DASHBOARD_COPY.noSyncShort;

  return (
    <>
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <MonthHero
            metrics={summary.metrics}
            spend={summary.monthSpend}
            status={status}
          />

          <PortfolioStrip metrics={summary.metrics} />
        </div>

        <div className="xl:w-[340px] xl:shrink-0">
          <AlertsPanel alerts={summary.alerts} />
        </div>
      </div>

      <ActiveCampaignsPanel jobs={summary.activeJobs} />
    </>
  );
}
