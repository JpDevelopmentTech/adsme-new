import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { JOB_STATUS_BADGE } from "@/constants/client-detail.constants";
import { ARTIST_TABLE_HEADERS, REPORT_COPY } from "@/constants/report.constants";
import { REPORT_ROUTE_PREFIX } from "@/constants/report-link.constants";
import { JobCover } from "@/presentation/components/cliente-detalle/job-cover";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ArtistLaunchesTableProps } from "@/types/report.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatCompactNumber } from "@/utils/format-compact-number";
import { resolveClientGradient } from "@/utils/client-gradient";

/** Tabla de lanzamientos del artista, con acceso al reporte de cada uno. */
export function ArtistLaunchesTable({ launches }: ArtistLaunchesTableProps) {
  return (
    <div className="overflow-x-auto rounded-card border border-border bg-card">
      <table className="w-full min-w-[840px] border-collapse">
        <thead className="border-b border-border bg-surface">
          <tr className="text-left text-[11px] font-bold tracking-[0.5px] text-text-muted uppercase">
            {ARTIST_TABLE_HEADERS.map((header) => (
              <th key={header} className="px-5 py-3 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {launches.map((launch) => {
            const status = JOB_STATUS_BADGE[launch.status];

            return (
              <tr key={launch.id} className="border-b border-border last:border-b-0">
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-3">
                    <JobCover
                      cover={resolveClientGradient(launch.id)}
                      imageUrl={launch.coverUrl}
                      title={launch.title}
                    />
                    <span className="text-sm font-semibold text-text-primary">
                      {launch.title}
                    </span>
                  </span>
                </td>

                <td className="px-5 py-3.5 text-[13px] text-text-secondary">
                  {launch.format}
                </td>

                <td className="px-5 py-3.5">
                  <span className="inline-flex">
                    <StatusBadge label={status.label} tone={status.tone} />
                  </span>
                </td>

                <td className="px-5 py-3.5 font-display text-[13px] font-semibold whitespace-nowrap text-text-primary">
                  {formatCompactNumber(launch.videoPlays)}
                </td>

                <td className="px-5 py-3.5 text-[13px] whitespace-nowrap text-text-secondary">
                  {formatCompactCurrency(launch.spend)}
                </td>

                <td className="px-5 py-3.5">
                  {launch.code ? (
                    <Link
                      href={`${REPORT_ROUTE_PREFIX}/${launch.code}`}
                      className="flex items-center gap-1.5 text-[13px] font-semibold text-brand-violet transition-colors hover:text-brand-magenta"
                    >
                      <ExternalLink size={14} aria-hidden />
                      {REPORT_COPY.view}
                    </Link>
                  ) : (
                    <span className="text-[13px] text-text-muted">
                      {REPORT_COPY.noLaunchLink}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
