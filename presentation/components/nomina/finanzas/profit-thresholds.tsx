import { FINANCE_SUMMARY_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { PROFIT_LEVEL_META } from "@/constants/nomina-profit.constants";

/** Umbrales de referencia de la rentabilidad neta, cada uno en el color de su nivel. */
export function ProfitThresholds() {
  return (
    <ul className="flex flex-col gap-2.5">
      {FINANCE_SUMMARY_COPY.thresholds.map((threshold) => (
        <li key={threshold.lead} className="text-xs text-text-secondary">
          <span className="font-normal" style={{ color: PROFIT_LEVEL_META[threshold.level].color }}>
            {threshold.lead}
          </span>{" "}
          · {threshold.text}
        </li>
      ))}
    </ul>
  );
}
