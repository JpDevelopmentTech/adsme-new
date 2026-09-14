import Link from "next/link";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_PLATFORM_SECTION, REPORT_TONE_CLASSES } from "@/constants/report.constants";
import { REPORT_PLATFORM_PARAM } from "@/constants/report-link.constants";
import type { ReportPlatformTabsProps } from "@/types/report.types";
import { cn } from "@/utils/cn";

/**
 * Filtro por plataforma. Son enlaces y no botones: el reporte se sirve entero
 * desde el servidor, así que el filtro funciona igual con JavaScript apagado y
 * cada vista queda enlazable. Pulsar la pestaña activa vuelve a mostrarlas todas.
 */
export function ReportPlatformTabs({
  platforms,
  activePlatform,
  basePath,
}: ReportPlatformTabsProps) {
  if (platforms.length < 2) return null;

  return (
    <nav className="flex items-center gap-2.5" aria-label="Plataformas del reporte">
      {platforms.map((platform) => {
        const { Icon, label } = PLATFORM_META[platform];
        const tone = REPORT_TONE_CLASSES[REPORT_PLATFORM_SECTION[platform].tone];
        const isActive = platform === activePlatform;

        return (
          <Link
            key={platform}
            href={
              isActive ? basePath : `${basePath}?${REPORT_PLATFORM_PARAM}=${platform}`
            }
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-pill border px-[18px] py-2.5 text-[13px] font-semibold transition-colors",
              isActive
                ? cn(tone.chip, tone.border, "text-text-primary")
                : "border-border text-text-secondary hover:border-border-strong hover:text-text-primary",
            )}
          >
            <span className={isActive ? tone.icon : undefined} aria-hidden>
              <Icon size={16} />
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
