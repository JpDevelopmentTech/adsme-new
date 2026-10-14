/** Bolsas en las que se reparte cada ingreso de la nómina. */
export type NominaBucketKey =
  | "servicio"
  | "utilidad"
  | "utilidadNeta"
  | "impuestos"
  | "inversion"
  | "inversionExpress";

/** Importe de una bolsa. */
export interface NominaBucketAmount {
  key: NominaBucketKey;
  amount: number;
}

/** Reparto completo de un importe entre las bolsas. */
export interface NominaSplit {
  service: number;
  profit: number;
  taxes: number;
  netProfit: number;
  investment: number;
}

/** Ingresos diarios con su Utilidad y Servicio, para la curva de rendimiento. */
export interface NominaDailyPoint {
  date: string;
  income: number;
  profit: number;
  service: number;
}

/** Reparto de un mes: lo que entró y cómo se repartió. */
export interface NominaMonthSplit {
  /** Mes en formato `AAAA-MM`. */
  month: string;
  income: number;
  service: number;
  profit: number;
  investment: number;
  expressInvestment: number;
}
