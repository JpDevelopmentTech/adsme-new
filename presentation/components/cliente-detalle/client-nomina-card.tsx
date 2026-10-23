import { ArrowUpRight, Wallet } from "lucide-react";
import Link from "next/link";
import { CLIENT_NOMINA_COPY } from "@/constants/client-nomina-copy.constants";
import { nominaArtistRoute } from "@/constants/routes.constants";
import { AddToNominaButton } from "@/presentation/components/cliente-detalle/add-to-nomina-button";
import type { ClientNominaCardProps } from "@/types/client-nomina.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatLongDate } from "@/utils/format-nomina-dates";

/**
 * Relación del cliente con Nómina Plan: si está inscrito, su nómina y el
 * acceso a su perfil; si no, la salida para inscribirlo.
 */
export function ClientNominaCard({ client, enrollment }: ClientNominaCardProps) {
  const figures = enrollment
    ? [
        { label: CLIENT_NOMINA_COPY.nomina, value: formatExactCurrency(enrollment.config.nomina) },
        { label: CLIENT_NOMINA_COPY.minShows, value: String(enrollment.config.minShows) },
        { label: CLIENT_NOMINA_COPY.startsOn, value: formatLongDate(enrollment.config.startsOn) },
      ]
    : [];

  return (
    <section className="glass-panel flex flex-wrap items-center gap-6 rounded-card p-6">
      <span className="grid size-11 shrink-0 place-items-center rounded-[14px] border border-border bg-lilac/12 text-lilac">
        <Wallet size={20} strokeWidth={1.5} aria-hidden />
      </span>
      <div className="flex min-w-[220px] flex-1 flex-col gap-1">
        <h2 className="text-lg font-light text-text-primary">{CLIENT_NOMINA_COPY.title}</h2>
        <p className="text-[13px] leading-[1.45] text-text-muted">{enrollment ? CLIENT_NOMINA_COPY.enrolledLead : CLIENT_NOMINA_COPY.notEnrolledLead}</p>
      </div>
      {figures.map((figure) => (
        <div key={figure.label} className="flex flex-col gap-1">
          <span className="text-xs text-text-muted">{figure.label}</span>
          <span className="text-[15px] text-text-primary tabular-nums">{figure.value}</span>
        </div>
      ))}
      {enrollment ? (
        <Link href={nominaArtistRoute(client.id)} className="flex items-center gap-2 rounded-pill border border-border-strong bg-surface px-[18px] py-[10px] text-sm text-text-primary transition-colors hover:bg-g-100 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none">
          {CLIENT_NOMINA_COPY.view}
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
        </Link>
      ) : (
        <AddToNominaButton client={{ id: client.id, name: client.name, handle: client.handle, kind: client.kind, avatarUrl: client.avatarUrl ?? null }} />
      )}
    </section>
  );
}
