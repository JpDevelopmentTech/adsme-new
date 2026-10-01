import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { REPORT_COPY } from "@/constants/report.constants";
import { Avatar } from "@/presentation/components/ui/avatar";
import type { ReportArtistLinkProps } from "@/types/report.types";
import { getInitials } from "@/utils/get-initials";

/**
 * Salida al reporte consolidado del artista. Es una tarjeta entera y no un
 * enlace de texto: es el siguiente paso natural para quien terminó de leer.
 */
export function ReportArtistLink({ href, artistName }: ReportArtistLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-[18px] rounded-[24px] border border-white/20 bg-linear-to-r from-brand-magenta/25 to-white/4 px-6 py-5 transition-colors duration-150 hover:border-white/35 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
    >
      <Avatar initials={getInitials(artistName, "")} size={56} fontSize={18} />

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-[11px] font-medium tracking-[1.4px] text-text-muted uppercase">
          {REPORT_COPY.otherLaunches}
        </span>
        <span className="text-xl font-light text-text-primary">{REPORT_COPY.artistLink(artistName)}</span>
      </span>

      <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-pill bg-ink text-g-50 transition-transform duration-150 group-hover:translate-x-0.5">
        <ArrowRight size={18} strokeWidth={1.75} />
      </span>
    </Link>
  );
}
