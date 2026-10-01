import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { JOB_STATUS_BADGE } from "@/constants/client-detail.constants";
import { ARTIST_SPEND_HEADER, ARTIST_TABLE_HEADERS, REPORT_COPY } from "@/constants/report.constants";
import { REPORT_ROUTE_PREFIX } from "@/constants/report-link.constants";
import { JobCover } from "@/presentation/components/cliente-detalle/job-cover";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ArtistLaunchesTableProps } from "@/types/report.types";
import { cn } from "@/utils/cn";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatExactNumber } from "@/utils/format-exact-number";

/** Ancho y alineación de cada columna, en el orden de `ARTIST_TABLE_HEADERS`. */
const COLUMN_CLASSES: Record<string, string> = {
  Lanzamiento: "",
  Tipo: "w-[120px]",
  Estado: "w-[140px]",
  Views: "w-[140px] pr-6 text-right",
  [ARTIST_SPEND_HEADER]: "w-[160px] pr-6 text-right",
  Enlace: "w-[120px] pl-2",
};

/** Tabla de lanzamientos del artista, con acceso al reporte de cada uno. */
export function ArtistLaunchesTable({ launches, showSpend }: ArtistLaunchesTableProps) {
  const headers = showSpend
    ? ARTIST_TABLE_HEADERS
    : ARTIST_TABLE_HEADERS.filter((header) => header !== ARTIST_SPEND_HEADER);

  return (
    <section className="glass-thick flex flex-col rounded-window px-5 pt-6 pb-2.5 sm:px-7">
      <h2 className="text-2xl font-light text-text-primary">{REPORT_COPY.artistLaunches}</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr className="h-[52px] border-b border-border text-left text-xs font-normal text-text-muted">
              {headers.map((header) => (
                <th key={header} className={cn("pb-2.5 align-bottom font-normal", COLUMN_CLASSES[header])}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {launches.map((launch) => {
              const status = JOB_STATUS_BADGE[launch.status];

              return (
                <tr key={launch.id} className="h-[78px] border-b border-border last:border-b-0">
                  <td className="pr-4">
                    <span className="flex items-center gap-3.5">
                      <JobCover imageUrl={launch.coverUrl} title={launch.title} size={52} />
                      <span className="text-base text-text-primary">{launch.title}</span>
                    </span>
                  </td>
                  <td className="text-sm font-light text-text-secondary">{launch.format}</td>
                  <td>
                    <span className="inline-flex">
                      <StatusBadge label={status.label} tone={status.tone} />
                    </span>
                  </td>
                  <td className="pr-6 text-right text-[15px] text-text-primary tabular-nums">
                    {formatExactNumber(launch.videoPlays)}
                  </td>
                  {showSpend ? (
                    <td className="pr-6 text-right text-[15px] whitespace-nowrap text-text-primary tabular-nums">
                      {formatExactCurrency(launch.spend)}
                    </td>
                  ) : null}
                  <td>
                    {launch.code ? (
                      <Link
                        href={`${REPORT_ROUTE_PREFIX}/${launch.code}`}
                        className="inline-flex items-center gap-1.5 rounded-pill border border-white/20 bg-surface px-3.5 py-[7px] text-[13px] text-text-primary transition-colors duration-150 hover:border-white/40 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
                      >
                        <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
                        {REPORT_COPY.view}
                      </Link>
                    ) : (
                      <span className="text-[13px] font-light text-text-muted">{REPORT_COPY.noLaunchLink}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
