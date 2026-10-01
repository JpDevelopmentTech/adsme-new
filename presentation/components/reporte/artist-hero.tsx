import { REPORT_COPY } from "@/constants/report.constants";
import { Avatar } from "@/presentation/components/ui/avatar";
import type { ArtistHeroProps } from "@/types/report.types";
import { cn } from "@/utils/cn";
import { getInitials } from "@/utils/get-initials";

/**
 * Portada del reporte consolidado. Abre con cuánta gente ha conocido la música
 * del artista, igual que el reporte de un lanzamiento: la cifra primero y la
 * ficha después.
 */
export function ArtistHero({ artist, headline, activeCampaigns }: ArtistHeroProps) {
  const activeLaunches = artist.launches.filter((launch) => launch.status === "active").length;
  const isActive = activeCampaigns > 0;

  return (
    <section className="flex flex-col gap-8 md:flex-row md:items-center md:gap-11">
      <span className="shrink-0 self-start rounded-pill border-2 border-white/30 shadow-[0_30px_80px_#05010fcc] md:self-auto">
        <span className="hidden lg:block">
          <Avatar initials={getInitials(artist.name, "")} size={220} fontSize={64} imageUrl={artist.avatarUrl ?? undefined} />
        </span>
        <span className="lg:hidden">
          <Avatar initials={getInitials(artist.name, "")} size={140} fontSize={42} imageUrl={artist.avatarUrl ?? undefined} />
        </span>
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-text-secondary">
            {REPORT_COPY.launchesSummary(artist.launches.length, activeLaunches)}
          </p>
          <p
            className={cn(
              "flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs",
              isActive ? "bg-success/12 text-success" : "bg-surface text-text-muted",
            )}
          >
            <span aria-hidden className={cn("size-1.5 rounded-pill", isActive ? "bg-success" : "bg-text-muted")} />
            {REPORT_COPY.artistActiveCampaigns(activeCampaigns)}
          </p>
        </div>

        <h1 className="text-[clamp(44px,7vw,76px)] leading-none font-extralight tracking-[-2.6px] text-text-primary">
          {artist.name}
        </h1>

        {headline ? (
          <div className="mt-2 flex flex-col gap-1.5 border-t border-white/20 pt-[22px]">
            <p className="text-[clamp(48px,8vw,80px)] leading-none font-extralight tracking-[-3px] text-text-primary tabular-nums">
              {headline.value}
            </p>
            <p className="text-lg font-light text-text-secondary">{headline.caption}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
