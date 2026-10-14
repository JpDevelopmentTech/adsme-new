import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import type { NominaBucketAmount } from "@/domain/entities/nomina-bucket";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/** Leyenda de la distribución: bolsa, importe y su porcentaje entero del total. */
export function DistributionLegend({ parts }: { parts: NominaBucketAmount[] }) {
  const total = parts.reduce((sum, part) => sum + part.amount, 0);

  return (
    <ul className="flex flex-col gap-2.5">
      {parts.map((part) => (
        <li key={part.key} className="flex items-center gap-2 text-[13px]">
          <span aria-hidden className="size-2 shrink-0 rounded-pill" style={{ backgroundColor: BUCKET_META[part.key].color }} />
          <span className="flex-1 text-text-secondary">{BUCKET_META[part.key].label}</span>
          <span className="font-normal text-text-primary tabular-nums">{formatExactCurrency(part.amount)}</span>
          <span className="w-9 text-right text-xs text-text-muted tabular-nums">
            {total ? Math.round((part.amount / total) * 100) : 0}%
          </span>
        </li>
      ))}
    </ul>
  );
}
