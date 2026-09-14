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
import { KpiRow } from "@/presentation/components/dashboard/kpi-row";
import { MonthSpendChart } from "@/presentation/components/dashboard/month-spend-chart";
import { PageHeader } from "@/presentation/components/dashboard/page-header";
import { PlatformsPanel } from "@/presentation/components/dashboard/platforms-panel";
import { formatRelativeTime } from "@/utils/format-relative-time";

export const metadata: Metadata = { title: "Dashboard · adsme" };

/**
 * Pantalla `B1 · Dashboard`: el estado de todo el sistema en una vista —dinero
 * del mes, reparto por plataforma, trabajos con más peso y lo que exige acción.
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

  const subtitle = summary.lastSyncedAt
    ? `Datos sincronizados ${formatRelativeTime(summary.lastSyncedAt, now.toISOString())}`
    : DASHBOARD_COPY.noSync;

  return (
    <>
      <PageHeader
        title={DASHBOARD_COPY.title}
        subtitle={subtitle}
        hasStatusDot={summary.lastSyncedAt !== null}
      />

      <KpiRow metrics={summary.metrics} spend={summary.monthSpend} />

      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="min-w-0 flex-1">
          <MonthSpendChart spend={summary.monthSpend} />
        </div>

        <div className="xl:w-[360px] xl:shrink-0">
          <PlatformsPanel platforms={summary.platforms} />
        </div>
      </div>

      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="min-w-0 flex-1">
          <ActiveCampaignsPanel jobs={summary.activeJobs} />
        </div>

        <div className="xl:w-[360px] xl:shrink-0">
          <AlertsPanel alerts={summary.alerts} />
        </div>
      </div>
    </>
  );
}
