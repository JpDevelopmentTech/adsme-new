import { PLATFORM_META } from "@/constants/platforms.constants";
import type { ClientSpendBarProps } from "@/types/client.types";
import { formatPlatformMix } from "@/utils/format-platform-mix";

/**
 * La barra de cartera. Hace dos trabajos a la vez: el largo dice cuánto invierte
 * el cliente —a escala compartida con el que más invierte, de modo que las filas
 * se comparan sin leer ni una cifra— y el color, en qué plataforma.
 */
export function ClientSpendBar({
  shares,
  monthInvestment,
  maxInvestment,
}: ClientSpendBarProps) {
  const scale = maxInvestment > 0 ? monthInvestment / maxInvestment : 0;
  const segments = shares.filter((share) => share.percent > 0);
  const mix = formatPlatformMix(shares);

  return (
    <div
      role="img"
      aria-label={mix}
      title={mix}
      className="flex h-2 min-w-0 flex-1 overflow-hidden rounded-pill bg-g-200"
    >
      {segments.map((share) => (
        <span
          key={share.platform}
          className="h-full"
          style={{
            width: `${scale * share.percent}%`,
            backgroundColor: PLATFORM_META[share.platform].chartColor,
          }}
        />
      ))}
    </div>
  );
}
