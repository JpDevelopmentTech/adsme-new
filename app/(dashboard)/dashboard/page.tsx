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
import { SpendPanel } from "@/presentation/components/dashboard/spend-panel";
import { PortfolioStrip } from "@/presentation/components/dashboard/portfolio-strip";
import { formatRelativeTime } from "@/utils/format-relative-time";

export const metadata: Metadata = { title: "Dashboard · adsme" };

/**
 * Pantalla `B1 · Dashboard`, ordenada por importancia: el mes en una cifra y
 * su ritmo, tres cifras de contexto, la inversión diaria junto a lo que pide
 * una decisión, y los trabajos en curso. Contesta «¿va bien el mes y qué
 * necesita mi atención?» antes de hacer scroll.
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
      <MonthHero
        metrics={summary.metrics}
        spend={summary.monthSpend}
        status={status}
      />

      <PortfolioStrip metrics={summary.metrics} />

      <div className="flex flex-col gap-6 xl:flex-row xl:items-stretch">
        <div className="min-w-0 flex-1">
          <SpendPanel spend={summary.monthSpend} />
        </div>

        <div className="xl:w-[340px] xl:shrink-0">
          <AlertsPanel alerts={summary.alerts} />
        </div>
      </div>

      <ActiveCampaignsPanel jobs={summary.activeJobs} />
    </>
  );
}
