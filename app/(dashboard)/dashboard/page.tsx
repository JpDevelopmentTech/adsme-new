import type { Metadata } from "next";
import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import { createGetDashboardSummary } from "@/domain/use-cases/get-dashboard-summary";
import { createSupabaseCampaignDailyRepository } from "@/infrastructure/repositories/supabase-campaign-daily-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { ActiveCampaignsPanel } from "@/presentation/components/dashboard/active-campaigns-panel";
import { DashboardKpiRow } from "@/presentation/components/dashboard/dashboard-kpi-row";
import { DashboardPeriodBar } from "@/presentation/components/dashboard/dashboard-period-bar";
import { SpendPanel } from "@/presentation/components/dashboard/spend-panel";
import { buildPeriodPresets } from "@/utils/build-period-presets";
import { formatRelativeTime } from "@/utils/format-relative-time";
import { parseDashboardPeriod } from "@/utils/parse-dashboard-period";

export const metadata: Metadata = { title: "Dashboard · adsme" };

/**
 * Pantalla `Dashboard · Principal`. El período llega en la URL (`desde`,
 * `hasta`), se valida aquí en el servidor y recorta todo lo de debajo: la
 * inversión y su ritmo, las cifras de contexto, la inversión diaria y los
 * trabajos con mayor inversión. Sin fechas abre en el mes en curso.
 * El panel «Requiere atención» se quitó por decisión del usuario (1 oct 2026).
 */
export default async function DashboardPage({ searchParams }: PageProps<"/dashboard">) {
  const supabase = await createServerSupabaseClient();
  const now = new Date();
  const { period, error } = parseDashboardPeriod(await searchParams, now);

  const summary = await createGetDashboardSummary(
    createSupabaseClientRepository(supabase),
    createSupabaseJobRepository(supabase),
    createSupabaseConnectionRepository(supabase),
    createSupabaseCampaignDailyRepository(supabase),
  )(now, period);

  const status = summary.lastSyncedAt
    ? `${DASHBOARD_COPY.synced} ${formatRelativeTime(summary.lastSyncedAt, now.toISOString())}`
    : DASHBOARD_COPY.noSyncShort;

  return (
    <>
      <DashboardPeriodBar period={period} presets={buildPeriodPresets(now)} error={error} />

      <DashboardKpiRow
        metrics={summary.metrics}
        spend={summary.spend}
        status={status}
        isSynced={Boolean(summary.lastSyncedAt)}
      />

      <SpendPanel spend={summary.spend} />

      <ActiveCampaignsPanel jobs={summary.periodJobs} />
    </>
  );
}
