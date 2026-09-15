import { PLATFORM_META } from "@/constants/platforms.constants";
import type { JobPlatformsProps } from "@/types/job.types";

/**
 * Plataformas en las que se pauta el trabajo, cada icono con el color que esa
 * plataforma tiene en la gráfica: es la misma clave de color en toda la pantalla.
 */
export function JobPlatforms({ platforms, jobTitle }: JobPlatformsProps) {
  return (
    <ul
      aria-label={`Plataformas de ${jobTitle}`}
      className="flex items-center gap-[5px]"
    >
      {platforms.map((platform) => {
        const { label, chartColor, Icon } = PLATFORM_META[platform];

        return (
          <li
            key={platform}
            title={label}
            className="grid size-6 place-items-center rounded-sm border border-border bg-white/70"
            style={{ color: chartColor }}
          >
            <Icon />
            <span className="sr-only">{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
