"use client";

import { PlatformCardBody } from "@/presentation/components/cotizador/plataformas/platform-card-body";
import { PlatformCardFooter } from "@/presentation/components/cotizador/plataformas/platform-card-footer";
import { PlatformCardHeader } from "@/presentation/components/cotizador/plataformas/platform-card-header";
import { PlatformCollapsedSummary } from "@/presentation/components/cotizador/plataformas/platform-collapsed-summary";
import { useQuoteFigures } from "@/presentation/hooks/use-quote-figures";
import type { PlatformCardProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";

/**
 * Tarjeta de una plataforma. Recogida deja la cabecera, un chip por línea y
 * el pie; con candado, el borde y el pie se tiñen de lila.
 */
export function PlatformCard({ platform }: PlatformCardProps) {
  const figures = useQuoteFigures().byPlatform[platform.id];
  if (!figures) return null;
  const bodyId = `plataforma-${platform.id}`;

  return (
    <article aria-label={platform.name} className={cn("glass-thick flex scroll-mt-6 flex-col gap-5 rounded-card p-5 sm:p-6", platform.locked && "ring-1 ring-lilac/40")}>
      <PlatformCardHeader platform={platform} figures={figures} bodyId={bodyId} />
      {platform.collapsed
        ? <PlatformCollapsedSummary platform={platform} figures={figures} />
        : <PlatformCardBody id={bodyId} platform={platform} figures={figures} />}
      <PlatformCardFooter platform={platform} figures={figures} />
    </article>
  );
}
