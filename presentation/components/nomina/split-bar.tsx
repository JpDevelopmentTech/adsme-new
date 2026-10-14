import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import type { SplitBarProps } from "@/types/nomina-ui.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/**
 * Barra de reparto: el importe partido en sus bolsas, proporcional y en el
 * orden recibido. Las bolsas en cero no se pintan. Cada tramo lleva su `title`.
 */
export function SplitBar({ parts, height = 8, label = "Reparto" }: SplitBarProps) {
  const visible = parts.filter((part) => part.amount > 0);
  const total = visible.reduce((sum, part) => sum + part.amount, 0);

  return (
    <div role="img" aria-label={label} className="flex w-full gap-0.5 overflow-hidden rounded-pill" style={{ height }}>
      {visible.map((part) => (
        <span
          key={part.key}
          title={`${BUCKET_META[part.key].label}: ${formatExactCurrency(part.amount)}`}
          className="h-full"
          style={{ flexGrow: part.amount / (total || 1), backgroundColor: BUCKET_META[part.key].color }}
        />
      ))}
    </div>
  );
}
