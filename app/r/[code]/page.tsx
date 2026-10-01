import type { Metadata } from "next";
import { headers } from "next/headers";
import type { JobPlatform } from "@/domain/entities/job";
import type { ReportSection } from "@/domain/entities/report-section";
import {
  REPORT_ARTIST_SEGMENT,
  REPORT_PASSWORD_FIELD,
  REPORT_PLATFORM_PARAM,
  REPORT_ROUTE_PREFIX,
} from "@/constants/report-link.constants";
import { findReportBreakdowns } from "@/infrastructure/repositories/find-report-breakdowns";
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
import { buildReportAudience } from "@/utils/build-report-audience";
import { buildReportTerritories } from "@/utils/build-report-territories";
import { buildReportTotals } from "@/utils/build-report-totals";
import { buildReportGrowth } from "@/utils/build-report-growth";
import { buildLaunchHeadline, buildPeriodHeadline } from "@/utils/build-report-headline";
import { buildPeriodReportMetrics } from "@/utils/build-period-report-metrics";
import { buildReportPeriodPresets } from "@/utils/build-report-period-presets";
import { formatJobPeriod } from "@/utils/format-job-period";
import { parseReportPeriod } from "@/utils/parse-report-period";
import { buildCpvComparison } from "@/utils/build-cpv-comparison";
import { filterVisibleBreakdowns } from "@/utils/filter-visible-breakdowns";
import { isReportSectionVisible } from "@/utils/is-report-section-visible";
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
 * credencial que se verifica sigue siendo el JWT firmado. Admite un período
 * (`desde`, `hasta`) dentro del lanzamiento, que recorta todo lo que se puede
 * recortar por fechas.
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

  const [job, metrics, daily, breakdowns] = await Promise.all([
    findReportJob(supabase, jobId, version),
    findReportMetrics(supabase, jobId, version),
    findReportDailyMetrics(supabase, jobId, version),
    findReportBreakdowns(supabase, jobId, version),
  ]);
  if (!job) return <InvalidReportLink />;

  const now = new Date();
  const today = toIsoDate(now);
  const basePath = `${REPORT_ROUTE_PREFIX}/${code}`;
  const isVisible = (section: ReportSection) => isReportSectionVisible(job.hiddenSections, section);

  // El período llega en la URL y se valida aquí, en el servidor: solo admite
  // días del lanzamiento. Con un tramo elegido, las cifras sumables salen de la
  // serie diaria de esos días; sin él, de los acumulados de siempre.
  const parsed = parseReportPeriod(query, job);
  const range = parsed.period;
  const periodWindow = { startsOn: range.from, endsOn: range.to };
  const periodDaily = parsed.isCustom
    ? daily.filter((point) => point.date >= range.from && point.date <= range.to)
    : daily;
  const lifetime = withAllReportPlatforms(metrics);
  const platforms = parsed.isCustom ? buildPeriodReportMetrics(lifetime, periodDaily) : lifetime;
  const totals = buildReportTotals(platforms);
  const visibleBreakdowns = filterVisibleBreakdowns(breakdowns, job.hiddenSections);

  const selected = query[REPORT_PLATFORM_PARAM];
  const activePlatform = platforms.some((item) => item.platform === selected)
    ? (selected as JobPlatform)
    : null;

  const headline = !isVisible("headline")
    ? null
    : parsed.isCustom
      ? buildPeriodHeadline(totals.videoPlays, job, formatJobPeriod(range.from, range.to))
      : buildLaunchHeadline(totals.reach, job, today);

  return (
    <ReportPreview
      job={job}
      headline={headline}
      totals={totals}
      platforms={platforms}
      growth={isVisible("growth") ? buildReportGrowth(periodDaily, periodWindow, today) : null}
      cpvComparison={buildCpvComparison(job, metrics, daily, today, periodWindow)}
      audience={buildReportAudience(visibleBreakdowns)}
      territories={buildReportTerritories(visibleBreakdowns)}
      activePlatform={activePlatform}
      period={{
        range,
        isCustom: parsed.isCustom,
        presets: buildReportPeriodPresets(job, today, basePath, query),
        limits: { min: job.startsOn, max: job.endsOn },
        error: parsed.error,
      }}
      basePath={basePath}
      params={query}
      reportUrl={`${resolveOrigin(headerList)}${basePath}`}
      artistHref={`${basePath}/${REPORT_ARTIST_SEGMENT}`}
      now={now.toISOString()}
    />
  );
}
