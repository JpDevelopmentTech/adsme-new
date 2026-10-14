import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { FINANCE_FLOW_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { SplitBar } from "@/presentation/components/nomina/split-bar";
import type { PerHundredPanelProps } from "@/types/nomina-finanzas-props.types";
import { formatPerHundred } from "@/utils/format-per-hundred";

/** «Por cada $100 que entran»: la barra del reparto y cuántos pesos de cada cien van a cada bolsa. */
export function PerHundredPanel({ parts, income }: PerHundredPanelProps) {
  return (
    <NominaPanel title={COPY.perHundredTitle} subtitle={COPY.perHundredSubtitle}>
      <SplitBar parts={parts} height={14} label={COPY.perHundredBar} />
      <dl className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {parts.map((part) => (
          <div key={part.key} className="flex flex-col gap-2">
            <dt className="flex items-center gap-2 text-[13px] text-text-secondary">
              <span aria-hidden className="size-[9px] rounded-[2px]" style={{ backgroundColor: BUCKET_META[part.key].color }} />
              {part.label}
            </dt>
            <dd className="text-[30px] leading-tight font-extralight tracking-[-0.5px] text-text-primary tabular-nums">
              {formatPerHundred((part.amount / income) * 100)}
            </dd>
          </div>
        ))}
      </dl>
    </NominaPanel>
  );
}
