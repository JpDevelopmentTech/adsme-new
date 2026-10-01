import { DASHBOARD_PERIOD_COPY } from "@/constants/dashboard-period.constants";
import { SegmentedLinks } from "@/presentation/components/ui/segmented-links";
import type { PeriodPresetsProps } from "@/types/dashboard-period.types";

/** Atajos a los períodos más pedidos; se marca el que coincide con el vigente. */
export function PeriodPresets({ presets, period }: PeriodPresetsProps) {
  return (
    <SegmentedLinks
      label={DASHBOARD_PERIOD_COPY.presets}
      items={presets.map((preset) => ({
        key: preset.key,
        label: preset.label,
        href: preset.href,
        isActive: preset.period.from === period.from && preset.period.to === period.to,
      }))}
    />
  );
}
