"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NOMINA_SHELL_COPY } from "@/constants/nomina-copy.constants";
import { NOMINA_ROUTE, nominaArtistRoute } from "@/constants/routes.constants";
import { ArtistAvatar } from "@/presentation/components/nomina/artist-avatar";
import type { NominaActiveArtistsProps } from "@/types/nomina-shell.types";
import { cn } from "@/utils/cn";

/**
 * Lista «Artistas activos» del menú lateral. Solo aparece dentro de la Nómina
 * Plan y lleva a cada perfil; el punto de cada foto es su semáforo del mes.
 */
export function NominaActiveArtists({ artists }: NominaActiveArtistsProps) {
  const pathname = usePathname();
  if (!pathname.startsWith(NOMINA_ROUTE)) return null;

  return (
    <div className="flex flex-col gap-0.5 pt-2.5">
      <p className="px-3 pb-1 text-[10px] tracking-[1.2px] text-text-muted uppercase">
        {NOMINA_SHELL_COPY.activeArtists}
      </p>
      {artists.length === 0 ? (
        <p className="px-3 text-xs text-text-muted">{NOMINA_SHELL_COPY.noArtists}</p>
      ) : (
        <ul className="flex flex-col gap-0.5">
          {artists.map((artist) => {
            const href = nominaArtistRoute(artist.id);
            return (
              <li key={artist.id}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-sm px-3 py-1.5 text-[13px] text-text-secondary transition-colors hover:bg-surface hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
                    pathname === href && "bg-surface text-text-primary",
                  )}
                >
                  <ArtistAvatar name={artist.name} photoUrl={artist.photoUrl} size={26} semaphore={artist.semaphore} />
                  <span className="truncate">{artist.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
