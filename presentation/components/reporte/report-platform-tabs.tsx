import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_COPY } from "@/constants/report.constants";
import { SegmentedLinks } from "@/presentation/components/ui/segmented-links";
import type { ReportPlatformTabsProps } from "@/types/report.types";
import { reportPlatformHref } from "@/utils/report-platform-href";

/**
 * Filtro por plataforma. Son enlaces y no botones: el reporte se sirve entero
 * desde el servidor, así que el filtro funciona igual con JavaScript apagado,
 * cada vista queda enlazable y conserva el período elegido. Con una sola
 * plataforma no hay nada que filtrar.
 */
export function ReportPlatformTabs({ platforms, activePlatform, basePath, params }: ReportPlatformTabsProps) {
  if (platforms.length < 2) return null;

  return (
    <SegmentedLinks
      label={REPORT_COPY.platformTabs}
      items={[
        {
          key: "all",
          label: REPORT_COPY.allPlatforms,
          href: reportPlatformHref(basePath, params, null),
          isActive: activePlatform === null,
        },
        ...platforms.map((platform) => ({
          key: platform,
          label: PLATFORM_META[platform].label,
          href: reportPlatformHref(basePath, params, platform),
          isActive: platform === activePlatform,
        })),
      ]}
    />
  );
}
