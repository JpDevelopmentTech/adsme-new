import Link from "next/link";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_COPY } from "@/constants/report.constants";
import { REPORT_PLATFORM_PARAM } from "@/constants/report-link.constants";
import type { ReportPlatformTabsProps } from "@/types/report.types";
import { cn } from "@/utils/cn";

const TAB_CLASSES =
  "rounded-sm px-3 py-1.5 text-[11.5px] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none";
const ACTIVE_CLASSES =
  "bg-white/95 font-normal text-text-primary shadow-[0_1px_3px_#1f2a271a]";

/**
 * Filtro por plataforma. Son enlaces y no botones: el reporte se sirve entero
 * desde el servidor, así que el filtro funciona igual con JavaScript apagado y
 * cada vista queda enlazable.
 */
export function ReportPlatformTabs({
  platforms,
  activePlatform,
  basePath,
}: ReportPlatformTabsProps) {
  if (platforms.length < 2) return null;

  return (
    <nav
      aria-label="Plataformas del reporte"
      className="flex shrink-0 items-center gap-0.5 rounded-md bg-g-200 p-[3px]"
    >
      <Link
        href={basePath}
        aria-current={activePlatform === null ? "page" : undefined}
        className={cn(
          TAB_CLASSES,
          activePlatform === null
            ? ACTIVE_CLASSES
            : "font-light text-text-secondary hover:text-text-primary",
        )}
      >
        {REPORT_COPY.allPlatforms}
      </Link>

      {platforms.map((platform) => {
        const isActive = platform === activePlatform;

        return (
          <Link
            key={platform}
            href={`${basePath}?${REPORT_PLATFORM_PARAM}=${platform}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              TAB_CLASSES,
              isActive
                ? ACTIVE_CLASSES
                : "font-light text-text-secondary hover:text-text-primary",
            )}
          >
            {PLATFORM_META[platform].label}
          </Link>
        );
      })}
    </nav>
  );
}
