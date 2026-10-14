import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { NOMINA_RESUMEN_COPY as COPY } from "@/constants/nomina-resumen-copy.constants";
import { nominaArtistRoute } from "@/constants/routes.constants";
import { ArtistAvatar } from "@/presentation/components/nomina/artist-avatar";
import { TopArtistScalability } from "@/presentation/components/nomina/resumen/top-artist-scalability";
import type { TopArtistRowProps } from "@/types/nomina-resumen.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/** Puesto del ranking del mes: quién, cuánto ingresó y cómo va con sus shows. */
export function TopArtistRow({ artist, position }: TopArtistRowProps) {
  return (
    <li className="border-b border-border last:border-b-0">
      <Link
        href={nominaArtistRoute(artist.id)}
        className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-md px-1 py-4 transition-colors duration-150 hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
      >
        <span className="w-4 text-[13px] text-text-muted tabular-nums">{position}</span>
        <ArtistAvatar name={artist.name} photoUrl={artist.photoUrl} size={40} semaphore={artist.semaphore} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-[15px] font-normal text-text-primary">{artist.name}</span>
          <span className="text-xs text-text-muted tabular-nums">{COPY.monthIncome(formatExactCurrency(artist.monthIncome))}</span>
        </div>
        <TopArtistScalability progress={artist.progress} />
        <ChevronRight size={16} strokeWidth={1.5} className="hidden shrink-0 text-text-muted sm:block" aria-hidden />
      </Link>
    </li>
  );
}
