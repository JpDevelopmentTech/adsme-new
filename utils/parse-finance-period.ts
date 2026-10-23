import { DEFAULT_NOMINA_PERIOD } from "@/constants/nomina-default-period.constants";
import { PERIOD_PRESETS } from "@/constants/nomina-period.constants";
import type { NominaPeriodSelection } from "@/domain/entities/nomina-period";

const MONTH = "\\d{4}-(?:0[1-9]|1[0-2])";
const QUARTER = /^q([1-4])-(\d{4})$/;
const YEAR = /^anio-(\d{4})$/;
const RANGE = new RegExp(`^(${MONTH})_(${MONTH})$`);

/**
 * Periodo pedido en `?periodo=`: un atajo (`6m`), un trimestre (`q2-2026`), un
 * año (`anio-2026`) o un rango (`2026-01_2026-03`, se ordena si viene al revés).
 * Cualquier otro valor vuelve al periodo por defecto.
 */
export function parseFinancePeriod(value: string | string[] | undefined): NominaPeriodSelection {
  const raw = (Array.isArray(value) ? value[0] : value)?.trim().toLowerCase() ?? "";
  const preset = PERIOD_PRESETS.find((item) => item.preset === raw)?.preset;
  if (preset) return { kind: "preset", preset };

  const quarter = QUARTER.exec(raw);
  if (quarter) return { kind: "quarter", quarter: Number(quarter[1]) as 1 | 2 | 3 | 4, year: Number(quarter[2]) };

  const year = YEAR.exec(raw);
  if (year) return { kind: "year", year: Number(year[1]) };

  const range = RANGE.exec(raw);
  if (range) {
    const [from, to] = [range[1], range[2]].sort();
    return { kind: "range", from, to };
  }

  return DEFAULT_NOMINA_PERIOD;
}
