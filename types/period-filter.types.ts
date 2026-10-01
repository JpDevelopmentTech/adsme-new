/** Rango cerrado de fechas en `YYYY-MM-DD` que el usuario elige para filtrar. */
export interface DateRange {
  from: string;
  to: string;
}

/** Límites que un período elegido debe respetar; los que falten no se exigen. */
export interface PeriodLimits {
  /** Primer día admitido en `YYYY-MM-DD`. */
  min?: string;
  /** Último día admitido en `YYYY-MM-DD`. */
  max?: string;
  maxDays?: number;
}

/** Período leído de la URL y, si las fechas no valían, por qué se descartaron. */
export interface ParsedPeriod<TPeriod extends DateRange = DateRange> {
  period: TPeriod;
  /** Si el período vino de la URL; `false` es el período por defecto. */
  isCustom: boolean;
  error: string | null;
}

export interface DateRangeFormProps {
  /** Período vigente, que rellena los campos. */
  period: DateRange;
  limits: PeriodLimits;
  /** Superficie del vidrio sobre la que se pinta: el reporte va sobre fondo, no en ventana. */
  className?: string;
}

/** Atajo a un período ya resuelto a fechas, con el enlace que lo aplica. */
export interface PeriodPresetOption {
  key: string;
  label: string;
  period: DateRange;
  href: string;
}
