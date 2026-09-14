import { PLATFORM_META } from "@/constants/platforms.constants";
import type { JobPlatformsProps } from "@/types/job.types";

/** Plataformas en las que se pauta el trabajo, con el color de marca de cada una. */
export function JobPlatforms({ platforms, jobTitle }: JobPlatformsProps) {
  return (
    <ul
      aria-label={`Plataformas de ${jobTitle}`}
      className="flex items-center gap-[7px]"
    >
      {platforms.map((platform) => {
        const { label, color, Icon } = PLATFORM_META[platform];

        return (
          <li
            key={platform}
            title={label}
            className="grid size-7 place-items-center rounded-sm bg-card-elevated"
            style={{ color }}
          >
            <Icon />
            <span className="sr-only">{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
