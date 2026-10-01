import { PLATFORM_META } from "@/constants/platforms.constants";
import type { JobPlatformsProps } from "@/types/job.types";

/**
 * Plataformas en las que se pauta el trabajo: el monograma de cada una sobre un
 * círculo tintado con su color, la misma clave de color que las gráficas.
 */
export function JobPlatforms({ platforms, jobTitle }: JobPlatformsProps) {
  return (
    <ul aria-label={`Plataformas de ${jobTitle}`} className="flex items-center gap-1.5">
      {platforms.map((platform) => {
        const { label, mono, chartColor } = PLATFORM_META[platform];

        return (
          <li
            key={platform}
            title={label}
            className="grid size-6 place-items-center rounded-pill text-[9px] font-medium tracking-[0.3px]"
            style={{ color: chartColor, backgroundColor: `${chartColor}29` }}
          >
            <span aria-hidden>{mono}</span>
            <span className="sr-only">{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
