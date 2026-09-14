import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  REPORT_ARTIST_SEGMENT,
  REPORT_ROUTE_PREFIX,
} from "@/constants/report-link.constants";
import { resolveReportContext } from "@/infrastructure/repositories/resolve-report-context";
import {
  findReportArtist,
  findReportJob,
} from "@/infrastructure/repositories/supabase-report-repository";
import { ArtistReport } from "@/presentation/components/reporte/artist-report";
import { ExpiredReportLink } from "@/presentation/components/reporte/expired-report-link";
import { InvalidReportLink } from "@/presentation/components/reporte/invalid-report-link";
import { ReportPasswordGate } from "@/presentation/components/reporte/report-password-gate";
import { getClientIp } from "@/utils/get-client-ip";
import { resolveOrigin } from "@/utils/resolve-origin";
import { withAllReportPlatforms } from "@/utils/with-all-report-platforms";

export const metadata: Metadata = {
  title: "Reporte del artista · adsme",
  robots: { index: false, follow: false },
};

/**
 * Reporte consolidado del artista. Cuelga del mismo código que el reporte del
 * lanzamiento y se resuelve con el mismo token, así que quien tiene el enlace
 * de un lanzamiento ve los demás lanzamientos de ese artista —y solo de ese.
 */
export default async function ReporteArtistaPage({
  params,
}: PageProps<"/r/[code]/artista">) {
  const [{ code }, headerList] = await Promise.all([params, headers()]);

  const gate = await resolveReportContext(code, getClientIp(headerList));

  if (gate.status === "expired") return <ExpiredReportLink />;
  if (gate.status === "passwordRequired" || gate.status === "passwordInvalid") {
    return <ReportPasswordGate code={code} jobTitle={null} hasError={false} />;
  }
  if (!gate.context) return <InvalidReportLink />;

  const { supabase, jobId, version } = gate.context;

  const [artist, job] = await Promise.all([
    findReportArtist(supabase, jobId, version),
    findReportJob(supabase, jobId, version),
  ]);
  if (!artist || !job) return <InvalidReportLink />;

  const report = {
    ...artist,
    platforms: withAllReportPlatforms(artist.platforms),
  };

  const basePath = `${REPORT_ROUTE_PREFIX}/${code}`;

  return (
    <ArtistReport
      artist={report}
      originTitle={job.title}
      originHref={basePath}
      reportUrl={`${resolveOrigin(headerList)}${basePath}/${REPORT_ARTIST_SEGMENT}`}
    />
  );
}
