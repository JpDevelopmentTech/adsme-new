import { PLATFORM_META } from "@/constants/platforms.constants";
import { PlatformLogo } from "@/presentation/components/brand/platform-logo";
import type { JobPlatformsProps } from "@/types/job.types";

/**
 * Plataformas en las que se pauta el trabajo, cada una con su logo oficial
 * dentro de su icono de app. El nombre va oculto para lectores de pantalla.
 */
export function JobPlatforms({ platforms, jobTitle }: JobPlatformsProps) {
  return (
    <ul aria-label={`Plataformas de ${jobTitle}`} className="flex items-center gap-1.5">
      {platforms.map((platform) => {
        const { label } = PLATFORM_META[platform];

        return (
          <li key={platform} title={label} className="flex">
            <PlatformLogo platform={platform} size={24} />
            <span className="sr-only">{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
