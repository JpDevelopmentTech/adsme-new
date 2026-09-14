import { REPORT_COPY } from "@/constants/report.constants";
import { Avatar } from "@/presentation/components/ui/avatar";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ArtistHeroProps } from "@/types/report.types";
import { getInitials } from "@/utils/get-initials";

/**
 * Portada del reporte consolidado. Abre con cuánta gente ha conocido la música
 * del artista, igual que el reporte de un lanzamiento: la cifra primero y la
 * ficha después.
 */
export function ArtistHero({
  artist,
  headline,
  activeCampaigns,
}: ArtistHeroProps) {
  const activeLaunches = artist.launches.filter(
    (launch) => launch.status === "active",
  ).length;

  return (
    <section className="flex flex-wrap items-start gap-5 rounded-card border border-border bg-[linear-gradient(100deg,#F1F2F8_0%,#FFFFFF_60%)] p-6">
      <Avatar
        initials={getInitials(artist.name, "")}
        size={104}
        fontSize={34}
        imageUrl={artist.avatarUrl ?? undefined}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h1 className="font-display text-[32px] leading-tight font-bold text-text-primary">
          {artist.name}
        </h1>
        <p className="text-[13px] text-text-secondary">
          {REPORT_COPY.launchesSummary(artist.launches.length, activeLaunches)}
        </p>

        {headline ? (
          <div className="flex flex-col gap-1.5 pt-3">
            <p
              className="font-display text-[38px] leading-[1.05] font-bold text-text-primary lg:text-[46px]"
              style={{ textShadow: "0 0 24px #7C3AED66" }}
            >
              {headline.value}
            </p>
            <p className="text-[15px] text-text-secondary">{headline.caption}</p>
          </div>
        ) : null}
      </div>

      <StatusBadge
        label={REPORT_COPY.artistActiveCampaigns(activeCampaigns)}
        tone={activeCampaigns > 0 ? "success" : "muted"}
      />
    </section>
  );
}
