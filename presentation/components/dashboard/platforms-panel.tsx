import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import { CONNECTIONS_ROUTE } from "@/constants/routes.constants";
import { PlatformShareRow } from "@/presentation/components/dashboard/platform-share-row";
import type { PlatformsPanelProps } from "@/types/dashboard-home.types";

/**
 * Cómo se reparte la inversión del mes entre las tres plataformas y en qué
 * estado está la conexión que alimenta a cada una.
 */
export function PlatformsPanel({ platforms }: PlatformsPanelProps) {
  return (
    <section className="flex h-full flex-col gap-4 rounded-card border border-border bg-card p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-[3px]">
          <h2 className="font-display text-base font-semibold text-text-primary">
            {DASHBOARD_COPY.platforms}
          </h2>
          <p className="text-xs text-text-secondary">
            {DASHBOARD_COPY.platformsSubtitle}
          </p>
        </div>

        <Link
          href={CONNECTIONS_ROUTE}
          className="flex shrink-0 items-center gap-0.5 text-[12.5px] font-semibold text-brand-violet transition-opacity hover:opacity-80"
        >
          {DASHBOARD_COPY.connections}
          <ChevronRight size={14} aria-hidden />
        </Link>
      </header>

      <ul className="flex flex-1 flex-col justify-between gap-4">
        {platforms.map((share) => (
          <PlatformShareRow key={share.platform} share={share} />
        ))}
      </ul>
    </section>
  );
}
