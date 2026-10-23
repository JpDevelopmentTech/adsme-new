/** Opciones de los formateadores de importes. */
export interface MoneyFormatOptions {
  /** Abrevia las cifras grandes («$8,9 M», «US$15,8 K»), para tarjetas y listas. */
  compact?: boolean;
}

/** Un reparto por monedas partido para una tarjeta: la cifra grande y lo demás. */
export interface SpendDisplay {
  primary: string;
  /** Las otras monedas («+ US$876»); `null` si solo hay una. */
  rest: string | null;
}

/** El gasto del reporte listo para pintar. */
export interface ReportSpendDisplay {
  /** La cifra principal: el total en pesos, o la primera moneda si no hay pesos. */
  value: string;
  /** Lo que no se sumó al total, en su moneda («US$450»); `null` si no hay. */
  extra: string | null;
  /** De dónde sale el total convertido («$X en pesos + US$Y × $TRM»); `null` sin TRM. */
  trmLine: string | null;
}
