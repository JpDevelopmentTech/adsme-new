import type { Metadata } from "next";
import { headers } from "next/headers";
import type { JobPlatform } from "@/domain/entities/job";
import {
  REPORT_ARTIST_SEGMENT,
  REPORT_PASSWORD_FIELD,
  REPORT_PLATFORM_PARAM,
  REPORT_ROUTE_PREFIX,
} from "@/constants/report-link.constants";
import { resolveReportContext } from "@/infrastructure/repositories/resolve-report-context";
import { findReportDailyMetrics } from "@/infrastructure/repositories/supabase-report-daily-repository";
import {
  findReportJob,
  findReportMetrics,
} from "@/infrastructure/repositories/supabase-report-repository";
import { ExpiredReportLink } from "@/presentation/components/reporte/expired-report-link";
import { InvalidReportLink } from "@/presentation/components/reporte/invalid-report-link";
import { ReportPasswordGate } from "@/presentation/components/reporte/report-password-gate";
import { ReportPreview } from "@/presentation/components/reporte/report-preview";
import { buildReportTotals } from "@/utils/build-report-totals";
import { buildReportTrends } from "@/utils/build-report-trends";
import { getClientIp } from "@/utils/get-client-ip";
import { toIsoDate } from "@/utils/month-range";
import { withAllReportPlatforms } from "@/utils/with-all-report-platforms";
import { resolveOrigin } from "@/utils/resolve-origin";

export const metadata: Metadata = {
  title: "Reporte · adsme",
  // Un enlace compartido no debe acabar indexado en buscadores.
  robots: { index: false, follow: false },
};

/**
 * Reporte público del artista. El código corto solo apunta al token: la
 * credencial que se verifica sigue siendo el JWT firmado.
 */
export default async function ReportePage({
  params,
  searchParams,
}: PageProps<"/r/[code]">) {
  const [{ code }, query, headerList] = await Promise.all([
    params,
    searchParams,
    headers(),
  ]);

  const gate = await resolveReportContext(code, getClientIp(headerList));

  if (gate.status === "expired") return <ExpiredReportLink />;
  if (gate.status === "passwordRequired" || gate.status === "passwordInvalid") {
    return (
      <ReportPasswordGate
        code={code}
        jobTitle={null}
        hasError={query[REPORT_PASSWORD_FIELD] === "error"}
      />
    );
  }
  if (!gate.context) return <InvalidReportLink />;

  const { supabase, jobId, version } = gate.context;

  const [job, metrics, daily] = await Promise.all([
    findReportJob(supabase, jobId, version),
    findReportMetrics(supabase, jobId, version),
    findReportDailyMetrics(supabase, jobId, version),
  ]);
  if (!job) return <InvalidReportLink />;

  const platforms = withAllReportPlatforms(metrics);
  const now = new Date();

  const basePath = `${REPORT_ROUTE_PREFIX}/${code}`;
  const selected = query[REPORT_PLATFORM_PARAM];
  const activePlatform = platforms.some(
    (metrics) => metrics.platform === selected,
  )
    ? (selected as JobPlatform)
    : null;

  return (
    <ReportPreview
      job={job}
      totals={buildReportTotals(platforms)}
      platforms={platforms}
      trends={buildReportTrends(daily, job, toIsoDate(now))}
      activePlatform={activePlatform}
      basePath={basePath}
      reportUrl={`${resolveOrigin(headerList)}${basePath}`}
      artistHref={`${basePath}/${REPORT_ARTIST_SEGMENT}`}
      now={now.toISOString()}
    />
  );
}
