/** Cifras de una plataforma en la moneda de la vista. */
export interface QuotePlatformFigures {
  /** Presupuesto del cliente (total). */
  total: number;
  /** Valor a trabajar: total − servicio. */
  workValue: number;
  /** Comisión que cobra AdsME: es su ganancia. */
  fee: number;
  pauta: number;
  lineValues: number[];
  serviceMonthly: number;
  months: number;
  /** Servicio bruto: mensual × meses. */
  serviceGross: number;
  /** Servicio que se cobra tras su descuento. */
  service: number;
  serviceDiscount: number;
  /** Comisión a la tarifa estándar. */
  feeStandard: number;
  feeDiscount: number;
  /** % que se muestra en la cotización: el mayor entre el estándar y el cobrado. */
  shownPct: number;
  discount: number;
}
